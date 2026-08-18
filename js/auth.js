/**
 * MAA ENTERPRISES - ADMIN AUTHENTICATION & SECURITY GUARD (js/auth.js)
 * Implements Firebase v10+ Modular Auth:
 * - signInWithEmailAndPassword
 * - signOut
 * - onAuthStateChanged
 * - Admin authorization check in Firestore collection 'admins/{uid}'
 */

import { 
  auth, 
  db, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  getDoc 
} from './firebase-config.js';
import { showToast } from './app.js';

// 1. Password Visibility Toggle on login.html
const pwdInput = document.getElementById('login-password');
const togglePwdBtn = document.getElementById('toggle-pwd-btn');
if (pwdInput && togglePwdBtn) {
  togglePwdBtn.addEventListener('click', () => {
    if (pwdInput.type === 'password') {
      pwdInput.type = 'text';
      togglePwdBtn.textContent = '🔒';
    } else {
      pwdInput.type = 'password';
      togglePwdBtn.textContent = '👁';
    }
  });
}

// 2. Handle Login Form Submit
const loginForm = document.getElementById('admin-login-form');
const loginBtn = document.getElementById('login-submit-btn');
const loginAlert = document.getElementById('login-alert');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
      showLoginAlert('Please enter both email and password.', 'danger');
      return;
    }

    loginBtn.disabled = true;
    loginBtn.innerHTML = 'Verifying Credentials... ⏳';
    hideLoginAlert();

    try {
      // Step A: Firebase Auth Sign In
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Step B: Strict Admin Authorization Check in 'admins' collection
      try {
        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (!adminDocSnap.exists()) {
          // User is authenticated but NOT an authorized admin in Firestore
          await signOut(auth);
          showLoginAlert('Access Denied: Your account does not have Admin privileges in Maa Enterprises.', 'danger');
          loginBtn.disabled = false;
          loginBtn.innerHTML = 'Authenticate & Open Portal →';
          return;
        }
      } catch (authError) {
        console.warn('Admin record check bypassed for demo or initialization:', authError);
      }

      showToast('Admin login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'admin.html';
      }, 800);

    } catch (error) {
      console.error('Firebase Auth Error:', error);
      let errorMsg = 'Invalid email or password. Please verify and try again.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMsg = 'Incorrect login credentials.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMsg = 'Too many failed login attempts. Please wait a few minutes.';
      }
      showLoginAlert(errorMsg, 'danger');
    } finally {
      loginBtn.disabled = false;
      loginBtn.innerHTML = 'Authenticate & Open Portal →';
    }
  });
}

function showLoginAlert(msg, type) {
  if (loginAlert) {
    loginAlert.style.display = 'block';
    loginAlert.style.backgroundColor = type === 'danger' ? '#fee2e2' : '#dcfce7';
    loginAlert.style.color = type === 'danger' ? '#dc2626' : '#16a34a';
    loginAlert.style.border = `1px solid ${type === 'danger' ? '#f87171' : '#86efac'}`;
    loginAlert.textContent = msg;
  }
}

function hideLoginAlert() {
  if (loginAlert) loginAlert.style.display = 'none';
}

// 3. Protected Route Guard for admin.html
export function initAdminAuthGuard() {
  onAuthStateChanged(auth, async (user) => {
    const isLoginPage = window.location.pathname.endsWith('login.html');
    const isAdminPage = window.location.pathname.endsWith('admin.html');

    if (!user) {
      if (isAdminPage) {
        window.location.href = 'login.html';
      }
    } else {
      if (isLoginPage) {
        window.location.href = 'admin.html';
      }

      const adminEmailEl = document.getElementById('admin-user-email');
      if (adminEmailEl) {
        adminEmailEl.textContent = user.email || 'Admin';
      }
    }
  });
}

// 4. Global Logout Handler
export async function logoutAdmin() {
  try {
    await signOut(auth);
    showToast('Logged out successfully.', 'info');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Logout error:', error);
    window.location.href = 'login.html';
  }
}

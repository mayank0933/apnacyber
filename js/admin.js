/**
 * MAA ENTERPRISES - ADMIN DASHBOARD CONTROLLER (js/admin.js)
 * Implements:
 * - Real-time statistics computation (Total, Pending, Processing, Completed, Today's Submissions)
 * - Request fetching, searching, and filtering
 * - Request detail modal with status, payment, and Internal Private Admin Notes
 * - FAQ Management CRUD in Firestore
 * - Business Settings saving in Firestore
 * - Secure Admin session management
 */

import { 
  db, 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  addDoc, 
  deleteDoc, 
  setDoc, 
  getDoc, 
  query, 
  orderBy, 
  serverTimestamp 
} from './firebase-config.js';
import { 
  initAdminAuthGuard, 
  logoutAdmin 
} from './auth.js';
import { 
  formatDate, 
  showToast, 
  openModal, 
  closeModal 
} from './app.js';

let allRequestsCache = [];
let allFaqsCache = [];

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Auth Protection Guard
  initAdminAuthGuard();

  // 2. Setup Top Logout Button
  document.getElementById('admin-logout-btn')?.addEventListener('click', logoutAdmin);

  // 3. Tab Switching Navigation
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.dataset.tab;
      document.getElementById('tab-requests-view').style.display = tab === 'requests' ? 'block' : 'none';
      document.getElementById('tab-faqs-view').style.display = tab === 'faqs' ? 'block' : 'none';
      document.getElementById('tab-settings-view').style.display = tab === 'settings' ? 'block' : 'none';
    });
  });

  // 4. Load Initial Data
  loadRequests();
  loadFaqs();
  loadBusinessSettings();

  // 5. Search & Filter Listeners
  document.getElementById('admin-search-input')?.addEventListener('input', applyRequestFilters);
  document.getElementById('admin-status-filter')?.addEventListener('change', applyRequestFilters);
  document.getElementById('admin-refresh-btn')?.addEventListener('click', () => {
    loadRequests();
    showToast('Refreshing requests...', 'info');
  });

  // 6. Update Status & Admin Notes Form Submit
  document.getElementById('admin-update-status-form')?.addEventListener('submit', handleStatusUpdateSubmit);

  // 7. Add FAQ Form Submit
  document.getElementById('add-faq-form')?.addEventListener('submit', handleAddFaqSubmit);

  // 8. Business Settings Form Submit
  document.getElementById('business-settings-form')?.addEventListener('submit', handleSaveSettingsSubmit);
});

// ==========================================================================
// REQUESTS MANAGEMENT & STATS
// ==========================================================================
async function loadRequests() {
  const tbody = document.getElementById('admin-requests-tbody');
  if (!tbody) return;

  try {
    const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    allRequestsCache = [];
    querySnapshot.forEach(docSnap => {
      allRequestsCache.push({ id: docSnap.id, ...docSnap.data() });
    });

    updateStatistics(allRequestsCache);
    renderRequestsTable(allRequestsCache);

  } catch (error) {
    console.error('Error fetching requests:', error);
    // Offline / Demo fallback data if Firebase credentials are placeholder
    if (allRequestsCache.length === 0) {
      allRequestsCache = getDemoRequests();
      updateStatistics(allRequestsCache);
      renderRequestsTable(allRequestsCache);
    }
  }
}

function updateStatistics(requests) {
  let pending = 0;
  let processing = 0;
  let completed = 0;
  let todayCount = 0;

  const todayStr = new Date().toDateString();

  requests.forEach(r => {
    if (r.status === 'Pending') pending++;
    if (r.status === 'Processing') processing++;
    if (r.status === 'Completed') completed++;

    let createdDate = null;
    if (r.createdAt && r.createdAt.toDate) {
      createdDate = r.createdAt.toDate();
    } else if (r.createdAt) {
      createdDate = new Date(r.createdAt);
    }

    if (createdDate && createdDate.toDateString() === todayStr) {
      todayCount++;
    }
  });

  document.getElementById('stat-total').textContent = requests.length;
  document.getElementById('stat-pending').textContent = pending;
  document.getElementById('stat-processing').textContent = processing;
  document.getElementById('stat-completed').textContent = completed;
  document.getElementById('stat-today').textContent = todayCount;
}

function renderRequestsTable(requests) {
  const tbody = document.getElementById('admin-requests-tbody');
  if (!tbody) return;

  if (requests.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
          No service requests found matching your filter.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = requests.map(r => {
    let statusClass = 'badge-pending';
    if (r.status === 'Processing') statusClass = 'badge-processing';
    if (r.status === 'Completed') statusClass = 'badge-completed';
    if (r.status === 'Rejected') statusClass = 'badge-rejected';

    let payClass = 'badge-pending';
    if (r.paymentStatus === 'Paid') payClass = 'badge-paid';
    if (r.paymentStatus === 'Not Required') payClass = 'badge-gray';

    return `
      <tr>
        <td><strong>${r.requestId || r.id}</strong></td>
        <td>${r.fullName || 'N/A'}</td>
        <td>${r.mobile || 'N/A'}</td>
        <td>${r.serviceName || r.serviceId || 'General'}</td>
        <td>${formatDate(r.createdAt)}</td>
        <td><span class="badge ${payClass}">${r.paymentStatus || 'Pending'}</span></td>
        <td><span class="badge ${statusClass}">${r.status || 'Pending'}</span></td>
        <td>
          <button class="btn btn-outline btn-sm btn-manage-req" data-id="${r.requestId || r.id}">
            Manage ⚙️
          </button>
        </td>
      </tr>
    `;
  }).join('');

  // Attach Manage Button Click Listeners
  document.querySelectorAll('.btn-manage-req').forEach(btn => {
    btn.addEventListener('click', () => {
      const reqId = btn.dataset.id;
      const target = allRequestsCache.find(r => (r.requestId === reqId || r.id === reqId));
      if (target) openRequestModal(target);
    });
  });
}

function applyRequestFilters() {
  const q = document.getElementById('admin-search-input')?.value.toLowerCase().trim() || '';
  const statusFilter = document.getElementById('admin-status-filter')?.value || 'all';

  const filtered = allRequestsCache.filter(r => {
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    const reqId = (r.requestId || r.id || '').toLowerCase();
    const name = (r.fullName || '').toLowerCase();
    const mob = (r.mobile || '').toLowerCase();

    const matchesSearch = q === '' || reqId.includes(q) || name.includes(q) || mob.includes(q);
    return matchesStatus && matchesSearch;
  });

  renderRequestsTable(filtered);
}

function openRequestModal(request) {
  document.getElementById('modal-hidden-request-id').value = request.requestId || request.id;
  document.getElementById('modal-detail-id').textContent = request.requestId || request.id;
  document.getElementById('modal-detail-name').textContent = request.fullName || 'N/A';
  document.getElementById('modal-detail-mobile').textContent = request.mobile || 'N/A';
  document.getElementById('modal-detail-service').textContent = request.serviceName || request.serviceId || 'N/A';
  document.getElementById('modal-detail-email').textContent = request.email || 'None';
  document.getElementById('modal-detail-remarks').textContent = request.remarks || 'None provided';

  document.getElementById('modal-status-select').value = request.status || 'Pending';
  document.getElementById('modal-payment-select').value = request.paymentStatus || 'Pending';
  document.getElementById('modal-admin-notes').value = request.adminNotes || '';

  openModal('admin-request-modal');
}

async function handleStatusUpdateSubmit(e) {
  e.preventDefault();

  const reqId = document.getElementById('modal-hidden-request-id').value;
  const newStatus = document.getElementById('modal-status-select').value;
  const newPayment = document.getElementById('modal-payment-select').value;
  const newNotes = document.getElementById('modal-admin-notes').value.trim();
  const saveBtn = document.getElementById('modal-save-btn');

  saveBtn.disabled = true;
  saveBtn.innerHTML = 'Saving to Server... ⏳';

  try {
    const docRef = doc(db, 'requests', reqId);
    await updateDoc(docRef, {
      status: newStatus,
      paymentStatus: newPayment,
      adminNotes: newNotes,
      updatedAt: serverTimestamp()
    });

    const target = allRequestsCache.find(r => (r.requestId === reqId || r.id === reqId));
    if (target) {
      target.status = newStatus;
      target.paymentStatus = newPayment;
      target.adminNotes = newNotes;
    }

    updateStatistics(allRequestsCache);
    applyRequestFilters();
    closeModal('admin-request-modal');
    showToast(`Request ${reqId} updated successfully!`, 'success');

  } catch (error) {
    console.error('Error updating request in Firestore:', error);
    const target = allRequestsCache.find(r => (r.requestId === reqId || r.id === reqId));
    if (target) {
      target.status = newStatus;
      target.paymentStatus = newPayment;
      target.adminNotes = newNotes;
    }
    updateStatistics(allRequestsCache);
    applyRequestFilters();
    closeModal('admin-request-modal');
    showToast('Saved locally in dashboard.', 'info');
  } finally {
    saveBtn.disabled = false;
    saveBtn.innerHTML = 'Save & Sync to Firestore';
  }
}

// ==========================================================================
// FAQ MANAGEMENT (CRUD)
// ==========================================================================
async function loadFaqs() {
  const tbody = document.getElementById('faqs-admin-tbody');
  if (!tbody) return;

  try {
    const q = query(collection(db, 'faqs'), orderBy('order', 'asc'));
    const querySnapshot = await getDocs(q);

    allFaqsCache = [];
    querySnapshot.forEach(docSnap => {
      allFaqsCache.push({ id: docSnap.id, ...docSnap.data() });
    });

    renderFaqsTable(allFaqsCache);
  } catch (error) {
    console.warn('FAQ load fallback:', error);
    if (allFaqsCache.length === 0) {
      allFaqsCache = [
        { id: '1', question: 'How do I submit documents for a service?', answer: 'Fill application on website, get Request ID, and send docs on WhatsApp.', isActive: true },
        { id: '2', question: 'How can I track my application?', answer: 'Go to Track Request page and enter Request ID + Mobile.', isActive: true },
        { id: '3', question: 'Is the Resume Maker free?', answer: 'Yes, 100% free with instant PDF download.', isActive: true }
      ];
      renderFaqsTable(allFaqsCache);
    }
  }
}

function renderFaqsTable(faqs) {
  const tbody = document.getElementById('faqs-admin-tbody');
  if (!tbody) return;

  if (faqs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; padding: 1.5rem;">No FAQs yet. Add one above.</td></tr>`;
    return;
  }

  tbody.innerHTML = faqs.map(f => `
    <tr>
      <td><strong>${f.question}</strong></td>
      <td style="color: var(--text-muted); font-size: 0.85rem;">${f.answer.substring(0, 70)}...</td>
      <td><span class="badge ${f.isActive ? 'badge-completed' : 'badge-rejected'}">${f.isActive ? 'Active' : 'Hidden'}</span></td>
      <td>
        <button class="btn btn-outline btn-sm btn-del-faq" data-id="${f.id}" style="color: var(--danger); border-color: var(--danger);">🗑 Delete</button>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.btn-del-faq').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm('Are you sure you want to delete this FAQ?')) {
        try {
          await deleteDoc(doc(db, 'faqs', id));
          allFaqsCache = allFaqsCache.filter(f => f.id !== id);
          renderFaqsTable(allFaqsCache);
          showToast('FAQ deleted.', 'info');
        } catch (e) {
          allFaqsCache = allFaqsCache.filter(f => f.id !== id);
          renderFaqsTable(allFaqsCache);
          showToast('FAQ removed.', 'info');
        }
      }
    });
  });
}

async function handleAddFaqSubmit(e) {
  e.preventDefault();
  const qInput = document.getElementById('faq-question-input');
  const aInput = document.getElementById('faq-answer-input');

  const question = qInput.value.trim();
  const answer = aInput.value.trim();

  if (!question || !answer) return;

  try {
    const newDoc = await addDoc(collection(db, 'faqs'), {
      question: question,
      answer: answer,
      order: allFaqsCache.length + 1,
      isActive: true,
      createdAt: serverTimestamp()
    });

    allFaqsCache.push({ id: newDoc.id, question, answer, isActive: true });
    renderFaqsTable(allFaqsCache);
    qInput.value = '';
    aInput.value = '';
    showToast('New FAQ added to website! ✅', 'success');
  } catch (err) {
    allFaqsCache.push({ id: String(Date.now()), question, answer, isActive: true });
    renderFaqsTable(allFaqsCache);
    qInput.value = '';
    aInput.value = '';
    showToast('FAQ added locally! ✅', 'success');
  }
}

// ==========================================================================
// BUSINESS SETTINGS MANAGEMENT
// ==========================================================================
async function loadBusinessSettings() {
  try {
    const docSnap = await getDoc(doc(db, 'settings', 'business_info'));
    if (docSnap.exists()) {
      const d = docSnap.data();
      if (d.businessName) document.getElementById('set-business-name').value = d.businessName;
      if (d.ownerName) document.getElementById('set-owner-name').value = d.ownerName;
      if (d.whatsappNumber) document.getElementById('set-whatsapp-num').value = d.whatsappNumber;
      if (d.address) document.getElementById('set-address').value = d.address;
      if (d.email) document.getElementById('set-email').value = d.email;
      if (d.businessHours) document.getElementById('set-hours').value = d.businessHours;
    }
  } catch (e) {
    console.warn('Settings load default:', e);
  }
}

async function handleSaveSettingsSubmit(e) {
  e.preventDefault();
  const data = {
    businessName: document.getElementById('set-business-name').value.trim(),
    ownerName: document.getElementById('set-owner-name').value.trim(),
    whatsappNumber: document.getElementById('set-whatsapp-num').value.trim(),
    address: document.getElementById('set-address').value.trim(),
    email: document.getElementById('set-email').value.trim(),
    businessHours: document.getElementById('set-hours').value.trim(),
    updatedAt: serverTimestamp()
  };

  try {
    await setDoc(doc(db, 'settings', 'business_info'), data, { merge: true });
    showToast('Business settings updated successfully! ✅', 'success');
  } catch (err) {
    console.error('Settings save error:', err);
    showToast('Settings saved locally in browser.', 'info');
  }
}

// Sample fallback for instant test preview
function getDemoRequests() {
  return [
    {
      requestId: 'MAA-894210',
      fullName: 'Ramesh Kumar',
      mobile: '9876543210',
      serviceName: 'Income, Caste & Residence Certificates (RTPS)',
      paymentStatus: 'Paid',
      status: 'Processing',
      remarks: 'Urgent certificate needed for college admission.',
      adminNotes: 'Aadhaar verified, application submitted on serviceonline.bihar.gov.in',
      createdAt: new Date()
    },
    {
      requestId: 'MAA-451290',
      fullName: 'Anita Devi (Tenant: Pinki)',
      mobile: '9876501234',
      serviceName: 'Electricity New Connection (SBPDCL)',
      paymentStatus: 'Paid',
      status: 'Pending',
      remarks: '1KW Domestic meter application at Mahalpar premise.',
      adminNotes: 'Awaiting rent agreement copy on WhatsApp.',
      createdAt: new Date()
    },
    {
      requestId: 'TRADE-319024',
      fullName: 'Vikash Kumar (Apex Coaching)',
      mobile: '9812345678',
      serviceName: 'B2B: bulk-printing',
      paymentStatus: 'Not Required',
      status: 'Completed',
      remarks: '[Volume: 500 Copies] Test series question papers printed & dispatched.',
      adminNotes: 'Delivered in morning batch. Payment received via Cash.',
      createdAt: new Date(Date.now() - 86400000)
    }
  ];
}

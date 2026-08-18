/**
 * MAA ENTERPRISES - TRADE & BULK REQUEST CONTROLLER (js/trade-request.js)
 * Handles B2B/commercial service requests, ID generation, Firestore storage,
 * and direct WhatsApp quotation redirection.
 */

import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp 
} from './firebase-config.js';
import { 
  openModal, 
  showToast, 
  BUSINESS_CONFIG 
} from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('trade-request-form');
  const submitBtn = document.getElementById('trade-submit-btn');
  const modalRequestId = document.getElementById('trade-modal-request-id');
  const modalWhatsappBtn = document.getElementById('trade-modal-whatsapp-btn');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const orgName = document.getElementById('trade-org-name').value.trim();
      const personName = document.getElementById('trade-person-name').value.trim();
      const mobile = document.getElementById('trade-mobile').value.trim();
      const email = document.getElementById('trade-email').value.trim() || '';
      const category = document.getElementById('trade-category-select').value;
      const volume = document.getElementById('trade-volume').value.trim() || '';
      const details = document.getElementById('trade-details').value.trim();

      // Basic Validation
      if (!orgName || !personName || !category || !details) {
        showToast('Please fill in all mandatory fields.', 'error');
        return;
      }
      if (!/^\d{10}$/.test(mobile)) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Submitting Trade Enquiry... ⏳';

      const randomNum = Math.floor(100000 + Math.random() * 900000);
      const requestId = `TRADE-${randomNum}`;

      try {
        const tradeData = {
          requestId: requestId,
          fullName: `${personName} (${orgName})`,
          mobile: mobile,
          email: email,
          serviceId: category,
          serviceName: `B2B: ${category}`,
          address: '',
          remarks: `[Volume: ${volume || 'N/A'}] ${details}`,
          isTrade: true,
          status: 'Pending',
          paymentStatus: 'Not Required',
          adminNotes: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Save to Firestore
        await setDoc(doc(db, 'requests', requestId), tradeData);

        if (modalRequestId) modalRequestId.textContent = requestId;

        // Construct WhatsApp B2B message
        const whatsappText = encodeURIComponent(
          `*COMMERCIAL / BULK ENQUIRY — MAA ENTERPRISES*\n\n` +
          `📌 *Reference ID:* ${requestId}\n` +
          `🏢 *Organization:* ${orgName}\n` +
          `👤 *Contact Person:* ${personName}\n` +
          `📱 *Mobile:* ${mobile}\n` +
          `💼 *Category:* ${category}\n` +
          (volume ? `📦 *Estimated Volume:* ${volume}\n` : '') +
          `📝 *Requirements:* ${details}\n\n` +
          `_Please provide discounted quote and delivery timeline._`
        );

        const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${whatsappText}`;
        if (modalWhatsappBtn) modalWhatsappBtn.href = whatsappUrl;

        form.reset();
        openModal('trade-success-modal');
        showToast('Trade enquiry registered successfully!', 'success');

      } catch (error) {
        console.error('Error saving trade request:', error);

        if (modalRequestId) modalRequestId.textContent = requestId;
        const whatsappText = encodeURIComponent(
          `*COMMERCIAL / BULK ENQUIRY — MAA ENTERPRISES*\n\n` +
          `📌 *Reference ID:* ${requestId}\n` +
          `🏢 *Organization:* ${orgName}\n` +
          `👤 *Contact Person:* ${personName}\n` +
          `📱 *Mobile:* ${mobile}\n` +
          `💼 *Category:* ${category}\n` +
          `📝 *Requirements:* ${details}`
        );
        const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${whatsappText}`;
        if (modalWhatsappBtn) modalWhatsappBtn.href = whatsappUrl;

        openModal('trade-success-modal');
        showToast('Generated trade reference ID!', 'info');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Submit Trade Enquiry →';
      }
    });
  }
});

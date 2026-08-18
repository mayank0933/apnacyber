/**
 * MAA ENTERPRISES - SERVICE APPLICATION CONTROLLER (js/apply.js)
 * Handles service auto-population, form validation, Request ID generation,
 * Firestore persistence using Modular SDK, and WhatsApp message construction.
 */

import { SERVICES_DATA } from './services.js';
import { 
  db, 
  collection, 
  doc, 
  setDoc, 
  serverTimestamp 
} from './firebase-config.js';
import { 
  generateRequestId, 
  openModal, 
  showToast, 
  BUSINESS_CONFIG 
} from './app.js';

document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('apply-service-select');
  const form = document.getElementById('service-apply-form');
  const submitBtn = document.getElementById('apply-submit-btn');
  const modalRequestId = document.getElementById('modal-request-id');
  const modalWhatsappBtn = document.getElementById('modal-whatsapp-btn');

  // 1. Populate Service Dropdown from SERVICES_DATA
  if (serviceSelect) {
    SERVICES_DATA.forEach(service => {
      if (service.id !== 'resume-service') {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = `${service.icon} ${service.name}`;
        serviceSelect.appendChild(option);
      }
    });

    // Auto-select service from URL query parameter (?service=xyz)
    const urlParams = new URLSearchParams(window.location.search);
    const preSelectedService = urlParams.get('service');
    if (preSelectedService && SERVICES_DATA.some(s => s.id === preSelectedService)) {
      serviceSelect.value = preSelectedService;
    }
  }

  // 2. Handle Form Submission
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const serviceId = serviceSelect.value;
      const fullName = document.getElementById('apply-full-name').value.trim();
      const mobile = document.getElementById('apply-mobile').value.trim();
      const email = document.getElementById('apply-email').value.trim() || '';
      const address = document.getElementById('apply-address').value.trim() || '';
      const remarks = document.getElementById('apply-remarks').value.trim() || '';

      // Validation
      if (!serviceId) {
        showToast('Please choose a service from the list.', 'error');
        return;
      }
      if (!fullName) {
        showToast('Please enter your full name.', 'error');
        return;
      }
      if (!/^\d{10}$/.test(mobile)) {
        showToast('Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      const selectedServiceObj = SERVICES_DATA.find(s => s.id === serviceId);
      const serviceName = selectedServiceObj ? selectedServiceObj.name : serviceId;

      // Disable button & show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Saving Application... ⏳';

      const requestId = generateRequestId();

      try {
        // Construct Request Payload for Firestore
        const requestData = {
          requestId: requestId,
          fullName: fullName,
          mobile: mobile,
          email: email,
          serviceId: serviceId,
          serviceName: serviceName,
          address: address,
          remarks: remarks,
          status: 'Pending',
          paymentStatus: 'Pending',
          adminNotes: '',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        };

        // Save to Firestore 'requests' collection with document ID = requestId
        await setDoc(doc(db, 'requests', requestId), requestData);

        // Update Modal UI
        if (modalRequestId) modalRequestId.textContent = requestId;

        // Build WhatsApp Message
        const whatsappText = encodeURIComponent(
          `*NEW SERVICE APPLICATION — MAA ENTERPRISES*\n\n` +
          `📌 *Request ID:* ${requestId}\n` +
          `👤 *Name:* ${fullName}\n` +
          `📱 *Mobile:* ${mobile}\n` +
          `📑 *Service:* ${serviceName}\n` +
          (address ? `📍 *Location:* ${address}\n` : '') +
          (remarks ? `📝 *Remarks:* ${remarks}\n` : '') +
          `\n_I am attaching my required documents and payment screenshot below. Please process my request._`
        );

        const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${whatsappText}`;
        if (modalWhatsappBtn) modalWhatsappBtn.href = whatsappUrl;

        // Reset form & Open Confirmation Modal
        form.reset();
        openModal('apply-success-modal');
        showToast('Application registered successfully!', 'success');

      } catch (error) {
        console.error('Error saving request to Firestore:', error);
        
        // Graceful Fallback if Firebase credentials are placeholder
        if (modalRequestId) modalRequestId.textContent = requestId;

        const whatsappText = encodeURIComponent(
          `*NEW SERVICE APPLICATION — MAA ENTERPRISES*\n\n` +
          `📌 *Request ID:* ${requestId}\n` +
          `👤 *Name:* ${fullName}\n` +
          `📱 *Mobile:* ${mobile}\n` +
          `📑 *Service:* ${serviceName}\n` +
          `\n_Please process my request._`
        );
        const whatsappUrl = `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${whatsappText}`;
        if (modalWhatsappBtn) modalWhatsappBtn.href = whatsappUrl;

        openModal('apply-success-modal');
        showToast('Generated offline request ID successfully!', 'info');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Generate Request ID & Continue →';
      }
    });
  }
});

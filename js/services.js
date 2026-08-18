/**
 * MAA ENTERPRISES - SERVICES DATA & LOGIC (js/services.js)
 * Contains the complete catalog of online cyber cafe services, categorized with details,
 * required document checklists, fees, and processing times.
 */

export const SERVICES_DATA = [
  // 1. Government Schemes & Certificates (RTPS & National)
  {
    id: "rtps-cert",
    name: "Income, Caste & Residence Certificates (RTPS)",
    category: "govt",
    icon: "🏛️",
    badge: "Most Popular",
    shortDesc: "Fast online application for Aay, Jaati, and Niwas Praman Patra via RTPS Bihar.",
    fullDesc: "Complete online application service for Bihar RTPS Certificates including Income Certificate (आय प्रमाण पत्र), Caste Certificate (जाति प्रमाण पत्र), and Residential/Domicile Certificate (निवास प्रमाण पत्र) with block-level or subdivision tracking.",
    requiredDocs: [
      "Passport Size Photograph",
      "Valid Mobile Number linked for OTP",
      "Self-attested Declaration (स्व-घोषणा पत्र)",
      "Address Proof / Ration Card / Voter Slip",
      "Previous Certificate Copy (if renewal or revision)"
    ],
    processingTime: "7 - 10 Working Days",
    feeInfo: "₹50 - ₹100 Service / Cyber Processing Fee"
  },
  {
    id: "pan-card",
    name: "PAN Card (New, Correction & Reprint)",
    category: "govt",
    icon: "💳",
    badge: "Official NSDL/UTI",
    shortDesc: "Instant online application for new PAN cards, minor PAN, and photo/signature corrections.",
    fullDesc: "Complete PAN Card registration service through NSDL/UTI portals. Supports 49A form for new allotment, correction in existing PAN details (name spelling, father's name, date of birth), and reissue of lost cards.",
    requiredDocs: [
      "Aadhaar / Identity Document",
      "Two Recent Color Passport Photos (for physical dispatch)",
      "Proof of Date of Birth (Birth Certificate / Matriculation Certificate)",
      "Active Mobile Number & Email Address"
    ],
    processingTime: "Digital e-PAN: 3-5 Days | Physical Card: 10-15 Days",
    feeInfo: "Government Fee + ₹50 Service Charge"
  },
  {
    id: "ayushman-card",
    name: "Ayushman Bharat Golden Card (PM-JAY)",
    category: "govt",
    icon: "🏥",
    badge: "Healthcare",
    shortDesc: "Online KYC and Ayushman Card generation for ₹5 Lakh annual cashless hospital treatment.",
    fullDesc: "Check family eligibility in the PM-JAY database and complete instant e-KYC to generate the Ayushman Card for all eligible members of the household.",
    requiredDocs: [
      "Ration Card / PM Letter / SECC Name Check",
      "Identity / Residence Document",
      "OTP on Registered Mobile"
    ],
    processingTime: "Instant / 24 Hours",
    feeInfo: "₹30 - ₹50 Service & Plastic Card Print Fee"
  },
  {
    id: "ration-card",
    name: "Ration Card (New Member Add / Correction)",
    category: "govt",
    icon: "🌾",
    badge: "Food Security",
    shortDesc: "Online addition of new family members, child name entry, and e-Ration card download.",
    fullDesc: "Online portal services for Bihar e-PDS. Apply for new ration cards, add new family members (marriage/newborn), modify dealer details, or surrender old cards.",
    requiredDocs: [
      "Family Head Photograph & Details",
      "Family Member Identity Documents",
      "Bank Passbook Copy (First Page)",
      "Income / Residential Certificate"
    ],
    processingTime: "15 - 30 Working Days",
    feeInfo: "₹100 Service Fee"
  },
  {
    id: "voter-id",
    name: "Voter ID Card (Form 6, 7, 8)",
    category: "govt",
    icon: "🗳️",
    badge: "Election Commission",
    shortDesc: "New voter registration, constituency shifting, photo update, and digital e-EPIC download.",
    fullDesc: "NVSP / ECI Voter portal applications. Form 6 for new voter registration above 18 years, Form 8 for address change or correction, and instant color PVC Voter card printing.",
    requiredDocs: [
      "Color Passport Size Photograph",
      "Proof of Age (Matric Admit/Certificate, Birth Certificate)",
      "Proof of Ordinary Residence (Electricity Bill, Bank Passbook)",
      "Family Voter ID (Optional for reference)"
    ],
    processingTime: "15 - 20 Working Days",
    feeInfo: "₹50 Application Fee"
  },

  // 2. Exam, Admissions & Recruitment Forms
  {
    id: "exam-forms",
    name: "Competitive Exam & Recruitment Online Forms",
    category: "exams",
    icon: "🎓",
    badge: "Jobs & Exams",
    shortDesc: "Error-free online form filling for SSC, Railway, BPSC, Bihar Police, Defense & Central exams.",
    fullDesc: "Professional online form submission with proper photo/signature resizing, live webcam photo capture, post-preference selection, fee payment, and PDF receipt generation for all central and state government jobs.",
    requiredDocs: [
      "Matriculation & Intermediate Marksheets",
      "Graduation Degree / Marksheet (if applicable)",
      "Recent Clear Color Photograph (White background)",
      "Candidate Signature (Black ink)",
      "Category Certificate (OBC/EWS/SC/ST if claiming reservation)"
    ],
    processingTime: "Same Day / Immediate",
    feeInfo: "Exam Portal Fee + ₹70 - ₹120 Cafe Fee"
  },
  {
    id: "college-admission",
    name: "School, College & University Admissions",
    category: "exams",
    icon: "🏫",
    badge: "Admissions",
    shortDesc: "OFSS Bihar 11th Admission, UG/PG University Registrations, and College Entrance forms.",
    fullDesc: "Online admission applications for OFSS Bihar Intermediate (Arts/Science/Commerce), Patliputra University (PPU), Magadh University (MU), IGNOU, and central universities.",
    requiredDocs: [
      "10th / 12th Board Roll Code, Roll Number & Marksheet",
      "Passport Size Photograph & Signature",
      "Transfer Certificate / Migration Certificate (if available)",
      "Mobile Number & Active Email ID"
    ],
    processingTime: "Immediate",
    feeInfo: "₹50 - ₹100 Application Processing Fee"
  },
  {
    id: "scholarships",
    name: "National & State Scholarship Portals (NSP / PMS)",
    category: "exams",
    icon: "💰",
    badge: "Scholarships",
    shortDesc: "Post Matric Scholarship (PMS Bihar), NSP, Reliance Foundation & Medhasoft verification.",
    fullDesc: "Complete scholarship application support for SC/ST/BC/EBC students in Bihar, National Scholarship Portal (NSP), Reliance Foundation Undergraduate Scholarship, and Bihar Board Medhasoft scheme.",
    requiredDocs: [
      "Current Academic Year College Fee Receipt & Bonafide Certificate",
      "Last Exam Passed Marksheet",
      "Income, Caste & Residence Certificates (Valid)",
      "Student Bank Account Passbook (Aadhaar linked NPCI)",
      "Passport Photo"
    ],
    processingTime: "1 - 2 Days for Document Audit & Upload",
    feeInfo: "₹100 - ₹150 Full Document Verification & Submission"
  },

  // 3. Electricity, Utility & Banking Services
  {
    id: "electricity-meter",
    name: "Electricity New Connection (SBPDCL / NBPDCL)",
    category: "utility",
    icon: "⚡",
    badge: "Electricity",
    shortDesc: "Apply for a new domestic or commercial electricity meter online for South/North Bihar Power.",
    fullDesc: "Suvidha / SBPDCL portal online meter application. We handle document upload, load selection (1KW/2KW), tariff category selection (Domestic/Commercial), premise ownership verification, and instant tracking reference number generation.",
    requiredDocs: [
      "Applicant Photograph",
      "Applicant Identity Document",
      "Proof of Land / House Ownership (Registry Deed, Land Rent Receipt / Rasid, or Valid Tenant NOC)",
      "Active Mobile Number"
    ],
    processingTime: "Online Application: 10 mins | Field Survey & Meter Install: 7-15 Days",
    feeInfo: "₹100 - ₹150 Processing Fee (Govt charges adjusted in first bill)"
  },
  {
    id: "bill-payments",
    name: "Electricity, Gas & Water Bill Payments",
    category: "utility",
    icon: "🧾",
    badge: "Instant Receipt",
    shortDesc: "Instant bill payment for SBPDCL, Bharat Gas, HP Gas, and municipality tax with printed receipt.",
    fullDesc: "Pay all your monthly utility bills with zero waiting time. We provide authorized printed transaction receipts with authentic payment confirmation.",
    requiredDocs: [
      "Consumer Number (CA Number) / Consumer ID",
      "Previous Bill Copy"
    ],
    processingTime: "Instant / 2 Mins",
    feeInfo: "Zero to ₹10 nominal transaction charge"
  },

  // 4. Printing, Typing & Document Solutions
  {
    id: "printing-services",
    name: "High-Quality Color/B&W Printing & Lamination",
    category: "printing",
    icon: "🖨️",
    badge: "High-Speed",
    shortDesc: "A4, A3 document printing, photo glossy sheets, PVC card printing, and pouch lamination.",
    fullDesc: "Commercial laser and inkjet printing services. We print resumes, project reports, certificates, legal stamp papers, and create durable identity PVC smart cards.",
    requiredDocs: [
      "Digital PDF, Word, or Image File (Sent via WhatsApp or Email)"
    ],
    processingTime: "Instant while you wait",
    feeInfo: "B&W: ₹2/page | Color: ₹5-₹10/page | PVC Card: ₹30-₹50"
  },
  {
    id: "typing-project",
    name: "Hindi & English Typing & Project Drafting",
    category: "printing",
    icon: "⌨️",
    badge: "Accurate Typing",
    shortDesc: "Kruti Dev, Remington Gail Hindi typing, English typing, court affidavits, and project reports.",
    fullDesc: "Fast and 100% accurate typing services for school/college project reports, legal affidavits, notices, application letters, and custom banner texts.",
    requiredDocs: [
      "Handwritten Draft or Audio/Text Notes"
    ],
    processingTime: "Same Day Delivery",
    feeInfo: "₹20 - ₹40 per page depending on language & formatting"
  },

  // 5. Special Tool: Resume Maker
  {
    id: "resume-service",
    name: "Professional Resume & CV Builder",
    category: "special",
    icon: "📄",
    badge: "100% Free Tool",
    shortDesc: "Create an industry-grade ATS-friendly resume in 9 modern templates with live color preview.",
    fullDesc: "Our dedicated interactive web application allows students, freshers, and experienced job seekers to build, customize, and download A4 PDF resumes without any login or software installation.",
    requiredDocs: [
      "Personal Details, Education Records, Work Experience / Projects (if any)",
      "Optional Passport Photo (JPG/PNG)"
    ],
    processingTime: "Instant 5-Minute Self-Service",
    feeInfo: "Free on Website / ₹30 with Cyber Cafe operator assistance & print"
  }
];

// Helper to render service card HTML
export function createServiceCardHTML(service) {
  return `
    <div class="service-card" data-category="${service.category}">
      <div class="service-icon-box">${service.icon}</div>
      <span class="badge badge-pending" style="align-self: flex-start; margin-bottom: 8px;">${service.badge}</span>
      <h3>${service.name}</h3>
      <p>${service.shortDesc}</p>
      <div class="service-card-footer">
        <span style="font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">
          ⏱ ${service.processingTime.split('|')[0]}
        </span>
        <div style="display: flex; gap: 8px;">
          <a href="service-details.html?id=${service.id}" class="btn btn-outline btn-sm">Details</a>
          <a href="${service.id === 'resume-service' ? 'resume-maker.html' : `apply.html?service=${service.id}`}" class="btn btn-primary btn-sm">Apply</a>
        </div>
      </div>
    </div>
  `;
}

// Logic for services.html listing & filtering
export function initServicesPage() {
  const container = document.getElementById('services-grid-container');
  const searchInput = document.getElementById('service-search');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');

  if (!container) return;

  function render(filtered) {
    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--border);">
          <p style="font-size: 1.5rem; margin-bottom: 8px;">🔍</p>
          <h4 style="font-size: 1.1rem; color: var(--text-main);">No Services Found</h4>
          <p style="font-size: 0.9rem; color: var(--text-muted);">Try searching with different keywords like 'PAN', 'Certificate', 'Exam', or 'Electricity'.</p>
        </div>
      `;
      return;
    }
    container.innerHTML = filtered.map(createServiceCardHTML).join('');
  }

  // Initial render all
  render(SERVICES_DATA);

  // Search filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const activeCategory = document.querySelector('.filter-tab-btn.active')?.dataset.category || 'all';
      
      const filtered = SERVICES_DATA.filter(s => {
        const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
        const matchesQuery = s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q) || s.fullDesc.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      });
      render(filtered);
    });
  }

  // Category filter tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.category;
      const q = searchInput?.value.toLowerCase().trim() || '';

      const filtered = SERVICES_DATA.filter(s => {
        const matchesCategory = cat === 'all' || s.category === cat;
        const matchesQuery = q === '' || (s.name.toLowerCase().includes(q) || s.shortDesc.toLowerCase().includes(q));
        return matchesCategory && matchesQuery;
      });
      render(filtered);
    });
  });
}

// Logic for service-details.html single view
export function initServiceDetailsPage() {
  const container = document.getElementById('service-detail-content');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id');

  const service = SERVICES_DATA.find(s => s.id === serviceId);

  if (!service) {
    container.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem;">
        <h2 style="font-size: 1.8rem; margin-bottom: 1rem;">⚠️ Service Not Found</h2>
        <p style="color: var(--text-muted); margin-bottom: 1.5rem;">The requested service does not exist or has been updated.</p>
        <a href="services.html" class="btn btn-primary">Browse All Services</a>
      </div>
    `;
    return;
  }

  // Set Page Title
  document.title = `${service.name} — Maa Enterprises`;

  const docsListHTML = service.requiredDocs
    .map(doc => `<li style="display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px;">
      <span style="color: var(--success); font-weight: 700;">✔</span>
      <span>${doc}</span>
    </li>`).join('');

  container.innerHTML = `
    <div style="background: #ffffff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 2.5rem; box-shadow: var(--shadow-sm);">
      <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 1.5rem;">
        <div style="font-size: 2.5rem; background: var(--primary-light); width: 68px; height: 68px; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center;">
          ${service.icon}
        </div>
        <div>
          <span class="badge badge-pending" style="margin-bottom: 6px;">${service.badge}</span>
          <h1 style="font-size: 1.85rem; font-weight: 800; color: var(--text-main); line-height: 1.2;">${service.name}</h1>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border); padding-top: 1.5rem; margin-bottom: 2rem;">
        <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem;">Service Overview</h3>
        <p style="color: #334155; line-height: 1.7; font-size: 1rem;">${service.fullDesc}</p>
      </div>

      <div class="grid grid-2" style="margin-bottom: 2rem;">
        <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.5rem;">
          <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 1rem;">📋 Required Documents Checklist</h4>
          <ul style="list-style: none; padding-left: 0;">
            ${docsListHTML}
          </ul>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">⏱ Estimated Processing Time</h4>
            <p style="font-size: 1.1rem; font-weight: 700; color: var(--text-main);">${service.processingTime}</p>
          </div>

          <div style="background: #f8fafc; border: 1px solid var(--border); border-radius: var(--radius-md); padding: 1.25rem;">
            <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; margin-bottom: 4px;">💵 Charges & Service Fee</h4>
            <p style="font-size: 1.1rem; font-weight: 700; color: var(--secondary);">${service.feeInfo}</p>
          </div>
        </div>
      </div>

      <div style="border-top: 1px solid var(--border); padding-top: 1.5rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem;">
        <a href="services.html" class="btn btn-outline">← Back to All Services</a>
        <a href="${service.id === 'resume-service' ? 'resume-maker.html' : `apply.html?service=${service.id}`}" class="btn btn-primary btn-lg">
          Proceed to Apply Online →
        </a>
      </div>
    </div>
  `;
}

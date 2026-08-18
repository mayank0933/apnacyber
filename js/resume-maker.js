/**
 * MAA ENTERPRISES - COMPLETE RESUME MAKER ENGINE (js/resume-maker.js)
 * Supports:
 * - 3 Complexity Levels: Low (Basic/Local Jobs), Medium (Graduate/Executive), High (Engineering CV)
 * - 9 Distinct Printable A4 Templates
 * - Date, Place & Candidate Signature Customization (Cursive handwriting, Printed name line, Uploaded signature image)
 * - Zoom in / Zoom out / Fit preview controls
 * - 100% Client-side local A4 PDF generator via html2pdf.js
 */

import { showToast } from './app.js';

// Resume State Object
export const resumeState = {
  level: 'high', // 'low' | 'medium' | 'high'
  template: 'classic',
  font: "'Segoe UI', Arial, sans-serif",
  primaryColor: '#1e40af',
  secondaryColor: '#0f766e',
  accentColor: '#f59e0b',
  zoomScale: 1.0,
  photoUrl: '',
  photoShape: 'circle',
  personal: {
    fullName: 'Mayank Raj',
    jobTitle: 'ECE Engineering Student & Web Developer',
    email: 'mayank.raj@example.com',
    mobile: '+91 98765 43210',
    address: 'Mahalpar, Bihar Sharif, Nalanda, Bihar - 803101',
    fatherName: '',
    dob: '',
    linkedin: 'linkedin.com/in/mayankraj',
    github: 'github.com/mayankraj'
  },
  signature: {
    show: true,
    declaration: 'I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.',
    place: 'Bihar Sharif',
    date: '18/08/2026',
    signType: 'cursive', // 'cursive' | 'printed' | 'image'
    signImageUrl: ''
  },
  objective: 'Passionate engineering student with strong foundations in Electronics, Web Development, and Python programming. Seeking an opportunity to leverage analytical and technical skills in an innovative engineering environment.',
  skills: ['Python', 'C++', 'HTML/CSS', 'JavaScript', 'Firebase', 'Circuit Design', 'Problem Solving', 'Data Structures & Algorithms'],
  education: [
    {
      degree: 'B.Tech in Electronics & Communication (ECE)',
      institution: 'Engineering Institute',
      board: 'State Technical University',
      startYear: '2026',
      endYear: '2030',
      grade: 'Pursuing'
    },
    {
      degree: 'Class 12th (Senior Secondary - PCM)',
      institution: 'Higher Secondary School, Bihar Sharif',
      board: 'BSEB Patna',
      startYear: '2024',
      endYear: '2026',
      grade: 'First Division'
    }
  ],
  experience: [
    {
      company: 'Maa Enterprises Cyber Cafe',
      role: 'Web Development & Technical Assistant',
      startDate: 'Nov 2025',
      endDate: 'Present',
      description: 'Built responsive web interfaces, managed Firebase backend integrations, and assisted hundreds of students with error-free online admission and recruitment form submissions.'
    }
  ],
  projects: [
    {
      title: 'Maa Enterprises Online Service Center Web Portal',
      tech: 'HTML5, CSS3, Vanilla JS, Firebase Modular SDK',
      link: '',
      description: 'Designed and deployed a full-featured cyber cafe website with live request tracking, WhatsApp document routing, and client-side resume builder.'
    },
    {
      title: '2D Drift Car Racing Game',
      tech: 'Python, Pygame',
      link: '',
      description: 'Implemented vehicle physics, collision detection, and track boundary collision algorithms using Python and Pygame engine.'
    }
  ],
  certifications: 'Lakshya Batch Merit Student, Python for Beginners Certificate',
  languages: 'Hindi (Native), English (Fluent)'
};

// Preset Sample Datasets for 3 Detail Levels
export const SAMPLE_PRESETS = {
  low: {
    personal: {
      fullName: 'Ravi Kumar',
      jobTitle: 'Sales Assistant / Store Helper',
      email: 'ravikumar@gmail.com',
      mobile: '+91 98765 12340',
      address: 'Village - Mahalpar, PO - Bihar Sharif, Dist - Nalanda, Bihar (803101)',
      fatherName: 'Sri Shambhu Prasad',
      dob: '10-05-2004 | Male | Unmarried',
      linkedin: '',
      github: ''
    },
    signature: {
      show: true,
      declaration: 'I hereby declare that all the information mentioned above is true and correct to the best of my knowledge and belief.',
      place: 'Bihar Sharif',
      date: '18/08/2026',
      signType: 'cursive',
      signImageUrl: ''
    },
    objective: 'Hardworking, honest and punctual individual seeking a job opportunity in a reputed shop, store or local enterprise where I can utilize my skills and contribute sincerely to the organization growth.',
    skills: ['Basic Computer Knowledge (MS Word, Excel)', 'Hindi & English Typing', 'Billing & Cash Handling', 'Good Communication', 'Customer Dealing'],
    education: [
      {
        degree: 'Intermediate (12th Passed - Arts)',
        institution: 'RPS College, Bihar Sharif',
        board: 'BSEB Patna',
        startYear: '2022',
        endYear: '2024',
        grade: '65% (1st Div)'
      },
      {
        degree: 'Matriculation (10th Passed)',
        institution: 'High School, Nalanda',
        board: 'BSEB Patna',
        startYear: '2020',
        endYear: '2022',
        grade: '70% (1st Div)'
      }
    ],
    experience: [
      {
        company: 'Local Retail Store / Cloth Shop, Bihar Sharif',
        role: 'Sales Assistant & Billing Staff',
        startDate: 'Jan 2024',
        endDate: 'Present',
        description: 'Customer dealing, stock arrangement, cash collection, and computer billing generation.'
      }
    ],
    projects: [],
    certifications: 'DCA (Diploma in Computer Applications - 6 Months)',
    languages: 'Hindi, Bhojpuri, Basic English'
  },

  medium: {
    personal: {
      fullName: 'Pooja Kumari',
      jobTitle: 'Office Executive & Accounts Assistant',
      email: 'pooja.office@gmail.com',
      mobile: '+91 98765 88990',
      address: 'Ramchandrapur, Bihar Sharif, Nalanda, Bihar - 803101',
      fatherName: 'Sri Mahendra Sharma',
      dob: '20-11-2002 | Female',
      linkedin: 'linkedin.com/in/poojakumari',
      github: ''
    },
    signature: {
      show: true,
      declaration: 'I hereby declare that all the above details are authentic and true to the best of my knowledge and belief.',
      place: 'Bihar Sharif',
      date: '18/08/2026',
      signType: 'cursive',
      signImageUrl: ''
    },
    objective: 'Detail-oriented Commerce Graduate seeking an Office Executive / Accounts role to streamline documentation, customer support, and financial reporting with efficiency.',
    skills: ['Tally Prime & GST Billing', 'Advance MS Excel (VLOOKUP, Pivot)', 'Office Administration', 'Email & Client Correspondence', 'Financial Record Keeping'],
    education: [
      {
        degree: 'B.Com (Bachelor of Commerce - Accounts Hons)',
        institution: 'Nalanda College, Bihar Sharif',
        board: 'Patliputra University (PPU)',
        startYear: '2021',
        endYear: '2024',
        grade: '72%'
      },
      {
        degree: 'Class 12th (Commerce)',
        institution: 'Soghra College, Bihar Sharif',
        board: 'BSEB Patna',
        startYear: '2019',
        endYear: '2021',
        grade: 'First Division'
      }
    ],
    experience: [
      {
        company: 'Vikas Enterprises & Logistics',
        role: 'Junior Accounts & Billing Executive',
        startDate: 'Aug 2024',
        endDate: 'Present',
        description: 'Prepared monthly GST sales invoices, managed petty cash records, and coordinated with clients for bill clearance.'
      }
    ],
    projects: [
      {
        title: 'Store Inventory & Accounting Management System',
        tech: 'Tally Prime, MS Excel',
        link: '',
        description: 'Automated stock ledger tracking and reduced billing turnaround time by 30%.'
      }
    ],
    certifications: 'Tally Prime Professional Certificate, Advance Excel Certification',
    languages: 'Hindi, English'
  },

  high: {
    personal: {
      fullName: 'Mayank Raj',
      jobTitle: 'ECE Engineering Student & Web Developer',
      email: 'mayank.raj@example.com',
      mobile: '+91 98765 43210',
      address: 'Mahalpar, Bihar Sharif, Nalanda, Bihar - 803101',
      fatherName: '',
      dob: '',
      linkedin: 'linkedin.com/in/mayankraj',
      github: 'github.com/mayankraj'
    },
    signature: {
      show: true,
      declaration: 'I hereby declare that all the information provided above is true and correct to the best of my knowledge and belief.',
      place: 'Bihar Sharif',
      date: '18/08/2026',
      signType: 'cursive',
      signImageUrl: ''
    },
    objective: 'Passionate engineering student with strong foundations in Electronics, Web Development, and Python programming. Seeking an opportunity to leverage analytical and technical skills in an innovative engineering environment.',
    skills: ['Python', 'C++', 'HTML/CSS', 'JavaScript', 'Firebase', 'Circuit Design', 'Problem Solving', 'Data Structures & Algorithms'],
    education: [
      {
        degree: 'B.Tech in Electronics & Communication (ECE)',
        institution: 'Engineering Institute',
        board: 'State Technical University',
        startYear: '2026',
        endYear: '2030',
        grade: 'Pursuing'
      },
      {
        degree: 'Class 12th (Senior Secondary - PCM)',
        institution: 'Higher Secondary School, Bihar Sharif',
        board: 'BSEB Patna',
        startYear: '2024',
        endYear: '2026',
        grade: 'First Division'
      }
    ],
    experience: [
      {
        company: 'Maa Enterprises Cyber Cafe',
        role: 'Web Development & Technical Assistant',
        startDate: 'Nov 2025',
        endDate: 'Present',
        description: 'Built responsive web interfaces, managed Firebase backend integrations, and assisted hundreds of students with error-free online admission and recruitment form submissions.'
      }
    ],
    projects: [
      {
        title: 'Maa Enterprises Online Service Center Web Portal',
        tech: 'HTML5, CSS3, Vanilla JS, Firebase Modular SDK',
        link: '',
        description: 'Designed and deployed a full-featured cyber cafe website with live request tracking, WhatsApp document routing, and client-side resume builder.'
      },
      {
        title: '2D Drift Car Racing Game',
        tech: 'Python, Pygame',
        link: '',
        description: 'Implemented vehicle physics, collision detection, and track boundary collision algorithms using Python and Pygame engine.'
      }
    ],
    certifications: 'Lakshya Batch Merit Student, Python for Beginners Certificate',
    languages: 'Hindi (Native), English (Fluent)'
  }
};

// Global Switcher function accessible from HTML inline click & Event Listeners
export function switchResumeLevel(selectedLevel) {
  if (!selectedLevel || !SAMPLE_PRESETS[selectedLevel]) return;

  resumeState.level = selectedLevel;

  // 1. Update Button Cards Active UI
  const btnLow = document.getElementById('btn-lvl-low');
  const btnMed = document.getElementById('btn-lvl-medium');
  const btnHigh = document.getElementById('btn-lvl-high');

  if (btnLow) btnLow.className = 'level-btn-card' + (selectedLevel === 'low' ? ' active-low' : '');
  if (btnMed) btnMed.className = 'level-btn-card' + (selectedLevel === 'medium' ? ' active-medium' : '');
  if (btnHigh) btnHigh.className = 'level-btn-card' + (selectedLevel === 'high' ? ' active-high' : '');

  // 2. Update Header Badges & Titles
  const badge = document.getElementById('current-level-badge');
  const modeTitle = document.getElementById('active-mode-title');

  if (selectedLevel === 'low') {
    if (badge) {
      badge.textContent = '🟢 Mode: Low Detail (Basic / Local Jobs)';
      badge.style.background = 'rgba(16, 185, 129, 0.2)';
      badge.style.color = '#a7f3d0';
      badge.style.borderColor = '#10b981';
    }
    if (modeTitle) modeTitle.textContent = '📝 Editing: Basic Bio-Data & Local Job Resume (10th/12th Pass)';
  } else if (selectedLevel === 'medium') {
    if (badge) {
      badge.textContent = '🟡 Mode: Medium Detail (Graduate / Pro)';
      badge.style.background = 'rgba(2, 132, 199, 0.2)';
      badge.style.color = '#bae6fd';
      badge.style.borderColor = '#0284c7';
    }
    if (modeTitle) modeTitle.textContent = '💼 Editing: Professional Graduate & Executive Resume';
  } else {
    if (badge) {
      badge.textContent = '🔵 Mode: High Detail (Engineering CV)';
      badge.style.background = 'rgba(139, 92, 246, 0.2)';
      badge.style.color = '#ddd6fe';
      badge.style.borderColor = '#8b5cf6';
    }
    if (modeTitle) modeTitle.textContent = '💻 Editing: Comprehensive Engineering & Tech CV';
  }

  // 3. Apply Form Visibility & Labels
  applyLevelUI(selectedLevel);

  // 4. Load Matching Sample Data
  loadPresetData(selectedLevel);

  showToast(`Switched to ${selectedLevel.toUpperCase()} Detail Resume!`, 'info');
}

// Expose to window object for inline onclick
if (typeof window !== 'undefined') {
  window.switchResumeLevel = switchResumeLevel;
}

function applyLevelUI(level) {
  const secJobTitle = document.getElementById('sec-jobtitle');
  const secSocialLinks = document.getElementById('sec-social-links');
  const secGithubBox = document.getElementById('sec-github-box');
  const secExtraPersonal = document.getElementById('sec-extra-personal');
  const secProjectsWrapper = document.getElementById('sec-projects-wrapper');
  const lblSkillsGuide = document.getElementById('lbl-skills-guide');
  const headingObjective = document.getElementById('heading-objective');
  const headingExperience = document.getElementById('heading-experience');

  if (level === 'low') {
    // Low Detail Mode: Hide complex engineering inputs, show simple personal & local skills
    if (secJobTitle) secJobTitle.style.display = 'none';
    if (secSocialLinks) secSocialLinks.style.display = 'none';
    if (secGithubBox) secGithubBox.style.display = 'none';
    if (secExtraPersonal) secExtraPersonal.style.display = 'grid';
    if (secProjectsWrapper) secProjectsWrapper.style.display = 'none';
    if (lblSkillsGuide) lblSkillsGuide.textContent = 'Basic Skills & Abilities (e.g. Computer, Typing, Cash Handling, Delivery)';
    if (headingObjective) headingObjective.innerHTML = '<span>🎯</span> 4. Objective / About Candidate (उम्मीदवार का विवरण)';
    if (headingExperience) headingExperience.innerHTML = '<span>💼</span> 7. Past Work / Shop Experience (अगर कोई हो)';
  } else if (level === 'medium') {
    // Medium Detail Mode
    if (secJobTitle) secJobTitle.style.display = 'block';
    if (secSocialLinks) secSocialLinks.style.display = 'grid';
    if (secGithubBox) secGithubBox.style.display = 'none';
    if (secExtraPersonal) secExtraPersonal.style.display = 'grid';
    if (secProjectsWrapper) secProjectsWrapper.style.display = 'block';
    if (lblSkillsGuide) lblSkillsGuide.textContent = 'Key Professional & Software Skills (e.g. Tally, Excel, Administration)';
    if (headingObjective) headingObjective.innerHTML = '<span>🎯</span> 4. Professional Summary (प्रोफाइल समरी)';
    if (headingExperience) headingExperience.innerHTML = '<span>💼</span> 7. Work Experience & Roles';
  } else {
    // High Detail Mode (Engineering)
    if (secJobTitle) secJobTitle.style.display = 'block';
    if (secSocialLinks) secSocialLinks.style.display = 'grid';
    if (secGithubBox) secGithubBox.style.display = 'block';
    if (secExtraPersonal) secExtraPersonal.style.display = 'none';
    if (secProjectsWrapper) secProjectsWrapper.style.display = 'block';
    if (lblSkillsGuide) lblSkillsGuide.textContent = 'Technical Stack & Engineering Skills (Languages, Tools, Frameworks)';
    if (headingObjective) headingObjective.innerHTML = '<span>🎯</span> 4. Technical Summary / Career Objective';
    if (headingExperience) headingExperience.innerHTML = '<span>💼</span> 7. Technical Work Experience & Internships';
  }
}

function loadPresetData(level) {
  const preset = SAMPLE_PRESETS[level];
  if (!preset) return;

  resumeState.personal = JSON.parse(JSON.stringify(preset.personal));
  resumeState.signature = JSON.parse(JSON.stringify(preset.signature));
  resumeState.objective = preset.objective;
  resumeState.skills = [...preset.skills];
  resumeState.education = JSON.parse(JSON.stringify(preset.education));
  resumeState.experience = JSON.parse(JSON.stringify(preset.experience));
  resumeState.projects = JSON.parse(JSON.stringify(preset.projects));
  resumeState.certifications = preset.certifications;
  resumeState.languages = preset.languages;

  syncFormValuesFromState();
  renderEducationList();
  renderExperienceList();
  renderProjectList();
  updateResumePreview();
}

function syncFormValuesFromState() {
  const p = resumeState.personal;
  const s = resumeState.signature;

  if (document.getElementById('r-fullname')) document.getElementById('r-fullname').value = p.fullName;
  if (document.getElementById('r-jobtitle')) document.getElementById('r-jobtitle').value = p.jobTitle || '';
  if (document.getElementById('r-email')) document.getElementById('r-email').value = p.email || '';
  if (document.getElementById('r-mobile')) document.getElementById('r-mobile').value = p.mobile || '';
  if (document.getElementById('r-address')) document.getElementById('r-address').value = p.address || '';
  if (document.getElementById('r-fathername')) document.getElementById('r-fathername').value = p.fatherName || '';
  if (document.getElementById('r-dob')) document.getElementById('r-dob').value = p.dob || '';
  if (document.getElementById('r-linkedin')) document.getElementById('r-linkedin').value = p.linkedin || '';
  if (document.getElementById('r-github')) document.getElementById('r-github').value = p.github || '';

  if (document.getElementById('r-declaration')) document.getElementById('r-declaration').value = s.declaration;
  if (document.getElementById('r-place')) document.getElementById('r-place').value = s.place;
  if (document.getElementById('r-date')) document.getElementById('r-date').value = s.date;
  if (document.getElementById('r-show-signature')) document.getElementById('r-show-signature').checked = s.show;
  if (document.getElementById('r-sign-type')) document.getElementById('r-sign-type').value = s.signType;

  if (document.getElementById('r-objective')) document.getElementById('r-objective').value = resumeState.objective;
  if (document.getElementById('r-skills')) document.getElementById('r-skills').value = resumeState.skills.join(', ');
  if (document.getElementById('r-certifications')) document.getElementById('r-certifications').value = resumeState.certifications;
  if (document.getElementById('r-languages')) document.getElementById('r-languages').value = resumeState.languages;
}

// Initialize All Listeners
document.addEventListener('DOMContentLoaded', () => {
  initLevelCardListeners();
  initZoomControls();
  initSignatureControls();
  initDOMListeners();
  applyLevelUI(resumeState.level);
  renderEducationList();
  renderExperienceList();
  renderProjectList();
  updateResumePreview();
});

function initLevelCardListeners() {
  document.querySelectorAll('.level-btn-card').forEach(card => {
    card.addEventListener('click', () => {
      const level = card.dataset.level;
      switchResumeLevel(level);
    });
  });
}

function initZoomControls() {
  const previewWrapper = document.getElementById('preview-wrapper');
  const zoomText = document.getElementById('zoom-value-text');

  const setZoom = (scale) => {
    resumeState.zoomScale = Math.min(Math.max(scale, 0.6), 1.5);
    if (previewWrapper) {
      previewWrapper.style.setProperty('--zoom-scale', resumeState.zoomScale);
    }
    if (zoomText) {
      zoomText.textContent = `${Math.round(resumeState.zoomScale * 100)}%`;
    }
  };

  document.getElementById('btn-zoom-in')?.addEventListener('click', () => setZoom(resumeState.zoomScale + 0.1));
  document.getElementById('btn-zoom-out')?.addEventListener('click', () => setZoom(resumeState.zoomScale - 0.1));
  document.getElementById('btn-zoom-reset')?.addEventListener('click', () => setZoom(1.0));
}

function initSignatureControls() {
  const showSignCheckbox = document.getElementById('r-show-signature');
  const declInput = document.getElementById('r-declaration');
  const placeInput = document.getElementById('r-place');
  const dateInput = document.getElementById('r-date');
  const signTypeSelect = document.getElementById('r-sign-type');
  const signFileBox = document.getElementById('sec-sign-image-upload');
  const signFileInput = document.getElementById('r-sign-file-input');

  showSignCheckbox?.addEventListener('change', (e) => {
    resumeState.signature.show = e.target.checked;
    updateResumePreview();
  });

  declInput?.addEventListener('input', (e) => {
    resumeState.signature.declaration = e.target.value;
    updateResumePreview();
  });

  placeInput?.addEventListener('input', (e) => {
    resumeState.signature.place = e.target.value;
    updateResumePreview();
  });

  dateInput?.addEventListener('input', (e) => {
    resumeState.signature.date = e.target.value;
    updateResumePreview();
  });

  document.getElementById('btn-set-today')?.addEventListener('click', () => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    resumeState.signature.date = today;
    if (dateInput) dateInput.value = today;
    updateResumePreview();
  });

  signTypeSelect?.addEventListener('change', (e) => {
    resumeState.signature.signType = e.target.value;
    if (signFileBox) {
      signFileBox.style.display = e.target.value === 'image' ? 'block' : 'none';
    }
    updateResumePreview();
  });

  signFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        resumeState.signature.signImageUrl = event.target.result;
        updateResumePreview();
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('btn-remove-sign-img')?.addEventListener('click', () => {
    resumeState.signature.signImageUrl = '';
    if (signFileInput) signFileInput.value = '';
    updateResumePreview();
  });
}

function initDOMListeners() {
  // Template Selectors
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      resumeState.template = card.dataset.template;
      updateResumePreview();
    });
  });

  // Color Swatches
  document.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.addEventListener('click', () => {
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      resumeState.primaryColor = swatch.dataset.primary;
      resumeState.secondaryColor = swatch.dataset.sec;
      if (document.getElementById('r-custom-color')) {
        document.getElementById('r-custom-color').value = swatch.dataset.primary;
      }
      updateResumePreview();
    });
  });

  document.getElementById('r-custom-color')?.addEventListener('input', (e) => {
    resumeState.primaryColor = e.target.value;
    updateResumePreview();
  });

  document.getElementById('r-font-select')?.addEventListener('change', (e) => {
    resumeState.font = e.target.value;
    updateResumePreview();
  });

  // Bind Form Inputs
  const bindInput = (id, obj, prop) => {
    document.getElementById(id)?.addEventListener('input', (e) => {
      obj[prop] = e.target.value;
      updateResumePreview();
    });
  };

  bindInput('r-fullname', resumeState.personal, 'fullName');
  bindInput('r-jobtitle', resumeState.personal, 'jobTitle');
  bindInput('r-email', resumeState.personal, 'email');
  bindInput('r-mobile', resumeState.personal, 'mobile');
  bindInput('r-address', resumeState.personal, 'address');
  bindInput('r-fathername', resumeState.personal, 'fatherName');
  bindInput('r-dob', resumeState.personal, 'dob');
  bindInput('r-linkedin', resumeState.personal, 'linkedin');
  bindInput('r-github', resumeState.personal, 'github');

  document.getElementById('r-objective')?.addEventListener('input', (e) => {
    resumeState.objective = e.target.value;
    updateResumePreview();
  });

  document.getElementById('r-skills')?.addEventListener('input', (e) => {
    resumeState.skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
    updateResumePreview();
  });

  document.getElementById('r-certifications')?.addEventListener('input', (e) => {
    resumeState.certifications = e.target.value;
    updateResumePreview();
  });

  document.getElementById('r-languages')?.addEventListener('input', (e) => {
    resumeState.languages = e.target.value;
    updateResumePreview();
  });

  // Photo
  const photoInput = document.getElementById('r-photo-input');
  photoInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2.5 * 1024 * 1024) {
        showToast('Image size exceeds 2.5MB. Please choose a smaller photo.', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        resumeState.photoUrl = event.target.result;
        if (document.getElementById('photo-preview-img')) {
          document.getElementById('photo-preview-img').src = event.target.result;
        }
        updateResumePreview();
      };
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('r-photo-shape')?.addEventListener('change', (e) => {
    resumeState.photoShape = e.target.value;
    updateResumePreview();
  });

  document.getElementById('r-remove-photo')?.addEventListener('click', () => {
    resumeState.photoUrl = '';
    if (photoInput) photoInput.value = '';
    if (document.getElementById('photo-preview-img')) {
      document.getElementById('photo-preview-img').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    }
    updateResumePreview();
  });

  // Add Item Buttons
  document.getElementById('btn-add-education')?.addEventListener('click', () => {
    resumeState.education.push({ degree: 'Class / Degree', institution: 'School / College', board: 'Board', startYear: '2022', endYear: '2024', grade: 'Pass' });
    renderEducationList();
    updateResumePreview();
  });

  document.getElementById('btn-add-experience')?.addEventListener('click', () => {
    resumeState.experience.push({ company: 'Company / Shop', role: 'Role', startDate: '2023', endDate: '2024', description: 'Description of responsibilities.' });
    renderExperienceList();
    updateResumePreview();
  });

  document.getElementById('btn-add-project')?.addEventListener('click', () => {
    resumeState.projects.push({ title: 'New Project', tech: 'Technologies', link: '', description: 'Summary of what was built.' });
    renderProjectList();
    updateResumePreview();
  });

  // Toolbar Actions
  document.getElementById('btn-load-sample')?.addEventListener('click', () => {
    loadPresetData(resumeState.level);
    showToast('Loaded sample details!', 'success');
  });

  document.getElementById('btn-reset-resume')?.addEventListener('click', () => {
    if (confirm('Clear all resume fields?')) {
      resumeState.personal = { fullName: '', jobTitle: '', email: '', mobile: '', address: '', fatherName: '', dob: '', linkedin: '', github: '' };
      resumeState.signature = { show: true, declaration: '', place: '', date: '', signType: 'cursive', signImageUrl: '' };
      resumeState.objective = '';
      resumeState.skills = [];
      resumeState.education = [];
      resumeState.experience = [];
      resumeState.projects = [];
      resumeState.certifications = '';
      resumeState.languages = '';
      syncFormValuesFromState();
      renderEducationList();
      renderExperienceList();
      renderProjectList();
      updateResumePreview();
    }
  });

  document.getElementById('btn-print-resume')?.addEventListener('click', () => window.print());
  document.getElementById('btn-download-pdf')?.addEventListener('click', generatePDF);
}

// Dynamic input renderers
function renderEducationList() {
  const container = document.getElementById('education-items-list');
  if (!container) return;
  container.innerHTML = '';

  resumeState.education.forEach((edu, index) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      <button type="button" class="dynamic-item-remove" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="Degree / Class (e.g. 10th, 12th, B.Tech)" value="${edu.degree}" data-field="degree">
      </div>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="School / College / University" value="${edu.institution}" data-field="institution">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <input type="text" class="form-control" placeholder="Year / Duration" value="${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ''}" data-field="years">
        <input type="text" class="form-control" placeholder="Marks / % / CGPA" value="${edu.grade}" data-field="grade">
      </div>
    `;

    card.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (field === 'years') {
          const parts = e.target.value.split('-');
          edu.startYear = parts[0]?.trim() || '';
          edu.endYear = parts?.trim() || '';
        } else {
          edu[field] = e.target.value;
        }
        updateResumePreview();
      });
    });

    card.querySelector('.dynamic-item-remove').addEventListener('click', () => {
      resumeState.education.splice(index, 1);
      renderEducationList();
      updateResumePreview();
    });

    container.appendChild(card);
  });
}

function renderExperienceList() {
  const container = document.getElementById('experience-items-list');
  if (!container) return;
  container.innerHTML = '';

  resumeState.experience.forEach((exp, index) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      <button type="button" class="dynamic-item-remove" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="Company / Business / Shop Name" value="${exp.company}" data-field="company">
      </div>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="Job Title / Role" value="${exp.role}" data-field="role">
      </div>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="Duration (e.g. 2023 - 2024)" value="${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''}" data-field="duration">
      </div>
      <textarea class="form-control" rows="2" placeholder="Key responsibilities..." data-field="description">${exp.description}</textarea>
    `;

    card.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (field === 'duration') {
          const parts = e.target.value.split('-');
          exp.startDate = parts[0]?.trim() || '';
          exp.endDate = parts?.trim() || '';
        } else {
          exp[field] = e.target.value;
        }
        updateResumePreview();
      });
    });

    card.querySelector('.dynamic-item-remove').addEventListener('click', () => {
      resumeState.experience.splice(index, 1);
      renderExperienceList();
      updateResumePreview();
    });

    container.appendChild(card);
  });
}

function renderProjectList() {
  const container = document.getElementById('project-items-list');
  if (!container) return;
  container.innerHTML = '';

  resumeState.projects.forEach((proj, index) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      <button type="button" class="dynamic-item-remove" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="Project Title" value="${proj.title}" data-field="title">
      </div>
      <div class="form-group" style="margin-bottom: 4px;">
        <input type="text" class="form-control" placeholder="Tech Stack / Tools Used" value="${proj.tech}" data-field="tech">
      </div>
      <textarea class="form-control" rows="2" placeholder="Brief project description..." data-field="description">${proj.description}</textarea>
    `;

    card.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        proj[e.target.dataset.field] = e.target.value;
        updateResumePreview();
      });
    });

    card.querySelector('.dynamic-item-remove').addEventListener('click', () => {
      resumeState.projects.splice(index, 1);
      renderProjectList();
      updateResumePreview();
    });

    container.appendChild(card);
  });
}

// Generate Signature Block HTML
function getSignatureBlockHTML() {
  const s = resumeState.signature;
  const p = resumeState.personal;
  if (!s || !s.show) return '';

  let signatureVisualHTML = '';
  if (s.signType === 'image' && s.signImageUrl) {
    signatureVisualHTML = `<img src="${s.signImageUrl}" class="r-sig-image" alt="Signature">`;
  } else if (s.signType === 'cursive') {
    signatureVisualHTML = `<div class="r-sig-cursive">${p.fullName || 'Candidate Sign'}</div>`;
  }

  return `
    <div class="r-signature-footer">
      ${s.declaration ? `<p class="r-declaration-text"><strong>Declaration:</strong> ${s.declaration}</p>` : ''}
      
      <div class="r-sig-row">
        <div class="r-sig-left">
          ${s.place ? `<div><strong>Place:</strong> ${s.place}</div>` : ''}
          ${s.date ? `<div><strong>Date:</strong> ${s.date}</div>` : ''}
        </div>

        <div class="r-sig-right">
          ${signatureVisualHTML}
          <div class="r-sig-line">(${p.fullName || 'Signature'})</div>
        </div>
      </div>
    </div>
  `;
}

// Main Live Preview Renderer
export function updateResumePreview() {
  const preview = document.getElementById('resume-preview-sheet');
  if (!preview) return;

  preview.style.setProperty('--r-primary', resumeState.primaryColor);
  preview.style.setProperty('--r-secondary', resumeState.secondaryColor);
  preview.style.setProperty('--r-font', resumeState.font);
  preview.className = `resume-paper template-${resumeState.template}`;

  const p = resumeState.personal;
  const isLow = resumeState.level === 'low';
  const isMedium = resumeState.level === 'medium';
  const isHigh = resumeState.level === 'high';

  const photoHTML = resumeState.photoUrl 
    ? `<img src="${resumeState.photoUrl}" class="r-photo ${resumeState.photoShape}" alt="Photo">` 
    : '';

  // Contacts Bar
  const contactsHTML = `
    <div class="r-contact-bar">
      ${p.mobile ? `<span>📞 ${p.mobile}</span>` : ''}
      ${p.email ? `<span>✉ ${p.email}</span>` : ''}
      ${p.address ? `<span>📍 ${p.address}</span>` : ''}
      ${(isHigh || isMedium) && p.linkedin ? `<span>🔗 ${p.linkedin}</span>` : ''}
      ${isHigh && p.github ? `<span>💻 ${p.github}</span>` : ''}
    </div>
  `;

  // Objective / Summary Section
  const objectiveHTML = resumeState.objective ? `
    <section class="r-section">
      <h3 class="r-section-title">${isLow ? 'Career Objective' : (isHigh ? 'Professional Summary' : 'Profile Summary')}</h3>
      <p class="r-item-desc">${resumeState.objective}</p>
    </section>
  ` : '';

  // Personal Particulars
  const personalDetailsHTML = (p.fatherName || p.dob) ? `
    <section class="r-section">
      <h3 class="r-section-title">Personal Details</h3>
      <div style="font-size: 8.2pt; display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px;">
        ${p.fatherName ? `<div><strong>Father's Name:</strong> ${p.fatherName}</div>` : ''}
        ${p.dob ? `<div><strong>DOB / Gender:</strong> ${p.dob}</div>` : ''}
      </div>
    </section>
  ` : '';

  // Skills
  const skillsHTML = resumeState.skills.length > 0 ? `
    <section class="r-section">
      <h3 class="r-section-title">${isHigh ? 'Technical Stack & Skills' : (isLow ? 'Key Skills & Abilities' : 'Skills & Competencies')}</h3>
      <div class="r-tags-container">
        ${resumeState.skills.map(s => `<span class="r-tag">${s}</span>`).join('')}
      </div>
    </section>
  ` : '';

  // Education
  const educationHTML = resumeState.education.length > 0 ? `
    <section class="r-section r-education-section">
      <h3 class="r-section-title">Academic Qualifications</h3>
      ${isLow ? `
        <table class="r-table">
          <thead>
            <tr>
              <th>Qualification / Class</th>
              <th>School / Board</th>
              <th>Year</th>
              <th>Score / %</th>
            </tr>
          </thead>
          <tbody>
            ${resumeState.education.map(edu => `
              <tr>
                <td><strong>${edu.degree}</strong></td>
                <td>${edu.institution} ${edu.board ? `(${edu.board})` : ''}</td>
                <td>${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ''}</td>
                <td>${edu.grade}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      ` : `
        ${resumeState.education.map(edu => `
          <div class="r-item">
            <div class="r-item-header">
              <span>${edu.degree}</span>
              <span>${edu.startYear}${edu.endYear ? ` – ${edu.endYear}` : ''}</span>
            </div>
            <div class="r-item-sub">
              <span>${edu.institution} ${edu.board ? `(${edu.board})` : ''}</span>
              <span>${edu.grade ? `Score: ${edu.grade}` : ''}</span>
            </div>
          </div>
        `).join('')}
      `}
    </section>
  ` : '';

  // Work Experience
  const experienceHTML = resumeState.experience.length > 0 ? `
    <section class="r-section r-experience-section">
      <h3 class="r-section-title">Work Experience</h3>
      ${resumeState.experience.map(exp => `
        <div class="r-item">
          <div class="r-item-header">
            <span>${exp.role}</span>
            <span>${exp.startDate}${exp.endDate ? ` – ${exp.endDate}` : ''}</span>
          </div>
          <div class="r-item-sub">
            <span>${exp.company}</span>
          </div>
          <p class="r-item-desc">${exp.description}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  // Projects
  const projectsHTML = (!isLow && resumeState.projects.length > 0) ? `
    <section class="r-section r-projects-section">
      <h3 class="r-section-title">Key Projects</h3>
      ${resumeState.projects.map(proj => `
        <div class="r-item">
          <div class="r-item-header">
            <span>${proj.title}</span>
          </div>
          ${proj.tech ? `<div class="r-item-sub"><span>Tech Stack: ${proj.tech}</span></div>` : ''}
          <p class="r-item-desc">${proj.description}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  // Certifications & Languages
  const certsHTML = (resumeState.certifications || resumeState.languages) ? `
    <section class="r-section">
      <h3 class="r-section-title">Additional Details</h3>
      ${resumeState.certifications ? `<p class="r-item-desc"><strong>Certifications:</strong> ${resumeState.certifications}</p>` : ''}
      ${resumeState.languages ? `<p class="r-item-desc" style="margin-top: 2px;"><strong>Languages:</strong> ${resumeState.languages}</p>` : ''}
    </section>
  ` : '';

  const signatureFooterHTML = getSignatureBlockHTML();

  // Template Switching Render Engine
  if (resumeState.template === 'modern') {
    preview.innerHTML = `
      <div class="r-sidebar">
        ${photoHTML ? `<div style="margin-bottom: 10px; text-align: center;">${photoHTML}</div>` : ''}
        <h1 class="r-name" style="font-size: 15pt;">${p.fullName}</h1>
        ${p.jobTitle ? `<p class="r-title" style="font-size: 8.8pt;">${p.jobTitle}</p>` : ''}
        
        <div style="margin-top: 10px; font-size: 7.8pt; color: #475569;">
          ${p.mobile ? `<p style="margin-bottom: 3px;">📞 ${p.mobile}</p>` : ''}
          ${p.email ? `<p style="margin-bottom: 3px;">✉ ${p.email}</p>` : ''}
          ${p.address ? `<p style="margin-bottom: 3px;">📍 ${p.address}</p>` : ''}
          ${(isHigh || isMedium) && p.linkedin ? `<p style="margin-bottom: 3px;">🔗 ${p.linkedin}</p>` : ''}
        </div>

        <div style="margin-top: 12px;">${skillsHTML}</div>
        <div style="margin-top: 12px;">${personalDetailsHTML}</div>
        <div style="margin-top: 12px;">${certsHTML}</div>
      </div>

      <div class="r-main">
        ${objectiveHTML}
        ${experienceHTML}
        ${projectsHTML}
        ${educationHTML}
        ${signatureFooterHTML}
      </div>
    `;
  } else if (resumeState.template === 'two-column') {
    preview.innerHTML = `
      <header class="r-header" style="border-bottom: 2px solid var(--r-primary); padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 class="r-name">${p.fullName}</h1>
          ${p.jobTitle ? `<p class="r-title">${p.jobTitle}</p>` : ''}
          ${contactsHTML}
        </div>
        ${photoHTML}
      </header>

      <div class="template-two-column">
        <div class="col-left">
          ${personalDetailsHTML}
          ${skillsHTML}
          ${educationHTML}
          ${certsHTML}
        </div>
        <div class="col-right">
          ${objectiveHTML}
          ${experienceHTML}
          ${projectsHTML}
        </div>
      </div>

      ${signatureFooterHTML}
    `;
  } else {
    // Single Column Templates (Classic, Minimal, Corporate, Elegant, Creative, Executive, Student)
    preview.innerHTML = `
      <header class="r-header">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;">
          <div>
            <h1 class="r-name">${p.fullName}</h1>
            ${p.jobTitle ? `<p class="r-title">${p.jobTitle}</p>` : ''}
            ${contactsHTML}
          </div>
          ${photoHTML}
        </div>
      </header>

      <main>
        ${objectiveHTML}
        ${personalDetailsHTML}
        ${educationHTML}
        ${experienceHTML}
        ${projectsHTML}
        ${skillsHTML}
        ${certsHTML}
        ${signatureFooterHTML}
      </main>
    `;
  }
}

// PDF Downloader
async function generatePDF() {
  const element = document.getElementById('resume-preview-sheet');
  const name = resumeState.personal.fullName.replace(/[^a-zA-Z0-9]/g, '_') || 'Resume';

  if (!resumeState.personal.fullName || !resumeState.personal.mobile) {
    showToast('Please provide at least your Name and Mobile number.', 'error');
    return;
  }

  showToast('Generating crisp A4 PDF... ⏳', 'info');

  const opt = {
    margin: [0, 0, 0, 0],
    filename: `${name}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(element).save();
    showToast('Resume PDF downloaded successfully! 🎉', 'success');
  } catch (error) {
    console.error('Error generating PDF:', error);
    showToast('PDF generation failed. You can use Print to Save as PDF.', 'error');
  }
}


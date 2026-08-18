/**
 * MAA ENTERPRISES - COMPLETE RESUME MAKER ENGINE (js/resume-maker.js)
 * Features: Clickable Detail Levels, 9 Templates, New Personal Details (Mother/DOB/Gender/Marital/Nationality),
 * Objective Dropdown, and A4 PDF Rendering.
 */

import { showToast } from './app.js';

// Resume State Object
export const resumeState = {
  level: 'high',
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
    fatherName: 'Sri Ramesh Prasad',
    motherName: 'Smt. Sunita Devi',
    dob: '15/08/2005',
    gender: 'Male',
    maritalStatus: 'Single',
    nationality: 'Indian',
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
  skills: ['Python', 'C++', 'HTML/CSS', 'JavaScript', 'Firebase', 'Circuit Design', 'Problem Solving'],
  education: [
    { degree: 'B.Tech in Electronics & Communication (ECE)', institution: 'Engineering Institute', board: 'State Technical University', startYear: '2026', endYear: '2030', grade: 'Pursuing' },
    { degree: 'Class 12th (Senior Secondary - PCM)', institution: 'Higher Secondary School, Bihar Sharif', board: 'BSEB Patna', startYear: '2024', endYear: '2026', grade: 'First Division' }
  ],
  experience: [
    { company: 'Maa Enterprises Cyber Cafe', role: 'Web Development Assistant', startDate: 'Nov 2025', endDate: 'Present', description: 'Built responsive web interfaces and managed backend.' }
  ],
  projects: [
    { title: 'Online Service Center Web Portal', tech: 'HTML5, CSS3, JS, Firebase', description: 'Designed a full-featured cyber cafe website.' },
    { title: '2D Drift Car Racing Game', tech: 'Python, Pygame', description: 'Implemented vehicle physics and collision detection.' }
  ],
  certifications: 'Lakshya Batch Merit Student, Python for Beginners Certificate',
  languages: 'Hindi (Native), English (Fluent)'
};

// Preset Sample Datasets
export const SAMPLE_PRESETS = {
  low: {
    personal: { fullName: 'Ravi Kumar', jobTitle: '', email: '', mobile: '+91 98765 12340', address: 'Mahalpar, Bihar Sharif', fatherName: 'Sri Shambhu Prasad', motherName: 'Smt. Geeta Devi', dob: '10/05/2004', gender: 'Male', maritalStatus: 'Single', nationality: 'Indian', linkedin: '', github: '' },
    signature: { show: true, declaration: 'I hereby declare that all the information mentioned above is true and correct.', place: 'Bihar Sharif', date: '18/08/2026', signType: 'cursive', signImageUrl: '' },
    objective: 'Self-motivated and hardworking fresher seeking for an opportunity to work in a challenging environment to prove my skills and utilize my knowledge.',
    skills: ['Computer Knowledge', 'Hindi & English Typing', 'Billing', 'Good Communication'],
    education: [
      { degree: 'Intermediate (12th Passed)', institution: 'RPS College, Bihar Sharif', board: 'BSEB Patna', startYear: '2022', endYear: '2024', grade: '65% (1st Div)' },
      { degree: 'Matriculation (10th Passed)', institution: 'High School, Nalanda', board: 'BSEB Patna', startYear: '2020', endYear: '2022', grade: '70% (1st Div)' }
    ],
    experience: [{ company: 'Local Retail Store', role: 'Sales Assistant', startDate: 'Jan 2024', endDate: 'Present', description: 'Customer dealing and cash collection.' }],
    projects: [],
    certifications: 'DCA (6 Months)',
    languages: 'Hindi, Bhojpuri'
  },
  medium: {
    personal: { fullName: 'Pooja Kumari', jobTitle: 'Office Executive', email: 'pooja@gmail.com', mobile: '+91 98765 88990', address: 'Ramchandrapur, Bihar Sharif', fatherName: 'Sri Mahendra Sharma', motherName: 'Smt. Rekha Devi', dob: '20/11/2002', gender: 'Female', maritalStatus: 'Single', nationality: 'Indian', linkedin: 'linkedin.com/in/poojakumari', github: '' },
    signature: { show: true, declaration: 'I hereby declare that all the above details are authentic and true.', place: 'Bihar Sharif', date: '18/08/2026', signType: 'cursive', signImageUrl: '' },
    objective: 'To seek a good & responsible job in professionally managed organization where my skills are effectively utilized.',
    skills: ['Tally Prime & GST', 'Advance Excel', 'Office Administration', 'Financial Record Keeping'],
    education: [
      { degree: 'B.Com (Accounts Hons)', institution: 'Nalanda College', board: 'PPU', startYear: '2021', endYear: '2024', grade: '72%' },
      { degree: 'Class 12th (Commerce)', institution: 'Soghra College', board: 'BSEB Patna', startYear: '2019', endYear: '2021', grade: '1st Division' }
    ],
    experience: [{ company: 'Vikas Logistics', role: 'Accounts Executive', startDate: 'Aug 2024', endDate: 'Present', description: 'Prepared GST invoices and managed petty cash.' }],
    projects: [{ title: 'Inventory Management System', tech: 'Tally Prime, Excel', description: 'Automated stock ledger tracking.' }],
    certifications: 'Tally Prime Certificate',
    languages: 'Hindi, English'
  },
  high: {
    personal: { fullName: 'Mayank Raj', jobTitle: 'ECE Engineering Student & Web Developer', email: 'mayank.raj@example.com', mobile: '+91 98765 43210', address: 'Mahalpar, Bihar Sharif', fatherName: 'Sri Ramesh Prasad', motherName: 'Smt. Sunita Devi', dob: '15/08/2005', gender: 'Male', maritalStatus: 'Single', nationality: 'Indian', linkedin: 'linkedin.com/in/mayankraj', github: 'github.com/mayankraj' },
    signature: { show: true, declaration: 'I hereby declare that all the information provided above is true and correct.', place: 'Bihar Sharif', date: '18/08/2026', signType: 'cursive', signImageUrl: '' },
    objective: 'Secure a responsible career opportunity to fully utilize my talent and skills to grow, while making a significant contribution to the success of the company.',
    skills: ['Python', 'C++', 'HTML/CSS', 'JavaScript', 'Firebase', 'Data Structures'],
    education: [
      { degree: 'B.Tech in ECE', institution: 'Engineering Institute', board: 'Technical University', startYear: '2026', endYear: '2030', grade: 'Pursuing' },
      { degree: 'Class 12th (PCM)', institution: 'Higher Secondary School', board: 'BSEB Patna', startYear: '2024', endYear: '2026', grade: '1st Division' }
    ],
    experience: [{ company: 'Maa Enterprises Cyber Cafe', role: 'Web Developer', startDate: 'Nov 2025', endDate: 'Present', description: 'Built responsive web interfaces.' }],
    projects: [
      { title: 'Service Center Portal', tech: 'HTML, JS, Firebase', description: 'Designed a cyber cafe website.' },
      { title: '2D Drift Game', tech: 'Python, Pygame', description: 'Implemented vehicle physics.' }
    ],
    certifications: 'Python for Beginners Certificate',
    languages: 'Hindi, English'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initLevelCardListeners();
  initZoomControls();
  initSignatureControls();
  initDOMListeners();
  applyLevelUI(resumeState.level);
  syncFormValuesFromState();
  renderEducationList();
  renderExperienceList();
  renderProjectList();
  updateResumePreview();
});

// 1. EXACT CLICK LISTENER FOR THE 3 CARDS
function initLevelCardListeners() {
  const cards = document.querySelectorAll('.level-btn-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const level = card.dataset.level;
      
      // Update UI active states
      cards.forEach(c => {
        c.classList.remove('active-low', 'active-medium', 'active-high');
      });
      card.classList.add(`active-${level}`);

      // Change Mode
      resumeState.level = level;

      const badge = document.getElementById('current-level-badge');
      const modeTitle = document.getElementById('active-mode-title');

      if (level === 'low') {
        if (badge) { badge.textContent = '🟢 Mode: Low Detail (Basic / Local Jobs)'; badge.style.background = 'rgba(16,185,129,0.2)'; badge.style.color = '#a7f3d0'; badge.style.borderColor = '#10b981'; }
        if (modeTitle) modeTitle.textContent = '📝 Editing: Basic Bio-Data & Local Job Resume';
      } else if (level === 'medium') {
        if (badge) { badge.textContent = '🟡 Mode: Medium Detail (Graduate / Pro)'; badge.style.background = 'rgba(2,132,199,0.2)'; badge.style.color = '#bae6fd'; badge.style.borderColor = '#0284c7'; }
        if (modeTitle) modeTitle.textContent = '💼 Editing: Professional Graduate & Executive Resume';
      } else {
        if (badge) { badge.textContent = '🔵 Mode: High Detail (Engineering CV)'; badge.style.background = 'rgba(139,92,246,0.2)'; badge.style.color = '#ddd6fe'; badge.style.borderColor = '#8b5cf6'; }
        if (modeTitle) modeTitle.textContent = '💻 Editing: Comprehensive Engineering CV';
      }

      applyLevelUI(level);
      loadPresetData(level);
      showToast(`Switched to ${level.toUpperCase()} Resume Mode!`, 'info');
    });
  });
}

function applyLevelUI(level) {
  const secJobTitle = document.getElementById('sec-jobtitle');
  const secSocialLinks = document.getElementById('sec-social-links');
  const secGithubBox = document.getElementById('sec-github-box');
  const secProjectsWrapper = document.getElementById('sec-projects-wrapper');
  
  if (level === 'low') {
    if (secJobTitle) secJobTitle.style.display = 'none';
    if (secSocialLinks) secSocialLinks.style.display = 'none';
    if (secGithubBox) secGithubBox.style.display = 'none';
    if (secProjectsWrapper) secProjectsWrapper.style.display = 'none';
  } else if (level === 'medium') {
    if (secJobTitle) secJobTitle.style.display = 'block';
    if (secSocialLinks) secSocialLinks.style.display = 'grid';
    if (secGithubBox) secGithubBox.style.display = 'none';
    if (secProjectsWrapper) secProjectsWrapper.style.display = 'block';
  } else {
    if (secJobTitle) secJobTitle.style.display = 'block';
    if (secSocialLinks) secSocialLinks.style.display = 'grid';
    if (secGithubBox) secGithubBox.style.display = 'block';
    if (secProjectsWrapper) secProjectsWrapper.style.display = 'block';
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
  document.getElementById('r-fullname').value = p.fullName;
  document.getElementById('r-jobtitle').value = p.jobTitle || '';
  document.getElementById('r-email').value = p.email || '';
  document.getElementById('r-mobile').value = p.mobile || '';
  document.getElementById('r-address').value = p.address || '';
  document.getElementById('r-fathername').value = p.fatherName || '';
  document.getElementById('r-mothername').value = p.motherName || '';
  document.getElementById('r-dob').value = p.dob || '';
  document.getElementById('r-gender').value = p.gender || '';
  document.getElementById('r-marital').value = p.maritalStatus || '';
  document.getElementById('r-nationality').value = p.nationality || '';
  document.getElementById('r-linkedin').value = p.linkedin || '';
  document.getElementById('r-github').value = p.github || '';

  const s = resumeState.signature;
  document.getElementById('r-declaration').value = s.declaration;
  document.getElementById('r-place').value = s.place;
  document.getElementById('r-date').value = s.date;
  document.getElementById('r-show-signature').checked = s.show;
  document.getElementById('r-sign-type').value = s.signType;

  document.getElementById('r-objective').value = resumeState.objective;
  document.getElementById('r-skills').value = resumeState.skills.join(', ');
  document.getElementById('r-certifications').value = resumeState.certifications;
  document.getElementById('r-languages').value = resumeState.languages;
}

function initDOMListeners() {
  // Career Objective Selector Dropdown
  document.getElementById('r-objective-select')?.addEventListener('change', (e) => {
    if(e.target.value) {
      document.getElementById('r-objective').value = e.target.value;
      resumeState.objective = e.target.value;
      updateResumePreview();
    }
  });

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
      document.getElementById('r-custom-color').value = swatch.dataset.primary;
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

  // Bind Standard Text Inputs
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
  bindInput('r-mothername', resumeState.personal, 'motherName');
  bindInput('r-dob', resumeState.personal, 'dob');
  bindInput('r-nationality', resumeState.personal, 'nationality');
  bindInput('r-linkedin', resumeState.personal, 'linkedin');
  bindInput('r-github', resumeState.personal, 'github');

  document.getElementById('r-gender')?.addEventListener('change', (e) => { resumeState.personal.gender = e.target.value; updateResumePreview(); });
  document.getElementById('r-marital')?.addEventListener('change', (e) => { resumeState.personal.maritalStatus = e.target.value; updateResumePreview(); });
  document.getElementById('r-objective')?.addEventListener('input', (e) => { resumeState.objective = e.target.value; updateResumePreview(); });
  document.getElementById('r-skills')?.addEventListener('input', (e) => { resumeState.skills = e.target.value.split(',').map(s => s.trim()).filter(Boolean); updateResumePreview(); });
  document.getElementById('r-certifications')?.addEventListener('input', (e) => { resumeState.certifications = e.target.value; updateResumePreview(); });
  document.getElementById('r-languages')?.addEventListener('input', (e) => { resumeState.languages = e.target.value; updateResumePreview(); });

  // Add Item Buttons
  document.getElementById('btn-add-education')?.addEventListener('click', () => {
    resumeState.education.push({ degree: 'Class/Degree', institution: 'School/College', board: 'Board', startYear: '2020', endYear: '2022', grade: 'Pass' });
    renderEducationList(); updateResumePreview();
  });
  document.getElementById('btn-add-experience')?.addEventListener('click', () => {
    resumeState.experience.push({ company: 'Company Name', role: 'Role', startDate: '2023', endDate: '2024', description: 'Work details.' });
    renderExperienceList(); updateResumePreview();
  });
  document.getElementById('btn-add-project')?.addEventListener('click', () => {
    resumeState.projects.push({ title: 'New Project', tech: 'Tools', description: 'Details' });
    renderProjectList(); updateResumePreview();
  });

  // Top Buttons
  document.getElementById('btn-load-sample')?.addEventListener('click', () => { loadPresetData(resumeState.level); showToast('Loaded sample details!', 'success'); });
  document.getElementById('btn-reset-resume')?.addEventListener('click', () => {
    if (confirm('Clear all resume fields?')) {
      resumeState.personal = { fullName:'', jobTitle:'', email:'', mobile:'', address:'', fatherName:'', motherName:'', dob:'', gender:'', maritalStatus:'', nationality:'Indian', linkedin:'', github:'' };
      resumeState.objective = ''; resumeState.skills = []; resumeState.education = []; resumeState.experience = []; resumeState.projects = []; resumeState.certifications = ''; resumeState.languages = '';
      syncFormValuesFromState(); renderEducationList(); renderExperienceList(); renderProjectList(); updateResumePreview();
    }
  });
  document.getElementById('btn-print-resume')?.addEventListener('click', () => window.print());
  document.getElementById('btn-download-pdf')?.addEventListener('click', generatePDF);
}

function initZoomControls() {
  const previewWrapper = document.getElementById('preview-wrapper');
  const zoomText = document.getElementById('zoom-value-text');
  const setZoom = (scale) => {
    resumeState.zoomScale = Math.min(Math.max(scale, 0.6), 1.5);
    if (previewWrapper) previewWrapper.style.setProperty('--zoom-scale', resumeState.zoomScale);
    if (zoomText) zoomText.textContent = `${Math.round(resumeState.zoomScale * 100)}%`;
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
  
  showSignCheckbox?.addEventListener('change', (e) => { resumeState.signature.show = e.target.checked; updateResumePreview(); });
  declInput?.addEventListener('input', (e) => { resumeState.signature.declaration = e.target.value; updateResumePreview(); });
  placeInput?.addEventListener('input', (e) => { resumeState.signature.place = e.target.value; updateResumePreview(); });
  dateInput?.addEventListener('input', (e) => { resumeState.signature.date = e.target.value; updateResumePreview(); });
  document.getElementById('btn-set-today')?.addEventListener('click', () => {
    const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    resumeState.signature.date = today; document.getElementById('r-date').value = today; updateResumePreview();
  });
  signTypeSelect?.addEventListener('change', (e) => {
    resumeState.signature.signType = e.target.value;
    if (signFileBox) signFileBox.style.display = e.target.value === 'image' ? 'block' : 'none';
    updateResumePreview();
  });
}

function renderEducationList() {
  const container = document.getElementById('education-items-list');
  if (!container) return;
  container.innerHTML = '';
  resumeState.education.forEach((edu, index) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `<button type="button" class="dynamic-item-remove" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="Degree / Class" value="${edu.degree}" data-field="degree"></div>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="School / Board" value="${edu.institution}" data-field="institution"></div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px;">
        <input type="text" class="form-control" placeholder="Year" value="${edu.startYear}${edu.endYear ? ` - ${edu.endYear}` : ''}" data-field="years">
        <input type="text" class="form-control" placeholder="Marks / %" value="${edu.grade}" data-field="grade">
      </div>`;
    card.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (field === 'years') { const p = e.target.value.split('-'); edu.startYear = p[0]?.trim()||''; edu.endYear = p[1]?.trim()||''; } 
        else { edu[field] = e.target.value; }
        updateResumePreview();
      });
    });
    card.querySelector('.dynamic-item-remove').addEventListener('click', () => { resumeState.education.splice(index, 1); renderEducationList(); updateResumePreview(); });
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
    card.innerHTML = `<button type="button" class="dynamic-item-remove" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="Company / Shop Name" value="${exp.company}" data-field="company"></div>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="Role" value="${exp.role}" data-field="role"></div>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="Duration" value="${exp.startDate}${exp.endDate ? ` - ${exp.endDate}` : ''}" data-field="duration"></div>
      <textarea class="form-control" rows="2" placeholder="Responsibilities..." data-field="description">${exp.description}</textarea>`;
    card.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (field === 'duration') { const p = e.target.value.split('-'); exp.startDate = p[0]?.trim()||''; exp.endDate = p[1]?.trim()||''; } 
        else { exp[field] = e.target.value; }
        updateResumePreview();
      });
    });
    card.querySelector('.dynamic-item-remove').addEventListener('click', () => { resumeState.experience.splice(index, 1); renderExperienceList(); updateResumePreview(); });
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
    card.innerHTML = `<button type="button" class="dynamic-item-remove" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="Project Title" value="${proj.title}" data-field="title"></div>
      <div class="form-group" style="margin-bottom: 4px;"><input type="text" class="form-control" placeholder="Tech Stack" value="${proj.tech}" data-field="tech"></div>
      <textarea class="form-control" rows="2" placeholder="Description..." data-field="description">${proj.description}</textarea>`;
    card.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => { proj[e.target.dataset.field] = e.target.value; updateResumePreview(); });
    });
    card.querySelector('.dynamic-item-remove').addEventListener('click', () => { resumeState.projects.splice(index, 1); renderProjectList(); updateResumePreview(); });
    container.appendChild(card);
  });
}

// Generate Signature Block HTML
function getSignatureBlockHTML() {
  const s = resumeState.signature;
  const p = resumeState.personal;
  if (!s || !s.show) return '';
  let signatureVisualHTML = '';
  if (s.signType === 'image' && s.signImageUrl) { signatureVisualHTML = `<img src="${s.signImageUrl}" class="r-sig-image" alt="Signature">`; } 
  else if (s.signType === 'cursive') { signatureVisualHTML = `<div class="r-sig-cursive">${p.fullName || 'Candidate Sign'}</div>`; }
  return `
    <div class="r-signature-footer">
      ${s.declaration ? `<p class="r-declaration-text"><strong>Declaration:</strong> ${s.declaration}</p>` : ''}
      <div class="r-sig-row">
        <div class="r-sig-left">${s.place ? `<div><strong>Place:</strong> ${s.place}</div>` : ''}${s.date ? `<div><strong>Date:</strong> ${s.date}</div>` : ''}</div>
        <div class="r-sig-right">${signatureVisualHTML}<div class="r-sig-line">(${p.fullName || 'Signature'})</div></div>
      </div>
    </div>`;
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

  const photoHTML = resumeState.photoUrl ? `<img src="${resumeState.photoUrl}" class="r-photo ${resumeState.photoShape}">` : '';

  // Contacts
  const contactsHTML = `<div class="r-contact-bar">
      ${p.mobile ? `<span>📞 ${p.mobile}</span>` : ''}
      ${p.email ? `<span>✉ ${p.email}</span>` : ''}
      ${p.address ? `<span>📍 ${p.address}</span>` : ''}
      ${(isHigh || isMedium) && p.linkedin ? `<span>🔗 ${p.linkedin}</span>` : ''}
      ${isHigh && p.github ? `<span>💻 ${p.github}</span>` : ''}
    </div>`;

  // Objective
  const objectiveHTML = resumeState.objective ? `<section class="r-section"><h3 class="r-section-title">${isLow ? 'Career Objective' : 'Professional Summary'}</h3><p class="r-item-desc">${resumeState.objective}</p></section>` : '';

  // FULL Personal Details Table
  const hasPersonal = p.fatherName || p.motherName || p.dob || p.gender || p.maritalStatus || p.nationality;
  const personalDetailsHTML = hasPersonal ? `
    <section class="r-section">
      <h3 class="r-section-title">Personal Details</h3>
      <table class="r-personal-table">
        ${p.fatherName ? `<tr><td><strong>Father's Name</strong></td><td>: ${p.fatherName}</td></tr>` : ''}
        ${p.motherName ? `<tr><td><strong>Mother's Name</strong></td><td>: ${p.motherName}</td></tr>` : ''}
        ${p.dob ? `<tr><td><strong>Date of Birth</strong></td><td>: ${p.dob}</td></tr>` : ''}
        ${p.gender ? `<tr><td><strong>Gender</strong></td><td>: ${p.gender}</td></tr>` : ''}
        ${p.maritalStatus ? `<tr><td><strong>Marital Status</strong></td><td>: ${p.maritalStatus}</td></tr>` : ''}
        ${p.nationality ? `<tr><td><strong>Nationality</strong></td><td>: ${p.nationality}</td></tr>` : ''}
      </table>
    </section>
  ` : '';

  // Skills
  const skillsHTML = resumeState.skills.length > 0 ? `<section class="r-section"><h3 class="r-section-title">Key Skills</h3><div class="r-tags-container">${resumeState.skills.map(s => `<span class="r-tag">${s}</span>`).join('')}</div></section>` : '';

  // Education (Table for Low, List for others)
  const educationHTML = resumeState.education.length > 0 ? `
    <section class="r-section r-education-section">
      <h3 class="r-section-title">Academic Qualifications</h3>
      ${isLow ? `
        <table class="r-table">
          <thead><tr><th>Qualification</th><th>Board / University</th><th>Year</th><th>Score</th></tr></thead>
          <tbody>${resumeState.education.map(edu => `<tr><td><strong>${edu.degree}</strong></td><td>${edu.institution} ${edu.board?`(${edu.board})`:''}</td><td>${edu.startYear}${edu.endYear?`-${edu.endYear}`:''}</td><td>${edu.grade}</td></tr>`).join('')}</tbody>
        </table>
      ` : `
        ${resumeState.education.map(edu => `<div class="r-item"><div class="r-item-header"><span>${edu.degree}</span><span>${edu.startYear}${edu.endYear?` – ${edu.endYear}`:''}</span></div><div class="r-item-sub"><span>${edu.institution} ${edu.board?`(${edu.board})`:''}</span><span>${edu.grade?`Score: ${edu.grade}`:''}</span></div></div>`).join('')}
      `}
    </section>
  ` : '';

  // Work Experience
  const experienceHTML = resumeState.experience.length > 0 ? `<section class="r-section r-experience-section"><h3 class="r-section-title">Work Experience</h3>${resumeState.experience.map(exp => `<div class="r-item"><div class="r-item-header"><span>${exp.role}</span><span>${exp.startDate}${exp.endDate?` – ${exp.endDate}`:''}</span></div><div class="r-item-sub"><span>${exp.company}</span></div><p class="r-item-desc">${exp.description}</p></div>`).join('')}</section>` : '';

  // Projects
  const projectsHTML = (!isLow && resumeState.projects.length > 0) ? `<section class="r-section r-projects-section"><h3 class="r-section-title">Key Projects</h3>${resumeState.projects.map(proj => `<div class="r-item"><div class="r-item-header"><span>${proj.title}</span></div>${proj.tech?`<div class="r-item-sub"><span>Tech Stack: ${proj.tech}</span></div>`:''}<p class="r-item-desc">${proj.description}</p></div>`).join('')}</section>` : '';

  // Certifications & Languages
  const certsHTML = (resumeState.certifications || resumeState.languages) ? `<section class="r-section"><h3 class="r-section-title">Additional Details</h3>${resumeState.certifications ? `<p class="r-item-desc"><strong>Certifications:</strong> ${resumeState.certifications}</p>` : ''}${resumeState.languages ? `<p class="r-item-desc" style="margin-top: 2px;"><strong>Languages:</strong> ${resumeState.languages}</p>` : ''}</section>` : '';

  const signatureFooterHTML = getSignatureBlockHTML();

  // Insert into Templates
  if (resumeState.template === 'modern') {
    preview.innerHTML = `<div class="r-sidebar">${photoHTML ? `<div style="margin-bottom:10px;text-align:center;">${photoHTML}</div>` : ''}<h1 class="r-name" style="font-size:15pt;">${p.fullName}</h1>${p.jobTitle ? `<p class="r-title" style="font-size:8.8pt;">${p.jobTitle}</p>` : ''}<div style="margin-top:10px;font-size:7.8pt;color:#475569;">${p.mobile ? `<p>📞 ${p.mobile}</p>` : ''}${p.email ? `<p>✉ ${p.email}</p>` : ''}${p.address ? `<p>📍 ${p.address}</p>` : ''}</div><div style="margin-top:12px;">${skillsHTML}</div><div style="margin-top:12px;">${certsHTML}</div></div><div class="r-main">${objectiveHTML}${personalDetailsHTML}${experienceHTML}${projectsHTML}${educationHTML}${signatureFooterHTML}</div>`;
  } else if (resumeState.template === 'two-column') {
    preview.innerHTML = `<header class="r-header" style="border-bottom: 2px solid var(--r-primary); padding-bottom: 6px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;"><div><h1 class="r-name">${p.fullName}</h1>${p.jobTitle ? `<p class="r-title">${p.jobTitle}</p>` : ''}${contactsHTML}</div>${photoHTML}</header><div class="template-two-column"><div class="col-left">${personalDetailsHTML}${skillsHTML}${educationHTML}${certsHTML}</div><div class="col-right">${objectiveHTML}${experienceHTML}${projectsHTML}</div></div>${signatureFooterHTML}`;
  } else {
    preview.innerHTML = `<header class="r-header"><div style="display: flex; justify-content: space-between; align-items: center; gap: 10px;"><div><h1 class="r-name">${p.fullName}</h1>${p.jobTitle ? `<p class="r-title">${p.jobTitle}</p>` : ''}${contactsHTML}</div>${photoHTML}</div></header><main>${objectiveHTML}${personalDetailsHTML}${educationHTML}${experienceHTML}${projectsHTML}${skillsHTML}${certsHTML}${signatureFooterHTML}</main>`;
  }
}

async function generatePDF() {
  const element = document.getElementById('resume-preview-sheet');
  const name = resumeState.personal.fullName.replace(/[^a-zA-Z0-9]/g, '_') || 'Resume';
  if (!resumeState.personal.fullName || !resumeState.personal.mobile) { showToast('Provide at least Name and Mobile.', 'error'); return; }
  showToast('Generating crisp A4 PDF... ⏳', 'info');
  const opt = { margin: 0, filename: `${name}_Resume.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true, letterRendering: true }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
  try { await html2pdf().set(opt).from(element).save(); showToast('PDF downloaded successfully! 🎉', 'success'); } catch (error) { showToast('PDF failed.', 'error'); }
}


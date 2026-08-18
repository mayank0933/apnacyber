/**
 * MAA ENTERPRISES - COMPLETE RESUME MAKER ENGINE
 * Includes: 3 Detail Levels (Basic, Standard, Engineering), 9 Templates, PDF Generation
 */

import { showToast } from './app.js';

// Global Resume State
const resumeState = {
  template: 'two-column',
  font: "'Segoe UI', Arial, sans-serif",
  primaryColor: '#1e40af',
  secondaryColor: '#0f766e',
  accentColor: '#f59e0b',
  photoUrl: '',
  photoShape: 'circle',
  personal: {},
  objective: '',
  skills: [],
  education: [],
  experience: [],
  projects: [],
  certifications: '',
  languages: ''
};

document.addEventListener('DOMContentLoaded', () => {
  initDOMListeners();
  // Simulate clicking the "High" level button to load initial engineering data
  document.querySelector('.level-btn[data-level="high"]').click();
});

function initDOMListeners() {
  
  // ==========================================
  // 1. LEVEL SELECTOR LOGIC (Low, Medium, High)
  // ==========================================
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Update Button UI
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const level = btn.dataset.level;

      // Apply Data & Visibility based on Level
      if (level === 'low') {
        resumeState.template = 'minimal';
        resumeState.personal = { fullName: 'Rahul Kumar', jobTitle: 'Fresher / Hardworking Individual', email: '', mobile: '+91 98765 00000', address: 'Bihar Sharif, Nalanda', linkedin: '', github: '' };
        resumeState.objective = 'A hardworking and honest individual looking for a reliable job opportunity in a local shop or business. Ready to learn new things and give my best effort to the work given to me.';
        resumeState.skills = ['Hardworking', 'Punctual', 'Honest', 'Basic Computer', 'Good Communication'];
        resumeState.education = [{ degree: 'Matriculation (10th)', institution: 'High School, Bihar Sharif', board: 'BSEB', startYear: '2020', endYear: '2021', grade: '1st Division' }];
        resumeState.experience = [];
        resumeState.projects = [];
        resumeState.certifications = '';
        resumeState.languages = 'Hindi, Basic English';

        document.getElementById('section-projects').style.display = 'none';
        document.getElementById('section-certs').style.display = 'none';
        document.getElementById('section-links').style.display = 'none';
        document.getElementById('level-desc').innerHTML = '<strong>Basic (Low Detail):</strong> Best for local shops, factory work, or 10th/12th pass. Contains basic details and a short summary.';
      } 
      else if (level === 'medium') {
        resumeState.template = 'modern';
        resumeState.personal = { fullName: 'Vikash Singh', jobTitle: 'IT Professional / Graduate', email: 'vikash@example.com', mobile: '+91 98765 11111', address: 'Patna, Bihar', linkedin: 'linkedin.com/in/vikash', github: '' };
        resumeState.objective = 'Motivated professional with experience in technical projects and teamwork. Passionate about applying my skills to solve real-world problems and contributing to company growth.';
        resumeState.skills = ['HTML & CSS', 'Management', 'Teamwork', 'Communication', 'MS Office'];
        resumeState.education = [
          { degree: 'B.Sc / Graduation', institution: 'Science College', board: 'University', startYear: '2019', endYear: '2022', grade: 'A Grade' },
          { degree: 'Intermediate (12th)', institution: 'High School', board: 'BSEB', startYear: '2017', endYear: '2019', grade: '1st Division' }
        ];
        resumeState.experience = [{ company: 'Local Tech Agency', role: 'Intern / Junior Staff', startDate: 'Jan 2023', endDate: 'Present', description: 'Assisted in daily operations, handled client data, and managed digital records.' }];
        resumeState.projects = [{ title: 'College Management System', tech: 'Basic Web Tech', description: 'A basic portal for managing student records.' }];
        resumeState.certifications = 'Basic Computer Course (BCC)';
        resumeState.languages = 'Hindi, English';

        document.getElementById('section-projects').style.display = 'block';
        document.getElementById('section-certs').style.display = 'none';
        document.getElementById('section-links').style.display = ''; // revert to flex/grid
        document.getElementById('level-desc').innerHTML = '<strong>Standard (Medium Detail):</strong> Standard resume with projects and experience. Good for mid-level jobs or standard IT roles.';
      } 
      else if (level === 'high') {
        resumeState.template = 'two-column';
        resumeState.personal = { fullName: 'Mayank Raj', jobTitle: 'ECE Engineering Student & Web Developer', email: 'mayank.raj@example.com', mobile: '+91 98765 43210', address: 'Mahalpar, Bihar Sharif', linkedin: 'linkedin.com/in/mayankraj', github: 'github.com/mayankraj' };
        resumeState.objective = 'Passionate engineering student with strong foundations in Electronics, Web Development, and Python programming. Seeking an opportunity to leverage analytical and technical skills in an innovative engineering environment.';
        resumeState.skills = ['Python', 'C++', 'HTML/CSS', 'JavaScript', 'Firebase', 'Circuit Design', 'Problem Solving'];
        resumeState.education = [
          { degree: 'B.Tech in Electronics (ECE)', institution: 'Engineering Institute', board: 'State University', startYear: '2026', endYear: '2030', grade: 'Pursuing' },
          { degree: 'Class 12th (PCM)', institution: 'Higher Secondary School', board: 'BSEB Patna', startYear: '2024', endYear: '2026', grade: 'First Division' }
        ];
        resumeState.experience = [{ company: 'Maa Enterprises Cyber Cafe', role: 'Web Development Assistant', startDate: 'Nov 2025', endDate: 'Present', description: 'Built responsive web interfaces and managed Firebase backend integrations.' }];
        resumeState.projects = [
          { title: 'Online Service Center Portal', tech: 'HTML, JS, Firebase', description: 'Designed a full-featured cyber cafe website with live request tracking.' },
          { title: '2D Drift Car Racing Game', tech: 'Python, Pygame', description: 'Implemented vehicle physics and collision detection.' }
        ];
        resumeState.certifications = 'Lakshya Batch Merit Student, Python for Beginners';
        resumeState.languages = 'Hindi (Native), English (Fluent)';

        document.getElementById('section-projects').style.display = 'block';
        document.getElementById('section-certs').style.display = 'block';
        document.getElementById('section-links').style.display = '';
        document.getElementById('level-desc').innerHTML = '<strong>Engineering (High Detail):</strong> Highly detailed resume with all technical sections, multiple projects, and certifications.';
      }

      // Visually update template selector
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
      const activeTemplateCard = document.querySelector(`.template-card[data-template="${resumeState.template}"]`);
      if (activeTemplateCard) activeTemplateCard.classList.add('active');

      syncFormWithState();
      updateResumePreview();
      showToast(`${level.toUpperCase()} Resume Level Loaded`, 'info');
    });
  });

  // ==========================================
  // 2. OTHER LISTENERS (Templates, Colors, Inputs)
  // ==========================================
  document.querySelectorAll('#template-selector-grid .template-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('#template-selector-grid .template-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      resumeState.template = card.dataset.template;
      updateResumePreview();
    });
  });

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

  // Input bindings
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
        showToast('Image size exceeds 2.5MB.', 'error'); return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        resumeState.photoUrl = event.target.result;
        document.getElementById('photo-preview-img').src = event.target.result;
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
    photoInput.value = '';
    document.getElementById('photo-preview-img').src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 24 24' fill='%2394a3b8'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
    updateResumePreview();
  });

  // Add Row Buttons
  document.getElementById('btn-add-education')?.addEventListener('click', () => {
    resumeState.education.push({ degree: '', institution: '', board: '', startYear: '', endYear: '', grade: '' });
    renderEducationList(); updateResumePreview();
  });
  document.getElementById('btn-add-experience')?.addEventListener('click', () => {
    resumeState.experience.push({ company: '', role: '', startDate: '', endDate: '', description: '' });
    renderExperienceList(); updateResumePreview();
  });
  document.getElementById('btn-add-project')?.addEventListener('click', () => {
    resumeState.projects.push({ title: '', tech: '', description: '' });
    renderProjectList(); updateResumePreview();
  });

  // Toolbar
  document.getElementById('btn-reset-resume')?.addEventListener('click', () => {
    resumeState.personal = {}; resumeState.objective = ''; resumeState.skills = []; resumeState.education = []; resumeState.experience = []; resumeState.projects = []; resumeState.certifications = ''; resumeState.languages = '';
    syncFormWithState(); updateResumePreview();
  });
  document.getElementById('btn-print-resume')?.addEventListener('click', () => window.print());
  document.getElementById('btn-download-pdf')?.addEventListener('click', generatePDF);
}

// ==========================================
// 3. SYNCHRONIZE HTML FORM WITH STATE
// ==========================================
function syncFormWithState() {
  document.getElementById('r-fullname').value = resumeState.personal.fullName || '';
  document.getElementById('r-jobtitle').value = resumeState.personal.jobTitle || '';
  document.getElementById('r-email').value = resumeState.personal.email || '';
  document.getElementById('r-mobile').value = resumeState.personal.mobile || '';
  document.getElementById('r-address').value = resumeState.personal.address || '';
  document.getElementById('r-linkedin').value = resumeState.personal.linkedin || '';
  document.getElementById('r-github').value = resumeState.personal.github || '';
  
  document.getElementById('r-objective').value = resumeState.objective || '';
  document.getElementById('r-skills').value = resumeState.skills.join(', ') || '';
  document.getElementById('r-certifications').value = resumeState.certifications || '';
  document.getElementById('r-languages').value = resumeState.languages || '';

  renderEducationList();
  renderExperienceList();
  renderProjectList();
}

// ==========================================
// 4. RENDER DYNAMIC LISTS
// ==========================================
function renderEducationList() {
  const container = document.getElementById('education-items-list');
  if (!container) return;
  container.innerHTML = '';

  resumeState.education.forEach((edu, index) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      <button type="button" class="dynamic-item-remove">✕</button>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Degree / Class" value="${edu.degree}" data-field="degree">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="School / College" value="${edu.institution}" data-field="institution">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <input type="text" class="form-control" placeholder="Year (e.g. 2020-2022)" value="${edu.startYear}${edu.endYear ? ' - ' + edu.endYear : ''}" data-field="years">
        <input type="text" class="form-control" placeholder="Grade / %" value="${edu.grade || ''}" data-field="grade">
      </div>
    `;

    card.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (field === 'years') {
          const parts = e.target.value.split('-');
          edu.startYear = parts[0]?.trim() || '';
          edu.endYear = parts[1]?.trim() || '';
        } else {
          edu[field] = e.target.value;
        }
        updateResumePreview();
      });
    });

    card.querySelector('.dynamic-item-remove').addEventListener('click', () => {
      resumeState.education.splice(index, 1);
      renderEducationList(); updateResumePreview();
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
      <button type="button" class="dynamic-item-remove">✕</button>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Company / Shop Name" value="${exp.company}" data-field="company">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Job Role" value="${exp.role}" data-field="role">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Duration (e.g. 2023 - Present)" value="${exp.startDate}${exp.endDate ? ' - ' + exp.endDate : ''}" data-field="duration">
      </div>
      <textarea class="form-control" rows="2" placeholder="Work details..." data-field="description">${exp.description || ''}</textarea>
    `;

    card.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        const field = e.target.dataset.field;
        if (field === 'duration') {
          const parts = e.target.value.split('-');
          exp.startDate = parts[0]?.trim() || '';
          exp.endDate = parts[1]?.trim() || '';
        } else {
          exp[field] = e.target.value;
        }
        updateResumePreview();
      });
    });

    card.querySelector('.dynamic-item-remove').addEventListener('click', () => {
      resumeState.experience.splice(index, 1);
      renderExperienceList(); updateResumePreview();
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
      <button type="button" class="dynamic-item-remove">✕</button>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Project Name" value="${proj.title}" data-field="title">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Tech / Skills Used" value="${proj.tech || ''}" data-field="tech">
      </div>
      <textarea class="form-control" rows="2" placeholder="Project details..." data-field="description">${proj.description || ''}</textarea>
    `;

    card.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', (e) => {
        proj[e.target.dataset.field] = e.target.value;
        updateResumePreview();
      });
    });

    card.querySelector('.dynamic-item-remove').addEventListener('click', () => {
      resumeState.projects.splice(index, 1);
      renderProjectList(); updateResumePreview();
    });
    container.appendChild(card);
  });
}

// ==========================================
// 5. LIVE PDF PREVIEW ENGINE
// ==========================================
export function updateResumePreview() {
  const preview = document.getElementById('resume-preview-sheet');
  if (!preview) return;

  preview.style.setProperty('--r-primary', resumeState.primaryColor);
  preview.style.setProperty('--r-secondary', resumeState.secondaryColor);
  preview.style.setProperty('--r-font', resumeState.font);
  preview.className = `resume-paper template-${resumeState.template}`;

  const p = resumeState.personal;
  const photoHTML = resumeState.photoUrl ? `<img src="${resumeState.photoUrl}" class="r-photo ${resumeState.photoShape}" alt="Photo">` : '';

  const contactsHTML = `
    <div class="r-contact-bar">
      ${p.email ? `<span>✉ ${p.email}</span>` : ''}
      ${p.mobile ? `<span>📞 ${p.mobile}</span>` : ''}
      ${p.address ? `<span>📍 ${p.address}</span>` : ''}
      ${p.linkedin ? `<span>🔗 ${p.linkedin}</span>` : ''}
      ${p.github ? `<span>💻 ${p.github}</span>` : ''}
    </div>
  `;

  const objectiveHTML = resumeState.objective ? `
    <section class="r-section r-objective-section">
      <h3 class="r-section-title">Profile Summary</h3>
      <p class="r-item-desc">${resumeState.objective}</p>
    </section>
  ` : '';

  const skillsHTML = resumeState.skills.length > 0 ? `
    <section class="r-section r-skills-section">
      <h3 class="r-section-title">Skills</h3>
      <div class="r-tags-container">
        ${resumeState.skills.map(s => `<span class="r-tag">${s}</span>`).join('')}
      </div>
    </section>
  ` : '';

  const educationHTML = resumeState.education.length > 0 ? `
    <section class="r-section r-education-section">
      <h3 class="r-section-title">Education</h3>
      ${resumeState.education.map(edu => `
        <div class="r-item">
          <div class="r-item-header">
            <span>${edu.degree}</span>
            <span>${edu.startYear}${edu.endYear ? ' – ' + edu.endYear : ''}</span>
          </div>
          <div class="r-item-sub">
            <span>${edu.institution} ${edu.board ? `(${edu.board})` : ''}</span>
            <span>${edu.grade ? `Score: ${edu.grade}` : ''}</span>
          </div>
        </div>
      `).join('')}
    </section>
  ` : '';

  const experienceHTML = resumeState.experience.length > 0 ? `
    <section class="r-section r-experience-section">
      <h3 class="r-section-title">Work Experience</h3>
      ${resumeState.experience.map(exp => `
        <div class="r-item">
          <div class="r-item-header">
            <span>${exp.role}</span>
            <span>${exp.startDate}${exp.endDate ? ' – ' + exp.endDate : ''}</span>
          </div>
          <div class="r-item-sub"><span>${exp.company}</span></div>
          <p class="r-item-desc">${exp.description || ''}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  const projectsHTML = resumeState.projects.length > 0 ? `
    <section class="r-section r-projects-section">
      <h3 class="r-section-title">Projects</h3>
      ${resumeState.projects.map(proj => `
        <div class="r-item">
          <div class="r-item-header"><span>${proj.title}</span></div>
          <div class="r-item-sub"><span>${proj.tech ? 'Tech: ' + proj.tech : ''}</span></div>
          <p class="r-item-desc">${proj.description || ''}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  const certsHTML = (resumeState.certifications || resumeState.languages) ? `
    <section class="r-section">
      <h3 class="r-section-title">Other Details</h3>
      ${resumeState.certifications ? `<p class="r-item-desc"><strong>Certifications:</strong> ${resumeState.certifications}</p>` : ''}
      ${resumeState.languages ? `<p class="r-item-desc" style="margin-top: 4px;"><strong>Languages:</strong> ${resumeState.languages}</p>` : ''}
    </section>
  ` : '';

  if (resumeState.template === 'modern') {
    preview.innerHTML = `
      <div class="r-sidebar">
        ${photoHTML ? `<div style="margin-bottom: 15px; text-align: center;">${photoHTML}</div>` : ''}
        <h1 class="r-name" style="font-size: 16pt;">${p.fullName || 'Name'}</h1>
        <p class="r-title" style="font-size: 9pt;">${p.jobTitle || ''}</p>
        <div style="margin-top: 15px; font-size: 8.5pt; color: #475569;">
          ${p.email ? `<p style="margin-bottom: 6px;">✉ ${p.email}</p>` : ''}
          ${p.mobile ? `<p style="margin-bottom: 6px;">📞 ${p.mobile}</p>` : ''}
          ${p.address ? `<p style="margin-bottom: 6px;">📍 ${p.address}</p>` : ''}
          ${p.linkedin ? `<p style="margin-bottom: 6px;">🔗 ${p.linkedin}</p>` : ''}
        </div>
        <div style="margin-top: 20px;">${skillsHTML}</div>
        <div style="margin-top: 20px;">${certsHTML}</div>
      </div>
      <div class="r-main">
        ${objectiveHTML} ${experienceHTML} ${projectsHTML} ${educationHTML}
      </div>
    `;
  } else if (resumeState.template === 'two-column') {
    preview.innerHTML = `
      <header class="r-header" style="border-bottom: 2px solid var(--r-primary); padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 class="r-name">${p.fullName || 'Name'}</h1>
          <p class="r-title">${p.jobTitle || ''}</p>
          ${contactsHTML}
        </div>
        ${photoHTML}
      </header>
      <div class="template-two-column">
        <div class="col-left">${skillsHTML} ${educationHTML} ${certsHTML}</div>
        <div class="col-right">${objectiveHTML} ${experienceHTML} ${projectsHTML}</div>
      </div>
    `;
  } else {
    preview.innerHTML = `
      <header class="r-header">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
          <div>
            <h1 class="r-name">${p.fullName || 'Name'}</h1>
            <p class="r-title">${p.jobTitle || ''}</p>
            ${contactsHTML}
          </div>
          ${photoHTML}
        </div>
      </header>
      <main>
        ${objectiveHTML}
        ${resumeState.template === 'student' ? educationHTML + projectsHTML + skillsHTML + experienceHTML : educationHTML + experienceHTML + projectsHTML + skillsHTML}
        ${certsHTML}
      </main>
    `;
  }
}

async function generatePDF() {
  const element = document.getElementById('resume-preview-sheet');
  const name = resumeState.personal.fullName ? resumeState.personal.fullName.replace(/[^a-zA-Z0-9]/g, '_') : 'Resume';
  showToast('Generating PDF... ⏳', 'info');
  const opt = { margin: 0, filename: `${name}_Resume.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
  html2pdf().set(opt).from(element).save().then(() => showToast('PDF Downloaded!', 'success'));
}

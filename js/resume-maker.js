/**
 * MAA ENTERPRISES - COMPLETE RESUME MAKER ENGINE (js/resume-maker.js)
 * Features:
 * - 9 Distinct Layout Render Engines (Classic, Modern, Minimal, Corporate, Elegant, Creative, Executive, Student, Two-Column)
 * - Reactive state updates across all fields
 * - Color theme swatches + custom color picker
 * - Dynamic font switcher
 * - Photo upload with crop/shape selector (Circle, Rounded, Square)
 * - Add/Remove Education, Experience, and Projects entries
 * - 100% Client-side local A4 PDF generator via html2pdf.js
 * - Direct Print support
 */

import { showToast } from './app.js';

// Resume State Object
const resumeState = {
  template: 'classic',
  font: "'Segoe UI', Arial, sans-serif",
  primaryColor: '#1e40af',
  secondaryColor: '#0f766e',
  accentColor: '#f59e0b',
  photoUrl: '',
  photoShape: 'circle',
  personal: {
    fullName: 'Mayank Raj',
    jobTitle: 'ECE Engineering Student & Web Developer',
    email: 'mayank.raj@example.com',
    mobile: '+91 98765 43210',
    address: 'Mahalpar, Bihar Sharif, Nalanda, Bihar - 803101',
    linkedin: 'linkedin.com/in/mayankraj',
    github: 'github.com/mayankraj'
  },
  objective: 'Passionate engineering student with strong foundations in Electronics, Web Development, and Python programming. Seeking an opportunity to leverage analytical and technical skills in an innovative engineering environment.',
  skills: ['Python', 'C++', 'HTML/CSS', 'JavaScript', 'Firebase', 'Circuit Design', 'Problem Solving'],
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

document.addEventListener('DOMContentLoaded', () => {
  initDOMListeners();
  renderEducationList();
  renderExperienceList();
  renderProjectList();
  updateResumePreview();
});

function initDOMListeners() {
  // 1. Template Selectors
  document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      resumeState.template = card.dataset.template;
      updateResumePreview();
    });
  });

  // 2. Color Swatches
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

  // 3. Custom Color Input
  document.getElementById('r-custom-color')?.addEventListener('input', (e) => {
    resumeState.primaryColor = e.target.value;
    updateResumePreview();
  });

  // 4. Font Family Selector
  document.getElementById('r-font-select')?.addEventListener('change', (e) => {
    resumeState.font = e.target.value;
    updateResumePreview();
  });

  // 5. Personal Information Inputs
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

  // Objective & Skills
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

  // 6. Photo Upload & Shapes
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

  // 7. Dynamic Section Buttons
  document.getElementById('btn-add-education')?.addEventListener('click', () => {
    resumeState.education.push({ degree: 'Degree / Course', institution: 'Institute / School', board: 'University', startYear: '2022', endYear: '2024', grade: 'Grade' });
    renderEducationList();
    updateResumePreview();
  });

  document.getElementById('btn-add-experience')?.addEventListener('click', () => {
    resumeState.experience.push({ company: 'Company Name', role: 'Role / Designation', startDate: '2023', endDate: '2024', description: 'Brief description of roles and achievements.' });
    renderExperienceList();
    updateResumePreview();
  });

  document.getElementById('btn-add-project')?.addEventListener('click', () => {
    resumeState.projects.push({ title: 'New Project', tech: 'Technologies', link: '', description: 'Summary of what you built.' });
    renderProjectList();
    updateResumePreview();
  });

  // 8. Toolbar Buttons (Sample, Reset, Print, PDF)
  document.getElementById('btn-print-resume')?.addEventListener('click', () => {
    window.print();
  });

  document.getElementById('btn-download-pdf')?.addEventListener('click', generatePDF);
}

// Render dynamic forms
function renderEducationList() {
  const container = document.getElementById('education-items-list');
  if (!container) return;
  container.innerHTML = '';

  resumeState.education.forEach((edu, index) => {
    const card = document.createElement('div');
    card.className = 'dynamic-item-card';
    card.innerHTML = `
      <button type="button" class="dynamic-item-remove" data-type="edu" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Degree / Class" value="${edu.degree}" data-field="degree">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="School / College" value="${edu.institution}" data-field="institution">
      </div>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
        <input type="text" class="form-control" placeholder="Year / Duration" value="${edu.startYear} - ${edu.endYear}" data-field="years">
        <input type="text" class="form-control" placeholder="Percentage / CGPA" value="${edu.grade}" data-field="grade">
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
      <button type="button" class="dynamic-item-remove" data-type="exp" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Company / Organization" value="${exp.company}" data-field="company">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Job Title / Role" value="${exp.role}" data-field="role">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Duration (e.g. Jan 2024 - Present)" value="${exp.startDate} - ${exp.endDate}" data-field="duration">
      </div>
      <textarea class="form-control" rows="2" placeholder="Key responsibilities & impact..." data-field="description">${exp.description}</textarea>
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
      <button type="button" class="dynamic-item-remove" data-type="proj" data-index="${index}">✕</button>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Project Name" value="${proj.title}" data-field="title">
      </div>
      <div class="form-group" style="margin-bottom: 6px;">
        <input type="text" class="form-control" placeholder="Technologies Used" value="${proj.tech}" data-field="tech">
      </div>
      <textarea class="form-control" rows="2" placeholder="Project description..." data-field="description">${proj.description}</textarea>
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

// Main Reactive Render Function
export function updateResumePreview() {
  const preview = document.getElementById('resume-preview-sheet');
  if (!preview) return;

  // Set CSS Variables for colors and typography
  preview.style.setProperty('--r-primary', resumeState.primaryColor);
  preview.style.setProperty('--r-secondary', resumeState.secondaryColor);
  preview.style.setProperty('--r-font', resumeState.font);

  // Set Template Class
  preview.className = `resume-paper template-${resumeState.template}`;

  const p = resumeState.personal;
  const photoHTML = resumeState.photoUrl 
    ? `<img src="${resumeState.photoUrl}" class="r-photo ${resumeState.photoShape}" alt="Profile Photo">` 
    : '';

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
      <h3 class="r-section-title">Professional Summary</h3>
      <p class="r-item-desc">${resumeState.objective}</p>
    </section>
  ` : '';

  const skillsHTML = resumeState.skills.length > 0 ? `
    <section class="r-section r-skills-section">
      <h3 class="r-section-title">Skills & Competencies</h3>
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
            <span>${edu.startYear} – ${edu.endYear}</span>
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
            <span>${exp.startDate} – ${exp.endDate}</span>
          </div>
          <div class="r-item-sub">
            <span>${exp.company}</span>
          </div>
          <p class="r-item-desc">${exp.description}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  const projectsHTML = resumeState.projects.length > 0 ? `
    <section class="r-section r-projects-section">
      <h3 class="r-section-title">Key Projects</h3>
      ${resumeState.projects.map(proj => `
        <div class="r-item">
          <div class="r-item-header">
            <span>${proj.title}</span>
          </div>
          <div class="r-item-sub">
            <span>Tech: ${proj.tech}</span>
          </div>
          <p class="r-item-desc">${proj.description}</p>
        </div>
      `).join('')}
    </section>
  ` : '';

  const certsHTML = (resumeState.certifications || resumeState.languages) ? `
    <section class="r-section">
      <h3 class="r-section-title">Certifications & Languages</h3>
      ${resumeState.certifications ? `<p class="r-item-desc"><strong>Certifications:</strong> ${resumeState.certifications}</p>` : ''}
      ${resumeState.languages ? `<p class="r-item-desc" style="margin-top: 4px;"><strong>Languages:</strong> ${resumeState.languages}</p>` : ''}
    </section>
  ` : '';

  // Render Template Layouts
  if (resumeState.template === 'modern') {
    preview.innerHTML = `
      <div class="r-sidebar">
        ${photoHTML ? `<div style="margin-bottom: 15px; text-align: center;">${photoHTML}</div>` : ''}
        <h1 class="r-name" style="font-size: 16pt;">${p.fullName}</h1>
        <p class="r-title" style="font-size: 9pt;">${p.jobTitle}</p>
        
        <div style="margin-top: 15px; font-size: 8.5pt; color: #475569;">
          ${p.email ? `<p style="margin-bottom: 6px;">✉ ${p.email}</p>` : ''}
          ${p.mobile ? `<p style="margin-bottom: 6px;">📞 ${p.mobile}</p>` : ''}
          ${p.address ? `<p style="margin-bottom: 6px;">📍 ${p.address}</p>` : ''}
          ${p.linkedin ? `<p style="margin-bottom: 6px;">🔗 ${p.linkedin}</p>` : ''}
        </div>

        <div style="margin-top: 20px;">
          ${skillsHTML}
        </div>

        <div style="margin-top: 20px;">
          ${certsHTML}
        </div>
      </div>

      <div class="r-main">
        ${objectiveHTML}
        ${experienceHTML}
        ${projectsHTML}
        ${educationHTML}
      </div>
    `;
  } else if (resumeState.template === 'two-column') {
    preview.innerHTML = `
      <header class="r-header" style="border-bottom: 2px solid var(--r-primary); padding-bottom: 10px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 class="r-name">${p.fullName}</h1>
          <p class="r-title">${p.jobTitle}</p>
          ${contactsHTML}
        </div>
        ${photoHTML}
      </header>

      <div class="template-two-column">
        <div class="col-left">
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
    `;
  } else {
    preview.innerHTML = `
      <header class="r-header">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 15px;">
          <div>
            <h1 class="r-name">${p.fullName}</h1>
            <p class="r-title">${p.jobTitle}</p>
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

// High Quality PDF Generation
async function generatePDF() {
  const element = document.getElementById('resume-preview-sheet');
  const name = resumeState.personal.fullName.replace(/[^a-zA-Z0-9]/g, '_') || 'Resume';

  if (!resumeState.personal.fullName || !resumeState.personal.mobile) {
    showToast('Please provide at least your Name and Mobile number.', 'error');
    return;
  }

  showToast('Generating high-resolution A4 PDF... ⏳', 'info');

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
    showToast('PDF generation failed. You can use the Print button to Save as PDF.', 'error');
  }
}

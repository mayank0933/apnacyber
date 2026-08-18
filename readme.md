maa-enterprises/
├── index.html                  # Homepage (Hero, Popular Services, How it works, FAQ, Contact)
├── services.html               # All Services Listing & Filter
├── service-details.html        # Individual Service Requirements & Details
├── apply.html                  # Service Application Form (Auto Request ID & WhatsApp redirect)
├── trade-request.html          # Dedicated Trade/Commercial Request Form
├── track-request.html          # Public Request Tracking Page
├── resume-maker.html           # Full Interactive Resume Builder (9 Templates + PDF)
├── contact.html                # Contact Page with Business Info & Map
├── login.html                  # Admin Login Page
├── admin.html                  # Full Admin Dashboard (Stats, Requests, Notes, FAQs, Settings)
│
├── css/
│   ├── style.css               # Main Design System, Responsive Layouts, Navbar & Footer
│   └── resume.css              # Resume Builder Layouts & 9 Templates Styling
│
├── js/
│   ├── firebase-config.js      # Firebase v10+ Modular SDK Configuration
│   ├── auth.js                 # Admin Auth State Listener & Protection
│   ├── app.js                  # Global Navbar, Dynamic FAQs & Business Info Loader
│   ├── services.js             # Services Data & Filtering Logic
│   ├── apply.js                # Form Submission, ID Generation & WhatsApp Integration
│   ├── track-request.js        # Request Status Lookup Logic
│   ├── resume-maker.js         # Resume State, 9 Templates Renderer & PDF Generator
│   └── admin.js                # Dashboard Stats, Request Management, Notes & FAQ CRUD
│
├── firestore.rules             # Production Security Rules
├── vercel.json                 # Vercel Deployment Routing Config
└── README.md                   # Setup & Deployment Guide

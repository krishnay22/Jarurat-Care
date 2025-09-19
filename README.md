Patient Records Dashboard — Assignment

Author: Krishna
Submission To: Sneha
Deadline: 19 September 2025

A small React/Next.js application that demonstrates fetching/displaying patient data, search/filter, details modal, and state management. Built to match the internship assignment requirements.

🧾 Objective

Build a simple, responsive web app to demonstrate skills in React state management and API integration.

✅ Features (as required)

Landing Page

Header with Jarurat Care logo/name.

Navigation bar: Home, Patients, About.

Patients Page (Main Task)

Fetches patient data from a public API (or local mock JSON).

Displays patients in a responsive grid / card layout showing Name, Age, Contact.

Search bar to filter patients by name.

A View Details button on each card — opens a modal with full details (or navigates to a details page).

State Management

Implemented using React Hooks (useState, useEffect, useContext optionally).

Optionally Redux (instructions included below) — not required.

UI & Styling

Responsive design for desktop and mobile.

Uses Tailwind CSS (or plain CSS / styled-components if you prefer).

Bonus (Optional)

Add New Patient form (local state — no backend).

Loading & error states during fetch.

📁 Project structure (recommended)
.
├── public/
│   └── logo.png
├── src/
│   ├── pages/
│   │   ├── index.jsx        # Landing page
│   │   ├── patients.jsx     # Patients list page
│   │   └── _app.jsx
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── PatientCard.jsx
│   │   ├── PatientModal.jsx
│   │   ├── SearchBar.jsx
│   │   └── AddPatientForm.jsx
│   ├── lib/
│   │   └── api.js           # fetch helpers or mock data loader
│   └── styles/
│       └── globals.css
├── .gitignore
├── package.json
└── README.md

▶️ Quick start (local)
# clone
git clone https://github.com/your-username/v0-patient-records-dashboard.git
cd v0-patient-records-dashboard

# install
npm install

# dev server (hot reload)
npm run dev

# build for production
npm run build

# run production server
npm start


Open http://localhost:3000

🧩 Implementation notes & example snippets
1) Fetching patient data

You can use a public API or a mock file. Example using a mock JSON file /public/mock/patients.json and a helper:

// src/lib/api.js
export async function fetchPatients() {
  // Example: local JSON
  const res = await fetch('/mock/patients.json');
  if (!res.ok) throw new Error('Failed to load patients');
  return res.json();
}


Or use JSONPlaceholder skeletons and adapt fields:

// using JSONPlaceholder (example mapping)
const res = await fetch('https://jsonplaceholder.typicode.com/users');
const users = await res.json();
const patients = users.map(u => ({
  id: u.id,
  name: u.name,
  age: Math.floor(Math.random() * 60) + 20, // mocked
  contact: u.phone,
  email: u.email,
  address: u.address,
}));

2) Patients page with search & loading/error states
// src/pages/patients.jsx (simplified)
import { useEffect, useState } from 'react';
import { fetchPatients } from '../lib/api';
import PatientCard from '../components/PatientCard';
import SearchBar from '../components/SearchBar';
import PatientModal from '../components/PatientModal';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await fetchPatients();
        setPatients(data);
        setFiltered(data);
      } catch (err) {
        setError(err.message || 'Error fetching');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  useEffect(() => {
    const q = query.toLowerCase();
    setFiltered(patients.filter(p => p.name.toLowerCase().includes(q)));
  }, [query, patients]);

  if (loading) return <div>Loading patients...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(p => (
          <PatientCard key={p.id} patient={p} onView={() => setSelected(p)} />
        ))}
      </div>

      {selected && (
        <PatientModal patient={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}

3) Modal (Patient details)

Use a simple accessible modal. Either use a library or implement a portal with a fixed overlay.

// src/components/PatientModal.jsx (simplified)
export default function PatientModal({ patient, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded max-w-lg w-full">
        <h2 className="text-xl font-bold">{patient.name}</h2>
        <p>Age: {patient.age}</p>
        <p>Contact: {patient.contact}</p>
        <p>Email: {patient.email}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

4) Add New Patient (bonus — local only)

A form component that calls setPatients(prev => [newPatient, ...prev]). Generate an id with Date.now() or crypto.randomUUID().

🎨 Styling options

Tailwind CSS — quick responsive layout.

styled-components — component-scoped styling.

Plain CSS / SASS — simplest if you prefer.

Example: responsive grid with Tailwind:

<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">...</div>

⚙️ State management choices

React Hooks (recommended): useState, useEffect, useContext for global pieces (selected patient).

Redux: If you want to show Redux skills, use Redux Toolkit. Keep it simple: store patients, loading, error, selected.

✅ Accessibility & UX tips

Modal: trap focus and restore focus on close.

Buttons: use descriptive labels.

Loading & Error: show friendly messages and retry option for errors.

📸 Screenshots

(Replace these placeholders with actual screenshots before submission.)

screenshots/home.png

screenshots/patients.png

screenshots/modal.png

🚀 Deployment (Vercel / Netlify)

Vercel

Push your repo to GitHub.

Create a Vercel account -> New Project -> import repo.

For Next.js, default build settings work:

Build command: npm run build

Output directory: .next (Vercel detects automatically)

Deploy and share the URL.

Netlify

Netlify supports Next but Vercel is the smoothest for Next.js. If using Netlify, you may need next-on-netlify or @netlify/plugin-nextjs.

📦 package.json (scripts)

Include these scripts in your package.json:

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}

📝 Submission checklist (for Sneha)

 GitHub repository link (public or shared)

 README.md with setup instructions & screenshots

 Deployed link (Vercel or Netlify) — optional but earns bonus

 Code demonstrates:

Fetching data (public API or mock)

Search/filter patients by name

View details (modal or page)

Responsive UI

Loading & error states (bonus)

Add New Patient (bonus)

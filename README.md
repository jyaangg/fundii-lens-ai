# Fundii AI Frontend MVP – Codebase Overview

## Project Overview

Fundii AI Frontend MVP is a modern React + TypeScript web application for managing commercial real estate loan documents, annual reviews, and analytics. The frontend is built with Vite, shadcn-ui, and Tailwind CSS, and is designed for easy integration with a backend API for document storage, user management, and workflow automation.

---

## Tech Stack & Architecture

**Planned Stack:**
- **PERN**: PostgreSQL (database), Express (API server), React (frontend), Node.js (runtime)

This repository contains only the **React frontend**. The backend (Node.js/Express API + PostgreSQL) will be developed and deployed separately. The frontend is ready to connect to a RESTful API served by Express, with PostgreSQL as the persistent data store.

**Backend Engineer Notes:**
- Use RESTful conventions for API endpoints (see Integration Points below).
- Use JWT or session-based authentication (to be discussed with the team).
- PostgreSQL is the source of truth for all document, borrower, and analytics data.
- File uploads should be handled via multipart/form-data endpoints, with files stored in a cloud bucket or local storage, and URLs returned to the frontend.
- Use CORS to allow the frontend (likely running on localhost:5173 in dev) to access the API.
- Consider using tools like Sequelize, Prisma, or Knex for database access (optional, but recommended for type safety and migrations).

---

## Key Technologies

- **React 18** (with hooks and functional components)
- **TypeScript** (strict typing, interfaces, and types throughout)
- **Vite** (fast dev/build tool)
- **shadcn-ui** (Radix UI + Tailwind CSS component library)
- **Tailwind CSS** (utility-first styling)
- **React Router v6** (routing)
- **Recharts** (data visualization)
- **Lucide React** (icons)
- **React Hook Form** (form management)
- **Zod** (validation)
- **Radix UI** (dialogs, popovers, etc.)

---

## Project Structure

```
src/
  pages/           # Main app pages (Dashboard, Borrowers, Documents, Upload, Analytics, ProcessingStatus, etc.)
  components/
    layout/        # App shell: Sidebar, Header, DashboardLayout
    ui/            # Reusable UI components (Table, Card, Dialog, Button, etc.)
  hooks/           # Custom React hooks
  lib/             # Utility functions
  index.css        # Tailwind and global styles
public/            # Static assets (favicon, logo, etc.)
```

---

## Main App Pages

- **Dashboard**: High-level stats and quick links.
- **Borrowers**: List of borrowers, document collection progress, and follow-up actions.
- **Documents**: Document library with preview modal (ready for backend file URLs).
- **Upload**: Drag-and-drop document upload (currently uses mock processing, ready for backend integration).
- **Processing Status**: Track document status, deadlines, and follow-up actions.
- **Analytics**: Visualizations of collection rates, risk, and document progress.

---

## Integration Points for Backend

### 1. **Document Upload & Storage**
- `src/pages/Upload.tsx` handles file selection and mock processing.
- **TODO:** Replace mock logic with API calls to upload files and track status.
- **Expected API:** `POST /api/documents` (multipart/form-data), `GET /api/documents/:id/status`

### 2. **Document Library & Preview**
- `src/pages/Documents.tsx` displays a table of documents.
- **TODO:** Fetch document list from backend and provide file URLs for preview.
- **Expected API:** `GET /api/documents`, `GET /api/documents/:id/download`

### 3. **Borrowers & Processing Status**
- `src/pages/Borrowers.tsx` and `src/pages/ProcessingStatus.tsx` use mock data for borrowers, document progress, and deadlines.
- **TODO:** Connect to backend for real borrower data, outstanding document status, and actions (e.g., sending follow-up emails).
- **Expected API:** `GET /api/borrowers`, `GET /api/borrowers/:id/documents`, `POST /api/borrowers/:id/followup`

### 4. **Analytics**
- `src/pages/Analytics.tsx` uses static data for charts.
- **TODO:** Fetch analytics data from backend.
- **Expected API:** `GET /api/analytics/collection`, `GET /api/analytics/risk`, etc.

---

## How to Run Locally

```sh
git clone <YOUR_GIT_URL>
cd fundii-lens-ai
npm install
npm run dev
```
App runs at [http://localhost:5173](http://localhost:5173) by default.

---

## Adding Backend Integration

- Replace mock/sample data in pages with API calls (use `fetch`, `axios`, or `react-query`).
- Use the provided TypeScript interfaces for type-safe API responses.
- For file uploads, connect the upload logic to your backend endpoint and handle progress/status updates.
- For document previews, provide a file URL from the backend and render in the modal.
- For follow-up actions (e.g., email), connect the placeholder buttons to backend endpoints.

---

## Useful Files

- `src/pages/Upload.tsx` – File upload logic (replace with real API)
- `src/pages/Documents.tsx` – Document list and preview modal
- `src/pages/Borrowers.tsx` – Borrower list, document progress, follow-up button
- `src/pages/ProcessingStatus.tsx` – Document status, outstanding docs, follow-up button
- `src/components/layout/Sidebar.tsx` – Navigation
- `src/components/layout/Header.tsx` – Top bar, notifications

---

## Scripts

- `npm run dev` – Start dev server
- `npm run build` – Build for production
- `npm run lint` – Lint code

---

## Questions?

- The codebase is modular and ready for backend API integration.
- For any questions, check the TypeScript types in each page/component, or ask the frontend team for integration details.

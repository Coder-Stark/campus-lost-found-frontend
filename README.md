# Campus Lost & Found — Frontend (Client)

React + Vite + Tailwind CSS frontend for the Campus Lost & Found platform, consuming the Express/MongoDB backend API.

---

## 🚀 How to Download & Run

### 1. Clone the repository
```bash
git clone https://github.com/Coder-Stark/campus-lost-found-frontend.git
cd campus-lost-found/client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root of the `client` folder (see `.env.sample` for reference) and add the following:

```dotenv
# VITE_API_BASE_URL=http://localhost:5000
VITE_API_BASE_URL=https://campus-lost-found-backend-jbmc.onrender.com/
```

- Uncomment the `localhost:5000` line and comment out the Render URL when running the **backend locally**.
- Keep the Render URL active to point at the **deployed backend**.

> ⚠️ **Note:** The `.env` file is gitignored and not pushed to the repo — the required variable is documented here so the project can be run by anyone who clones it.

### 4. Run the dev server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Directory Structure

```
node_modules
public
src
 ┣ config
 ┃ ┗ api.js
 ┣ features
 ┃ ┣ dummyForExtraFeature
 ┃ ┗ items
 ┃ ┃ ┣ api
 ┃ ┃ ┃ ┗ items.api.js
 ┃ ┃ ┣ components
 ┃ ┃ ┃ ┣ FilterBar.jsx
 ┃ ┃ ┃ ┣ ItemCard.jsx
 ┃ ┃ ┃ ┣ ItemForm.jsx
 ┃ ┃ ┃ ┗ ItemList.jsx
 ┃ ┃ ┣ hooks
 ┃ ┃ ┃ ┗ useItems.js
 ┃ ┃ ┗ pages
 ┃ ┃ ┃ ┗ ItemsPage.jsx
 ┣ shared
 ┃ ┣ components
 ┃ ┃ ┣ Footer.jsx
 ┃ ┃ ┣ Layout.jsx
 ┃ ┃ ┣ Loader.jsx
 ┃ ┃ ┣ Modal.jsx
 ┃ ┃ ┣ Navbar.jsx
 ┃ ┃ ┗ ThemeToggle.jsx
 ┃ ┗ hooks
 ┃ ┃ ┗ useTheme.js
 ┣ App.jsx
 ┣ index.css
 ┗ main.jsx
.env
.env.sample
directoryTree.js
eslint.config.js
HowIDoIt-Frontend.txt
index.html
package-lock.json
package.json
README.md
vite.config.js
```

## 📦 `package.json`

```json
{
  "name": "client",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tailwindcss/vite": "^4.3.3",
    "axios": "^1.20.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "react-toastify": "^11.1.0",
    "tailwindcss": "^4.3.3"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "eslint": "^10.9.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.4",
    "globals": "^17.11.0",
    "vite": "^8.2.2"
  }
}
```

---

## 🛠️ How I Built It (Process)

### 1. Project Initialization & Cleanup
- Scaffolded the project with Vite:
  ```bash
  npm create vite@latest . -- --template react
  npm install
  ```
- Deleted `App.css` and the `assets` folder (not needed) since Tailwind CSS would be used for styling instead.

### 2. Prerequisites
- Installed `axios` for making HTTP requests from the frontend to the backend.
- Installed Tailwind CSS following the official docs:
  ```bash
  npm install tailwindcss @tailwindcss/vite
  ```
  - Configured the Vite plugin in `vite.config.js`.
  - Added `@import "tailwindcss";` to `index.css`.
- Created the initial folder structure:
  - `config`
  - `features/items`
  - `shared/components` and `shared/hooks`

### 3. Core Implementation
1. `config/api.js` — a shared Axios instance so the API base URL/config isn't repeated everywhere.
2. `shared/components/Loader.jsx` — shared loading indicator used across the app.
3. `shared/components/ErrorMessage.jsx` — shared error display component.
4. `shared/components/Layout.jsx` — app-wide layout wrapper.
5. `features/items/api/items.api.js` — functions for calling the backend `items` endpoints.
6. Installed `react-toastify` for toast notifications.
7. Wired the toast container into `App.jsx` at the root level.
8. Built `features/items/hooks/useItems.js` — hook for fetching/managing items state.

### 4. Beautification Pass
Once the core functionality worked end-to-end, the UI was polished:
1. Replaced the direct inline form with a **modal** (`shared/components/Modal.jsx`).
2. Added **dark/light theming**:
   - Updated `index.css` to support a dark theme.
   - Created `shared/hooks/useTheme.js`.
   - Created `shared/components/ThemeToggle.jsx`.
3. Added a separate `Navbar` component.
4. Applied the `dark` class correctly across every page/component:
   - `ItemCard.jsx`, `ItemList.jsx`, `FilterBar.jsx`, `ItemForm.jsx`, `Modal.jsx`, `Loader.jsx`.
5. Added `cursor-pointer` styling to all buttons/icons for better UX.
6. Added email and phone number format validation.
7. Added calendar validation — no future dates allowed for lost/found entries.
8. Added a time field, plus a separate "submitted at" field, to distinguish the item's lost/found time from when it was reported.
9. Added time validation — no future time allowed.

With auto-deployment configured, the project was considered complete.

---

## ☁️ Deployment

### Netlify (Frontend)
- Connected the repository via GitHub.
- Set `VITE_API_BASE_URL` to point at the deployed Render backend URL.

### Render (Backend reference)
- Backend is deployed separately on Render — see the backend README for setup details.

### Betterstack
- Configured to periodically hit the backend's `/health` endpoint, keeping the Render server awake and avoiding cold-start delays for users of the deployed frontend.
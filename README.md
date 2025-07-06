
# ZenithFix

## Features

- **Horizontal content grid** with paginated data
- **Reusable Modal component** with portals
- **Watch history** stored in localStorage
- **Skeleton loaders** for improved UX
- **Unit tests** with Vitest + React Testing Library
- Tailwind CSS styling

---

## 🛠 Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/vorobel/zenithfix.git
cd zenithfix
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Run tests
```bash
npm run test
```

---

## 🏗 Architectural Decisions

- **Components**: Split into small, reusable units (`ContentGrid`, `Modal`, `PaginationControls`).
- **Custom Hooks**: For stateful logic (`useContentPagination`, `useWatchHistory`).
- **Modal with Portals**: Renders modals outside the DOM hierarchy to avoid z-index issues.
- **Mocked API Data**: Static JSON file simulates API responses for fast development.
- **TypeScript Strictness**: No `any` types, full type safety.
- **Tests**: Focused on unit tests for key components (e.g., modal interactions).

---

## ✅ Assumptions

- App is scoped for demonstration; API errors and edge cases handled minimally.
- Content data is static; real API integration would require API routes or SWR/React Query.
- No server-side rendering considerations were made.
- Watch history persists locally and does not sync across devices.

---

## 🧪 Testing

### Run all unit tests
```bash
npm run test
```

- Test runner: **Vitest**
- UI testing: **@testing-library/react**
- Example test: `src/components/__tests__/Modal.test.tsx`

---

## 📂 Folder Structure
```
src/
  api/
  components/
  hooks/
  mocks/
  types/
  app/
```

---

## 🧑‍💻 Author

Bohdan Vorobel

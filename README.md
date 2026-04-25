# Peakvisory Assignment

A modern, full-featured invoice management application built with React, TypeScript, Redux Toolkit, and RTK Query.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Code Quality](#code-quality)
- [Error Handling](#error-handling)
- [Contributing](#contributing)

## 🎯 Project Overview

Peakvisory Assignment is an invoice management system that allows users to:
- Create, read, update, and delete invoices
- Filter invoices by status and search
- Manage user authentication
- View detailed invoice information
- Handle user roles and permissions

The application follows modern React best practices with TypeScript, global state management, and comprehensive error handling.

## 🛠 Tech Stack

### Core Framework
- **React** (19.2.5) - UI library
- **TypeScript** (6.0.2) - Type safety
- **Vite** (8.0.9) - Build tool and development server

### State Management & Data Fetching
- **Redux Toolkit** (2.11.2) - Global state management
- **RTK Query** - Integrated caching and data fetching
- **Zustand** (5.0.12) - Lightweight state management
- **React Redux** (9.2.0) - React bindings for Redux

### Routing & Forms
- **React Router DOM** (7.14.2) - Client-side routing
- **React Hook Form** (7.73.1) - Form state management
- **Yup** (1.7.1) - Schema validation

### UI & Styling
- **Material-UI** (9.0.0) - Component library
- **Emotion** (11.14.0, 11.14.1) - CSS-in-JS styling
- **Sonner** (2.0.7) - Toast notifications

### Development Tools
- **ESLint** (8.57.1) - Code linting
- **Prettier** (3.8.3) - Code formatting
- **TypeScript ESLint** (8.59.0) - TypeScript linting
- **Husky** (8.0.0) - Git hooks
- **Lint-staged** (16.4.0) - Run linters on staged files
- **Commitizen** (4.3.1) - Conventional commits

### HTTP Client
- **Axios** (1.15.2) - HTTP client library

## ✨ Features

### Authentication
- User login and signup
- JWT token-based authentication
- Protected routes and role-based access control
- Permission gates for sensitive operations

### Invoice Management
- **Create** invoices with customer name and amount
- **Read** invoice details and list all invoices
- **Update** invoice information and status
- **Delete** invoices with confirmation dialog
- Filter invoices by status (Draft, Sent, Paid)
- Search invoices by customer name
- Pagination support

### User Experience
- **Toast Notifications** - Real-time feedback for all CRUD operations
- **Error Boundary** - Graceful error handling with fallback UI
- **Form Validation** - Client-side validation with Yup schemas
- **Loading States** - Visual feedback during async operations
- **Responsive Design** - Mobile-friendly UI

### Code Quality
- Type-safe development with TypeScript
- Automated code linting and formatting
- Pre-commit hooks for code quality
- Conventional commit messages

## 📦 Prerequisites

- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 or **yarn** >= 3.0.0
- **Git** (for version control)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Saahilvrma/Peakvisory-Assignment.git
cd Peakvisory-Assignment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

### 4. Verify installation

```bash
npm run lint
```

## 📝 Available Scripts

### Development

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Create an optimized production build:

```bash
npm run build
```

This runs TypeScript compilation followed by Vite build:
- Compiles TypeScript to JavaScript
- Bundles and minifies assets
- Generates optimized output in the `dist/` directory

### Preview

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality with ESLint:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint -- --fix
```

### Prepare (Husky)

Initialize Git hooks:

```bash
npm run prepare
```

This is automatically run after `npm install`.

## 📁 Project Structure

```
src/
├── components/                 # Shared React components
│   ├── ErrorBoundary.tsx      # Error boundary for crash handling
│   ├── errorBoundary.css      # Error boundary styles
│   ├── Layout/                # Layout components
│   │   ├── AppLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── layout.css
│   └── PermissionGate.tsx     # Permission-based rendering
│
├── constants/                  # Application constants
│   ├── permissions.ts
│   ├── roles.ts
│   └── routes.ts
│
├── hooks/                      # Custom React hooks
│   └── useToast.ts            # Toast notification hook
│
├── lib/                        # Utilities and helpers
│   ├── api/
│   │   ├── axios.ts           # Axios instance configuration
│   │   └── axiosBaseQuery.ts  # RTK Query base query factory
│   └── components/            # Shared UI components
│       ├── Pagination/
│       ├── Search/
│       └── shared.css
│
├── module/                     # Feature modules
│   ├── auth/                   # Authentication module
│   │   ├── api/
│   │   │   └── authApi.ts     # Auth API endpoints
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── SignupForm.tsx
│   │   │   └── UnauthorizedPage.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── utils/
│   │   │   ├── permissions.ts
│   │   │   ├── routeGuards.ts
│   │   │   ├── token.ts
│   │   │   └── validationSchemas.ts
│   │   └── styles/
│   │       └── auth.css
│   │
│   └── invoice/                # Invoice management module
│       ├── api/
│       │   └── invoiceApi.ts   # Invoice API endpoints (RTK Query)
│       ├── components/
│       │   ├── InvoiceForm.tsx
│       │   ├── InvoiceList.tsx
│       │   ├── InvoiceDetail.tsx
│       │   ├── DeleteInvoiceDialog.tsx
│       │   └── Filters/
│       │       └── InvoiceFilters.tsx
│       ├── constants/
│       │   ├── defaultValues.ts
│       │   └── queryKeys.ts
│       ├── hooks/
│       │   └── useInvoiceQueryState.ts
│       ├── types/
│       │   └── invoice.types.ts
│       ├── utils/
│       │   ├── formatters.ts
│       │   └── validationSchemas.ts
│       └── styles/
│           └── invoice.css
│
├── provider/                   # React context providers
│   ├── AuthProvider.tsx
│   └── StoreProvider.tsx
│
├── routes/                     # Route configuration
│   ├── AppRoutes.tsx
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── RoleBasedRoute.tsx
│
├── store/                      # Redux store configuration
│   └── store.ts
│
├── types/                      # Global TypeScript types
│   └── auth.types.ts
│
├── App.tsx                     # Root component
├── App.css
├── main.tsx                    # Application entry point
└── index.css                   # Global styles
```

## 📦 Dependencies Overview

### Production Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.5 | UI library |
| react-dom | 19.2.5 | React DOM rendering |
| react-router-dom | 7.14.2 | Client-side routing |
| @reduxjs/toolkit | 2.11.2 | State management |
| react-redux | 9.2.0 | Redux React bindings |
| axios | 1.15.2 | HTTP client |
| react-hook-form | 7.73.1 | Form state management |
| yup | 1.7.1 | Schema validation |
| @mui/material | 9.0.0 | UI component library |
| @emotion/react | 11.14.0 | CSS-in-JS styling |
| @emotion/styled | 11.14.1 | Styled components |
| sonner | 2.0.7 | Toast notifications |
| zustand | 5.0.12 | State management |

### Dev Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| typescript | 6.0.2 | Type safety |
| vite | 8.0.9 | Build tool |
| @vitejs/plugin-react | 6.0.1 | React plugin for Vite |
| eslint | 8.57.1 | Code linting |
| prettier | 3.8.3 | Code formatting |
| typescript-eslint | 8.59.0 | TypeScript ESLint |
| husky | 8.0.0 | Git hooks |
| lint-staged | 16.4.0 | Lint staged files |
| commitizen | 4.3.1 | Conventional commits |

## 💻 Development

### Running the Development Server

```bash
npm run dev
```

This starts the Vite dev server with:
- Hot Module Replacement (HMR) for instant updates
- Source maps for debugging
- Fast refresh on code changes

### File Watching

Vite automatically watches for file changes and hot-reloads the application.

### Environment Variables

Create a `.env` file for development settings:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🏗 Building for Production

### Compile TypeScript

```bash
npx tsc -b
```

### Build Assets

```bash
npm run build
```

### Optimizations Applied

- **Tree Shaking** - Removes unused code
- **Code Splitting** - Splits code into chunks
- **Minification** - Reduces file size
- **Asset Compression** - Optimizes images and fonts

### Output

Production files are generated in the `dist/` directory:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [other-assets]
```

### Preview Production Build

```bash
npm run preview
```

## ✅ Code Quality

### ESLint Configuration

The project uses ESLint with:
- **@eslint/js** - JavaScript rules
- **typescript-eslint** - TypeScript rules
- **eslint-config-airbnb** - Airbnb style guide
- **eslint-plugin-react** - React-specific rules
- **eslint-plugin-react-hooks** - React Hooks rules

### Prettier Configuration

Code is automatically formatted with Prettier to maintain consistency.

### Pre-commit Hooks

Husky enforces:
- **Pre-commit** - Runs `lint-staged` to lint and format staged files
- **Commit-msg** - Validates commit message format (Commitizen)

### Running Linter

```bash
# Check for issues
npm run lint

# Fix issues automatically
npm run lint -- --fix
```

### Conventional Commits

The project uses Commitizen for structured commit messages:

```bash
git cz
```

Or use regular commits:

```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"
git commit -m "docs: update documentation"
```

## 🛡 Error Handling

### Error Boundary

The application includes a React Error Boundary that:
- Catches React component errors
- Displays a graceful fallback UI
- Shows error details in development mode
- Provides recovery options (go home, reload page)

### API Error Handling

Errors from API calls are handled through:
- Axios interceptors
- RTK Query error states
- Toast notifications for user feedback

### Form Validation

Forms use Yup schemas for validation:
- Client-side validation before submission
- Server-side validation feedback
- Clear error messages

## 🤝 Contributing

### Branch Naming

Use descriptive branch names:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring

### Commit Message Format

Follow Conventional Commits:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Pull Request Process

1. Create a feature branch from `main`
2. Make changes following code style guidelines
3. Commit with descriptive messages
4. Push to your branch
5. Create a pull request with clear description

## 📄 License

This project is private and belongs to Antigravity.

## 📞 Contact

For issues or questions, please contact the development team.

---

**Last Updated:** April 2026  
**Version:** 0.0.0


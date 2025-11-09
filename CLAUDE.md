# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (default: http://localhost:3000)
- `npm run build` - Build the application for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Architecture Overview

This is a Next.js 15.3.5 application for rental apartment management in Udine, Italy.

### Tech Stack
- **Framework**: Next.js with TypeScript
- **State Management**: Redux Toolkit with custom middleware
- **Styling**: Material-UI + Emotion + Tailwind CSS
- **Maps**: React-Leaflet for interactive property maps
- **Authentication**: Firebase Auth with Google provider
- **API**: RESTful backend with environment-based URLs

### Key Directories
- `src/app/` - Next.js app router pages and components
- `src/redux/` - Redux store, slices, and services
- `src/components/` - Reusable React components

### State Management Structure
- **Store**: Configured in `src/redux/store.ts` with typed hooks
- **Services**: API calls organized by domain (affito, auth, filter)
- **Slices**: Feature-based state slices with async thunks

### API Configuration
The application uses environment-based API URLs:
- Development: `http://localhost:5088`
- Production: `https://us-central1-affitiudine.cloudfunctions.net/api`

### Firebase Integration
- Configuration in `src/app/firebaseConfig.ts`
- Google authentication provider
- Project ID: `affitiudine`

### Main Features
- **Table View** (`/table`): Property listings with filtering
- **Map View** (`/map`): Interactive map centered on Udine (46.0689, 13.2224)
- **Authentication**: Google sign-in via Firebase
- **Property Management**: State updates (Approved/Waiting/Denied)

### Environment Setup
Create environment files:
- `.env.local` for development with `REACT_APP_API_BASE_URL=http://localhost:5000`
- `.env.production` for production with `REACT_APP_API_BASE_URL=https://us-central1-affitiudine.cloudfunctions.net/api`
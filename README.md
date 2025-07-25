# Affito Front - Rental Apartment Management System

A modern web application for managing rental apartments in Udine, Italy. Built with Next.js, React, and TypeScript, this platform provides a comprehensive solution for property owners and renters to browse, manage, and visualize rental properties.

## 🏠 About the Project

Affito Front is designed to streamline the apartment rental process in Udine, offering an intuitive interface for both property managers and potential tenants. The application features real-time property listings, interactive maps, and detailed property information to help users make informed decisions.

## ✨ Features

### 📊 Table View
- **Property Listings**: Browse all available apartments in a clean, organized table format
- **Advanced Filtering**: Filter properties by:
  - Price range (min/max)
  - Floor level
  - Elevator availability
  - Rental status
- **Property Management**: Update property states (Approved, Waiting, Denied)
- **Real-time Updates**: See changes instantly with Redux state management

### 🗺️ Interactive Map
- **Location Visualization**: View all properties on an interactive map of Udine
- **Pin Markers**: Each property is marked with a clickable pin
- **Property Details**: Click on pins to view:
  - Property images
  - Basic information (price, floor, features)
  - Availability status
- **Centered on Udine**: Map is pre-configured for Udine, Italy (latitude: 46.0689, longitude: 13.2224)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account (for hosting and authentication)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/marianoaloi/affito_front.git
cd affito_front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file for development:
```env
REACT_APP_API_BASE_URL=http://localhost:5000
```

Create a `.env.production` file for production:
```env
REACT_APP_API_BASE_URL=https://us-central1-affitiudine.cloudfunctions.net/api
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15.3.5
- **UI Library**: React 18.2.0
- **Language**: TypeScript
- **State Management**: Redux Toolkit
- **Styling**: 
  - Emotion (styled-components)
  - Material-UI (MUI)
  - Tailwind CSS
- **Map Integration**: React-Leaflet
- **Authentication**: Firebase Auth
- **Hosting**: Firebase Hosting

## 📱 Pages

- `/` - Home page with property listings
- `/table` - Table view with advanced filtering
- `/map` - Interactive map of Udine showing all properties

## 🔐 Authentication

The application supports Google authentication through Firebase, allowing users to:
- Sign in to manage their properties
- Save favorite listings
- Access personalized features

## 🌐 Deployment

The application is configured for Firebase Hosting:

```bash
npm run build
firebase deploy
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

# CityAssist - Citizen-Centric Urban Assistant

![CityAssist](https://img.shields.io/badge/CityAssist-v1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-14.0-black)
![React](https://img.shields.io/badge/React-18.2-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)

**CityAssist** is a modern, citizen-focused Smart City Progressive Web App (PWA) that helps residents interact with city services, receive personalized alerts, report civic issues, and access essential local services. Built for daily utility with a beautiful, accessible interface.

## 🌟 Features

### Core Functionality
- **🏠 Personalized Home Dashboard** - Real-time alerts, KPIs, and quick actions
- **🗺️ Interactive City Map** - View incidents, sensors, and services across the city
- **📝 Report Issues** - Submit civic problems with photo upload and geolocation
- **📱 Service Status** - Real-time utility status (water, power, internet)
- **🏥 Local Services Directory** - Find nearby hospitals, police, pharmacies, and more
- **🔔 Smart Notifications** - Personalized alerts based on location and preferences
- **⚙️ User Settings** - Manage profile and notification preferences

### Technical Highlights
- **Progressive Web App (PWA)** - Install on any device, works offline
- **Mobile-First Design** - Responsive and touch-optimized
- **Modern UI/UX** - Beautiful gradients, animations, and glassmorphism effects
- **Accessibility** - WCAG AA compliant, keyboard navigable
- **Mock Data** - Complete offline demo with realistic data
- **Type-Safe** - Built with TypeScript for reliability

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Hackathon-CityAssist-Citizen-Centric-Urban-Assistant-
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

Use these credentials to login and explore the application:

**Admin Account:**
- Email: `admin@cityassist.local`
- Password: `admin123`

**Regular User:**
- Email: `demo@cityassist.city`
- Password: `demo123`

## 📁 Project Structure

```
├── app/                      # Next.js App Router pages
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Landing page (redirects to login)
│   ├── login/               # Authentication page
│   ├── onboarding/          # User onboarding flow
│   ├── home/                # Main dashboard
│   ├── map/                 # Interactive city map
│   ├── report/              # Issue reporting
│   ├── reports/             # User's submitted reports
│   ├── services/            # Local services directory
│   ├── status/              # Utility status dashboard
│   ├── notifications/       # Alerts and notifications
│   ├── settings/            # User preferences
│   └── api/                 # API routes
│       └── auth/login/      # Mock authentication
├── components/              # Reusable UI components
│   ├── AppShell.tsx        # Main app layout wrapper
│   ├── Sidebar.tsx         # Navigation sidebar
│   ├── Topbar.tsx          # Top navigation bar
│   └── KPICard.tsx         # Dashboard metric cards
├── lib/                     # Utility functions
│   └── utils.ts            # Helper functions
├── data/                    # Mock JSON data
│   ├── users.json          # Demo user accounts
│   ├── alerts.json         # City alerts and notifications
│   ├── incidents.json      # Reported issues
│   ├── sensors.json        # Sensor data
│   ├── services.json       # Local services
│   └── kpis.json           # Dashboard metrics
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   └── assets/             # Images and icons
├── styles/                  # Global styles
│   └── globals.css         # Tailwind and custom CSS
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── next.config.js          # Next.js configuration
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue (`#3b82f6`) - Actions, links, primary buttons
- **Secondary**: Emerald (`#10b981`) - Success states, highlights
- **Background**: Slate 950 (`#020617`) - App background
- **Cards**: Slate 900 (`#0f172a`) - Content containers
- **Borders**: Slate 800 (`#1e293b`) - Subtle separators

### Components
- **Cards** - Glassmorphic design with subtle borders and hover effects
- **Buttons** - Gradient backgrounds with smooth transitions
- **Inputs** - Focus states with ring effects
- **Badges** - Severity-based color coding
- **Animations** - Slide-up animations and smooth transitions

## 🔧 Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: TailwindCSS 3.4
- **Icons**: Lucide React
- **State Management**: React Hooks + SWR
- **Type Safety**: TypeScript

### Optional Integrations
- **Maps**: React Leaflet (add `npm install leaflet react-leaflet`)
- **Charts**: Chart.js + React-ChartJS-2 (add for analytics)
- **Date Handling**: date-fns

## 📱 PWA Features

CityAssist is a fully functional Progressive Web App:

- ✅ **Installable** - Add to home screen on mobile/desktop
- ✅ **Offline Support** - Service worker caches essential pages
- ✅ **App-like Experience** - Standalone display mode
- ✅ **Fast Loading** - Optimized assets and code splitting
- ✅ **Responsive** - Works on all screen sizes

### Installing as PWA

**On Mobile (Android/iOS):**
1. Open the app in your browser
2. Tap the browser menu
3. Select "Add to Home Screen" or "Install App"

**On Desktop (Chrome/Edge):**
1. Look for the install icon in the address bar
2. Click "Install CityAssist"

## 🚀 Building for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Start production server**
   ```bash
   npm run start
   ```

3. **Deploy** to your preferred hosting platform:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify
   - Docker container

### Environment Variables

Create a `.env.local` file for production configuration:

```env
NEXT_PUBLIC_API_URL=https://api.cityassist.example.com
NEXT_PUBLIC_MAP_API_KEY=your_map_api_key
```

## 🔐 Authentication

The app uses a simple mock authentication system suitable for demos:

- Login endpoint: `/api/auth/login`
- User data stored in: `/data/users.json`
- Session managed via: `localStorage`

**For Production:** Replace with proper authentication (NextAuth, Auth0, Firebase Auth, etc.)

## 📊 Mock Data

All data is stored in JSON files in the `/data` directory:

- **users.json** - Demo accounts
- **alerts.json** - City alerts (AQI, traffic, utility)
- **incidents.json** - Reported issues
- **sensors.json** - IoT sensor data
- **services.json** - Local facilities
- **kpis.json** - Dashboard metrics

**For Production:** Replace with API calls to your backend services.

## 🎯 API Integration

To integrate with real backend APIs:

1. Create API utility functions in `/lib/api.ts`
2. Replace `fetch('/data/*.json')` with actual API calls
3. Add proper error handling and loading states
4. Implement authentication token management
5. Add request caching with SWR or React Query

Example:
```typescript
// lib/api.ts
export async function fetchAlerts() {
  const token = localStorage.getItem('access_token')
  const response = await fetch('/api/v1/alerts', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.json()
}
```

## 🧪 Testing

Run tests (when added):
```bash
npm run test
```

## 📝 Development Roadmap

### Phase 1 (Current) - MVP
- [x] Core UI components
- [x] Authentication flow
- [x] Dashboard and home page
- [x] Issue reporting
- [x] Notifications
- [x] Service directory
- [x] PWA functionality

### Phase 2 - Enhanced Features
- [ ] Real-time map with Leaflet
- [ ] Analytics charts with Chart.js
- [ ] Image upload for reports
- [ ] Push notifications
- [ ] Offline form submission
- [ ] Multi-language support

### Phase 3 - Production Ready
- [ ] Backend API integration
- [ ] Database integration
- [ ] Real authentication
- [ ] Admin dashboard
- [ ] Analytics and reporting
- [ ] Performance optimization

## 🤝 Contributing

This is a hackathon project. For production use, please ensure:

1. Proper backend integration
2. Security audits
3. Performance testing
4. Accessibility testing
5. Cross-browser compatibility testing

## 📄 License

This project is developed for the CityAssist Hackathon.

## 🆘 Support

For issues, questions, or suggestions:
- Create an issue in the repository
- Contact the development team

## 🏆 Hackathon Details

**Project**: CityAssist - Citizen-Centric Urban Assistant
**Focus**: Frontend (PWA), User Experience, Civic Engagement
**Stack**: Next.js, React, TailwindCSS, TypeScript
**Deployment**: Production-ready PWA

---

**Built with ❤️ for Smart Cities and Better Civic Engagement**

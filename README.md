# RN AI Diet Tracker

A modern, AI-powered diet tracking app built with Expo and React Native.

## Overview

**RN AI Diet Tracker** helps users plan, track, and optimize their daily meals with the help of artificial intelligence. The app features a playful, modern UI with a minimal dark theme, bold colors, rounded components, and smooth animations. All user-facing text is centralized for easy localization, and robust error handling ensures a smooth user experience.

### Key Features
- Personalized daily meal plans
- AI-powered recipe generation and suggestions
- Nutritional tracking (calories, macros, servings)
- Meal completion tracking
- Fun, modern, and consistent UI/UX
- Centralized user-facing strings for localization
- Robust error boundaries and loading feedback
- Performance optimizations (memoization, best React practices)

## Tech Stack
- **React Native** (with Expo) for cross-platform mobile development
- **Convex** for backend data and mutations
- **Firebase Auth** for authentication
- **AI Services** for recipe and meal plan generation
- **Expo Router** for navigation
- **@hugeicons/react-native** for iconography
- **Jest** for unit testing

## Architecture

### UI Layer
- Built with React Native functional components
- Centralized theme (`Colors.jsx`, `Theme.jsx`) and strings (`constants/strings.js`)
- Shared UI components (Button, Input, LoadingDialog, ErrorBoundary)
- Consistent styling with inline styles and theme variables
- Error boundaries and loading dialogs in all async-capable components

### State & Data Layer
- Uses React hooks (`useState`, `useEffect`, `useCallback`, `useMemo`)
- Context API for user/session state
- Convex hooks (`useQuery`, `useMutation`) for backend interactions
- Async/await with robust try/catch error handling
- All async actions provide loading feedback

### Backend & AI
- Convex for real-time backend data and mutations
- AI-powered endpoints for recipe and meal plan generation
- Firebase for authentication and user management

### Best Practices
- No business logic in UI components; logic is separated and reusable
- All user-facing strings are centralized
- Strict linting and code quality enforcement
- All console logs removed for production
- Error boundaries and try/catch everywhere
- Memoization and hook dependency management
- Unit tests for key components

## Folder Structure
```
components/         # Shared and screen-specific UI components
constants/          # Centralized strings and theme colors
context/            # React context for user/session
services/           # AI/utility services
shared/             # Shared UI and utility modules
app/                # Main app screens and navigation
```

## Getting Started
1. Install dependencies: `npm install`
2. Start the Expo dev server: `npm start`
3. Run on your device or simulator

---

**RN AI Diet Tracker** is designed for extensibility, maintainability, and a delightful user experience. Contributions and feedback are welcome!

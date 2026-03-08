# Mini Wallet - Frontend Application

A React-based frontend application for Mini Wallet, built with modern web technologies. This project offers a robust, high-performance interface for managing basic finances quickly and securely.

## 🚀 Key Features

- **User Authentication**: Secure Login and Registration system.
- **Protected Routes**: Dashboard access is restricted to authenticated users only.
- **Top Up Balance**: Easy way to add funds to the digital wallet.
- **Transfer Balance**: Seamless transfers between users.
- **Transaction History**: Comprehensive tracking of all incoming and outgoing transactions.
- **Profile Management**: Interactive user profile dropdown.

## 🛠️ Technology Stack

This application is built using the latest tools in the Frontend ecosystem:
- **React 19**: A powerful UI library for building web interfaces.
- **Vite**: A lightning-fast build tool with highly optimal Hot Module Replacement (HMR).
- **Tailwind CSS v4**: A utility-first CSS framework for rapid and consistent UI development.
- **React Router DOM**: Declarative routing for React applications.
- **Axios**: HTTP client for making API requests to the backend.

## 📁 Directory Structure

```plaintext
src/
├── assets/         # Static assets like images and icons
├── components/     # Reusable UI Components (TopUpForm, TransferForm, TransactionHistory, etc.)
├── contexts/       # React Context APIs (e.g., AuthContext) for global state management
├── pages/          # Main application pages (Login, Register, Dashboard)
├── services/       # Backend API integration and configurations (e.g., api.jsx for Axios)
├── App.jsx         # Main routing configuration
└── main.jsx        # React application entry point
```

## ⚙️ Prerequisites

Before you begin, ensure you have met the following requirements:
- **Node.js** (Latest LTS version is recommended).
- **NPM** or **Yarn** as the package manager.

## 💻 Installation & Setup

Follow these steps to run the project in your local development environment:

1. **Clone the repository** (or simply navigate to the project folder if already downloaded):
   ```bash
   git clone <your-repository-url>
   cd react_19
   ```

2. **Install all dependencies**:
   ```bash
   npm install
   ```

3. **Initialize Environment Variables (if applicable)**:
   Make sure to configure the `.env` file to connect the application to the backend API. Typically, this involves setting `VITE_API_URL`.

4. **Run the application in development mode**:
   ```bash
   npm run dev
   ```

5. **Open the application in your browser**:
   Navigate to `http://localhost:5173` (or the URL specified in your terminal).

## 🧰 Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production to the `dist` folder.
- `npm run lint`: Runs ESLint to check for code warnings and errors.
- `npm run preview`: Previews the production build locally.

## 🤝 Contributing

Contributions are always welcome! If you'd like to contribute, please follow these steps:
1. *Fork* this repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

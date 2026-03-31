import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import "./App.css";

import CardsPage from "./Pages/cards/CardPage";
import CardDetailPage from "./Pages/cards/CardDetailPage";

import AccountsPage from "./Pages/accounts/AccountsPage";
import AccountDetailPage from "./Pages/accounts/AccountsDetailsPage";

import DashboardPage from "./Pages/dashboard/DashboardPage";

import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ===============================
            PUBLIC
        =============================== */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* ===============================
            DASHBOARD (MAIN)
        =============================== */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* ===============================
            CARDS
        =============================== */}
        <Route 
          path="/cards" 
          element={
            <PrivateRoute>
              <CardsPage />
            </PrivateRoute>
          }
        />

        <Route 
          path="/cards/:_id" 
          element={
            <PrivateRoute>
              <CardDetailPage />
            </PrivateRoute>
          }
        />

        {/* ===============================
            ACCOUNTS
        =============================== */}
        <Route 
          path="/accounts" 
          element={
            <PrivateRoute>
              <AccountsPage />
            </PrivateRoute>
          }
        />

        <Route 
          path="/accounts/:id" 
          element={
            <PrivateRoute>
              <AccountDetailPage />
            </PrivateRoute>
          }
        />

        {/* ===============================
            REDIRECT DEFAULT
        =============================== */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
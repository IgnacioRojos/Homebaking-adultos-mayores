import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';

import CardsPage from './Pages/cards/CardPage';
import CardDetailPage from './Pages/cards/CardDetailPage';
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/login/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* PRIVATE */}
        <Route 
          path="/cards" 
          element={
            <PrivateRoute>
              <CardsPage/>
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;

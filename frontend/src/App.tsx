import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css'
import CardsPage from './Pages/cards/CardPage';
import PrivateRoute from "./Routes/PrivateRoute";
import Login from "./Pages/login/LoginPage";



function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path='/cards' element={
          <PrivateRoute>
            <CardsPage/>
          </PrivateRoute>
        }/>
      </Routes>
        

    </BrowserRouter>
  )
}

export default App

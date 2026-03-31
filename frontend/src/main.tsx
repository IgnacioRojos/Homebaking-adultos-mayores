import { createRoot } from 'react-dom/client'
import { AuthProvider } from "./Context/AuthContext.tsx";
import '../src/styles/global.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)

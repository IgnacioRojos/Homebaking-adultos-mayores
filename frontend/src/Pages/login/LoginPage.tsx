import { useState } from "react";
import { login as loginService } from "../../Service/authService";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); 
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const data = await loginService(dni, password);

      // guardar token
      login(data.token)


      alert("Login exitoso");

      navigate("/cards");

      // después redirigimos
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>

      <input
        type="dni"
        placeholder="dni"
        onChange={(e) => setDni(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Ingresar</button>
    </div>
  );
};

export default Login;
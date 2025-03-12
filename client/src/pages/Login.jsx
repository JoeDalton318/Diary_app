import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Ajout automatique de l'utilisateur test si aucun utilisateur n'existe
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.some((user) => user.pseudo === "test")) {
      const testUser = {
        name: "Utilisateur",
        surname: "Test",
        email: "test@test.com",
        pseudo: "test",
        password: "test",
        avatar: "https://via.placeholder.com/100", // Avatar par défaut
      };

      localStorage.setItem("users", JSON.stringify([...users, testUser]));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.pseudo === username && u.password === password);

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      navigate("/profile");
    } else {
      setError("Utilisateur ou mot de passe incorrect.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Connexion</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Pseudo"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Se connecter
        </button>
        <p className="register-link" onClick={() => navigate("/register")}>
          Créer un compte
        </p>
      </div>
    </div>
  );
};

export default Login;

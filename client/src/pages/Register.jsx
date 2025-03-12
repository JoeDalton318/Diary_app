import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    if (existingUsers.some((user) => user.email === email || user.pseudo === pseudo)) {
      setError("Email ou pseudo déjà utilisé.");
      return;
    }

    const newUser = { name, surname, email, pseudo, password, avatar };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    navigate("/");
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    if (file && (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg")) {
      setAvatar(file);

      const reader = new FileReader();
      reader.onload = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Veuillez sélectionner une image valide (png, jpg, jpeg).");
      setAvatar(null);
      setAvatarPreview(null);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Créer un compte</h2>
        {error && <p className="error-message">{error}</p>}
        
        <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} className="register-input" />
        <input type="text" placeholder="Prénom" value={surname} onChange={(e) => setSurname(e.target.value)} className="register-input" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="register-input" />
        <input type="text" placeholder="Pseudo" value={pseudo} onChange={(e) => setPseudo(e.target.value)} className="register-input" />
        
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} className="register-input" />
        <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="register-input" />

        {password && confirmPassword && password !== confirmPassword && <p className="error-message">⚠️ Les mots de passe ne correspondent pas.</p>}

        <label className="avatar-label">Choisir un avatar (PNG, JPG, JPEG)</label>
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleAvatarChange} className="register-file-input" />

        {avatarPreview && <img src={avatarPreview} alt="Aperçu de l'avatar" className="avatar-preview" />}

        <button onClick={handleRegister} className="register-button" disabled={password !== confirmPassword || password === ""}>
          S'inscrire
        </button>
        
        <p className="login-link" onClick={() => navigate("/")}>Déjà un compte ? Se connecter</p>
      </div>
    </div>
  );
};

export default Register;

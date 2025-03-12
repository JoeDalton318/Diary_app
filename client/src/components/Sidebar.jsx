import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];

    if (storedUser) {
      setUser(storedUser);
      setFriends(storedFriends.filter((f) => f.owner === storedUser.pseudo));

      // Vérifier si l'avatar est une URL ou un fichier local
      if (storedUser.avatar && typeof storedUser.avatar === "string") {
        setAvatarPreview(storedUser.avatar);
      } else if (storedUser.avatar) {
        setAvatarPreview(URL.createObjectURL(storedUser.avatar));
      } else {
        setAvatarPreview("https://via.placeholder.com/100"); // Avatar par défaut
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h1 className="logo">DIARY</h1>

      {user && (
        <>
          <div className="sidebar-profile">
            <img src={avatarPreview} alt="Avatar" className="sidebar-avatar" />
            <p className="sidebar-username">{user.pseudo}</p>
          </div>

          <Link to="/home">🏠 Accueil</Link>
          <Link to="/profile">👤 Mon Profil</Link>
          <button className="sidebar-friends-button" onClick={() => setIsFriendsListOpen(!isFriendsListOpen)}>
            👥 Amis ({friends.length})
          </button>

          {isFriendsListOpen && (
            <div className="sidebar-friends-list">
              {friends.length > 0 ? (
                friends.map((friend, index) => <p key={index}>{friend.friend}</p>)
              ) : (
                <p>Aucun ami</p>
              )}
            </div>
          )}

          <button className="sidebar-logout" onClick={handleLogout}>🚪 Se déconnecter</button>
        </>
      )}
    </div>
  );
};

export default Sidebar;

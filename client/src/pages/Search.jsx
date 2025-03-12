import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Main from "../components/Main";
import "../styles/search.css";

const Search = () => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [filteredHashtags, setFilteredHashtags] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer la requête depuis l'URL
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("q");
    setQuery(searchQuery || "");

    // Charger les utilisateurs et hashtags (simulation via localStorage)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const storedHashtags = JSON.parse(localStorage.getItem("hashtags")) || [];

    setUsers(storedUsers);
    setHashtags(storedHashtags);
  }, [location.search]);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredUsers([]);
      setFilteredHashtags([]);
      return;
    }

    // Filtrer les utilisateurs et hashtags correspondants
    setFilteredUsers(users.filter((user) => user.pseudo.toLowerCase().includes(query.toLowerCase())));
    setFilteredHashtags(hashtags.filter((tag) => tag.toLowerCase().includes(query.toLowerCase())));
  }, [query, users, hashtags]);

  const sendFriendRequest = (friendPseudo) => {
    let pendingRequests = JSON.parse(localStorage.getItem("pendingRequests")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return navigate("/");

    if (pendingRequests.some((req) => req.from === currentUser.pseudo && req.to === friendPseudo)) {
      alert("Demande déjà envoyée !");
      return;
    }

    pendingRequests.push({ from: currentUser.pseudo, to: friendPseudo });
    localStorage.setItem("pendingRequests", JSON.stringify(pendingRequests));

    alert("Demande d'ami envoyée !");
  };

  return (
    <>
      
      <Main>
        <div className="search-container">
          <h2>Résultats de la recherche</h2>

          <h3>Utilisateurs</h3>
          <div className="search-results">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <div key={index} className="search-user-card">
                  <p>{user.pseudo}</p>
                  <button onClick={() => sendFriendRequest(user.pseudo)}>Ajouter</button>
                </div>
              ))
            ) : (
              <p>Aucun utilisateur trouvé.</p>
            )}
          </div>

          <h3>Hashtags</h3>
          <div className="search-results">
            {filteredHashtags.length > 0 ? (
              filteredHashtags.map((tag, index) => <p key={index}>#{tag}</p>)
            ) : (
              <p>Aucun hashtag trouvé.</p>
            )}
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default Search;

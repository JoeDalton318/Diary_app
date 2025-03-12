import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Main from "../components/Main";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();
  const [friendsPhotos, setFriendsPhotos] = useState([]);

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    const storedPhotos = JSON.parse(localStorage.getItem("photos")) || {};

    const today = new Date().toISOString().split("T")[0];

    const photosToday = storedFriends
      .map((friend) => ({
        pseudo: friend.friend,
        photo: storedPhotos[friend.friend]?.[today] || null,
      }))
      .filter((p) => p.photo);

    setFriendsPhotos(photosToday);
  }, []);

  return (
    <>
      <Main>
        <div className="home-container">
          <h2>Fil d'actualité</h2>
          <div className="photo-feed">
            {friendsPhotos.length > 0 ? (
              friendsPhotos.map((item, index) => (
                <div key={index} className="photo-card">
                  <h3>{item.pseudo}</h3>
                  <img src={item.photo} alt="Photo du jour" />
                  <button onClick={() => navigate(`/photo/${item.pseudo}`)}>
                    Réagir
                  </button>
                </div>
              ))
            ) : (
              <p>Aucune photo pour aujourd'hui.</p>
            )}
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default Home;

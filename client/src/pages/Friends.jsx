import { useState, useEffect } from "react";

import Footer from "../components/Footer";
import Main from "../components/Main";
import "../styles/friends.css";

const Friends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const storedFriends = JSON.parse(localStorage.getItem("friends")) || [];
    setFriends(storedFriends);
  }, []);

  return (
    <>
    
      <Main>
        <div className="friends-container">
          <h2>Liste des amis</h2>
          <div className="friends-list">
            {friends.length > 0 ? (
              friends.map((friend, index) => <p key={index}>{friend.friend}</p>)
            ) : (
              <p>Aucun ami ajouté.</p>
            )}
          </div>
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default Friends;

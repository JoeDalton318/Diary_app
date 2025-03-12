import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Main from "../components/Main";
import PhotoGallery from "../components/PhotoGallery";
import Notifications from "../components/Notifications";
import "../styles/profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!storedUser) {
      navigate("/");
      return;
    }
    setUser(storedUser);

    const storedPhotos = JSON.parse(localStorage.getItem("photos")) || {};
    setPhotos(storedPhotos[storedUser.pseudo] || {});
  }, [navigate]);

  return (
    <Main>
      <div className="profile-container">
        {user && (
          <>
            <div className="profile-header">
              <h2>{user.pseudo}</h2>
              <p>TOT-300 | AMIS 23</p>
            </div>
            <Notifications user={user} />
            <PhotoGallery photos={photos} />
          </>
        )}
      </div>
    </Main>
  );
};

export default Profile;

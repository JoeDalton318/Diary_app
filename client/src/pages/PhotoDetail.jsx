import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Footer from "../components/Footer";
import Main from "../components/Main";
import "../styles/photoDetail.css";

const PhotoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const storedPhotos = JSON.parse(localStorage.getItem("photos")) || {};
    const today = new Date().toISOString().split("T")[0];

    if (storedPhotos[id] && storedPhotos[id][today]) {
      setPhoto(storedPhotos[id][today]);
    }
  }, [id]);

  return (
    <>
      
      <Main>
        <div className="photo-detail-container">
          <button onClick={() => navigate("/home")}>⬅ Retour</button>
          {photo ? (
            <img src={photo} alt="Photo du jour" className="photo-display" />
          ) : (
            <p>Aucune photo trouvée.</p>
          )}
        </div>
      </Main>
      <Footer />
    </>
  );
};

export default PhotoDetail;

import { useEffect, useState } from "react";
import "../styles/notifications.css";

const Notifications = ({ user }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (!user) return;

    const today = new Date().toISOString().split("T")[0];
    const storedPhotos = JSON.parse(localStorage.getItem("photos")) || {};
    const hasPhoto = storedPhotos[user.pseudo]?.[today];

    if (!hasPhoto) {
      setShowNotification(true);
    }
  }, [user]);

  return (
    showNotification && (
      <div className="notification">
        <p>📷 Vous n'avez pas encore ajouté votre photo aujourd'hui !</p>
      </div>
    )
  );
};

export default Notifications;

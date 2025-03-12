import "../styles/photo.css";

const Photo = ({ photo, description }) => {
  return (
    <div className="photo-card">
      <img src={photo} alt="Photo du jour" className="photo-image" />
      {description && <p className="photo-description">{description}</p>}
    </div>
  );
};

export default Photo;

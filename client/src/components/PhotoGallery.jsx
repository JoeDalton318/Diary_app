import "../styles/photoGallery.css";

const PhotoGallery = ({ photos }) => {
  return (
    <div className="photo-gallery">
      {Object.keys(photos).length > 0 ? (
        Object.entries(photos).map(([year, months]) => (
          <div key={year} className="year-section">
            <h4>{year}</h4>
            {Object.entries(months).map(([month, photo]) => (
              <div key={month} className="photo-card">
                <p>{month}</p>
                <img src={photo} alt={`Photo de ${month}`} />
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Aucune photo disponible</p>
      )}
    </div>
  );
};

export default PhotoGallery;

import { Link } from 'react-router-dom';

const PhotoGallery = ({ photoList }) => {
    return (
        <div className="photo-gallery">
            {photoList.map(photo => (
                <div className="photo-item" key={photo.urls.full}>
                    <Link to={`/photos/${photo.id}`}>
                        <img src={photo.urls.thumb} alt={photo.slug} />
                    </Link>
                    <p>By {photo.user.name}</p>
                </div>
            ))}
        </div>
    );
};

export default PhotoGallery
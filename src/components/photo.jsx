import { useParams } from "react-router-dom"
import PhotoGallery from "./photo-gallery";
import { useState } from "react";

function Photo({ photoList }) {
    const { id } = useParams()

    const photo = photoList.find(f => f.id === id)

    if (!id || !photo) {
        return <PhotoGallery photoList={photoList} />;
    }

    return (
        <div className="card-container">
            <a href="" className="card">
                <img src={photo.urls.full} className="card__image" alt={photo.slug} />
                <div className="card__overlay">
                    <div className="card__header">
                        <img className="card__thumb" src={photo.urls.thumb} alt="" />
                        <div className="card__header-text">
                            <h3 className="card__title">{photo.user.name}</h3>
                            <span className="card__status">{Date(photo.created_at)}</span>
                        </div>
                    </div>
                    <p className="card__description">{photo.description !== null ? photo.description : photo.alt_description}</p>
                </div>
            </a>
        </div>
    )
}

export default Photo
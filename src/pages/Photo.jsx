import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import Button from "../components/Button";

function Photo() {
    const { id } = useParams()
    const [photo, setPhoto] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    // fetch photos
    useEffect(() => {
        const fetchPhotos = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_UNSPLASH_URL}/${id}`, {
                    params: {
                        client_id: import.meta.env.VITE_ACCESS_KEY
                    }
                });

                setPhoto(response.data)
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchPhotos();
    }, [id]);

    useEffect(() => {
        const onScroll = () => {
            if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight) {
                setPage((prevPage) => prevPage + 1)
            }
        }

        window.addEventListener('scroll', onScroll)

        return () => window.removeEventListener('scroll', onScroll)
    }, []);

    return (
        <>
            <Link to={'/photos'}>
                <Button content={'Home'} />
            </Link>
            <div className="card-container">
                {(isLoading || !photo) && <Spinner />}
                {photo && (
                    <a href="" className="card">
                        <img src={photo.urls.raw} className="card__image" alt={photo.slug} />
                        <div className="card__overlay">
                            <div className="card__header">
                                <img className="card__thumb" src={photo.urls.thumb} alt="" />
                                <div className="card__header-text">
                                    <h3 className="card__title">{photo.user.name}</h3>
                                    <span className="card__status">{photo.created_at}</span>
                                </div>
                            </div>
                            <p className="card__description">{photo.description !== null ? photo.description : photo.alt_description}</p>
                        </div>
                    </a>)
                }
            </div>
        </>
    )
}

export default Photo
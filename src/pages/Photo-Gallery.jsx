import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner'

const PhotoGallery = () => {
    const perPage = 12;

    const [page, setPage] = useState(2);
    const [photoList, setPhotoList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // fetch photos
    useEffect(() => {
        const fetchPhotos = async () => {
            setIsLoading(true)
            try {
                const response = await axios.get(`${import.meta.env.VITE_UNSPLASH_URL}`, {
                    params: {
                        client_id: import.meta.env.VITE_ACCESS_KEY,
                        page,
                        per_page: perPage,
                    },
                });

                if (response.data.length > 0) {
                    setPhotoList((prevPhotoList) => [...prevPhotoList, ...response.data]);
                } else {
                    setHasMore(false);
                }
            } catch (error) {
                console.error(error);
            }
            setIsLoading(false);
        };
        fetchPhotos();

        return () => { }
    }, [page]);

    useEffect(() => {
        const scrollWindow = () => {
            if (window.innerHeight + window.scrollY >= window.document.body.offsetHeight) {
                setPage((prevPage) => prevPage + 1)
            }
        }
        window.addEventListener('scroll', scrollWindow)
        return () => window.removeEventListener('scroll', scrollWindow)
    }, []);

    return (
        <>
            <div className="photo-gallery">
                {isLoading && <Spinner />}
                {photoList.map(photo => (
                    <div className="photo-item" key={photo.id}>
                        <Link to={`/photos/${photo.id}`}>
                            <img src={photo.urls.thumb} alt={photo.slug} />
                        </Link>
                        <p>By {photo.user.name}</p>
                    </div>
                ))
                }
            </div >

            {!hasMore && <div className='has-more'>No more photos to load</div>}
        </>
    );
};

export default PhotoGallery
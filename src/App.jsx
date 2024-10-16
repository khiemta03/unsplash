import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PhotoGallery from './components/photo-gallery';
import Photo from './components/photo';
import Spinner from './components/spinner';
import './App.css';

function App() {
  const accessKey = import.meta.env.VITE_ACCESS_KEY;
  const baseURL = import.meta.env.VITE_UNSPLASH_URL;
  const perPage = 12;

  const [page, setPage] = useState(1);
  const [photoList, setPhotoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const isFetching = useRef(false);
  const scrollContainerRef = useRef(null);

  const fetchPhotos = async () => {
    if (isFetching.current || !hasMore) return;

    isFetching.current = true;

    try {
      const response = await axios.get(baseURL, {
        params: {
          client_id: accessKey,
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
    } finally {
      isFetching.current = false;
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;
      if (scrollHeight - scrollTop <= clientHeight + 20 && !isLoading && hasMore) {
        setPage((prevPage) => prevPage + 1);
        setIsLoading(true);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isLoading, hasMore]);

  return (
    <Router>
      {isLoading && <Spinner />}
      <div
        ref={scrollContainerRef}
        style={{ height: '80vh', overflowY: 'auto', position: 'relative' }}
      >
        <Routes>
          <Route path="/photos" element={<PhotoGallery photoList={photoList} />} />
          <Route path="/photos/:id" element={<Photo photoList={photoList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

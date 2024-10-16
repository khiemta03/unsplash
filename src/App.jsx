
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import PhotoGallery from './pages/Photo-Gallery';
import Photo from './pages/Photo';

const router = createBrowserRouter([
  {
    path: '/photos',
    children: [
      {
        index: true,
        element: <PhotoGallery />
      },
      {
        path: ':id',
        element: <Photo />
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

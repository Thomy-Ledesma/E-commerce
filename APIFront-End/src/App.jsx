import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from './context'; // Import the context provider
import Pagina2 from './pages/Pagina2/Pagina2';
import Navbar from './components/NavBar/NavBar';
import FrontPage from './pages/FrontPage/FrontPage';
import AlbumPage from './pages/AlbumPage/AlbumPage';
import NotFound from './pages/NotFound/NotFound';
import UploadPage from './pages/uploadPage/UploadPage';
import Login from './pages/login/Login';

const App = () => {
  return (
    <ContextProvider>  {/* Use the context provider */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/placeholder" element={<Pagina2 />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/uploadAlbum" element={<UploadPage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </ContextProvider>
  );
};

export default App;

//ivo cuando puedas explicame por que hay tantos componentes product
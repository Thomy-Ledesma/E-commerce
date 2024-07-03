import { Routes, Route } from 'react-router-dom';
import { ContextProvider } from './context'; // Import the context provider
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Pagina2 from './pages/Pagina2/Pagina2';
import Navbar from './components/header/Header';
import FrontPage from './pages/FrontPage/FrontPage';
import AlbumPage from './pages/AlbumPage/AlbumPage';
import NotFound from './pages/NotFound/NotFound';
import UploadPage from './pages/uploadPage/UploadPage';
import AdminPage from './pages/adminPage/AdminPage';
import Login from './pages/login/Login';
import Footer from './components/footer/Footer'
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  return (
    <ContextProvider>  {/* Use the context provider */}
      <div className='principal-page'>
        <Navbar />
        <Routes>
          <Route path="/" element={<FrontPage />}  />
          <Route path="/placeholder" element={<Pagina2 />} />
          <Route path="/album/:albumId" element={<AlbumPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/uploadAlbum" element={<UploadPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='AdminPage' element={<AdminPage/>} />
          <Route path='/Registrarse' element={<SignUp />} />
        </Routes>
          <Footer/>
      </div>
    </ContextProvider>
  );
};

export default App;

//ivo cuando puedas explicame por que hay tantos componentes product
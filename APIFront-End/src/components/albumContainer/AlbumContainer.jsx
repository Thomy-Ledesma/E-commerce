import AlbumCard from "../AlbumCard/AlbumCard";
import { Button } from "react-bootstrap";
import "./AlbumContainer.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Función para barajar los álbumes
const shuffleArray = (array) => {
  let shuffledArray = array.slice(); // Crear una copia del array original
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray; // Devolver el array barajado
};

const AlbumContainer = ({ albums }) => {
  const [displayedAlbums, setDisplayedAlbums] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const albumsPerPage = 8;

  useEffect(() => {
    if (albums && albums.length > 0) {
      const shuffledAlbums = shuffleArray(albums); // Barajar los álbumes
      setDisplayedAlbums(shuffledAlbums); // Actualizar el estado con los álbumes barajados
    }
  }, [albums]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(displayedAlbums.length / albumsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentAlbums = displayedAlbums.slice(
    currentPage * albumsPerPage,
    (currentPage + 1) * albumsPerPage
  );

  return (
    <div className="albums-container-wrapper">
      <div className="albums-container">
        {currentAlbums.length > 0 ? (
          currentAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />  // Usar album.id como key única
          ))
        ) : (
          <p className="text-white">No hay álbumes</p>
        )}
      </div>
      <div className="pagination-controls">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="pagination-button"
          variant="warning"
        >
          Previous
        </Button>
        <label>1</label>
        <Button
          onClick={handleNextPage}
          disabled={currentPage >= Math.ceil(displayedAlbums.length / albumsPerPage) - 1}
          className="pagination-button"
          variant="warning"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

AlbumContainer.propTypes = {
  albums: PropTypes.array.isRequired,
};

export default AlbumContainer;
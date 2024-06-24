import AlbumCard from "../AlbumCard/AlbumCard";
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

  useEffect(() => {
    if (albums && albums.length > 0) {
      console.log('Albums received:', albums);
      const shuffledAlbums = shuffleArray(albums); // Barajar los álbumes
      const slicedAlbums = shuffledAlbums.slice(0, 8); // Cortar los primeros 8 álbumes
      console.log('Sliced Albums:', slicedAlbums);
      setDisplayedAlbums(slicedAlbums); // Actualizar el estado con los álbumes cortados
    }
  }, [albums]);

  return (
    <div className="albums-container">
      {displayedAlbums.length > 0 ? (
        displayedAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />  // Usar album.id como key única
        ))
      ) : (
        <p className="text-white">No hay álbumes</p>
      )}
    </div>
  );
};

AlbumContainer.propTypes = {
  albums: PropTypes.array.isRequired,
};

export default AlbumContainer;
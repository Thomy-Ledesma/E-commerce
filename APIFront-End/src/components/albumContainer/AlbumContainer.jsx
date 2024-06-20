import AlbumCard from "../AlbumCard/AlbumCard";
import "./AlbumContainer.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const AlbumContainer = ({ albums }) => {
  const [displayedAlbums, setDisplayedAlbums] = useState([]);

  useEffect(() => {
    console.log('Albums received:', albums);
    const slicedAlbums = albums.slice(0, 8);  // Cortar los primeros 8 álbumes
    console.log('Sliced Albums:', slicedAlbums);
    setDisplayedAlbums(slicedAlbums);  // Actualizar el estado con los álbumes cortados
  }, [albums]);

  return (
    <div className="albums-container">
      {displayedAlbums.length > 0 ? (
        displayedAlbums.map((album) => (
          <AlbumCard key={album.id} album={album} />  // Usar album.id como key única
        ))
      ) : (
        <p>No hay álbumes</p>
      )}
    </div>
  );
};

AlbumContainer.propTypes = {
  albums: PropTypes.array.isRequired,
};

export default AlbumContainer;
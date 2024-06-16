import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context';

const Navbar = () => {
  const [loggedUser] = useContext(Context);
  const userName = loggedUser?.name || "Guest";

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/placeholder">Placeholder</Link></li>
        <li><Link to="/uploadAlbum">Upload new album</Link></li>
        <li><Link to="/login">Sign in</Link></li>
      </ul>
      <h2>{userName}</h2>
    </nav>
  );
};

export default Navbar;
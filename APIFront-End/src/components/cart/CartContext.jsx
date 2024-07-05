import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [albumToAdd, setAlbumToAdd] = useState(null);

  const addToCart = (album) => {
    setCart((prevCart) => {
      const existingAlbum = prevCart.find(item => item.id === album.id);
      if (existingAlbum) {
        return prevCart.map(item => item.id === album.id ? { ...item, amount: item.amount + 1 } : item);
      } else {
        return [...prevCart, { ...album, amount: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter(album => album.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, albumToAdd, setAlbumToAdd }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

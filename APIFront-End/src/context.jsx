import { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});

  return (
    <Context.Provider value={[loggedUser, setLoggedUser]}>
      {children}
    </Context.Provider>
  );
};
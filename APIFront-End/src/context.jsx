import { createContext, useState, useEffect } from 'react';

export const Context = createContext();
const URL = "https://localhost:7051/products/";

export const ContextProvider = ({ children }) => {
  const [loggedUser, setLoggedUser] = useState({});
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + "listProducts").then((response) =>
        response.json()
      );
      setProductList(result);
      setFilteredProductList(result);
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log(productList);
  }, [productList]);

  useEffect(() => {
    setLoggedUser(JSON.parse(sessionStorage.getItem('user')));
  }, []);


  return (
    <Context.Provider value={{loggedUser, setLoggedUser, productList, setProductList, filteredProductList, setFilteredProductList}}>
      {children}
    </Context.Provider>
  );
};
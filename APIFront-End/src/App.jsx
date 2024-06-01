import { useState, useEffect } from 'react'
import UserForm from './UserForm/UserForm';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import './App.css'

const URL = "https://localhost:7051/products/"


function App() {
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + "listProducts").then(response => response.json())
      setProductList(result)
      console.log(result)
    }
    fetchData();
  }, []);

  /*const addUser = (name, age)=>{
    fetch(URL + `saveNewUser?name=${name}&age=${age}`,{
      method: 'POST'
    })
  }
  
  :(
  */

  return (
    <> 
    <ul>
      {productList.map((album)=>{
        let photo = (`Covers/${album["photoURL"]}`)
        return(
          <li key={album["id"]}>
            <img src={photo} height={220} width={220}/> 
            <h2>{album["name"]}</h2>
          </li>
        )
      })}
    </ul>
    </>
  );}

export default App

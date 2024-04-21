import { useState, useEffect } from 'react'
import UserForm from './UserForm/UserForm';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'react-bootstrap';
import './App.css'

const URL = "https://localhost:7051/clients/"


function App() {
  const [userList, setUserList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + "listUsers").then(response => response.json())
      setUserList(result)
      console.log(result)
    }
    fetchData();
  }, []);

  const addUser = (name, age)=>{
    fetch(URL + `saveNewUser?name=${name}&age=${age}`,{
      method: 'POST'
    })
  }

  return (
    <>
    <ul>
      {userList.map((user)=>{
        return(
          <li key={user["id"]}>
            <h2>name: {user["name"]}</h2>
            <h2>name: {user["age"]}</h2>
          </li>
        )
      })}
    </ul>
    </>
  );
}

export default App

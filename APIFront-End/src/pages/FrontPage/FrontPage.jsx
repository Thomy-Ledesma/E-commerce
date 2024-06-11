import { useState, useEffect } from 'react'

const URL = "https://localhost:7051/products/"
function FrontPage() {
  const [productList, setProductList] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(URL + "listProducts").then(response => response.json())
      setProductList(result)
      console.log(result)
    }
    fetchData();
  }, []);

  return (
    <>
    <div> 
    <ul>
      {productList.map((album)=>{
        let photo = (`Covers/${album["photoURL"]}`)
        return(
          <li key={album["id"]}>
            <img src={photo} height={220} width={220}/> 
            <h2>{album["name"]}</h2>
            <h3>${album["price"]}</h3>
            <h3>rating: {album["reviews"].length > 0 ? album["reviews"].reduce((sum, obj) => sum + obj.rating, 0) / album["reviews"].length : "No reviews yet"}</h3>
          </li>
        )
      })}
    </ul>
    </div>
    </>
  );}

export default FrontPage


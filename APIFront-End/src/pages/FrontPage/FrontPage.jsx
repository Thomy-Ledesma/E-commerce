import { useState, useEffect } from 'react'
import AlbumCard from '../../components/AlbumCard/AlbumCard';

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
      {productList.map((album)=>{
        return(
          <AlbumCard album={album} key={album.id}/>
        )
      })}
    </div>
    </>
  );}

export default FrontPage

/*

*/
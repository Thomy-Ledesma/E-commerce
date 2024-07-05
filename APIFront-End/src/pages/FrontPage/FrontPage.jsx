import { useContext } from "react";
import { Context } from "../../context";
// import AlbumCard from '../../components/AlbumCard/AlbumCard';
import AlbumContainer from "../../components/albumContainer/AlbumContainer";



function FrontPage() {
  const { filteredProductList } = useContext(Context);

  // return (
  //   <>
  //   <div>
  //     {productList.map((album)=>{
  //       return(
  //         // <AlbumCard album={album} key={album.id}/>
  //         <AlbumContainer album={album} key={album.id}/>
  //       )
  //     })}
  //   </div>
  //   </>
  // );}

  return (
    <div>
      <AlbumContainer albums={filteredProductList} />      
      
    </div>
  );
}

export default FrontPage;

/*

*/

import useProductsList from '../../hooks/useProductsList';
import AlbumCard from '../AlbumCard/AlbumCard'; // Asegúrate de que la ruta sea correcta

const ProductsList = () => {
  const { products, loading, error } = useProductsList();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="products-list">
      {products.map((product) => (
        <AlbumCard key={product.id} album={product} />
      ))}
    </div>
  );
};

export default ProductsList;

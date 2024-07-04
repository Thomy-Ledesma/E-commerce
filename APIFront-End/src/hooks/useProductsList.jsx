import { useEffect } from 'react';

const useProductsList = (setProducts, setLoading, setError) => {
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:7051/products/listProducts');
        if (!response.ok) {
          throw new Error('Error fetching products');
        }
        const productsData = await response.json();
        setProducts(productsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts, setLoading, setError]);
};

export default useProductsList;

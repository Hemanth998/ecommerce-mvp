import '../css/bootstrap.min.css';
import ProductCard from '../components/ProductCard';

const ProductListing = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is product 1',
      price: 100,
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is product 2',
      price: 200,
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'This is product 3',
      price: 300,
    },
  ];
  return (
    <div className="container mt-5">
      <div className="row">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
    </div>
  );
};
export default ProductListing;

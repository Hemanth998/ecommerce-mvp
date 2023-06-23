import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
const ProductDetails = () => {
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
  const { id } = useParams();
  const product = products.find((product) => product.id === Number(id));

  return (
    <div>
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
      <h3>{product.description}</h3>
      <Link to="/">
        <button type="button" class="btn btn-primary">
          back
        </button>
      </Link>
    </div>
  );
};
export default ProductDetails;

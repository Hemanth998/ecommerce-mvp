import { Link } from 'react-router-dom';
const ProductCard = ({ product }) => {
  return (
    <div className="col-sm-4">
      <div class="card">
        <div class="card-body">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="d-block user-select-none"
            width="100%"
            height="200"
            aria-label="Placeholder: Image cap"
            focusable="false"
            role="img"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 318 180"
            style={{ fontSize: '1.125rem', textAnchor: 'middle' }}
          >
            <rect width="100%" height="100%" fill="#868e96"></rect>
            <text x="50%" y="50%" fill="#dee2e6" dy=".3em">
              Image cap
            </text>
          </svg>
          <h4 class="card-title">{product.name}</h4>
          <h6 class="card-subtitle mb-2 text-muted">${product.price}</h6>

          <p class="card-text">{product.description.substring(0, 100)}</p>
          <Link to={`/product/${product.id}`} class="card-link">
            More info
          </Link>
          <a href="#" class="card-link">
            Another link
          </a>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;

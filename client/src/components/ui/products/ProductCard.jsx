import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";
import "./Product.css";

const ProductCard = ({
  title,
  description,
  price,
  imageUrl,
  quantity,
  unit,
  productId,
}) => {
  const navigate = useNavigate();

  return (
    <Link className="card" to={`/products-details/${productId}`}>
      <div className="card-img">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-title">{title}</div>

      <div className="card-price">
        <p>
          Price : <span>{price}</span>
        </p>
      </div>

      <div className="card-subtitle">
        {description.length > 80
          ? description.substring(0, 80) + "..."
          : description}
      </div>

      <hr className="card-divider" />

      <div className="card-footer">
        {quantity === 0 ? (
          <div className="card-price">Out of Stock</div>
        ) : (
          <div className="card-price">
            {quantity} <span>{unit}</span>
          </div>
        )}
        <Button
          onClick={() => navigate(`/products-details/${productId}`)}
          className="h-[35px] w-28 text-[10px] flex items-center justify-center cursor-pointer bg-primary border border-transparent hover:bg-white hover:border-primary text-white hover:text-primary transition duration-200"
        >
          View Details
        </Button>
      </div>
    </Link>
  );
};

export default ProductCard;

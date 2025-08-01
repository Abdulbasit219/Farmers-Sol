import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetCategoryByIdQuery,
  useGetProductByCategoryQuery,
  useGetProductsByIdQuery,
} from "../redux/ApiSlice";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";
import Button from "../components/ui/Button";

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState();
  const [thumbnails, setThumbnails] = useState([]);

  const { id } = useParams();
  const { data, isLoading } = useGetProductsByIdQuery(id);
  const product = data?.products[0];

  const { data: categoryData, isLoading: categoryLoading } =
    useGetProductByCategoryQuery(product?.category, {
      skip: !product?.category,
    });

  const { data: catName, isLoading: catLoading } = useGetCategoryByIdQuery(
    product?.category,
    { skip: !product?.category }
  );

  const handleThumbnailClick = (clickedImage) => {
    setThumbnails((prevThumbnails) => {
      const newThumbnails = [
        mainImage,
        ...prevThumbnails.filter((img) => img !== clickedImage),
      ];
      return newThumbnails;
    });
    setMainImage(clickedImage);
  };

  const similarProducts =
    categoryData?.products?.filter((p) => p._id !== product._id) || [];

  const displaySimilarProducts =
    similarProducts.length > 4
      ? [...similarProducts].sort(() => 0.5 - Math.random()).slice(0, 4)
      : similarProducts;

      console.log(product?.category)

  useEffect(() => {
    if (product?.imageUrl?.length > 0) {
      setMainImage(product.imageUrl[0]);
      setThumbnails(product.imageUrl.slice(1));
    }
  }, [product]);

  if (isLoading || categoryLoading || catLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="flex flex-wrap -mx-4">
          {/* Product Images */}
          <div className="w-full md:w-1/2 px-4 mb-8 ">
            <img
              src={mainImage}
              alt="Product"
              className="w-full max-h-[400px] object-contain rounded-lg shadow-md mb-2"
            />
            <div className="flex gap-3 pt-2 pb-0 overflow-x-auto">
              {thumbnails.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => handleThumbnailClick(src)}
                  className="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300"
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 px-4">
            {/* title */}
            <h2 className="text-3xl font-bold mb-2">{product.title}</h2>

            {/* price */}
            <div className="mb-4">
              <span className="text-2xl font-semibold mr-2">
                Price: {product.price}
              </span>
            </div>

            {/* description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* quantity */}
            <div className="mb-6 flex justify-between">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Quantity: {product.quantity} {product.unit}
              </label>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Category: {catName.category[0].name}
              </label>
            </div>

            {/* order button */}
            <div className="flex space-x-4 mb-6">
              <Button className="bg-primary border border-transparent hover:bg-white hover:border-primary text-white hover:text-primary transition duration-200 cursor-pointer">
                Order Now
              </Button>
            </div>

            {similarProducts.length > 0 && (
              <div className="w-full text-xl font-semibold">
                <p className="text-2xl font-semibold mr-2">Similar Products:</p>
                {displaySimilarProducts.map((item, i) => (
                  <Link
                    to={`/products-details/${item._id}`}
                    key={i}
                    className="rounded-lg shadow p-3 hover:shadow-md transition duration-200"
                  >
                    <img
                      src={item.imageUrl[0]}
                      alt={item.title}
                      className="h-24 object-cover rounded-md mb-2 opacity-80 hover:opacity-100 transition duration-300"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

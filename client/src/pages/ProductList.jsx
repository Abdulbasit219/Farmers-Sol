import { useState } from "react";
import Dropdown from "../components/ui/Dropdown";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";
import ProductCard from "../components/ui/products/ProductCard";
import {
  useGetCategoriesQuery,
  useGetProductByCategoryQuery,
  useGetProductsQuery,
} from "../redux/ApiSlice";
import Search from "../components/ui/Search";

function ProductList() {
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [searchProducts, setSearchProducts] = useState("");

  const { data: allProductsData, isLoading: isAllProductsLoading } =
    useGetProductsQuery();
  const { data: catData, isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();
  const { data: productsByCatData, isLoading: isProductsByCatLoading } =
    useGetProductByCategoryQuery(selectedCatId, {
      skip: !selectedCatId,
    });

  const products = selectedCatId
    ? productsByCatData?.products || []
    : allProductsData?.products || [];

  const categories = catData?.categories || [];

  const categoryMenuItems = categories.map((cat) => ({
    label: cat.name,
    onClick: () => setSelectedCatId(cat._id),
  }));

  const filteredProducts = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(searchProducts.toLowerCase()) ||
      p.description.toLowerCase().includes(searchProducts.toLowerCase())
    );
  });

  if (isAllProductsLoading || isCategoriesLoading || isProductsByCatLoading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="w-[90%] mx-auto">
      {/* category dropdown and search */}
      <div className="my-4 flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between w-full">
        <div className="w-full md:w-auto">
          <Dropdown
            buttonContent="Category"
            menuItems={categoryMenuItems}
            className="bg-green-100 hover:bg-green-200 justify-between w-full"
            svg={true}
            position="left-0"
          />
        </div>
        <div className="w-full md:w-auto">
          <Search onSearch={setSearchProducts} />
        </div>
      </div>

      <div className="flex gap-[20px] flex-wrap">
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((p) => (
            <ProductCard
              key={p._id}
              title={p.title}
              description={p.description}
              price={p.price}
              imageUrl={p.imageUrl[0]}
              quantity={p.quantity}
              unit={p.unit}
              productId={p._id}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ProductList;

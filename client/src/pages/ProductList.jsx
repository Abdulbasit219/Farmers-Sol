import Dropdown from "../components/ui/Dropdown";
import LoadingOverlay from "../components/ui/loading/LoadingOverlay";
import ProductCard from "../components/ui/products/ProductCard";
import Search from "../components/ui/Search";
import useCategoryFilter from "../hooks/useCategoryFilter";
import Pagination from "../components/ui/Pagination";
import useSearchProducts from "../hooks/useSearchProducts";

function ProductList() {
  const {
    categoryMenuItems,
    selectedCatName,
    products,
    isLoading,
    page,
    setPage,
    totalPages,
  } = useCategoryFilter();

  const {
    search,
    setSearch,
    searchResults,
    isSearching,
    isSearchLoading,
    handleSearchProduct,
    page: searchPage,
    setPage: setSearchPage,
    totalPages: searchTotalPages,
  } = useSearchProducts();

  const displayProducts = isSearching ? searchResults : products;

  if (isLoading || isSearchLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      {isLoading || isSearchLoading ? (
        <div>
          <LoadingOverlay />
        </div>
      ) : (
        <div className="w-[90%] mx-auto">
          {/* category dropdown and search */}
          <div className="my-4 flex flex-col-reverse md:flex-row items-start md:items-center md:justify-between">
            <div className="w-full md:w-auto">
              <Dropdown
                buttonContent={
                  selectedCatName === "All Products"
                    ? "Category"
                    : selectedCatName.name[0].toUpperCase() +
                      selectedCatName.name.slice(1)
                }
                menuItems={categoryMenuItems}
                className="bg-[#E4F8E2] hover:bg-[#daf3d7] justify-between w-full"
                svg={true}
                position="left-0"
                products={products}
              />
            </div>
            <div className="w-full md:w-auto">
              <Search
                setSearch={setSearch}
                search={search}
                handleSearchProduct={handleSearchProduct}
              />
            </div>
          </div>

          <div className="flex gap-[20px] flex-wrap">
            {displayProducts.length === 0 ? (
              <p className="text-red-500 py-4 w-full flex justify-center">
                {isSearching
                  ? "No products found for your search."
                  : `No products available at this ${selectedCatName.name} category.`}
              </p>
            ) : (
              displayProducts.map((p) => (
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

          <div className="flex gap-2 justify-end lg:mr-12 p-4">
            <Pagination
              page={isSearching ? searchPage : page}
              totalPages={isSearching ? searchTotalPages : totalPages}
              setPage={isSearching ? setSearchPage : setPage}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;

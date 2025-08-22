import { useState } from "react";
import {
  useGetCategoriesQuery,
  useGetProductByCategoryQuery,
  useGetProductsQuery,
} from "../redux/ApiSlice";

function useCategoryFilter(search) {
  const [selectedCatId, setSelectedCatId] = useState(null);
  const [page, setPage] = useState(1);

  const {
    data: allProductsData,
    isLoading: isAllProductsLoading,
    isFetching: isProductsFetching,
  } = useGetProductsQuery({ page });

  const {
    data: catData,
    isLoading: isCategoriesLoading,
    refetch: refetchCategories,
  } = useGetCategoriesQuery(search);

  const {
    data: productsByCatData,
    isLoading: isProductsByCatLoading,
    isFetching: isProductsByCatFetching,
  } = useGetProductByCategoryQuery(
    { catId: selectedCatId, page },
    { skip: !selectedCatId }
  );

  const categories = catData?.categories || [];

  const products = selectedCatId
    ? productsByCatData?.products || []
    : allProductsData?.products || [];

  const categoryMenuItems = [
    {
      label: "Clear Filter",
      onClick: () => {
        setSelectedCatId(null);
        setPage(1);
      },
    },
    ...categories.map((cat) => ({
      label: cat.name,
      onClick: () => {
        setSelectedCatId(cat._id);
        setPage(1);
      },
    })),
  ];

  const selectedCatName =
    selectedCatId === null
      ? "All Products"
      : categories.find((cat) => cat._id === selectedCatId);

  const isLoading =
    isAllProductsLoading ||
    isCategoriesLoading ||
    isProductsByCatLoading ||
    isProductsByCatFetching ||
    isProductsFetching;

  const totalPages = selectedCatId
    ? productsByCatData?.totalPages || 1
    : allProductsData?.totalPages || 1;

  return {
    selectedCatId,
    selectedCatName,
    categories,
    products,
    categoryMenuItems,
    isLoading,
    allProducts: allProductsData,
    refetchCategories,
    page,
    setPage,
    totalPages,
  };
}

export default useCategoryFilter;

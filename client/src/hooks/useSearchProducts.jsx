import React, { useEffect, useState } from "react";
import { useSearchProductMutation } from "../redux/ApiSlice";
import { handleError } from "../Utils";

export default function useSearchProducts() {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [searchProduct, { isLoading: isSearchLoading }] =
    useSearchProductMutation();

  const handleSearchProduct = async (e) => {
    if (e) e.preventDefault();
    if (!search.trim()) return;

    try {
      setIsSearching(true);
      const res = await searchProduct({ query: search, page }).unwrap();
      setSearchResults(res.searchResult || []);
      setTotalPages(res.totalPages);
    } catch (error) {
      handleError(error || "Failed to search Products");
    }
  };

  useEffect(() => {
    if (isSearching && search.trim()) {
      handleSearchProduct();
    }
  }, [page]);

  useEffect(() => {
    if (!search.trim()) {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, [search]);

  return {
    search,
    setSearch,
    searchResults,
    isSearching,
    isSearchLoading,
    handleSearchProduct,
    page,
    setPage,
    totalPages,
  };
}

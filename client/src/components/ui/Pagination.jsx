import Button from "./Button";

function Pagination({ page, totalPages, setPage }) {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex gap-2 justify-end lg:mr-12 p-4">
      {/* Prev Button */}
      <div>
        <Button
          className={`px-4 py-2 border cursor-pointer ${
            page === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:text-primary hover:bg-white"
          }`}
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </Button>
      </div>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              key={pageNumber}
              onClick={() => setPage(pageNumber)}
              className={`w-8 h-8 flex items-center cursor-pointer justify-center border rounded 
              ${
                pageNumber === page
                  ? "bg-primary text-white"
                  : "bg-white text-primary hover:bg-primary hover:text-white"
              }`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      {/* Next Button */}
      <div>
        <Button
          className={`px-4 py-2 border cursor-pointer ${
            page === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:text-primary hover:bg-white"
          }`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Pagination;

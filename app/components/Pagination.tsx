import {
    FiChevronLeft,
    FiChevronRight,
    FiChevronsLeft,
    FiChevronsRight,
  } from "react-icons/fi";
  
  interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  
  export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
    const generatePages = () => {
      const pages = [];
      const max = Math.min(5, totalPages);
  
      for (let i = 0; i < max; i++) {
        let pageNum;
        if (totalPages <= 5) pageNum = i + 1;
        else if (currentPage <= 3) pageNum = i + 1;
        else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
        else pageNum = currentPage - 2 + i;
  
        pages.push(pageNum);
      }
  
      return pages;
    };
  
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border disabled:opacity-50 hover:bg-gray-100"
          title="First page"
        >
          <FiChevronsLeft />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md border disabled:opacity-50 hover:bg-gray-100"
          title="Previous page"
        >
          <FiChevronLeft />
        </button>
  
        {generatePages().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`w-10 h-10 rounded-md ${
              currentPage === pageNum
                ? "bg-indigo-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}
  
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border disabled:opacity-50 hover:bg-gray-100"
          title="Next page"
        >
          <FiChevronRight />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md border disabled:opacity-50 hover:bg-gray-100"
          title="Last page"
        >
          <FiChevronsRight />
        </button>
      </div>
    );
  };
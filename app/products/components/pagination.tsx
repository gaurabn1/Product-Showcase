
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-4">
      <button onClick={() => onPageChange(1)} hidden={currentPage === 1} className="px-4 py-2 border rounded mr-2 hover:bg-secondary">
        First
      </button>
      <button onClick={() => onPageChange(currentPage - 1)} hidden={currentPage === 1} className="px-4 py-2 border rounded mr-2 hover:bg-secondary">
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onPageChange(currentPage + 1)} hidden={currentPage === totalPages} className="px-4 py-2 border rounded ml-2 hover:bg-secondary">
        Next
      </button>
      <button onClick={() => onPageChange(totalPages)} hidden={currentPage === totalPages} className="px-4 py-2 border rounded ml-2 hover:bg-secondary">
        Last
      </button>
    </div>
  )
};

export default Pagination;

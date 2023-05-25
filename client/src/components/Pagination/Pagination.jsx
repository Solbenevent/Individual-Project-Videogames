import "../Pagination/Pagination.css";

const Pagination = ({totalItems, currentPage, itemsPerPage, onPageChange }) => {
   const totalPages = Math.ceil(totalItems/itemsPerPage);
   const pageNumbers = Array.from ({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="footer"> 
        {pageNumbers.map((pageNumber) => (
        <button onClick={() => onPageChange(pageNumber)} className="btn-pages">{pageNumber}</button>
    ))}  
    </div>
  )
}

export default Pagination; 
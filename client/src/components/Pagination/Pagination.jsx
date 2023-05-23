const Pagination = ({totalItems, currentPage, itemsPerPage, onPageChange }) => {
   const totalPages = Math.ceil(totalItems/itemsPerPage);
   const pageNumbers = Array.from ({ length: totalPages }, (_, index) => index + 1);

  return (
    <div> 
        {pageNumbers.map((pageNumber) => (
        <button onClick={() => onPageChange(pageNumber)}>{pageNumber}</button>
    ))}  
    </div>
  )
}

export default Pagination; 
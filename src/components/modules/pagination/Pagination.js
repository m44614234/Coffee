import styles from "./pagination.module.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Pagination = ({ products, pageSize, currentPage, onPageChange }) => {
  console.log("products => ", products);
  console.log("pageSize => ", pageSize);
  console.log("currentPage => ", currentPage);
  console.log("onPageChange => ", onPageChange);

  const pageCount = Math.ceil(products.length / pageSize);

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    handlePageChange(currentPage - 1);
  };


  const handlePageClick = (page) => {
    handlePageChange(page);
  };

  const renderPageNumbers = () => {
   if (pageCount) {
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    } else if (currentPage) {
      return  [1, currentPage + 1];
    } 
  };

  return (
    <div className={styles.pagination}>
      <ul>
       
        <li onClick={handlePrevious}>
          <MdChevronRight />
        </li>
        {renderPageNumbers()?.map((pageNumber) => (
          <li
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === currentPage ? styles.active : null}
          >
            {pageNumber}
          </li>
        ))}
        <li onClick={handleNext}>
          <MdChevronLeft />
        </li>
       
      </ul>
    </div>
  );
};

export default Pagination;

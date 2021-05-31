import React, { useState } from "react";
import styles from "./Paginator.module.css";
import cn from "classnames";

const Paginator = ({ pagesSize, totalItemsCount, portionSize = 10, ...props }) => {
  let pagesCount = Math.ceil(totalItemsCount / pagesSize);
  let pages = [];
  for ( let i = 1; i <= pagesCount; i++ ) {
    pages.push(i)
  }
  let portionCount = Math.ceil(pagesCount / portionSize);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}
      {pages
      .filter((page) => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
      .map((page) => {
        return <span className={cn({[styles.selectedPage]: props.currentPage === page})} key={page}
          onClick={(event) => {props.onPageChanged(page)}}>{page}</span>})}
      {portionCount>portionNumber && <button onClick={()=>{setPortionNumber(portionNumber + 1)}}>next</button>}
    </div>
  )

}

export default Paginator;
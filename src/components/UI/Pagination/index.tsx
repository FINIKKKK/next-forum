import React from "react";
import ReactPagination from "react-paginate";

import ss from "./Pagination.module.scss";

interface PaginationProps {
  limit: number;
  total: number;
  page: number;
  setPage: (e: any) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  limit,
  total,
  page,
  setPage,
}) => {
  return (
    <ReactPagination
      className={ss.pagination}
      forcePage={page - 1}
      breakLabel="..."
      onPageChange={(e) => setPage(e.selected + 1)}
      pageRangeDisplayed={limit}
      pageCount={Math.ceil(total / limit)}
      nextLabel={
        <svg width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#next" />
        </svg>
      }
      previousLabel={
        <svg width="20" height="20">
          <use xlinkHref="../img/icons/icons.svg#prev" />
        </svg>
      }
    />
  );
};


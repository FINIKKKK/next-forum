import classNames from "classnames";
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
  const [value, setValue] = React.useState(page);
  const [error, setError] = React.useState(false);

  const onSkipPage = () => {
    if (value > page) {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } else {
      setError(false);
      setPage(value);
    }
  };

  return (
    <div className={ss.pagination}>
      <ReactPagination
        className={ss.list}
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
      <div className={ss.skip}>
        <input
          value={value}
          onChange={(e: any) => setValue(e.target.value)}
          type="text"
          className={classNames({
            [ss.error]: error,
          })}
        />
        <button onClick={onSkipPage}>Go</button>
      </div>
    </div>
  );
};

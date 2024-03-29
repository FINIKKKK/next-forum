import classNames from 'classnames';
import React from 'react';
import ReactPagination from 'react-paginate';

import ss from './Pagination.module.scss';

interface PaginationProps {
  limit: number;
  total: number;
  page: number;
  setPage: (e: any) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  limit,
  total,
  page,
  setPage,
  className
}) => {
  const [value, setValue] = React.useState(page);
  const [error, setError] = React.useState(false);
  const pageCount = Math.ceil(total / limit);

  const onSkipPage = () => {
    if (value > pageCount) {
      setError(true);
      setTimeout(() => setError(false), 5000);
    } else {
      setError(false);
      setPage(value);
    }
  };

  return (
    <div className={`${className} ${ss.pagination}`}>
      <ReactPagination
        className={ss.list}
        forcePage={page - 1}
        breakLabel="..."
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={limit}
        pageCount={pageCount}
        nextLabel={
          <svg className={ss.prev} width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#arrow1" />
          </svg>
        }
        previousLabel={
          <svg className={ss.next} width="20" height="20">
            <use xlinkHref="../img/icons/icons.svg#arrow1" />
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

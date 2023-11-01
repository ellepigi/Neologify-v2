import React from "react";
import ReactPaginate from "react-paginate";

export const Pagination = (props) => {
  if (props.pageCount > 1) {
    return (
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={props.handlePageChange}
        pageRangeDisplayed={5}
        pageCount={props.pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="flex gap-2 items-center float-right"
        pageLinkClassName="block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-200"
        activeClassName="rounded bg-neutral-300"
        nextLinkClassName="block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-200"
        previousLinkClassName="block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-neutral-200"
      />
    );
  }
};

import React from "react";

type PaginationControlsProps = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  onNextPage: () => void;
  onPrevPage: () => void;
};

export const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  hasNextPage,
  hasPrevPage,
  onNextPage,
  onPrevPage,
}) => {
  return (
    <div className="pagination-controls">
      <button onClick={onPrevPage} disabled={!hasPrevPage} className="prev">
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-hb-id="pl-icon"
        >
          <path d="M14.5 19.5c-.13 0-.26-.05-.35-.15l-7-7c-.2-.2-.2-.51 0-.71l7-7c.2-.2.51-.2.71 0s.2.51 0 .71L8.21 12l6.65 6.65c.2.2.2.51 0 .71-.1.1-.23.15-.35.15z"></path>
        </svg>
      </button>
      <div className="current-page">{currentPage}</div>
      <button onClick={onNextPage} disabled={!hasNextPage} className="next">
        <svg
          focusable="false"
          viewBox="0 0 24 24"
          aria-hidden="true"
          data-hb-id="pl-icon"
        >
          <path d="M9.5 4.5c.13 0 .26.05.35.15l7 7c.2.2.2.51 0 .71l-7 7c-.2.2-.51.2-.71 0s-.2-.51 0-.71L15.79 12 9.14 5.35c-.2-.2-.2-.51 0-.71.1-.1.23-.15.35-.15z"></path>
        </svg>
      </button>
    </div>
  );
};

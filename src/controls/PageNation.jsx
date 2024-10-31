import React from "react";

export const PageNation = ({ currentPage, onNext, onPrev }) => {
  return (
    <div className="flex items-center justify-center space-x-4 p-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="border rounded px-4 py-1 text-black transition-all duration-300 hover:bg-slate-100 hover:ring-2 hover:ring-neutral-600"
      >
        前へ
      </button>
      <span>ページ {currentPage}</span>
      <button
        onClick={onNext}
        className="border rounded px-4 py-1 text-black transition-all duration-300 hover:bg-slate-100 hover:ring-2 hover:ring-neutral-600"
      >
        次へ
      </button>
    </div>
  );
};

import React from "react";

function BookDisplay({ book, isFavorite, add, remove }) {
  const { book_id, title, author, pic } = book;

  return (
    <div className="col-lg-3 d-flex flex-column justify-content-between">
      <h5 className="text-center">{title}</h5>
      <h6 className="text-center">{author}</h6>
      <img className="px-2 p-3 col" src={pic} alt={title} />
      {isFavorite && (
        <button onClick={() => remove(book_id)} className="mt-4 mx-auto">
          {" "}
          Remove Favorite
        </button>
      )}
      {!isFavorite && (
        <button onClick={() => add(book)} className="mt-4 mx-auto">
          Add Favorite
        </button>
      )}
    </div>
  );
}
export default BookDisplay;

import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl =
  "https://www.googleapis.com/books/v1/volumes?&key=AIzaSyAZGPfArgpfZZCyXjbtuVicjGLLwd03iPc";

export default function useAxios(url) {
  const [bookData, setBookData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function init() {
      if (url.length === 0) {
        return;
      }
      setBookData(null);
      setError(null);
      try {
        const response = await axios.get(baseUrl + url);
        console.log(response);
        const books = response.data.items.map((val) => ({
          book_id: val.id,
          title: val.volumeInfo.title,
          author: val.volumeInfo.authors,
          pic: val.volumeInfo.imageLinks.thumbnail,
          pageCount: val.volumeInfo.pageCount,
          language: val.volumeInfo.language,
          publisher: val.volumeInfo.publisher,
          description: val.volumeInfo.description,
          previewLink: val.volumeInfo.infoLink,
        }));
        setBookData(books);
      } catch (e) {
        setError("Error");
        console.log(e);
      }
    }
    init();
  }, [url]);
  return { bookData, error };
}

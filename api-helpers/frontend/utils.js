import axios from "axios";
import { getAllBooksData } from "@/pages/API";

export const getAllBooks = async () => {
  const res = await axios.get(getAllBooksData);
  if (res.status !== 200) {
    return new Error("Internal Server Error");
  }
  const data = await res.data?.books;
  return data;
};

export const getFeaturedBooks = async () => {
  const books = await getAllBooks();
  if (books.length == 0) {
    return [];
  }

  const featuredBooks = books.filter((res) => res.featured === true);
  return featuredBooks;
};

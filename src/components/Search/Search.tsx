import { IconButton, Modal, Pagination } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import BookListItem from "../ListItem/MyBookListItem";
import { SearchInput } from "./style";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { BookData, MessageResponse, MyBookData } from "../../models/response";
import { fetchBook } from "../../lib/api/book";
import { AxiosError } from "axios";
import {
  applyMyBook,
  fetchMyBook,
  fetchMyBookByIsbn,
} from "../../lib/api/myBook";
import AddMyBookModal from "../Modal/AddMyBookModal";
import { useCallback } from "react";

const Search = (): JSX.Element => {
  const navigate = useNavigate();

  const [isOpenAddMyBookModal, setIsOpenAddMyBookModal] = useState(false);

  const [isNone, setIsNone] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [myBooks, setMyBooks] = useState<MyBookData[]>([]);
  const [books, setBooks] = useState<{ book: BookData; isMine: boolean }[]>([]);
  const [selectedBookIsbn, setSelectedBookIsbn] = useState("");

  const [pageableCount, setPageableCount] = useState(0);
  const [page, setPage] = useState(1);

  const linkToMain = () => {
    console.log(process.env.REACT_APP_KAKAO_API_KEY);
    navigate("/");
  };

  const toggleIsOpenAddMyBookModal = () =>
    setIsOpenAddMyBookModal(!isOpenAddMyBookModal);

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const onChangePage = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    try {
      const response = await fetchBook(keyword, value);
      setPageableCount(
        ((response.meta.pageable_count / 10) | 0) +
          (response.meta.pageable_count % 10 > 0 ? 1 : 0)
      );
      setBooks(
        response.documents.map((book) => {
          return {
            book,
            isMine: myBooks.map((myBook) => myBook.isbn).includes(book.isbn),
          };
        })
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsNone(false);
      setPageableCount(0);
      setPage(1);
      if (keyword === "") {
        setBooks([]);
        return;
      }

      try {
        const response = await fetchBook(keyword, page);
        if (response.meta.total_count <= 0) {
          setIsNone(true);
        }
        setPageableCount(
          ((response.meta.pageable_count / 10) | 0) +
            (response.meta.pageable_count % 10 > 0 ? 1 : 0)
        );

        setBooks(
          response.documents.map((book) => {
            return {
              book,
              isMine: myBooks.map((myBook) => myBook.isbn).includes(book.isbn),
            };
          })
        );
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          alert((axiosError.response.data as MessageResponse).message);
        }
      }
    }
  };

  const onFetchMyBook = async () => {
    try {
      const response = await fetchMyBook();
      setMyBooks(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  useCallback(() => {
    onFetchMyBook();
  }, [setMyBooks]);

  const bookList = () => {
    return books.map((book) => {
      return (
        <BookListItem
          key={book.book.isbn}
          type="search"
          title={book.book.title}
          author={book.book.authors.join(" ")}
          image={book.book.thumbnail}
          isMine={book.isMine}
          openAddMyBookModel={() => {
            setSelectedBookIsbn(book.book.isbn.split(" ")[0]);
            toggleIsOpenAddMyBookModal();
          }}
        ></BookListItem>
      );
    });
  };

  const onAddBook = async (page: number) => {
    try {
      await applyMyBook({ isbn: selectedBookIsbn, page });
      setBooks(
        books.map((book) => {
          if (book.book.isbn.split(" ")[0] === selectedBookIsbn) {
            return {
              book: book.book,
              isMine: true,
            };
          }
          return book;
        })
      );
      alert("추가되었습니다.");
      toggleIsOpenAddMyBookModal();
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  return (
    <>
      <Header>
        <IconButton onClick={linkToMain}>
          <HomeIcon />
        </IconButton>
        <SearchInput
          value={keyword}
          onChange={onChangeKeyword}
          onKeyDown={onSearch}
        />
      </Header>

      <PageTemplateContents>
        {isNone ? <p>검색결과가 없습니다.</p> : <></>}
        {bookList()}

        {pageableCount > 0 ? (
          <Pagination
            count={pageableCount}
            page={page}
            onChange={onChangePage}
          />
        ) : (
          <></>
        )}
      </PageTemplateContents>

      <Modal open={isOpenAddMyBookModal} onClose={toggleIsOpenAddMyBookModal}>
        <AddMyBookModal addBook={onAddBook} />
      </Modal>
    </>
  );
};

export default Search;

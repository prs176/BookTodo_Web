import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import BookListItem from "../ListItem/MyBookListItem";
import { SearchInput } from "./style";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { BookData, MessageResponse } from "../../models/response";
import { fetchBook } from "../../lib/api/book";
import { AxiosError } from "axios";
import { applyMyBook, fetchMyBookByIsbn } from "../../lib/api/myBook";

const Search = (): JSX.Element => {
  const navigate = useNavigate();

  const [isNone, setIsNone] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState<{ book: BookData; isMine: boolean }[]>([]);

  const linkToMain = () => {
    console.log(process.env.REACT_APP_KAKAO_API_KEY);
    navigate("/");
  };

  const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const onSearch = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsNone(false);
      if (keyword === "") {
        setBooks([]);
        return;
      }
      try {
        const response = await fetchBook(keyword, 1);
        if (response.documents.length <= 0) {
          setIsNone(true);
        }
        Promise.all(
          response.documents.map(async (book) => {
            try {
              const response = await fetchMyBookByIsbn(book.isbn.split(" ")[0]);
              if (response) {
                return { book, isMine: true };
              } else {
                return { book, isMine: false };
              }
            } catch (err) {
              return { book, isMine: false };
            }
          })
        ).then((books) => {
          setBooks(books);
        });
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          alert((axiosError.response.data as MessageResponse).message);
        }
      }
    }
  };

  const bookList = () => {
    const result = [];
    for (let i = 0; i < books.length; i++) {
      result.push(
        <BookListItem
          type="search"
          title={books[i].book.title}
          isbn={books[i].book.isbn.split(" ")[0]}
          author={books[i].book.authors.join(" ")}
          image={books[i].book.thumbnail}
          isMine={books[i].isMine}
          addBook={onAddBook}
        ></BookListItem>
      );
    }
    return result;
  };

  const onAddBook = async (isbn: string) => {
    try {
      await applyMyBook({ isbn });
      setBooks(
        books.map((book) => {
          if (book.book.isbn.split(" ")[0] === isbn) {
            return {
              book: book.book,
              isMine: true,
            };
          }
          return book;
        })
      );
      alert("추가되었습니다.");
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  return (
    <div>
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
      </PageTemplateContents>
    </div>
  );
};

export default Search;

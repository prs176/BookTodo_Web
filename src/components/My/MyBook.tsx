import BookListItem from "../ListItem/MyBookListItem";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { TabTemplate } from "./style";
import ModifyProgressModal from "../Modal/ModifyProgressModal";
import DeleteModal from "../Modal/DeleteModal";
import React from "react";
import {
  BookData,
  MessageResponse,
  MyBookRecordData,
} from "../../models/response";
import { deleteMyBookByIsbn, fetchMyBook } from "../../lib/api/myBook";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { fetchBook } from "../../lib/api/book";
import { applyRecord } from "../../lib/api/record";
import { useNavigate } from "react-router";

const MyBook = (): JSX.Element => {
  const navigate = useNavigate();

  const linkToDetail = (isbn: string) => {
    navigate(`detail/${isbn}`);
  };

  const [filter, setFilter] = useState("0");

  const [isOpenModifyProgressModal, setIsOpenModifyProgressModal] = useState(
    false
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [myBooks, setMyBooks] = useState<
    { record: MyBookRecordData; book: BookData }[]
  >([]);
  const [filteredMyBooks, setFilteredMyBooks] = useState<
    { record: MyBookRecordData; book: BookData }[]
  >([]);
  const [selectedBook, setSelectedBook] = useState<{
    record: MyBookRecordData;
    book: BookData;
  }>();

  const onChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const toggleIsOpenModifyProgressModal = () => {
    setIsOpenModifyProgressModal(!isOpenModifyProgressModal);
  };

  const toggleIsOpenDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const onFetchMyBooks = async () => {
    try {
      const response = await fetchMyBook();

      Promise.all(
        response.map(async (record) => {
          try {
            const response = await fetchBook(record.isbn, 1);
            return { record, book: response.documents[0] };
          } catch (err) {
            const axiosError = err as AxiosError;
            if (
              axiosError.response &&
              (axiosError.response.status === 419 ||
                axiosError.response.status === 401)
            ) {
              alert((axiosError.response.data as MessageResponse).message);
              navigate("/login");
            }
            if (axiosError.response) {
              alert((axiosError.response.data as MessageResponse).message);
            }
            return null;
          }
        })
      ).then((books) => {
        setMyBooks(
          books.filter((book) => book) as {
            record: MyBookRecordData;
            book: BookData;
          }[]
        );
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  useEffect(() => {
    onFetchMyBooks();
  }, [setMyBooks]);

  useEffect(() => {
    if (filter === "1") {
      setFilteredMyBooks(
        myBooks.filter(
          (myBook) =>
            myBook.record.Records.length > 0 &&
            myBook.record.Records.map((record) => record.page).reduce(
              (a, b) => a + b,
              0
            ) < myBook.record.page
        )
      );
    } else if (filter === "2") {
      setFilteredMyBooks(
        myBooks.filter(
          (myBook) =>
            myBook.record.Records.map((record) => record.page).reduce(
              (a, b) => a + b,
              0
            ) === myBook.record.page
        )
      );
    } else if (filter === "3") {
      setFilteredMyBooks(
        myBooks.filter((myBook) => myBook.record.Records.length <= 0)
      );
    }
  }, [filter, myBooks, setFilteredMyBooks]);

  const bookList = () => {
    let books = filteredMyBooks;
    if (filter === "0") {
      books = myBooks;
    }
    return books.map((myBook) => {
      return (
        <BookListItem
          key={myBook.book.isbn}
          type="my"
          title={myBook.book.title}
          author={myBook.book.authors.join(" ")}
          image={myBook.book.thumbnail}
          progress={myBook.record.Records.map((record) => record.page).reduce(
            (a, b) => a + b,
            0
          )}
          goal={myBook.record.page}
          modifyMyBookProgress={() => {
            setSelectedBook(myBook);
            toggleIsOpenModifyProgressModal();
          }}
          deleteMyBook={() => {
            setSelectedBook(myBook);
            toggleIsOpenDeleteModal();
          }}
          linkToDetail={() => {
            linkToDetail(myBook.record.isbn);
          }}
        ></BookListItem>
      );
    });
  };

  const onModifyMyBookProgress = async (page: number) => {
    try {
      if (
        page +
          selectedBook!.record.Records.map((record) => record.page).reduce(
            (a, b) => a + b,
            0
          ) >
        selectedBook!.record.page
      ) {
        alert("읽은 쪽수가 전체 페이지 수를 넘습니다.");
        return;
      }
      const response = await applyRecord({
        isbn: selectedBook!.record.isbn.split(" ")[0],
        page,
      });
      setMyBooks(
        myBooks.map((myBook) => {
          if (myBook.record.isbn === selectedBook!.record.isbn) {
            let isChanged = false;
            const newRecords = myBook.record.Records.map((record) => {
              if (record.id === response.id) {
                isChanged = true;
                return response;
              }
              return record;
            });
            if (!isChanged) {
              newRecords.push(response);
            }
            myBook.record.Records = newRecords;
            return myBook;
          }
          return myBook;
        })
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onDeleteMyBook = async () => {
    try {
      await deleteMyBookByIsbn(selectedBook!.book.isbn.split(" ")[0]);
      setMyBooks(
        myBooks.filter(
          (myBook) => myBook.record.isbn !== selectedBook!.record.isbn
        )
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  return (
    <>
      <TabTemplate>
        <FormControl fullWidth size="small">
          <InputLabel>필터</InputLabel>
          <Select value={filter} onChange={onChangeFilter} label="필터">
            <MenuItem value={"0"}>전체</MenuItem>
            <MenuItem value={"1"}>읽고 있는 책</MenuItem>
            <MenuItem value={"2"}>완료한 책</MenuItem>
            <MenuItem value={"3"}>기다리는 책</MenuItem>
          </Select>
        </FormControl>
      </TabTemplate>

      {bookList()}

      <Modal
        open={isOpenModifyProgressModal}
        onClose={toggleIsOpenModifyProgressModal}
      >
        <ModifyProgressModal
          goal={selectedBook ? selectedBook.record.page : 0}
          modifyMyBookProgress={(page: number) => {
            onModifyMyBookProgress(page);
            toggleIsOpenModifyProgressModal();
          }}
        />
      </Modal>
      <Modal open={isOpenDeleteModal} onClose={toggleIsOpenDeleteModal}>
        <DeleteModal
          deleteMyBook={() => {
            onDeleteMyBook();
            toggleIsOpenDeleteModal();
          }}
          closeDeleteModal={toggleIsOpenDeleteModal}
        />
      </Modal>
    </>
  );
};

export default MyBook;

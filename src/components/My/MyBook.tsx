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
import { fetchMyBook } from "../../lib/api/myBook";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { fetchBook } from "../../lib/api/book";

const MyBook = (): JSX.Element => {
  const [filter, setFilter] = useState("");

  const [isOpenModifyProgressModal, setIsOpenModifyProgressModal] = useState(
    false
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [records, setRecords] = useState<MyBookRecordData[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);

  const onChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
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
      setRecords(response);

      Promise.all(
        response.map(async (record) => {
          try {
            const response = await fetchBook(record.isbn, 1);
            return response.documents[0];
          } catch (err) {
            const axiosError = err as AxiosError;
            if (axiosError.response) {
              alert((axiosError.response.data as MessageResponse).message);
            }
            return null;
          }
        })
      ).then((books) => {
        setBooks(books.filter((book) => book) as BookData[]);
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  useEffect(() => {
    onFetchMyBooks();
  }, [setBooks, setRecords, filter]);

  const bookList = () => {
    return books.map((book) => {
      const record = records.filter(
        (record) => record.isbn === book.isbn.split(" ")[0]
      )[0];
      const page = record.Records.map((record) => record.page).reduce(
        (a, b) => a + b,
        0
      );

      return (
        <BookListItem
          type="my"
          title={book.title}
          author={book.authors.join(" ")}
          image={book.thumbnail}
          progress={page}
          goal={record.page}
          modifyMyBookProgress={toggleIsOpenModifyProgressModal}
          deleteMyBook={toggleIsOpenDeleteModal}
        ></BookListItem>
      );
    });
  };

  return (
    <>
      <TabTemplate>
        <FormControl fullWidth size="small">
          <InputLabel>필터</InputLabel>
          <Select value={filter} onChange={onChangeFilter} label="필터">
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>읽고 있는 책</MenuItem>
            <MenuItem value={2}>완료한 책</MenuItem>
            <MenuItem value={3}>기다리는 책</MenuItem>
          </Select>
        </FormControl>
      </TabTemplate>

      {bookList()}

      <Modal
        open={isOpenModifyProgressModal}
        onClose={toggleIsOpenModifyProgressModal}
      >
        <ModifyProgressModal />
      </Modal>
      <Modal open={isOpenDeleteModal} onClose={toggleIsOpenDeleteModal}>
        <DeleteModal />
      </Modal>
    </>
  );
};

export default MyBook;

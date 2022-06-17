import React, { useMemo, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AxiosError } from "axios";
import { IconButton, Modal } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  applyMyBook,
  deleteMyBookByIsbn,
  fetchMyBookByIsbn,
} from "../../lib/api/myBook";
import { fetchBook } from "../../lib/api/book";
import {
  BookData,
  MessageResponse,
  MyBookRecordData,
} from "../../models/response";
import {
  BodyTemplate,
  ButtonTemplate,
  ContentTemplate,
  PageTemplate,
  TitleTemplate,
} from "./style";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import { LinearProgressWithLabel } from "../My/MyGoal";
import ModifyProgressModal from "../Modal/ModifyProgressModal";
import DeleteModal from "../Modal/DeleteModal";
import AddMyBookModal from "../Modal/AddMyBookModal";
import { applyRecord } from "../../lib/api/record";

const Detail = (): JSX.Element => {
  const navigate = useNavigate();

  const linkToMain = () => {
    navigate("/");
  };

  const linkToSearch = () => {
    navigate("/search");
  };

  const [isOpenModifyProgressModal, setIsOpenModifyProgressModal] = useState(
    false
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenAddMyBookModal, setIsOpenAddMyBookModal] = useState(false);

  const toggleIsOpenModifyProgressModal = () =>
    setIsOpenModifyProgressModal(!isOpenModifyProgressModal);

  const toggleIsOpenDeleteModal = () =>
    setIsOpenDeleteModal(!isOpenDeleteModal);

  const toggleIsOpenAddMyBookModal = () =>
    setIsOpenAddMyBookModal(!isOpenAddMyBookModal);

  const { isbn } = useParams();
  const [book, setBook] = useState<BookData>({
    authors: [],
    contents: "",
    datetime: new Date(),
    isbn: "",
    price: 0,
    publisher: "",
    sale_price: 0,
    status: "",
    thumbnail: "",
    title: "",
    translators: [],
    url: "",
  });
  const [record, setRecord] = useState<MyBookRecordData>();

  const onFetchBook = async () => {
    try {
      const { documents } = await fetchBook(isbn!, 1);
      setBook(documents[0]);

      try {
        const response = await fetchMyBookByIsbn(isbn!);
        setRecord(response);
      } catch (err) {}
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  useEffect(() => {
    onFetchBook();
  }, [setBook]);

  const onAddBook = async (page: number) => {
    try {
      await applyMyBook({ isbn: isbn!, page });

      const response = await fetchMyBookByIsbn(isbn!);
      setRecord(response);

      alert("추가되었습니다.");
      toggleIsOpenAddMyBookModal();
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onModifyMyBookProgress = async (page: number) => {
    try {
      if (
        page +
          record!.Records.map((record) => record.page).reduce(
            (a, b) => a + b,
            0
          ) >
        record!.page
      ) {
        alert("읽은 쪽수가 전체 페이지 수를 넘습니다.");
        return;
      }

      const response = await applyRecord({
        isbn: isbn!,
        page,
      });

      let isChanged = false;
      const newRecords = record!.Records.map((record) => {
        if (record.id === response.id) {
          isChanged = true;
          return response;
        }
        return record;
      });
      if (!isChanged) {
        newRecords.push(response);
      }
      const newRecord = { ...record!, Records: newRecords };
      setRecord(newRecord);

      toggleIsOpenModifyProgressModal();
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onDeleteMyBook = async () => {
    try {
      await deleteMyBookByIsbn(isbn!);
      toggleIsOpenDeleteModal();
      navigate("/search");
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const button = useMemo(() => {
    if (record) {
      return (
        <span>
          <IconButton onClick={toggleIsOpenModifyProgressModal}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={toggleIsOpenDeleteModal}>
            <DeleteIcon />
          </IconButton>
        </span>
      );
    } else {
      return (
        <IconButton onClick={toggleIsOpenAddMyBookModal}>
          <AddIcon />
        </IconButton>
      );
    }
  }, [
    book,
    toggleIsOpenModifyProgressModal,
    toggleIsOpenDeleteModal,
    toggleIsOpenAddMyBookModal,
  ]);

  return (
    <div>
      <Header>
        <IconButton onClick={linkToMain}>
          <HomeIcon />
        </IconButton>

        <IconButton onClick={linkToSearch}>
          <SearchIcon />
        </IconButton>
      </Header>

      <PageTemplate>
        <ButtonTemplate>
          <div />
          {button}
        </ButtonTemplate>

        <ContentTemplate>
          <img alt="" src={book.thumbnail}></img>
          <BodyTemplate>
            <TitleTemplate>
              <h3>{book.title}</h3>
              {record ? "이미추가됨" : ""}
            </TitleTemplate>

            <div>{book.authors.join()}</div>
            <div>{book.contents}</div>

            <div>
              {record ? (
                <LinearProgressWithLabel
                  variant="determinate"
                  progress={record!.Records.map((record) => record.page).reduce(
                    (a, b) => a + b,
                    0
                  )}
                  goal={record!.page}
                  value={
                    (record!.Records.map((record) => record.page).reduce(
                      (a, b) => a + b,
                      0
                    ) /
                      record!.page) *
                    100
                  }
                />
              ) : (
                <></>
              )}
            </div>
          </BodyTemplate>
        </ContentTemplate>
      </PageTemplate>

      <Modal
        open={isOpenModifyProgressModal}
        onClose={toggleIsOpenModifyProgressModal}
      >
        <ModifyProgressModal
          goal={record ? record.page : 0}
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

      <Modal open={isOpenAddMyBookModal} onClose={toggleIsOpenAddMyBookModal}>
        <AddMyBookModal addBook={onAddBook} />
      </Modal>
    </div>
  );
};

export default Detail;

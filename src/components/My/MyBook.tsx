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

const MyBook = (): JSX.Element => {
  const [filter, setFilter] = useState("");
  const onChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  const [isOpenModifyProgressModal, setIsOpenModifyProgressModal] = useState(
    false
  );
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const toggleIsOpenModifyProgressModal = () => {
    setIsOpenModifyProgressModal(!isOpenModifyProgressModal);
  };

  const toggleIsOpenDeleteModal = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
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
      <BookListItem
        type="my"
        title="로미"
        author="로미"
        modifyMyBookProgress={toggleIsOpenModifyProgressModal}
        deleteMyBook={toggleIsOpenDeleteModal}
      ></BookListItem>
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

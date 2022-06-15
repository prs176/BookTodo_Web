import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BookListItemTemplate, TitleTemplate } from "./style";
import { useMemo } from "react";
import React from "react";

interface Props {
  type: "search" | "my";
  title: string;
  author: string;
  image: string;
  isMine?: boolean;
  openAddMyBookModel?: () => void;
  modifyMyBookProgress?: () => void;
  deleteMyBook?: () => void;
}

const BookListItem = ({
  type,
  title,
  author,
  image,
  isMine,
  openAddMyBookModel,
  modifyMyBookProgress,
  deleteMyBook,
}: Props): JSX.Element => {
  const button = useMemo(() => {
    if (type === "search") {
      if (isMine === true) {
        return <p>이미 추가됨</p>;
      } else {
        return (
          <IconButton onClick={openAddMyBookModel}>
            <AddIcon />
          </IconButton>
        );
      }
    } else {
      return (
        <span>
          <IconButton onClick={modifyMyBookProgress}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={deleteMyBook}>
            <DeleteIcon />
          </IconButton>
        </span>
      );
    }
  }, [type, isMine, openAddMyBookModel, modifyMyBookProgress, deleteMyBook]);

  return (
    <BookListItemTemplate>
      <img alt="" src={image}></img>
      <div>
        <TitleTemplate>
          <h3>{title}</h3>
          {button}
        </TitleTemplate>
        {author}
      </div>
    </BookListItemTemplate>
  );
};

export default BookListItem;

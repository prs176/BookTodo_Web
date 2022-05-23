import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BookListItemTemplate, TitleTemplate } from "./style";
import { useMemo } from "react";

interface Props {
  type: "search" | "my";
  title: string;
  author: string;
  isMine?: boolean;
  addBook?: () => void;
  modifyMyBookProgress?: () => void;
  deleteMyBook?: () => void;
}

const BookListItem = ({
  type,
  title,
  author,
  isMine,
  addBook,
  modifyMyBookProgress,
  deleteMyBook,
}: Props): JSX.Element => {
  const button = useMemo(() => {
    if (type === "search") {
      if (isMine === true) {
        return <p>이미 추가됨</p>;
      } else {
        return (
          <IconButton onClick={addBook}>
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
  }, [type, isMine, addBook, modifyMyBookProgress, deleteMyBook]);

  return (
    <BookListItemTemplate>
      <img
        alt=""
        src="https://image.aladin.co.kr/product/7492/10/cover500/k592535780_1.jpg"
      ></img>
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

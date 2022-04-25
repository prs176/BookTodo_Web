import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BookListItemTemplate, TitleTemplate } from "./style";
import { useMemo } from "react";

interface Props {
  type: "search" | "my";
  isMine: boolean;
}

const BookListItem = ({ type, isMine }: Props): JSX.Element => {
  const button = useMemo(() => {
    if (type === "search") {
      if (isMine === true) {
        return <p>이미 추가됨</p>;
      } else {
        return (
          <IconButton>
            <AddIcon />
          </IconButton>
        );
      }
    } else {
      return (
        <span>
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </span>
      );
    }
  }, [type, isMine]);

  return (
    <BookListItemTemplate>
      <img
        alt=""
        src="https://image.aladin.co.kr/product/7492/10/cover500/k592535780_1.jpg"
      ></img>
      <div>
        <TitleTemplate>
          <h3>깨어난 괴물</h3>
          {button}
        </TitleTemplate>
        제임스 S.A. 코리
      </div>
    </BookListItemTemplate>
  );
};

export default BookListItem;

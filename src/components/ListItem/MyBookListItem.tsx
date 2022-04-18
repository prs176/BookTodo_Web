import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { BookListItemTemplate, TitleTemplate } from "./style";

interface Props {
  isMine: boolean;
}

const BookListItem = ({ isMine }: Props): JSX.Element => {
  return (
    <BookListItemTemplate>
      <img
        alt=""
        src="https://image.aladin.co.kr/product/7492/10/cover500/k592535780_1.jpg"
      ></img>
      <div>
        <TitleTemplate>
          <h3>깨어난 괴물</h3>
          {isMine ? (
            <p>이미 추가됨</p>
          ) : (
            <IconButton>
              <AddIcon />
            </IconButton>
          )}
        </TitleTemplate>
        제임스 S.A. 코리
      </div>
    </BookListItemTemplate>
  );
};

export default BookListItem;

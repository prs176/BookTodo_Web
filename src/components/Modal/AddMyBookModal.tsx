import { LabelButton } from "../Common/Button";
import {
  ModalButtonTemplate,
  ModalContentTemplate,
  ModalTemplate,
} from "./style";
import React, { useState } from "react";
import { TextField } from "../Common/Input";

interface Props {
  addBook: (page: number) => void;
}

const AddMyBookModal = ({ addBook }: Props): JSX.Element => {
  const [page, setPage] = useState<number>(0);

  const onChangePage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPage(parseInt(e.target.value));

  return (
    <ModalTemplate>
      책 추가
      <ModalContentTemplate>
        책의 페이지 수
        <div>
          <TextField type="number" value={page} onChange={onChangePage} />
        </div>
      </ModalContentTemplate>
      <ModalButtonTemplate>
        <div></div>
        <LabelButton onClick={() => addBook(page)}>완료</LabelButton>
      </ModalButtonTemplate>
    </ModalTemplate>
  );
};

export default AddMyBookModal;

import { useState } from "react";
import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import React from "react";
import {
  ModalButtonTemplate,
  ModalContentTemplate,
  ModalTemplate,
} from "./style";

const ModifyProgressModal = (): JSX.Element => {
  const [page, setPage] = useState<number>(0);

  return (
    <ModalTemplate>
      진척도 수정
      <ModalContentTemplate>
        지금까지 읽은 쪽 수
        <div>
          <TextField /> / {page}쪽
        </div>
      </ModalContentTemplate>
      <ModalButtonTemplate>
        <div></div>
        <LabelButton>완료</LabelButton>
      </ModalButtonTemplate>
    </ModalTemplate>
  );
};

export default ModifyProgressModal;

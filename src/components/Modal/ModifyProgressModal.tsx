import { useState } from "react";
import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import React from "react";
import {
  ModalButtonTemplate,
  ModalContentTemplate,
  ModalTemplate,
} from "./style";

interface Props {
  goal: number;
  defaultPage: number;
  modifyMyBookProgress: (page: number) => void;
}

const ModifyProgressModal = ({
  goal,
  defaultPage,
  modifyMyBookProgress,
}: Props): JSX.Element => {
  const [page, setPage] = useState<number>(defaultPage);

  const onChangePage = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPage(parseInt(e.target.value));

  return (
    <ModalTemplate>
      진척도 수정
      <ModalContentTemplate>
        지금까지 읽은 쪽 수
        <div>
          <TextField type="number" value={page} onChange={onChangePage} /> /{" "}
          {goal}쪽
        </div>
      </ModalContentTemplate>
      <ModalButtonTemplate>
        <div></div>
        <LabelButton onClick={() => modifyMyBookProgress(page - defaultPage)}>
          완료
        </LabelButton>
      </ModalButtonTemplate>
    </ModalTemplate>
  );
};

export default ModifyProgressModal;

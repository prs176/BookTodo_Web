import { LabelButton } from "../Common/Button";
import { ModalTemplate } from "./style";
import React from "react";

interface Props {
  deleteMyBook: () => void;
  closeDeleteModal: () => void;
}

const DeleteModal = ({
  deleteMyBook,
  closeDeleteModal,
}: Props): JSX.Element => {
  return (
    <ModalTemplate>
      책을 삭제하시겠습니까?
      <div>
        <LabelButton onClick={deleteMyBook}>예</LabelButton>
        <LabelButton color="default" onClick={closeDeleteModal}>
          아니오
        </LabelButton>
      </div>
    </ModalTemplate>
  );
};

export default DeleteModal;

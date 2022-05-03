import { LabelButton } from "../Common/Button";
import { ModalButtonTemplate, ModalTemplate } from "./style";

const DeleteModal = (): JSX.Element => {
  return (
    <ModalTemplate>
      책을 삭제하시겠습니까?
      <ModalButtonTemplate>
        <LabelButton>예</LabelButton>
        <LabelButton color="default">아니오</LabelButton>
      </ModalButtonTemplate>
    </ModalTemplate>
  );
};

export default DeleteModal;

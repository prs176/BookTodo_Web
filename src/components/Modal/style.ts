import styled from "styled-components";

export const ModalTemplate = styled.div`
  padding: 25px;
  background-color: white;
  border-radius: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  button {
    width: 200px;
  }
`;

export const ModalContentTemplate = styled.div`
  margin-left: auto;
  margin-right: auto;
`;

export const ModalButtonTemplate = styled.div`
  display: flex;
  justify-content: space-between;
`;

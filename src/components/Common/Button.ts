import styled from "styled-components";

export const LabelButton = styled.button`
  padding: 16px;
  color: ${(props) => (props.color === "default" ? "#9D9D9D" : "white")};
  background-color: ${(props) =>
    props.color === "default" ? "white" : "#ffd46c"};
  border: none;
  cursor: pointer;
`;

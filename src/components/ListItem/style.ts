import styled from "styled-components";

export const BookListItemTemplate = styled.div`
  background-color: #f2f5f8;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-shrink: 0;
  margin-bottom: 10px;
  img {
    width: 120px;
    height: 120px;
    object-fit: cover;
    margin-right: 20px;
  }
  h3 {
    margin: 0px;
  }
  div {
    width: 100%;
  }
`;

export const TitleTemplate = styled.div`
  display: flex;
  justify-content: space-between;
  height: 20px;
  button {
    height: 40px;
  }
  p {
    height: 40px;
  }
`;

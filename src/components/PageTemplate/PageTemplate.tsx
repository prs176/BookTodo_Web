import styled from "styled-components";

export const PageTemplateContents = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const InputPageTemplateContents = styled(PageTemplateContents)`
  input {
    margin-bottom: 10px;
    width: 400px;
  }
  .submit_button {
    margin-top: 90px;
    margin-bottom: 30px;
    width: 435px;
  }
`;

export const Header = styled.div`
  width: 100%;
  height: 180px;
  margin-bottom: 30px;
  background-color: #ffd46c;
  justify-content: center;
  & > * {
    display: block;
    margin: 10px auto;
  }
`;

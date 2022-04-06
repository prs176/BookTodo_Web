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
  button {
    margin-top: 90px;
    margin-bottom: 30px;
    width: 435px;
  }
`;

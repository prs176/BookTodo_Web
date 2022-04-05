import styled from "styled-components";
import { PageTemplateContents } from "../PageTemplate/PageTemplate";

export const Template = styled(PageTemplateContents)`
  input {
    margin-bottom: 10px;
    width: 400px;
  }
  button {
    margin-top: 100px;
    width: 435px;
  }
`;

export const TitleTemplate = styled.div`
  img {
    width: 100px;
  }
  display: flex;
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const Title = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  * {
    margin: 0px;
  }
`;

export const RegisterText = styled.div`
  display: flex;
  color: gray;
  & > * {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

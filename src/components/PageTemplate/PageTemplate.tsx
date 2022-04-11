import { ReactNode } from "react";
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

const Header = styled.div`
  background-color: #ffd46c;
  width: 100%;
  height: 180px;
  margin-bottom: 40px;
`;

interface PageTemplateProps {
  children: ReactNode;
}

export const PageTemplate = ({ children }: PageTemplateProps): JSX.Element => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

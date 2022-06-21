import styled from "styled-components";

export const TitleTemplate = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
  h3 {
    margin: 0px;
    margin-right: 10px;
  }
  p {
    margin: 0px;
  }
`;

export const ButtonTemplate = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px;
`;

export const ContentTemplate = styled.div`
  display: flex;
`;

export const BodyTemplate = styled.div`
  margin-left: 15px;
  & > * {
    margin-bottom: 10px;
  }
`;

export const TextTemplate = styled.div`
  display: flex;
`;

export const PageTemplate = styled.div`
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

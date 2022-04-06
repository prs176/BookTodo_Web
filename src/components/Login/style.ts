import styled from "styled-components";

export const LogoTemplate = styled.div`
  img {
    width: 100px;
  }
  display: flex;
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const TitleTemplate = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
  * {
    margin: 0px;
  }
`;

export const RegisterTextTemplate = styled.div`
  display: flex;
  color: gray;
  & > * {
    margin-top: 10px;
    margin-left: 10px;
  }
`;

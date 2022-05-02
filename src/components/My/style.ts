import styled from "styled-components";

export const TabTemplate = styled.div`
  margin-left: 0px;
  min-width: 300px;
  margin-bottom: 20px;
`;

export const CalendarTemplate = styled.div`
  width: 100%;
  & > * {
    margin-bottom: 20px;
  }
`;

export const MyGoalTemplate = styled.div`
  padding: 20px;
  background-color: #f2f5f8;
  & > * {
    margin-top: 10px;
  }
  .right {
    display: flex;
    justify-content: space-between;
  }
`;

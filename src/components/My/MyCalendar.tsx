import { IconButton, Modal } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import MyGoal from "./MyGoal";
import { CalendarTemplate, RightTemplate } from "./style";
import { useState } from "react";
import ModifyGoalModal from "../Modal/ModifyGoalModal";
import React from "react";

const MyCalendar = (): JSX.Element => {
  const [isOpenModifyGoalModal, setIsOpenModifyGoalModal] = useState(false);

  const toggleIsOpenModifyGoalModal = () => {
    setIsOpenModifyGoalModal(!isOpenModifyGoalModal);
  };
  return (
    <CalendarTemplate>
      <RightTemplate>
        <span />
        <IconButton onClick={toggleIsOpenModifyGoalModal}>
          <SettingsIcon />
        </IconButton>
      </RightTemplate>
      <MyGoal progress={25} goal={30} />
      <Calendar height="100px" view="month" isReadOnly />

      <Modal open={isOpenModifyGoalModal} onClose={toggleIsOpenModifyGoalModal}>
        <ModifyGoalModal />
      </Modal>
    </CalendarTemplate>
  );
};

export default MyCalendar;

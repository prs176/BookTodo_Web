import { IconButton, Modal } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import MyGoal from "./MyGoal";
import { CalendarTemplate, RightTemplate } from "./style";
import { useEffect, useState } from "react";
import ModifyGoalModal from "../Modal/ModifyGoalModal";
import React from "react";
import { fetchGoal, modifyGoal } from "../../lib/api/user";
import { AxiosError } from "axios";
import { MessageResponse, RecordData } from "../../models/response";
import { applyPlan, fetchPlan } from "../../lib/api/plan";
import { fetchRecord } from "../../lib/api/record";

const MyCalendar = (): JSX.Element => {
  const [isOpenModifyGoalModal, setIsOpenModifyGoalModal] = useState(false);
  const [plan, setPlan] = useState<number[]>([]);
  const [goal, setGoal] = useState(0);
  const [records, setRecords] = useState<RecordData[]>([]);

  const toggleIsOpenModifyGoalModal = () => {
    setIsOpenModifyGoalModal(!isOpenModifyGoalModal);
  };

  const onModifyGoal = async (goal: number) => {
    try {
      const response = await modifyGoal(goal);
      setGoal(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onModifyPlan = async (plan: number[]) => {
    try {
      const response = await applyPlan({ days: plan });
      setPlan(response.map((plan) => plan.day));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onFetchRecords = async () => {
    try {
      const response = await fetchRecord(6);

      setRecords(
        response.filter(
          (record) =>
            parseInt(record.date.toString().substring(0, 4)) ===
              new Date().getFullYear() &&
            parseInt(record.date.toString().substring(5, 7)) ===
              new Date().getMonth() + 1 &&
            parseInt(record.date.toString().substring(8, 10)) ===
              new Date().getDate()
        )
      );
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onFetchGoal = async () => {
    try {
      const response = await fetchGoal();
      setGoal(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onFecthPlan = async () => {
    try {
      const response = await fetchPlan();
      setPlan(response.map((plan) => plan.day));
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  useEffect(() => {
    onFetchRecords();
    onFetchGoal();
    onFecthPlan();
  }, [setRecords, setGoal, setPlan]);

  return (
    <CalendarTemplate>
      <RightTemplate>
        <span />
        <IconButton onClick={toggleIsOpenModifyGoalModal}>
          <SettingsIcon />
        </IconButton>
      </RightTemplate>
      <MyGoal
        progress={records
          .map((record) => record.page)
          .reduce((a, b) => a + b, 0)}
        goal={goal}
        isPlanedDay={plan.includes(new Date().getDay())}
      />
      <Calendar height="100px" view="month" isReadOnly />

      <Modal open={isOpenModifyGoalModal} onClose={toggleIsOpenModifyGoalModal}>
        <ModifyGoalModal
          defaultPlan={plan}
          defaultGoal={goal}
          modifyPlan={onModifyPlan}
          modifyGoal={(goal: number) => {
            onModifyGoal(goal);
            toggleIsOpenModifyGoalModal();
          }}
        />
      </Modal>
    </CalendarTemplate>
  );
};

export default MyCalendar;

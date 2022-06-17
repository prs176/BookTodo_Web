import { IconButton, Modal } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import MyGoal from "./MyGoal";
import { CalendarTemplate, RightTemplate } from "./style";
import { LegacyRef, useEffect, useState } from "react";
import ModifyGoalModal from "../Modal/ModifyGoalModal";
import React from "react";
import { fetchGoal, modifyGoal } from "../../lib/api/user";
import { AxiosError } from "axios";
import {
  BookData,
  MessageResponse,
  MyBookData,
  RecordData,
} from "../../models/response";
import { applyPlan, fetchPlan } from "../../lib/api/plan";
import { fetchRecord } from "../../lib/api/record";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useMemo } from "react";
import { fetchMyBook } from "../../lib/api/myBook";
import { fetchBook } from "../../lib/api/book";
import { useNavigate } from "react-router";

const MyCalendar = (): JSX.Element => {
  const navigate = useNavigate();

  const [isOpenModifyGoalModal, setIsOpenModifyGoalModal] = useState(false);
  const [plan, setPlan] = useState<number[]>([]);
  const [goal, setGoal] = useState(0);
  const [records, setRecords] = useState<RecordData[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);
  const [date, setDate] = useState(new Date());
  const calendarRef: LegacyRef<Calendar> = React.createRef();

  const toggleIsOpenModifyGoalModal = () => {
    setIsOpenModifyGoalModal(!isOpenModifyGoalModal);
  };

  const onModifyGoal = async (goal: number) => {
    try {
      const response = await modifyGoal(goal);
      setGoal(response);
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
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
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onFetchRecords = async () => {
    try {
      const response = await fetchRecord(6);
      setRecords(response);

      Promise.all(
        response
          .filter((record, idx) => response.indexOf(record) === idx)
          .map(async (record) => {
            try {
              const response = await fetchBook(record.isbn, 1);
              return response.documents[0];
            } catch (err) {
              const axiosError = err as AxiosError;
              if (axiosError.response) {
                alert((axiosError.response.data as MessageResponse).message);
              }
              return null;
            }
          })
      ).then((books) => {
        setBooks(books.filter((book) => book) as BookData[]);
      });
    } catch (err) {
      const axiosError = err as AxiosError;
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
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
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
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
      if (
        axiosError.response &&
        (axiosError.response.status === 419 ||
          axiosError.response.status === 401)
      ) {
        alert((axiosError.response.data as MessageResponse).message);
        navigate("/login");
      }
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onNextCalendar = () => {
    const calendarInstance = calendarRef.current!.getInstance();

    calendarInstance.next();

    setDate(new Date(date.setMonth(date.getMonth() + 1)));
  };

  const onPrevCalendar = () => {
    const calendarInstance = calendarRef.current!.getInstance();

    calendarInstance.prev();

    setDate(new Date(date.setMonth(date.getMonth() - 1)));
  };

  const scheduleList = useMemo(() => {
    return records.map((record, idx) => {
      return {
        id: `${idx}`,
        calendarId: "0",
        title: `${
          books.filter(
            (book) => book.isbn.split(" ")[0] === record.isbn.toString()
          ).length > 0
            ? books.filter(
                (book) => book.isbn.split(" ")[0] === record.isbn.toString()
              )[0].title
            : "?"
        } - ${record.page} 페이지`,
        category: "allday",
        start: record.date,
        end: record.date,
      };
    });
  }, [records, books]);

  useEffect(() => {
    onFetchRecords();
    onFetchGoal();
    onFecthPlan();
  }, [setRecords, setGoal, setPlan, setBooks]);

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
          .filter(
            (record) =>
              parseInt(record.date.toString().substring(0, 4)) ===
                new Date().getFullYear() &&
              parseInt(record.date.toString().substring(5, 7)) ===
                new Date().getMonth() + 1 &&
              parseInt(record.date.toString().substring(8, 10)) ===
                new Date().getDate()
          )
          .map((record) => record.page)
          .reduce((a, b) => a + b, 0)}
        goal={goal}
        isPlanedDay={plan.includes(new Date().getDay())}
      />

      <IconButton onClick={onPrevCalendar}>
        <ArrowBackIosNewIcon />
      </IconButton>
      <IconButton onClick={onNextCalendar}>
        <ArrowForwardIosIcon />
      </IconButton>
      {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}

      <Calendar
        height="700px"
        calendars={[
          {
            id: "0",
            name: "",
            bgColor: "#9e5fff",
            borderColor: "#9e5fff",
          },
        ]}
        isReadOnly
        useDetailPopup
        month={{
          startDayOfWeek: 0,
        }}
        schedules={scheduleList}
        view="month"
        ref={calendarRef}
        scheduleView
        taskView
      />

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

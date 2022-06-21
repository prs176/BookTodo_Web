import React from "react";
import { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { applyPlan } from "../../lib/api/plan";
import { join, login } from "../../lib/api/user";
import { MessageResponse } from "../../models/response";
import Register1 from "./Register1";
import Register2 from "./Register2";

const Register = (): JSX.Element => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const [nick, setNick] = useState("");
  const [birth, setBirth] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [goal, setGoal] = useState(0);
  const [days, setDays] = useState<number[]>([]);

  const onChangeNick = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNick(e.target.value);

  const onChangeBirth = (e: React.ChangeEvent<HTMLInputElement>) =>
    setBirth(e.target.value);

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

  const onNext = () => {
    if (
      nick === "" ||
      birth === "" ||
      id === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      alert("재입력한 비밀번호가 일치하지 않습니다.");
      return;
    }

    setPage(2);
  };

  const onChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGoal(parseInt(e.target.value));

  const onChangeDays = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => setDays(value);

  const onComplete = async () => {
    if (goal <= 0 || days.length <= 0) {
      alert("모든 정보를 입력해주세요.");
      return;
    }
    try {
      await join({ nick, birthday: birth, email: id, password, goal });
      const token = await login({ email: id, password });
      await applyPlan({ days }, token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const onPrev = () => {
    setPage(1);
  };

  return (
    <div>
      {page === 1 ? (
        <Register1
          nick={nick}
          birth={birth}
          id={id}
          password={password}
          confirmPassword={confirmPassword}
          onChangeNick={onChangeNick}
          onChangeBirth={onChangeBirth}
          onChangeId={onChangeId}
          onChangePassword={onChangePassword}
          onChangeConfirmPassword={onChangeConfirmPassword}
          onNext={onNext}
        />
      ) : (
        <Register2
          goal={goal}
          onChangeGoal={onChangeGoal}
          days={days}
          onChangeDays={onChangeDays}
          onComplete={onComplete}
          onPrev={onPrev}
        />
      )}
    </div>
  );
};

export default Register;

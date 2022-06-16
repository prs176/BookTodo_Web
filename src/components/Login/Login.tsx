import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import logo from "../../assets/logo.svg";
import { LogoTemplate, TitleTemplate, RegisterTextTemplate } from "./style";
import { InputPageTemplateContents } from "../PageTemplate/PageTemplate";
import React, { useState } from "react";
import { login } from "../../lib/api/user/index";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";
import { MessageResponse } from "../../models/response";

const Login = (): JSX.Element => {
  const navigate = useNavigate();

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) =>
    setId(e.target.value);

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onLogin = async () => {
    if (id === "" || password === "") {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
    try {
      await login({ email: id, password });
      navigate("/");
      window.location.reload();
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        alert((axiosError.response.data as MessageResponse).message);
      }
    }
  };

  const linkToRegister = () => {
    navigate("/register");
  };

  return (
    <InputPageTemplateContents>
      <LogoTemplate>
        <img src={logo} alt=""></img>
        <TitleTemplate>
          <p>독서를 실행하다,</p>
          <h2>북투두</h2>
        </TitleTemplate>
      </LogoTemplate>

      <TextField
        placeholder="아이디"
        type="email"
        value={id}
        onChange={onChangeId}
      />
      <TextField
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={onChangePassword}
      />
      <LabelButton className="submit_button" onClick={onLogin}>
        로그인
      </LabelButton>
      <RegisterTextTemplate>
        <p>계정이 없으신가요?</p>
        <h3 onClick={linkToRegister}>회원가입</h3>
      </RegisterTextTemplate>
    </InputPageTemplateContents>
  );
};

export default Login;

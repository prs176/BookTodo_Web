import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import logo from "../../assets/logo.svg";
import { LogoTemplate, TitleTemplate, RegisterTextTemplate } from "./style";
import { InputPageTemplateContents } from "../PageTemplate/PageTemplate";
import React from "react";

const Login = (): JSX.Element => {
  return (
    <InputPageTemplateContents>
      <LogoTemplate>
        <img src={logo} alt=""></img>
        <TitleTemplate>
          <p>독서를 실행하다,</p>
          <h2>북투두</h2>
        </TitleTemplate>
      </LogoTemplate>

      <TextField placeholder="아이디" type="email" />
      <TextField placeholder="비밀번호" type="password" />
      <LabelButton className="submit_button">로그인</LabelButton>
      <RegisterTextTemplate>
        <p>계정이 없으신가요?</p>
        <h3>회원가입</h3>
      </RegisterTextTemplate>
    </InputPageTemplateContents>
  );
};

export default Login;

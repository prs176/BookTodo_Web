import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import logo from "../../assets/logo.svg";
import { Template, TitleTemplate, Title, RegisterText } from "./style";

const Login = (): JSX.Element => {
  return (
    <Template>
      <TitleTemplate>
        <img src={logo} alt=""></img>
        <Title>
          <p>독서를 실행하다,</p>
          <h2>북투두</h2>
        </Title>
      </TitleTemplate>

      <TextField placeholder="아이디" type="email"></TextField>
      <TextField placeholder="비밀번호" type="password"></TextField>
      <LabelButton>로그인</LabelButton>
      <RegisterText>
        <p>계정이 없으신가요?</p>
        <h3>회원가입</h3>
      </RegisterText>
    </Template>
  );
};

export default Login;

import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import { InputPageTemplateContents } from "../PageTemplate/PageTemplate";

const Register1 = (): JSX.Element => {
  return (
    <InputPageTemplateContents>
      <div>
        <p>닉네임</p>
        <TextField placeholder="5~10자" type="email" />
      </div>
      <div>
        <p>생년월일</p>
        <TextField type="date"></TextField>
      </div>
      <div>
        <p>아이디</p>
        <TextField placeholder="영문자 숫자, 6~15자" type="email" />
      </div>
      <div>
        <p>비밀번호</p>
        <TextField placeholder="영문자 숫자, 8~15자" type="password" />
      </div>
      <div>
        <p>비밀번호 재입력</p>
        <TextField placeholder="비밀번호 재입력" type="password" />
      </div>
      <LabelButton className="submit_button">다음</LabelButton>
    </InputPageTemplateContents>
  );
};

export default Register1;

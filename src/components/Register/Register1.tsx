import React from "react";
import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import {
  Header,
  InputPageTemplateContents,
} from "../PageTemplate/PageTemplate";

interface Props {
  nick: string;
  birth: string;
  id: string;
  password: string;
  confirmPassword: string;
  onChangeNick: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBirth: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeId: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

const Register1 = ({
  nick,
  birth,
  id,
  password,
  confirmPassword,
  onChangeNick,
  onChangeBirth,
  onChangeId,
  onChangePassword,
  onChangeConfirmPassword,
  onNext,
}: Props): JSX.Element => {
  return (
    <div>
      <Header />

      <InputPageTemplateContents>
        <div>
          <p>닉네임</p>
          <TextField
            placeholder="5~10자"
            type="email"
            value={nick}
            onChange={onChangeNick}
          />
        </div>
        <div>
          <p>생년월일</p>
          <TextField
            type="date"
            value={birth}
            onChange={onChangeBirth}
          ></TextField>
        </div>
        <div>
          <p>아이디</p>
          <TextField
            placeholder="영문자 숫자, 6~15자"
            type="email"
            value={id}
            onChange={onChangeId}
          />
        </div>
        <div>
          <p>비밀번호</p>
          <TextField
            placeholder="영문자 숫자, 8~15자"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div>
          <p>비밀번호 재입력</p>
          <TextField
            placeholder="비밀번호 재입력"
            type="password"
            value={confirmPassword}
            onChange={onChangeConfirmPassword}
          />
        </div>
        <LabelButton className="submit_button" onClick={onNext}>
          다음
        </LabelButton>
      </InputPageTemplateContents>
    </div>
  );
};

export default Register1;

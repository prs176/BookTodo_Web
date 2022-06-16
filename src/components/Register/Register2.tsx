import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import {
  Header,
  InputPageTemplateContents,
} from "../PageTemplate/PageTemplate";
import React from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";

interface Props {
  goal: number;
  days: number[];
  onChangeGoal: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDays: (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => void;
  onComplete: () => void;
  onPrev: () => void;
}

const Register2 = ({
  goal,
  days,
  onChangeGoal,
  onChangeDays,
  onComplete,
  onPrev,
}: Props): JSX.Element => {
  return (
    <div>
      <Header />

      <InputPageTemplateContents>
        <div>
          <IconButton onClick={onPrev}>
            <ArrowBackIosNewIcon />
          </IconButton>
        </div>

        <div>
          <p>책 읽을 요일</p>
          <ToggleButtonGroup value={days} onChange={onChangeDays}>
            <ToggleButton value={1}>월</ToggleButton>
            <ToggleButton value={2}>화</ToggleButton>
            <ToggleButton value={3}>수</ToggleButton>
            <ToggleButton value={4}>목</ToggleButton>
            <ToggleButton value={5}>금</ToggleButton>
            <ToggleButton value={6}>토</ToggleButton>
            <ToggleButton value={7}>일</ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <p>쪽수</p>
          <TextField
            placeholder="숫자"
            type="number"
            value={goal}
            onChange={onChangeGoal}
          />
        </div>
        <LabelButton className="submit_button" onClick={onComplete}>
          회원가입
        </LabelButton>
      </InputPageTemplateContents>
    </div>
  );
};

export default Register2;

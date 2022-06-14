import { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import React from "react";
import {
  ModalButtonTemplate,
  ModalContentTemplate,
  ModalTemplate,
} from "./style";

const ModifyGoalModal = (): JSX.Element => {
  return (
    <ModalTemplate>
      목표 수정
      <div>
        <p>책 읽을 요일</p>
        <ToggleButtonGroup fullWidth={true}>
          <ToggleButton value="월">월</ToggleButton>
          <ToggleButton value="화">화</ToggleButton>
          <ToggleButton value="수">수</ToggleButton>
          <ToggleButton value="목">목</ToggleButton>
          <ToggleButton value="금">금</ToggleButton>
          <ToggleButton value="토">토</ToggleButton>
          <ToggleButton value="일">일</ToggleButton>
        </ToggleButtonGroup>

        <p>쪽수</p>
        <TextField placeholder="숫자" type="number" />
      </div>
      <ModalButtonTemplate>
        <div></div>
        <LabelButton>완료</LabelButton>
      </ModalButtonTemplate>
    </ModalTemplate>
  );
};

export default ModifyGoalModal;

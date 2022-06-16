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

interface Props {
  defaultPlan: number[];
  defaultGoal: number;
  modifyPlan: (plan: number[]) => void;
  modifyGoal: (goal: number) => void;
}

const ModifyGoalModal = ({
  defaultPlan,
  defaultGoal,
  modifyPlan,
  modifyGoal,
}: Props): JSX.Element => {
  const [plan, setPlan] = useState<number[]>(defaultPlan);
  const [goal, setGoal] = useState<number>(defaultGoal);

  const onChangeGoal = (e: React.ChangeEvent<HTMLInputElement>) =>
    setGoal(parseInt(e.target.value));

  const onChangePlan = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    value: any
  ) => setPlan(value);

  return (
    <ModalTemplate>
      목표 수정
      <div>
        <p>책 읽을 요일</p>
        <ToggleButtonGroup
          fullWidth={true}
          value={plan}
          onChange={onChangePlan}
        >
          <ToggleButton value={1}>월</ToggleButton>
          <ToggleButton value={2}>화</ToggleButton>
          <ToggleButton value={3}>수</ToggleButton>
          <ToggleButton value={4}>목</ToggleButton>
          <ToggleButton value={5}>금</ToggleButton>
          <ToggleButton value={6}>토</ToggleButton>
          <ToggleButton value={7}>일</ToggleButton>
        </ToggleButtonGroup>

        <p>쪽수</p>
        <TextField
          placeholder="숫자"
          type="number"
          value={goal}
          onChange={onChangeGoal}
        />
      </div>
      <ModalButtonTemplate>
        <div></div>
        <LabelButton
          onClick={() => {
            modifyPlan(plan);
            modifyGoal(goal);
          }}
        >
          완료
        </LabelButton>
      </ModalButtonTemplate>
    </ModalTemplate>
  );
};

export default ModifyGoalModal;

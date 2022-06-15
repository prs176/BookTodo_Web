import {
  Box,
  LinearProgress,
  LinearProgressProps,
  Typography,
} from "@mui/material";
import { MyGoalTemplate, RightTemplate } from "./style";
import React from "react";

interface Props {
  progress: number;
  goal: number;
}

export const LinearProgressWithLabel = (
  props: LinearProgressProps & { progress: number; goal: number }
) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 60 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${props.progress}/${props.goal}쪽`}</Typography>
      </Box>
    </Box>
  );
};

const MyGoal = ({ progress, goal }: Props): JSX.Element => {
  return (
    <MyGoalTemplate>
      오늘의 목표
      <LinearProgressWithLabel
        variant="determinate"
        progress={progress}
        goal={goal}
        value={(progress / goal) * 100}
      />
      <RightTemplate>
        <div></div>
        {goal - progress}쪽 남았어요!
      </RightTemplate>
    </MyGoalTemplate>
  );
};

export default MyGoal;

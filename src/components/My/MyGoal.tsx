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
  isPlanedDay: boolean;
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

const MyGoal = ({ progress, goal, isPlanedDay }: Props): JSX.Element => {
  return (
    <MyGoalTemplate>
      {isPlanedDay ? (
        <>
          오늘의 목표
          <LinearProgressWithLabel
            variant="determinate"
            progress={progress}
            goal={goal}
            value={goal > progress ? (progress / goal) * 100 : 100}
          />
          <RightTemplate>
            <div></div>
            {goal > progress
              ? `${goal - progress}쪽 남았어요!`
              : "도전을 달성했어요!🎉"}
          </RightTemplate>
        </>
      ) : (
        <>오늘은 목표가 설정되어 있지 않아요.</>
      )}
    </MyGoalTemplate>
  );
};

export default MyGoal;

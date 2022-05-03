import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import MyGoal from "./MyGoal";
import { CalendarTemplate, RightTemplate } from "./style";

const MyCalendar = (): JSX.Element => {
  return (
    <CalendarTemplate>
      <RightTemplate>
        <span />
        <IconButton>
          <SettingsIcon />
        </IconButton>
      </RightTemplate>
      <MyGoal progress={25} goal={30} />
      <Calendar height="100px" view="month" isReadOnly />
    </CalendarTemplate>
  );
};

export default MyCalendar;

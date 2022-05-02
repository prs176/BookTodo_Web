import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import MyGoal from "./MyGoal";
import { CalendarTemplate } from "./style";

const MyCalendar = (): JSX.Element => {
  return (
    <CalendarTemplate>
      <MyGoal progress={25} goal={30} />
      <Calendar height="100px" view="month" disableClick disableDblClick />
    </CalendarTemplate>
  );
};

export default MyCalendar;

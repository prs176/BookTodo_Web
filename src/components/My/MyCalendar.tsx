import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { CalendarTemplate } from "./style";

const MyCalendar = (): JSX.Element => {
  return (
    <CalendarTemplate>
      <Calendar height="100px" view="month" disableClick disableDblClick />
    </CalendarTemplate>
  );
};

export default MyCalendar;

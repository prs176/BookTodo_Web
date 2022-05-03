import { useState } from "react";
import { IconButton, Tab, Tabs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import MyBook from "./MyBook";
import MyCalendar from "./MyCalendar";
import { TabTemplate } from "./style";

const My = (): JSX.Element => {
  const [tab, setTab] = useState(0);

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <div>
      <Header>
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <IconButton>
          <ExitToAppIcon />
        </IconButton>
      </Header>
      <PageTemplateContents>
        <TabTemplate>
          <Tabs value={tab} onChange={onChangeTab}>
            <Tab icon={<BookIcon />} />
            <Tab icon={<CalendarMonthIcon />} />
          </Tabs>
        </TabTemplate>

        {tab === 0 ? <MyBook /> : <MyCalendar />}
      </PageTemplateContents>
    </div>
  );
};

export default My;

import { useState } from "react";
import { IconButton, Tab, Tabs } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import BookIcon from "@mui/icons-material/Book";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import MyBook from "./MyBook";
import MyCalendar from "./MyCalendar";
import { TabTemplate } from "./style";
import { useNavigate } from "react-router";
import React from "react";
import { removeCookie } from "../../lib/Cookie";

const My = (): JSX.Element => {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const onChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const linkToSearch = () => {
    navigate("/search");
  };

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  }; // cookie

  return (
    <div>
      <Header>
        <IconButton onClick={linkToSearch}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={logout}>
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

import BookListItem from "../ListItem/MyBookListItem";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { TabTemplate } from "./style";

const MyBook = (): JSX.Element => {
  const [filter, setFilter] = useState("");

  const onChangeFilter = (event: SelectChangeEvent) => {
    setFilter(event.target.value as string);
  };

  return (
    <>
      <TabTemplate>
        <FormControl fullWidth size="small">
          <InputLabel>필터</InputLabel>
          <Select value={filter} onChange={onChangeFilter} label="필터">
            <MenuItem value={0}>전체</MenuItem>
            <MenuItem value={1}>읽고 있는 책</MenuItem>
            <MenuItem value={2}>완료한 책</MenuItem>
            <MenuItem value={3}>기다리는 책</MenuItem>
          </Select>
        </FormControl>
      </TabTemplate>
      <BookListItem type="my" isMine={false}></BookListItem>
    </>
  );
};

export default MyBook;

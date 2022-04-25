import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import BookListItem from "../ListItem/MyBookListItem";
import { SearchInput } from "./style";

const Serach = (): JSX.Element => {
  return (
    <div>
      <Header>
        <IconButton>
          <HomeIcon />
        </IconButton>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <SearchInput />
      </Header>
      <PageTemplateContents>
        <BookListItem type="search" isMine={false}></BookListItem>
      </PageTemplateContents>
    </div>
  );
};

export default Serach;

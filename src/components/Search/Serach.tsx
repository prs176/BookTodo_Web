import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import { Header, PageTemplateContents } from "../PageTemplate/PageTemplate";
import BookListItem from "../ListItem/MyBookListItem";
import { SearchInput } from "./style";
import { useNavigate } from "react-router";

const Serach = (): JSX.Element => {
  const navigate = useNavigate();

  const linkToMain = () => {
    navigate("/");
  };

  const linkToSearch = () => {
    navigate("/search");
  };

  return (
    <div>
      <Header>
        <IconButton onClick={linkToMain}>
          <HomeIcon />
        </IconButton>
        <IconButton onClick={linkToSearch}>
          <SearchIcon />
        </IconButton>
        <SearchInput />
      </Header>
      <PageTemplateContents>
        <BookListItem
          type="search"
          title="로미"
          author="로미"
          isMine={false}
        ></BookListItem>
      </PageTemplateContents>
    </div>
  );
};

export default Serach;

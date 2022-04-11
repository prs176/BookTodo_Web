import { LabelButton } from "../Common/Button";
import { TextField } from "../Common/Input";
import { InputPageTemplateContents } from "../PageTemplate/PageTemplate";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Register2 = (): JSX.Element => {
  return (
    <InputPageTemplateContents>
      <div>
        <p>책 읽을 요일</p>
        <ToggleButtonGroup>
          <ToggleButton value="월">월</ToggleButton>
          <ToggleButton value="화">화</ToggleButton>
          <ToggleButton value="수">수</ToggleButton>
          <ToggleButton value="목">목</ToggleButton>
          <ToggleButton value="금">금</ToggleButton>
          <ToggleButton value="토">토</ToggleButton>
          <ToggleButton value="일">일</ToggleButton>
        </ToggleButtonGroup>
      </div>
      <div>
        <p>쪽수</p>
        <TextField placeholder="숫자" type="number" />
      </div>
      <LabelButton className="submit_button">회원가입</LabelButton>
    </InputPageTemplateContents>
  );
};

export default Register2;

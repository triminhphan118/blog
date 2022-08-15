import { IconEyeClose, IconEyeOpen } from "components/icon";
import { useState } from "react";
import Input from "./Input";

function InputPasswordToggle({ control, ...props }) {
  const [togglePassword, setTogglePassword] = useState(false);
  if (!control) return;
  return (
    <Input
      type={togglePassword ? "text" : "password"}
      id="password"
      name="password"
      className="input"
      placeholder="Enter your password"
      control={control}
      {...props}
    >
      {!togglePassword ? (
        <IconEyeOpen
          className="input-icon"
          onClick={() => setTogglePassword(true)}
        ></IconEyeOpen>
      ) : (
        <IconEyeClose
          className="input-icon"
          onClick={() => setTogglePassword(false)}
        ></IconEyeClose>
      )}
    </Input>
  );
}

export default InputPasswordToggle;

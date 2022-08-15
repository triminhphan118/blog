import styled from "styled-components";
import { useController } from "react-hook-form";

const InputStyles = styled.div`
  width: 100%;
  position: relative;
  input {
    padding: ${(props) => (props.hasIcon ? "20px 60px 20px 20px" : "20px")};
    width: 100%;
    border: 1px solid transparent;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-size: 16px;
    color: #000;
    font-weight: 400px;
    color: ${(props) => props.theme.gray};
    transition: all 0.2s linear;
    &:disabled {
      background-color: ${(props) => props.theme.grayDark};
    }
  }
  .input:focus {
    border-color: ${(props) => props.theme.primary};
    background-color: #fff;
    color: #000;
  }

  input::-webkit-input-placeholder {
    color: gray;
    font-size: 16px;
  }
  input::-moz-input-placeholder {
    color: gray;
    font-size: 16px;
  }

  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

function Input({
  className,
  children,
  type = "text",
  name = "",
  id = "",
  hasIcon = false,
  control,
  ...props
}) {
  const { field } = useController({ control, name, defaultValue: "" });
  return (
    <InputStyles hasIcon={children ? true : false}>
      <input
        type={type}
        name={name}
        id={id || name}
        className={`${className}`}
        {...field}
        {...props}
      />
      {children ? children : null}
    </InputStyles>
  );
}

export default Input;

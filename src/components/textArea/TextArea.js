import styled from "styled-components";
import { useController } from "react-hook-form";

const TextAreaStyles = styled.div`
  width: 100%;
  position: relative;
  textarea {
    padding: 20px;
    width: 100%;
    border: 1px solid transparent;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    font-size: 16px;
    color: #000;
    font-weight: 400px;
    color: ${(props) => props.theme.gray};
    transition: all 0.2s linear;
    resize: none;
    min-height: 200px;
    &:disabled {
      background-color: ${(props) => props.theme.grayDark};
    }
  }
  textarea:focus {
    border-color: ${(props) => props.theme.primary};
    background-color: #fff;
    color: #000;
  }

  textarea::-webkit-textarea-placeholder {
    color: gray;
    font-size: 16px;
  }
  textarea::-moz-textarea-placeholder {
    color: gray;
    font-size: 16px;
  }
`;

function TextArea({
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
    <TextAreaStyles hasIcon={children ? true : false}>
      <textarea
        spellCheck={false}
        type={type}
        name={name}
        id={id || name}
        className={`${className}`}
        {...field}
        {...props}
      />
      {children ? children : null}
    </TextAreaStyles>
  );
}

export default TextArea;

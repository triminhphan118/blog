import styled from "styled-components";

const LabelStyles = styled.label`
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
`;
function Label({ htmlFor = "", children, ...props }) {
  return (
    <LabelStyles htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyles>
  );
}
export default Label;

import styled from "styled-components";

const FeildStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 10px;
  }
`;
function Field({ className, children }) {
  return <FeildStyles className={className}>{children}</FeildStyles>;
}

export default Field;

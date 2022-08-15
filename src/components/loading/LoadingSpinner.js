import styled from "styled-components";

const LoadingSpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderWidth} solid;
  border-radius: 50%;
  border-color: #fff;
  border-top-color: transparent;
  border-bottom-color: transparent;
  animation: spinner 0.75s linear infinite;

  @keyframes spinner {
    from {
      transform: rotate(360deg);
    }
  }
`;
function LoadingSpinner({ size = "40px", borderWidth = "5px" }) {
  return (
    <LoadingSpinnerStyles
      size={size}
      borderWidth={borderWidth}
    ></LoadingSpinnerStyles>
  );
}

export default LoadingSpinner;

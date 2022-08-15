import { LoadingSpinner } from "components/loading";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  padding: 0 20px;
  height: ${(props) => (props.height ? props.height : "66px")};
  cursor: pointer;
  ${(props) =>
    props.kind === "primary" &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
      color: #fff;
    `}
  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: #fff;
    `}
  ${(props) =>
    props.kind === "green" &&
    css`
      color: #84cc16;
      background-color: #f0fdf4;
    `}
  ${(props) =>
    props.kind === "blue" &&
    css`
      color: #3b82f6;
      background-color: #eff6ff;
    `}
  ${(props) =>
    props.kind === "amber" &&
    css`
      color: #f59e0b;
      background-color: #fffbeb;
    `}
  ${(props) =>
    props.kind === "gray" &&
    css`
      color: #6b7280;
      background-color: #f9fafb;
    `}
  ${(props) =>
    props.kind === "teal" &&
    css`
      color: #14b8a6;
      background-color: #f0fdfa;
    `}
  display: flex;
  align-items: center;
  justify-content: center;
  /* width: 100%; */
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &:hover {
    opacity: 0.85;
    transition: opacity 0.25s;
  }
`;
/**
 *
 * @requires
 * @param string type type button 'submit' | 'button'
 * @returns
 */

function Button({
  children,
  type = "button",
  onClick = () => {},
  isLoading,
  kind = "primary",
  to,
  ...props
}) {
  const child = isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles type={type} onClick={onClick} kind={kind} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} onClick={onClick} kind={kind} {...props}>
      {child}
    </ButtonStyles>
  );
}

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit"]),
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default Button;

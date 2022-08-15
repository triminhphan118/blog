import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostCategoryStyles = styled.div`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  color: #6b6b6b;

  ${(props) =>
    props.type === "primary" &&
    css`
      background-color: #f3edff;
    `}
  ${(props) =>
    props.type === "secondary" &&
    css`
      background-color: white;
    `}

    ${(props) =>
    props.type === "green" &&
    css`
      color: #84cc16;
      background-color: #f0fdf4;
    `}
  ${(props) =>
    props.type === "blue" &&
    css`
      color: #3b82f6;
      background-color: #eff6ff;
    `}
  ${(props) =>
    props.type === "amber" &&
    css`
      color: #f59e0b;
      background-color: #fffbeb;
    `}
  ${(props) =>
    props.type === "gray" &&
    css`
      color: #6b7280;
      background-color: #f9fafb;
    `}
  ${(props) =>
    props.type === "teal" &&
    css`
      color: #14b8a6;
      background-color: #f0fdfa;
    `}
  a {
    display: block;
  }
`;
function PostCategory({
  className = "",
  children,
  type = "primary",
  to = "/",
}) {
  return (
    <PostCategoryStyles className={`post-category ${className}`} type={type}>
      <NavLink to={to}>{children}</NavLink>
    </PostCategoryStyles>
  );
}
export default PostCategory;

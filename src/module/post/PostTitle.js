import { Link, NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  display: block;
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `}
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `}
`;
function PostTitle({ className = "", children, to = "/", size = "normal" }) {
  return (
    <PostTitleStyles className={`post-title ${className}`} size={size}>
      <Link to={to}>{children}</Link>
    </PostTitleStyles>
  );
}

export default PostTitle;

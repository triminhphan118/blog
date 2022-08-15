import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostMetaStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 600;
  color: inherit;
  margin-top: auto;
  .post-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background-color: currentColor;
    border-radius: 100rem;
  }
`;
function PostMeta({
  date = "Mar 13",
  author = "Andiiez Le",
  className = "",
  to = "",
}) {
  return (
    <PostMetaStyles className={`post-meta ${className}`}>
      <span className="post-time">{date}</span>
      <span className="post-dot"></span>
      <NavLink to={`/user${to}`}>
        <span className="post-author">{author}</span>
      </NavLink>
    </PostMetaStyles>
  );
}

export default PostMeta;

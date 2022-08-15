import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PostImageStyles = styled.div`
  a {
    display: block;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
  }
`;
function PostImage({ url = "", alt = "", className = "", to = "" }) {
  return (
    <PostImageStyles className={`post-image ${className}`}>
      <NavLink to={to}>
        <img src={url} alt={alt} />
      </NavLink>
    </PostImageStyles>
  );
}

export default PostImage;

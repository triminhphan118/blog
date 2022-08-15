import { async } from "@firebase/util";
import { db } from "firebase-app/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import useGetDataWithId from "hooks/useGetDataWithId";
import { useEffect, useState } from "react";
import slugify from "slugify";
import styled from "styled-components";

const PostAuthorStyles = styled.div`
  margin-top: 40px;
  display: flex;
  /* border-radius: 20px; */
  border-radius: 50%;
  background-color: ${(props) => props.theme.grayF3};
  .author-image {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    border-radius: 50%;
    border-radius: inherit;
  }
  .author-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: inherit;
  }
  .author-content {
    flex: 1;
    padding: 20px;
  }
  .author-name {
    font-weight: bold;
    margin-bottom: 16x;
    font-size: 20px;
  }
  .author-desc {
    font-size: 14px;
    line-height: 2;
    text-align: justify;
  }
`;
function PostAuthor({ userID, className = "", ...props }) {
  const { data: user } = useGetDataWithId(userID, "users");
  if (!userID) return;
  return (
    <PostAuthorStyles className={`${className}`} {...props}>
      <div className="author-image">
        <img src={user.avatar || ""} alt={user.fullname} />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user.fullname || ""}</h3>
        <p className="author-desc">{user.decs || ""}</p>
      </div>
    </PostAuthorStyles>
  );
}

export default PostAuthor;

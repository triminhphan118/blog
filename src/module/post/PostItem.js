import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      color: #6b6b6b;
      margin-top: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      margin-bottom: 8px;
    }
  }
`;

const PostItem = ({ data }) => {
  const { data: category } = useGetDataWithId(data?.category?.id, "categories");
  const { data: user } = useGetDataWithId(data?.user?.id, "users");
  if (!data?.id) return;
  return (
    <PostItemStyles>
      <PostImage
        url={data.image || ""}
        alt={data.title || ""}
        to={`/${data?.slug}`}
      ></PostImage>
      <PostCategory>{category.name}</PostCategory>
      <PostTitle to={`/${data?.slug}`}>{data.title}</PostTitle>
      <PostMeta
        author={user?.fullname}
        to={`/${user?.username}`}
        date={new Date(data?.createdAt.seconds * 1000).toLocaleDateString(
          "vi-Vi"
        )}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;

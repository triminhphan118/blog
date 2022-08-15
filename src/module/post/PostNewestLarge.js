import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
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
      margin-left: auto;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const PostNewestLarge = ({ post }) => {
  const { data: category } = useGetDataWithId(post?.category?.id, "categories");
  const { data: user } = useGetDataWithId(post?.user?.id, "users");

  if (!post?.id) return;
  return (
    <PostNewestLargeStyles>
      <PostImage
        url={post.image || ""}
        alt={post.title || ""}
        to={`/${post?.slug}`}
      ></PostImage>
      <PostCategory type="secondary">{category.name}</PostCategory>
      <PostTitle to={`/${post?.slug}`}>{post.title}</PostTitle>
      <PostMeta
        author={user?.fullname}
        to={`/${user?.username}`}
        date={new Date(post?.createdAt.seconds * 1000).toLocaleDateString(
          "vi-Vi"
        )}
      ></PostMeta>
    </PostNewestLargeStyles>
  );
};

export default PostNewestLarge;

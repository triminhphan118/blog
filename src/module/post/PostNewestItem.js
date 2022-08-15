import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestItemStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 28px;
  padding-bottom: 28px;
  border-bottom: 1px solid #ccc;
  &:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
    border-bottom: 0;
  }
  .post {
    &-image {
      display: block;
      flex-shrink: 0;
      width: 180px;
      height: 130px;
      border-radius: 12px;
    }
    &-category {
      margin-bottom: 8px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
      color: #6b6b6b;
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
const PostNewestItem = ({ post }) => {
  const { data: category } = useGetDataWithId(post?.category?.id, "categories");
  const { data: user } = useGetDataWithId(post?.user?.id, "users");
  if (!post?.id) return;
  return (
    <PostNewestItemStyles>
      <PostImage
        url={post.image || ""}
        alt={post.title || ""}
        to={`/${post?.slug}`}
      ></PostImage>
      <div className="post-content">
        <PostCategory>{category.name}</PostCategory>
        <PostTitle to={`/${post?.slug}`}>{post.title}</PostTitle>
        <PostMeta
          author={user?.fullname}
          to={`/${user?.username}`}
          date={new Date(post?.createdAt.seconds * 1000).toLocaleDateString(
            "vi-Vi"
          )}
        ></PostMeta>
      </div>
    </PostNewestItemStyles>
  );
};

export default PostNewestItem;

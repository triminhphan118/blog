import { async } from "@firebase/util";
import { db } from "firebase-app/firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import useGetDataWithId from "hooks/useGetDataWithId";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 169px;
  box-shadow: 0 0 2px 0 rgba(163, 163, 163, 0.622265);
  .post {
    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;
const PostFeatureItem = (props) => {
  const {
    id,
    image,
    slug,
    title,
    createdAt,
    user,
    category: cata,
  } = props.data;
  const { data: category } = useGetDataWithId(cata.id, "categories");
  const fromSecoundsToDate = (secounds) => {
    const date = new Date(secounds * 1000);
    return date.toLocaleDateString("vi-VI");
  };
  if (!id) return;
  return (
    <PostFeatureItemStyles>
      <PostImage url={image || ""} to={`/blog/${category?.slug}`}></PostImage>
      <div className="post-overlay"></div>
      <div className="post-content">
        <div className="post-top">
          <PostCategory to={`/blog/${category.slug}`}>
            {category.name || ""}
          </PostCategory>
          <PostMeta
            date={fromSecoundsToDate(createdAt?.seconds)}
            author={user.fullname}
            to={`/${user.username}`}
          ></PostMeta>
        </div>
        <PostTitle to={`/${slug}`} size="big">
          {title || ""}
        </PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;

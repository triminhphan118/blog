import Heading from "components/layouts/Heading";
import MainLayout from "components/layouts/MainLayout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styled from "styled-components";
import PostAuthor from "components/author/PostAuthor";
import PostRelated from "module/post/PostRelated";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
`;

const PostDetailsPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  useEffect(() => {
    const queries = query(
      collection(db, "posts"),
      where("slug", "==", params.slug)
    );
    onSnapshot(queries, (snapshot) => {
      const dataArray = [];
      snapshot.forEach((item) => {
        dataArray.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPost(...dataArray);
    });
  }, [params.slug]);
  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [params]);
  if (!post?.id) return;
  return (
    <PostDetailsPageStyles>
      <MainLayout>
        <div className="container">
          <div className="post-header">
            <PostImage url={post.image} className="post-feature"></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">
                {post?.category?.name || ""}
              </PostCategory>
              <h1 className="post-heading">{post.title || ""}</h1>
              <PostMeta
                author={post.user?.fullname || ""}
                date={new Date(
                  post.createdAt?.seconds * 1000
                ).toLocaleDateString("vi-VI")}
              ></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">{parse(post.content || "")}</div>
            <PostAuthor userID={post.user.id}></PostAuthor>
          </div>
          <PostRelated categoryId={post?.category.id}></PostRelated>
        </div>
      </MainLayout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;

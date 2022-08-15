import Heading from "components/layouts/Heading";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import PostItem from "module/post/PostItem";
import PostNewestItem from "module/post/PostNewestItem";
import PostNewestLarge from "module/post/PostNewestLarge";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const HomeNewestStyles = styled.div`
  .layout {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 40px;
    margin-bottom: 64px;
    align-items: start;
  }
  .sidebar {
    padding: 0 20px 20px;
    background-color: #f3edff;
    border-radius: 16px;
  }
`;

const HomeNewest = () => {
  const [postsLasted, setPostLasted] = useState([]);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(
      colRef,
      where("status", "==", 1),
      where("hot", "==", 0),
      limit(4)
    );
    onSnapshot(queries, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPostLasted(array);
    });
  }, []);
  useEffect(() => {
    const colRef = collection(db, "posts");
    const queries = query(colRef, where("status", "==", 1));
    onSnapshot(queries, (snapshot) => {
      const array = [];
      snapshot.forEach((item) => {
        array.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPosts(array);
    });
  }, []);
  if (!postsLasted && postsLasted.length < 0) return;
  return (
    <HomeNewestStyles className="home-block">
      <div className="container">
        <Heading>Mới nhất</Heading>
        <div className="layout">
          <PostNewestLarge post={postsLasted[0]}></PostNewestLarge>
          <div className="sidebar">
            {postsLasted &&
              postsLasted.length > 0 &&
              postsLasted.map((item, index) => {
                if (index === 0) return null;
                return (
                  <PostNewestItem key={item.id} post={item}></PostNewestItem>
                );
              })}
          </div>
        </div>
        <div className="grid-layout grid-layout--primary">
          {posts &&
            posts.length > 0 &&
            posts.map((item) => <PostItem data={item}></PostItem>)}
        </div>
      </div>
    </HomeNewestStyles>
  );
};

export default HomeNewest;

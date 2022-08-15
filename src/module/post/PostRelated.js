import { async } from "@firebase/util";
import Heading from "components/layouts/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import PostItem from "./PostItem";

function PostRelated({ categoryId }) {
  const [postRealated, setPostRealated] = useState([]);
  useEffect(() => {
    async function getPostRelated() {
      try {
        const queries = query(
          collection(db, "posts"),
          where("category.id", "==", categoryId)
        );
        onSnapshot(queries, (snapShot) => {
          const dataArray = [];
          snapShot.forEach((item) => {
            dataArray.push({
              id: item.id,
              ...item.data(),
            });
          });
          setPostRealated(dataArray);
        });
      } catch (error) {
        console.log(error);
      }
    }
    getPostRelated();
  }, [categoryId]);
  if (!categoryId) return;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {postRealated &&
          postRealated.length > 0 &&
          postRealated.map((item) => {
            return <PostItem data={item} key={item.id}></PostItem>;
          })}
      </div>
    </div>
  );
}
export default PostRelated;

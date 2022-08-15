import Heading from "components/layouts/Heading";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostItem from "./PostItem";

function BlogItem() {
  const [posts, setPosts] = useState([]);
  const params = useParams("");
  useEffect(() => {
    function getPosts() {
      try {
        const colRef = collection(db, "posts");
        const newRef = !params?.slug
          ? colRef
          : query(colRef, where("category.slug", "==", params.slug));
        onSnapshot(newRef, (snapShot) => {
          const dataArray = [];
          snapShot.forEach((item) => {
            dataArray.push({
              id: item.id,
              ...item.data(),
            });
          });
          setPosts(dataArray);
        });
      } catch (error) {}
    }
    getPosts();
  }, [params?.slug]);
  if (!posts?.length > 0) return;
  return (
    <div className="post-related mt-10">
      <div className="layout_grid">
        <div className="grid-layout grid-layout--secondary">
          {posts &&
            posts.length > 0 &&
            posts.map((item) => {
              return <PostItem data={item} key={item.id}></PostItem>;
            })}
        </div>
      </div>
    </div>
  );
}
export default BlogItem;

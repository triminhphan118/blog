import MainLayout from "components/layouts/MainLayout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "module/post/PostItem";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogPageUser() {
  const [posts, setPosts] = useState([]);
  const params = useParams();
  const [user, setIdUSer] = useState();
  useEffect(() => {
    if (!user?.id) return;
    function getPosts() {
      try {
        const colRef = collection(db, "posts");
        const newRef = query(colRef, where("user.id", "==", user?.id));
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
  }, [user?.id]);
  useEffect(() => {
    function getUserId() {
      try {
        const colRef = collection(db, "users");
        const newRef = query(colRef, where("username", "==", params.slug));
        onSnapshot(newRef, (snapShot) => {
          const dataArray = [];
          snapShot.forEach((item) => {
            dataArray.push({
              id: item.id,
              ...item.data(),
            });
          });
          setIdUSer(...dataArray);
        });
      } catch (error) {}
    }
    getUserId();
  }, [params.slug]);
  console.log(params.slug);
  const loading = posts.length > 0 ? false : true;
  return (
    <MainLayout>
      <div className="container">
        {loading ? (
          <div className="loading-line"></div>
        ) : (
          <div className="mt-10">
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
        )}
      </div>
    </MainLayout>
  );
}
export default BlogPageUser;

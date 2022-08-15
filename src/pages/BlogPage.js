import MainLayout from "components/layouts/MainLayout";
import { db } from "firebase-app/firebase-config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostCategory from "module/post/PostCategory";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { status } from "utils/constants";

function BlogPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    function getCategories() {
      try {
        const queries = query(
          collection(db, "categories"),
          where("status", "==", status.Approved)
        );
        onSnapshot(queries, (snapShot) => {
          const dataArray = [];
          snapShot.forEach((item) => {
            dataArray.push({
              id: item.id,
              ...item.data(),
            });
          });
          setCategories(dataArray);
        });
      } catch (error) {}
    }
    getCategories();
  }, []);

  const loading = categories.length > 0 ? false : true;
  return (
    <MainLayout>
      <div className="container">
        {loading ? (
          <div className="loading-line"></div>
        ) : (
          <div>
            <div className="flex gap-4">
              {categories.length > 0 &&
                categories.map((item) => (
                  <PostCategory
                    to={`/blog/${item.slug}`}
                    key={item.id}
                    type="green"
                  >
                    {item.name}{" "}
                  </PostCategory>
                ))}
            </div>
          </div>
        )}
        {<Outlet></Outlet>}
      </div>
    </MainLayout>
  );
}
export default BlogPage;

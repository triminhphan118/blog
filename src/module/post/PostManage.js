import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { status, statusPost } from "utils/constants";

const POST_PER_PAGE = 10;
const PostManage = () => {
  const [posts, setPosts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [lastItem, setLastItem] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const colRef = collection(db, "posts");
    const newRef = keyword
      ? query(
          colRef,
          where("title", ">=", keyword),
          where("title", "<=", keyword + "utf8"),
          limit(POST_PER_PAGE)
        )
      : query(colRef, limit(POST_PER_PAGE));
    onSnapshot(colRef, (snapshot) => {
      setTotal(snapshot.size);
    });
    onSnapshot(newRef, (snapshot) => {
      let dataArray = [];
      setLastItem(snapshot.docs[snapshot.docs.length - 1]);
      snapshot.forEach((item) => {
        dataArray.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPosts(dataArray);
    });
  }, [keyword]);
  const handleSearch = debounce((e) => {
    setKeyword(e.target.value);
  }, 500);
  const handleDeltePost = (item) => {
    if (!item?.id) return;

    async function deletePost() {
      try {
        const docRef = doc(db, "posts", item.id);
        await deleteDoc(docRef);
        toast.success("Delete post successfully");
      } catch (error) {
        toast.error(error);
      }
    }
    deletePost();
  };
  const renderStatus = (status) => {
    switch (+status) {
      case statusPost.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case statusPost.PENDING:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case statusPost.REJECT:
        return <LabelStatus type="danger">Reject</LabelStatus>;
      default:
        break;
    }
  };

  const renderHot = (hot) => {
    switch (+hot) {
      case status.Approved:
        return <LabelStatus type="success">Hot</LabelStatus>;
      default:
        break;
    }
  };
  function checkPost() {
    return total > POST_PER_PAGE && posts.length < total;
  }
  const handleLoadmore = () => {
    async function getLoadmore() {
      const next = query(
        collection(db, "posts"),
        startAfter(lastItem || 0),
        limit(POST_PER_PAGE)
      );
      onSnapshot(next, (snapshot) => {
        let response = [];
        snapshot.forEach((item) => {
          response.push({
            id: item.id,
            ...item.data(),
          });
        });
        setPosts((prev) => [...prev, ...response]);
      });

      const documentSnapshots = await getDocs(next);
      setLastItem(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    }

    getLoadmore();
  };
  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearch}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts &&
            posts.length > 0 &&
            posts.map((item) => {
              return (
                <tr key={item.id}>
                  <td title={item.title}>{item.id.slice(0, 5) + "..."}</td>
                  <td>
                    <div className="flex items-center gap-x-3">
                      <img
                        src={item.image}
                        alt=""
                        className="w-[66px] h-[55px] rounded object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.title}</h3>
                        <time className="text-sm text-gray-500">
                          Date:{" "}
                          {new Date(
                            item.createdAt.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </time>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-500">{item.category.name}</span>
                  </td>
                  <td>
                    <span className="text-gray-500">{item.user.fullname}</span>
                  </td>
                  <td>
                    <div className="flex flex-col gap-y-2">
                      {renderStatus(item.status)}
                      {renderHot(item.hot)}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-x-3 text-gray-500">
                      <ActionView
                        onClick={() => navigate(`/${item.slug}`)}
                      ></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-post?id=${item.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeltePost(item)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <div className="flex justify-center">
        {total !== 0 ? (
          checkPost() ? (
            <div className="flex justify-center mt-2">
              <Button
                kind="amber"
                style={{ height: 50 }}
                onClick={handleLoadmore}
              >
                Load more
              </Button>
            </div>
          ) : (
            <div className="flex justify-center">
              <p className=" p-2 bg-amber-50 text-amber-500 rounded-lg">
                Dữ liêu hết rồi!
              </p>
            </div>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostManage;

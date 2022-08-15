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
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { status } from "utils/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const CATEGORY_PER_PAGE = 1;
const CategoryManage = () => {
  const [keyword, setkeyword] = useState("");
  const [categories, setCategories] = useState([]);
  const [lastItem, setLastItem] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const colRef = collection(db, "categories");
    const newRef = keyword
      ? query(
          colRef,
          where("name", ">=", keyword),
          where("name", "<=", keyword + "utf8")
        )
      : query(colRef, limit(CATEGORY_PER_PAGE));
    onSnapshot(colRef, (snapshot) => {
      setTotal(snapshot.size);
    });
    onSnapshot(newRef, (snapshot) => {
      let data = [];
      setLastItem(snapshot.docs[snapshot.docs.length - 1]);
      snapshot.forEach((item) => {
        data.push({
          id: item.id,
          ...item.data(),
        });
      });
      setCategories(data);
    });
  }, [keyword]);

  const handleDeleteItem = (id) => {
    if (!id) return;
    async function deleteCategory() {
      try {
        const document = doc(db, "categories", id);
        await deleteDoc(document);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      } catch (error) {
        toast.error(error);
      }
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCategory();
      }
    });
  };
  const handleInputSearch = debounce((e) => setkeyword(e.target.value), 500);
  const handleLoadmore = () => {
    async function getLoadmore() {
      const next = query(
        collection(db, "categories"),
        orderBy("name"),
        startAfter(lastItem),
        limit(CATEGORY_PER_PAGE)
      );
      onSnapshot(next, (snapshot) => {
        let response = [];
        snapshot.forEach((item) => {
          response.push({
            id: item.id,
            ...item.data(),
          });
        });
        setCategories((prev) => [...prev, ...response]);
      });

      const documentSnapshots = await getDocs(next);
      setLastItem(documentSnapshots.docs[documentSnapshots.docs.length - 1]);
    }

    getLoadmore();
  };

  function checkCategories() {
    return total > CATEGORY_PER_PAGE && categories.length < total;
  }
  return (
    <div>
      <div className="flex justify-between">
        <DashboardHeading
          title="Categories"
          desc="Manage your category"
        ></DashboardHeading>
        <Button
          to="/manage/add-category"
          kind="teal"
          style={{ height: "50px" }}
        >
          Add Category
        </Button>
      </div>
      <div className="my-2 text-right">
        <input
          type="text"
          className="py-3 px-5  border border-gray-300 rounded-md"
          placeholder="Search name category"
          // value={keyword}
          onChange={handleInputSearch}
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {categories &&
            categories.length > 0 &&
            categories.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>
                    <span className="italic text-gray-400">{item.slug}</span>
                  </td>
                  <td>
                    {item.status === status.Approved && (
                      <LabelStatus type="success"> Approved</LabelStatus>
                    )}
                    {item.status === status.UnApproved && (
                      <LabelStatus type="delete"> UnApproved</LabelStatus>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-x-2">
                      <ActionView></ActionView>
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-category?id=${item.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteItem(item.id)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {total !== 0 ? (
        checkCategories() ? (
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
      {/* {categories && categories.length <= 0 && (
        <p className="text-center p-2 bg-amber-50 text-amber-500 rounded-md">
          Dữ liệu không có
        </p>
      )} */}
    </div>
  );
};

export default CategoryManage;

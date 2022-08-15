import { async } from "@firebase/util";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import LabelStatus from "components/label/LabelStatus";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import { deleteUser, getAuth } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import DashboardHeading from "module/dashboard/DashboardHeading";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { roleUser, statusUser } from "utils/constants";

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [keyword, setkeyword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    async function getUsers() {
      const colRef = collection(db, "users");
      const newRef = keyword
        ? query(
            colRef,
            where("fullname", ">=", keyword),
            where("fullname", "<=", keyword + "utf8")
          )
        : query(colRef);
      onSnapshot(newRef, (snapshot) => {
        let dataUsers = [];
        snapshot.forEach((item) => {
          dataUsers.push({
            id: item.id,
            ...item.data(),
          });
        });
        setUsers(dataUsers);
      });
    }
    getUsers();
  }, [keyword]);
  const renderStatusUser = (status) => {
    switch (status) {
      case statusUser.Active:
        return <LabelStatus type="success">Active</LabelStatus>;
      case statusUser.Pending:
        return <LabelStatus type="warning">Pending</LabelStatus>;
      case statusUser.Ban:
        return <LabelStatus type="danger">Ban</LabelStatus>;

      default:
        break;
    }
  };
  const renderRoleUser = (role) => {
    switch (role) {
      case roleUser.Admin:
        return "Admin";
      case roleUser.Mod:
        return "Moderator";
      case roleUser.User:
        return "User";
      default:
        break;
    }
  };

  const handleDeleteUser = (user) => {
    if (!user?.id) return;
    async function handleDelete() {
      try {
        // await deleteUser(user);
        await deleteDoc(doc(db, "users", user.id));
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
        handleDelete();
      }
    });
  };
  const handleInputSearch = debounce((e) => setkeyword(e.target.value), 500);

  return (
    <div>
      <div className="flex justify-between">
        <DashboardHeading
          title="Users"
          desc="Manage your user"
        ></DashboardHeading>
        <Button to="/manage/add-user" kind="teal" style={{ height: "50px" }}>
          Add user
        </Button>
      </div>
      <div className="my-2 text-right">
        <input
          type="text"
          className="py-3 px-5  border border-gray-300 rounded-md"
          placeholder="Search name user"
          // value={keyword}
          onChange={handleInputSearch}
        />
      </div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Info</th>
            <th>Email</th>
            <th>Username</th>
            <th>Status</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.length > 0 &&
            users.map((item) => {
              return (
                <tr key={item.id}>
                  <td title={item.id}>{item.id.slice(0, 5) + "..."}</td>
                  <td>
                    <div className="flex items-start gap-x-2">
                      <img
                        src={item?.avatar}
                        alt={item.fullname}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                      <div className="flex flex-col gap-2">
                        <span>{item.fullname}</span>
                        <span className="text-gray-400 text-sm">
                          {new Date(
                            item.createdAt.seconds * 1000
                          ).toLocaleDateString("vi-VI")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td title={item.email}>{item.email.slice(0, 5) + "..."}</td>
                  <td>{item.username}</td>
                  <td>{renderStatusUser(item.status)}</td>
                  <td>{renderRoleUser(item.role)}</td>
                  <td>
                    <div className="flex items-center gap-x-2">
                      <ActionEdit
                        onClick={() =>
                          navigate(`/manage/update-user?id=${item.id}`)
                        }
                      ></ActionEdit>
                      <ActionDelete
                        onClick={() => handleDeleteUser(item)}
                      ></ActionDelete>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManage;

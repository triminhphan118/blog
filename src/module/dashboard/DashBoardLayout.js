import { async } from "@firebase/util";
import { useAuth } from "contexts/auth-context";
import NotFoundPage from "pages/NotFoundPage";
import React, { useLayoutEffect } from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { roleUser } from "utils/constants";
import DashboardHeader from "./DashBoardHeader";
import Sidebar from "./Sidebar";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;
const DashboardLayout = ({ children }) => {
  const { userInfo } = useAuth();
  console.log(userInfo);
  if (!userInfo?.id) return <NotFoundPage></NotFoundPage>;
  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      <div className="dashboard-main">
        <Sidebar></Sidebar>
        <div className="dashboard-children">
          {userInfo?.role === roleUser.User ? null : <Outlet></Outlet>}
        </div>
      </div>
    </DashboardStyles>
  );
};

export default DashboardLayout;

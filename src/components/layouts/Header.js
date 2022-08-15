import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

const HeaderStyles = styled.div`
  /* padding: 20px 0; */
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  .header-main {
    display: flex;
  }
  .img {
    max-width: 50px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .menu {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 40px;
    margin-left: 30px;
    li {
      list-style: none;
    }
  }
  .header-action {
    margin-left: auto;
    .header-auth {
      display: flex;
      gap: 10px;
      align-items: center;
    }
  }

  .menu-link {
    font-size: 18px;
    font-weight: 500;
  }
`;
const menuLinks = [
  {
    title: "Blog",
    url: "/blog",
  },
];

function getLastName(name) {
  if (!name) return "User";
  const splitName = name.split(" ");
  return splitName[splitName.length - 1];
}

function Header() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <div className="container">
      <HeaderStyles>
        <div className="header-main">
          <NavLink to="/" className="img">
            <img src="/Blog.png" alt="" />
            {/* <img src="/PMT.png" alt="" /> */}
          </NavLink>
          <ul className="menu">
            {menuLinks.length > 0 &&
              menuLinks.map((item) => (
                <li className="menu-item" key={item.title}>
                  <NavLink to={item.url} className="menu-link">
                    {item.title}
                  </NavLink>
                </li>
              ))}
          </ul>
        </div>
        <div className="header-action">
          {userInfo && userInfo?.email ? (
            <div className="header-auth">
              Welcome!{" "}
              <strong className="text-primary">
                {getLastName(userInfo?.fullname)}
              </strong>
              <Button type="button" height="45px" onClick={handleLogout}>
                Logout
              </Button>
              <Button
                type="button"
                height="45px"
                kind="amber"
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </Button>
            </div>
          ) : (
            <Button type="button" to="/sign-up" kind={"blue"} height="45px">
              Sign Up
            </Button>
          )}
        </div>
      </HeaderStyles>
    </div>
  );
}

export default Header;

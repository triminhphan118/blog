import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthLayoutStyles = styled.div`
  min-height: 100vh;
  .header-top {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image {
    max-width: 150px;
    display: inline-flex;
    width: 150px;
    .logo {
      width: 100%;
      height: 100%;
      object-fit: cover;
      margin: 0 auto;
    }
  }
  .heading {
    color: ${(props) => props.theme.primary};
    text-align: center;
    font-size: 40px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .form {
    text-align: center;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .have-account {
    margin-bottom: 20px;
    text-align: left;
    a {
      color: ${(props) => props.theme.primary};
      text-decoration: none;
    }
  }
`;

function AuthLayout({ children }) {
  return (
    <AuthLayoutStyles>
      <div className="container">
        <div className="header-top">
          <NavLink to="/" className="image">
            {/* <img srcSet="/logo.png 2x" alt="" className="logo" /> */}
            <img src="/Blog.png" className="logo" alt="" />
          </NavLink>
          <h1 className="heading">PMT Blogging</h1>
        </div>
        {children}
      </div>
    </AuthLayoutStyles>
  );
}
export default AuthLayout;

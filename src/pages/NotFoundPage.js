import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  background-color: rgba(88, 66, 148, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  .image {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .heading {
    font-size: 60px;
    font-weight: 600;
    /* color: ${(props) => props.theme.primary}; */
    color: white;
  }
  .back {
    padding: 20px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.secondary};
    color: #fff;
    font-size: #fff;
  }
`;
function NotFoundPage() {
  return (
    <NotFoundPageStyles>
      <NavLink to={"/"}>
        {/* <img srcSet="/logo.png 2x" alt="logo-blogging" /> */}
        <div className="image">
          <img src="/404.png" alt="logo-blogging" />
        </div>
      </NavLink>
      <h1 className="heading">Oops! Not Found Page</h1>
      <NavLink to={"/"} className="back">
        Back to home
      </NavLink>
    </NotFoundPageStyles>
  );
}

export default NotFoundPage;

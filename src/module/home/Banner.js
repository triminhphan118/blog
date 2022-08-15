import { Button } from "components/button";
import styled from "styled-components";

const BannerStyles = styled.div`
  height: 520px;
  position: relative;
  margin-bottom: 60px;
  background-image: linear-gradient(
    to bottom right,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & .banner-content {
  }
  & .banner-image {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  & .banner-heading {
    font-size: 48px;
    color: #fff;
    font-weight: 700;
    margin-bottom: 30px;
  }
  & .banner-desc {
    max-width: 420px;
    font-size: 14px;
    font-weight: 400;
    line-height: 2;
    color: #fff;
    margin-bottom: 50px;
  }
`;
function Banner() {
  return (
    <BannerStyles>
      <div className="banner-content">
        <h1 className="banner-heading">PMT Blog</h1>
        <p className="banner-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat hic
          autem debitis, possimus non id nostrum a ullam voluptatibus nulla eos
          labore vero tempora odit nam sunt sequi quia reprehenderit.
        </p>
        <Button
          to={"/sign-up"}
          kind="secondary"
          style={{
            height: "60px",
            minWidth: "220px",
          }}
        >
          Get Started
        </Button>
      </div>
      <div className="banner-image">
        <img src="/blog.png" alt="banner" />
      </div>
    </BannerStyles>
  );
}

export default Banner;

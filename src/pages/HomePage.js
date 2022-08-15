import MainLayout from "components/layouts/MainLayout";
import Banner from "module/home/Banner";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNewest";

function HomePage() {
  return (
    <MainLayout>
      <Banner></Banner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
    </MainLayout>
  );
}

export default HomePage;

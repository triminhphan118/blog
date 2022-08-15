import Header from "./Header";

function MainLayout({ children }) {
  return (
    <>
      <div className="bg-gray-100">
        <div className="bg-white">
          <Header></Header>
        </div>
        {children}
      </div>
    </>
  );
}
export default MainLayout;

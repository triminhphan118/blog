import { AuthProvider } from "contexts/auth-context";
import BlogItem from "module/post/BlogItem";
import BlogPage from "pages/BlogPage";
import BlogPageUser from "pages/BlogPageUser";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const CategoryAddNew = lazy(() => import("module/category/CategoryAddNew"));
const CategoryManage = lazy(() => import("module/category/CategoryManage"));
const PostAddNew = lazy(() => import("module/post/PostAddNew"));
const CategoryUpdate = lazy(() => import("module/category/CategoryUpdate"));
const DashboardLayout = lazy(() => import("module/dashboard/DashBoardLayout"));
const PostManage = lazy(() => import("module/post/PostManage"));
const PostUpdate = lazy(() => import("module/post/PostUpdate"));
const UserAddNew = lazy(() => import("module/user/UserAddNew"));
const UserManage = lazy(() => import("module/user/UserManage"));
const UserProfile = lazy(() => import("module/user/UserProfile"));
const UserUpdate = lazy(() => import("module/user/UserUpdate"));
const DashboardPage = lazy(() => import("pages/DashBoardPage"));
const HomePage = lazy(() => import("pages/HomePage"));
const NotFoundPage = lazy(() => import("pages/NotFoundPage"));
const PostDetailsPage = lazy(() => import("pages/PostDetailPage"));
const SingInPage = lazy(() => import("pages/SignInPage"));
const SignUpPage = lazy(() => import("pages/SignUpPage"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense>
          <Routes>
            <Route index element={<HomePage></HomePage>}></Route>
            <Route path="sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="sign-in" element={<SingInPage></SingInPage>}></Route>
            <Route path="/blog" element={<BlogPage></BlogPage>}>
              <Route index element={<BlogItem></BlogItem>}></Route>
              <Route path=":slug" element={<BlogItem></BlogItem>}></Route>
            </Route>
            <Route
              path="/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="/user/:slug"
              element={<BlogPageUser></BlogPageUser>}
            ></Route>

            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route
                path="/dashboard"
                element={<DashboardPage></DashboardPage>}
              ></Route>
              <Route
                path="/manage/post"
                element={<PostManage></PostManage>}
              ></Route>

              <Route
                path="/manage/add-post"
                element={<PostAddNew></PostAddNew>}
              ></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>

              <Route
                path="/manage/user"
                element={<UserManage></UserManage>}
              ></Route>
              <Route
                path="/manage/add-user"
                element={<UserAddNew></UserAddNew>}
              ></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route
                path="/manage/profile-user"
                element={<UserProfile></UserProfile>}
              ></Route>
            </Route>

            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;

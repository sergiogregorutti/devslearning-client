import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import AppEs from "./AppEs";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import MyAccount from "./core/MyAccount";
import Category from "./core/Category";
import Admin from "./core/Admin";
import ListCategories from "./admin/ListCategories";
import ListCategoriesEs from "./admin/ListCategoriesEs";
import AddCategory from "./admin/AddCategory";
import AddCategoryEs from "./admin/AddCategoryEs";
import UpdateCategory from "./admin/UpdateCategory";
import UpdateCategoryEs from "./admin/UpdateCategoryEs";
import ListCourses from "./admin/ListCourses";
import ListCoursesEs from "./admin/ListCoursesEs";
import AddCourse from "./admin/AddCourse";
import AddCourseEs from "./admin/AddCourseEs";
import UpdateCourse from "./admin/UpdateCourse";
import UpdateCourseEs from "./admin/UpdateCourseEs";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Homepage */}
        <Route path="/" exact component={App} />
        <Route path="/es/" exact component={AppEs} />

        {/* Authentication */}
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/auth/activate/:token" component={Activate} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        <PrivateRoute path="/my-account" component={MyAccount} />

        {/* Category */}
        <Route path="/categories/:categoryId" component={Category} />

        {/* Admin */}
        <AdminRoute path="/admin" exact component={Admin} />
        <AdminRoute path="/admin/categories" exact component={ListCategories} />
        <AdminRoute
          path="/admin/categories/create"
          exact
          component={AddCategory}
        />
        <AdminRoute
          path="/admin/categories/:categoryId"
          exact
          component={UpdateCategory}
        />
        <AdminRoute
          path="/admin/es/categories"
          exact
          component={ListCategoriesEs}
        />
        <AdminRoute
          path="/admin/es/categories/create"
          exact
          component={AddCategoryEs}
        />
        <AdminRoute
          path="/admin/es/categories/:categoryId"
          exact
          component={UpdateCategoryEs}
        />
        <AdminRoute path="/admin/courses" exact component={ListCourses} />
        <AdminRoute path="/admin/courses/create" exact component={AddCourse} />
        <AdminRoute
          path="/admin/courses/:courseId"
          exact
          component={UpdateCourse}
        />
        <AdminRoute path="/admin/es/courses" exact component={ListCoursesEs} />
        <AdminRoute
          path="/admin/es/courses/create"
          exact
          component={AddCourseEs}
        />
        <AdminRoute
          path="/admin/es/courses/:courseId"
          exact
          component={UpdateCourseEs}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

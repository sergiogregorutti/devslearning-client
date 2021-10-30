import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import MyAccount from "./core/MyAccount";
import Admin from "./core/Admin";
import ListCategories from "./admin/ListCategories";
import AddCategory from "./admin/AddCategory";
import UpdateCategory from "./admin/UpdateCategory";
import ListCourses from "./admin/ListCourses";
import AddCourse from "./admin/AddCourse";
import UpdateCourse from "./admin/UpdateCourse";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/auth/activate/:token" component={Activate} />
        <Route path="/auth/password/forgot" exact component={Forgot} />
        <Route path="/auth/password/reset/:token" exact component={Reset} />
        <PrivateRoute path="/my-account" component={MyAccount} />
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
        <AdminRoute path="/admin/courses" exact component={ListCourses} />
        <AdminRoute path="/admin/courses/create" exact component={AddCourse} />
        <AdminRoute
          path="/admin/courses/:courseId"
          exact
          component={UpdateCourse}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;

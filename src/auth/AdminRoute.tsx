import { Route, Redirect } from "react-router-dom";
import { isAuth } from "./helpers";

const AdminRoute = ({ children, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      isAuth() && isAuth().role === "admin" ? (
        children
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location },
          }}
        />
      )
    }
  ></Route>
);

export default AdminRoute;

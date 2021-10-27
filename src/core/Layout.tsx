import { Fragment, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./partials/Header";

interface Props extends RouteComponentProps {
  children: ReactNode;
}

const Layout = ({ children, match, history }: Props): JSX.Element => {
  return (
    <Fragment>
      <Header history={history} />
      <Container sx={{ paddingTop: "94px" }}>{children}</Container>
    </Fragment>
  );
};

export default withRouter(Layout);

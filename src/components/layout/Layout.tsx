import { Fragment, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "../header/Header";
import Footer from "../footer/Footer";

interface Props extends RouteComponentProps {
  children: ReactNode;
}

const Layout = ({ children, match, history }: Props): JSX.Element => {
  return (
    <Fragment>
      <Header history={history} />
      <Container sx={{ paddingTop: { xs: "80px", sm: "94px" } }}>
        {children}
      </Container>
      <Footer />
    </Fragment>
  );
};

export default withRouter(Layout);

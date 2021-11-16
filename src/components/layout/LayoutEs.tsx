import { Fragment, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Container } from "@mui/material";
import HeaderEs from "../header/HeaderEs";
import FooterEs from "../footer/FooterEs";

interface Props extends RouteComponentProps {
  children: ReactNode;
}

const Layout = ({ children, match, history }: Props): JSX.Element => {
  return (
    <Fragment>
      <HeaderEs history={history} />
      <Container sx={{ paddingTop: { xs: "80px", sm: "94px" } }}>
        {children}
      </Container>
      <FooterEs />
    </Fragment>
  );
};

export default withRouter(Layout);

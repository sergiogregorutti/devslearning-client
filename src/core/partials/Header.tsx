import React, { useState, useEffect } from "react";
import {
  Container,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import { isAuth, signout } from "../../auth/helpers";

interface IMenuItem {
  label: string;
  href: string;
  variant: "text" | "contained" | "outlined" | undefined;
  callback?: Function;
}

interface HeaderProps {
  history: RouteComponentProps["history"];
}

export default function Header({ history }: HeaderProps) {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const [headersData, setHeadersData] = useState<IMenuItem[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { mobileView, drawerOpen } = state;

  useEffect(() => {
    setHeadersData(generateHeadersData(history));

    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  const generateHeadersData = (history: RouteComponentProps["history"]) => {
    const headersData: IMenuItem[] = [];
    if (!isAuth()) {
      headersData.push({
        label: "Sign In",
        href: "/signin",
        variant: "text",
      });
      headersData.push({
        label: "Create Account",
        href: "/signup",
        variant: "contained",
      });
    }
    if (isAuth()) {
      headersData.push({
        label: "My Account",
        href: "/my-account",
        variant: "text",
      });
    }
    if (isAuth()) {
      headersData.push({
        label: "Log Out",
        href: "",
        variant: "text",
        callback: () => {
          signout(() => {
            setHeadersData(generateHeadersData(history));
            history.push("/");
          });
        },
      });
    }
    return headersData;
  };

  const displayDesktop = () => {
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Toolbar
        disableGutters={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {devsLearningLogo}
        <div>
          {isAuth() && isAuth().role === "admin" && (
            <>
              <Button
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                Admin
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <div>
                  <Button
                    component={RouterLink}
                    to={"/admin/categories"}
                    sx={{ textTransform: "none" }}
                  >
                    Categories
                  </Button>
                </div>
                <div>
                  <Button
                    component={RouterLink}
                    to={"/admin/courses"}
                    sx={{ textTransform: "none" }}
                  >
                    Courses
                  </Button>
                </div>
              </Menu>
            </>
          )}
          {getMenuButtons()}
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <Toolbar
        disableGutters={true}
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>{devsLearningLogo}</div>

        <IconButton
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon sx={{ color: "#1c1c1a" }} />
        </IconButton>

        <Drawer
          {...{
            anchor: "right",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minWidth: "250px",
              padding: "20px",
            }}
          >
            <div style={{ textAlign: "right" }}>
              <CloseIcon onClick={handleDrawerClose} />
            </div>
            {isAuth() && isAuth().role === "admin" && (
              <>
                <Accordion
                  sx={{
                    boxShadow: "none",
                    ":before": {
                      display: "none",
                    },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Button sx={{ textTransform: "none" }}>Admin</Button>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <Button
                        component={RouterLink}
                        to={"/admin/categories"}
                        sx={{ textTransform: "none" }}
                      >
                        Categories
                      </Button>
                    </div>
                    <div>
                      <Button
                        component={RouterLink}
                        to={"/admin/courses"}
                        sx={{ textTransform: "none" }}
                      >
                        Courses
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </>
            )}
            {getDrawerChoices()}
          </div>
        </Drawer>
      </Toolbar>
    );
  };

  const devsLearningLogo = (
    <RouterLink to="/">
      <img
        height="30"
        src="/img/logo-isologo.svg"
        style={{ marginTop: "12px" }}
      />
    </RouterLink>
  );

  const getMenuButtons = () => {
    return headersData.map(({ label, href, variant, callback }: IMenuItem) => {
      if (callback !== undefined) {
        return (
          <Button
            variant={variant}
            key={label}
            onClick={() => {
              callback();
            }}
            sx={{ textTransform: "none" }}
          >
            {label}
          </Button>
        );
      } else {
        return (
          <Button
            variant={variant}
            key={label}
            {...{
              color: "inherit",
              to: href,
              component: RouterLink,
            }}
            sx={{ textTransform: "none" }}
          >
            {label}
          </Button>
        );
      }
    });
  };

  const getDrawerChoices = () => {
    if (headersData) {
      return headersData.map(({ label, href, variant, callback }) => {
        if (callback !== undefined) {
          return (
            <Button
              variant={variant}
              key={label}
              onClick={() => {
                callback();
              }}
              sx={{ textTransform: "none" }}
            >
              {label}
            </Button>
          );
        }

        return (
          <Button
            variant={variant}
            key={label}
            component={RouterLink}
            to={href}
            sx={{ textTransform: "none" }}
          >
            {label}
          </Button>
        );
      });
    }
  };

  return (
    <AppBar
      sx={{
        backgroundColor: "#fff",
        boxShadow: "none",
      }}
    >
      <Container sx={{ borderBottom: "1px solid #ccc" }}>
        {mobileView ? displayMobile() : displayDesktop()}
      </Container>
    </AppBar>
  );
}

import React, { useState, MouseEvent } from "react";
import {
  Link as RouterLink,
  Redirect,
  RouteComponentProps,
} from "react-router-dom";
import Layout from "../components/layout/Layout";
import axios, { AxiosResponse } from "axios";
import { authenticate, isAuth } from "../common/helpers";
import { ToastContainer, toast } from "react-toastify";
import { Grid, Typography, Divider, TextField, Button } from "@mui/material";
import Google from "../components/social-login/Google";
import Facebook from "../components/social-login/Facebook";
import "react-toastify/dist/ReactToastify.css";

const Signin = ({ history }: RouteComponentProps) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.target.value });
    };

  const informParent = (response: AxiosResponse) => {
    authenticate(response, () => {
      history.push("/");
    });
  };

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        console.log("Signin success", response);

        authenticate(response, () => {
          setValues({
            ...values,
            email: "",
            password: "",
            buttonText: "Submitted",
          });
          history.push("/");
        });
      })
      .catch((error) => {
        console.log("Signin error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={7}>
          <TextField
            fullWidth
            onChange={handleChange("email")}
            type="email"
            value={email}
            label="E-mail"
            variant="standard"
            margin="dense"
          />
          <TextField
            fullWidth
            onChange={handleChange("password")}
            type="password"
            value={password}
            label="Password"
            variant="standard"
            margin="dense"
          />
          <div>
            <Button
              onClick={clickSubmit}
              variant="contained"
              sx={{
                marginTop: "20px",
              }}
            >
              {buttonText}
            </Button>
            <Button
              variant="text"
              component={RouterLink}
              to="/auth/password/forgot"
              sx={{
                marginTop: "20px",
                marginLeft: "10px",
              }}
            >
              Forgot Password
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <Layout>
      <div>
        <ToastContainer />
        {isAuth() ? <Redirect to="/" /> : null}

        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={6}>
            <Typography
              variant="h1"
              component="div"
              gutterBottom
              sx={{ textAlign: "center", marginBottom: "40px" }}
            >
              Sign In
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item lg={6}>
                <Google action={"Signin"} informParent={informParent} />
                <Facebook action={"Signin"} informParent={informParent} />
              </Grid>
            </Grid>

            <Divider sx={{ marginTop: "30px", marginBottom: "15px" }}>
              OR
            </Divider>

            {signinForm()}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Signin;

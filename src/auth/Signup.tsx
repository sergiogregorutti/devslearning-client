import React, { useState, MouseEvent } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import Layout from "../core/Layout";
import axios, { AxiosResponse } from "axios";
import { authenticate, isAuth } from "./helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Google from "./Google";
import Facebook from "./Facebook";
import { Grid, Typography, Divider, TextField, Button } from "@mui/material";

const Signup = ({ history }: RouteComponentProps) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [name]: event.currentTarget.value });
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
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log("Signup success", response);
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          buttonText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Signup error", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signupForm = () => (
    <form>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={7}>
          <TextField
            fullWidth
            onChange={handleChange("name")}
            type="text"
            value={name}
            label="Name"
            variant="standard"
            margin="dense"
          />
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
              Create Account
            </Typography>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item lg={6}>
                <Google action={"Signup"} informParent={informParent} />
                <Facebook action={"Signup"} informParent={informParent} />
              </Grid>
            </Grid>

            <Divider sx={{ marginTop: "30px", marginBottom: "15px" }}>
              OR
            </Divider>

            {signupForm()}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Signup;

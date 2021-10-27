import React, { useState, MouseEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Grid, Typography, TextField, Button } from "@mui/material";

const Forgot = ({ history }: RouteComponentProps) => {
  const [values, setValues] = useState({
    email: "",
    buttonText: "Request password reset link",
  });

  const { email, buttonText } = values;

  const handleChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      // console.log(event.target.value);
      setValues({ ...values, [name]: event.currentTarget.value });
    };

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("FORGOT PASSWORD SUCCESS", response);
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Requested" });
      })
      .catch((error) => {
        console.log("FORGOT PASSWORD ERROR", error.response.data);
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Request password reset link" });
      });
  };

  const passwordForgotForm = () => (
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
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        <Grid container justifyContent="center" spacing={2}>
          <Grid item lg={6}>
            <Typography
              variant="h1"
              component="div"
              gutterBottom
              sx={{ textAlign: "center", marginBottom: "40px" }}
            >
              Forgot Password
            </Typography>
            {passwordForgotForm()}
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default Forgot;

import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuth } from "../auth/helpers";
import { Link as RouterLink } from "react-router-dom";
import { createCategory } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Grid, Typography, TextField, Button } from "@mui/material";

const AddCategory = () => {
  const [name, setName] = useState("");

  const { token } = isAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const clickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createCategory(token, { name }).then((data) => {
      if (data.error) {
        toast.error("Category should be unique");
      } else {
        toast.success("Category created");
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={7}>
          <TextField
            fullWidth
            onChange={handleChange}
            type="text"
            value={name}
            label="Name"
            variant="standard"
            margin="dense"
          />

          <div style={{ marginTop: "20px" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                marginRight: "15px",
              }}
            >
              Create
            </Button>
            <Button variant="outlined" component={RouterLink} to={"/"}>
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );

  return (
    <Layout>
      <ToastContainer />

      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={6}>
          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: "40px" }}
          >
            Create Category
          </Typography>
          {newCategoryFom()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddCategory;

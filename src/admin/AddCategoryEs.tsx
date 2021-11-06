import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuth } from "../auth/helpers";
import { Link as RouterLink } from "react-router-dom";
import { createCategoryEs as createCategory } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Grid, Typography, TextField, Button } from "@mui/material";

const AddCategoryEs = () => {
  const [values, setValues] = useState<any>({
    name: "",
    photo: "",
    formData: "",
  });

  const { token } = isAuth();
  const { name, formData } = values;

  const init = () => {
    setValues({
      ...values,
      formData: new FormData(),
    });
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange = (name: string) => (event: any) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createCategory(token, formData).then((data) => {
      if (data.error) {
        toast.error("Category should be unique");
      } else {
        setValues({
          ...values,
          name: "",
          photo: "",
        });
        toast.success("Category is created");
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={7}>
          <TextField
            fullWidth
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            label="Photo"
            variant="standard"
            margin="dense"
          />
          <TextField
            fullWidth
            onChange={handleChange("name")}
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
            <Button
              variant="outlined"
              component={RouterLink}
              to={"/admin/es/categories"}
            >
              Go Back
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
            Create Category (Spanish)
          </Typography>
          {newCategoryFom()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default AddCategoryEs;

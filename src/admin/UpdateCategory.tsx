import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuth } from "../auth/helpers";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import { getCategory, updateCategory } from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Grid, Typography, TextField, Button } from "@mui/material";

interface MatchParams {
  categoryId: string;
}

interface ICategory {
  name: string;
  photo: string;
  _id: string;
  formData?: any;
}

const UpdateCategory = ({ match }: RouteComponentProps<MatchParams>) => {
  const [values, setValues] = useState<ICategory>({
    name: "",
    photo: "",
    _id: "",
  });

  const { token } = isAuth();
  const { name, _id, formData } = values;

  const init = (categoryId: String) => {
    getCategory(categoryId).then((data: any) => {
      if (data.error) {
        toast.error("There is an error loading the category");
      } else {
        setValues({
          ...values,
          name: data.name,
          photo: data.photo,
          _id: data._id,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleChange = (name: string) => (event: any) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateCategory(match.params.categoryId, token, formData).then(
      (data: any) => {
        if (data.error) {
          toast.error("The new category name already exist");
        } else {
          toast.success("Category updated");
        }
      }
    );
  };

  const updateCategoryFom = () => (
    <form onSubmit={clickSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={7}>
          <img
            src={`${process.env.REACT_APP_API}/category/photo/${_id}`}
            alt={name}
            style={{ height: "50px", marginBottom: "-10px" }}
          />
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
              Update
            </Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to={"/admin/categories"}
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
            Update Category
          </Typography>
          {updateCategoryFom()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UpdateCategory;

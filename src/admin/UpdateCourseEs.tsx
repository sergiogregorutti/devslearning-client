import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuth } from "../auth/helpers";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import {
  getCourseEs as getCourse,
  getCategoriesEs as getCategories,
  updateCourseEs as updateCourse,
} from "./api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

interface MatchParams {
  courseId: string;
}

interface ICourse {
  _id: string;
  name: string;
  description: string;
  platform: string;
  author: string;
  pricing: string;
  price: Number;
  categories: string[];
  category: any;
  year: Number;
  link: string;
  formData?: any;
}

const UpdateCourseEs = ({ match }: RouteComponentProps<MatchParams>) => {
  const [values, setValues] = useState<ICourse>({
    _id: "",
    name: "",
    description: "",
    platform: "",
    author: "",
    pricing: "",
    price: 0,
    categories: [],
    category: "",
    year: 2021,
    link: "",
  });
  const [categories, setCategories] = useState([]);

  const { token } = isAuth();
  const {
    _id,
    category,
    name,
    description,
    platform,
    author,
    pricing,
    price,
    year,
    link,
    formData,
  } = values;

  const init = (courseId: String) => {
    initCategories(courseId);
  };

  const initCategories = (courseId: String) => {
    getCategories().then((data) => {
      if (data.error) {
        toast.error("Error loading categories");
      } else {
        setCategories(data);
        initCourse(courseId);
      }
    });
  };

  const initCourse = (courseId: String) => {
    getCourse(courseId).then((data: any) => {
      console.log("data", data);
      if (data.error) {
        toast.error("There is an error loading the course");
      } else {
        setValues({
          ...values,
          _id: data._id,
          name: data.name,
          description: data.description,
          platform: data.platform,
          author: data.author,
          pricing: data.pricing,
          price: data.price,
          category: data.category._id,
          year: data.year,
          link: data.link,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init(match.params.courseId);
  }, []);

  const handleChange = (name: string) => (event: any) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    updateCourse(match.params.courseId, token, formData).then((data: any) => {
      if (data.error) {
        toast.error("The new course name already exist");
      } else {
        toast.success("Course updated");
      }
    });
  };

  const updateCourseFom = () => (
    <form onSubmit={clickSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={10}>
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              value={category}
              onChange={handleChange("category")}
            >
              {categories &&
                categories.map((c: any, i: number) => (
                  <MenuItem key={i} value={c._id}>
                    {c.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          {_id && (
            <img
              src={`${process.env.REACT_APP_API}/es/course/photo/${_id}`}
              alt={name}
              style={{
                height: "50px",
                marginTop: "20px",
                marginBottom: "-10px",
              }}
            />
          )}
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
          <TextField
            fullWidth
            multiline
            onChange={handleChange("description")}
            type="text"
            name="description"
            value={description}
            label="Description"
            variant="standard"
            margin="dense"
          />
          <TextField
            fullWidth
            onChange={handleChange("platform")}
            type="text"
            name="platform"
            value={platform}
            label="Platform"
            variant="standard"
            margin="dense"
          />
          <TextField
            fullWidth
            onChange={handleChange("author")}
            type="text"
            name="author"
            value={author}
            label="Author"
            variant="standard"
            margin="dense"
          />
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Pricing</FormLabel>
            <RadioGroup
              row
              aria-label="pricing"
              name="pricing"
              onChange={handleChange("pricing")}
              value={pricing}
            >
              <FormControlLabel value="free" control={<Radio />} label="Free" />
              <FormControlLabel
                value="one-time-payment"
                control={<Radio />}
                label="One Time Payment"
              />
              <FormControlLabel
                value="subscription"
                control={<Radio />}
                label="Subscription"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            fullWidth
            onChange={handleChange("price")}
            type="number"
            name="price"
            value={price}
            label="Price"
            variant="standard"
            margin="dense"
          />
          <TextField
            fullWidth
            onChange={handleChange("year")}
            type="number"
            name="year"
            value={year}
            label="Year"
            variant="standard"
            margin="dense"
          />
          <TextField
            fullWidth
            onChange={handleChange("link")}
            type="text"
            name="link"
            value={link}
            label="Link"
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
              to={"/admin/es/courses"}
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
            Update Course (Spanish)
          </Typography>
          {updateCourseFom()}
        </Grid>
      </Grid>
    </Layout>
  );
};

export default UpdateCourseEs;

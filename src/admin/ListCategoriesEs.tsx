import { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuth } from "../auth/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link as RouterLink } from "react-router-dom";
import {
  getCategoriesEs as getCategories,
  deleteCategoryEs as deleteCategory,
} from "./api";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

const ListCategoriesEs = () => {
  const [values, setValues] = useState<any>({
    categories: "",
  });

  const { token } = isAuth();
  const { categories } = values;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setValues({
          ...values,
          categories: data,
        });
      }
    });
  };

  const init = () => {
    loadCategories();
  };

  useEffect(() => {
    init();
  }, []);

  const destroy = (categoryId: String) => {
    deleteCategory(categoryId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Category deleted");
        loadCategories();
      }
    });
  };

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
            Categories (Spanish)
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={"/admin/es/categories/create"}
            sx={{ marginBottom: "15px" }}
          >
            Add Category
          </Button>

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories &&
                  categories.map((category: any) => (
                    <TableRow
                      key={category.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`${process.env.REACT_APP_API}/es/category/photo/${category._id}`}
                          alt={category.name}
                          style={{ height: "50px", marginRight: "10px" }}
                        />
                        {category.name}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          component={RouterLink}
                          to={`/admin/es/categories/${category._id}`}
                          sx={{ marginRight: "15px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => destroy(category._id)}
                          sx={{
                            backgroundColor: "#d21b1b",
                            "&:hover": {
                              backgroundColor: "#d63b3b",
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default ListCategoriesEs;

import { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { isAuth } from "../common/helpers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Link as RouterLink } from "react-router-dom";
import {
  getCoursesEs as getCourses,
  deleteCourseEs as deleteCourse,
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

const ListCoursesEs = () => {
  const [values, setValues] = useState<any>({
    courses: "",
  });

  const { token } = isAuth();
  const { courses } = values;

  const loadCourses = () => {
    getCourses().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("data", data);
        setValues({
          ...values,
          courses: data,
        });
      }
    });
  };

  const init = () => {
    loadCourses();
  };

  useEffect(() => {
    init();
  }, []);

  const destroy = (coursesId: String) => {
    deleteCourse(coursesId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Course deleted");
        loadCourses();
      }
    });
  };

  return (
    <Layout>
      <ToastContainer />

      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={10}>
          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: "40px" }}
          >
            Courses (Spanish)
          </Typography>

          <Button
            variant="contained"
            component={RouterLink}
            to={"/admin/es/courses/create"}
            sx={{ marginBottom: "15px" }}
          >
            Add Course
          </Button>

          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Course</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses &&
                  courses.map((course: any) => (
                    <TableRow
                      key={course.name}
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
                          src={`${process.env.REACT_APP_API}/es/course/photo/${course._id}`}
                          alt={course.name}
                          style={{ height: "50px", marginRight: "10px" }}
                        />
                        {course.name}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          component={RouterLink}
                          to={`/admin/es/courses/${course._id}`}
                          sx={{ marginRight: "15px" }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => destroy(course._id)}
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

export default ListCoursesEs;

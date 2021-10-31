import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getCategory, getFilteredCourses } from "../core/api";
import Layout from "./Layout";
import { useTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Button, Chip, Grid, Typography, useMediaQuery } from "@mui/material";

interface MatchParams {
  categoryId: string;
}

interface ICategory {
  _id: string;
  name: string;
}

interface ICourse {
  _id: string;
  name: string;
  description: string;
  platform: string;
  author: string;
  pricing: string;
  price: number;
  year: number;
  link: string;
}

const Category = ({ match }: RouteComponentProps<MatchParams>) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [myFilters, setMyFilters] = useState<any>({
    filters: { category: "" },
  });
  const [category, setCategory] = useState<ICategory>();
  const limit = 6;
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState<any>([]);

  const loadMore = () => {
    const toSkip = skip + limit;
    getFilteredCourses(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        toast.error("There is an error loading the courses");
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleFilters = (filters: any, filterBy: string) => {
    // console.log("SHOP", filters, filterBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(skip, limit, myFilters.filters);
    setMyFilters(newFilters);
  };

  const init = (categoryId: String) => {
    handleFilters(categoryId, "category");
    getCategory(categoryId).then((data: any) => {
      if (data.error) {
        toast.error("There is an error loading the category");
      } else {
        setCategory(data);
      }
    });
    loadFilteredResults(skip, limit, myFilters.filters);
  };

  const loadFilteredResults = (
    skip: Number,
    limit: Number,
    newFilters: any
  ) => {
    getFilteredCourses(skip, limit, newFilters).then((data) => {
      if (data.error) {
        toast.error("There is an error loading the courses");
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const renderPricing = (value: String) => {
    switch (value) {
      case "free":
        return (
          <Chip
            sx={{
              borderRadius: "5px",
              height: "auto",
              padding: "5px 10px",
              marginLeft: "5px",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: "#4cca4c",
              " span": {
                padding: "0",
              },
            }}
            label="Free"
          />
        );
      case "one-time-payment":
        return (
          <Chip
            sx={{
              borderRadius: "5px",
              height: "auto",
              padding: "5px 10px",
              marginLeft: "5px",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: "#804C20",
              " span": {
                padding: "0",
              },
            }}
            label="One Time Payment"
          />
        );
      case "subscription":
        return (
          <Chip
            sx={{
              borderRadius: "5px",
              height: "auto",
              padding: "5px 10px",
              marginLeft: "5px",
              fontSize: "12px",
              color: "#fff",
              backgroundColor: "#ED731F",
              " span": {
                padding: "0",
              },
            }}
            label="Subscription"
          />
        );
    }
  };

  return (
    <Layout>
      <ToastContainer />

      <Grid container justifyContent="center">
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {matches
            ? category && (
                <img
                  src={`${process.env.REACT_APP_API}/category/photo/${category._id}`}
                  alt={category.name}
                  style={{ height: "70px", marginBottom: "10px" }}
                />
              )
            : category && (
                <img
                  src={`${process.env.REACT_APP_API}/category/photo/${category._id}`}
                  alt={category.name}
                  style={{ height: "50px", marginBottom: "10px" }}
                />
              )}

          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{
              textAlign: "center",
              fontSize: { xs: "24px", sm: "42px" },
              marginBottom: "40px",
            }}
          >
            {category && category.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        <Grid item sm={3}>
          Filters
        </Grid>
        <Grid item sm={9}>
          {filteredResults.map((course: ICourse, i: number) => (
            <Grid
              key={i}
              container
              justifyContent="center"
              sx={{
                borderRadius: "10px",
                padding: "20px",
                background: "#f7f7f7",
                marginBottom: "15px",
              }}
            >
              <Grid
                item
                sm={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: { xs: "15px", sm: "0" },
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/course/photo/${course._id}`}
                  alt={course.name}
                  style={{
                    width: "80%",
                    paddingRight: "15px",
                  }}
                />
              </Grid>
              <Grid
                item
                sm={9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h2"
                  component="div"
                  gutterBottom
                  sx={{ fontSize: "18px", marginBottom: "0", color: "#000" }}
                >
                  {course.name} {renderPricing(course.pricing)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{ fontSize: "14px", lineHeight: "16px" }}
                >
                  {course.description}
                </Typography>

                <div>
                  {course.platform && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="span"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <strong>Platform:</strong> {course.platform}
                    </Typography>
                  )}
                  {course.author && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="span"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <strong>Author:</strong> {course.author}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    gutterBottom
                    component="span"
                    sx={{
                      fontSize: "14px",
                      lineHeight: "16px",
                      marginRight: "10px",
                    }}
                  >
                    <strong>Price:</strong> ${course.price}
                  </Typography>
                  {course.year && (
                    <Typography
                      variant="body1"
                      gutterBottom
                      component="span"
                      sx={{
                        fontSize: "14px",
                        lineHeight: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <strong>Year:</strong> {course.year}
                    </Typography>
                  )}
                </div>
                <div style={{ marginTop: "10px" }}>
                  <Button
                    variant="contained"
                    href={course.link}
                    target="_blank"
                    size="small"
                    sx={{ width: "auto" }}
                  >
                    Visit Course
                  </Button>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {loadMoreButton()}
    </Layout>
  );
};

export default Category;

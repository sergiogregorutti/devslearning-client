import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import {
  getCategoryEs as getCategory,
  getFilteredCoursesEs as getFilteredCourses,
} from "../../api/api";
import LayoutEs from "../../components/layout/LayoutEs";
import { useTheme } from "@mui/material/styles";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ReactGA from "react-ga";
ReactGA.initialize("UA-165328952-2");

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

const CategoryEs = ({ match }: RouteComponentProps<MatchParams>) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  const [myFilters, setMyFilters] = useState<any>({
    filters: { category: "" },
  });
  const [sortBy, setSortBy] = useState<any>("priceHighToLow");
  const [category, setCategory] = useState<ICategory>();
  const limit = 5;
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState<any>([]);

  const generateSorting = (value: String) => {
    switch (value) {
      case "priceHighToLow":
        return {
          sortBy: "price",
          order: "desc",
        };
      case "priceLowToHigh":
        return {
          sortBy: "price",
          order: "asc",
        };
      case "newest":
        return {
          sortBy: "year",
          order: "desc",
        };
      default:
        return {
          sortBy: "price",
          order: "desc",
        };
    }
  };

  const loadMore = () => {
    const toSkip = skip + limit;
    const sorting = generateSorting(sortBy);
    getFilteredCourses(
      toSkip,
      limit,
      myFilters.filters,
      sorting.sortBy,
      sorting.order
    ).then((data) => {
      if (data.error) {
        toast.error("Ocurrió un error cargando los cursos");
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
        <Grid container justifyContent="center" sx={{ alignItems: "center" }}>
          <Grid
            item
            sm={9}
            sx={{
              marginBottom: "10px",
              width: "100%",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Button
              variant="contained"
              onClick={loadMore}
              size="small"
              sx={{ width: "auto" }}
            >
              Cargar Más
            </Button>
          </Grid>
        </Grid>
      )
    );
  };

  useEffect(() => {
    init(match.params.categoryId);
  }, []);

  const handleFilters = (filters: any, filterBy: string) => {
    const sorting = generateSorting(sortBy);
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    loadFilteredResults(
      skip,
      limit,
      myFilters.filters,
      sorting.sortBy,
      sorting.order
    );
    setMyFilters(newFilters);
  };

  const init = (categoryId: String) => {
    handleFilters(categoryId, "category");
    getCategory(categoryId).then((data: any) => {
      if (data.error) {
        toast.error("Ocurrió un error cargando la categoría");
      } else {
        setCategory(data);
        ReactGA.pageview(`Category | ES | ${data.name}`);
      }
    });
    const sorting = generateSorting(sortBy);
    loadFilteredResults(
      skip,
      limit,
      myFilters.filters,
      sorting.sortBy,
      sorting.order
    );
  };

  const loadFilteredResults = (
    skip: Number,
    limit: Number,
    newFilters: any,
    sortBy: String,
    order: String
  ) => {
    getFilteredCourses(skip, limit, newFilters, sortBy, order).then((data) => {
      if (data.error) {
        toast.error("Ocurrió un error cargando los cursos");
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
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{
              fontSize: "15px",
              color: "#4CC94D",
              fontWeight: "bold",
              marginBottom: "0",
            }}
          >
            Gratis
          </Typography>
        );
      case "one-time-payment":
        return (
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{
              fontSize: "15px",
              color: "#E5057E",
              fontWeight: "bold",
              marginBottom: "0",
            }}
          >
            Único Pago
          </Typography>
        );
      case "subscription":
        return (
          <Typography
            variant="body1"
            component="div"
            gutterBottom
            sx={{
              fontSize: "15px",
              color: "#EE741C",
              fontWeight: "bold",
              marginBottom: "0",
            }}
          >
            Subscripción
          </Typography>
        );
    }
  };

  const handleSortByChange = (
    event: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => {
    const value = event.target.value;
    const sorting = generateSorting(value);
    loadFilteredResults(
      0,
      limit,
      myFilters.filters,
      sorting.sortBy,
      sorting.order
    );
    setSortBy(value);
    setSkip(0);
  };

  return (
    <LayoutEs>
      <ToastContainer />

      <Grid container justifyContent="center">
        <Grid
          item
          sm={9}
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "left",
            borderBottom: "1px solid #000",
            marginBottom: "20px",
            paddingBottom: "20px",
            width: "100%",
          }}
        >
          {matches
            ? category && (
                <img
                  src={`${process.env.REACT_APP_API}/es/category/photo/${category._id}`}
                  alt={category.name}
                  style={{ height: "70px", marginRight: "15px" }}
                />
              )
            : category && (
                <img
                  src={`${process.env.REACT_APP_API}/es/category/photo/${category._id}`}
                  alt={category.name}
                  style={{ height: "50px", marginRight: "10px" }}
                />
              )}

          <Typography
            variant="h1"
            component="div"
            gutterBottom
            sx={{
              fontSize: { xs: "24px", sm: "42px" },
              marginBottom: "0",
            }}
          >
            {category && category.name}
          </Typography>
        </Grid>
      </Grid>
      <Grid container justifyContent="center" sx={{ alignItems: "left" }}>
        <Grid item sm={9} sx={{ marginBottom: "10px", width: "100%" }}>
          <FormControl
            component="fieldset"
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <FormLabel component="legend">Ordenar Por</FormLabel>
            <RadioGroup
              row
              aria-label="sort-by-radio"
              value={sortBy}
              onChange={handleSortByChange}
              name="sort-by-radio"
            >
              <FormControlLabel
                value="priceHighToLow"
                control={<Radio />}
                label="Precio: Mayor a Menor"
              />
              <FormControlLabel
                value="priceLowToHigh"
                control={<Radio />}
                label="Precio: Menor a Mayor"
              />
              <FormControlLabel
                value="newest"
                control={<Radio />}
                label="Más Nuevos"
              />
            </RadioGroup>
          </FormControl>
          <FormControl
            variant="standard"
            margin="dense"
            sx={{
              display: { xs: "block", sm: "none" },
            }}
          >
            <InputLabel id="sort-by-select">Ordenar Por</InputLabel>
            <Select
              labelId="sort-by-select"
              id="sort-by-select"
              value={sortBy}
              label="SortBy"
              onChange={handleSortByChange}
            >
              <MenuItem value="priceHighToLow">Precio: Mayor a Menor</MenuItem>
              <MenuItem value="priceLowToHigh">Precio: Menor a Mayor</MenuItem>
              <MenuItem value="newest">Más Nuevos</MenuItem>
            </Select>
          </FormControl>
          <Alert
            severity="info"
            sx={{
              fontSize: "12px",
              borderRadius: "10px",
              marginTop: { xs: "10px", sm: "0" },
            }}
          >
            Los precios estan expresados en Dolares Estadounidenses y algunos
            son aproximados según el precio en la moneda local.
          </Alert>
        </Grid>
        <Grid item sm={9}>
          {filteredResults.map((course: ICourse, i: number) => (
            <Grid
              key={i}
              container
              justifyContent="center"
              sx={{
                borderRadius: "10px",
                padding: { xs: "20px", sm: "20px 20px 20px 0" },
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
                  justifyContent: "start",
                  alignItems: { xs: "start", sm: "center" },
                  marginBottom: { xs: "15px", sm: "0" },
                }}
              >
                <img
                  src={`${process.env.REACT_APP_API}/es/course/photo/${course._id}`}
                  alt={course.name}
                  style={{
                    width: "80%",
                  }}
                />
              </Grid>
              <Grid
                item
                sm={9}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                {renderPricing(course.pricing)}
                <Typography
                  variant="h2"
                  component="div"
                  gutterBottom
                  sx={{
                    fontSize: "18px",
                    marginBottom: "5px",
                    color: "#0b376b",
                  }}
                >
                  {course.name}
                </Typography>

                <Typography
                  variant="subtitle1"
                  gutterBottom
                  component="div"
                  sx={{
                    fontSize: "14px",
                    lineHeight: "16px",
                    marginBottom: "8px",
                  }}
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
                      <strong>Plataforma:</strong> {course.platform}
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
                      <strong>Autor:</strong> {course.author}
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
                    <strong>Precio:</strong> US$ {course.price}
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
                      <strong>Año:</strong> {course.year}
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
                    Visitar Curso
                  </Button>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      {loadMoreButton()}
    </LayoutEs>
  );
};

export default CategoryEs;

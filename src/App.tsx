import Layout from "./core/Layout";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const App = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{
          paddingTop: "40px",
          paddingBottom: "40px",
          flexDirection: { xs: "column-reverse", sm: "row" },
          alignItems: { xs: "center", sm: "normal" },
        }}
      >
        <Grid
          item
          sm={6}
          sx={{
            paddingLeft: { xs: "0 !important", sm: "16px !important" },
            paddingTop: { xs: "0 !important", sm: "16px !important" },
            display: { xs: "block", sm: "flex" },
            alignItems: { xs: "top", sm: "center" },
          }}
        >
          <Container
            sx={{
              padding: { sm: "0 !important" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography
              variant="h1"
              component="div"
              sx={{ fontSize: { xs: "34px", lg: "63px" } }}
            >
              Welcome to
            </Typography>
            <img src="/img/logo.svg" style={{ width: "78%" }} />
            <Typography
              variant="subtitle1"
              gutterBottom
              component="div"
              sx={{
                marginTop: "-5px",
                fontSize: { xs: "16px", sm: "18px", lg: "20px" },
              }}
            >
              Course directory for developers.
            </Typography>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/categories"
              sx={{
                marginTop: "20px",
              }}
            >
              Browse courses
            </Button>
          </Container>
        </Grid>
        <Grid
          item
          sm={6}
          sx={{
            paddingLeft: { xs: "0 !important", lg: "16px !important" },
            paddingTop: { xs: "0 !important", lg: "16px !important" },
          }}
        >
          {matches ? (
            <img src="/img/girl.png" style={{ width: "100%" }} />
          ) : (
            <img
              src="/img/girl.png"
              style={{
                height: "150px",
                marginBottom: "20px",
                marginTop: "-25px",
              }}
            />
          )}
        </Grid>
      </Grid>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          component="div"
          sx={{ textAlign: "center" }}
        >
          What do you want to learn?
        </Typography>

        <Grid container justifyContent="center" spacing={2}>
          <Grid item sm={3}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
              sx={{
                marginTop: "20px",
              }}
            >
              HTML
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
              sx={{
                marginTop: "20px",
              }}
            >
              CSS
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
              sx={{
                marginTop: "20px",
              }}
            >
              Javascript
            </Button>
          </Grid>
          <Grid item sm={3}>
            <Button
              variant="outlined"
              component={RouterLink}
              to="/"
              sx={{
                marginTop: "20px",
              }}
            >
              React
            </Button>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
};

export default App;

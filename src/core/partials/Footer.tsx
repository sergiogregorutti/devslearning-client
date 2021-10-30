import { Container, Typography } from "@mui/material";
// import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  return (
    <Container
      sx={{
        borderTop: "1px solid #ccc",
        marginTop: "25px",
        paddingTop: "5px",
        paddingBottom: "15px",
      }}
    >
      <Typography sx={{ textAlign: "center", fontSize: "13px" }}>
        DevsLearning 2021 | Created by{" "}
        <a
          href="https://github.com/sergiogregorutti"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#2097f8",
            textDecoration: "none",
          }}
        >
          @sergiogregorutti
        </a>{" "}
        | Design and Illustrations by{" "}
        <a
          href="https://www.instagram.com/floradeluca.art/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: "#2097f8",
            textDecoration: "none",
          }}
        >
          @floradelucaart
        </a>
      </Typography>
    </Container>
  );
}

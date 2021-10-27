import { useState, useEffect, MouseEvent } from "react";
import Layout from "../core/Layout";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

interface RouteParams {
  token: string;
}

interface Token {
  name: string;
}

const Activate = () => {
  const [values, setValues] = useState({
    name: "",
    token: "",
  });

  const params = useParams<RouteParams>();

  useEffect(() => {
    const token = params.token;

    const { name } = jwt.decode(token) as Token;
    console.log("name", name);

    if (token) {
      setValues({ ...values, name, token });
    }
  }, []);

  const { name, token } = values;

  const clickSubmit = (event: MouseEvent) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token },
    })
      .then((response) => {
        console.log("Account activation success", response);
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Account activation error", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  const activationLink = () => (
    <div className="text-center">
      <h1 className="p-5">Hi {name}, ready to activate your account?</h1>
      <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
      </button>
    </div>
  );

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />

        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;

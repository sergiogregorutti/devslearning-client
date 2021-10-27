import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from "react-google-login";
import axios from "axios";
import { Button } from "@mui/material";

const isGoogleLoginResponse = (
  response: GoogleLoginResponse | GoogleLoginResponseOffline
): response is GoogleLoginResponse => {
  return (
    !!response &&
    typeof response === "object" &&
    !!(response as GoogleLoginResponse).tokenId
  );
};

interface IGoogle {
  action: String;
  informParent: Function;
}

const Google = ({ action, informParent }: IGoogle) => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    if (!isGoogleLoginResponse(response)) {
      return;
    }

    console.log(response.tokenId);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { idToken: response.tokenId },
    })
      .then((response) => {
        console.log("GOOGLE SIGNIN SUCCESS", response);
        // inform parent component
        informParent(response);
      })
      .catch((error) => {
        console.log("GOOGLE SIGNIN ERROR", error.response);
      });
  };
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            variant="contained"
            sx={{
              position: "relative",
              textAlign: "center",
              width: "100%",
              paddingLeft: "42px",
              background: "#fff",
              color: "#757575",
              borderRadius: "3px",
              boxShadow:
                "0 -1px 0 rgba(0, 0, 0, .04), 0 1px 1px rgba(0, 0, 0, .25)",
              " img": {
                position: "absolute",
                top: "11px",
                left: "12px",
              },
              "&:hover": {
                boxShadow:
                  "0 -1px 0 rgba(0, 0, 0, .04), 0 2px 4px rgba(0, 0, 0, .25)",
                backgroundColor: "#fff",
              },
            }}
          >
            <img height="20" src="/img/google.svg" />
            {action} with Google
          </Button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;

import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login'
import axios from 'axios'
import { Button } from '@mui/material'

const isGoogleLoginResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline): response is GoogleLoginResponse => {
  return !!response && typeof response === 'object' && !!(response as GoogleLoginResponse).tokenId
}

interface IGoogle {
  informParent: Function;
}

const Google = ({ informParent }: IGoogle) => {
  const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!isGoogleLoginResponse(response)) {
      return
    }

    console.log(response.tokenId)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { idToken: response.tokenId }
    })
      .then(response => {
        console.log('GOOGLE SIGNIN SUCCESS', response)
        // inform parent component
        informParent(response)
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response)
      })
  }
  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={renderProps => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled} variant="contained" sx={{
            background: '#fff', color: '#000', opacity: 0.54
          }}>Login with Google</Button>
        )}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}

export default Google

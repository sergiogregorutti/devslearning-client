import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'
import { Button } from '@mui/material'

interface FacebookLoginResponse {
  userID: string;
  accessToken: string;
}

interface IFacebook {
  informParent: Function;
}

const Facebook = ({ informParent }: IFacebook) => {
  const responseFacebook = (response: FacebookLoginResponse) => {
    console.log(response)
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/facebook-login`,
      data: { userID: response.userID, accessToken: response.accessToken }
    })
      .then(response => {
        console.log('FACEBOOK SIGNIN SUCCESS', response)
        // inform parent component
        informParent(response)
      })
      .catch(error => {
        console.log('FACEBOOK SIGNIN ERROR', error.response)
      })
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps: any) => (
          <Button onClick={renderProps.onClick} variant="contained" sx={{
            background: '#3b5998', color: '#fff'
          }}>Login with Facebook</Button>
        )}
      />
    </div>
  )
}

export default Facebook

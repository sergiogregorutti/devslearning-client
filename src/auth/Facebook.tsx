import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import axios from 'axios'
import { Button } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'

interface FacebookLoginResponse {
  userID: string;
  accessToken: string;
}

interface IFacebook {
  action: String;
  informParent: Function;
}

const Facebook = ({ action, informParent }: IFacebook) => {
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
    <div style={{ marginTop: '15px' }}>
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
        autoLoad={false}
        callback={responseFacebook}
        render={(renderProps: any) => (
          <Button onClick={renderProps.onClick} variant="contained" sx={{
            background: '#3b5998',
            color: '#fff',
            position: 'relative',
            textAlign: 'center',
            width: '100%',
            paddingLeft: '42px',
            ':hover': {
              backgroundColor: '#4767a9'
            },
            ' svg': {
              position: 'absolute',
              top: '9px',
              left: '11px'
            }
          }}>
            <FacebookIcon />
            {action} with Facebook
          </Button>
        )}
      />
    </div>
  )
}

export default Facebook

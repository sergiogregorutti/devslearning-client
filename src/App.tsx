import Layout from './core/Layout'
import { useTheme } from '@mui/material/styles'
import { Container, Grid, Typography, Button, useMediaQuery } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const App = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('sm'))

  return (
    <Layout>
      <Grid container justifyContent="center" spacing={2} sx={{
        paddingTop: '40px',
        paddingBottom: '40px',
        flexDirection: { xs: 'column-reverse', sm: 'row' },
        alignItems: { xs: 'center', sm: 'normal' }
      }}>
        <Grid item sm={6} sx={{
          paddingLeft: { xs: '0 !important', sm: '16px !important' },
          paddingTop: { xs: '0 !important', sm: '16px !important' },
          display: { xs: 'block', sm: 'flex' },
          alignItems: { xs: 'top', sm: 'center' }
        }}>
          <Container sx={{
            padding: { sm: '0 !important' }
          }}>
            <Typography variant="h1" component="div" sx={{ fontSize: { xs: '34px', lg: '63px' } }}>
              Welcome to
            </Typography>
            <img src="/img/logo.svg" style={{ width: '78%' }} />
            <Typography variant="subtitle1" gutterBottom component="div" sx={{ marginTop: '-5px', fontSize: { xs: '16px', sm: '18px', lg: '20px' } }}>
              Course directory for developers.
            </Typography>
            <Button variant="outlined" component={RouterLink} to="/categories" sx={{
              marginTop: '20px'
            }}>Browse courses</Button>
          </Container>
        </Grid>
        <Grid item sm={6} sx={{
          paddingLeft: { xs: '0 !important', lg: '16px !important' },
          paddingTop: { xs: '0 !important', lg: '16px !important' }
        }}>
          {matches ? <img src="/img/home_img.svg" /> : <img src="/img/home_img.svg" style={{ height: '220px', marginBottom: '20px', marginTop: '-25px' }} />}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default App

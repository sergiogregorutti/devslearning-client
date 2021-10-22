import Layout from './core/Layout'
import { Grid, Typography } from '@mui/material'

const App = () => {
  return (
    <Layout>
      <Grid container justifyContent="center" spacing={2} sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <Grid item lg={6}>
          <Typography variant="h1" component="div" sx={{ fontSize: '48px' }}>
            Welcome to
          </Typography>
          <img src="/img/logo.svg" style={{ marginTop: '12px' }} />
          <Typography variant="subtitle1" gutterBottom component="div">
            Course directory for developers.
          </Typography>
        </Grid>
        <Grid item lg={6}>
          <img src="/img/home_img.svg" />
        </Grid>
      </Grid>
    </Layout>
  )
}

export default App

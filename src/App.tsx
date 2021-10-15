import Layout from './core/Layout'
import Typography from '@mui/material/Typography'

const App = () => {
  return (
    <Layout>
      <Typography variant="h1" component="div" sx={{ textAlign: 'center' }}>
        Welcome to DevsLearning!
      </Typography>
      <Typography variant="subtitle1" gutterBottom component="div" sx={{ textAlign: 'center' }}>
        Course directory for developers.
      </Typography>
    </Layout>
  )
}

export default App

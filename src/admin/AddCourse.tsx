import React, { useState, useEffect } from 'react'
import Layout from '../core/Layout'
import { isAuth } from '../auth/helpers'
import { Link as RouterLink } from 'react-router-dom'
import { createCourse, getCategories } from './api'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Grid, Typography, TextField, Button, MenuItem, FormControl, InputLabel, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material'
import Select from '@mui/material/Select'

const AddProduct = () => {
  const [values, setValues] = useState<any>({
    name: '',
    description: '',
    platform: '',
    author: '',
    pricing: '',
    price: '',
    categories: [],
    category: '',
    photo: '',
    year: '',
    link: '',
    redirectToProfile: false,
    formData: ''
  })

  const { token } = isAuth()
  const {
    name,
    description,
    platform,
    author,
    pricing,
    price,
    category,
    categories,
    year,
    link,
    formData
  } = values

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        toast.error('Error loading categories')
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData()
        })
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handleChange = (name: string) => (event: any) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    createCourse(token, formData).then(data => {
      if (data.error) {
        toast.error('Please, fill all fields')
      } else {
        setValues({
          ...values,
          name: '',
          description: '',
          platform: '',
          author: '',
          photo: '',
          pricing: '',
          year: '',
          link: '',
          price: ''
        })
        toast.success('Course is created')
      }
    })
  }

  const newCourseForm = () => (
    <form onSubmit={clickSubmit}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={10}>
          <FormControl fullWidth variant="standard" margin="dense">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              label="Category"
              value={category}
              onChange={handleChange('category')}
            >
              {categories &&
              categories.map((c: any, i: number) => (
                <MenuItem key={i} value={c._id}>{c.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField fullWidth onChange={handleChange('photo')} type="file" name="photo" label="Photo" variant="standard" margin="dense" />
          <TextField fullWidth onChange={handleChange('name')} type="text" name="name" value={name} label="Name" variant="standard" margin="dense" />
          <TextField fullWidth multiline onChange={handleChange('description')} type="text" name="description" value={description} label="Description" variant="standard" margin="dense" />
          <TextField fullWidth onChange={handleChange('platform')} type="text" name="platform" value={platform} label="Platform" variant="standard" margin="dense" />
          <TextField fullWidth onChange={handleChange('author')} type="text" name="author" value={author} label="Author" variant="standard" margin="dense" />
          <FormControl component="fieldset" margin="dense">
            <FormLabel component="legend">Pricing</FormLabel>
            <RadioGroup row aria-label="pricing" name="pricing" onChange={handleChange('pricing')} value={pricing}>
              <FormControlLabel value="free" control={<Radio />} label="Free" />
              <FormControlLabel value="one-time-payment" control={<Radio />} label="One Time Payment" />
              <FormControlLabel value="subscription" control={<Radio />} label="Subscription" />
            </RadioGroup>
          </FormControl>
          <TextField fullWidth onChange={handleChange('price')} type="number" name="price" value={price} label="Price" variant="standard" margin="dense" />
          <TextField fullWidth onChange={handleChange('year')} type="number" name="year" value={year} label="Year" variant="standard" margin="dense" />
          <TextField fullWidth onChange={handleChange('link')} type="text" name="link" value={link} label="Link" variant="standard" margin="dense" />

          <div style={{ marginTop: '20px' }}>
            <Button type="submit" variant="contained" sx={{
              marginRight: '15px'
            }}>Create</Button>
            <Button
              variant="outlined"
              component={RouterLink}
              to={'/'}
            >
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  )

  return (
    <Layout>
      <ToastContainer />

      <Grid container justifyContent="center" spacing={2}>
        <Grid item lg={6}>
          <Typography variant="h1" component="div" gutterBottom sx={{ textAlign: 'center', marginBottom: '40px' }}>
            Create Course
          </Typography>
          {newCourseForm()}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AddProduct

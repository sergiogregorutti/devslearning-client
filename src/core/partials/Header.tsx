import { useState, useEffect } from 'react'
import { Container, AppBar, Toolbar, Button, IconButton, Drawer } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom'
import { isAuth, signout } from '../../auth/helpers'

interface IMenuItem {
  label: string;
  href: string;
  callback?: Function;
}

interface HeaderProps {
  history: RouteComponentProps['history'];
}

const generateHeadersData = (history: RouteComponentProps['history']) => {
  const headersData: IMenuItem[] = []
  if (!isAuth()) {
    headersData.push({
      label: 'Signin',
      href: '/signin'
    })
    headersData.push({
      label: 'Signup',
      href: '/signup'
    })
  }
  if (isAuth() && isAuth().role === 'admin') {
    headersData.push({
      label: isAuth().name,
      href: '/admin'
    })
  }
  if (isAuth() && isAuth().role === 'subscriber') {
    headersData.push({
      label: isAuth().name,
      href: '/private'
    })
  }
  if (isAuth()) {
    headersData.push({
      label: 'Signout',
      href: '',
      callback: () => {
        signout(() => {
          history.push('/')
        })
      }
    })
  }
  return headersData
}

export default function Header ({ history }: HeaderProps) {
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false
  })
  const [headersData, setHeadersData] = useState<IMenuItem[]>([])

  const { mobileView, drawerOpen } = state

  useEffect(() => {
    setHeadersData(generateHeadersData(history))

    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }))
    }

    setResponsiveness()

    window.addEventListener('resize', () => setResponsiveness())

    return () => {
      window.removeEventListener('resize', () => setResponsiveness())
    }
  }, [])

  const displayDesktop = () => {
    return (
      <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        {devsLearningLogo}
        <div>{getMenuButtons()}</div>
      </Toolbar>
    )
  }

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }))
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }))

    return (
      <Toolbar>
        <IconButton
          {...{
            edge: 'start',
            color: 'inherit',
            'aria-label': 'menu',
            'aria-haspopup': 'true',
            onClick: handleDrawerOpen
          }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          {...{
            anchor: 'left',
            open: drawerOpen,
            onClose: handleDrawerClose
          }}
        >
          <div>{getDrawerChoices()}</div>
        </Drawer>

        <div>{devsLearningLogo}</div>
      </Toolbar>
    )
  }

  const devsLearningLogo = (
    <RouterLink to="/">
      <img height="34" src="/img/logo.png" />
    </RouterLink>
  )

  const getMenuButtons = () => {
    return headersData.map(({ label, href, callback }: IMenuItem) => {
      if (callback !== undefined) {
        return (
          <Button
            key={label}
            onClick={() => {
              callback()
            }}
          >
            {label}
          </Button>
        )
      } else {
        return (
          <Button
            key={label}
            {...{
              color: 'inherit',
              to: href,
              component: RouterLink
            }}
          >
            {label}
          </Button>
        )
      }
    })
  }

  const getDrawerChoices = () => {
    if (headersData) {
      return headersData.map(({ label, href, callback }) => {
        if (callback !== undefined) {
          return (
            <Button
              key={label}
              onClick={() => {
                callback()
              }}
            >
              {label}
            </Button>
          )
        }

        return (
          <Button
            key={label}
            component={RouterLink}
            to={href}
          >
            {label}
          </Button>
        )
      })
    }
  }

  return (
    <header>
      <AppBar sx={{
        backgroundColor: '#fff'
      }}>
        <Container>
          {mobileView ? displayMobile() : displayDesktop()}
        </Container>
      </AppBar>
    </header>
  )
}

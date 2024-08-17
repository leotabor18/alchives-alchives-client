import { faAddressBook, faBell, faGear, faSignIn, faSignOut, faUser, faUserGraduate } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Badge, Box, IconButton, Tooltip } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Container, Toolbar, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import ccaLogo from '../../assets/images/cca-logo-name.png';
import useResponsive from '../../hooks/useResponsive';
import { createNavigationBarMenu } from '../../utility';
import DropDownMenu from '../drop-down-menu';
import useStyles from './styles';
import SearchBar from '../search-bar';
import { AuthContext } from '../../context/AuthContext';
import { LOGOUT } from '../../reducer/AuthReducer';

const NAVIGATION_BAR_MENU = [
  createNavigationBarMenu('Settings', '/portal/settings', <FontAwesomeIcon icon={faGear} size="lg" />),
  createNavigationBarMenu('Logout', '/portal', <FontAwesomeIcon icon={faSignOut} size="lg" />)
]

const MOBILE_NAVIGATION_BAR_MENU = [
  createNavigationBarMenu('Alumni', '/portal/alumni', <FontAwesomeIcon icon={faUserGraduate} size="lg" />),
  createNavigationBarMenu('Programs', '/portal/programs', <FontAwesomeIcon icon={faAddressBook} size="lg" />),
  createNavigationBarMenu('Notifications', '/portal/notifications', <FontAwesomeIcon icon={faBell} size="lg" />),
  createNavigationBarMenu('Settings', '/portal/settings', <FontAwesomeIcon icon={faGear} size="lg" />),
  createNavigationBarMenu('Logout', '/portal', <FontAwesomeIcon icon={faSignOut} size="lg" />)
]

const PROFILE_MENU = [
  createNavigationBarMenu('Profile', '/portal/profile', <FontAwesomeIcon icon={faUser} size="lg" />),
  createNavigationBarMenu('Settings', '/portal/profile/settings', <FontAwesomeIcon icon={faGear} size="lg" />),
  createNavigationBarMenu('Logout', '/portal', <FontAwesomeIcon icon={faSignOut} size="lg" />)
]

const PUBLIC_MENU = [
  createNavigationBarMenu('Programs', '/programs', <FontAwesomeIcon icon={faAddressBook} size="lg" />),
  createNavigationBarMenu('Alumni', '/alumni', <FontAwesomeIcon icon={faUserGraduate} size="lg" />),
  createNavigationBarMenu('Portal Login', '/portal', <FontAwesomeIcon icon={faSignIn} size="lg" />)
]

const NOTICATION = [
  
];

const NavigationBar = (props) => {
  const { isProfile, isPublic } = props;
  const authContext = useContext(AuthContext);

  const classes = useStyles();
  const { isMobileView, isResponsive, isTabletView } = useResponsive();

  const menu = isProfile ? PROFILE_MENU : isResponsive ? MOBILE_NAVIGATION_BAR_MENU :  NAVIGATION_BAR_MENU;

  const history = useHistory();

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNotif, setAnchorElNotif] = useState(null);
  const [anchorElPublic, setAnchorElPublic] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenNotification = (event) => {
    setAnchorElNotif(event.currentTarget);
  };

  const handleOpenPublicMenu = (event) => {
    setAnchorElPublic(event.currentTarget);
  }

  const handleClosenNotification = (event) => {
    setAnchorElNotif(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClosePublicMenu = () => {
    setAnchorElPublic(null);
  };

  const handleProfileItemClick = (path) => {
    setAnchorElUser(null);

    if (path === '/portal') {
      signOut();
    }
    history.push(path)
  }

  const signOut = () => {
    authContext.dispatch({
      type : LOGOUT
    });
  }


  const handlePublicItemClick = (path) => {
    setAnchorElPublic(null);
    history.push(path)
  }

  const handleNotificationItemClick = (path) => {
    console.log('handleNotificationItemClick')
  }

  const handleHome = () => {
    history.push('/')
    console.log('first')
  }

  return (
    <AppBar position="static" color='transparent'>
      <Container className={classes.appBarContainer} >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href='/'
            onClick={handleHome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <img onClick={handleHome} className={classes.logo} src={ccaLogo} alt='CCA Logo' />
          </Typography>
          <Typography
            variant="h5"
            noWrap
            href='/'
            component="a"
            onClick={handleHome}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
             <img onClick={handleHome} className={classes.mLogo} src={ccaLogo} alt='CCA Logo' />
          </Typography>
          {
            isPublic && (!isMobileView && !isTabletView ) ?
              <Typography
                variant="h3"
                noWrap
                className={classes.headerTitle}
              >
                ALUMNI
              </Typography>
            :
            <></>
          }
          {
            isPublic ?
              <Box className={classes.menuContainer} sx={{ flexGrow: 0 }}>
                {
                  (!isMobileView && !isTabletView ) ?
                    <SearchBar />
                  :
                    <></>
                }
                <Tooltip title="Profile settings">
                  <IconButton onClick={handleOpenPublicMenu} sx={{ p: 0 }}>
                    <MenuIcon className={classes.buttonIcon} alt="Menu" fontSize='large' />
                  </IconButton>
                </Tooltip>
              </Box>
            :
              <Box sx={{ flexGrow: 0 }}>
                {/* <Tooltip title="Notifications">
                  <IconButton
                    size='medium'
                    aria-label={`show ${NOTICATION.length} new notifications`}
                    color="primary"
                    onClick={handleOpenNotification}
                    className={isProfile ? classes.hidden : isMobileView ? classes.mNotificationIcon : classes.notificationIcon}
                  >
                    <Badge overlap='rectangular' badgeContent={NOTICATION.length} color="error">
                      <NotificationsIcon className={classes.buttonIcon} fontSize='large'/>
                    </Badge>
                  </IconButton>
                </Tooltip> */}
                <Tooltip title="Profile settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {
                      isMobileView ? 
                        <MenuIcon className={classes.buttonIcon} alt="Menu" fontSize='large' />
                      :
                        <AccountCircleIcon className={classes.buttonIcon} alt="Profile" fontSize='large' />
                    }
                  </IconButton>
                </Tooltip>
              </Box>
          }
            <DropDownMenu
              menu={menu} 
              anchorEl={anchorElUser}
              handleCloseMenu={handleCloseUserMenu}
              handleItemClick={handleProfileItemClick}
            />
            <DropDownMenu
              menu={NOTICATION} 
              handleCloseMenu={handleClosenNotification} 
              handleItemClick={handleNotificationItemClick}
              anchorEl={anchorElNotif}
            />
            <DropDownMenu
              menu={PUBLIC_MENU} 
              handleCloseMenu={handleClosePublicMenu} 
              handleItemClick={handlePublicItemClick}
              anchorEl={anchorElPublic}
            />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default NavigationBar
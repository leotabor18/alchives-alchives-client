import { faAddressBook, faCalendar, faFolderOpen, faSchool, faUserGraduate, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import backgroundImage from '../../assets/images/angeles-symbol.png';
import useResponsive from '../../hooks/useResponsive';
import { createNavigationBarMenu } from '../../utility';
import NavigationBar from '../navigation-bar';
import useStyles from './styles';

const MENU = [
  createNavigationBarMenu('Alumni', '/portal/alumni', <FontAwesomeIcon icon={faUserGraduate} size="lg" />),
  createNavigationBarMenu('Programs', '/portal/programs', <FontAwesomeIcon icon={faAddressBook} size="lg" />),
  createNavigationBarMenu('Graduation Events', '/portal/events', <FontAwesomeIcon icon={faCalendar} size="lg" />),
  createNavigationBarMenu('School Personnels', '/portal/personnel', <FontAwesomeIcon icon={faUserGroup} size="lg" />),
  createNavigationBarMenu('Content Management', '/portal/content-management', <FontAwesomeIcon icon={faFolderOpen} size="lg" />),
  // createNavigationBarMenu('School Overview', '/portal/school-overview', <FontAwesomeIcon icon={faSchool} size="lg" />)
]

const PortalLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const history = useHistory();
  
  const { pathname } = history.location;

  const [selectedIndex, setSelectedIndex] = useState(null);

  const { isMobileView, isTabletView } = useResponsive();

  const responsive = isMobileView || isTabletView;
  const handleListItemClick = (index, path) => {
    setSelectedIndex(index);
    history.push(path)
  }

  const isProfile = pathname.includes('profile');

  useEffect(() => {
    let title = 'Settings';
    let index = 5;

    if (pathname.includes('alumni')) {
      index = 0;
      title = 'Alumni';
    } else if (pathname.includes('programs')) {
      index = 1;
      title = 'Programs';
    } else if (pathname.includes('events')) {
      title = 'Events';
      index = 2;
    } else if (pathname.includes('personnel')) {
      title = 'School Personnels';
      index = 3;
    } else if (pathname.includes('content-management')) {
      title = 'Content Management';
      index = 4;
    } else if (pathname.includes('overview')) {
      title = 'Overview';
      index = 5;
    } else if (pathname.includes('profile')) {
      title = 'Profile';
    }

    setSelectedIndex(index);
    document.title = `Yearbook Management - ${title}`;

  }, [pathname]);

  return (
    <> 
      <NavigationBar isProfile={isProfile}/>
      <Drawer
        variant="permanent"
        open={true}
        className={responsive || isProfile ? classes.mDrawer : classes.drawer}
      >
        <List className={classes.list}>
          {
            MENU.map((item, index) => (
              <div key={'box-panel-' + index}>
                <Box className={`menu-list-${index}`}>
                  <Tooltip title={item.name}>
                    <ListItem
                      id={item.name}
                      key={index}
                      button
                      selected={selectedIndex === index}
                      onClick={() => handleListItemClick(index, item.path)}
                      >
                      <ListItemIcon>
                        {
                          item.icon
                        }
                      </ListItemIcon>
                      <ListItemText primary={item.name}/>
                    </ListItem>
                  </Tooltip>
                </Box>
                <Divider />
              </div>
            ))
          }
        </List>
      </Drawer>
      <main>
        <Box className={isProfile ? classes.profileMain : responsive ? classes.mMain : classes.main}> 
          <img className={responsive ? classes.mContentBackground : classes.contentBackground} src={backgroundImage} />
          <Box className={responsive ? '' : classes.content}> 
            {
              children
            }
          </Box>
        </Box>
      </main>
    </>
  )
}

export default PortalLayout
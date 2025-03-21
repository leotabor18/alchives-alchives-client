import { Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from '../components/auth-layout';
import MainLayout from '../components/main-layout';
import PortalLayout from '../components/portal-layout';
import ActivateAccount from '../pages/activate-account';
import Alumni from '../pages/alumni';
import Alumnus from '../pages/alumnus';
import Error404 from '../pages/error-404';
import ForgotPassword from '../pages/forgot-password';
import Login from '../pages/login';
import NewPassword from '../pages/new-password';
import Notification from '../pages/notification';
import Notifications from '../pages/notifications';
import Profile from '../pages/profile';
import ProfileSetting from '../pages/profile-settings';
import Programs from '../pages/programs';
import Settings from '../pages/settings';
import RoutesLayout from './RoutesLayout';
import PublicAlumni from '../pages/public-alumni';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import PublicPrograms from '../pages/public-programs';
import Program from '../pages/program';
import Events from '../pages/events';
import Personnels from '../pages/personnels';
import ContentManagements from '../pages/content-management';
import Overviews from '../pages/overviews';
import Personnel from '../pages/personnel';
import Overview from '../pages/overview';
import Event from '../pages/event';
import SystemAdmins from '../pages/system-admins';
import SystemAdmin from '../pages/system-admin';

const EnhancedSwitch = (props) => {
  const { children } = props

  return (
    <Switch>
      {
        children
      }
      <Route ><Redirect to="/" /></Route>
    </Switch>
  )
}

const Routes = () => {
  const { state } = useContext(AuthContext);
  const { token } = state;

  return (
    <Switch>
      
        {
          token && state.user.role === 'REGISTRAR' ?
          <>
            <Route exact path="/portal/" ><Redirect to="/portal/programs" /></Route>
            <Route exact path="/" ><Redirect to="/portal/programs" /></Route>
            <RoutesLayout exact layout={PortalLayout} path="/portal/programs" component={Programs} />
            <RoutesLayout exact layout={PortalLayout} path="/portal/programs/:id" component={Program} />
            {/* <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview" component={Overviews} />
            <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview/create" component={Overview} />
            <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview/:id" component={Overview} /> */}
          </>
          :
          token && state.user.role === 'ADMIN' ?
            <>
              <Route exact path="/portal/" ><Redirect to="/portal/alumni" /></Route>
              <Route exact path="/" ><Redirect to="/portal/alumni" /></Route>
              <RoutesLayout exact layout={PortalLayout} path="/portal/alumni" component={Alumni} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/alumni/:id" component={Alumnus} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/alumni/create" component={Alumnus} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/alumni/update/:id" component={Alumnus} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/programs" component={Programs} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/programs/:id" component={Program} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/notifications" component={Notifications} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/notifications/:id" component={Notification} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/settings" component={Settings} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/profile" component={Profile} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/profile/settings" component={ProfileSetting} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/events" component={Events} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/events/create" component={Event} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/events/:id" component={Event} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/personnel" component={Personnels} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/personnel/create" component={Personnel} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/personnel/:id" component={Personnel} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/admins/create" component={SystemAdmin} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/admins/" component={SystemAdmins} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/admins/:id" component={SystemAdmin} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/content-management" component={ContentManagements} />
              {/* <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview" component={Overviews} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview/create" component={Overview} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview/:id" component={Overview} /> */}
            </>
          
          : token && state.user.role === 'ALUMNI' ?
            <>
              <RoutesLayout layout={MainLayout} exact path="/alumni" component={PublicAlumni} />
              <RoutesLayout layout={MainLayout} exact path="/" component={PublicPrograms} />
            </>
          :
            <EnhancedSwitch>
              <RoutesLayout exact layout={AuthLayout} path="/" component={Login} />
              <RoutesLayout exact layout={AuthLayout} path="/activate-account" component={ActivateAccount} />
              <RoutesLayout exact layout={AuthLayout} path="/forgot-password" component={ForgotPassword} />
              <RoutesLayout exact layout={AuthLayout} path="/new-password/:code" component={NewPassword} />
            </EnhancedSwitch>
        }
    </Switch>
  )
}


export default Routes;
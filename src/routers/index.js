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

const EnhancedSwitch = (props) => {
  const { children } = props

  return (
    <Switch>
      {
        children
      }
      <Route ><Redirect to="/portal" /></Route>
    </Switch>
  )
}

const Routes = () => {
  const { state } = useContext(AuthContext);
  const { token } = state;

  return (
    <Switch>
      <Route exact path="/"><Redirect to="/programs" /></Route>
      <RoutesLayout layout={MainLayout} exact path="/programs" component={PublicPrograms} />
      <RoutesLayout layout={MainLayout} exact path="/alumni" component={PublicAlumni} />
      
        {
          token ?
            <>
              <Route ><Redirect to="/portal/alumni" /></Route>
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
              <RoutesLayout exact layout={PortalLayout} path="/portal/events/create" component={Events} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/events/:id" component={Events} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/personnel" component={Personnels} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/personnel/create" component={Personnel} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/personnel/:id" component={Personnel} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/content-management" component={ContentManagements} />
              <RoutesLayout exact layout={PortalLayout} path="/portal/school-overview" component={Overviews} />
            </>
          : 
            <EnhancedSwitch>
              <RoutesLayout exact layout={AuthLayout} path="/portal" component={Login} />
              <RoutesLayout exact layout={AuthLayout} path="/portal/activate-account" component={ActivateAccount} />
              <RoutesLayout exact layout={AuthLayout} path="/portal/forgot-password" component={ForgotPassword} />
              <RoutesLayout exact layout={AuthLayout} path="/portal/new-password/:code" component={NewPassword} />
            </EnhancedSwitch>
        }
    </Switch>
  )
}


export default Routes;
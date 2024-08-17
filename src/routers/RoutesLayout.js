import React from 'react'
import { Route } from 'react-router-dom';

const RoutesLayout = (props) => {
  const { exact, component: Component, layout: Layout, path } = props;

  return (
    <Route
			exact={exact}
			path={path}
			render={(routeProps) =>
				<Layout {...props}>
					<Component {...routeProps}  />
				</Layout>
			}
		/>
  )
}

export default RoutesLayout
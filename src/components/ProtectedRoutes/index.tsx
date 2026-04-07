import * as React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface IProtectedRoutesProps {
}

const ProtectedRoutes: React.FunctionComponent<IProtectedRoutesProps> = (props) => {
  const isAuthenticated:boolean = false;
    const location = useLocation();

    return isAuthenticated ? 
        (<Outlet />) : 
        (<Navigate to='/login' state={{ from: location }}/>);
};

export default ProtectedRoutes;

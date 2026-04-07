import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar';
import UserList from '../userList';

interface ILayoutProps {
}

const Layout: React.FunctionComponent<ILayoutProps> = (props) => {
  return (
    <div className='w-full h-full flex bg-background'>
        <aside className='flex gap-x-4 bg-sidebar lg:w-60 h-full'>
            <Sidebar />
        </aside>
        <div className='w-full'>
            <Outlet />
        </div>
        <aside className='hidden lg:block bg-sidebar lg:w-60 h-full'>
            <UserList />
        </aside>
    </div>
  )
};

export default Layout;

import { cn } from '@/lib/utils';
import type { NavItem } from '@/types/types';
import { useState, type FunctionComponent } from 'react';
import { FaHome, FaRegPlusSquare, FaUser } from 'react-icons/fa';
import { IoIosNotifications, IoMdPhotos } from "react-icons/io";
import { IoLogOut, IoSend, IoSettingsSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MyButton from '../MyButton';
import { useUserAuth } from '@/context/userAuthContext';
import { toast } from 'react-toastify';

interface ISidebarProps {
}

const navItems: NavItem[] = [
  {
    name: 'Home',
    link: '/',
    icon: FaHome
  },
  {
    name: 'Add Photos',
    link: '/post',
    icon: FaRegPlusSquare
  },
  {
    name: 'My Photos',
    link: '/myphotos',
    icon: IoMdPhotos
  },
  {
    name: 'Profile',
    link: '/profile',
    icon: FaUser
  },
  {
    name: 'Notifications',
    link: '#',
    icon: IoIosNotifications
  },
  {
    name: 'Direct',
    link: '#',
    icon: IoSend
  },
  {
    name: 'Settings',
    link: '#',
    icon: IoSettingsSharp
  }
]

const Sidebar: FunctionComponent<ISidebarProps> = (props) => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const getClassName = (link: string): string => {
    return cn(pathname === link && 'bg-sidebar-primary text-sidebar-primary-foreground font-semibold', 'flex items-center gap-2 hover:bg-sidebar-primary-foreground hover:text-sidebar-primary py-2 px-4 rounded hover:scale-105 transition-all duration-300 ease-in-out')
  }


  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const handleSignOut = async () => {
      try {
          setIsSigningOut(true);
          logOut();
          toast.success("Signout successful");
          navigate("/login");
      } catch (error) {
          console.error(error);
          toast.error("Signout failed");
      } finally {
          setIsSigningOut(false);
      }
  }
  return (
    <nav className='flex flex-col h-full max-w-sm w-full px-2'>
      <div className='flex justify-center m-5'>
        <div className='text-primary font-extrabold text-xl'>SnapShot</div>
      </div>
      {navItems.map((item, index) => (
        <Link
          to={item.link}
          key={index}
          className={getClassName(item.link)}
        >
          <item.icon />
          <span>{item.name}</span>
        </Link>
      ))}
      <span
        onClick={handleSignOut}
        className={getClassName(' ')}
      >
        <IoLogOut />
        Signout</span>
    </nav>
  );
};

export default Sidebar;

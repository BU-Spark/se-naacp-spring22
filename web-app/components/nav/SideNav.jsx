import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import HomeIcon from '../icons/Home';
import UploadIcon from '../icons/Upload';
import ArticlesIcon from '../icons/Articles';
import CompareIcon from '../icons/Compare';
import DatabaseIcon from '../icons/Database';
import LogOutIcon from '../icons/LogOut';
import SideNavItem from './SideNavItem';
import AppContext from '../../data/context/AppContext';
import authenticationservice from '../../services/authenticationservice';

export default function SideNav() {
  const router = useRouter();

  const { signOut, isSignedIn } = useContext(AppContext);

  const handleLogout = async () => {
    authenticationservice
      .logOut()
      .then(() => {
        router.push('/');
        signOut();
      })
      .catch(() => { });
  };

  return (
    <div className="hidden sm:flex flex-col top-0 left-0 w-20 bg-gray-300 h-screen pt-10 z-10">
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul className="space-y-6">
          <li>
            <SideNavItem title="Home" link="/" isActive={router.pathname === '/'}>
              <HomeIcon isActive={router.pathname === '/'} />
            </SideNavItem>
          </li>
          {isSignedIn && (
            <>
              <li>
                <SideNavItem title="Articles" link="/articles" isActive={router.asPath.startsWith('/articles')}>
                  <ArticlesIcon isActive={router.asPath.startsWith('/articles')} />
                </SideNavItem>
              </li>
              <li>
                <SideNavItem title="Upload" link="/upload" isActive={router.asPath.startsWith('/upload')}>
                  <UploadIcon isActive={router.asPath.startsWith('/upload')} />
                </SideNavItem>
              </li>
            </>
          )}
        </ul>
      </div>
      {isSignedIn && (
        <div className="text-center pb-8 pt-4">
          <button onClick={handleLogout} className="h-full" type="button">
            <div className="">
              <LogOutIcon />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

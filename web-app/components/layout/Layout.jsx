import React from 'react';

import Header from '../nav/Header';
import Footer from './Footer';
import SiderNav from '../nav/SideNav';

export default function Layout({ children }) {
  return (
    <div className="flex">
      <SiderNav />
      <main className="w-full">
        <Header />
        {children}
        <Footer />
      </main>
    </div>
  );
}

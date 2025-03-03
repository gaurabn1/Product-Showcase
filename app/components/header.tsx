"use client"

import React, { useState } from 'react';
import Button from './ui/Button';
import { useRouter, usePathname } from 'next/navigation';
import { ModeToggle } from './mode-toggle';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { FaHome, FaInfoCircle, FaBoxes, FaPhone } from 'react-icons/fa';

interface HeaderNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Header = () => {

  const navigate = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: HeaderNavItem[] = [
    { label: 'Home', href: '/', icon: <FaHome /> },
    { label: 'Products', href: '/products', icon: <FaBoxes /> },
    { label: 'About', href: '/about', icon: <FaInfoCircle /> },
    { label: 'Contact', href: '/contact', icon: <FaPhone /> },
  ]

  return (
    <header className="flex items-center justify-between p-4 border-b-2 border-opacity-20  sticky top-0 z-50 bg-background">
      <div className="logo">
        <Link href="/">
          <svg width="40" height="40" viewBox="0 0 49 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M37.3947 40C43.8275 39.8689 49 34.6073 49 28.1389C49 24.9931 47.7512 21.9762 45.5282 19.7518L25.7895 0V12.2771C25.7895 14.3303 26.6046 16.2995 28.0556 17.7514L32.6795 22.3784L32.6921 22.3907L40.4452 30.149C40.697 30.4009 40.697 30.8094 40.4452 31.0613C40.1935 31.3133 39.7852 31.3133 39.5335 31.0613L36.861 28.3871H12.139L9.46655 31.0613C9.21476 31.3133 8.80654 31.3133 8.55476 31.0613C8.30297 30.8094 8.30297 30.4009 8.55475 30.149L16.3079 22.3907L16.3205 22.3784L20.9444 17.7514C22.3954 16.2995 23.2105 14.3303 23.2105 12.2771V0L3.47175 19.7518C1.24882 21.9762 0 24.9931 0 28.1389C0 34.6073 5.17252 39.8689 11.6053 40H37.3947Z" fill="#FF0A0A"></path>
          </svg>
        </Link>
      </div>
      {/* Mobile Menu Toggle */}
      <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-4 space-x-4 leading-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <button className={`hover:underline ${pathname === item.href ? 'font-bold' : ''}`} onClick={() => navigate.push(item.href)}>{item.label}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="absolute top-16 left-0 w-full bg-background p-4 shadow-lg md:hidden">
          <ul className="flex flex-col gap-4 items-center text-center">
            {navItems.map((item) => (
              <li key={item.href} className="w-fit">
                <button className={`${pathname === item.href ? 'font-bold' : ''}`} onClick={() => { navigate.push(item.href); setIsMenuOpen(false); }}>
                  <div className="flex gap-2">
                    {item.icon}{item.label}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <div className="lg:flex gap-3 hidden">
        <ModeToggle />
        <div className='hidden md:block'>
          <Button variant="primary" onClick={() => navigate.push('/contact')}>Get In Touch</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

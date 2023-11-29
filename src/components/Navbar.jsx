import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavbarLogo from '../Assets/NavbarLogo.png';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../store/cartSlice';
import '../Styles/Navbar.css';
const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

const Navbar = () => {  // Removed the prop here
  const cartItemCount = useSelector(selectCartItemsCount); 

  return (
    <>
    <motion.nav className="navbar">
    
      {['/home', '/about', '/product', '/cart'].map((path, index) => {
        const label = ['Home', 'About Us', 'Products', 'My Bag'][index];
        return (
          <motion.div variants={linkVariants} key={path}>
            <Link to={path}>
              {label}
              {path === '/cart' && cartItemCount > 0 && (
                <span>({cartItemCount})</span> 
              )}
            </Link>
          </motion.div>
        );
      })}
    </motion.nav>
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Styles/Header.css'; 
import NavbarLogo from '../Assets/NavbarLogo.png';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';
import Navbar from './Navbar'; 
import '../Styles/hero-section.css';
import '../Styles/card.css'
import '../Styles/Featured.css'
const Header = () => {
  const logoVariants = {
    hidden: { opacity: 0, y: -200 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const colors = ['#1C1D21', '#353537', '#884242', '#360f0f', '#2b0a3e']; 
  const textVariants = [
    'Welcome to our store',
    'Discover Amazing Products',
    'Quality Items, Great Prices',
    'Your One-Stop Shop',
    'Experience the Difference'
  ];

  const imageAnimate = {
    offscreen: { x: -100, opacity: 0 },
    onscreen: {
      x: 0,
      opacity: 1,
      rotate: [0, 10, 0],
      transition: { type: "spring", bounce: 0.4, duration: 1 }
    }
  };

  const textAnimate = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 1 }
    }
  };


  const featuredVariants = {
    offscreen: { opacity: 0, y: -100 },
    onscreen: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, type: "spring", bounce: 0.4 } 
    }
  };
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState([]);


  const dispatch = useDispatch();

  const cartItemCount = useSelector(selectCartItemsCount); 

  
  const handleAddToCart = (product) => {
    dispatch(add(product));
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex(current => (current + 1) % textVariants.length); 
    }, 4000);

    return () => clearInterval(intervalId);
  }, [textVariants.length]);

  const getRandomPrice = () => {
    const minPrice = 10;
    const maxPrice = 100; 
    return `$${(Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2)}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const productsWithPrice = data.slice(0, 6).map(product => ({
        ...product,
        price: getRandomPrice()
      }));
      setProducts(productsWithPrice);
    };

    fetchData();
  }, []);

  const motionProps = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, y: [0, -10, 0] },
    transition: { type: 'spring', stiffness: 100, damping: 10, repeat: Infinity, repeatType: "reverse", duration: 2 }
  };

  return (
    <>
      <div className="container">
      

        <section className="hero-section">
          <motion.h1
            {...motionProps}
            style={{ color: colors[index] }}
          >
            {textVariants[index]}
          </motion.h1>
          <motion.h4
            {...motionProps}
            initial={{ ...motionProps.initial, x: 100 }}
            transition={{ ...motionProps.transition, delay: 0.2 }}
            style={{ color: colors[index] }}
          >
            Buy everywhere with Moh Store
          </motion.h4> 
        </section>
      </div>  

      <motion.div className="Featured"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.5 }}
    >
      <motion.h1 variants={featuredVariants}>
        Featured Products
      </motion.h1>
      <motion.p variants={featuredVariants}>
        Our top selling products
      </motion.p>
      <motion.button variants={featuredVariants}>
        View All
      </motion.button>
     </motion.div>

     
      <div  className="container-image">
      {products.map((product) => (
       
        <motion.div className="card" key={product.id}
          initial={"offscreen"}
          whileInView={"onscreen"}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ staggerChildren: 0.5 }}
        >
          <motion.div className="image-container"
            variants={imageAnimate}
          >
            <img src={product.image} alt={product.title} />
          </motion.div>
          <motion.h2 
            variants={textAnimate}
          >
            {product.title}
            </motion.h2>
          <motion.p
            variants={textAnimate}     
          >
             {product.price}
          </motion.p>
          <motion.button
              variants={textAnimate} 
              className='Card-btn'
              onClick={() => handleAddToCart(product)} 

          >
            Add To Cart
          </motion.button>
        </motion.div>
        
      ))}
      </div>
      
    </>
  );
};

export default Header;

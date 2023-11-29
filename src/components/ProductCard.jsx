import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../Styles/ProductsCard.css'; 
import NavbarLogo from '../Assets/NavbarLogo.png';
import { useSelector } from 'react-redux';
import { selectCartItemsCount } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { add } from '../store/cartSlice';


const ProductCard = () => {
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
  const dispatch = useDispatch();
  const cartItemCount = useSelector(selectCartItemsCount);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 100 }); 
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
      const productsWithPrice = data.slice(0, 25).map(product => ({
        ...product,
        price: getRandomPrice()
      }));
      setProducts(productsWithPrice);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesCategory = categoryFilter ? product.category === categoryFilter : true;
      const price = parseFloat(product.price.replace('$', ''));
      const matchesPrice = price >= priceFilter.min && price <= priceFilter.max;
      return matchesCategory && matchesPrice;
    });

    setFilteredProducts(filtered);
  }, [products, categoryFilter, priceFilter]);


  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handlePriceChange = (min, max) => {
    setPriceFilter({ min, max });
  };
  const motionProps = {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1, y: [0, -10, 0] },
    transition: { type: 'spring', stiffness: 100, damping: 10, repeat: Infinity, repeatType: "reverse", duration: 2 }
  };

  return ( 
    <>
    <div className='container-title-ProductCard'>
      <h1>Discover Exceptional Products</h1>
      <h4>Quality and Variety at Your Fingertips</h4>
      <p>Explore our exclusive collection of clothing, electronics, and accessories.</p>
      <button>Shop Now</button>
    </div>
        <div className='container-filter Categories'>
        <select value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
        </div>
      <div className='container-filter Price'>
        <input type="number" value={priceFilter.min} onChange={(e) => handlePriceChange(e.target.value, priceFilter.max)} />
        <input type="number" value={priceFilter.max} onChange={(e) => handlePriceChange(priceFilter.min, e.target.value)} />
      </div>

    <div  className="container-image">
      {filteredProducts.map((product) => (
       
       <motion.div className={`card ${product.category.replace(/\s/g, '-')}`} key={product.id}
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
}
 
export default ProductCard;
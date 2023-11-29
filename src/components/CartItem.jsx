import React from 'react';
import { motion } from 'framer-motion';
import { remove } from '../store/cartSlice'; 
import { useSelector, useDispatch } from 'react-redux';
import { loadCart } from '../store/cartSlice';

const itemVariants = {
  offscreen: { x: -100, opacity: 0 },
  onscreen: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 1 }
  }
};

const motionProps = {
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1, y: [0, -10, 0] },
  transition: { type: 'spring', stiffness: 100, damping: 10, repeat: Infinity, repeatType: "reverse", duration: 2 }
};

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


const CartItem = ({ item }) => {
  if (!item) return null;
  const dispatch = useDispatch();
  const handleRemoveFromCart = () => {
    dispatch(remove(item.id)); 
  };
  return (
    <>
     <motion.div className="Featureds" initial="offscreen" whileInView="onscreen" viewport={{ once: false, amount: 0.5 }}>
        <motion.h1 variants={featuredVariants}>
          Nice to see you again
        </motion.h1>
        <motion.p variants={featuredVariants}>
          Review and manage the products in your cart.
        </motion.p>
        <motion.button variants={featuredVariants}>
          Checkout
        </motion.button>
      </motion.div>

      <div className="container-image">
        <motion.div className="card" key={item.id} initial={"offscreen"} whileInView={"onscreen"} viewport={{ once: false, amount: 0.5 }} transition={{ staggerChildren: 0.5 }}>
          <motion.div className="image-container" variants={imageAnimate}>
            <img src={item.image} alt={item.title} />
          </motion.div>
          <motion.h2 variants={textAnimate}>
            {item.title}
          </motion.h2>
          <motion.p variants={textAnimate}>
            Quantity: {item.quantity}
          </motion.p>
          <motion.p variants={textAnimate}>
            Price: {item.price}
          </motion.p>
          <motion.button variants={textAnimate} className='Card-btn' onClick={handleRemoveFromCart}>
            Remove From Cart
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default CartItem;

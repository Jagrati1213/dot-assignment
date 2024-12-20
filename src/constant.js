import { FaHome, FaShoppingCart, FaHeart } from "react-icons/fa";
import { Link } from "react-router";

export const MENU_ITEMS = [
  {
    key: "home",
    icon: <FaHome size={16} />,
    label: <Link to="/">Dashboard</Link>,
  },
  {
    key: "products",
    icon: <FaShoppingCart size={16} />,
    label: <Link to="/products">Products</Link>,
  },
  {
    key: "favorites",
    icon: <FaHeart size={16} />,
    label: <Link to="/favorites">Favorites</Link>,
  },
];

export const PRODUCT_CATEGORY = [
  {
    category: "electronics",
    color: "purple",
  },
  {
    category: "jewelery",
    color: "magenta",
  },
  {
    category: "men's clothing",
    color: "orange",
  },
  {
    category: "women's clothing",
    color: "geekblue",
  },
];

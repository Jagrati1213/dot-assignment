import React, { useEffect, useState } from "react";
import { Axios } from "../../global";
import { Button, message, Space, Table, Tag } from "antd";
import { FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import ProductDetailsModal from "../Modals/ProductDetailsModal";
import { PRODUCT_CATEGORY } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteAction,
  deleteFavoriteAction,
} from "../../store/slice/allFavoriteSlice";

export default function ProductsComponent() {
  const favoriteList = useSelector(
    (state) => state.favoriteListSlice.favoriteList
  );
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  const [singleProductData, setSingleProductData] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAllProductsLoading, setIsAllProductsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Table columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      filters: productsData.map((data) => ({
        text: data.title,
        value: data.title,
      })),
      onFilter: (value, record) => record.title.startsWith(value),
      filterSearch: true,
      render: (text) => {
        const updatedText = text.length > 20 ? `${text.slice(0, 20)}...` : text;
        return <p>{updatedText}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `₹${price}`,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating) => (rating ? rating?.rate : "N/A"),
    },
    {
      title: "Category",
      key: "category",
      dataIndex: "category",
      filters: PRODUCT_CATEGORY.map((cat) => ({
        text: cat.category,
        value: cat.category,
      })),
      onFilter: (value, record) => record.category.startsWith(value),
      filterSearch: true,
      render: (category) => {
        const color = PRODUCT_CATEGORY.find(
          (item) => item.category === category
        )?.color;
        return (
          <Tag color={color} key={category}>
            {category?.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={
              <FaEye
                size={20}
                color="#01949A"
                onClick={handleViewProduct.bind(null, record?.id)}
              />
            }
          />
          <Button
            type="text"
            icon={
              favoriteList?.some((f) => f.id === record?.id) ? (
                <FaHeart size={20} color="red" />
              ) : (
                <FaRegHeart size={20} color="red" />
              )
            }
            onClick={handleFavorite.bind(null, record?.id)}
          />
        </Space>
      ),
    },
  ];

  // Handle add & remove the product
  const handleFavorite = (id) => {
    const alreadyFavorite = favoriteList?.find((f) => f.id === id);
    const selectedFavorite = productsData?.find((d) => d.id === id);
    if (alreadyFavorite) {
      dispatch(deleteFavoriteAction(id));
      message.success("Product removed from favorite successfully!");
    } else {
      dispatch(addFavoriteAction(selectedFavorite));
      message.success("Product added in favorite successfully!");
    }
  };

  // /Handle view product details
  const handleViewProduct = async (id) => {
    setIsProductModalOpen(true);
    setIsLoading(true);
    try {
      const response = await Axios.get(`products/${id}`);
      setSingleProductData(response.data);
    } catch (error) {
      console.log("Error in single product details", error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle close the view modal
  const handleCloseViewModal = () => {
    setIsProductModalOpen(false);
    setSingleProductData(null);
  };

  // Handler for get all products
  const handleGetAllProducts = async () => {
    setIsAllProductsLoading(true);
    try {
      const response = await Axios.get("products");
      setProductsData(response.data);
    } catch (error) {
      console.log("Error in fetching all products", error?.message);
    } finally {
      setIsAllProductsLoading(false);
    }
  };

  // Called the fetch handler
  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <>
      {/* All Products Table */}
      <Table
        rowKey="id"
        columns={columns}
        dataSource={productsData}
        scroll={{ x: 1000, y: 500 }}
        title={() => (
          <p className="text-lg text-center font-semibold">All Products</p>
        )}
        loading={isAllProductsLoading}
      />

      {/* View Product Detail Modal */}
      <ProductDetailsModal
        isLoading={isLoading}
        ProductDetails={singleProductData}
        isModalOpen={isProductModalOpen}
        handleCancel={handleCloseViewModal}
      />
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Axios } from "../../global";
import { Button, Space, Table, Tag } from "antd";
import { FaEye, FaHeart } from "react-icons/fa";
import ProductDetailsModal from "../Modals/ProductDetailsModal";

export default function ProductsComponent() {
  const [productsData, setProductsData] = useState([]);
  const [singleProductData, setSingleProductData] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllProductsLoading, setIsAllProductsLoading] = useState(false);

  // Category
  const productCategory = [
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
      filters: productCategory.map((cat) => ({
        text: cat.category,
        value: cat.category,
      })),
      onFilter: (value, record) => record.category.startsWith(value),
      filterSearch: true,
      render: (category) => {
        const color = productCategory.find(
          (item) => item.category === category
        )?.color;
        return (
          <Tag color={color} key={category}>
            {category.toUpperCase()}
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
          <Button type="text" icon={<FaHeart size={20} color="#D10000" />} />
        </Space>
      ),
    },
  ];

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

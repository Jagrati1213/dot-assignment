import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Space, Table, Tag } from "antd";
import { FaHeart } from "react-icons/fa";
import { deleteFavoriteAction } from "../../store/slice/allFavoriteSlice";
import { PRODUCT_CATEGORY } from "../../constant";

export default function FavoritesComponent() {
  const favoriteList = useSelector(
    (state) => state.favoriteListSlice.favoriteList
  );
  const dispatch = useDispatch();
  const [allFavorites, setAllFavorites] = useState(favoriteList || []);

  // Table columns
  const columns = [
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
      render: (text) => {
        const updatedText = text.length > 20 ? `${text.slice(0, 20)}...` : text;
        return <p>{updatedText}</p>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
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
      render: (category) => {
        const color = PRODUCT_CATEGORY.find(
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
            icon={<FaHeart size={20} color="red" />}
            onClick={handleRemoveFavorite.bind(null, record?.id)}
          />
        </Space>
      ),
    },
  ];

  // Handle  remove the product
  const handleRemoveFavorite = (id) => {
    const updatedFavorite = allFavorites?.filter((d) => d.id !== id);
    setAllFavorites(updatedFavorite);

    // /Called the action
    dispatch(deleteFavoriteAction(id));
    message.success("Product removed from favorite successfully!");
  };
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={allFavorites}
      scroll={{ x: 1000, y: 500 }}
      title={() => (
        <p className="text-lg text-center font-semibold">All Favorites</p>
      )}
    />
  );
}

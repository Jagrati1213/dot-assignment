import {
  Button,
  Card,
  Image,
  message,
  Modal,
  Skeleton,
  Space,
  Tag,
} from "antd";
import { MdStarRate } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavoriteAction,
  deleteFavoriteAction,
} from "../../store/slice/allFavoriteSlice";

export default function ProductDetailsModal({
  isLoading,
  isModalOpen,
  handleCancel,
  ProductDetails,
}) {
  const favoriteList = useSelector(
    (state) => state.favoriteListSlice.favoriteList
  );
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [data, setData] = useState(null);

  // Handle add & remove the product
  const handleFavorite = (data) => {
    const selectedProduct = favoriteList?.some((f) => f.id === data?.id);
    if (selectedProduct) {
      dispatch(deleteFavoriteAction(data?.id));
      setIsFavorite(false);
      message.success("Product removed from favorite successfully!");
    } else {
      dispatch(addFavoriteAction(data));
      setIsFavorite(true);
      message.success("Product added in favorite successfully!");
    }
  };

  // Update the data
  useEffect(() => {
    if (ProductDetails) {
      const isAdded = favoriteList?.some((f) => f.id === ProductDetails.id);
      setData(ProductDetails);
      setIsFavorite(isAdded);
    }
  }, [ProductDetails]);
  return (
    <Modal
      title="Product Details"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      {isLoading ? (
        <div className="flex items-center flex-col gap-4">
          <Skeleton.Image active={true} style={{ width: 300, height: 160 }} />
          <Skeleton active />
        </div>
      ) : (
        <Card
          title={
            <div className="flex justify-between">
              <Tag color="blue" className="text-base capitalize">
                {data?.category}
              </Tag>
              <Button
                icon={
                  !isFavorite ? (
                    <FaRegHeart size={20} color="red" />
                  ) : (
                    <FaHeart color="red" size={20} />
                  )
                }
                type="text"
                onClick={handleFavorite.bind(null, data)}
              />
            </div>
          }
          size="small"
          cover={
            <div
              className="justify-center pt-2  overflow-hidden"
              style={{ display: "flex", width: "100%", height: "300px" }}
            >
              {data?.image ? (
                <Image
                  width={180}
                  alt={data?.title}
                  src={data?.image}
                  className="object-contain"
                />
              ) : (
                <Skeleton.Image
                  active={true}
                  style={{ width: 300, height: 300 }}
                />
              )}
            </div>
          }
        >
          <Space direction="vertical" className="gap-2">
            <h3 className="text-lg font-semibold break-words">{data?.title}</h3>
            <p className="text-base break-words">{data?.description}</p>
            <p className="break-words text-lg font-medium">₹{data?.price}</p>
            {data?.rating && (
              <Space>
                <p className="font-bold flex items-center gap-3 text-lg">
                  {data?.rating?.rate}
                  {data?.rating?.count && (
                    <span className="font-normal">({data.rating.count})</span>
                  )}
                  <MdStarRate size={20} className="text-yellow-400" />
                </p>
              </Space>
            )}
          </Space>
        </Card>
      )}
    </Modal>
  );
}

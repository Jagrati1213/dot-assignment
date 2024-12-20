import { Button, Card, Image, Modal, Skeleton, Space, Tag } from "antd";
import { MdStarRate } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import React, { useState } from "react";

export default function ProductDetailsModal({
  isLoading,
  isModalOpen,
  handleCancel,
  ProductDetails,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleAddToFavorite = () => {
    setIsFavorite((prev) => !prev);
  };
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
                {ProductDetails?.category}
              </Tag>
              <Button
                icon={
                  !isFavorite ? (
                    <FaRegHeart size={20} />
                  ) : (
                    <FaHeart color="red" size={20} />
                  )
                }
                type="text"
                onClick={handleAddToFavorite}
              />
            </div>
          }
          size="small"
          cover={
            ProductDetails?.image ? (
              <div
                className="justify-center items-center"
                style={{ display: "flex" }}
              >
                <Image
                  width={180}
                  alt={ProductDetails?.title}
                  src={ProductDetails?.image}
                />
              </div>
            ) : (
              <Skeleton.Image
                active={true}
                style={{ width: 300, height: 160 }}
              />
            )
          }
        >
          <Space direction="vertical" className="gap-2">
            <h3 className="text-lg font-semibold break-words">
              {ProductDetails?.title}
            </h3>
            <p className="text-base break-words">
              {ProductDetails?.description}
            </p>
            <p className="break-words text-lg font-medium">
              ₹{ProductDetails?.price}
            </p>
            {ProductDetails?.rating && (
              <Space>
                <p className="font-bold flex items-center gap-3 text-lg">
                  {ProductDetails?.rating?.rate}
                  {ProductDetails?.rating?.count && (
                    <span className="font-normal">
                      ({ProductDetails.rating.count})
                    </span>
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

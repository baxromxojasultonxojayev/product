import React, { FC, useEffect, useState } from "react";
import { Box, Button, CardMedia, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ModalProduct: FC<Props> = ({ productData }) => {
  const [open, setOpen] = useState<boolean>(false);

  const [productInfo, setProductInfo] = useState<Product>();

  const handleOpen = async () => {
    setOpen(true);
    await getProductById();
  };
  const handleClose = () => setOpen(false);

  const getProductById = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/${productData?.id}`
      );
      const data = await response.json();
      setProductInfo(data);
    } catch (error) {
      console.error("Failed to fetch product info:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        More info
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          {productInfo && (
            <>
              <CardMedia
                sx={{ height: 200, backgroundSize: "200px 200px" }}
                image={productInfo?.images[0]}
                title="green iguana"
              />
              <Typography id="modal-title" variant="h6" component="h2">
                <b>Description: </b>
                {productInfo.description}
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                <b>Brand name: </b>
                {productInfo.brand}
              </Typography>

              <Typography id="modal-description" sx={{ mt: 2 }}>
                <span>
                  <b>Price: </b>
                  {productInfo.price}$
                </span>{" "}
                <span>
                  <b>Rate: </b>
                  {productInfo.rating}
                </span>
              </Typography>
              <Button onClick={handleClose} sx={{ mt: 2 }}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

interface Props {
  productData: Product;
}

export default ModalProduct;

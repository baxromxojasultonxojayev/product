import React, { FC } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import "./style.scss";
import ModalProduct from "../ModalProduct";

const ProductCard: FC<Props> = ({ productData }) => {
  return (
    <div>
      <Card sx={{ maxWidth: 300, marginTop: "15px" }} className="product-item">
        <CardMedia
          sx={{ height: 250, backgroundSize: "200px 200px" }}
          image={productData.images[0]}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {productData.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {productData.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <ModalProduct productData={productData} />
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

interface Props {
  productData: any;
}

export default ProductCard;

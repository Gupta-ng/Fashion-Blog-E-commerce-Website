import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Divider,
  IconButton,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  ShoppingCart,
  ArrowBack,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";

// Sample product data — replace with API call when backend is ready
const sampleProducts = [
  {
    _id: "1",
    name: "Women's Floral Maxi Dress",
    price: 39.99,
    description:
      "A beautiful floral maxi dress perfect for any occasion. Made with lightweight, breathable fabric.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Dresses",
    colors: ["Black", "Blue", "Red"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    _id: "2",
    name: "Classic White Sneakers",
    price: 59.99,
    description:
      "Timeless white sneakers that go with everything. Premium quality leather upper with cushioned sole.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    ],
    category: "Shoes",
    colors: ["White"],
    sizes: ["6", "7", "8", "9", "10"],
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const product = sampleProducts.find((p) => p._id === id) || sampleProducts[0];

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setSnackbar({ open: true, message: "Please select a size.", severity: "warning" });
      return;
    }
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    setSnackbar({ open: true, message: `${product.name} added to cart!`, severity: "success" });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button startIcon={<ArrowBack />} onClick={() => navigate(-1)} sx={{ mb: 3 }}>
        Back
      </Button>

      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.images?.[0] || "https://via.placeholder.com/600x600"}
            alt={product.name}
            sx={{ width: "100%", borderRadius: 3, objectFit: "cover", maxHeight: 520 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Chip label={product.category} size="small" sx={{ mb: 1 }} />
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" fontWeight={600} gutterBottom>
            ${product.price}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          {product.colors?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>Color</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.colors.map((color) => (
                  <Chip
                    key={color} label={color}
                    onClick={() => setSelectedColor(color)}
                    variant={selectedColor === color ? "filled" : "outlined"}
                    color={selectedColor === color ? "primary" : "default"}
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {product.sizes?.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>Size</Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {product.sizes.map((size) => (
                  <Chip
                    key={size} label={size}
                    onClick={() => setSelectedSize(size)}
                    variant={selectedSize === size ? "filled" : "outlined"}
                    color={selectedSize === size ? "primary" : "default"}
                    sx={{ cursor: "pointer" }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <Typography variant="subtitle2" fontWeight={600}>Qty:</Typography>
            <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))} size="small"><RemoveIcon /></IconButton>
            <Typography sx={{ minWidth: 32, textAlign: "center" }}>{quantity}</Typography>
            <IconButton onClick={() => setQuantity((q) => q + 1)} size="small"><AddIcon /></IconButton>
          </Box>

          <Button variant="contained" color="primary" size="large" fullWidth
            startIcon={<ShoppingCart />} onClick={handleAddToCart} sx={{ py: 1.5 }}>
            Add to Cart
          </Button>
        </Grid>
      </Grid>

      <Snackbar open={snackbar.open} autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductDetail;

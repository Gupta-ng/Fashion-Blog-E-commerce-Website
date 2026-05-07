import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  IconButton,
  Tabs,
  Tab,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  FilterList,
  Favorite,
  FavoriteBorder,
  Sort,
  AddShoppingCart,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

const MotionCard = motion(Card);

const ProductList = () => {
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const { addToCart } = useCart();

  const categories = [
    "All",
    "Tops",
    "Dresses",
    "Bottoms",
    "Jackets",
    "Sweaters",
    "Active & Lounge",
    "Swim",
    "Lingerie",
  ];

  const products = [
    {
      id: 1,
      name: "Women's Floral Maxi Dress",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      category: "Dresses",
      colors: ["Black", "Blue", "Red"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      category: "Jackets",
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L"],
    },
    {
      id: 3,
      name: "Casual Graphic Tee",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      category: "Tops",
      colors: ["White", "Black", "Gray"],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      id: 4,
      name: "High-Waisted Skinny Jeans",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      category: "Bottoms",
      colors: ["Blue", "Black", "White"],
      sizes: ["24", "26", "28", "30", "32"],
    },
    // Add more products as needed
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortAnchorEl(null);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setSnackbar({
      open: true,
      message: `${product.name} added to cart successfully!`,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const FilterDrawer = () => (
    <Drawer
      anchor="left"
      open={filterDrawerOpen}
      onClose={() => setFilterDrawerOpen(false)}
    >
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Price Range" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Size" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Color" />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );

  // Add filtered products logic
  const filteredProducts =
    activeTab === 0
      ? products
      : products.filter(
          (product) => product.category === categories[activeTab]
        );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Women's Clothing
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {products.length} items
        </Typography>
      </Box>

      {/* Category Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {categories.map((category, index) => (
            <Tab key={index} label={category} />
          ))}
        </Tabs>
      </Box>

      {/* Filters and Sort */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          startIcon={<FilterList />}
          onClick={() => setFilterDrawerOpen(true)}
        >
          Filters
        </Button>
        <Button endIcon={<Sort />} onClick={handleSortClick}>
          Sort By
        </Button>
        <Menu
          anchorEl={sortAnchorEl}
          open={Boolean(sortAnchorEl)}
          onClose={handleSortClose}
        >
          <MenuItem onClick={handleSortClose}>Price: Low to High</MenuItem>
          <MenuItem onClick={handleSortClose}>Price: High to Low</MenuItem>
          <MenuItem onClick={handleSortClose}>Newest First</MenuItem>
          <MenuItem onClick={handleSortClose}>Best Selling</MenuItem>
        </Menu>
      </Box>

      {/* Product Grid */}
      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <MotionCard
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={product.image}
                  alt={product.name}
                  sx={{ objectFit: "cover" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    bgcolor: "white",
                    "&:hover": { bgcolor: "white" },
                  }}
                  onClick={() => toggleFavorite(product.id)}
                >
                  {favorites.includes(product.id) ? (
                    <Favorite sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorder />
                  )}
                </IconButton>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body1" color="primary" gutterBottom>
                  ${product.price}
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
                  {product.colors.map((color) => (
                    <Box
                      key={color}
                      sx={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: "1px solid #ddd",
                        bgcolor: color.toLowerCase(),
                      }}
                    />
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                  {product.sizes.map((size) => (
                    <Typography
                      key={size}
                      variant="body2"
                      sx={{
                        border: "1px solid #ddd",
                        px: 1,
                        borderRadius: 1,
                      }}
                    >
                      {size}
                    </Typography>
                  ))}
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddShoppingCart />}
                  onClick={() => handleAddToCart(product)}
                  sx={{
                    mt: "auto",
                    background:
                      "linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)",
                    boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #1976d2 30%, #2196f3 90%)",
                      boxShadow: "0 4px 8px 2px rgba(33, 150, 243, .4)",
                    },
                  }}
                >
                  Add to Cart
                </Button>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      <FilterDrawer />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProductList;

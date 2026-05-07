import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your products");
          setLoading(false);
          return;
        }

        console.log("Current user:", user);
        console.log("Token:", token);

        const response = await axios.get(
          "http://localhost:5000/api/products/my-products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("API Response:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error.response || error);
        if (error.response?.status === 401) {
          setError("Your session has expired. Please login again.");
          // Optionally redirect to login
          // navigate('/login');
        } else {
          setError(
            error.response?.data?.message ||
              "Failed to fetch products. Please try again later."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "seller") {
      fetchProducts();
    }
  }, [user]);

  const handleEdit = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setProducts(products.filter((product) => product._id !== productId));
      setDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setProductToDelete(null);
    setDeleteDialogOpen(false);
  };

  if (user?.role !== "seller") {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Access Denied
        </Typography>
        <Typography>You need to be a seller to view this page.</Typography>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Loading your products...
        </Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }} color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">My Products</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/add-product")}
        >
          Add New Product
        </Button>
      </Box>

      {products.length === 0 ? (
        <Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>
          You haven't added any products yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.images[0]}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${product.price}
                  </Typography>
                  <Box
                    sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}
                  >
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(product._id)}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => openDeleteDialog(product)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{productToDelete?.name}"?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog}>Cancel</Button>
          <Button
            onClick={() => handleDelete(productToDelete?._id)}
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MyProducts;

import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    // Create preview URLs
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user || user.role !== "seller") {
      setError("Only sellers can add products");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("Current token:", token); // Debug log
    if (!token) {
      setError("Please login to add products");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      console.log("Sending request with headers:", {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      });

      const response = await axios.post(
        "http://localhost:5000/api/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Product added successfully!");
      setTimeout(() => {
        navigate("/my-products");
      }, 1500);
    } catch (err) {
      console.error("Error adding product:", err.response);
      if (err.response?.status === 401) {
        setError("Your session has expired. Please login again.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(err.response?.data?.message || "Error adding product");
      }
    }
  };

  if (!user || user.role !== "seller") {
    return (
      <Container>
        <Typography variant="h5" sx={{ mt: 4 }}>
          Access Denied
        </Typography>
        <Typography>You need to be a seller to add products.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Add New Product
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Product Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  component="label"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Upload Images
                  <input
                    type="file"
                    hidden
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Button>
                {imagePreview.length > 0 && (
                  <Box
                    sx={{ mt: 2, display: "flex", gap: 2, flexWrap: "wrap" }}
                  >
                    {imagePreview.map((url, index) => (
                      <Box
                        key={index}
                        component="img"
                        src={url}
                        alt={`Preview ${index + 1}`}
                        sx={{
                          width: 100,
                          height: 100,
                          objectFit: "cover",
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
  );
};

export default AddProduct;

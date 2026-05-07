import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
      setSnackbar({
        open: true,
        message: "Cart updated successfully!",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your Cart is Empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cart.map((item) => (
            <Card key={item._id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={3}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.images ? item.images[0] : item.image}
                      alt={item.name}
                      sx={{
                        objectFit: "cover",
                        borderRadius: 1,
                        width: "100%",
                        height: "140px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography color="textSecondary">${item.price}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <TextField
                        size="small"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item._id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                        sx={{ width: "60px", mx: 1 }}
                      />
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        <AddIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(item._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Subtotal</Typography>
                <Typography>${getCartTotal().toFixed(2)}</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  ${getCartTotal().toFixed(2)}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

export default Cart;

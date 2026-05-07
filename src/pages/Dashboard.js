import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth(); // FIX: use AuthContext instead of raw localStorage
  const [tabValue, setTabValue] = useState(0);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (user?.role === "buyer") {
      fetchOrders();
    } else if (user?.role === "seller") {
      fetchProducts();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // FIX: was x-auth-token
        },
      });
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // FIX: was x-auth-token
        },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (!user) {
    return <Typography sx={{ p: 4 }}>Please log in to view your dashboard.</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {user.name}!  {/* FIX: was user.username — AuthContext stores user.name */}
      </Typography>

      {user.role === "buyer" ? (
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Orders" />
            <Tab label="Wishlist" />
            <Tab label="Settings" />
          </Tabs>

          {tabValue === 0 && (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No orders yet.</TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell>{order._id}</TableCell>
                        <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>${order.total}</TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          <Button variant="outlined" size="small">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      ) : (
        <Box>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
            <Tab label="Products" />
            <Tab label="Orders" />
            <Tab label="Analytics" />
            <Tab label="Settings" />
          </Tabs>

          {tabValue === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  href="/add-product"
                  sx={{ mb: 3 }}
                >
                  Add New Product
                </Button>
              </Grid>
              {products.length === 0 ? (
                <Grid item xs={12}>
                  <Typography color="text.secondary">No products yet. Add your first product!</Typography>
                </Grid>
              ) : (
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{product.name}</Typography>
                        <Typography color="text.secondary">${product.price}</Typography>
                        <Typography variant="body2">Stock: {product.stock}</Typography>
                        <Box sx={{ mt: 2 }}>
                          <Button variant="outlined" size="small" sx={{ mr: 1 }}
                            href={`/edit-product/${product._id}`}>
                            Edit
                          </Button>
                          <Button variant="outlined" color="error" size="small">Delete</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;

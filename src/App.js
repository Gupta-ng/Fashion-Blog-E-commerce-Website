import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";  // FIX: was missing

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6a1b9a",
      light: "#9c4dcc",
      dark: "#38006b",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff6f00",
      light: "#ffa040",
      dark: "#c43e00",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#546e7a",
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: { fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontWeight: 700, letterSpacing: "-0.01em" },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { fontWeight: 500, textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(135deg, #6a1b9a 0%, #9c4dcc 100%)",
          color: "#ffffff",
          boxShadow: "0 4px 20px rgba(106, 27, 154, 0.2)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 12, padding: "8px 16px", fontWeight: 500 },
        contained: {
          boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
          "&:hover": { boxShadow: "0 6px 20px rgba(0,0,0,0.15)" },
        },
        containedPrimary: {
          background: "linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)",
          "&:hover": { background: "linear-gradient(45deg, #38006b 30%, #6a1b9a 90%)" },
        },
        containedSecondary: {
          background: "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
          "&:hover": { background: "linear-gradient(45deg, #c43e00 30%, #ff6f00 90%)" },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiCardMedia: {
      styleOverrides: {
        root: { borderRadius: "16px 16px 0 0" },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": { borderRadius: 12 },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
              <Navbar />
              <main style={{ flexGrow: 1, paddingTop: "70px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/products" element={<ProductList />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/my-products" element={<MyProducts />} />  {/* FIX: was missing */}
                </Routes>
              </main>
            </div>
          </Router>
        </ThemeProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

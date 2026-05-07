import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
  alpha,
  Paper,
  Divider,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Collapse,
  Drawer,
  AppBar,
  Toolbar,
  InputBase,
  Avatar,
  Tooltip,
  TextField,
  Chip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  LocalShipping,
  Security,
  Support,
  ArrowForward,
  Star,
  TrendingUp,
  Favorite,
  ChevronLeft,
  ChevronRight,
  Search,
  Menu as MenuIcon,
  Person,
  ShoppingCart,
  Favorite as FavoriteIcon,
  Notifications,
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardArrowRight,
  Home as HomeIcon,
  Category,
  Add,
  Store,
  Logout,
  Brightness4,
  Brightness7,
  ArrowBack,
  AddShoppingCart,
  Diamond,
  LocalOffer,
} from "@mui/icons-material";
import { useCart } from "../context/CartContext";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionButton = motion(Button);
const MotionPaper = motion(Paper);
const MotionChip = motion(Chip);

const HomePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentHeroImage, setCurrentHeroImage] = useState(0);
  const [currentTrendingIndex, setCurrentTrendingIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const { addToCart } = useCart();

  const heroImages = [
    {
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Summer Collection 2023",
      subtitle: "Discover the latest trends in fashion",
    },
    {
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
      title: "Elegant Evening Wear",
      subtitle: "Make a statement at your next event",
    },
    {
      image:
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      title: "Casual Comfort",
      subtitle: "Stylish and comfortable for everyday wear",
    },
  ];

  const trendingItems = [
    {
      id: 1,
      name: "Elegant Summer Dress",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      rating: 4.6,
      reviews: 98,
    },
    {
      id: 3,
      name: "Premium Leather Boots",
      price: 129.99,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      rating: 4.9,
      reviews: 156,
    },
    {
      id: 4,
      name: "Designer Handbag",
      price: 199.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=400&q=80",
      rating: 4.7,
      reviews: 87,
    },
  ];

  const categories = [
    {
      name: "Women",
      image:
        "https://images.unsplash.com/photo-1525845859779-54d477ff291f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Men",
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    },
    {
      name: "Footwear",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
    },
  ];

  const promoBanners = [
    "FREE Shipping on orders over $75",
    "New arrivals up to 50% off",
    "Buy 2 Get 1 Free on all accessories",
  ];

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    const trendingTimer = setInterval(() => {
      setCurrentTrendingIndex((prev) => (prev + 1) % trendingItems.length);
    }, 3000);

    return () => {
      clearInterval(heroTimer);
      clearInterval(trendingTimer);
    };
  }, []);

  const nextHeroImage = () => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
  };

  const prevHeroImage = () => {
    setCurrentHeroImage(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length
    );
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Box sx={{ bgcolor: "#f8f9fa" }}>
      {/* Top Promo Banner */}
      <Box
        sx={{ bgcolor: "#ff4081", color: "white", py: 1, textAlign: "center" }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {promoBanners[0]} | Free Returns | Need Help? Call 1-800-123-4567
          </Typography>
        </Container>
      </Box>

      {/* Header */}
      <AppBar
        position="sticky"
        sx={{
          bgcolor: "white",
          color: "black",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  fontSize: isMobile ? "1.2rem" : "1.5rem",
                }}
              >
                FASHION STORE
              </Typography>
            </Box>

            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 2 }}>
              {categories.map((category) => (
                <Button
                  key={category.name}
                  color="inherit"
                  endIcon={<KeyboardArrowDown />}
                  onClick={handleMenuOpen}
                  sx={{
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      color: "#ff4081",
                    },
                  }}
                >
                  {category.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton color="inherit" onClick={toggleSearch}>
                <Search />
              </IconButton>
              <IconButton color="inherit" component={RouterLink} to="/account">
                <Person />
              </IconButton>
              <IconButton
                color="inherit"
                component={RouterLink}
                to="/favorites"
              >
                <Badge badgeContent={3} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit" component={RouterLink} to="/cart">
                <Badge badgeContent={2} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Search Bar */}
      <Collapse in={searchOpen}>
        <Paper
          sx={{
            p: 2,
            borderRadius: 0,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InputBase
                placeholder="Search for products..."
                fullWidth
                sx={{ mr: 1 }}
              />
              <Button variant="contained" sx={{ bgcolor: "#ff4081" }}>
                Search
              </Button>
            </Box>
          </Container>
        </Paper>
      </Collapse>

      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "80vh" },
          overflow: "hidden",
          mb: 6,
        }}
      >
        <AnimatePresence mode="wait">
          <MotionBox
            key={currentHeroImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${heroImages[currentHeroImage].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)",
              },
            }}
          />
        </AnimatePresence>

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <MotionTypography
              variant="h1"
              sx={{
                color: "white",
                fontWeight: 700,
                fontSize: { xs: "2.5rem", md: "4rem" },
                mb: 2,
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {heroImages[currentHeroImage].title}
            </MotionTypography>
            <MotionTypography
              variant="h5"
              sx={{
                color: "white",
                mb: 4,
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              {heroImages[currentHeroImage].subtitle}
            </MotionTypography>
            <MotionButton
              variant="contained"
              color="secondary"
              size="large"
              component={RouterLink}
              to="/products"
              sx={{
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                boxShadow: "0 4px 14px rgba(255, 111, 0, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(255, 111, 0, 0.4)",
                },
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </MotionButton>
          </MotionBox>
        </Container>

        {/* Navigation dots */}
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 1,
            zIndex: 2,
          }}
        >
          {heroImages.map((_, index) => (
            <Box
              key={index}
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                bgcolor:
                  currentHeroImage === index ? "secondary.main" : "white",
                opacity: currentHeroImage === index ? 1 : 0.5,
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  opacity: 1,
                },
              }}
              onClick={() => setCurrentHeroImage(index)}
            />
          ))}
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)",
                      color: "white",
                    }}
                  >
                    <LocalShipping sx={{ fontSize: 30 }} />
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Free Shipping
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  On all orders over $50
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                      color: "white",
                    }}
                  >
                    <Security sx={{ fontSize: 30 }} />
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Secure Payment
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  100% secure payment
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)",
                      color: "white",
                    }}
                  >
                    <Diamond sx={{ fontSize: 30 }} />
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  Premium Quality
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Top quality products
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MotionCard
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              sx={{
                height: "100%",
                borderRadius: 4,
                boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                border: "1px solid",
                borderColor: "rgba(0,0,0,0.05)",
              }}
            >
              <CardContent sx={{ textAlign: "center", p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                      color: "white",
                    }}
                  >
                    <Support sx={{ fontSize: 30 }} />
                  </Box>
                </Box>
                <Typography variant="h6" gutterBottom>
                  24/7 Support
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Dedicated support
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: "linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Shop by Category
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Explore our wide range of products
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <MotionCard
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                sx={{
                  height: "100%",
                  borderRadius: 4,
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={category.image}
                    alt={category.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%)",
                      display: "flex",
                      alignItems: "flex-end",
                      p: 3,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                        textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                </Box>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Trending Section */}
      <Box sx={{ bgcolor: "background.default", py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, textAlign: "center" }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                background: "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trending Now
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Discover our most popular products
            </Typography>
          </Box>

          <Box sx={{ position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrendingIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Grid container spacing={3}>
                  {trendingItems.map((item, index) => (
                    <Grid item xs={12} sm={6} md={3} key={item.id}>
                      <MotionPaper
                        whileHover={{ y: -10 }}
                        transition={{ duration: 0.3 }}
                        sx={{
                          borderRadius: 4,
                          overflow: "hidden",
                          boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
                        }}
                      >
                        <Box sx={{ position: "relative" }}>
                          <CardMedia
                            component="img"
                            height="300"
                            image={item.image}
                            alt={item.name}
                            sx={{ objectFit: "cover" }}
                          />
                          <Box
                            sx={{
                              position: "absolute",
                              top: 10,
                              right: 10,
                              bgcolor: "white",
                              borderRadius: "50%",
                              width: 40,
                              height: 40,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                            }}
                          >
                            <IconButton size="small">
                              <FavoriteIcon />
                            </IconButton>
                          </Box>
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "100%",
                              p: 2,
                              background:
                                "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 1,
                              }}
                            >
                              <Star sx={{ color: "#ffc107", fontSize: 20 }} />
                              <Typography
                                variant="body2"
                                sx={{ color: "white", ml: 0.5 }}
                              >
                                {item.rating} ({item.reviews})
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" gutterBottom>
                            {item.name}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ fontWeight: 600 }}
                            >
                              ${item.price}
                            </Typography>
                            <Button
                              variant="contained"
                              size="small"
                              startIcon={<AddShoppingCart />}
                              onClick={() => handleAddToCart(item)}
                              sx={{
                                borderRadius: "20px",
                                textTransform: "none",
                                background:
                                  "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                                boxShadow:
                                  "0 3px 5px 2px rgba(255, 111, 0, .3)",
                                "&:hover": {
                                  background:
                                    "linear-gradient(45deg, #c43e00 30%, #ff6f00 90%)",
                                  boxShadow: "0 4px 12px rgba(255, 111, 0, .4)",
                                },
                              }}
                            >
                              Add to Cart
                            </Button>
                          </Box>
                        </Box>
                      </MotionPaper>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </AnimatePresence>
            <IconButton
              onClick={() =>
                setCurrentTrendingIndex(
                  (prev) =>
                    (prev - 1 + trendingItems.length) % trendingItems.length
                )
              }
              sx={{
                position: "absolute",
                left: -20,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() =>
                setCurrentTrendingIndex(
                  (prev) => (prev + 1) % trendingItems.length
                )
              }
              sx={{
                position: "absolute",
                right: -20,
                top: "50%",
                transform: "translateY(-50%)",
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                "&:hover": { bgcolor: "white" },
              }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Newsletter Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper
          sx={{
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(135deg, #6a1b9a 0%, #9c4dcc 100%)",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
            Subscribe to Our Newsletter
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
            Stay updated with our latest products and exclusive offers
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              placeholder="Your email address"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "white",
                  borderRadius: "30px",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "transparent",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />
            <Button
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: "30px",
                px: 4,
                py: 1.5,
                boxShadow: "0 4px 14px rgba(255, 111, 0, 0.3)",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(255, 111, 0, 0.4)",
                },
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Paper>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Store sx={{ fontSize: "1.8rem", color: "#4fc3f7" }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Fashion Store
          </Typography>
        </Box>
        <Divider />
        <List>
          {categories.map((category) => (
            <ListItem button key={category.name}>
              <ListItemIcon>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
              <KeyboardArrowRight />
            </ListItem>
          ))}
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCart />
            </ListItemIcon>
            <ListItemText primary="My Orders" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="My Wishlist" />
          </ListItem>
          <Divider />
          <ListItem button onClick={toggleDarkMode}>
            <ListItemIcon>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
          </ListItem>
        </List>
      </Drawer>

      {/* Category Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: 300,
            maxHeight: 400,
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Category fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="All Categories" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="New Arrivals" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="Best Sellers" />
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="Sale Items" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemText primary="View All" />
          <KeyboardArrowRight />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default HomePage;

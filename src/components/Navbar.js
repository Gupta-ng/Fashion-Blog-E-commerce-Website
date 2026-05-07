import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Badge,
  useTheme,
  useMediaQuery,
  alpha,
  Tooltip,
  Zoom,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Switch,
  Container,
  Fade,
  InputBase,
  Paper,
  Chip,
} from "@mui/material";
import {
  ShoppingCart,
  AccountCircle,
  Add,
  Store,
  Menu as MenuIcon,
  Home,
  Category,
  Person,
  ShoppingBag,
  Logout,
  Brightness4,
  Brightness7,
  Search,
  Notifications,
  Favorite,
  FavoriteBorder,
  LocalOffer,
  Diamond,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Create motion components
const MotionAppBar = motion(AppBar);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);
const MotionTypography = motion(Typography);
const MotionBadge = motion(Badge);
const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionChip = motion(Chip);

const Navbar = () => {
  // Get user and cart data from context
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // State management
  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showPromo, setShowPromo] = useState(true);

  // Theme and responsive hooks
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // Menu handlers
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/login");
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Define menu items based on user role
  const menuItems = [
    { text: "Home", icon: <Home />, path: "/" },
    { text: "Products", icon: <Category />, path: "/products" },
    ...(user?.role === "seller"
      ? [
          { text: "Add Product", icon: <Add />, path: "/add-product" },
          { text: "My Products", icon: <ShoppingBag />, path: "/my-products" },
        ]
      : []),
    ...(user?.role === "buyer"
      ? [{ text: "My Orders", icon: <ShoppingBag />, path: "/orders" }]
      : []),
  ];

  return (
    <>
      {showPromo && (
        <Box
          sx={{
            bgcolor: "secondary.main",
            color: "white",
            py: 1,
            textAlign: "center",
            position: "relative",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LocalOffer sx={{ mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Special Offer: Get 20% off on your first purchase! Use code:{" "}
                <Box component="span" sx={{ fontWeight: 700 }}>
                  LUXE20
                </Box>
              </Typography>
              <IconButton
                size="small"
                sx={{ ml: 2, color: "white" }}
                onClick={() => setShowPromo(false)}
              >
                <Typography variant="caption">×</Typography>
              </IconButton>
            </Box>
          </Container>
        </Box>
      )}
      <MotionAppBar
        position="fixed"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        sx={{
          background: scrolled
            ? "rgba(106, 27, 154, 0.95)"
            : "rgba(106, 27, 154, 0.98)",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled
            ? "0 4px 20px rgba(106, 27, 154, 0.3)"
            : "0 4px 20px rgba(106, 27, 154, 0.2)",
          transition: "all 0.3s ease-in-out",
          borderBottom: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.1)",
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: { xs: "64px", sm: "70px" },
              px: { xs: 1, sm: 2 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Left Section - Logo */}
            <MotionBox
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <MotionIconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{
                  mr: 2,
                  display: { sm: "none" },
                  color: "white",
                  background: alpha(theme.palette.secondary.main, 0.2),
                  "&:hover": {
                    background: alpha(theme.palette.secondary.main, 0.3),
                  },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <MenuIcon />
              </MotionIconButton>

              <MotionBox
                component={Link}
                to="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "relative",
                  textDecoration: "none",
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Diamond
                  sx={{
                    fontSize: "2rem",
                    color: "secondary.main",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.1)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
                <MotionTypography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: "white",
                    letterSpacing: 1,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background:
                        "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                      transform: "scaleX(0)",
                      transition: "transform 0.3s ease-in-out",
                      transformOrigin: "right",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                      transformOrigin: "left",
                    },
                  }}
                >
                  LuxeCart
                </MotionTypography>
              </MotionBox>
            </MotionBox>

            {/* Center Section - Navigation */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 3,
              }}
            >
              {menuItems.map((item) => (
                <MotionButton
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color:
                      location.pathname === item.path
                        ? "secondary.main"
                        : "white",
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: -2,
                      left: 0,
                      width: "100%",
                      height: "2px",
                      background:
                        "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                      transform:
                        location.pathname === item.path
                          ? "scaleX(1)"
                          : "scaleX(0)",
                      transition: "transform 0.3s ease-in-out",
                    },
                    "&:hover::after": {
                      transform: "scaleX(1)",
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.text}
                </MotionButton>
              ))}
            </Box>

            {/* Right Section - User Actions */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Tooltip title="Search" placement="bottom" arrow>
                <MotionIconButton
                  onClick={toggleSearch}
                  sx={{
                    color: "white",
                    background: alpha(theme.palette.secondary.main, 0.2),
                    "&:hover": {
                      color: "secondary.main",
                      background: alpha(theme.palette.secondary.main, 0.3),
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Search />
                </MotionIconButton>
              </Tooltip>

              <Tooltip title="Favorites" placement="bottom" arrow>
                <MotionIconButton
                  sx={{
                    color: "white",
                    background: alpha(theme.palette.secondary.main, 0.2),
                    "&:hover": {
                      color: "secondary.main",
                      background: alpha(theme.palette.secondary.main, 0.3),
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge badgeContent={favorites.length} color="secondary">
                    <FavoriteBorder />
                  </Badge>
                </MotionIconButton>
              </Tooltip>

              <Tooltip title="Cart" placement="bottom" arrow>
                <MotionIconButton
                  component={Link}
                  to="/cart"
                  sx={{
                    color: "white",
                    background: alpha(theme.palette.secondary.main, 0.2),
                    "&:hover": {
                      color: "secondary.main",
                      background: alpha(theme.palette.secondary.main, 0.3),
                    },
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Badge
                    badgeContent={cart?.length || 0}
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        animation:
                          cart?.length > 0 ? "pulse 1s infinite" : "none",
                        "@keyframes pulse": {
                          "0%": { transform: "scale(1)" },
                          "50%": { transform: "scale(1.2)" },
                          "100%": { transform: "scale(1)" },
                        },
                      },
                    }}
                  >
                    <ShoppingCart />
                  </Badge>
                </MotionIconButton>
              </Tooltip>

              {user ? (
                <>
                  <Tooltip title="Account" placement="bottom" arrow>
                    <MotionIconButton
                      onClick={handleMenu}
                      sx={{
                        color: "white",
                        background: alpha(theme.palette.secondary.main, 0.2),
                        "&:hover": {
                          color: "secondary.main",
                          background: alpha(theme.palette.secondary.main, 0.3),
                        },
                      }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          background:
                            "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                          border: "2px solid white",
                          boxShadow: "0 2px 8px rgba(255, 111, 0, 0.3)",
                        }}
                      >
                        {user.name?.[0]?.toUpperCase() || <AccountCircle />}
                      </Avatar>
                    </MotionIconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                    PaperProps={{
                      sx: {
                        mt: 1.5,
                        minWidth: 180,
                        borderRadius: 2,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        overflow: "visible",
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        handleClose();
                        navigate("/profile");
                      }}
                      sx={{
                        py: 1.5,
                        "&:hover": {
                          background: alpha(theme.palette.primary.main, 0.1),
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Person
                          fontSize="small"
                          sx={{ color: "primary.main" }}
                        />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      sx={{
                        py: 1.5,
                        color: "error.main",
                        "&:hover": {
                          background: alpha(theme.palette.error.main, 0.1),
                        },
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: "error.main" }} />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <MotionButton
                  component={Link}
                  to="/login"
                  variant="contained"
                  color="secondary"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    background:
                      "linear-gradient(45deg, #ff6f00 30%, #ffa040 90%)",
                    boxShadow: "0 3px 5px 2px rgba(255, 111, 0, .3)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #c43e00 30%, #ff6f00 90%)",
                      boxShadow: "0 4px 8px 2px rgba(255, 111, 0, .4)",
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Login
                </MotionButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </MotionAppBar>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <MotionPaper
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            sx={{
              position: "fixed",
              top: "80px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "90%",
              maxWidth: "600px",
              p: 2,
              zIndex: theme.zIndex.drawer + 2,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              borderRadius: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <InputBase
                placeholder="Search products..."
                fullWidth
                sx={{
                  ml: 1,
                  flex: 1,
                  "& input": {
                    p: 1,
                  },
                }}
              />
              <IconButton sx={{ p: "10px" }} onClick={toggleSearch}>
                <Search />
              </IconButton>
            </Box>
          </MotionPaper>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: "background.paper",
            borderRadius: "0 16px 16px 0",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Diamond sx={{ fontSize: "1.8rem", color: "primary.main" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              background: "linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            LuxeCart
          </Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              onClick={toggleDrawer(false)}
              sx={{
                py: 1.5,
                color:
                  location.pathname === item.path
                    ? "primary.main"
                    : "text.primary",
                bgcolor:
                  location.pathname === item.path
                    ? alpha(theme.palette.primary.main, 0.1)
                    : "transparent",
                "&:hover": {
                  background: alpha(theme.palette.primary.main, 0.1),
                },
              }}
            >
              <ListItemIcon sx={{ color: "inherit" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
          <Divider sx={{ my: 1 }} />
          <ListItem
            button
            onClick={toggleDarkMode}
            sx={{
              py: 1.5,
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.1),
              },
            }}
          >
            <ListItemIcon>
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </ListItemIcon>
            <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
            <Switch checked={darkMode} onChange={toggleDarkMode} />
          </ListItem>
        </List>
      </Drawer>

      {/* Toolbar spacer to prevent content from hiding under fixed navbar */}
      <Toolbar />
    </>
  );
};

export default Navbar;

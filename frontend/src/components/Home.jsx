import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  MenuItem as SelectItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import PersonIcon from "@mui/icons-material/Person";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("MOSQUE");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [slotsData, setSlotsData] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [bookings, setBookings] = useState([]);

  // Profile menu state
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const theme = {
    bg: "#0a1128",
    card: "rgba(20,25,50,0.7)",
    primary: "#2979ff",
    hover: "#5393ff",
    text: "#e0e0e0",
    muted: "#a0a0a0",
  };

  // Fetch slots and destinations dynamically
  const fetchHomeData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/home/data");
      const data = await res.json();
      setSlotsData(data.slotsData);
      setDestinations(data.destinations);
    } catch (err) {
      console.error("Failed to fetch home data", err);
    }
  };

  // Fetch all bookings dynamically
  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchHomeData();
    fetchBookings();
  }, []);

  const handleBooking = async () => {
    if (!search || !date) {
      alert("Please fill departure/destination and date.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search, date, passengers }),
      });
      const data = await res.json();
      alert(`Booking saved! ID: ${data._id}`);
      setBookings((prev) => [...prev, data]);
      setSearch("");
      setDate("");
      setPassengers(1);
    } catch (err) {
      console.error(err);
      alert("Booking failed. Check backend connection.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      {/* Navbar */}
      <AppBar
        position="fixed"
        sx={{
          background: "rgba(0,0,30,0.85)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: theme.primary, cursor: "pointer" }}
            onClick={() => navigate("/h")}
          >
            College Bus Booking
          </Typography>

          {/* Desktop Nav */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3, alignItems: "center" }}>
            <Button onClick={() => navigate("/")} sx={{ color: theme.text }}>
              Login
            </Button>
            <Button onClick={() => navigate("/s")} sx={{ color: theme.text }}>
              Signup
            </Button>
            <IconButton onClick={handleMenuOpen} sx={{ color: theme.text }}>
              <AccountCircleIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem disabled>Student ID: 2025ADN123</MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  alert("College Bus Booking App\nVersion 1.0");
                }}
              >
                About
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>

          {/* Mobile Drawer Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: theme.text }}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List sx={{ width: 250, backgroundColor: theme.bg, height: "100%" }}>
          {["Login", "Signup", "Profile"].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                onClick={() => {
                  setDrawerOpen(false);
                  if (text === "Login") navigate("/");
                  else if (text === "Signup") navigate("/s");
                  else alert("Profile menu available on desktop view");
                }}
              >
                <ListItemText primary={text} sx={{ color: theme.text }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 14, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              mb: 2,
              textAlign: "center",
              background: `linear-gradient(90deg, ${theme.primary}, ${theme.hover})`,
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Effortless College Bus Booking
          </Typography>
          <Typography variant="h6" sx={{ color: theme.muted, textAlign: "center" }}>
            Reserve your seat quickly and travel safely with real-time updates.
          </Typography>
        </motion.div>

        {/* Booking Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }}>
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, mt: 6, alignItems: "center" }}>
            <Select
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              displayEmpty
              sx={{
                flex: 1,
                minWidth: 250,
                maxWidth: 450,
                background: theme.card,
                borderRadius: 3,
                color: theme.text,
                height: 56,
                px: 1,
              }}
            >
              <SelectItem value="" disabled>
                Departure → Destination
              </SelectItem>
              {destinations.map((dest, idx) => (
                <SelectItem key={idx} value={dest}>
                  {dest}
                </SelectItem>
              ))}
            </Select>

            <TextField
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              sx={{
                width: 160,
                background: theme.card,
                borderRadius: 3,
                "& .MuiOutlinedInput-root": { height: 56 },
                input: { color: theme.text, textAlign: "center" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.primary },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.primary },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <DateRangeIcon sx={{ color: theme.text }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(Math.max(1, Number(e.target.value)))}
              sx={{
                width: 100,
                background: theme.card,
                borderRadius: 3,
                "& .MuiOutlinedInput-root": { height: 56 },
                input: { color: theme.text, textAlign: "center" },
                "& .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
                "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: theme.primary },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: theme.primary },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: theme.text }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              onClick={() => navigate("/pay")}
              sx={{
                background: theme.primary,
                color: "#fff",
                borderRadius: 3,
                px: 5,
                height: 56,
                fontWeight: "bold",
                "&:hover": { background: theme.hover, transform: "scale(1.03)" },
              }}
            >
              BOOK
            </Button>
          </Box>
        </motion.div>

        {/* Categories */}
        <Box sx={{ display: "flex", gap: 2, mt: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {slotsData &&
            Object.keys(slotsData).map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "contained" : "outlined"}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  background: selectedCategory === category ? theme.primary : theme.card,
                  color: selectedCategory === category ? "#fff" : theme.text,
                  borderColor: theme.primary,
                  borderRadius: 3,
                  px: 5,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                {category}
              </Button>
            ))}
        </Box>

        {/* Slots */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 3, mt: 6, width: "100%" }}>
          {slotsData[selectedCategory] &&
            slotsData[selectedCategory].map((slot, idx) => (
              <motion.div key={slot} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: idx * 0.1 }}>
                <Paper
                  sx={{
                    py: 4,
                    textAlign: "center",
                    borderRadius: 3,
                    background: theme.card,
                    color: "#fff",
                    backdropFilter: "blur(12px)",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    "&:hover": { transform: "scale(1.03)", boxShadow: "0 4px 15px rgba(0,0,0,0.3)" },
                  }}
                >
                  {slot}
                </Paper>
              </motion.div>
            ))}
        </Box>

        {/* Dynamic Bookings */}
        {bookings.length > 0 && (
          <Box sx={{ mt: 8, width: "100%" }}>
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
              Your Bookings
            </Typography>
            {bookings.map((b) => (
              <Paper key={b._id} sx={{ py: 2, px: 3, mb: 2, background: theme.card, color: "#fff" }}>
                {b.search} | Date: {b.date} | Passengers: {b.passengers}
              </Paper>
            ))}
          </Box>
        )}
      </Container>

      {/* Footer */}
      <Box sx={{ textAlign: "center", py: 4, mt: 8, background: "#05082a", color: "#aaa" }}>
        © {new Date().getFullYear()} College Bus Booking. All rights reserved.
      </Box>
    </Box>
  );
};

export default Home;

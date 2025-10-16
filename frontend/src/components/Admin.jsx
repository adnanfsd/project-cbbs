import React, { useState } from "react";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const themeColors = {
  bg: "#0a1128",
  sidebar: "#0d1538",
  primary: "#2979ff",
  hover: "#5393ff",
  text: "#e0e0e0",
  card: "#142136",
};

const adminMenu = ["Dashboard", "Bookings", "Students", "Payments"];

const sampleData = {
  Bookings: [],
  Students: [],
  Payments: [],
};

const Admin = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const isMobile = useMediaQuery("(max-width:900px)");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: themeColors.bg }}>
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? drawerOpen : true}
        onClose={() => setDrawerOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            background: themeColors.sidebar,
            color: themeColors.text,
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          },
        }}
      >
        {/* Menu Items */}
        <Box>
          <Box sx={{ p: 3, fontWeight: "bold", fontSize: "1.5rem", textAlign: "center", color: themeColors.primary }}>
            Admin Panel
          </Box>
          <List>
            {adminMenu.map((menu) => (
              <ListItem key={menu} disablePadding>
                <ListItemButton
                  sx={{
                    color: themeColors.text,
                    mb: 0.5,
                    borderRadius: 1,
                    "&.Mui-selected": { backgroundColor: themeColors.primary, color: "#fff" },
                  }}
                  selected={activeMenu === menu}
                  onClick={() => {
                    setActiveMenu(menu);
                    if (isMobile) setDrawerOpen(false);
                  }}
                >
                  <ListItemText primary={menu} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Bottom Buttons */}
        <Box sx={{ p: 2 }}>
          <Button
            startIcon={<HomeIcon />}
            fullWidth
            sx={{
              color: themeColors.text,
              mb: 1,
              background: themeColors.card,
              "&:hover": { background: themeColors.primary, color: "#fff" },
            }}
            onClick={() => navigate("/h")}
          >
            Home
          </Button>
          <Button
            startIcon={<LogoutIcon />}
            fullWidth
            sx={{
              color: themeColors.text,
              background: themeColors.card,
              "&:hover": { background: themeColors.primary, color: "#fff" },
            }}
            onClick={() => navigate("/")}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 3,
          ml: isMobile ? 0 : "240px",
        }}
      >
        {/* Mobile AppBar */}
        {isMobile && (
          <AppBar position="fixed" sx={{ background: themeColors.sidebar }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" sx={{ ml: 2 }}>
                Admin Panel
              </Typography>
            </Toolbar>
          </AppBar>
        )}

        <Box sx={{ mt: isMobile ? 8 : 0 }}>
          <Typography variant="h4" sx={{ color: "#fff", mb: 3 }}>
            {activeMenu}
          </Typography>

          {/* Dashboard Cards */}
          {activeMenu === "Dashboard" && (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 4 }}>
              {["Total Bookings", "Total Students", "Total Payments"].map((label) => (
                <Paper
                  key={label}
                  sx={{
                    flex: "1 1 200px",
                    p: 3,
                    background: themeColors.card,
                    color: "#fff",
                    borderRadius: 2,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
                  }}
                >
                  <Typography sx={{ fontWeight: "bold", mb: 1 }}>{label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold", color: themeColors.primary }}>
                    0
                  </Typography>
                </Paper>
              ))}
            </Box>
          )}

          {/* Tables for other menus */}
          {activeMenu !== "Dashboard" && (
            <TableContainer component={Paper} sx={{ background: themeColors.card }}>
              <Table>
                <TableHead sx={{ background: themeColors.sidebar }}>
                  <TableRow>
                    <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>NO DATA</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ color: "#fff" }}>No entries available</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Admin;

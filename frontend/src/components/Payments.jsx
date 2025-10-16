import React from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";

// Replace this with your UPI ID and QR image path
const UPI_ID = "9745325772@slice";
const QR_IMAGE = "/slice.jpg"; // ✅ just use '/slice.jpg', not '/public/slice.jpg'

const themeColors = {
  bg: "#0a1128",
  card: "#142136",
  primary: "#2979ff",
  hover: "#5393ff",
  text: "#e0e0e0",
};

const Payments = () => {
  const handlePay = () => {
    const link = `upi://pay?pa=${UPI_ID}&pn=Adnan%20T%20S&am=30&cu=INR`;
    window.open(link);
  };

  const handleCancel = () => {
    window.location.href = "/h"; // ✅ Redirect to home page
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: themeColors.bg,
        p: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          background: themeColors.card,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ color: "#fff", mb: 3 }}>
          Pay via UPI
        </Typography>

        <Box sx={{ mb: 3 }}>
          <img src={QR_IMAGE} alt="UPI QR" style={{ width: 200, height: 300, borderRadius: 8 }} />
        </Box>

        <Stack spacing={2}>
          <Button
            onClick={handlePay}
            sx={{
              background: themeColors.primary,
              color: "#fff",
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              "&:hover": { background: themeColors.hover },
            }}
          >
            Pay ₹30 via UPI
          </Button>

          <Button
            onClick={handleCancel}
            sx={{
              background: "#555",
              color: "#fff",
              width: "100%",
              py: 1.5,
              fontWeight: "bold",
              "&:hover": { background: "#777" },
            }}
          >
            Cancel
          </Button>
        </Stack>

        <Typography sx={{ mt: 3, color: "rgba(255, 255, 255, 1)", fontWeight: "bold" }}>
          Scan QR or click the button to pay
        </Typography>
      </Paper>
    </Box>
  );
};

export default Payments;

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Collapse,
  Select,
  MenuItem,
  TextField,
  Box,
  FormControl,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { ExpandMore, ExpandLess, Edit } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import transactions from "../data/transactionsData";

const localTheme = createTheme({
  typography: {
    fontFamily: "Avenir, Helvetica, Arial, sans-serif",
  },
});

export default function TransactionCards() {
  const [expandedRow, setExpandedRow] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [editCategory, setEditCategory] = useState("");
  const [editNote, setEditNote] = useState("");
  const primary = grey[50];

  const toggleRow = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
    setEditIndex(null);
    setEditCategory("");
    setEditNote("");
  };

  const startEdit = (index, field, value) => {
    setEditIndex(index);
    if (field === "category") {
      setEditCategory(value);
    } else if (field === "note") {
      setEditNote(value);
    }
  };

  return (
    <ThemeProvider theme={localTheme}>
      <Box className="transaction-container">
        <Box className="transaction-header">
          <Box className="transaction-header-detail" sx={{ flex: 1 }}>
            <Typography variant="h6">Date</Typography>
          </Box>
          <Box className="transaction-header-detail" sx={{ flex: 2 }}>
            <Typography variant="h6">Description</Typography>
          </Box>
          <Box
            className="transaction-header-detail"
            sx={{ flex: 1, textAlign: "right" }}
          >
            <Typography variant="h6">Amount</Typography>
          </Box>
          <Box
            className="transaction-header-detail"
            sx={{ flex: 1, textAlign: "right" }}
          >
            <Typography variant="h6">Balance</Typography>
          </Box>
        </Box>

        {transactions.map((transaction, index) => (
          <Card
            className="transaction-card"
            key={index}
            sx={{ borderRadius: "12px", boxShadow: 3, mb: 2 }}
          >
            <CardContent
              className="transaction-card-content"
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6">{transaction.date}</Typography>
              </Box>
              <Box sx={{ flex: 2 }}>
                <Typography variant="h6">{transaction.description}</Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>
                <Typography variant="h6">{transaction.amount}</Typography>
              </Box>
              <Box sx={{ flex: 1, textAlign: "right" }}>
                <Typography variant="h6">{transaction.balance}</Typography>
              </Box>
              <Box sx={{ width: "40px" }}>
                <IconButton
                  onClick={() => toggleRow(index)}
                  sx={{ color: primary }}
                >
                  {expandedRow === index ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
            </CardContent>
            <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
              <CardContent className="transaction-content-collapse">
                <Typography variant="h6" mb={1}>
                  Transaction type : {transaction.type}
                </Typography>
                <Box sx={{ mb: 1, display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">Category :&nbsp; </Typography>
                  {editIndex === index ? (
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                      <Select
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                        disableUnderline
                      >
                        <MenuItem value="Food">Food</MenuItem>
                        <MenuItem value="Transport">Transport</MenuItem>
                        <MenuItem value="Beverages">Beverages</MenuItem>
                        <MenuItem value="Utilities">Utilities</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h6">
                        {transaction.category}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          startEdit(index, "category", transaction.category)
                        }
                        sx={{ color: primary }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="h6">Note :&nbsp; </Typography>
                  {editIndex === index ? (
                    <TextField
                      variant="standard"
                      value={editNote}
                      onChange={(e) => setEditNote(e.target.value)}
                      sx={{ color: primary }}
                    />
                  ) : (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="h6">{transaction.note}</Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          startEdit(index, "note", transaction.note)
                        }
                        sx={{ color: primary }}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </ThemeProvider>
  );
}

import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  CssBaseline,
  Divider,
  Box,
} from "@mui/material";

import {
  rewrite,
  newGame,
  saveGame,
  loadGame,
  findNextCellToDelete,
  selectStateToSave,
} from "../puzzleGame/puzzleGameSlice.js";

function Navbar() {
  const state = useSelector(selectStateToSave);
  const dispatch = useDispatch();
  const location = useLocation();

  const [anchorEl, open] = useState(null);
  const handleClick = (event) => {
    if (location.pathname !== "/numbers_puzzle/") {
      navigate("/numbers_puzzle/");
    } else open(event.currentTarget);
  };

  const handleMenuClick = (action = null) => {
    if (action) dispatch(action);
    open(null);
  };
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Button
          variant="contained"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          Game
        </Button>
        <Box
          component="div"
          m={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ flexGrow: 1 }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/numbers_puzzle/rules")}
          >
            Rules
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/numbers_puzzle/about")}
          >
            about
          </Button>
          <Menu
            id="Game Menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClick}
          >
            <MenuItem
              onClick={() => {
                handleMenuClick(findNextCellToDelete());
              }}
            >
              Help me!
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClick(rewrite());
              }}
            >
              Rewrite
            </MenuItem>
            <Divider />

            <MenuItem
              onClick={() => {
                handleMenuClick(saveGame(state));
              }}
            >
              Save game
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClick(loadGame());
              }}
            >
              Load game
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClick(newGame());
              }}
            >
              New game
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;

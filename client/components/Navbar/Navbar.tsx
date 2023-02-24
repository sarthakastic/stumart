import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Icon } from "@mui/material";
import Image from "next/image";
import logo from "../../public/logo.png";

import Search from "./Search/Search";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar elevation={1} position="fixed" style={{ background: "#FAF6E9" }}>
        <Toolbar>
          <Box sx={{ cursor: "pointer" }}>
            <Image src={logo} alt="logo" width={100} height={60} />
          </Box>
          <Box>
            <Search />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "flex", md: "flex" } }}>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Box
                sx={{
                  md: "flex",
                }}
              >
                <IconButton size="large" style={{ color: "#20262E" }}>
                  <HomeIcon />
                </IconButton>
                <Typography
                  variant="body1"
                  sx={{ ml: 1, fontSize: { xs: 8, md: 14 } }}
                  style={{ color: "#20262E" }}
                >
                  Home
                </Typography>
              </Box>
            </Box>
            <Box sx={{ md: "flex", alignItems: "center" }}>
              <IconButton
                size="large"
                sx={{ marginLeft: { sm: "25%" } }}
                style={{ color: "#20262E" }}
              >
                <AddBoxIcon />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontSize: { xs: 8, md: 14 } }}
                style={{ color: "#20262E" }}
              >
                Add New Product
              </Typography>
            </Box>
            <Box
              onClick={handleProfileMenuOpen}
              sx={{ md: "flex", cursor: "pointer" }}
            >
              <IconButton
                size="large"
                edge="end"
                aria-controls={menuId}
                aria-haspopup="true"
                style={{ color: "#20262E" }}
              >
                <AccountCircle />
              </IconButton>
              <Typography
                variant="body1"
                sx={{ ml: 1, fontSize: { xs: 8, md: 14 } }}
                style={{ color: "#20262E" }}
              >
                Name
              </Typography>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </Box>
  );
}

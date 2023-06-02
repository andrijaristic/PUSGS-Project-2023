import React, { useState } from "react";
import { logout } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearProducts } from "../../../store/productsSlice";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { clearCart } from "../../../store/cartSlice";

const AvatarWithOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const avatar = useSelector((state) => state.user.avatar);
  const finishedRegistration = user && user.finishedRegistration;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const clickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeHandler = () => {
    setAnchorEl(null);
  };

  const profileClickHandler = () => {
    if (!finishedRegistration) {
      toast.info("Please finish registration process", {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: true,
        pauseOnHover: false,
      });

      setAnchorEl(null);
      return;
    }

    navigate("/profile");
    setAnchorEl(null);
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(clearProducts());
    dispatch(clearCart());

    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Settings">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body1"
            display="block"
            gutterBottom
            sx={{ color: "black", mt: 1, mr: -1 }}
          >
            {user ? user.name : ""}
          </Typography>
          <IconButton
            onClick={clickHandler}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar alt="avatar" src={avatar ? avatar : null} />
          </IconButton>
        </Box>
      </Tooltip>
      <Menu
        id="account-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeHandler}
        onClick={closeHandler}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={profileClickHandler}>
          <ListItemIcon>
            <PersonIcon fontSize="medium" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={logoutHandler}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default AvatarWithOptions;

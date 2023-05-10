import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import QueueIcon from "@mui/icons-material/Queue";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import InventoryIcon from "@mui/icons-material/Inventory";
import ViewListIcon from "@mui/icons-material/ViewList";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";

const generateNavItems = (user) => {
  if (
    user.verificationStatus !== "EXEMPT" &&
    user.verificationStatus !== "ACCEPTED"
  ) {
    return null;
  }

  let index = 0;
  let items = [];
  items.push({ name: "", index: index++ }); // Home page
  if (user.role === "BUYER") {
    items.push({ name: "Active orders", index: index++ });
    items.push({ name: "History", index: index++ });
    items.push({ name: "Checkout", index: index++ });

    return items;
  }

  if (user.role === "SELLER") {
    items.push({ name: "My products", index: index++ });
    items.push({ name: "New product", index: index++ });
    items.push({ name: "My orders", index: index++ });
    items.push({ name: "New orders", index: index++ });

    return items;
  }

  if (user.role === "ADMIN") {
    items.push({ name: "Sellers", index: index++ });
    items.push({ name: "Orders", index: index++ });

    return items;
  }
};

const icons = new Map();
icons.set("", <StorefrontIcon />);
icons.set("Active orders", <AccessTimeIcon />);
icons.set("History", <ReceiptLongIcon />);
icons.set("Checkout", <ShoppingCartIcon />);
icons.set("My products", <LibraryBooksIcon />);
icons.set("New product", <QueueIcon />);
icons.set("My orders", <InventoryIcon />);
icons.set("New orders", <LocalMallIcon />);
icons.set("Sellers", <PeopleIcon />);
icons.set("Orders", <ViewListIcon />);

const NavigationList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const user = useSelector((state) => state.user.user);

  const items = useMemo(() => {
    if (user !== null) {
      return generateNavItems(user);
    }

    return null;
  }, [user]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  //   const buttonClickHandler = (value) => {
  //     if (items !== null) {
  //       navigate(`/${items[value].name.toLowerCase().replace(" ", "-")}`);
  //     }
  //     setSelectedIndex(value);
  //   }; => Triggers constant re-renders

  // Doing it this way doesn't
  const buttonProps = (value) => ({
    selected: selectedIndex === value,
    onClick: () => {
      if (items !== null) {
        navigate(`/${items[value].name.toLowerCase().replace(" ", "-")}`);
      }
      setSelectedIndex(value);
    },
  });

  const drawerItems = items.map((item) => {
    return (
      <ListItemButton key={item.index} {...buttonProps}>
        <ListItemIcon sx={{ ml: 1, mr: -2 }}>
          {icons.get(item.name)}
        </ListItemIcon>
        <ListItemText
          sx={{ mr: 6 }}
          primary={item.name === "" ? "Products" : item.name}
        />
      </ListItemButton>
    );
  });

  // To stop constant re-renders from force changing current page
  useEffect(() => {
    if (pathname === "/profile") {
      setSelectedIndex(-1);
      return;
    }

    if (pathname === "/") {
      setSelectedIndex(0);
      return;
    }

    if (items === null) {
      return;
    }

    const filteredItems = items.filter(
      (item) => "/" + item.name.toLowerCase().replace(" ", "-") === pathname
    );
    if (filteredItems.length === 0) {
      setSelectedIndex(-1);
      return;
    }

    setSelectedIndex(filteredItems[0].index);
  }, [pathname, items]);

  return (
    <List component="nav" sx={{ mt: 4 }}>
      {drawerItems}
    </List>
  );
};

export default NavigationList;

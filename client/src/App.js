import React, { Suspense } from "react";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./styles/theme";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import LoadingModal from "./components/UI/Modal/LoadingModal";

function App() {
  return (
    <Suspense fallback={<LoadingModal show={true} />}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
          <ToastContainer theme="dark" />
        </ThemeProvider>
      </LocalizationProvider>
    </Suspense>
  );
}

export default App;

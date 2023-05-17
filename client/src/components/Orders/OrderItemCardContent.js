import React from "react";
import {
  Box,
  CardContent,
  Typography,
  Grid,
  FormHelperText,
  InputLabel,
} from "@mui/material";
import EuroIcon from "@mui/icons-material/Euro";
import OrderItemCardSection from "./OrderItemCardSection";
import OrderCancelTimer from "./OrderCancelTimer";
import OrderItemActions from "./OrderItemActions";

const OrderItemCardContent = (props) => {
  const deliveryDate = new Date(props.item.timeOfDelivery).toLocaleDateString(
    "en-GB",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }
  );

  return (
    <>
      <Box
        sx={{
          minWidth: "100%",
        }}
      >
        <CardContent>
          <Grid container direction="row" spacing={3} sx={{ flexGrow: 1 }}>
            <OrderItemCardSection>
              <InputLabel sx={{ fontSize: "20px" }}>Price</InputLabel>
              <Typography
                variant="h4"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <EuroIcon fontSize="small" />
                {`${props.item.price.toFixed(2)}`}
              </Typography>
              <FormHelperText sx={{ mt: 0, fontStyle: "italic" }}>
                {"* Delivery fee included"}
              </FormHelperText>
            </OrderItemCardSection>
            <OrderItemCardSection>
              <InputLabel sx={{ fontSize: "14px", mb: 1 }}>
                Cancellation timer
              </InputLabel>
              <Typography
                variant="h4"
                component="div"
                color="red"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {props.active && (
                  <OrderCancelTimer
                    cancellationWindow={new Date(props.item.cancellationWindow)}
                  />
                )}
              </Typography>
            </OrderItemCardSection>
            <OrderItemCardSection>
              <InputLabel sx={{ fontSize: "14px" }}>Delivery date</InputLabel>
              <Typography
                variant="h5"
                component="div"
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                {`${deliveryDate}`}
              </Typography>
            </OrderItemCardSection>
            <OrderItemCardSection
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <OrderItemActions id={props.item.id} />
            </OrderItemCardSection>
          </Grid>
        </CardContent>
      </Box>
    </>
  );
};

export default OrderItemCardContent;

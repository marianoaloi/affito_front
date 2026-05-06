"use client";
import { Alert, AlertTitle, Snackbar } from "@mui/material";
import { clearAffitoError } from "@/redux/services/affito/affitoTrunk";
import { getErrorAffito, useDispatch, useSelector } from "@/redux";

export default function AffitoErrorSnackbar() {
  const dispatch = useDispatch();
  const errorMSG = useSelector(getErrorAffito);
  const handleClose = () => { dispatch(clearAffitoError()); };

  return (
    <Snackbar
      open={!!errorMSG}
      autoHideDuration={10000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity="error" onClose={handleClose} sx={{ width: "100%" }}>
        <AlertTitle>Error</AlertTitle>
        {errorMSG}
      </Alert>
    </Snackbar>
  );
}

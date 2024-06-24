import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { ReactElement } from "react";

type PropsType = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  action: () => void;
};

export default function CartClearDialog({
  open,
  setOpen,
  action,
}: PropsType): ReactElement {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to remove all products from your shopping cart?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="success"
          onClick={() => {
            action();
            setOpen(false);
          }}
        >
          YES
        </Button>
        <Button
          color="success"
          onClick={() => {
            setOpen(false);
          }}
        >
          NO
        </Button>
      </DialogActions>
    </Dialog>
  );
}

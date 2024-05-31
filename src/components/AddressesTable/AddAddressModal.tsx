import { Button, Dialog, DialogTitle } from "@mui/material";
import { ReactElement, useState } from "react";
import { UpdateAddressForm } from "./UpdateAddressForm";

export function AddAddressModal(): ReactElement {
  const [openModal, setOpenModal] = useState(false);

  const onClickOpenModal = (): void => {
    setOpenModal(true);
  };

  const onCloseModal = (): void => {
    setOpenModal(false);
  };

  return (
    <>
      <Button
        sx={{ mb: 1 }}
        variant="contained"
        color="success"
        onClick={onClickOpenModal}
      >
        Add Address
      </Button>
      <Dialog open={openModal} onClose={onCloseModal}>
        <DialogTitle sx={{ p: 2 }}>Add new Address</DialogTitle>
        <UpdateAddressForm />
      </Dialog>
    </>
  );
}

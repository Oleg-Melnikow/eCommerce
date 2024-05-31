import { Fragment, ReactElement } from "react";
import { Chip, IconButton, TableCell, TableRow } from "@mui/material";
import useAuth from "hooks/use-auth";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Address, Customer } from "types/API/Customer";
import { UpdateAddressForm } from "./UpdateAddressForm";

type PropsType = {
  address: Address;
  openAddress: string;
  handleOpenAddress: (id: string) => void;
};

type AddressTypePropsType = {
  user: Customer;
  id: string;
};

function AddressType({ user, id }: AddressTypePropsType): ReactElement {
  const {
    billingAddressIds,
    shippingAddressIds,
    defaultBillingAddressId,
    defaultShippingAddressId,
  } = user;

  const checkAddress = (arrayId: string[] | undefined): boolean => {
    return !!arrayId?.includes(id);
  };

  return (
    <TableCell align="right" sx={{ display: "flex", gap: "5px" }}>
      {defaultBillingAddressId === id && <Chip label="Default billing" />}
      {defaultShippingAddressId === id && <Chip label="Default shipping" />}
      {checkAddress(billingAddressIds) && <Chip label="Billing" />}
      {checkAddress(shippingAddressIds) && <Chip label="Shipping" />}
    </TableCell>
  );
}

export function AddressListItem({
  address,
  openAddress,
  handleOpenAddress: handleOpenProduct,
}: PropsType): ReactElement {
  const { country, city, streetName, postalCode, id } = address;
  const { user } = useAuth();

  const open = id === openAddress;

  const openAddressForm = (): void => {
    handleOpenProduct(id || "");
  };

  return (
    <Fragment key={id}>
      <TableRow>
        <TableCell
          padding="checkbox"
          sx={{
            ...(open && {
              position: "relative",
              "&:after": {
                position: "absolute",
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: "success.main",
                width: 3,
                height: "calc(100% + 1px)",
              },
            }),
          }}
          width="25%"
        >
          <IconButton onClick={openAddressForm}>
            {open ? (
              <KeyboardArrowUpIcon fontSize="small" />
            ) : (
              <KeyboardArrowDownIcon fontSize="small" />
            )}
          </IconButton>
        </TableCell>
        <TableCell align="center">{country}</TableCell>
        <TableCell align="center">{city}</TableCell>
        <TableCell align="center">{streetName}</TableCell>
        <TableCell align="center">{postalCode}</TableCell>
        {user && <AddressType user={user} id={id || ""} />}
      </TableRow>
      {open && (
        <TableRow sx={{ background: "#fafafa" }}>
          <TableCell
            colSpan={7}
            sx={{
              p: 0,
              position: "relative",
              "&:after": {
                position: "absolute",
                content: '" "',
                top: 0,
                left: 0,
                backgroundColor: "success.main",
                width: 3,
                height: "calc(100% + 1px)",
              },
            }}
          >
            <UpdateAddressForm address={address} />
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  );
}

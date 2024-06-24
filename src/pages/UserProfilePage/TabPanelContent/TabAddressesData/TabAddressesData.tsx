import { ReactElement, useState } from "react";
import { AddressListItem } from "components/AddressesTable/AddressListItem";
import useAuth from "hooks/use-auth";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { AddAddressModal } from "components/AddressesTable/AddAddressModal";
import LoaderItem from "components/LoaderItem/LoaderItem";

const addressesTitle = ["Country", "City", "Street", "PostalCode"];

function AddressesTable(): ReactElement {
  const { user, isLoading } = useAuth();

  const [openAddress, setOpenAddress] = useState<string>("");

  const handleOpenAddress = (id: string): void => {
    setOpenAddress(id);
  };

  return (
    <>
      {isLoading && <LoaderItem />}
      <AddAddressModal />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 380 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              {addressesTitle.map((title) => (
                <TableCell align="center" key={title}>
                  {title}
                </TableCell>
              ))}
              <TableCell align="center">Address type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user?.addresses?.map((address) => (
              <AddressListItem
                address={address}
                key={address.id}
                openAddress={openAddress}
                handleOpenAddress={handleOpenAddress}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
export default AddressesTable;

import React, { ReactElement, useState, useCallback } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";

import { UserAddressesData } from "types/UserProfileDataProps/UserProfileDataProps";

interface AddressesDataProps {
  addressesData: UserAddressesData[];
}

const addressesTitle = ["Country", "City", "Street", "PostalCode"];

export default function BasicTable({
  addressesData,
}: AddressesDataProps): ReactElement {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const handleEditRow = (id: string): void => {
    setEditingRowId(id);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 380 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {addressesTitle.map((title) => (
              <TableCell key={title}>{title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {addressesData.map(
            ({ id, country, city, streetName, postalCode }) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {country}
                </TableCell>
                <TableCell align="left">{city}</TableCell>
                <TableCell align="left">{streetName}</TableCell>
                <TableCell align="left">{postalCode}</TableCell>

                <TableCell>
                  {editingRowId !== id ? (
                    <Button onClick={() => id && handleEditRow(id)}>
                      Edit
                    </Button>
                  ) : (
                    <Button onClick={() => setEditingRowId(null)}>Save</Button>
                  )}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

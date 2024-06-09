import React, { useState } from "react";
import { Address, Customer } from "../../../graphql/generated/schema";
import { ColDef } from "ag-grid-community";
import OmGrid from "../../../components/elements/OmGrid";
import { IconButton } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const [columnDefs] = useState([
    {
      field: "id",
      width: 100,
      suppressSizeToFit: true,
      cellRenderer: (params: any) => {
        return (
          <IconButton
            onClick={() =>
              window.open(`/customers/${params.data.id}`, "_black")
            }
          >
            <LaunchIcon fontSize="small" color="secondary" />
          </IconButton>
        );
      },
    },
    {
      field: "firstName",
    },
    {
      field: "lastName",
    },
    {
      field: "contactNumber",
    },
    { field: "email" },
    {
      field: "address",
      cellRenderer: (params: any) => {
        const address = params.data.address as Address;
        return `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.country}`;
      },
    },
  ] as ColDef[]);

  return <OmGrid rowData={customers} columnDefs={columnDefs} />;
};

export default CustomerList;

import React, { useState } from "react";
import { Address, Customer } from "../../../graphql/generated/schema";
import { ColDef } from "ag-grid-community";
import OmGrid from "../../../components/elements/OmGrid";

interface CustomerListProps {
  customers: Customer[];
}

const CustomerList = ({ customers }: CustomerListProps) => {
  const [columnDefs] = useState([
    { field: "id", width: 100, suppressSizeToFit: true},
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
        console.log(params.data.address);
        const address = params.data.address as Address;
        return `${address.addressLine1}, ${address.addressLine2}, ${address.city}, ${address.state}, ${address.country}`;
      }
    }
  ] as ColDef[]);


  return (
    <OmGrid rowData={customers} columnDefs={columnDefs} />
  )

};

export default CustomerList;
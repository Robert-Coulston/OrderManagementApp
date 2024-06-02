import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Address, Customer } from "../../../graphql/generated/schema";
import { ColDef } from "ag-grid-community";

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

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      flex: 1,
    }),
    []
  );

  return (
    <div className="ag-theme-alpine" style={{ height:500, width:'100%'}}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={customers}
          defaultColDef={defaultColDef}></AgGridReact>
    </div>
  )

};

export default CustomerList;
import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Order } from "../../../graphql/generated/schema";
import { ColDef } from "ag-grid-community";

interface OrderListProps {
  orders: Order[];
}

const OrderList = ({ orders }: OrderListProps) => {
  const [columnDefs] = useState([
    { field: "id", width: 100, suppressSizeToFit: true},
    { 
        field: "customer",
        cellRenderer: (params: any) => {
            return `${params.data.customer.firstName} ${params.data.customer.lastName}`;
        }
    },
    {field: "orderDate"},
    {field: "status"}
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
          rowData={orders}
          defaultColDef={defaultColDef}></AgGridReact>
    </div>
  )

};

export default OrderList;
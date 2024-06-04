import React, { useState } from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Order } from "../../../graphql/generated/schema";
import { ColDef } from "ag-grid-community";
import OmGrid from "../../../components/elements/OmGrid";

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

  return (
    <OmGrid rowData={orders} columnDefs={columnDefs} />
  )

};

export default OrderList;
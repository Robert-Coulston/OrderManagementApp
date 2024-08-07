import React from "react";
import "./styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import CustomersDashboard from "../../features/customers/customersDashboard/CustomersDashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../../features/home/HomePage";
import OrderDashboard from "../../features/orders/ordersDashboard/OrdersDashboard";
import CustomerPage from "../../features/customers/CustomerPage";
import OrderPage from "../../features/orders/OrderPage";
import NewCustomerPage from "../../features/customers/NewCustomerPage";
import NewOrderPage from "../../features/orders/NewOrderPage";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.REACT_APP_API_SCHEMA_URL
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage/>} />
            <Route path="customers" element={<CustomersDashboard />} />
            <Route path="customers/newCustomer" element={<NewCustomerPage />} />
            <Route path="customers/:customerId" element={<CustomerPage />} />
            <Route path="customers/:customerId/newOrder" element={<NewOrderPage />} />
            <Route path="orders" element={<OrderDashboard />} />
            <Route path="orders/:orderId" element={<OrderPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;

import React from "react";
import "./styles.css";
import { ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import CustomersDashboard from "../../features/customers/customersDashboard/CustomersDashboard";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:5133/graphql/",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CustomersDashboard />
    </ApolloProvider>
  );
}

export default App;

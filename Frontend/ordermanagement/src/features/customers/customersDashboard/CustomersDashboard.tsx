import React from 'react';
import { useGetCustomersQuery } from '../../../graphql/generated/schema';


export default function CustomersDashboard() {
    const {data: customersData, loading, error} = useGetCustomersQuery();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!customersData) return <div>Error with customer data</div>;

    return (
        <div>
            <h1>Customers</h1>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Contact Number</th>
                        <th>Email</th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customersData.customers.map(customer => (
                        <tr key={customer?.id}>
                            <td>{customer?.firstName}</td>
                            <td>{customer?.lastName}</td>
                            <td>{customer?.contactNumber}</td>
                            <td>{customer?.email}</td>
                            <td>{customer?.address?.addressLine1}, {customer.address?.addressLine2}, {customer.address?.city}, {customer.address?.state}, {customer.address?.country}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
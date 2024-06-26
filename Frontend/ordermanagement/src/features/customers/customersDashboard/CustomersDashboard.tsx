import React from 'react';
import { Customer, useGetCustomersQuery } from '../../../graphql/generated/schema';
import { Grid, Typography } from '@mui/material';
import CustomerList from '../customersList/CustomerList';
import OmLoading from '../../../components/elements/OmLoading';
import OmAlert from '../../../components/elements/OmAlert';


export default function CustomersDashboard() {
    const {data: customersData, loading, error} = useGetCustomersQuery();

    if (loading) return <OmLoading />;
    if (error) return <OmAlert message={error.message} />;
    if (!customersData) return <div>Error with customer data</div>;

    const customers = customersData.customers as Customer[];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography component='div' variant='h5' display='block' gutterBottom align='center'>Customers List</Typography>
            </Grid>
            <Grid item xs={12}>
               <CustomerList customers={customers} />
            </Grid>
        </Grid>
    )
}
import { List, ListItem, ListItemText, Typography } from '@material-ui/core'
import { get } from 'lodash';
import React from 'react'

const Review = ({ checkoutToken }) => {
    const line_items = get(checkoutToken, 'line_items',[]);
    // const formatted_with_symbolLine_totalProduct = get(product, 'line_total.formatted_with_symbol');
    const formatted_with_symbolSubtotalLiveCheckoutToken = get(checkoutToken, 'subtotal.formatted_with_symbol');
    return (
        <>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {line_items.map((product) => (
                    <ListItem style={{ padding: '10px 0' }} key={product.name}>
                        <ListItemText primary={product.name} secondary={`Quantity: ${product.quantity}`} />
                        <Typography variant='body2'>{product.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }} >
                    <ListItemText primary="Total" />
                    <Typography variant='subtitle1' style={{ fontWeight: 700 }} >
                        {formatted_with_symbolSubtotalLiveCheckoutToken}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review
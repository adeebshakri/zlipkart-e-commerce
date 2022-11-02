import React from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import useStyles from './styles';
import { get } from 'lodash';
import CartItem from './CartItem/CartItem';
import { Link } from 'react-router-dom';

const Cart = ({ cart, handleUpdateCartQty, handleRemoveFromCart, handleEmptyCart }) => {
    const classes = useStyles();



    const isEmpty = !get(cart, 'line_items', []).length;
    const line_items = get(cart, 'line_items', []);
    const formatted_with_symbol = get(cart, 'subtotal.formatted_with_symbol', 0);
    const EmptyCart = () => (
        <Typography className={classes.title} variant="h3">Your Shopping Cart is empty, please 
            <Link className={classes.link} to="/"> add some items</Link>!
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={3}>
                {line_items.map((item) => (
                    <Grid item xs={12} sm={4} key={item.id}>
                        <CartItem item={item} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} />
                    </Grid>
                ))}
            </Grid>
            <div className={classes.cardDetails}>
                <Typography variant='h4'>Subtotal: {formatted_with_symbol}</Typography>
                <div>
                    <Button className={classes.emptyButton} size="large" type="button" variant="contained" color="secondary" onClick={() =>handleEmptyCart()}>Empty Cart</Button>
                    <Button component={Link} to="/checkout" className={classes.checkoutButton} size="large" type="button" variant="contained" color="primary">Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!line_items) return "Loading...";

    return (
        <Container  className={classes.container}>
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            <div className={classes.toolbar} />

            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
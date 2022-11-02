import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './styles';
import { get } from 'lodash';
import PlaceHolderImg from '../../../assets/placeholder_img.png'

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
    const classes = useStyles();

    const source = get(item, 'image.url', PlaceHolderImg);
    const name = get(item, 'name');
    const quantity = get(item, 'quantity', 0);
    const formatted_with_symbol = get(item, 'line_total.formatted_with_symbol');
    const id = get(item, 'id');

    return (
        <Card>
            <CardMedia image={source} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant='h4'>{name}</Typography>
                <Typography variant='h5'>{formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type="button" size='small' onClick={() => handleUpdateCartQty(id, quantity - 1)}>-</Button>
                    <Typography>{quantity}</Typography>
                    <Button type="button" size='small' onClick={() => handleUpdateCartQty(id, quantity + 1)}>+</Button>

                </div>
                <Button variant='contained' type="button" color="secondary" className={classes.remove} onClick={() => handleRemoveFromCart(id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
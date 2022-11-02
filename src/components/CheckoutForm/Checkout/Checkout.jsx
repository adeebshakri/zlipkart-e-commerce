import React, { useEffect, useState } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button, CssBaseline} from '@material-ui/core';
import useStyles from './styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import { commerce } from '../../../lib/commerce';
import { get, isEmpty } from 'lodash';
import { Link } from 'react-router-dom';

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({})
    const cartId = get(cart, 'id');

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cartId, { type: 'cart' });
                console.log('333333333', {token})
                setCheckoutToken(token);
            } catch (e) {
            }
        }
        !isEmpty(cart) && generateToken();
    }, [cart])

    const Form = () => activeStep === 0 ? <AddressForm checkoutToken={checkoutToken} next={next} /> 
    : <PaymentForm nextStep={nextStep} backStep={backStep} shippingData={shippingData} checkoutToken={checkoutToken} onCaptureCheckout={onCaptureCheckout}/>

    const Confirmation = () => (
        <>
            <div>
                <Typography variant='h5'>Thank you for your purchase! {shippingData.firstname} {shippingData.lastname}</Typography>
                <Divider className={classes.divider} style={{margin: "10px 0 20px 0"}}/>
            </div>
            <Button component={Link} to="/" variant='outlined' type='button'>Back To Home</Button>
        </>
    )



    return (
        <>
        <CssBaseline/>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align="center">Checkout</Typography>
                    <Stepper activeStep={0} className={classes.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
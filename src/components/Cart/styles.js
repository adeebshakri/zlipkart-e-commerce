import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    background:  'radial-gradient(#47384a, transparent)',
    marginTop: '4.5%',
    
  },
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
    paddingTop: "3%"
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    paddingBottom: '6%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));
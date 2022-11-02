import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
    background: 'radial-gradient(#47384a, transparent)',
    '::-webkit-scrollbar' : {
      width: '10px'
    }
  },
  root: {
    flexGrow: 1,
  },
}));
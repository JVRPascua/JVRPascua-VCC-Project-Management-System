import React, {useState} from "react";
import { Container, Paper, Grid, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate} from "react-router-dom";
import { changePass } from '../../actions/auth';
import Logo from "./Logo";
import useStyles from './styles';
import { motion } from "framer-motion";
import { RootStyle, HeadingStyle, ContentStyle, fadeInUp } from "./styles2";

const initialState = { password: ''};
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('redirect') === 'true') {
  const email = urlParams.get('email');
  window.location.href = `/changepasswordpage?email=${email}`;
}

const ChangePasswordPage = () => {

    const classes = useStyles();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const email = urlParams.get('email');

    const handleSubmit = async (e) => {
      e.preventDefault();
      await changePass(formData, {email: email}, navigate)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />
          </HeadingStyle>
          <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
            <form className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                    <>
                    <Grid xs={10} md={12}>
                        <Typography align="center"><strong>Change Password for {email}</strong></Typography>
                        <TextField name="password" label='Enter Password' variant="outlined" fullWidth="true" required type={showPassword ? "text" : "password"} onChange={handleChange} 
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            </InputAdornment>
                            )
                        }}
                    /> 
                    </Grid>
                    <Grid xs={10} md={12}> 
                    </Grid>
                    </>
                </Grid>
                <Button type="submit" fullWidth="true" variant="contained" color="primary" className="classes.submit">Change Password</Button>
            </form>
            </Paper>
            </Container>
        </ContentStyle>
      </Container>
    </RootStyle>
    
  );
};

export default ChangePasswordPage;
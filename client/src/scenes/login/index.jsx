import { Button, Card, CardContent, CardActions, FormGroup, Grid, Typography } from '@mui/material'
import CustomInput from 'components/CustomInput'
import FlexBetween from 'components/FlexBetween'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from 'state';
import Spinner from 'components/Spinner';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const { email, password } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.global
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password,
        }

        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <FlexBetween sx={{ margin: `auto, 0` }}>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh', margin: '20px' }}
            >

                <Grid item xs={3}>
                    <Card sx={{ minWidth: 375 }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Login</Typography>
                            <form onSubmit={onSubmit}>
                                <FormGroup sx={{
                                    "& .css-1oyqvjs-MuiInputBase-root-MuiInput-root": {
                                        margin: "16px 0",
                                    }
                                }}>
                                    <CustomInput title="Email Address" name="email" id="user-email" value={email} handleChange={onChange} />
                                    <CustomInput title="Password" v name="password" id="password" type="password" subtitle="Attemps remaining 3" value={password} handleChange={onChange} />
                                    <Button type="submit" variant="contained"
                                        sx={{ justifyContent: "center", alignItems: "center", textTransformation: "none", gap: "1rem" }}>Login</Button>
                                </FormGroup>
                            </form>


                        </CardContent>
                        <CardActions>
                            Not Registered?
                            <Button onClick={() => {
                                navigate(`/register`);
                            }} size="small">Register</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </FlexBetween >
    )
}

export default Login
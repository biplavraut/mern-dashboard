import { Button, Card, CardContent, FormGroup, Grid, Typography } from '@mui/material'
import CustomInput from 'components/CustomInput'
import FlexBetween from 'components/FlexBetween'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from 'state';
import Spinner from 'components/Spinner';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        role:'user'
    })

    const { name, email, password, password2, role } = formData

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

        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                name,
                email,
                password,
                role
            }

            dispatch(register(userData))
        }
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
                                Register</Typography>
                            <form onSubmit={onSubmit}>
                                <FormGroup sx={{
                                    "& .css-1oyqvjs-MuiInputBase-root-MuiInput-root": {
                                        margin: "16px 0",
                                    }
                                }}>
                                    <CustomInput title="Email Address" name="email" id="email" value={email} handleChange={onChange} />
                                    <CustomInput title="Full Name" name="name" id="user-name" value={name} handleChange={onChange} />
                                    <CustomInput title="Password" name="password" id="password" type="password" value={password} handleChange={onChange} />
                                    <CustomInput title="Confirm Password" name="password2" id="password2" type="password" subtitle={password == password2 ? 'Matched' : 'Not Matched'} value={password2} handleChange={onChange} />
                                    <Button type="submit" variant="contained"
                                        sx={{ justifyContent: "center", alignItems: "center", textTransformation: "none", gap: "1rem" }}>Login</Button>
                                </FormGroup>
                            </form>


                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </FlexBetween >
    )
}

export default Register
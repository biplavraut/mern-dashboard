import { Box, Button, Card, CardContent, FormGroup, Grid } from '@mui/material'
import CustomInput from 'components/CustomInput'
import CustomSelect from 'components/CustomSelect'
import FlexBetween from 'components/FlexBetween'
import Header from 'components/Header'
import React, { useState } from 'react'
import postService from 'services/postService'

const AdminCreate = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        city: "",
        state: "",
        country: "NP",
        occupation: "",
        phoneNumber: "",
        role: ""
    })

    const roleOptions = [
        { label: 'Customer', value: 'customer' },
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' }
        
    ];
    const { name, email, password, city, state, country, occupation, phoneNumber, role } = formData;
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        e.preventDefault()

        const data = formData
        try {
            return postService.addAdmin(data);

        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return console.log(message);
        }
    }
    return (
        <Box m="1.5rem 2.5rem">
            <Header title="ADMINS" subtitle="Create a new admin user" />

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
                                <form onSubmit={onSubmit}>
                                    <FormGroup sx={{
                                        "& .css-1oyqvjs-MuiInputBase-root-MuiInput-root": {
                                            margin: "16px 0",
                                        }
                                    }}>
                                        <CustomInput title="Email Address" name="email" id="user-email" value={email} handleChange={onChange} />
                                        <CustomInput title="Full Name" name="name" id="user-name" value={name} handleChange={onChange} />
                                        <CustomSelect title="Role" name="role" id="role" label="select role" value={role} items={roleOptions} handleChange={onChange} />
                                        <CustomInput title="Password" v name="password" id="password" type="password" value={password} handleChange={onChange} />
                                        <Button type="submit" variant="contained"
                                            sx={{ justifyContent: "center", alignItems: "center", textTransformation: "none", gap: "1rem" }}>Submit</Button>
                                    </FormGroup>
                                </form>


                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </FlexBetween >
        </Box>
    )
}

export default AdminCreate
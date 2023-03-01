import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material'
import React from 'react'

const CustomInput = ({ title, name, type = "text", id, subtitle, value, handleChange }) => {
    return (
        <FormControl>
            <InputLabel htmlFor={id}>{title}</InputLabel>
            <Input type={type} id={id} name={name} value={value} onChange={handleChange} />
            <FormHelperText sx={{
                "& .css-1pqjav8-MuiFormHelperText-root": {
                    margin: "5px"
                }
            }}>{subtitle}</FormHelperText>
        </FormControl >
    )
}

export default CustomInput
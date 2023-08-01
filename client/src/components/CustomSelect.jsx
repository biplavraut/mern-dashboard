import { FormControl, FormHelperText, Select, MenuItem, InputLabel } from '@mui/material'
import React from 'react'

const CustomSelect = ({ title, name, labelId = "demo-simple-select-label", id, label, value, items, handleChange }) => {
    return (
       
        <FormControl fullWidth>
        <InputLabel htmlFor={id}>{title}</InputLabel>
        <Select
            labelId={labelId}
            id={id}
            value={value}
            name={name}
            label={label}
            onChange={handleChange}
        >
                <MenuItem value >Select {label}</MenuItem>

                {items?.map(item => {
                    return (
                        <MenuItem key={item.value} value={item.value} selected={item.value == value}>
                            {item.label ?? item.value}
                        </MenuItem>
                    );
                })}
        </Select>
        </FormControl >
    )
}

export default CustomSelect
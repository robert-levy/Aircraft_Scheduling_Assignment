import React from 'react'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Box, Button } from '@material-ui/core';


const DisplayDate = () => {
    const today = new Date()
    let tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow = tomorrow.toDateString()
    return (
        <div>
            {tomorrow}
        </div>
    )
}

const Header = () => {
    return (
        <Box display="flex" marginBottom={5} marginTop={5}>
            <Button> <ChevronLeftIcon /></Button>
            <DisplayDate />
            <Button><ChevronRightIcon /></Button>
        </Box>
    )
}

export default Header

import React from 'react'
import { Paper, Box, Typography } from '@material-ui/core'


const Aircrafts = ({ aircrafts, aircraftUtilization }) => {
    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h6">Aircrafts</Typography>
            <Box border="solid 2px black" height="60vh" margin={1} padding={2}>
                <Paper>
                    {aircrafts.map(aircraft => (
                        aircraft.ident
                    ))}
                    <p>{`(${aircraftUtilization})`}</p>
                </Paper>
            </Box>
        </div>
    )
}

export default Aircrafts

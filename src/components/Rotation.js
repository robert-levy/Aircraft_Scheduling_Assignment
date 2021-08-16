import React from 'react'
import { Card, CardContent, Box, Typography } from '@material-ui/core'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Flight = ({ flight, index }) => {


    return (
        <Draggable draggableId={flight.ident} index={index}>
            {(provided) => (
                <Card style={{ margin: 5 }} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <CardContent>
                        <Typography>{`Flight: ${flight.ident}`}</Typography>
                        <Box display="flex" justifyContent="space-between" >
                            <Typography variant="body2">{flight.origin}</Typography>
                            <ArrowRightAltIcon fontSize="large" />
                            <Typography variant="body2">{flight.destination}</Typography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                            <Typography variant="body2">{flight.readable_departure}</Typography>
                            <Typography variant="body2">{flight.readable_arrival}</Typography>
                        </Box>

                    </CardContent>
                </Card>
            )}
        </Draggable>
    )
}

const Rotation = ({ selectedAircraft, rotation, calculateUtilization }) => {

    React.useEffect(() => {
        calculateUtilization()
    }, [rotation])

    return (
        <div style={{ textAlign: "center" }}>
            <Droppable droppableId="rotation">
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}>
                        <Typography variant="h6">Rotation: {selectedAircraft?.ident}</Typography>
                        <Box border="solid 2px black" height="60vh" margin={1} padding={2} style={{
                            overflow: "hidden",
                            overflowY: "scroll"
                        }}>
                            {
                                rotation.length === 0 || rotation === undefined ? <Typography>drag flights here</Typography>
                                    : rotation.map((flight, index) => (
                                        <Flight flight={flight} key={flight.ident} index={index} />
                                    ))
                            }
                        </Box>
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </div>
    )

}

export default Rotation

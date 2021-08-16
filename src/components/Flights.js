import React from 'react'
import { Card, CardContent, Box, Typography } from '@material-ui/core'
import { Droppable, Draggable } from 'react-beautiful-dnd'

const Flight = ({ flight, index }) => {
    return (
        <Draggable draggableId={flight.id} index={index}>
            {(provided) => (
                <Card style={{ margin: 5 }} {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps}>
                    <CardContent>
                        <Typography>{flight.id}</Typography>
                        <Box display="flex" justifyContent="space-between" >
                            <Typography variant="body2">{flight.origin}</Typography>
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

const Flights = ({ flights }) => {
    return (
        <Droppable droppableId="flights">
            {(provided) => (
                <div style={{ textAlign: "center" }}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                >
                    <Typography variant="h6">Flights</Typography>
                    <Box border="solid 2px black" height="60vh" margin={1} padding={2}
                        style={{
                            overflow: "hidden",
                            overflowY: "scroll"
                        }}>
                        {
                            Array.isArray(flights) && flights.length ?

                                flights.map((flight, index) => {
                                    return (
                                        <Flight flight={flight} index={index} key={flight.id} />
                                    )
                                })
                                :
                                <div>Loading ...</div>
                        }

                    </Box>
                    {provided.placeholder}

                </div>
            )}
        </Droppable>
    )
}

export default Flights

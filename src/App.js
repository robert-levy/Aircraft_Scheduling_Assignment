import React from 'react';
import './App.css';
import { Grid, Paper } from '@material-ui/core'
import { Header, Aircrafts, Rotation, Flights } from './components'
import { DragDropContext } from 'react-beautiful-dnd'

const AircraftURL = process.env.REACT_APP_AIRCRAFT_URL
const FlightsURL = process.env.REACT_APP_FLIGHTS_URL

const App = () => {
  const [aircrafts, setAircrafts] = React.useState([])
  const [flights, setFlights] = React.useState([])
  const [rotation, setRotation] = React.useState([])
  const [aircraftUtilization, setAircraftUtilization] = React.useState()

  React.useEffect(() => {
    try {
      const getAircrafts = async () => {
        const { data } = await (await fetch(AircraftURL)).json()
        setAircrafts([data])
      }
      const getFlights = async () => {
        const { data } = await (await fetch(FlightsURL)).json()
        setFlights(data)
      }
      getAircrafts()
      getFlights()
    } catch (error) {
      alert(error.message)
    }
  }, []);

  const reorder = (flights, startIndex, endIndex) => {
    const items = flights
    const [reorderedItem] = items.splice(startIndex, 1)
    items.splice(endIndex, 0, reorderedItem)
    return items
  }

  const handleOnDragEnd = (result) => {

    // if dragged outside dragcontext do nothing
    if (!result.destination) return

    const { source, destination, draggableId } = result;
    if (destination.droppableId === source.droppableId) {
      switch (destination.droppableId) {
        case `flights`:
          const newFlights = reorder(flights, source.index, destination.index)
          setFlights(() => newFlights)
          break;

        case `rotation`:
          const newRotation = reorder(rotation, source.index, destination.index)
          setRotation(() => newRotation)
          break

        default:
          return
      }
    } else if (destination.droppableId !== source.droppableId) {
      switch (destination.droppableId) {
        case `flights`:
          break;

        case `rotation`:
          // remove from flights
          let newFlights = flights
          newFlights = newFlights.filter(flight => flight.id !== draggableId)
          let [draggedFlight] = flights.filter(flight => flight.id === draggableId)
          setFlights(() => newFlights)
          // add to rotation
          let newRotation = rotation
          draggedFlight["ident"] = draggedFlight.id //
          delete draggedFlight["id"]
          newRotation.push(draggedFlight)
          setRotation([...newRotation])
          break;

          default:
            return
      }
    }
  }

  const calculateUtilization = () => {
    let totalFlightTime = 0
    let totalTAT = 0
    rotation.forEach(flight => {
      totalFlightTime += (flight.arrivaltime - flight.departuretime)
      totalTAT += 1200 // 20 mins TAT
    })
    let utilization = (((totalFlightTime + totalTAT) / 86400) * 100).toFixed(2)
    setAircraftUtilization(`${utilization}%`)
  }

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid container item xs={12} justifyContent="center">
        <Header />
      </Grid>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Grid item xs={4} lg={3}>
          <Aircrafts aircrafts={aircrafts} aircraftUtilization={aircraftUtilization} />
        </Grid>
        <Grid item xs={4} lg={3}>
          <Rotation selectedAircraft={aircrafts[0]} rotation={rotation} calculateUtilization={calculateUtilization} />
        </Grid>
        <Grid item xs={4} lg={3}>
          <Flights flights={flights} />
        </Grid>
        <Grid container item xs={12} alignContent="center" justifyContent="center">
          <Paper>Utilization bar</Paper>
        </Grid>
      </DragDropContext>
    </Grid>
  );
}

export default App;

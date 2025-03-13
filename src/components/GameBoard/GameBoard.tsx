import MapLocation from './MapLocation';

// TODO: generate a realistic number of spaces
// TODO: evenly distribute the spaces (springs/poisson?)
// TODO: color the graph coherently
// TODO: connect the nodes
// TODO: store the map in the context
// TODO: generate the map on the server
// TODO: scaling
// TODO: display character
// TODO: fade by hovered zones
// TODO: secondary enlargement for movable spaces
export default function GameBoard() {
    let zones = ["#CEB992", "#73937E", "#585563", "#5B2E48", "#471323"];
    let mapLocations : JSX.Element[] = [];
    for (let i = 0; i < Math.floor(Math.random()*13+25); i++) {
        let x = Math.floor(Math.random()*90);
        let y = Math.floor(Math.random()*90);
        let selectedZones : string[] = [...zones].sort((_,__) => Math.random()-0.5).slice(0, Math.ceil(Math.random()*zones.length));
        mapLocations.push(
            <MapLocation
                x={x}
                y={y}
                zones={selectedZones}
            />
        )
    }
    return(
        <svg className='h-[100%] w-full flex justify-left items-top border border-white'>
            {/* Background Image */}
            {/* Spots
                - zones */}
            {/* <MapLocation x={40} y={50} zones={["red"]}/>
            <MapLocation x={50} y={50} zones={["green"]}/>
            <MapLocation x={60} y={50} zones={["blue", "green"]}/>
            <MapLocation x={70} y={50} zones={["red", "green", "blue"]}/> */}
            {mapLocations}
            {/* Connections */}
        </svg>
    );
}
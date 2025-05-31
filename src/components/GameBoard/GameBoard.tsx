import { useMemo, useRef, useState } from 'react';
import MapConfig from '../../constants/MapConfig';
import LocationRenderer, { MapLocation } from './MapLocation';
import PathsRenderer from './PathRenderer';
import UseDrag from './UseDrag';
import UseScroll from './UseScroll';

function Clamp(val: number, min: number, max: number): number {
    return (Math.min(Math.max(val, min), max));
}

function DecimalBetween(min: number, max: number): number {
    return (Math.random() * (max - min)) + min;
}

function IntBetween(min: number, max: number): number {
    return Math.round((Math.random() * (max - min)) + min);
}

function distSq(x1: number, y1: number, x2: number, y2: number): number {
    return (x2-x1)**2 + (y2-y1)**2;
}

function ShuffleArr<T>(arr: T[]) {
    return [...arr].sort((_, __) => Math.random()-0.5);
}

function TryAddLocation(locations: MapLocation[], x: number, y: number): boolean {
    let newLocation: MapLocation = { x, y, zones: [], connections: [] };
    if (IsLocationValid(locations, newLocation)) {
        locations.push(newLocation);
        return true;
    }
    return false;
}

function IsLocationValid(locations: MapLocation[], newLocation: MapLocation): boolean {
    let bufferDistSq = ((MapConfig.LOCATION_R_HOVERED+10)**2)*2;
    return !locations.some(l => distSq(l.x, l.y, newLocation.x, newLocation.y) < bufferDistSq);
}

function GenerateMapLocations(): MapLocation[] {
    let clampXMin = MapConfig.LOCATION_R_HOVERED + 10;
    let clampXMax = MapConfig.WIDTH - clampXMin;
    let clampYMin = clampXMin;
    let clampYMax = MapConfig.HEIGHT - clampYMin;

    let mapLocations: MapLocation[] = [];
    for (let col = 0; col < MapConfig.COLS; col++) {
        for (let row = 0; row < MapConfig.ROWS; row++) {
            let randX, randY, attempts = 0;
            do {
                let minX = MapConfig.WIDTH / MapConfig.COLS * col;
                let maxX = MapConfig.WIDTH / MapConfig.COLS * (col + 1);
                let minY = MapConfig.HEIGHT / MapConfig.ROWS * row;
                let maxY = MapConfig.HEIGHT / MapConfig.ROWS * (row + 1);
                
                randX = DecimalBetween(minX, maxX);
                randX = Clamp(randX, clampXMin, clampXMax);
                randY = DecimalBetween(minY, maxY);
                randY = Clamp(randY, clampYMin, clampYMax);
            } while (!TryAddLocation(mapLocations, randX, randY) && attempts++ < 10);
        }
    }
    return mapLocations;
}

function GenerateMapConnections(locations: MapLocation[]) {
    interface DistanceWithIndex {
        dist: number,
        index: number,
    };

    for (const location of locations) {
        // Generate a random number [numConns] of connections for each location (2-4) [weighted??]
        const numConns = IntBetween(2, 4);

        // Find the [numConns] closest locations
        const distances: DistanceWithIndex[] = locations.map((l, i) => {
            const dist = l == location ? Infinity : distSq(l.x, l.y, location.x, location.y);
            return { dist, index: i };
        }).sort((a, b) => a.dist - b.dist);
        let closestLocations = distances.slice(0, numConns);

        // Connect each location to the [numConns] closest locations
        for (let connection of closestLocations) {
            location.connections ??= [];
            location.connections.push(locations[connection.index]);
            // Connections are bi-directional
            locations[connection.index].connections ??= [];
            locations[connection.index].connections.push(location);
        }
    }
}

// TODO:
function GenerateMapZones(locations: MapLocation[]) {
    // I don't claim this is a good approach, but it'll work for now...
    // Shuffle the locations
    const shuffledLocations = ShuffleArr(locations);
    // Decide how many zones to use
    let numZones = 0;
    while (true) {
        numZones = IntBetween(1, MapConfig.ZONES.length);
        // Makes the extremes less likely
        if (Math.abs(Math.round(MapConfig.ZONES.length/2) - numZones) * Math.random() < 0.05) break;
    }
    
    // Assign each zone to one node
    for (let i = 0; i < numZones; i++) {
        shuffledLocations[i].zones.push(MapConfig.ZONES[i]);
    }
    // While any node has empty zones list
    while (shuffledLocations.some(l => l.zones.length == 0)) {
        // Loop through whole list, if random < threshold, try pull a random zone from a random neighbor
        for (let location of shuffledLocations) {
            if (Math.random() > 0.1) continue;
            const randNeighbor = ShuffleArr(location.connections).pop();
            const randZone = ShuffleArr(randNeighbor!.zones).pop();
            if (randZone == undefined) continue;
            if (location.zones.includes(randZone)) continue;
            location.zones.push(randZone);
        }
    }
    // This will yield zones that are connected

    // Traverse and color the graph somehow?
    // locations.forEach(() => {});
    // for (let i = 0; i < Math.floor(Math.random()*13+25); i++) {
    //     let x = Math.floor(Math.random()*90);
    //     let y = Math.floor(Math.random()*90);
    //     let selectedZones : string[] = [...zones].sort((_,__) => Math.random()-0.5).slice(0, Math.ceil(Math.random()*zones.length));
    //     mapLocations.push(
    //         <LocationRenderer
    //             x={x}
    //             y={y}
    //             zones={selectedZones}
    //         />
    //     )
    // }
}

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
// TODO: Unique keys
export default function GameBoard() {
    var mapLocations = useMemo(() => {
        let mapLocations = GenerateMapLocations();
        GenerateMapConnections(mapLocations);
        GenerateMapZones(mapLocations);
        return mapLocations;
    }, []);

    // let [isDragging, setIsDragging] = useState(false);
    let targetRef = useRef(null);
    let {wheelY} = UseScroll(targetRef.current);
    let {offsetX, offsetY} = UseDrag(targetRef.current, 1 - 1/wheelY);

    return(
        <div className='relative size-full flex border border-white overflow-hidden' ref={targetRef}>
            {/* TODO: width and height & remove border */}
            <svg className='absolute border' viewBox={`${offsetX - wheelY/2} ${offsetY} ${MapConfig.WIDTH + wheelY} ${MapConfig.HEIGHT}`} width={MapConfig.WIDTH} height={MapConfig.HEIGHT}>
                {/* Background Image */}

                {/* Pathways (because they should be behind) */}
                {mapLocations.map(location => (
                    <PathsRenderer x={location.x} y={location.y} connections={location.connections}/>
                ))};
                
                {/* Spots (with zones) */}
                {/*
                    <LocationRenderer x={MapConfig.WIDTH * 0.35} y={50} zones={["red"]}/>
                    <LocationRenderer x={MapConfig.WIDTH * 0.45} y={50} zones={["green"]}/>
                    <LocationRenderer x={MapConfig.WIDTH * 0.55} y={50} zones={["blue", "green"]}/>
                    <LocationRenderer x={MapConfig.WIDTH * 0.65} y={50} zones={["red", "green", "blue"]}/>
                */}
                {mapLocations.map(location => (
                    <LocationRenderer x={location.x} y={location.y} zones={location.zones}/>
                ))};
            </svg>
        </div>
    );
}
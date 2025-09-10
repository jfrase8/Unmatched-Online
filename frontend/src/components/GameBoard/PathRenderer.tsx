import MapConfig from "../../constants/MapConfig";
import { MapLocation } from "./MapLocation";

// TODO: Fix overdraw (bidirectional connections)
export default function PathsRenderer({connections, x, y}: Pick<MapLocation, 'x' | 'y' | 'connections'>) {
    return (<>
        {connections.map(l =>
            <line
                x1={x}
                y1={y}
                x2={l.x}
                y2={l.y}
                stroke={MapConfig.STROKE}
                strokeWidth={MapConfig.STROKE_WIDTH}
            />
        )}
    </>);
}
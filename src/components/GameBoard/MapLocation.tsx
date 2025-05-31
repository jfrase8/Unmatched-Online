import { useState } from "react";
import MapConfig from "../../constants/MapConfig";

export interface MapLocation {
    x: number
    y: number
    zones: string[]
    connections: MapLocation[]
}

export default function LocationRenderer({x, y, zones} : Omit<MapLocation, 'connections'>) {
    const [hovered, setHovered] = useState(false);
    const patternId = `${x}.${y}.testPattern`;
    const r = hovered ? MapConfig.LOCATION_R_HOVERED : MapConfig.LOCATION_R;
    const circumference = 2*Math.PI*r;
    return (
        <>
            <defs>
                <pattern id={patternId} x="0%" y="0%" height="100%" width="100%" viewBox="0 0 100 100">
                    {zones.map((zone, i) => {
                        return <circle
                            // https://stackoverflow.com/a/59923322
                            key={Math.random()}
                            cx="50"
                            cy="50"
                            r={r}
                            stroke={zone}
                            strokeWidth={r*2}
                            strokeDasharray={`${circumference/zones.length} ${circumference}`}
                            strokeDashoffset={-circumference/zones.length * i}
                            fill="transparent"
                            transform="rotate(-90) translate(-100)"
                        />;
                    })}
                </pattern>
            </defs>
            <circle
                className="transition-[r]"
                cx={`${x}`}
                cy={`${y}`}
                r={r}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                fill={`url(#${patternId})`}
                stroke={MapConfig.STROKE}
                strokeWidth={MapConfig.STROKE_WIDTH}
            />
            
        </>
    );
}
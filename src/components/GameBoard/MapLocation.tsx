import { useState } from "react";

interface MapLocationProps {
    x: number
    y: number
    zones: string[]
}

export default function MapLocation({x, y, zones} : MapLocationProps) {
    const [hovered, setHovered] = useState(false);
    const patternId = `${x}.${y}.testPattern`;
    const r = hovered ? 50 : 30;
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
                cx={`${x}%`}
                cy={`${y}%`}
                r={r}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                fill={`url(#${patternId})`}
                stroke="white"
                strokeWidth={4}
            />
            
        </>
    );
}
import MapConfig from "src/constants/MapConfig";


export default function PlayerRenderer({x, y, characters}: {x: number, y: number, characters: string[]}) {
    const r = MapConfig.LOCATION_R / (1+characters.length);
    const offset = characters.length > 1 ? -1 * (characters.length-1) * r : 0;

    // TODO: loop through characters and display them side by side within the circle
    return (
        <>
            {characters.map((character, i) => (
                <circle
                    className="transition-[r]"
                    cx={`${x+offset + (2*r*i)}`}
                    cy={`${y}`}
                    r={r}
                    fill={character}
                    stroke={MapConfig.STROKE}
                    strokeWidth={MapConfig.STROKE_WIDTH/4}
                />
            ))}
        </>
    );
}
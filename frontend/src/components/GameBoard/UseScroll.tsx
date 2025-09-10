import { useEffect, useState } from "react";

export default function UseScroll(passedRef: HTMLElement | null) {
    let [wheelX, setWheelX] = useState(0);
    let [wheelY, setWheelY] = useState(0);

    let target = passedRef ?? document;

    useEffect(() => {
        let tempFn = (we: WheelEvent) => {
            setWheelX(oldX => oldX + we.deltaX);
            setWheelY(oldY => oldY + we.deltaY);
        };
        document.addEventListener('wheel', tempFn);
        return () => document.removeEventListener('wheel', tempFn);
    }, [target]);
    
    return {wheelX, wheelY};
}
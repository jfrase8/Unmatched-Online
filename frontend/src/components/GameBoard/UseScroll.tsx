import { useEffect, useState } from "react";

export default function UseScroll(passedRef: HTMLElement | null, isHovering: boolean) {
    let [wheelX, setWheelX] = useState(0);
    let [wheelY, setWheelY] = useState(0);
    let [deltaX, setDeltaX] = useState(0);
    let [deltaY, setDeltaY] = useState(0);

    let target = passedRef ?? document;

    useEffect(() => {
        if (!isHovering)
            return;

        let tempFn = (we: WheelEvent) => {
            setWheelX(oldX => oldX + we.deltaX);
            setWheelY(oldY => oldY + we.deltaY);
            setDeltaX(we.deltaX);
            setDeltaY(we.deltaY);
        };
        document.addEventListener('wheel', tempFn);
        return () => document.removeEventListener('wheel', tempFn);
    }, [target, isHovering]);
    
    return {wheelX, wheelY, deltaX, deltaY};
}
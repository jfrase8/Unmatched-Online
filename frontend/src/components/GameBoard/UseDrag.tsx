import { useEffect, useState } from "react";

export default function UseDrag(passedRef: HTMLElement | null = null, strength: number = 1.0) {
    let [offsetX, setOffsetX] = useState(0);
    let [offsetY, setOffsetY] = useState(0);
    let [isDragging, setIsDragging] = useState(false);

    let target = passedRef ?? document;

    useEffect(() => {
        let tempFn = () => setIsDragging(true);
        target.addEventListener('pointerdown', tempFn);
        return () => target.removeEventListener('pointerdown', tempFn);
    }, [target]);

    useEffect(() => {
        let tempFn = () => setIsDragging(false);
        document.addEventListener('pointerup', tempFn);
        return () => document.removeEventListener('pointerup', tempFn);
    }, []);
    
    useEffect(() => {
        if (!isDragging)
            return;

        function handlePointerMove(pointerEvent: PointerEvent) {
            setOffsetX(oldX => oldX - (pointerEvent.movementX * strength));
            setOffsetY(oldY => oldY - (pointerEvent.movementY * strength));
        }
            
        document.addEventListener('pointermove', handlePointerMove);
        return () => document.removeEventListener('pointermove', handlePointerMove);
    }, [isDragging, strength]);
    
    return {offsetX, offsetY};
}
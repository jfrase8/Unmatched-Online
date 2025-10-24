import { useEffect, useState } from "react";

export default function UseMouse(passedRef: HTMLElement | null = null) {
    let [mouseX, setMouseX] = useState(0);
    let [mouseY, setMouseY] = useState(0);
    let [isMouseOver, setIsMouseOver] = useState(false);

    useEffect(() => {
        if (passedRef == null)
            return;

        function handlePointerOver() {
            setIsMouseOver(true);
        }

        function handlePointerOut() {
            setIsMouseOver(false);
        }

        function handlePointerMove(pointerEvent: MouseEvent) {
            setMouseX(pointerEvent.clientX);
            setMouseY(pointerEvent.clientY);
        }
            
        passedRef.addEventListener('pointermove', handlePointerMove);
        passedRef.addEventListener('pointerenter', handlePointerOver);
        passedRef.addEventListener('pointerleave', handlePointerOut);

        return () => {
            passedRef.removeEventListener('pointermove', handlePointerMove);
            passedRef.removeEventListener('pointerenter', handlePointerOver);
            passedRef.removeEventListener('pointerleave', handlePointerOut);
        }
    }, [passedRef]);
    
    return {mouseX, mouseY, isMouseOver};
}

import { useEffect, useState } from 'react';

const MouseTracker = () => {
    const [mouseLocation, setMouseLocation] = useState({
        x: 0,
        y: 0
    })

    useEffect(() =>{
    window.addEventListener('mousemove', (event) => {
        setMouseLocation({
        x: event.clientX,
        y: event.clientY
        })
    })
    }, [])


    return (
        <p>mouse: {mouseLocation.x}/{mouseLocation.y}</p>
    )
}

export default MouseTracker;
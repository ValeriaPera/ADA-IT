import { useState, useEffect } from 'react'

const useResize = () => {

    const [width, setWidth] = useState(window.innerWidth)

    const updateWidth = () => {
        setWidth(window.innerWidth)
    }

    useEffect(() => {
        window.addEventListener('resize', updateWidth)
        return () => {
            window.removeEventListener('resize', updateWidth)
        }
    } )


    const sizes = [
        {
            size: 1200,
            cards: 5,
        },
        {
            size: 1000,
            cards: 4,
        },
        {
            size: 650,
            cards:3,
        },
        {
            size:400,
            cards:2,
        },
    ]

    for (const breakpoint of sizes) {  
        if (width >= breakpoint.size) {      
            return [breakpoint.cards]    
        }else if(width < 400){
            
            return[1]
        }
    }
}

export default useResize

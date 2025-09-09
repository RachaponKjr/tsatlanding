import React from 'react'

const Facebook = ({ className, color = '#333333', size = 31 }: { className?: string, color?: string, size?: number }) => {
    return (
        <svg width={size} height={size} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.497 15.999C32.497 7.163 25.334 0 16.498 0C7.66202 0 0.499023 7.163 0.499023 15.999C0.499023 23.984 6.35002 30.603 13.998 31.803V20.623H9.93602V15.998H13.998V12.473C13.998 8.463 16.387 6.248 20.041 6.248C21.791 6.248 23.622 6.561 23.622 6.561V10.498H21.605C19.618 10.498 18.998 11.731 18.998 12.996V15.997H23.435L22.726 20.622H18.998V31.802C26.647 30.602 32.497 23.984 32.497 15.999Z" fill={color} />
        </svg>

    )
}

export default Facebook
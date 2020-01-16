import React from 'react'

const Button = ({onClick, title, loading}) => {
    if(loading){
        return <button className="btn disable">Loading ...</button>
    }
    return (
        <div>
            <button onClick={onClick} className="btn" >{title}</button>
        </div>
    )
}

export default Button

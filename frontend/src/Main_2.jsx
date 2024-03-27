import React from 'react'
import ReactDOM from 'react-dom'
import './Main.css'


// import { StateProvider } from "./context/StateProvider.js";
// import { initialState } from "./context/initalState.js";
// import reducer from "./context/reducer.js";



export default function Main({ children }) {
    return ReactDOM.createPortal(
        <>
        <div className='overlay' />
        <div className='modal' >
            {children}
        </div>

        </>,

        document.getElementById('cart-root')

    )
}

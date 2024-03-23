import React from 'react'
import ReactDOM from 'react-dom'

const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    backgroundColor: 'rgb(34,34,34)',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height: '80%',
    width: '80%',
    borderRadius: '30px',
    overflowY: 'auto',
    
  }
  
  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000,
    

  }

// import { StateProvider } from "./context/StateProvider.js";
// import { initialState } from "./context/initalState.js";
// import reducer from "./context/reducer.js";



export default function Main({ children }) {
    return ReactDOM.createPortal(
        <>
        <div style={OVERLAY_STYLES}/>
        <div style={MODAL_STYLES}>
            {children}
        </div>

        </>,

        document.getElementById('cart-root')

    )
}

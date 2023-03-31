import React from 'react'
import { SocketState } from '../Context/SocketProvider'

const Notifications = () => {
    const { answerCall, call, callAccepted } = SocketState()
    return (
        <>{call.isReceivingCall && !callAccepted && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <h1>{call.name} is calling:</h1>
                <button type="button" variant="contained" color="primary" onClick={answerCall}> Answer </button>
            </div>
        )}</>
        
    )
}

export default Notifications
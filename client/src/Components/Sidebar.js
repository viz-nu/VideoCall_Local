import React, { useState } from 'react'
import { SocketState } from '../Context/SocketProvider'
import { CopyToClipboard } from "react-copy-to-clipboard"

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = SocketState()
  const [idToCall, setIdToCall] = useState('');
  return (
    <>
      <form noValidate autoComplete="off" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <section>
         <h5> Account Info</h5>
        <input label="Name"  value={name} placeholder="Enter your display name" onChange={(e) => { setName(e.target.value) }} />
        <CopyToClipboard text={me}>
            <button type="button" >Copy your Id</button>
        </CopyToClipboard> 
        </section>
        <section>
          <h5>Make a call</h5>
          <input label="ID to call" placeholder="Enter Id to call"  onChange={(e) => { setIdToCall(e.target.value) }} />
          {callAccepted && !callEnded ? (<button type="button" onClick={leaveCall}> Hang Up </button>) : (<button type="button" onClick={() => callUser(idToCall)}> Call </button>)}
        </section>
        
      </form>
      {children}
    </>

  )
}

export default Sidebar
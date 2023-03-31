import React from 'react'
import { SocketState } from '../Context/SocketProvider'


const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = SocketState()
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>

        {stream && <section> 
          <h5>{name}</h5>
          <video playsInline muted ref={myVideo} autoPlay />
          </section>}
        {callAccepted && !callEnded && <section> <h5>{call.name}</h5><video playsInline ref={userVideo} autoPlay /></section>}
      </div>

    </>

  )
}

export default VideoPlayer
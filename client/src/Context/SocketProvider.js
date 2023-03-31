import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io } from "socket.io-client"
import Peer from "simple-peer"
const SocketContext = createContext();
const socket = io("https://window.viznu.dev")
const SocketProvider = ({ children }) => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [stream, setStream] = useState();
    const [name, setName] = useState('');
    const [call, setCall] = useState({});
    const [me, setMe] = useState('');




    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();
    const setupMediaStream = async (myVideo) => {
        try {
            const constraints = { video: true, audio: true };
            const currentStream = await navigator.mediaDevices.getUserMedia(constraints);
            setStream(currentStream);
            myVideo.current.srcObject = currentStream;
            console.log('Media stream obtained:', currentStream);
            console.log('myVideo:', myVideo);
        } catch (error) {
            console.error('Error getting media stream:', error);
        }
    }

    useEffect(() => {
        setupMediaStream(myVideo);

        const handleMe = (id) => {
            setMe(id);
            console.log(id);
        };
        const handleCallUser = ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        };

        socket.on('me', handleMe);
        socket.on('call-User', handleCallUser);

        return () => {
            socket.off('me', handleMe);
            socket.off('call-User', handleCallUser);
        };

    }, [])


    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({ initiator: false, trickle: false, stream });
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: call.from })
        })
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
            myVideo.current.srcObject = stream;
        });
        peer.signal(call.signal);
        connectionRef.current = peer;
    }
    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });
        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });
        peer.on('stream', (currentStream) => {
            myVideo.current.srcObject = stream;
            userVideo.current.srcObject = currentStream;
        });
        socket.on('callAccepted', (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });
        connectionRef.current = peer;
    }
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{ answerCall, callUser, leaveCall, callAccepted, callEnded, name, setName, call, me, myVideo, userVideo, stream }}>
            {stream && children}
        </SocketContext.Provider>
    )
}


export default SocketProvider
export const SocketState = () => useContext(SocketContext)
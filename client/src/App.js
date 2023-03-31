
import './App.css';
import Notifications from './Components/Notifications';
import Sidebar from './Components/Sidebar';
import VideoPlayer from './Components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <h2>Window</h2>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>


    </div>
  );
}

export default App;

import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import WeatherApp from "./weather";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <WeatherApp />
      </header>
    </div>
  );
}

export default App;

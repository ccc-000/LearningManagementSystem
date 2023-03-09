import logo from './logo.svg';
import './App.css';

function App() {

  function connect() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  connect();


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

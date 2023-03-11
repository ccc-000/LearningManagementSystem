import './App.css';
import { Button } from 'antd';

function App() {

  function connect() {
    fetch('http://localhost:8000')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  connect();

  return (
    <>
      <h1>Hydra</h1>
      <Button type="primary">Primary Button</Button>
    </>
  );
}

export default App;

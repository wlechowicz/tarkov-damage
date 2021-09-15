import './App.css';
import { Body } from './components/Body';
import { useState } from 'react';

function App() {
  const [damage, setDamage] = useState(50);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tarkov damage distribution simulator</h1>
        <span>
          <label htmlFor="damage-input">Damage:</label>
          <input type="number" id="damage-input" value={damage} onChange={(e) => setDamage(e.target.value)} />
        </span>
      </header>
      <main className="App-main">
        <Body damage={damage} />
      </main>
    </div>
  );
}

export default App;

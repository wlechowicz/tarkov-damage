import './App.css';
import { Body } from './components/Body';
import { useState } from 'react';
import styled from 'styled-components';

const Blob = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  & > span {
    margin: 10px;
  }
`;

function App() {
  const [damage, setDamage] = useState(50);
  const [showDecimals, setShowDecimals] = useState(false);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tarkov damage distribution simulator</h1>
        <Blob>
          <span>
            <label htmlFor="show-decimals">Show decimals: </label>
            <input type="checkbox" id="show-decimals" checked={showDecimals} onChange={() => setShowDecimals(!showDecimals)} />
          </span>
          <span>
            <label htmlFor="damage-input">Damage: </label>
            <input type="number" id="damage-input" value={damage} onChange={(e) => setDamage(e.target.value)} />
          </span>
        </Blob>
      </header>
      <main className="App-main">
        <Body damage={damage} showDecimals={showDecimals} />
      </main>
    </div>
  );
}

export default App;

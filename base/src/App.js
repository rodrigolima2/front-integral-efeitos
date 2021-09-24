import { useEffect, useState } from 'react';
import './App.css';

function Paises(props) {
  let display = '';

  if (props.nome !== props.input && props.sigla !== props.input && props.input !== '') {
    display = 'display--none';
  }

  return (
    <div className={`pais ${display}`}>
      <h1 className="pais__nome">{props.nome} - {props.sigla}</h1>
      <img className="pais__img" src={props.bandeira} alt="bandeira" />
    </div>
  );
}

function App() {
  const [paises, setPaises] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    fetch('https://restcountries.com/v3/all')
      .then(resposta => resposta.json())
      .then(data => setPaises(data));
  }, []);

  return (
    <div className="App">
      <input className="App__input" type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Procurar por um país" />
      <h1 className="App__title">Find County</h1>
      <div className="paises">
        {paises.map((pais, index) => <Paises key={index} nome={pais.name.common} sigla={pais.altSpellings[0]} bandeira={pais.flags[0]} input={input} />)}
      </div>
    </div>
  );
}

export default App;

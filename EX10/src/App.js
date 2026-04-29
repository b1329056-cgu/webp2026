import React, {useState} from 'react';
import './App.css';

function App(){
  const [color, setColor]=useState('red');
  const changeTextAndColor=(event)=>{
    if(!event.target.innerText.includes("被點了")){
      event.target.innerText=event.target.innerText+"被點了";
    }
    setColor('blue');
  };
  const styleArgument={
    fontSize: '100px';
    color: color
  };
  return (
    <div className="App">
      <h1 style={styleArgument} onClick={changeTextAndColor}> Hello CGU!
      </h1>
    </div>
  );
}
export default App;

import React, { useState } from 'react'
import SingleColor from './SingleColor'
import Values from 'values.js'

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#00FF00').all(10));
  const num = list.length / 2;
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError(false);
      let colors = new Values(color).all(1);
      setList([...colors]);
    } catch (error) {
      setError(true);
    }
  }
  return (
    <>
      <section className="container">
        <h3>color generator</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="#00FF00"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className={error ? 'error' : null}
          />
          <button type="submit" className="btn">generate</button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return <SingleColor key={index} {...color} index={index} hex={color.hex} num={num}/>
        })}
      </section>
    </>
  );
}

export default App

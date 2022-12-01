import React, { useEffect, useState } from 'react'
import SingleColor from './SingleColor'
import Values from 'values.js'

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#00FF00').all(5));
  const num = list.length / 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setError(false);
      let colors = new Values(color).all(5);
      setList(colors);
    } catch (error) {
      setError(true);
    }
  }

  const hexArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'A', 'B', 'C', 'D', 'E', 'F'];
  let hexCode = '#';
  const generateRandomHex = (arr) => {
    for (let i = 0; i < 6; i++) {
      let randNum = Math.floor(Math.random() * arr.length);
      hexCode += arr[randNum];
    }
    return hexCode;
  }

  const randomSubmit = (e) => {
    e.preventDefault();
    let randomColor = generateRandomHex(hexArr);
    try {
      setError(false);
      let colors = new Values(randomColor).all(5);
      setColor(randomColor);
      setList(colors);
    } catch (error) {
      setError(true);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColor('')
    }, 3000);
    return () => clearTimeout(timeout);
  }, [color]);

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
        <form onSubmit={randomSubmit}>
          <button type="submit" className="btn">RandomColor</button>
        </form>
      </section>
      <section className="colors">
        {list.map((color, index) => {
          return <SingleColor key={index} {...color} index={index} hex={color.hex} num={num} />
        })}
      </section>
    </>
  );
}

export default App

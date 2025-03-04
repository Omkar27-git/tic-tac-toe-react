import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import o_icon from '../Assets/o.png'; 
import close_icon from '../Assets/close.png'; 
import { motion } from "framer-motion"; 

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let titleRef = useRef(null);
  
  let box_array = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const toggle = (e, num) => {
    if (lock || data[num] !== "") return;

    if (count % 2 === 0) {
      box_array[num].current.innerHTML = `<img src='${close_icon}'>`;  
      data[num] = "x";
    } else {
      box_array[num].current.innerHTML = `<img src='${o_icon}'>`;  
      data[num] = "o";
    }
    setCount(count + 1);
    checkWin();
  };

  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        won(data[a]);
        return;
      }
    }
  };

  const won = (winner) => { 
    setLock(true);
    titleRef.current.innerHTML = `Congratulations: <img src='${winner === 'x' ? close_icon : o_icon}'> wins`;
  };

  const reset = () => {
    setLock(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = `Tic Tac Toe In <span>React</span>`;
    box_array.forEach(ref => { ref.current.innerHTML = ""; });
    setCount(0);
  };

  return (  
    <div className='container'> 
      <h1 className='title' ref={titleRef}>Tic Tac Toe Game In <span>React</span></h1>
      
     
      <motion.div 
        className='board' 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {box_array.map((ref, index) => (
          <div key={index} className="boxes" ref={ref} onClick={(e) => toggle(e, index)}></div>
        ))}
      </motion.div>

      <button className='reset' onClick={reset}>Reset</button> 
    </div>
  );
};

export default TicTacToe;

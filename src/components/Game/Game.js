import React, { useState } from "react";
import "./game.css";
import { combinations } from "../../utils";
export const Game = () => {
  const [turn, setTurn] = useState("x");
  const [cells, setCells] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);
  const handleClick = (num) => {
    if (cells[num] !== null) {
      return;
    }
    let squares = [...cells];
    if (turn === "x") {
      squares[num] = "x";
      setTurn("o");
    } else {
      squares[num] = "o";
      setTurn("x");
    }
    setCells(squares);
    checkWinner(squares);
  };

  const checkWinner = (squares) => {
    for (let combo in combinations) {
      combinations[combo].forEach((element) => {
        if (
          squares[element[0]] === null ||
          squares[element[1]] === null ||
          squares[element[2]] === null
        ) {
        } else if (
          squares[element[0]] === squares[element[1]] &&
          squares[element[1]] === squares[element[2]]
        ) {
          setWinner(squares[element[0]]);
        } else if (!squares.includes(null)) {
          setWinner("No Winner");
        }
      });
    }
  };

  const Cell = ({ num }) => {
    return (
      <td onClick={() => handleClick(num)}>{cells[num]?.toUpperCase()}</td>
    );
  };

  return (
    <div className='container'>
      <div>{!!!winner && <h3>Turn: {turn?.toUpperCase()}</h3>}</div>
      <div>
        <table>
          <tbody>
            <tr>
              <Cell num={0} />
              <Cell num={1} />
              <Cell num={2} />
            </tr>
            <tr>
              <Cell num={3} />
              <Cell num={4} />
              <Cell num={5} />
            </tr>
            <tr>
              <Cell num={6} />
              <Cell num={7} />
              <Cell num={8} />
            </tr>
          </tbody>
        </table>
      </div>
      <div>{winner && <h3>Winner: {winner?.toUpperCase()}</h3>}</div>
      <div>
        {winner && (
          <div
            id='wrapper'
            onClick={() => {
              setCells(Array(9).fill(null));
              setWinner(null);
              setTurn("x");
            }}
          >
            <a href='#' className='btn'>
              <div className='dots-container'>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
                <div className='dot'></div>
              </div>
              <span>Restart</span>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

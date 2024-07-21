import React, { useRef } from "react";
import Tile from "../Tile/Tile";
import "./Chessboard.css";

const horizontalAxis = ["a", "b", "c", "d", "e", "f", "g", "h"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Piece {
  image: string;
  x: number;
  y: number;
}

const pieces: Piece[] = [];

for (let p = 0; p < 2; p++) {
  const type = p === 0 ? "d" : "l";
  const y = p === 0 ? 7 : 0;
  pieces.push({ image: `assets/images/Chess_r${type}t60.png`, x: 0, y });
  pieces.push({ image: `assets/images/Chess_r${type}t60.png`, x: 7, y });
  pieces.push({ image: `assets/images/Chess_n${type}t60.png`, x: 1, y });
  pieces.push({ image: `assets/images/Chess_n${type}t60.png`, x: 6, y });
  pieces.push({ image: `assets/images/Chess_b${type}t60.png`, x: 2, y });
  pieces.push({ image: `assets/images/Chess_b${type}t60.png`, x: 5, y });
  pieces.push({ image: `assets/images/Chess_q${type}t60.png`, x: 3, y });
  pieces.push({ image: `assets/images/Chess_k${type}t60.png`, x: 4, y });
}

for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/Chess_pdt60.png", x: i, y: 6 });
}
for (let i = 0; i < 8; i++) {
  pieces.push({ image: "assets/images/Chess_plt60.png", x: i, y: 1 });
}

export default function Chessboard() {
  const chessboardRef = useRef<HTMLDivElement>(null);

  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    if (element.classList.contains("chess-piece")) {
      const x = e.clientX - 35;
      const y = e.clientY - 35;
      element.style.position = "absolute";
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const chessboard = chessboardRef.current;
    if (activePiece && chessboard) {
      const minX = chessboard.offsetLeft - 17;
      const minY = chessboard.offsetTop - 17;
      const maxX = chessboard.offsetLeft + chessboard.clientWidth - 52;
      const maxY = chessboard.offsetTop + chessboard.clientHeight - 52;
      const x = e.clientX - 35;
      const y = e.clientY - 35;
      activePiece.style.position = "absolute";
      
      if (x < minX) // x out of board to the left side 
      {
        activePiece.style.left = `${minX}px`;
      } 
      else if (x > maxX) // x out of board to the right side
      {
        activePiece.style.left = `${maxX}px`;
      } 
      else // x is in the board
      {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY){
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }

  let board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontalAxis.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      pieces.forEach((p) => {
        if (p.x === i && p.y === j) {
          image = p.image;
        }
      });

      board.push(<Tile key={`${j},${i}`} image={image} number={number} />);
    }
  }
  return (
    <div
      onMouseDown={(e) => grabPiece(e)}
      onMouseMove={(e) => movePiece(e)}
      onMouseUp={(e) => dropPiece(e)}
      id="chessboard"
      ref={chessboardRef}
    >
      {board}
    </div>
  );
}

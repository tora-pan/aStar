import React, { useState, useEffect } from "react";
import Node from "./Node";
import Astar from "../astar_algorithm/astar";
import "./pathfinder.css";

const cols = 25;
const rows = 15;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;
const NODE_END_ROW = rows - 1;
const NODE_END_COL = cols - 1;

const Pathfinder = () => {
  const [grid, setGrid] = useState([]);
  const [path, setPath] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);

  useEffect(() => {
    initalizeGrid();
  }, []);

  //create the gird
  const initalizeGrid = () => {
    const grid = new Array(rows);
    for (let i = 0; i < rows; i++) {
      grid[i] = new Array(cols);
    }

    createSpot(grid);

    //set the state with the newly created grid
    setGrid(grid);

    addNeighbors(grid);
    console.log(grid);
    const startNode = grid[NODE_START_ROW][NODE_START_COL];
    const endNode = grid[NODE_END_ROW][NODE_END_COL];
    let path = Astar(startNode, endNode);
    startNode.isWall = false;
    endNode.isWall = false;
    setPath(path.path);
    setVisitedNodes(path.visitedNodes);
  };
  //create spot
  const createSpot = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j] = new Spot(i, j);
      }
    }
  };

  //add neighbor
  const addNeighbors = (grid) => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid[i][j].addneighbors(grid);
      }
    }
  };

  // spot constructor
  function Spot(i, j) {
    this.x = i;
    this.y = j;

    //start and end
    this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
    this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;

    //this is for measuring distance in a*
    this.g = 0;
    this.f = 0;
    this.h = 0;
    //for a* we need a few labels per node
    this.neighbors = [];
    this.isWall = false;
    if(Math.random(1) < 0.1){
      this.isWall = true;
    }
    this.previous = undefined;
    this.addneighbors = function (grid) {
      let i = this.x;
      let j = this.y;
      if (i > 0) this.neighbors.push(grid[i - 1][j]);
      if (i < rows - 1) this.neighbors.push(grid[i + 1][j]);
      if (j > 0) this.neighbors.push(grid[i][j - 1]);
      if (j < cols - 1) this.neighbors.push(grid[i][j + 1]);
    };
  }

  //get shortest path nodes and add a new class to them.
  const visualizeShortestPath = (shortestPathNodes) => {
    for(let i=0; i<shortestPathNodes.length; i++){
      setTimeout(() => {
        const node = shortestPathNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-shortest-path";
      }, 10*i);
    }
  }

  const resetNodes = () => {
    for(let i=0; i<visitedNodes.length; i++){
      const node = visitedNodes[i];
      document.getElementById(`node-${node.x}-${node.y}`).className = "node";
    }
  }

  const visualizePath = () =>{
    for(let i=0; i<=visitedNodes.length; i++){
      if(i === visitedNodes.length){
        setTimeout(() => {
          visualizeShortestPath(path);
        }, 10*i/2);
      }else{
        setTimeout(() => {
          const node = visitedNodes[i];
        document.getElementById(`node-${node.x}-${node.y}`).className = "node node-visited";
        }, 5*i/2);
      }
    }
  }

  //grid with nodes
  const gridWithNode = (
    <div>
      <button onClick={visualizePath}>Visualize Path</button>
      <button onClick={resetNodes}>Reset</button>
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex} className="rowWrapper">
            {row.map((col, colIndex) => {
              const { isStart, isEnd, isWall } = col;
              return (
                <Node
                  key={colIndex}
                  isStart={isStart}
                  isEnd={isEnd}
                  row={rowIndex}
                  col={colIndex}
                  isWall={isWall}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="wrapper">
      <h1>Pathfinder Component</h1>
      {gridWithNode}
    </div>
  );
};

export default Pathfinder;

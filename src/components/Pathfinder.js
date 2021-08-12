import React, {useState, useEffect} from 'react'

const cols = 5;
const rows = 5;

const Pathfinder = () => {
    const[grid, setGrid] = useState([]);

    useEffect(()=>{
        initalizeGrid();
    }, [])

    //create the gird
    const initalizeGrid = () =>{
        const grid = new Array(cols);
        for(let i=0; i<cols; i++){
            grid[i] = new Array(rows);
        }

        createSpot(grid);

        //set the state with the newly created grid
        setGrid(grid);

    }
    //create spot
    const createSpot= (grid) => {
        for(let i=0; i<cols; i++){
            for(let j=0; j<rows; j++){
                grid[i][j] = new Spot(i,j);
            }
        }
    }

    // spot constructor
    function Spot (i,j){
        this.x = i;
        this.y = j;
        //this is for measuring distance in a*
        this.g = 0;
        this.f = 0;
        this.h = 0;
    }

    //grid with nodes
    const gridWithNodes = ()=>{

    }

    console.log(grid);

    return (
        <div>
            <h1>Pathfinder Component</h1>
        </div>
    )
}

export default Pathfinder

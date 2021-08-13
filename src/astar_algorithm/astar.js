function Astar(startNode, endNode) {
  //need to visit nodes
  let openSet = [];
  //already visited nodes
  let closedSet = [];
  //shortest path of nodes
  let path = [];

  //animation
  let visitedNodes = [];

  openSet.push(startNode);
  while (openSet.length > 0) {
    let smallestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[smallestIndex].f) {
        smallestIndex = i;
      }
    }

    let current = openSet[smallestIndex];
    visitedNodes.push(current);
    if (current === endNode) {
      let temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      return {path, visitedNodes};
      console.log("Path has been found");
      //return path
    }

    //return all items except for the current element
    openSet = openSet.filter((elt) => elt !== current);
    //add current node to closedSet array
    closedSet.push(current);
    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      if (!closedSet.includes(neighbor)) {
        let tempG = current.g + 1;
        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heruistic(neighbor, endNode);
          neighbor.f = neighbor.h + neighbor.g;
          neighbor.previous = current;
        }
      }
    }
  }
  return { path, visitedNodes, error: "No path found" };
}

function heruistic(a, b) {
  let d = Math.abs(a.x - a.y) + Math.abs(b.x - b.y);
  return d;
}

export default Astar;

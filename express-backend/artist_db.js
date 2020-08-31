let artists = [
  { _id: 1, name: "Sachin", pop: "18426" },
  { _id: 2, name: "Dhoni", pop: "10500" },
  { _id: 3, name: "Virat", pop: "10843" },
];
module.exports = artists;

MATCH p =shortestPath((start:ARTIST{id:""})-[*]-(end:ARTIST{id:""})) 
RETURN p

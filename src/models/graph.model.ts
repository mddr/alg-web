export interface Graph {
  points: Point[];
  neighbours: PointToNeighbours;
}

export interface Point {
  id: string;
  latitude: number;
  longtitude: number;
  name: string;
}

export interface PointToNeighbours {
  [pointId: string]: Neighbour[];
}

export interface Neighbour {
  pointId: string;
  weight: number;
}

export interface Graph {
  points: Point[];
  neighbours: PointToNeighbours;
}

export interface Point {
  id: string;
  latitude: number;
  longtitude: number;
  name: string;
  weight: number;
}

export interface PointToNeighbours {
  [pointId: string]: Neighbour[];
}

export interface Neighbour {
  pointId: string;
  weight: number;
}

export interface AlgorithmResult {
  algorithm: AlgorithmType;
  nodes: number[];
  weightsSum: number;
  distance: number;
}

export enum AlgorithmType {
  VNS = 'vns',
  ILS = 'ils',
}

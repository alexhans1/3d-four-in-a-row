import { Box, Cube, cubeSize, Position } from '../pages'

type Neighbor = -1 | 0 | 1
type Direction = [Neighbor, Neighbor, Neighbor]
const directions: Direction[] = [
  [-1, -1, -1],
  [-1, -1, 0],
  [-1, -1, 1],
  [-1, 0, -1],
  [-1, 0, 0],
  [-1, 0, 1],
  [-1, 1, -1],
  [-1, 1, 0],
  [-1, 1, 1],
  [0, -1, -1],
  [0, -1, 0],
  [0, -1, 1],
  [0, 0, -1],
]
const oppositeDirections: Direction[] = [
  [1, 1, 1],
  [1, 1, 0],
  [1, 1, -1],
  [1, 0, 1],
  [1, 0, 0],
  [1, 0, -1],
  [1, -1, 1],
  [1, -1, 0],
  [1, -1, -1],
  [0, 1, 1],
  [0, 1, 0],
  [0, 1, -1],
  [0, 0, 1],
]

const findStreak = (
  cube: Cube,
  originalPosition: Position,
  position: Position,
  streak: Box[],
  directionIndex: number,
  checkOpposites = true
): Box[] => {
  const usedDirections = checkOpposites ? directions : oppositeDirections
  const direction = usedDirections[directionIndex]
  const neighbor = getNeighbor(cube, position, direction)
  if (neighbor && streak[0].color === neighbor.color) {
    const newStreak: Box[] = [...streak, neighbor]
    if (newStreak.length === cubeSize) {
      return newStreak
    }
    return findStreak(
      cube,
      originalPosition,
      neighbor.position,
      newStreak,
      directionIndex,
      checkOpposites
    )
  }
  if (checkOpposites) {
    return findStreak(
      cube,
      originalPosition,
      originalPosition,
      streak,
      directionIndex,
      false
    )
  }
  return streak
}

const getNeighbor = (
  cube: Cube,
  pos: Position,
  direction: Direction
): Box | undefined => {
  const dx = direction[0]
  const dy = direction[1]
  const dz = direction[2]
  if (!cube[pos[0] - dz] || !cube[pos[0] - dz][pos[1] - dy]) return
  return {
    color: cube[pos[0] - dz][pos[1] - dy][pos[2] + dx]?.color,
    position: [pos[0] - dz, pos[1] - dy, pos[2] + dx],
  }
}

export const isGameOver = (cube: Cube, newBox: Box): Box[] | undefined => {
  const initialStreak: Box[] = [newBox]
  for (const directionIndex in directions) {
    const streak = findStreak(
      cube,
      newBox.position,
      newBox.position,
      initialStreak,
      parseInt(directionIndex)
    )
    if (streak.length === cubeSize) {
      return streak
    }
  }
  return undefined
}

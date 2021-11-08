import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Canvas, ThreeEvent } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Box from '../components/Box'
import { isGameOver } from '../utils/game'
import { compareArrayEquals } from '../utils/misc'

const boxSize = 2.4
export const cubeSize = 4

const colors = ['#fa0d0a', '#408020']
const winningColors = ['#e0e020', '#ca3d0a']

export type Position = [number, number, number]
export interface Box {
  color?: string
  position: Position
}
export type Cube = Box[][][]
const _initialBoxes: Cube = Array(cubeSize).fill(
  Array(cubeSize).fill(Array(cubeSize).fill({}))
)
const initialBoxes: Cube = _initialBoxes.map((rows, i) =>
  rows.map((lines, j) =>
    lines.map((box, k) => {
      return {
        ...box,
        position: [
          i * boxSize - boxSize - boxSize / 2,
          j * boxSize - boxSize - boxSize / 2,
          k * boxSize - boxSize - boxSize / 2,
        ],
      }
    })
  )
)

const Home: NextPage = () => {
  const [turn, setTurn] = useState<0 | 1>(0)
  const [cube, setCube] = useState(initialBoxes)
  const [winningStreak, setWinningStreak] = useState<Box[] | undefined>()

  useEffect(() => {
    if (winningStreak) {
      const newCube = cube.map((rows, i) =>
        rows.map((lines, j) =>
          lines.map((box, k) => {
            const isPartOfWinningStreak = !!winningStreak?.find((winningBox) =>
              compareArrayEquals([i, j, k], winningBox.position)
            )
            if (isPartOfWinningStreak) {
              return {
                ...box,
                color: winningColors[turn],
              }
            }
            return box
          })
        )
      )
      setCube(newCube)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [winningStreak, turn])

  const handleBoxClick =
    (position: Position, color?: string) => (e: ThreeEvent<MouseEvent>) => {
      if (!color && !winningStreak) {
        const newCube = [...cube]
        const [x, y, z] = position

        const winner = isGameOver(cube, { position, color: colors[turn] })
        setWinningStreak(winner)

        newCube[x][y][z].color = colors[turn]
        setCube(newCube)

        setTurn(turn ? 0 : 1)
      }
      e.stopPropagation()
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>3D Four in a Row</title>
        <meta name="description" content="Four in a row game - but in 3D" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>3D Four in a Row</h1>
        <Canvas camera={{ position: [0, 0, 12] }}>
          <spotLight />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {cube.map((rows, i) =>
            rows.map((lines, j) =>
              lines.map((box, k) => (
                <Box
                  key={`box${i}${j}${k}`}
                  index={[i, j, k]}
                  {...{ handleBoxClick }}
                  {...box}
                />
              ))
            )
          )}
          <OrbitControls />
        </Canvas>
      </main>

      {/* <footer className={styles.footer}></footer> */}
    </div>
  )
}

export default Home

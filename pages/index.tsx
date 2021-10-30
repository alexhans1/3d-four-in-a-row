import type { NextPage } from 'next'
import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Box from '../components/Box'

const boxSize = 2.4
const cubeSize = 4
export interface Box {
  color?: string
  position: [number, number, number]
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
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {cube.map((rows, i) =>
            rows.map((lines, j) =>
              lines.map((box, k) => (
                <Box
                  key={`box${i}${j}${k}`}
                  index={[i, j, k]}
                  {...{ turn, setTurn, cube, setCube }}
                  {...box}
                />
              ))
            )
          )}
          <OrbitControls />
        </Canvas>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  )
}

export default Home

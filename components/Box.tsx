import React, { SetStateAction, Dispatch, useRef } from 'react'
import { Box as NativeBox } from '@react-three/drei'
import { Box, Cube } from '../pages'

const colors = ['#fa0d0a', '#408020']

interface Props extends Box {
  turn: 0 | 1
  setTurn: Dispatch<SetStateAction<0 | 1>>
  cube: Cube
  setCube: Dispatch<SetStateAction<Cube>>
  index: [number, number, number]
}

const defaultColors = ['#d7e4ec', '#b0bec7']

export default function BoxComponent({
  turn,
  setTurn,
  cube,
  setCube,
  color,
  index,
  ...props
}: Props) {
  const mesh = useRef()

  return (
    <NativeBox
      args={[1, 1, 1]}
      {...props}
      ref={mesh}
      onClick={(e) => {
        if (!color) {
          const newCube = [...cube]
          const [x, y, z] = index
          newCube[x][y][z].color = colors[turn]
          setCube(newCube)

          setTurn(turn ? 0 : 1)
        }
        e.stopPropagation()
      }}
    >
      <meshStandardMaterial
        attach="material"
        color={color || defaultColors[index.reduce((a, b) => a + b) % 2]}
      />
    </NativeBox>
  )
}

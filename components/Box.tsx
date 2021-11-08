import React, { useRef } from 'react'
import { Box as NativeBox } from '@react-three/drei'
import { Box, Position } from '../pages'
import { ThreeEvent } from '@react-three/fiber'

const defaultColors = ['#d7e4ec', '#b0bec7']

interface Props extends Box {
  index: [number, number, number]
  handleBoxClick: (
    position: Position,
    color?: string | undefined
  ) => (e: ThreeEvent<MouseEvent>) => void
}

export default function BoxComponent({
  color,
  index,
  handleBoxClick,
  ...props
}: Props) {
  const mesh = useRef()

  return (
    <>
      <NativeBox
        args={[1, 1, 1]}
        {...props}
        ref={mesh}
        onClick={handleBoxClick(index, color)}
      >
        <meshStandardMaterial
          attach="material"
          color={color || defaultColors[index.reduce((a, b) => a + b) % 2]}
        />
      </NativeBox>
    </>
  )
}

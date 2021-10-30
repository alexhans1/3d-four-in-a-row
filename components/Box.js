import { useRef, useState } from 'react'
import { Box as NativeBox } from '@react-three/drei'

const colors = ['#fa0d0a', '#408020']

export default function Box({ turn, setTurn, ...props }) {
  const mesh = useRef()

  const [color, setColor] = useState()

  return (
    <NativeBox
      args={[1, 1, 1]}
      {...props}
      ref={mesh}
      onClick={(e) => {
        if (!color) {
          setColor(colors[turn])
          setTurn(turn ? 0 : 1)
        }
        e.stopPropagation()
      }}
    >
      <meshStandardMaterial attach="material" color={color || '#c7d8e3'} />
    </NativeBox>
  )
}

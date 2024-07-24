import { FC, useCallback, useEffect, useState } from 'react'

import cn from 'classnames'

import styles from './style.module.scss'

const Cursor: FC = () => {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setPointer({ x: Number(e.clientX), y: Number(e.clientY) })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseMove])

  return (
    <div className={styles.cursor}>
      <svg>
        <path
          className={cn(styles.cursor_icon)}
          d={`M ${pointer?.x + 22} ${pointer?.y + 10.2069} L ${pointer?.x + 3} ${pointer?.y + 3} L ${pointer?.x + 10.2069} ${pointer?.y + 22} L ${pointer?.x + 13.4828} ${pointer?.y + 13.4828} L ${pointer?.x + 22} ${pointer?.y + 10.2069} Z`}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  )
}

export default Cursor

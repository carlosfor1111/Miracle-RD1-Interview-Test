import React, { useRef, useState, useEffect, useCallback } from 'react'
import classes from './Timer.module.css'

const Timer = () => {
  const intervalRef = useRef(null)
  const [timer, setTimer] = useState('00:00:00')

  const getTimeRemaining = (endtime) => {
    const total = Date.parse(endtime) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60) % 24)
    return {
      total,
      hours,
      minutes,
      seconds,
    }
  }

  const clearTimer = useCallback((endtime) => {
    const startTimer = (deadline) => {
      let { total, hours, minutes, seconds } = getTimeRemaining(deadline)
      if (total >= 0) {
        setTimer(
          (hours > 9 ? hours : '0' + hours) +
            ':' +
            (minutes > 9 ? minutes : '0' + minutes) +
            ':' +
            (seconds > 9 ? seconds : '0' + seconds)
        )
      } else {
        clearInterval(intervalRef.current)
      }
    }
    setTimer('24:00:00')
    if (intervalRef.current) clearInterval(intervalRef.current)
    const id = setInterval(() => {
      startTimer(endtime)
    }, 1000)
    intervalRef.current = id
  }, [])

  const getDeadlineTime = () => {
    let deadline = new Date()

    deadline.setSeconds(deadline.getSeconds() + 86400000)
    console.log(deadline)
    return deadline
  }

  useEffect(() => {
    clearTimer(getDeadlineTime())
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [clearTimer])

  //   const onClickResetHandler = () => {
  //     if (intervalRef.current) clearInterval(intervalRef.current)
  //     clearTimer(getDeadlineTime())
  //   }
  return (
    <section className={classes['timer-container']}>
      <h2>{timer}</h2>
    </section>
  )
}

export default Timer

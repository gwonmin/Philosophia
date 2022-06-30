import React, { useState, useRef, useEffect } from "react"

export default function Timer() {
  const [min, setMin] = useState<number>(3)
  const [sec, setSec] = useState<number>(0)
  const time = useRef<number>(179)
  const timerId = useRef(0)

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(parseInt(`${time.current / 60}`))
      setSec(time.current % 60)
      time.current -= 1
    }, 1000)

    return () => clearInterval(timerId.current)
  }, [])
  useEffect(() => {
    // 만약 타임 아웃이 발생했을 경우
    if (time.current <= 0) {
      console.log("타임 아웃")
      clearInterval(timerId.current)
      // dispatch event
    }
  }, [sec])
  return (
    <>
      {time.current <= 0 ? (
        <p>인증 시간이 초과되었습니다.</p>
      ) : (
        <div className="timer">
          {min} : {sec}
        </div>
      )}
    </>
  )
}

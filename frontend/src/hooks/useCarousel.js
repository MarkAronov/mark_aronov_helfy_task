import { useEffect, useRef, useState } from 'react'

function useCarousel(tasks) {
  const [index, setIndex] = useState(1)
  const trackRef = useRef(null)

  const slides = []
  if (tasks.length > 0) {
    slides.push(tasks[tasks.length - 1])
    for (let i = 0; i < tasks.length; i++) {
      slides.push(tasks[i])
    }
    slides.push(tasks[0])
  }

  useEffect(() => {
    const el = trackRef.current
    if (el === null) return

    function handleTransitionEnd() {
      if (index === slides.length - 1) {
        jump(1)
      }
      if (index === 0) {
        jump(tasks.length)
      }
    }

    el.addEventListener('transitionend', handleTransitionEnd)
    return function cleanup() {
      el.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [index, slides.length, tasks.length])

  useEffect(() => {
    const intervalId = setInterval(function () {
      setIndex(function (currentIndex) {
        return currentIndex + 1
      })
    }, 3000)
    return function cleanup() {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    setIndex(1)
  }, [tasks.length])

  function jump(to) {
    const el = trackRef.current
    el.style.transition = 'none'
    setIndex(to)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.style.transition = ''
      })
    })
  }

  function handlePrevClick() {
    setIndex(function (currentIndex) {
      return currentIndex - 1
    })
  }

  function handleNextClick() {
    setIndex(function (currentIndex) {
      return currentIndex + 1
    })
  }

  const trackStyle = {
    transform: 'translateX(-' + (index * 100) + '%)'
  }

  return {
    slides: slides,
    trackRef: trackRef,
    trackStyle: trackStyle,
    handlePrevClick: handlePrevClick,
    handleNextClick: handleNextClick,
  }
}

export default useCarousel

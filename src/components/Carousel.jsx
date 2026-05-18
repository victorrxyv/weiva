import { useState, useEffect, useRef, useCallback } from 'react'

const SLIDES = [
  { src: '/img/carrosel/weivaslide.png', alt: 'Slide - Weiva' },
  { src: '/img/carrosel/1.png', alt: 'Promoção 1 – Medicamentos com desconto' },
  { src: '/img/carrosel/2.png', alt: 'Promoção 2 – Vitaminas e suplementos' },
  { src: '/img/carrosel/3.png', alt: 'Promoção 3 – Higiene e beleza' },
  { src: '/img/carrosel/slide-domfarm.png', alt: 'Promoção 4 – Bebê e infantil' },
]

export default function Carousel() {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef(null)
  const touchStartX = useRef(0)

  const goTo = useCallback((idx) => {
    setCurrent((idx + SLIDES.length) % SLIDES.length)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % SLIDES.length)
    }, 3500)
  }, [])

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [startTimer])

  function handleMouseEnter() { clearInterval(timerRef.current) }
  function handleMouseLeave() { startTimer() }
  function handleTouchStart(e) { touchStartX.current = e.touches[0].clientX }
  function handleTouchEnd(e) {
    const dx = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); startTimer() }
  }

  return (
    <section
      className="hero-carousel"
      aria-label="Promoções em destaque"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="hero-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((slide, i) => (
          <div key={i} className="hero-slide">
            <div className="info-container-hero">
              <img src={slide.src} alt={slide.alt} />
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-btn prev"
        aria-label="Anterior"
        onClick={() => { prev(); startTimer() }}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <button
        className="carousel-btn next"
        aria-label="Próximo"
        onClick={() => { next(); startTimer() }}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>

      <div className="carousel-dots" role="tablist">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-label={`Slide ${i + 1}`}
            className={i === current ? 'active' : ''}
            onClick={() => { goTo(i); startTimer() }}
          />
        ))}
      </div>
    </section>
  )
}

import { Shader, ChromaFlow, Swirl } from "shaders/react"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { WorkSection } from "@/components/sections/work-section"
import { ServicesSection } from "@/components/sections/services-section"
import { AboutSection } from "@/components/sections/about-section"
import { ContactSection } from "@/components/sections/contact-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const shaderContainerRef = useRef<HTMLDivElement>(null)
  const scrollThrottleRef = useRef<number>()

  useEffect(() => {
    const checkShaderReady = () => {
      if (shaderContainerRef.current) {
        const canvas = shaderContainerRef.current.querySelector("canvas")
        if (canvas && canvas.width > 0 && canvas.height > 0) {
          setIsLoaded(true)
          return true
        }
      }
      return false
    }

    if (checkShaderReady()) return

    const intervalId = setInterval(() => {
      if (checkShaderReady()) {
        clearInterval(intervalId)
      }
    }, 100)

    const fallbackTimer = setTimeout(() => {
      setIsLoaded(true)
    }, 1500)

    return () => {
      clearInterval(intervalId)
      clearTimeout(fallbackTimer)
    }
  }, [])

  const scrollToSection = (index: number) => {
    if (scrollContainerRef.current) {
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * index,
        behavior: "smooth",
      })
      setCurrentSection(index)
    }
  }

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.abs(e.touches[0].clientY - touchStartY.current) > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const touchEndX = e.changedTouches[0].clientX
      const deltaY = touchStartY.current - touchEndY
      const deltaX = touchStartX.current - touchEndX

      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0 && currentSection < 4) {
          scrollToSection(currentSection + 1)
        } else if (deltaY < 0 && currentSection > 0) {
          scrollToSection(currentSection - 1)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault()

        if (!scrollContainerRef.current) return

        scrollContainerRef.current.scrollBy({
          left: e.deltaY,
          behavior: "instant",
        })

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const newSection = Math.round(scrollContainerRef.current.scrollLeft / sectionWidth)
        if (newSection !== currentSection) {
          setCurrentSection(newSection)
        }
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel)
      }
    }
  }, [currentSection])

  useEffect(() => {
    const handleScroll = () => {
      if (scrollThrottleRef.current) return

      scrollThrottleRef.current = requestAnimationFrame(() => {
        if (!scrollContainerRef.current) {
          scrollThrottleRef.current = undefined
          return
        }

        const sectionWidth = scrollContainerRef.current.offsetWidth
        const scrollLeft = scrollContainerRef.current.scrollLeft
        const newSection = Math.round(scrollLeft / sectionWidth)

        if (newSection !== currentSection && newSection >= 0 && newSection <= 4) {
          setCurrentSection(newSection)
        }

        scrollThrottleRef.current = undefined
      })
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true })
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
      if (scrollThrottleRef.current) {
        cancelAnimationFrame(scrollThrottleRef.current)
      }
    }
  }, [currentSection])

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />

      <div
        ref={shaderContainerRef}
        className={`fixed inset-0 z-0 transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ contain: "strict" }}
      >
        <Shader className="h-full w-full">
          <Swirl
            colorA="#1275d8"
            colorB="#e19136"
            speed={0.8}
            detail={0.8}
            blend={50}
            coarseX={40}
            coarseY={40}
            mediumX={40}
            mediumY={40}
            fineX={40}
            fineY={40}
          />
          <ChromaFlow
            baseColor="#0066ff"
            upColor="#0066ff"
            downColor="#d1d1d1"
            leftColor="#e19136"
            rightColor="#e19136"
            intensity={0.9}
            radius={1.8}
            momentum={25}
            maskType="alpha"
            opacity={0.97}
          />
        </Shader>
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 transition-opacity duration-700 md:px-12 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <span className="font-sans text-xl font-bold text-foreground">С</span>
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Софья мебель</span>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {["Главная", "Работы", "Услуги", "О нас", "Контакты"].map((item, index) => (
            <button
              key={item}
              onClick={() => scrollToSection(index)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === index ? "text-foreground" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {item}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === index ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <MagneticButton variant="secondary" onClick={() => scrollToSection(4)}>
          Начать
        </MagneticButton>
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className={`relative z-10 flex h-screen overflow-x-auto overflow-y-hidden transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Hero Section */}
        <section className="relative flex h-screen w-screen shrink-0 overflow-hidden">
          {/* Тёмный фон */}
          <div className="absolute inset-0 z-0 bg-[#1a1a1a]" />

          {/* Основной layout */}
          <div className="relative z-10 flex h-full w-full flex-col md:flex-row">

            {/* Левая колонка — текст */}
            <div className="flex flex-1 flex-col justify-center px-6 pb-4 pt-20 md:px-12 md:py-0 lg:px-16">
              {/* Логотип */}
              <div className="mb-5 animate-in fade-in slide-in-from-bottom-4 duration-700 md:mb-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
                    <span className="font-sans text-lg font-bold text-white">С</span>
                  </div>
                  <div>
                    <p className="font-sans text-base font-semibold uppercase tracking-widest text-white">Софья мебель</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Ценим качество и комфорт</p>
                  </div>
                </div>
              </div>

              <h1 className="mb-3 animate-in fade-in slide-in-from-bottom-8 font-sans text-4xl font-light leading-[1.05] tracking-tight text-white duration-1000 sm:text-5xl md:text-6xl lg:text-7xl">
                Мебель<br />на заказ
              </h1>

              <p className="mb-2 animate-in fade-in slide-in-from-bottom-4 font-mono text-xs uppercase tracking-widest text-white/60 duration-700">
                Дизайн / Производство / Обзоры
              </p>

              <p className="mb-6 max-w-sm animate-in fade-in slide-in-from-bottom-4 text-sm leading-relaxed text-white/80 duration-1000 delay-200 md:text-base">
                Изготавливаем кухни, шкафы и мебель для всей квартиры под ключ. В срок, с гарантией.
              </p>

              <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-3 duration-1000 delay-300 sm:flex-row sm:items-center">
                <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection(4)}>
                  Рассчитать стоимость
                </MagneticButton>
                <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                  Наши услуги
                </MagneticButton>
              </div>

              {/* Бейдж авторов */}
              <div className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 md:mt-8">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-3 py-2 backdrop-blur-md">
                  <span className="text-sm">♥</span>
                  <p className="font-sans text-xs text-white/80">Андрей и Александра Рухлядевы</p>
                </div>
              </div>
            </div>

            {/* Правая колонка — фото */}
            <div className="relative flex shrink-0 items-end justify-center md:w-[45%] lg:w-[42%]">
              <img
                src="https://cdn.poehali.dev/projects/0b9623fe-edb8-44f4-841c-541338ebf8ca/bucket/12a8c33c-1d44-4a45-921d-a7ffacb28392.jpg"
                alt="Андрей и Александра Рухлядевы"
                className="h-[45vh] w-auto object-contain object-bottom md:h-full md:w-full md:object-cover md:object-top"
              />
              {/* Лёгкий градиент слева для плавного перехода */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#1a1a1a] to-transparent md:w-24" />
            </div>
          </div>

          {/* Листайте вправо */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-in fade-in duration-1000 delay-700">
            <div className="flex items-center gap-2">
              <p className="font-mono text-xs text-white/60">Листайте вправо</p>
              <div className="flex h-6 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
                <div className="h-2 w-2 animate-pulse rounded-full bg-white/70" />
              </div>
            </div>
          </div>
        </section>

        <WorkSection />
        <ServicesSection />
        <AboutSection scrollToSection={scrollToSection} />
        <ContactSection />
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}
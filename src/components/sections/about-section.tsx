import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"

export function AboutSection({ scrollToSection }: { scrollToSection?: (index: number) => void }) {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16 lg:gap-24">

          {/* Left — текст + фото */}
          <div>
            <div
              className={`mb-6 transition-all duration-700 md:mb-10 ${
                isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
              }`}
            >
              <h2 className="mb-3 font-sans text-3xl font-light leading-[1.1] tracking-tight text-foreground md:mb-4 md:text-6xl lg:text-7xl">
                Мебель с
                <br />
                душой и
                <br />
                <span className="text-foreground/30">характером</span>
              </h2>
            </div>

            <div
              className={`space-y-3 transition-all duration-700 md:space-y-4 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                Мы — Андрей и Александра Рухлядевы. Небольшая мастерская с большим опытом. Каждую кухню и шкаф делаем так, как будто это для собственного дома.
              </p>
              <p className="max-w-md text-sm leading-relaxed text-foreground/80 md:text-base">
                Работаем только с качественными материалами, соблюдаем сроки и берём полную ответственность за результат.
              </p>
            </div>

            {/* Фото команды */}
            <div
              className={`mt-6 transition-all duration-700 md:mt-8 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              }`}
              style={{ transitionDelay: "350ms" }}
            >
              <div className="relative h-32 w-48 overflow-hidden rounded-xl md:h-40 md:w-60">
                <img
                  src="https://cdn.poehali.dev/projects/0b9623fe-edb8-44f4-841c-541338ebf8ca/bucket/12a8c33c-1d44-4a45-921d-a7ffacb28392.jpg"
                  alt="Андрей и Александра Рухлядевы"
                  className="h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-2 left-3">
                  <p className="font-mono text-xs text-white/80">Андрей и Александра</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — цифры */}
          <div className="flex flex-col justify-center space-y-6 md:space-y-12">
            {[
              { value: "3000+", label: "Проектов", sublabel: "Сданных клиентам", direction: "right" },
              { value: "10", label: "Лет", sublabel: "На рынке мебели", direction: "left" },
              { value: "100%", label: "Гарантия", sublabel: "На все изделия 2 года", direction: "right" },
            ].map((stat, i) => {
              const getRevealClass = () => {
                if (!isVisible) {
                  return stat.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
                }
                return "translate-x-0 opacity-100"
              }

              return (
                <div
                  key={i}
                  className={`flex items-baseline gap-4 border-l border-accent/40 pl-4 transition-all duration-700 md:gap-8 md:pl-8 ${getRevealClass()}`}
                  style={{
                    transitionDelay: `${300 + i * 150}ms`,
                    marginLeft: i % 2 === 0 ? "0" : "auto",
                    maxWidth: i % 2 === 0 ? "100%" : "85%",
                  }}
                >
                  <div className="text-3xl font-light text-foreground md:text-6xl lg:text-7xl">{stat.value}</div>
                  <div>
                    <div className="font-sans text-base font-light text-foreground md:text-xl">{stat.label}</div>
                    <div className="font-mono text-xs text-accent/70">{stat.sublabel}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className={`mt-8 flex flex-wrap gap-3 transition-all duration-700 md:mt-12 md:gap-4 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
          style={{ transitionDelay: "750ms" }}
        >
          <MagneticButton size="lg" variant="primary" onClick={() => scrollToSection?.(4)}>
            Рассчитать стоимость
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection?.(1)}>
            Смотреть работы
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}

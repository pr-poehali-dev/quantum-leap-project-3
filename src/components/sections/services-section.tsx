import { useReveal } from "@/hooks/use-reveal"

const services = [
  {
    title: "Кухни на заказ",
    description: "Проектируем и изготавливаем кухни любой сложности — угловые, прямые, островные. От эконом до премиум.",
    direction: "top",
    icon: "🍽️",
  },
  {
    title: "Шкафы-купе",
    description: "Встроенные и корпусные шкафы точно по вашим размерам. Любые конфигурации наполнения.",
    direction: "right",
    icon: "🚪",
  },
  {
    title: "Квартира под ключ",
    description: "Разрабатываем и реализуем мебель для всей квартиры в едином стиле и в установленные сроки.",
    direction: "left",
    icon: "🏠",
  },
  {
    title: "Дизайн-проект",
    description: "Бесплатный замер и 3D-визуализация будущей мебели перед началом производства.",
    direction: "bottom",
    icon: "📐",
  },
]

export function ServicesSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-10 transition-all duration-700 md:mb-14 ${
            isVisible ? "translate-y-0 opacity-100" : "-translate-y-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Услуги
          </h2>
          <p className="font-mono text-sm text-accent">/ Что мы делаем</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 md:gap-x-16 md:gap-y-10 lg:gap-x-24">
          {services.map((service, i) => (
            <ServiceCard key={i} service={service} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: (typeof services)[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      switch (service.direction) {
        case "left": return "-translate-x-16 opacity-0"
        case "right": return "translate-x-16 opacity-0"
        case "top": return "-translate-y-16 opacity-0"
        case "bottom": return "translate-y-16 opacity-0"
        default: return "translate-y-12 opacity-0"
      }
    }
    return "translate-x-0 translate-y-0 opacity-100"
  }

  return (
    <div
      className={`group transition-all duration-700 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className="h-px w-8 bg-accent/40 transition-all duration-300 group-hover:w-12 group-hover:bg-accent/70" />
        <span className="font-mono text-xs text-accent/60">0{index + 1}</span>
        <span className="text-lg">{service.icon}</span>
      </div>
      <h3 className="mb-2 font-sans text-2xl font-light text-foreground md:text-3xl">{service.title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-foreground/70 md:text-base">{service.description}</p>
    </div>
  )
}

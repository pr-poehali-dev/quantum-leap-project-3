import { useReveal } from "@/hooks/use-reveal"

const projects = [
  {
    number: "01",
    title: "Кухня в тёмном стиле",
    category: "Матовые фасады · Мрамор · Подсветка",
    year: "2024",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/0b9623fe-edb8-44f4-841c-541338ebf8ca/bucket/8b4346e2-2ec7-48e2-9413-40fe3c081a36.jpg",
  },
  {
    number: "02",
    title: "Встроенный шкаф в прихожей",
    category: "Шкаф-купе · Встроенный · Прихожая",
    year: "2024",
    direction: "right",
    image: "https://cdn.poehali.dev/projects/0b9623fe-edb8-44f4-841c-541338ebf8ca/bucket/ece3b13f-f0f8-41a7-9821-3cdfe94da4d5.jpg",
  },
  {
    number: "03",
    title: "Кухня с голубыми фасадами",
    category: "Голубые фасады · Квартира под ключ",
    year: "2025",
    direction: "left",
    image: "https://cdn.poehali.dev/projects/0b9623fe-edb8-44f4-841c-541338ebf8ca/bucket/5fea1d64-9d14-48aa-912a-56ed912e630f.jpg",
  },
]

export function WorkSection() {
  const { ref, isVisible } = useReveal(0.3)

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-6 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div
          className={`mb-8 transition-all duration-700 md:mb-12 ${
            isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
          }`}
        >
          <h2 className="mb-1 font-sans text-5xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Портфолио
          </h2>
          <p className="font-mono text-sm text-accent">/ Работа с клиентами</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
          {projects.map((project, i) => (
            <ClientCard key={i} project={project} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientCard({
  project,
  index,
  isVisible,
}: {
  project: (typeof projects)[0]
  index: number
  isVisible: boolean
}) {
  const getRevealClass = () => {
    if (!isVisible) {
      return project.direction === "left" ? "-translate-x-16 opacity-0" : "translate-x-16 opacity-0"
    }
    return "translate-x-0 opacity-100"
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-foreground/10 transition-all duration-700 hover:border-accent/40 ${getRevealClass()}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="relative h-60 overflow-hidden md:h-64">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="font-mono text-xs text-foreground/30">{project.number}</span>
            <div className="h-px flex-1 bg-accent/30" />
            <span className="font-mono text-xs text-foreground/30">{project.year}</span>
          </div>
          <h3 className="font-sans text-lg font-light text-white">{project.title}</h3>
          <p className="font-mono text-xs text-accent/80">{project.category}</p>
        </div>
      </div>
    </div>
  )
}

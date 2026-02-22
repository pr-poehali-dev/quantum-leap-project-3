import { useReveal } from "@/hooks/use-reveal"
import { useState, type FormEvent } from "react"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

export function ContactSection() {
  const { ref, isVisible } = useReveal(0.3)
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.message) return
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitSuccess(true)
    setFormData({ name: "", phone: "", message: "" })
    setTimeout(() => setSubmitSuccess(false), 5000)
  }

  return (
    <section
      ref={ref}
      className="flex h-screen w-screen shrink-0 snap-start items-center px-4 pt-20 md:px-12 md:pt-0 lg:px-16"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr] md:gap-16 lg:gap-24">

          {/* Левая колонка */}
          <div className="flex flex-col justify-center">
            <div
              className={`mb-6 transition-all duration-700 md:mb-10 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"
              }`}
            >
              <h2 className="mb-2 font-sans text-4xl font-light leading-[1.05] tracking-tight text-foreground md:mb-3 md:text-7xl lg:text-8xl">
                Замерим
                <br />
                <span className="text-foreground/30">и посчитаем</span>
              </h2>
              <p className="font-mono text-xs text-accent md:text-sm">/ Бесплатно и без обязательств</p>
            </div>

            <div className="space-y-4 md:space-y-6">
              <a
                href="tel:+79999999999"
                className={`group block transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="Phone" className="h-3 w-3 text-accent/60" />
                  <span className="font-mono text-xs text-foreground/50">Телефон</span>
                </div>
                <p className="text-base text-foreground transition-colors group-hover:text-accent md:text-2xl">
                  +7 (999) 999-99-99
                </p>
              </a>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <div className="mb-1 flex items-center gap-2">
                  <Icon name="MapPin" className="h-3 w-3 text-accent/60" />
                  <span className="font-mono text-xs text-foreground/50">Работаем</span>
                </div>
                <p className="text-base text-foreground md:text-2xl">Москва и область</p>
              </div>

              <div
                className={`flex gap-3 pt-1 transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                {["Telegram", "VK", "Instagram", "WhatsApp"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="border-b border-transparent font-mono text-xs text-foreground/50 transition-all hover:border-accent/60 hover:text-accent"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Правая колонка — форма */}
          <div className="flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50 md:mb-2">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none md:py-2 md:text-base"
                  style={{ borderColor: "hsl(28 10% 25%)" }}
                  placeholder="Ваше имя"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "350ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50 md:mb-2">Телефон</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none md:py-2 md:text-base"
                  style={{ borderColor: "hsl(28 10% 25%)" }}
                  placeholder="+7 (___) ___-__-__"
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
                }`}
                style={{ transitionDelay: "500ms" }}
              >
                <label className="mb-1 block font-mono text-xs text-foreground/50 md:mb-2">Что нужно сделать?</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full border-b bg-transparent py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:outline-none md:py-2 md:text-base"
                  style={{ borderColor: "hsl(28 10% 25%)" }}
                  placeholder="Кухня, шкаф, вся квартира..."
                />
              </div>

              <div
                className={`transition-all duration-700 ${
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
                }`}
                style={{ transitionDelay: "650ms" }}
              >
                <MagneticButton variant="primary" size="lg" className="w-full disabled:opacity-50">
                  {isSubmitting ? "Отправка..." : "Оставить заявку"}
                </MagneticButton>
                {submitSuccess && (
                  <p className="mt-3 text-center font-mono text-sm text-accent">Заявка отправлена! Мы свяжемся с вами.</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

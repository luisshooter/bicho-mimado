import { Reveal } from '@/components/motion/reveal'
import LetterSwing from '@/components/originkit/ui/letter-swing'

const FEATURES = [
  {
    number: '01',
    title: 'Amor em primeiro lugar',
    description:
      'Tratamos cada pet como se fosse nosso. Carinho, paciência e um colo sempre disponível.',
  },
  {
    number: '02',
    title: 'Cuidado que se vê',
    description:
      'Produtos de qualidade, ambiente limpo e seguro, e atenção a cada detalhe do banho à tosa.',
  },
  {
    number: '03',
    title: 'Profissionalismo felpudo',
    description:
      'Equipe treinada e apaixonada, pronta para deixar seu bichinho lindo, cheiroso e feliz.',
  },
]

export function Features() {
  return (
    <section id="sobre" className="bg-brand-soft/50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-widest text-brand">Nosso jeito</span>
          <LetterSwing
            text="Feito com muito carinho"
            font={{
              fontFamily: 'var(--font-fredoka)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: '1.2',
              letterSpacing: '-0.01em',
              textAlign: 'center',
            }}
            color='#1e293b'
            tag='h2'
            startRotation={-60}
            startOpacity={0}
            startY={30}
            startScale={0.95}
            transformOrigin='top center'
            stagger={0.04}
            transition={{ type: 'spring', stiffness: 280, damping: 20, mass: 0.8 }}
            appearTrigger="scroll"
            scrollConfig={{ position: "bottom", distance: 20 }}
          />
        </Reveal>

        <div className="mt-14 flex flex-col gap-5">
          {FEATURES.map((feature, index) => (
            <Reveal
              key={feature.number}
              delay={index * 120}
              className="grid items-center gap-4 rounded-3xl border border-border/70 bg-card p-7 sm:grid-cols-[auto_1fr_2fr] sm:gap-8 sm:p-9"
            >
              <span className="font-display text-6xl font-bold leading-none text-brand/35 sm:text-7xl">
                {feature.number}
              </span>
              <h3 className="text-balance font-display text-2xl font-semibold text-ink">
                {feature.title}
              </h3>
              <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

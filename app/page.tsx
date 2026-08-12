import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { MarqueeBand } from '@/components/marquee-band'
import { Services } from '@/components/services'
import { Features } from '@/components/features'
import { Gallery } from '@/components/gallery'
import { Testimonials } from '@/components/testimonials'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { WhatsappFloat } from '@/components/whatsapp-float'

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <MarqueeBand />
      <Services />
      <Features />
      <Gallery />
      <Testimonials />
      <Contact />
      <SiteFooter />
      <WhatsappFloat />
    </main>
  )
}

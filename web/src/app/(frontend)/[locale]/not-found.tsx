import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden px-6">
      <div className="tech-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <p className="mt-4 text-muted-foreground">页面不存在 · Page not found</p>
        <Button asChild className="mt-8">
          <Link href="/">返回首页 / Home</Link>
        </Button>
      </div>
    </section>
  )
}

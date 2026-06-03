import {
  Brain,
  Cpu,
  Database,
  Mic,
  Wrench,
  Network,
  Shield,
  Sparkles,
  Heart,
  Activity,
  GraduationCap,
  Factory,
  Building2,
  Rocket,
  Zap,
  Lock,
  Users,
  Layers,
  Bot,
  MessageCircle,
  Gauge,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

const map: Record<string, LucideIcon> = {
  brain: Brain,
  cpu: Cpu,
  database: Database,
  mic: Mic,
  wrench: Wrench,
  network: Network,
  shield: Shield,
  sparkles: Sparkles,
  heart: Heart,
  activity: Activity,
  'graduation-cap': GraduationCap,
  factory: Factory,
  'building-2': Building2,
  rocket: Rocket,
  zap: Zap,
  lock: Lock,
  users: Users,
  layers: Layers,
  bot: Bot,
  'message-circle': MessageCircle,
  gauge: Gauge,
  workflow: Workflow,
}

export function Icon({
  name,
  className,
}: {
  name?: string | null
  className?: string
}) {
  const Cmp = (name && map[name]) || Sparkles
  return <Cmp className={className} aria-hidden />
}

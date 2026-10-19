import { Camera, ClipboardList, History, Repeat, Share2, TrendingUp } from 'lucide-react'
import SectionBand from './SectionBand.jsx'

const FEATURES = [
  {
    icon: ClipboardList,
    title: 'Structured log',
    description:
      'Method, equipment, beans, parameters and tasting notes in guided fields — not a blank row in a spreadsheet.',
  },
  {
    icon: Camera,
    title: 'Photo attached',
    description:
      "Pick a photo of the finished cup while you're still at the counter. Resized and stored with the brew.",
  },
  {
    icon: History,
    title: 'Brew history',
    description: 'Every brew, newest first. Filter by method, bean or rating to compare.',
  },
  {
    icon: Repeat,
    title: 'Repeat a brew',
    description:
      'One button carries the setup forward — method, equipment, beans, parameters. New row, fresh tasting notes.',
  },
  {
    icon: TrendingUp,
    title: 'Insights',
    description:
      'What your 4★+ brews have in common: ranked methods, beans, grinders. Counts shown beside every figure.',
  },
  {
    icon: Share2,
    title: 'Share cards',
    description: 'Generate a post-ready image of a brew — Story or Post aspect — and send it to Instagram.',
  },
]

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-5xl px-4 py-16">
      <SectionBand letter="B" label="Features" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="rounded p-6"
            style={{ background: 'var(--card)', border: '1px solid var(--rule)' }}
          >
            <Icon size={24} style={{ color: 'var(--green)' }} />
            <h3 className="mt-4 font-semibold">{title}</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--ink-faint)' }}>
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  meta?: string
  title: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, meta, title, children }: Props) {
  return (
    <div className="py-space-md flex flex-col xl:flex-row xl:items-center justify-between gap-space-md">
      <div>
        <div className="flex items-center gap-2">
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">
            {eyebrow}
          </span>
          {meta && (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="font-mono-data text-mono-data text-on-surface-variant">{meta}</span>
            </>
          )}
        </div>
        <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight mt-0.5">
          {title}
        </h1>
      </div>
      {children && <div className="flex items-center flex-wrap gap-2">{children}</div>}
    </div>
  )
}

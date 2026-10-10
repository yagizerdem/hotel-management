import type { ComponentProps } from 'react'

type IconProps = { name: string } & Omit<ComponentProps<'span'>, 'children'>

export default function Icon({ name, className = '', ...rest }: IconProps) {
  return (
    <span className={`material-symbols-outlined ${className}`} {...rest}>
      {name}
    </span>
  )
}

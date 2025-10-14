import React from 'react'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }

export default function Button({ children, className, ...rest }: Props) {
  const cls = ['btn', className].filter(Boolean).join(' ')
  return <button className={cls} {...rest}>{children}</button>
}

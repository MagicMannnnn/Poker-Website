import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string }

export default function InputField({ label, ...props }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && <label style={{ fontSize: 13, color: 'var(--muted)' }}>{label}</label>}
      <input className="input" {...props} />
    </div>
  )
}

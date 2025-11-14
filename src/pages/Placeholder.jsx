import React from 'react'

export default function Placeholder({ title = 'Coming soon', body = 'Content will be added later.', locale = 'fa' }) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-400">{body}</p>
    </div>
  )
}

'use client'
import { Streamdown } from 'streamdown'
import 'katex/dist/katex.min.css'

interface StreamdownMarkdownProps {
  content: string
  className?: string
}

export function StreamdownMarkdown({ content, className = '' }: StreamdownMarkdownProps) {
  console.log({ content })
  if (content.includes('</think>')) {
    content = content.replace(/<think>[\s\S]*?<\/think>/gi, '')
  }
  return (
    <div className={`streamdown-markdown ${className}`}>
      <Streamdown>{content}</Streamdown>
    </div>
  )
}

export default StreamdownMarkdown

'use client'

import { useSearchParams } from 'next/navigation'
import { JSX, Suspense, useEffect, useState } from 'react'

function EmbedContent() {
  const searchParams = useSearchParams()
  const url = searchParams.get('url') || ''
  const [embedCode, setEmbedCode] = useState<JSX.Element | null>(null)

  useEffect(() => {
    const parseEmbed = () => {
      if (!url) return

      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const videoId = url.includes('youtu.be')
          ? url.split('/').pop()
          : new URL(url).searchParams.get('v')
        setEmbedCode(
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 'none' }}
          />
        )
      } else if (url.includes('facebook.com')) {
        setEmbedCode(
          <iframe
            src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
              url
            )}&show_text=0&autoplay=1&width=560`}
            width="100%"
            height="100%"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        )
      } else {
        setEmbedCode(
          <iframe
            src={url}
            width="100%"
            height="100%"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{ border: 'none' }}
          />
        )
      }
    }

    parseEmbed()
    const interval = setInterval(parseEmbed, 60_000) // ⏱️ refresh tiap menit
    return () => clearInterval(interval)
  }, [url])

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
      {embedCode}
    </div>
  )
}

export default function EmbedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmbedContent />
    </Suspense>
  )
}
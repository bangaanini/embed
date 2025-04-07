'use client'
import { useState } from 'react'


export default function Home() {
  const [url, setUrl] = useState('')
  const [embedLink, setEmbedLink] = useState<string | null>(null)

  const generateLink = () => {
    const obsUrl = `/embed?url=${encodeURIComponent(url)}`
    setEmbedLink(obsUrl)
  }

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🎬 Embed Video OBS</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Masukkan URL video"
        style={{ width: '80%', padding: '0.5rem' }}
      />
      <button onClick={generateLink} style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}>
        Generate Link OBS
      </button>

      {embedLink && (
        <div style={{ marginTop: '1rem' }}>
          <p>🔗 Link untuk OBS:</p>
          <code>{window.location.origin + embedLink}</code>
        </div>
      )}

      <hr style={{ margin: '2rem 0' }} />

      <h2>📺 Daftar Video</h2>

    </main>
  )
}

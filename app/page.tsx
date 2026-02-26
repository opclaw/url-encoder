'use client'

import { useState, useCallback } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const handleConvert = useCallback(() => {
    if (!input.trim()) {
      setError('Please enter a URL or text')
      setOutput('')
      return
    }

    setError('')
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch (e) {
      setError(mode === 'encode' ? 'Failed to encode' : 'Invalid URL encoding')
      setOutput('')
    }
  }, [input, mode])

  const copyToClipboard = useCallback(() => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const clearAll = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
  }, [])

  const loadSample = useCallback(() => {
    if (mode === 'encode') {
      setInput('https://example.com/search?q=hello world&page=1')
    } else {
      setInput('https%3A%2F%2Fexample.com%2Fsearch%3Fq%3Dhello%20world%26page%3D1')
    }
  }, [mode])

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--color-background)' }}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50" style={{ borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl icon-box text-white">🔗</div>
              <div>
                <span className="text-xl font-bold" style={{ color: 'var(--color-text-primary)' }}>URL Encoder</span>
                <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Encode & Decode URLs</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#tool" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Tool</a>
              <a href="#features" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>Features</a>
              <a href="#faq" className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]" style={{ color: 'var(--color-text-secondary)' }}>FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl text-3xl icon-box text-white mb-6">🔗</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              URL Encoder / Decoder
            </h1>
            <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              Convert URLs with percent-encoding. Perfect for handling special characters in web addresses and query parameters.
            </p>
          </div>
        </div>
      </section>

      {/* Tool Section */}
      <main id="tool" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card p-6 md:p-8">
          {/* Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-xl p-1.5" style={{ backgroundColor: 'var(--neutral-100)' }}>
              <button
                onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === 'encode' 
                    ? 'bg-white shadow-md' 
                    : ''
                }`}
                style={{ color: mode === 'encode' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
              >
                🔒 Encode URL
              </button>
              <button
                onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === 'decode' 
                    ? 'bg-white shadow-md' 
                    : ''
                }`}
                style={{ color: mode === 'decode' ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}
              >
                🔓 Decode URL
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={handleConvert} className="btn-primary" disabled={!input.trim()}>
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
            <button onClick={loadSample} className="btn-secondary">📝 Load Sample</button>
            <button onClick={clearAll} className="btn-ghost" disabled={!input && !output}>🗑️ Clear</button>
          </div>

          {/* Input/Output Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="overflow-hidden rounded-xl border" style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ backgroundColor: 'var(--neutral-100)', borderColor: 'var(--color-border)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{mode === 'encode' ? 'Original URL' : 'Encoded URL'}</span>
                <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{input.length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL...'}
                className="w-full h-64 px-4 py-3 border-0 resize-y focus:outline-none text-sm font-mono bg-white"
                style={{ color: 'var(--color-text-primary)' }}
              />
            </div>

            <div className="overflow-hidden rounded-xl border" style={{ backgroundColor: 'var(--neutral-50)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ backgroundColor: 'var(--neutral-100)', borderColor: 'var(--color-border)' }}>
                <span className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>{mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{output.length} chars</span>
                  {output && (
                    <button 
                      onClick={copyToClipboard} 
                      className="text-xs font-medium hover:opacity-80 transition-opacity"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-64 px-4 py-3 border-0 resize-y focus:outline-none text-sm font-mono"
                style={{ backgroundColor: 'var(--neutral-50)', color: 'var(--color-text-primary)' }}
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 p-4 rounded-lg border" style={{ backgroundColor: 'var(--error-50)', borderColor: 'var(--error-100)', color: 'var(--error-600)' }}>
              ⚠️ {error}
            </div>
          )}
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="bg-white border-t py-16 md:py-20" style={{ borderColor: 'var(--color-border)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Why Use Our URL Encoder?</h2>
            <p style={{ color: 'var(--color-text-secondary)' }} className="max-w-2xl mx-auto">Essential tools for web developers working with URLs and query parameters.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🔗', title: 'Percent Encoding', description: 'Properly encode special characters for use in URLs and query strings.' },
              { icon: '⚡', title: 'Instant Conversion', description: 'Get encoded or decoded URLs immediately without any server processing.' },
              { icon: '🔒', title: 'Secure Processing', description: 'All operations happen in your browser. Your URLs are never sent to any server.' },
              { icon: '📋', title: 'Easy Copy', description: 'One-click copying of the results to your clipboard.' },
              { icon: '🌐', title: 'Full URL Support', description: 'Works with complete URLs, query parameters, or just text fragments.' },
              { icon: '💯', title: 'Free Forever', description: 'No registration, no limits. Use it as much as you need.' },
            ].map((f, i) => (
              <div key={i} className="feature-card p-6 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 feature-icon transition-transform group-hover:scale-110" style={{ color: 'var(--color-primary)' }}>{f.icon}</div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="border-t py-16 md:py-20" style={{ backgroundColor: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What is URL encoding?', a: 'URL encoding converts characters into a format that can be transmitted over the internet. Special characters are replaced with a percent sign (%) followed by two hexadecimal digits.' },
              { q: 'When do I need to encode a URL?', a: 'You need to encode URLs when they contain special characters like spaces, ampersands, or non-ASCII characters that could be misinterpreted by browsers or servers.' },
              { q: 'Is this tool free?', a: 'Yes, completely free. No registration required.' },
              { q: 'Is my data secure?', a: 'Absolutely. All processing happens client-side. Your URLs are never sent to any server.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border p-6 hover:shadow-md transition-shadow" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{item.q}</h3>
                <p style={{ color: 'var(--color-text-secondary)' }} className="leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: 'var(--neutral-900)', color: 'var(--neutral-400)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg icon-box text-white">🔗</div>
              <span className="font-semibold text-white">URL Encoder</span>
            </div>
            <p className="text-sm">© 2024 SmartOK Tools. Free online tools for everyone.</p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-sm hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-sm hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

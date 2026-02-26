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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-2xl shadow-lg">🔗</div>
              <div>
                <span className="text-xl font-bold text-slate-900">URL Encoder</span>
                <p className="text-sm text-slate-500">Encode & Decode URLs</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#tool" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Tool</a>
              <a href="#features" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#faq" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-3xl shadow-xl mb-6">🔗</div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">URL Encoder / Decoder</h2>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">Convert URLs with percent-encoding. Perfect for handling special characters in web addresses and query parameters.</p>
          </div>
        </div>
      </section>

      <main id="tool" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-8">
          <div className="flex justify-center mb-6">
            <div className="inline-flex bg-slate-100 rounded-xl p-1.5">
              <button
                onClick={() => { setMode('encode'); setOutput(''); setError(''); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === 'encode' 
                    ? 'bg-white text-emerald-600 shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔒 Encode URL
              </button>
              <button
                onClick={() => { setMode('decode'); setOutput(''); setError(''); }}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === 'decode' 
                    ? 'bg-white text-emerald-600 shadow-md' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🔓 Decode URL
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            <button onClick={handleConvert} className="btn-primary bg-emerald-600 hover:bg-emerald-700" disabled={!input.trim()}>
              {mode === 'encode' ? 'Encode' : 'Decode'}
            </button>
            <button onClick={loadSample} className="btn-secondary">📝 Load Sample</button>
            <button onClick={clearAll} className="btn-ghost" disabled={!input && !output}>🗑️ Clear</button>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">{mode === 'encode' ? 'Original URL' : 'Encoded URL'}</span>
                <span className="text-xs text-slate-500">{input.length} chars</span>
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={mode === 'encode' ? 'Enter URL to encode...' : 'Enter encoded URL...'}
                className="w-full h-64 px-4 py-3 bg-white border-0 resize-y focus:outline-none text-sm font-mono"
              />
            </div>

            <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-100 border-b border-slate-200">
                <span className="text-sm font-semibold text-slate-700">{mode === 'encode' ? 'Encoded URL' : 'Decoded URL'}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">{output.length} chars</span>
                  {output && (
                    <button onClick={copyToClipboard} className="text-xs font-medium text-emerald-600 hover:text-emerald-700">
                      {copied ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  )}
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                placeholder="Result will appear here..."
                className="w-full h-64 px-4 py-3 bg-slate-50 border-0 resize-y focus:outline-none text-sm font-mono"
              />
            </div>
          </div>

          {error && (
            <div className="mt-4 error-message">⚠️ {error}</div>
          )}
        </div>
      </main>

      <section id="features" className="bg-white border-t border-slate-200 py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Use Our URL Encoder?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Essential tools for web developers working with URLs and query parameters.</p>
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
              <div key={i} className="group p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="bg-slate-50 border-t border-slate-200 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What is URL encoding?', a: 'URL encoding converts characters into a format that can be transmitted over the internet. Special characters are replaced with a percent sign (%) followed by two hexadecimal digits.' },
              { q: 'When do I need to encode a URL?', a: 'You need to encode URLs when they contain special characters like spaces, ampersands, or non-ASCII characters that could be misinterpreted by browsers or servers.' },
              { q: 'Is this tool free?', a: 'Yes, completely free. No registration required.' },
              { q: 'Is my data secure?', a: 'Absolutely. All processing happens client-side. Your URLs are never sent to any server.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-lg">🔗</div>
              <span className="text-white font-semibold">URL Encoder</span>
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

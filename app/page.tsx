'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState('encode')

  const handleConvert = () => {
    if (mode === 'encode') {
      setOutput(encodeURIComponent(input))
    } else {
      try {
        setOutput(decodeURIComponent(input))
      } catch (e) {
        setOutput('Error: Invalid URL encoding')
      }
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>URL Encoder / Decoder</h1>
      <div className={styles.modes}>
        <button 
          onClick={() => setMode('encode')} 
          className={mode === 'encode' ? `${styles.modeBtn} ${styles.active}` : styles.modeBtn}
        >
          Encode
        </button>
        <button 
          onClick={() => setMode('decode')} 
          className={mode === 'decode' ? `${styles.modeBtn} ${styles.active}` : styles.modeBtn}
        >
          Decode
        </button>
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL to decode...'}
        className={styles.input}
      />
      <button onClick={handleConvert} className={styles.convertBtn}>
        {mode === 'encode' ? '🔒 Encode' : '🔓 Decode'}
      </button>
      <textarea
        value={output}
        readOnly
        placeholder="Result..."
        className={styles.output}
      />
      {output && (
        <button 
          onClick={() => navigator.clipboard.writeText(output)} 
          className={styles.copyBtn}
        >
          📋 Copy Result
        </button>
      )}
    </div>
  )
}
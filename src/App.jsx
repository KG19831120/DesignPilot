import { useState, useRef } from 'react'

// Component templates - these are the "AI-generated" UI patterns
const COMPONENT_TEMPLATES = {
  button: {
    name: 'Button',
    icon: '⊕',
    description: 'Generate buttons with custom styles',
    defaultCode: `<button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25">
  Click Me
</button>`,
    generate: (params) => {
      const colors = {
        primary: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/25',
        secondary: 'bg-gray-600 hover:bg-gray-700 shadow-gray-500/25',
        success: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/25',
        danger: 'bg-rose-600 hover:bg-rose-700 shadow-rose-500/25',
        warning: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/25',
      }
      const size = {
        sm: 'px-4 py-1.5 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
      }
      const color = colors[params.color] || colors.primary
      const sz = size[params.size] || size.md
      return `<button className="${color} ${sz} text-white font-semibold rounded-xl transition-all duration-200 shadow-lg">
  ${params.label || 'Click Me'}
</button>`
    }
  },
  card: {
    name: 'Card',
    icon: '▣',
    description: 'Beautiful content cards',
    defaultCode: `<div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
  <h3 className="text-xl font-bold text-white mb-2">Card Title</h3>
  <p className="text-gray-400 text-sm">Card description goes here. This is a beautiful glass morphism card.</p>
  <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
    Learn More
  </button>
</div>`,
    generate: (params) => {
      const bg = params.glass ? 'bg-white/5 backdrop-blur-xl border border-white/10' : 'bg-gray-800 border border-gray-700'
      return `<div className="${bg} rounded-2xl p-6">
  <h3 className="text-xl font-bold text-white mb-2">${params.title || 'Card Title'}</h3>
  <p className="text-gray-400 text-sm">${params.description || 'Card description goes here.'}</p>
  <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
    ${params.cta || 'Learn More'}
  </button>
</div>`
    }
  },
  nav: {
    name: 'Navbar',
    icon: '☰',
    description: 'Navigation bars',
    defaultCode: `<nav className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10">
  <div className="text-xl font-bold text-white">Brand</div>
  <div className="flex gap-6">
    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</a>
    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Features</a>
    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Pricing</a>
    <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">Sign Up</a>
  </div>
</nav>`,
    generate: (params) => {
      return `<nav className="flex items-center justify-between px-6 py-4 bg-black/40 backdrop-blur-xl border-b border-white/10">
  <div className="text-xl font-bold text-white">${params.brand || 'Brand'}</div>
  <div className="flex gap-6">
    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</a>
    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Features</a>
    <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">Pricing</a>
    <a href="#" className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">${params.cta || 'Sign Up'}</a>
  </div>
</nav>`
    }
  },
  hero: {
    name: 'Hero Section',
    icon: '◈',
    description: 'Landing page hero sections',
    defaultCode: `<div className="text-center py-20 px-4">
  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
    Build faster with <span className="text-indigo-400">AI</span>
  </h1>
  <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
    Transform your ideas into production-ready UI components in seconds. No design skills required.
  </p>
  <div className="flex gap-4 justify-center">
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all">
      Get Started Free
    </button>
    <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl text-lg transition-all">
      View Demo
    </button>
  </div>
</div>`,
    generate: (params) => {
      return `<div className="text-center py-20 px-4">
  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
    ${params.headline || 'Build faster with'} <span className="text-indigo-400">${params.highlight || 'AI'}</span>
  </h1>
  <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
    ${params.sub || 'Transform your ideas into production-ready UI components in seconds.'}
  </p>
  <div className="flex gap-4 justify-center">
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all">
      ${params.primary || 'Get Started Free'}
    </button>
    <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl text-lg transition-all">
      ${params.secondary || 'View Demo'}
    </button>
  </div>
</div>`
    }
  },
  form: {
    name: 'Form',
    icon: '⌘',
    description: 'Contact and login forms',
    defaultCode: `<div className="max-w-md mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
  <h2 className="text-2xl font-bold text-white mb-6 text-center">Welcome Back</h2>
  <form className="space-y-4">
    <div>
      <input type="email" placeholder="Email address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500" />
    </div>
    <div>
      <input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500" />
    </div>
    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all">
      Sign In
    </button>
  </form>
</div>`,
    generate: (params) => {
      return `<div className="max-w-md mx-auto p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
  <h2 className="text-2xl font-bold text-white mb-6 text-center">${params.title || 'Welcome Back'}</h2>
  <form className="space-y-4">
    ${params.fields?.includes('name') ? `<div><input type="text" placeholder="Full name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500" /></div>` : ''}
    <div><input type="${params.fields?.includes('email') ? 'email' : 'text'}" placeholder="${params.fields?.includes('email') ? 'Email address' : 'Username'}" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500" /></div>
    <div><input type="password" placeholder="Password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-indigo-500" /></div>
    <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all">
      ${params.submit || 'Sign In'}
    </button>
  </form>
</div>`
    }
  },
  pricing: {
    name: 'Pricing Table',
    icon: '◇',
    description: 'Pricing cards for SaaS',
    defaultCode: `<div className="grid grid-cols-3 gap-6 p-8">
  {['Starter', 'Pro', 'Enterprise'].map((plan, i) => (
    <div key={plan} className={\`p-6 rounded-2xl border \${i === 1 ? 'bg-indigo-600/20 border-indigo-500/50' : 'bg-white/5 border-white/10'}\`}>
      <h3 className="text-lg font-semibold text-white">{plan}</h3>
      <div className="mt-4 text-4xl font-bold text-white">\${['0', '29', '99'][i]}<span className="text-lg text-gray-400">/mo</span></div>
      <ul className="mt-6 space-y-3">
        {['5 Projects', 'Unlimited', 'Custom'][i] === '5 Projects' && <li className="text-gray-400 text-sm">✓ 5 Projects</li>}
        {['5 Projects', 'Unlimited', 'Custom'][i] === 'Unlimited' && <li className="text-gray-400 text-sm">✓ Unlimited Projects</li>}
        {['5 Projects', 'Unlimited', 'Custom'][i] === 'Custom' && <li className="text-gray-400 text-sm">✓ Custom Solutions</li>}
        <li className="text-gray-400 text-sm">✓ AI Generation</li>
        <li className="text-gray-400 text-sm">✓ Priority Support</li>
      </ul>
      <button className={\`w-full mt-6 py-3 rounded-xl font-semibold transition-all \${i === 1 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}\`}>
        Get Started
      </button>
    </div>
  ))}
</div>`,
    generate: (params) => {
      return `<div className="grid grid-cols-3 gap-6 p-8">
  {['Starter', 'Pro', 'Enterprise'].map((plan, i) => (
    <div key={plan} className={\`p-6 rounded-2xl border \${i === 1 ? 'bg-indigo-600/20 border-indigo-500/50' : 'bg-white/5 border-white/10'}\`}>
      <h3 className="text-lg font-semibold text-white">{plan}</h3>
      <div className="mt-4 text-4xl font-bold text-white">\${['0', '29', '99'][i]}<span className="text-lg text-gray-400">/mo</span></div>
      <ul className="mt-6 space-y-3">
        <li className="text-gray-400 text-sm">✓ 5 Projects</li>
        <li className="text-gray-400 text-sm">✓ AI Generation</li>
        <li className="text-gray-400 text-sm">✓ Priority Support</li>
      </ul>
      <button className={\`w-full mt-6 py-3 rounded-xl font-semibold transition-all \${i === 1 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-white/10 hover:bg-white/20 text-white'}\`}>
        Get Started
      </button>
    </div>
  ))}
</div>`
    }
  }
}

// Smart component generator - uses AI-like pattern matching
function generateComponent(type, userPrompt) {
  const template = COMPONENT_TEMPLATES[type]
  if (!template) return template.defaultCode

  const prompt = userPrompt.toLowerCase()
  
  const params = { type }
  
  if (type === 'button') {
    if (prompt.includes('success') || prompt.includes('green')) params.color = 'success'
    else if (prompt.includes('danger') || prompt.includes('delete') || prompt.includes('red')) params.color = 'danger'
    else if (prompt.includes('warning') || prompt.includes('orange')) params.color = 'warning'
    else if (prompt.includes('secondary') || prompt.includes('gray')) params.color = 'secondary'
    else params.color = 'primary'
    
    if (prompt.includes('small') || prompt.includes('sm')) params.size = 'sm'
    else if (prompt.includes('large') || prompt.includes('big')) params.size = 'lg'
    else params.size = 'md'
    
    const labelMatch = prompt.match(/"(.*?)"/) || prompt.match(/'(.*?)'/)
    if (labelMatch) params.label = labelMatch[1]
    else if (prompt.includes('submit')) params.label = 'Submit'
    else if (prompt.includes('login') || prompt.includes('sign in')) params.label = 'Sign In'
    else if (prompt.includes('get start')) params.label = 'Get Started'
    else params.label = 'Click Me'
  }
  
  if (type === 'card') {
    if (prompt.includes('glass')) params.glass = true
    if (prompt.includes('solid') || prompt.includes('dark')) params.glass = false
    params.title = 'Stunning Product'
    params.description = 'This beautiful component was generated with AI. Customize it to fit your needs.'
    params.cta = 'Get Started'
  }
  
  if (type === 'nav') {
    const brandMatch = prompt.match(/(?:brand|logo|name)\s*[:\-]?\s*"?([^"\n,]+)"?/)
    if (brandMatch) params.brand = brandMatch[1].trim()
    params.cta = 'Sign Up'
  }
  
  if (type === 'hero') {
    const words = prompt.split(' ').filter(w => w.length > 3).slice(0, 5).join(' ')
    params.headline = words || 'Build Amazing Products'
    params.highlight = 'AI'
    params.sub = 'DesignPilot transforms your ideas into production-ready UI in seconds.'
    params.primary = 'Get Started Free'
    params.secondary = 'See How It Works'
  }
  
  return template.generate(params)
}

// Component palette items
const COMPONENT_TYPES = [
  { key: 'button', label: 'Button', icon: '⊕' },
  { key: 'card', label: 'Card', icon: '▣' },
  { key: 'nav', label: 'Navbar', icon: '☰' },
  { key: 'hero', label: 'Hero', icon: '◈' },
  { key: 'form', label: 'Form', icon: '⌘' },
  { key: 'pricing', label: 'Pricing', icon: '◇' },
]

// Quick prompts
const QUICK_PROMPTS = [
  { text: 'A glassmorphism pricing card', type: 'card', prompt: 'glass card with pricing' },
  { text: 'Red danger button', type: 'button', prompt: 'danger red button' },
  { text: 'SaaS landing hero', type: 'hero', prompt: 'hero section for SaaS product' },
  { text: 'Login form with email', type: 'form', prompt: 'login form with email' },
  { text: 'E-commerce navbar', type: 'nav', prompt: 'navbar for e-commerce brand' },
]

function App() {
  const [selectedType, setSelectedType] = useState('button')
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [activeTab, setActiveTab] = useState('preview')
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)
  const [history, setHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const previewRef = useRef(null)

  const handleGenerate = (typeOverride, promptOverride) => {
    const type = typeOverride || selectedType
    const userPrompt = promptOverride || prompt
    setIsGenerating(true)
    
    setTimeout(() => {
      const code = generateComponent(type, userPrompt)
      setGeneratedCode(code)
      setHistory(prev => [{ type, prompt: userPrompt, code, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 9)])
      setActiveTab('preview')
      setIsGenerating(false)
    }, 600)
  }

  const handleQuickPrompt = (qp) => {
    setSelectedType(qp.type)
    setPrompt(qp.prompt)
    handleGenerate(qp.type, qp.prompt)
  }

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const exportHTML = () => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>DesignPilot Export</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body { background: #0a0a0f; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 2rem; }
  </style>
</head>
<body>
  <div id="root">${generatedCode.replace(/className=/g, 'class=').replace(/React|import.*?;|{.*?}/gs, '')}</div>
</body>
</html>`
    const blob = new Blob([html], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'designpilot-export.html'
    a.click()
    URL.revokeObjectURL(url)
  }

  const loadFromHistory = (item) => {
    setSelectedType(item.type)
    setPrompt(item.prompt)
    setGeneratedCode(item.code)
    setActiveTab('preview')
    setShowHistory(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm">⚡</div>
          <span className="text-xl font-bold text-white">DesignPilot</span>
          <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">v1.0 MVP</span>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className="text-gray-400 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
          >
            History ({history.length})
          </button>
          <a href="https://github.com/KG19831120" target="_blank" rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 p-4 flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-3 tracking-wider">Components</p>
            <div className="space-y-1">
              {COMPONENT_TYPES.map(ct => (
                <button
                  key={ct.key}
                  onClick={() => setSelectedType(ct.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm transition-all ${
                    selectedType === ct.key 
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="text-base">{ct.icon}</span>
                  <span>{ct.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-3 tracking-wider">Quick Start</p>
            <div className="space-y-1">
              {QUICK_PROMPTS.map((qp, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickPrompt(qp)}
                  className="w-full text-left text-xs text-gray-500 hover:text-gray-300 px-3 py-1.5 rounded-md hover:bg-white/5 transition-all truncate"
                >
                  → {qp.text}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-xs text-gray-600 text-center">
              Powered by DesignPilot AI<br />
              Built in 4 hours ⚡
            </p>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">
          {/* Prompt Bar */}
          <div className="p-6 border-b border-white/5">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={e => setPrompt(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                  placeholder={`Describe your ${selectedType}... e.g. "a glassmorphism pricing card for a SaaS"`}
                  className="prompt-input w-full text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                  {selectedType}
                </span>
              </div>
              <button 
                onClick={() => handleGenerate()}
                disabled={isGenerating}
                className="btn-primary flex items-center gap-2 text-sm"
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    Generate
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Preview */}
            <div className="flex-1 flex flex-col">
              {/* Tabs */}
              <div className="flex border-b border-white/5 px-4">
                {['preview', 'code'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                      activeTab === tab 
                        ? 'text-white border-indigo-500' 
                        : 'text-gray-500 border-transparent hover:text-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Preview Content */}
              <div className="flex-1 relative overflow-hidden">
                {activeTab === 'preview' ? (
                  <div className="absolute inset-0 overflow-auto p-8 bg-[#0a0a0f]">
                    {generatedCode ? (
                      <div className="min-h-full flex items-center justify-center">
                        <div 
                          ref={previewRef}
                          className="w-full max-w-3xl transform scale-75 origin-center"
                          dangerouslySetInnerHTML={{
                            __html: generatedCode
                              .replace(/className=/g, 'class=')
                              .replace(/React|import.*?;|{.*?}/gs, '')
                              .replace(/<>/g, '')
                              .replace(/<\/?Fragment>/g, '')
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                        <div className="text-6xl mb-4 opacity-20">⚡</div>
                        <h3 className="text-xl font-semibold text-white/60 mb-2">No component yet</h3>
                        <p className="text-gray-500 text-sm max-w-xs">
                          Describe what you want and hit Generate, or try a Quick Start prompt from the sidebar.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full overflow-auto p-6">
                    {generatedCode ? (
                      <div className="relative">
                        <button
                          onClick={copyCode}
                          className="absolute top-4 right-4 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-all"
                        >
                          {copied ? '✓ Copied!' : 'Copy Code'}
                        </button>
                        <pre className="code-block text-gray-300 leading-relaxed">{generatedCode}</pre>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-500">
                        Generate a component to see the code
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Actions */}
              {generatedCode && (
                <div className="border-t border-white/5 px-6 py-3 flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {selectedType} • Tailwind CSS + React
                  </span>
                  <div className="flex gap-2">
                    <button onClick={copyCode} className="btn-secondary text-xs py-2 px-4">
                      {copied ? '✓ Copied' : 'Copy Code'}
                    </button>
                    <button onClick={exportHTML} className="btn-primary text-xs py-2 px-4">
                      Export HTML
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* History Sidebar Overlay */}
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setShowHistory(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div 
            className="relative w-80 bg-[#0f0f1a] border-l border-white/10 p-4 overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">History</h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-500 hover:text-white">✕</button>
            </div>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-8">No history yet</p>
            ) : (
              <div className="space-y-2">
                {history.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => loadFromHistory(item)}
                    className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">{item.type}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">{item.prompt}</p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App

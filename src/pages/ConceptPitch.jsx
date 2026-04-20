export default function ConceptPitch() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#FFFDF8', margin: 0, padding: '40px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h1 style={{ textAlign: 'center', color: '#5D564D' }}>Custom SVG Concept Pitch</h1>

        {/* ── Section 1: Create ── */}
        <h2 style={{ color: '#5D564D' }}>Section 1: Create (Paint/Arrange)</h2>
        <div style={sectionStyle}>

          <ConceptCard label="1A: Artisan Bloom" desc="Integrates the palette and a new sprout growing directly from the creativity base.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 50C20 33.4315 33.4315 20 50 20C66.5685 20 80 33.4315 80 50C80 66.5685 66.5685 80 50 80C33.4315 80 20 66.5685 20 50Z" fill="#F5EAE0" stroke="#E5D9C4" strokeWidth="1.5"/>
              <circle cx="35" cy="45" r="4" fill="#E8D3CF"/>
              <circle cx="50" cy="35" r="4" fill="#E5D9C4"/>
              <path d="M50 80V65C50 60 55 58 60 60M50 65C50 60 45 58 40 60" stroke="#E5D9C4" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="1B: Studio Still Life" desc="A more literal, hand-sketched interpretation of the tools and the organic material.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 80L50 40M50 40L60 15L70 40M50 40L35 30" stroke="#E5D9C4" strokeWidth="2" strokeLinecap="round"/>
              <path d="M25 75C25 75 40 60 60 70C75 78 80 65 80 65" stroke="#E8D3CF" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M60 70C60 70 70 60 75 62M75 62C75 62 82 58 85 62" stroke="#E8D3CF" strokeWidth="1.5"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="1C: Synthesis" desc="Modern, abstract shapes using the palette form as a backdrop for cleaner tool lines.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 50C10 27.9086 27.9086 10 50 10V90C27.9086 90 10 72.0914 10 50Z" fill="#F5EAE0" opacity="0.5"/>
              <path d="M70 10L90 30L60 90L40 70L70 10Z" stroke="#E5D9C4" strokeWidth="1.5"/>
              <path d="M30 80C30 80 30 60 45 55M45 55C45 55 55 50 60 55" stroke="#E8D3CF" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="1D: Minimalist Maker" desc="Keeps the original sprout as the main focus, with a minimalist brush accompanying it.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 90V60M50 60C50 60 40 50 35 55M50 60C50 60 60 50 65 55" stroke="#E5D9C4" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M70 85L85 30M85 30C85 30 87 25 90 28" stroke="#E8D3CF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </ConceptCard>

        </div>

        {/* ── Section 2: Connect ── */}
        <h2 style={{ color: '#5D564D' }}>Section 2: Connect (Socialize/Synergy)</h2>
        <div style={sectionStyle}>

          <ConceptCard label="2A: Woven Synergy" desc="Focuses purely on the interaction—stems intertwined, creating a new form.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M40 90C40 90 40 50 50 50M60 90C60 90 60 50 50 50" stroke="#E5D9C4" strokeWidth="2" strokeLinecap="round"/>
              <path d="M50 50C50 50 60 30 65 35M50 50C50 50 40 30 35 35" stroke="#E8D3CF" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M30 40C30 40 50 20 70 40" stroke="#E5D9C4" strokeWidth="1" strokeDasharray="3 3"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="2B: Shared Laurel" desc='Emphasizes the "community" or "achievement" aspect of connecting.'>
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 60C20 60 50 10 80 60" stroke="#E5D9C4" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 60C20 60 15 65 20 70C25 75 30 70 30 65" fill="#E8D3CF" opacity="0.6"/>
              <path d="M80 60C80 60 85 65 80 70C75 75 70 70 70 65" fill="#E8D3CF" opacity="0.6"/>
              <path d="M45 25C45 25 50 20 55 25" stroke="#E5D9C4" strokeWidth="1.5"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="2C: Organic Link" desc="Abstract linked shapes defined by subtle, handcrafted botanical lines.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 50C30 38.9543 38.9543 30 50 30C61.0457 30 70 38.9543 70 50C70 61.0457 61.0457 70 50 70C38.9543 70 30 61.0457 30 50Z" stroke="#E5D9C4" strokeWidth="1.5"/>
              <path d="M45 65C45 53.9543 53.9543 45 65 45C76.0457 45 85 53.9543 85 65C85 76.0457 76.0457 85 65 85C53.9543 85 45 76.0457 45 65Z" stroke="#E8D3CF" strokeWidth="1.5"/>
              <path d="M57 60V45M57 45L62 40M57 45L52 40" stroke="#E5D9C4" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="2D: Botanical Chat" desc="More literal representation of conversation, using two matching flowers.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 80C25 80 25 50 35 45M35 45L40 35M35 45L30 35" stroke="#E5D9C4" strokeWidth="1.5"/>
              <path d="M75 80C75 80 75 50 65 45M65 45L60 35M65 45L70 35" stroke="#E8D3CF" strokeWidth="1.5"/>
              <path d="M45 45C45 45 50 40 55 45" stroke="#E5D9C4" strokeWidth="1" strokeDasharray="2 2"/>
            </svg>
          </ConceptCard>

        </div>

        {/* ── Section 3: Recharge ── */}
        <h2 style={{ color: '#5D564D' }}>Section 3: Recharge (Well-being/Calm)</h2>
        <div style={sectionStyle}>

          <ConceptCard label="3A: Radiant Peony" desc="The original design, executed as a clean, multi-layered SVG.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80Z" fill="#F5EAE0" opacity="0.7" stroke="#E8D3CF" strokeWidth="1.5"/>
              <path d="M50 15V5M50 95V85M15 50H5M95 50H85" stroke="#E5D9C4" strokeWidth="1" strokeLinecap="round"/>
              <path d="M75 75L82 82M25 25L18 18" stroke="#E5D9C4" strokeWidth="1" strokeLinecap="round"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="3B: Serene Steep" desc="Integrates the teacup as a primary element, with the blossom rising in the steam.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 60C30 68.2843 36.7157 75 45 75H55C63.2843 75 70 68.2843 70 60V50H30V60Z" stroke="#E5D9C4" strokeWidth="2"/>
              <path d="M70 55C70 55 78 55 78 60C78 65 70 65 70 65" stroke="#E5D9C4" strokeWidth="1.5"/>
              <path d="M50 45C50 45 55 35 50 30C45 25 55 20 50 15M50 45C50 45 45 35 50 30" stroke="#E8D3CF" strokeWidth="1.5" strokeDasharray="3 3"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="3C: Abstract Calm" desc="Modern, geometric take focusing on balance and a soft halo of energy.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 80H90C90 80 80 50 50 50C20 50 10 80 10 80Z" fill="#F5EAE0"/>
              <path d="M50 50C50 50 60 40 60 30C60 20 50 15 50 15C50 15 40 20 40 30C40 40 50 50 50 50Z" stroke="#E8D3CF" strokeWidth="1.5"/>
              <circle cx="50" cy="30" r="25" stroke="#E5D9C4" strokeWidth="0.5" strokeDasharray="4 4"/>
            </svg>
          </ConceptCard>

          <ConceptCard label="3D: Grounded Well" desc="Emphasizes grounding—the blossom is stable, drawing new energy up.">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 85H90" stroke="#E5D9C4" strokeWidth="2" strokeLinecap="round"/>
              <path d="M50 80C66.5685 80 80 66.5685 80 50C80 33.4315 66.5685 20 50 20C33.4315 20 20 33.4315 20 50C20 66.5685 33.4315 80 50 80Z" fill="#E8D3CF" opacity="0.3"/>
              <path d="M50 80V95M45 88L50 95L55 88" stroke="#E5D9C4" strokeWidth="1"/>
            </svg>
          </ConceptCard>

        </div>
      </div>
    </div>
  )
}

const sectionStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  marginBottom: 60,
  borderBottom: '1px solid #EEE',
  paddingBottom: 40,
  gap: 16,
}

function ConceptCard({ label, desc, children }) {
  return (
    <div style={{
      flex: '0 0 22%',
      minWidth: 180,
      background: 'white',
      borderRadius: 12,
      padding: 20,
      textAlign: 'center',
      boxShadow: '0 4px 6px rgba(0,0,0,0.03)',
      border: '1px solid #F5F5F5',
    }}>
      <div style={{ fontSize: 13, color: '#888', marginBottom: 8, fontWeight: 'bold' }}>{label}</div>
      <div style={{ width: 150, height: 150, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
      <div style={{ fontSize: 12, color: '#AAAAAA' }}>{desc}</div>
    </div>
  )
}

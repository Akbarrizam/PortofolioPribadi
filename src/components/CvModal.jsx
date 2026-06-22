import { useLanguage } from '../contexts/LanguageContext';
import { personalInfo, experiences, skillCategories } from '../data/portfolioData';

export default function CvModal({ onClose }) {
  const { lang } = useLanguage();

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(15,23,42,0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '840px', height: '85vh',
          background: 'var(--bg-primary)', borderRadius: '24px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 100px rgba(15,23,42,0.18)',
          border: '1px solid var(--border-primary)',
          animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header Bar */}
        <div style={{
          padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-primary)',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.05), transparent)',
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px', height: '38px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: '15px',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 4px 10px rgba(99,102,241,0.25)', flexShrink: 0,
            }}>
              W
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                Wahyu — Resume CV
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                {lang === 'en' ? 'Interactive Resume Preview' : 'Pratinjau Resume Interaktif'}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Direct download PDF button (this will intentionally open/download CV.pdf, triggering IDM as expected) */}
            <a
              href={personalInfo.cvUrl}
              download="Wahyu_CV.pdf"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 700,
                textDecoration: 'none', color: '#6366F1',
                background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)',
                transition: 'all 0.2s', fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.18)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)'; }}
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {lang === 'en' ? 'Download PDF' : 'Unduh PDF'}
            </a>
            <button
              onClick={onClose}
              style={{
                width: '34px', height: '34px', borderRadius: '8px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                color: 'var(--text-muted)', cursor: 'pointer', fontSize: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#DC2626'; e.currentTarget.style.borderColor = '#FECACA'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; }}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable HTML Resume Canvas */}
        <div style={{
          flex: 1, overflowY: 'auto', background: 'var(--bg-secondary)',
          padding: '40px 32px', fontFamily: 'Inter, sans-serif',
          color: 'var(--text-secondary)',
        }}>
          <div style={{
            maxWidth: '740px', margin: '0 auto', background: 'var(--bg-primary)',
            borderRadius: '16px', border: '1px solid var(--border-primary)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.02)', padding: '40px',
          }}>
            {/* Header info */}
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em', margin: '0 0 6px' }}>
                {personalInfo.name}
              </h1>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#6366F1', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 16px' }}>
                {lang === 'en' ? 'Full-Stack Web & Mobile Developer' : 'Full-Stack Web & Mobile Developer'}
              </p>
              
              {/* Contact meta row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  📍 Surabaya, Indonesia
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  ✉️ {personalInfo.email}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  🔗 github.com/Akbarrizam
                </span>
              </div>
            </div>

            <div style={{ height: '1px', background: 'var(--border-primary)', marginBottom: '28px' }} />

            {/* Resume Structure */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'start' }}>
              
              {/* Left Column: Education & Skills */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {/* Education Section */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
                    {lang === 'en' ? 'Education' : 'Pendidikan'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <h5 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                      Institut Teknologi Adhi Tama Surabaya
                    </h5>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                      {lang === 'en' ? 'Informatics Engineering' : 'Teknik Informatika'}
                    </p>
                    <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0' }}>
                      2021 — {lang === 'en' ? 'Present' : 'Sekarang'}
                    </p>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
                    {lang === 'en' ? 'Technical Skills' : 'Keahlian Teknis'}
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {skillCategories.map(cat => (
                      <div key={cat.category}>
                        <h6 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', margin: '0 0 6px' }}>
                          {cat.category}
                        </h6>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {cat.skills.map(skill => (
                            <span key={skill.name} style={{
                              padding: '3px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: 500,
                              background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)'
                            }}>
                              {skill.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Work Experience */}
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px' }}>
                  {lang === 'en' ? 'Experience' : 'Pengalaman Kerja'}
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {experiences.map(exp => {
                    const role = lang === 'en' && exp.roleEn ? exp.roleEn : exp.role;
                    const company = lang === 'en' && exp.companyEn ? exp.companyEn : exp.company;
                    const period = lang === 'en' && exp.periodEn ? exp.periodEn : exp.period;
                    const points = lang === 'en' && exp.pointsEn ? exp.pointsEn : exp.points;

                    return (
                      <div key={exp.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <h5 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                          {role}
                        </h5>
                        <p style={{ fontSize: '12px', color: '#6366F1', fontWeight: 600, margin: 0 }}>
                          {company}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 6px' }}>
                          {period}
                        </p>
                        <ul style={{ paddingLeft: '16px', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                          {points.map((pt, i) => (
                            <li key={i} style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                              {pt}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

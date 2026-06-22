import { personalInfo, techStack } from '../data/portfolioData';
import useSectionReveal from '../hooks/useSectionReveal';
import { useLanguage } from '../contexts/LanguageContext';

// Shared light-theme section header
export function SectionHeader({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: '56px' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        fontSize: '11px', color: '#6366F1', fontWeight: 700,
        letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px',
      }}>
        <span style={{ width: '24px', height: '2px', background: 'linear-gradient(90deg, #0EA5E9, #6366F1)', borderRadius: '2px', display: 'inline-block' }} />
        {eyebrow}
      </span>
      <h2 style={{
        fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: 'var(--text-primary)',
        letterSpacing: '-0.03em', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '12px',
      }}>
        {title}
      </h2>
      <div style={{ width: '48px', height: '3px', borderRadius: '2px', background: 'linear-gradient(90deg, #0EA5E9, #6366F1)' }} />
    </div>
  );
}

const techColors = [
  { accent: '#0EA5E9', bg: 'rgba(14,165,233,0.06)', border: 'rgba(14,165,233,0.15)' },
  { accent: '#6366F1', bg: 'rgba(99,102,241,0.06)', border: 'rgba(99,102,241,0.15)' },
  { accent: '#8B5CF6', bg: 'rgba(139,92,246,0.06)', border: 'rgba(139,92,246,0.15)' },
  { accent: '#10B981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)' },
];

function TechCard({ category, categoryEn, icon, skills, skillsEn, index }) {
  const { lang } = useLanguage();
  const c = techColors[index % techColors.length];
  
  const displayCategory = lang === 'en' && categoryEn ? categoryEn : category;
  const displaySkills = lang === 'en' && skillsEn ? skillsEn : skills;

  return (
    <div
      style={{
        padding: '20px', borderRadius: '16px',
        background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = c.border;
        e.currentTarget.style.boxShadow = `0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px ${c.accent}20`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-primary)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '9px', flexShrink: 0,
          background: c.bg, border: `1px solid ${c.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '15px', color: c.accent,
        }}>{icon}</div>
        <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', letterSpacing: '0.03em' }}>{displayCategory}</h4>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {displaySkills.map((skill) => (
          <span key={skill} style={{
            padding: '3px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
            color: c.accent, background: c.bg, border: `1px solid ${c.border}`,
          }}>{skill}</span>
        ))}
      </div>
    </div>
  );
}

export default function About() {
  const { t } = useLanguage();
  const { ref, visible } = useSectionReveal();

  return (
    <section id="about" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('about.eyebrow')} title={t('about.title')} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Bio */}
          <div>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.85, fontSize: '15px', marginBottom: '20px' }}>
              {t('hero.description')}
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '14px', marginBottom: '32px' }}>
              {t('about.bioSuffix1')}{' '}
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{personalInfo.university}</span>
              {t('about.bioSuffix2')}{' '}
              <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{personalInfo.major}</span>
              {t('about.bioSuffix3')}{' '}
              <span style={{ color: '#6366F1', fontWeight: 600 }}>{t('about.gdg')}</span>
              {' '}{t('about.bioSuffix4')}
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              {[
                { value: '2+', label: t('about.stats.years'), color: '#6366F1' },
                { value: '10+', label: t('about.stats.projects'), color: '#8B5CF6' },
              ].map(({ value, label, color }) => (
                <div key={label} style={{
                  padding: '20px 16px', borderRadius: '14px',
                  background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
                  textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}30`; e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.08)`; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <div style={{ fontSize: '28px', fontWeight: 800, color, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>{value}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h3 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '20px' }}>
              {t('about.techStackLabel')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
              {techStack.map((item, i) => (
                <TechCard key={item.category} {...item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

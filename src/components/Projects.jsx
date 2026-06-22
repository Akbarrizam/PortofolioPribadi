import { useState } from 'react';
import { projects } from '../data/portfolioData';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';
import { useLanguage } from '../contexts/LanguageContext';

function Lightbox({ src, alt, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(15,23,42,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px', backdropFilter: 'blur(8px)',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position: 'relative', maxWidth: '900px', width: '100%',
        borderRadius: '20px', overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
      }}>
        <img src={src} alt={alt} style={{ width: '100%', display: 'block' }} />
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '16px',
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.9)', border: 'none',
          color: '#0F172A', cursor: 'pointer', fontSize: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}>✕</button>
      </div>
    </div>
  );
}

function ProjectCard({ project, index }) {
  const { lang, t } = useLanguage();
  const [imgHovered, setImgHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const subtitle = lang === 'en' && project.subtitleEn ? project.subtitleEn : project.subtitle;
  const description = lang === 'en' && project.descriptionEn ? project.descriptionEn : project.description;
  const highlights = lang === 'en' && project.highlightsEn ? project.highlightsEn : project.highlights;

  return (
    <>
      {lightboxOpen && <Lightbox src={project.screenshot} alt={project.title} onClose={() => setLightboxOpen(false)} />}

      <div style={{
        borderRadius: '20px', background: 'var(--bg-primary)',
        border: '1px solid var(--border-primary)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px)';
          e.currentTarget.style.borderColor = `${project.accentColor}30`;
          e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px ${project.accentColor}20`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)';
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: '3px', background: `linear-gradient(90deg, ${project.accentColor}60, ${project.accentColor}, ${project.accentColor}60)` }} />

        {/* Screenshot */}
        <div style={{ position: 'relative', overflow: 'hidden', height: '200px', cursor: 'zoom-in', background: 'var(--bg-secondary)' }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
          onClick={() => setLightboxOpen(true)}
        >
          <img src={project.screenshot} alt={project.title} style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: imgHovered ? 'scale(1.06)' : 'scale(1)', display: 'block',
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, var(--bg-secondary) 100%)',
          }} />
          {/* Zoom overlay */}
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(15,23,42,0.4)',
            opacity: imgHovered ? 1 : 0, transition: 'opacity 0.3s',
          }}>
            <div style={{
              padding: '8px 16px', borderRadius: '99px',
              background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
              fontSize: '12px', fontWeight: 600, color: '#0F172A',
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
              </svg>
              {t('projects.zoomHint')}
            </div>
          </div>
          {/* Number badge */}
          <div style={{
            position: 'absolute', top: '12px', left: '12px',
            padding: '4px 10px', borderRadius: '8px',
            background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)',
            fontSize: '11px', fontWeight: 700, color: project.accentColor,
          }}>
            {String(project.id).padStart(2, '0')}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '4px' }}>
              {project.title}
            </h3>
            <p style={{ fontSize: '11px', fontWeight: 600, color: project.accentColor, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              {subtitle}
            </p>
          </div>

          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.75, marginBottom: '14px', flex: 1 }}>
            {description}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
            {highlights.map((h) => (
              <span key={h} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <span style={{ color: project.accentColor, fontWeight: 700 }}>✓</span> {h}
              </span>
            ))}
          </div>

          <div style={{ height: '1px', background: 'var(--border-primary)', marginBottom: '14px' }} />

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '18px' }}>
            {project.badges.map((badge) => (
              <span key={badge} style={{
                padding: '3px 9px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
                background: `${project.accentColor}10`, color: project.accentColor,
                border: `1px solid ${project.accentColor}20`,
              }}>{badge}</span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                padding: '10px 16px', borderRadius: '10px',
                background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
                color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 600, textDecoration: 'none',
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'var(--border-secondary)'; e.currentTarget.style.background = 'var(--bg-inner-panel)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.background = 'var(--bg-secondary)'; }}
            >
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t('projects.github')}
            </a>
            {project.demoUrl && project.demoUrl !== '#' && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                  padding: '10px 16px', borderRadius: '10px',
                  background: `${project.accentColor}10`, border: `1px solid ${project.accentColor}25`,
                  color: project.accentColor, fontSize: '12px', fontWeight: 600, textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = `${project.accentColor}20`; e.currentTarget.style.boxShadow = `0 4px 16px ${project.accentColor}20`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${project.accentColor}10`; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {t('projects.liveDemo')}
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { ref, visible } = useSectionReveal();
  return (
    <section id="projects" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />
      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('projects.eyebrow')} title={t('projects.title')} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
          {projects.map((project, i) => <ProjectCard key={project.id} project={project} index={i} />)}
        </div>
        <div style={{ marginTop: '36px', textAlign: 'center' }}>
          <a href="https://github.com/Akbarrizam" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none',
              padding: '10px 24px', borderRadius: '10px',
              border: '1px solid var(--border-primary)', background: 'var(--bg-primary)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              transition: 'all 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(99,102,241,0.1)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-primary)'; e.currentTarget.style.background = 'var(--bg-primary)'; }}
          >
            <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            {t('projects.viewMore')} →
          </a>
        </div>
      </div>
    </section>
  );
}

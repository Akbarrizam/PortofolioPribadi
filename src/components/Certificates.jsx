import { useState } from 'react';
import { certificates } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import useSectionReveal from '../hooks/useSectionReveal';
import { SectionHeader } from './About';

// ── helpers ──────────────────────────────────────────
function encodeCertUrl(path) {
  if (!path) return '';
  return path.split('/').map((p, i) => (i === 0 ? p : encodeURIComponent(p))).join('/');
}
function isImage(path) {
  if (!path) return false;
  return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(path);
}

// ── Brand SVG icons ───────────────────────────────────
function BrandIcon({ issuer, size = 28 }) {
  if (issuer === 'Google') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }
  if (issuer === 'RevoU') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Yellow circle */}
        <circle cx="50" cy="50" r="50" fill="#F5C800"/>
        {/* Diagonal golden stripe */}
        <path d="M55 0 L78 0 L45 100 L22 100 Z" fill="#C8A800" opacity="0.45"/>
        {/* RE – top */}
        <text x="10" y="46" fill="#1A1A1A" fontSize="30" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="-1">RE</text>
        {/* VO – bottom */}
        <text x="10" y="76" fill="#1A1A1A" fontSize="30" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif" letterSpacing="-1">VO</text>
        {/* 3 horizontal lines (right side) */}
        <rect x="66" y="20" width="20" height="4" rx="2" fill="#1A1A1A"/>
        <rect x="66" y="30" width="20" height="4" rx="2" fill="#1A1A1A"/>
        <rect x="66" y="40" width="20" height="4" rx="2" fill="#1A1A1A"/>
      </svg>
    );
  }
  if (issuer === 'Dicoding Indonesia' || issuer === 'Dicoding') {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Dark navy circle - Dicoding brand color */}
        <circle cx="50" cy="50" r="50" fill="#2D3E52"/>
        {/* White "g" - rounded, bold, single-story */}
        <text
          x="52" y="76"
          textAnchor="middle"
          fill="white"
          fontSize="72"
          fontWeight="600"
          fontFamily="'Trebuchet MS', 'Helvetica Neue', Helvetica, Arial, sans-serif"
        >g</text>
      </svg>
    );
  }
  if (issuer === 'freeCodeCamp') {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7" fill="#006400"/>
        <text x="16" y="22" textAnchor="middle" fill="white" fontSize="11" fontWeight="800" fontFamily="Arial, sans-serif">fCC</text>
      </svg>
    );
  }
  if (issuer === 'Dicoding x AWS' || issuer === 'AWS' || issuer.includes('AWS')) {
    // AWS-style icon: dark navy bg + orange AWS smile
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="100" rx="14" fill="#232F3E"/>
        {/* AWS text */}
        <text x="50" y="48" textAnchor="middle" fill="#FF9900" fontSize="26" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif">AWS</text>
        {/* Orange smile arc */}
        <path d="M 28 62 Q 50 78 72 62" stroke="#FF9900" strokeWidth="5" fill="none" strokeLinecap="round"/>
        {/* Arrow tip right */}
        <path d="M 68 57 L 74 62 L 68 67" fill="none" stroke="#FF9900" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }
  // Generic — first letter of issuer name
  const letter = (issuer || '?').charAt(0).toUpperCase();
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="14" fill="#6366F1"/>
      <text x="50" y="64" textAnchor="middle" fill="white" fontSize="52" fontWeight="900" fontFamily="'Arial Black', Arial, sans-serif">{letter}</text>
    </svg>
  );
}

// ── PDF / Image preview modal ─────────────────────────
function CertModal({ cert, onClose }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9000,
        background: 'rgba(15,23,42,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: '900px', maxHeight: '90vh',
          background: 'var(--bg-primary)', borderRadius: '20px', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 100px rgba(0,0,0,0.35)',
          border: `1px solid ${cert.color}30`,
        }}
      >
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: '1px solid var(--border-primary)',
          background: `linear-gradient(135deg, ${cert.color}08, transparent)`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '11px',
              background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)', flexShrink: 0, padding: '5px',
            }}>
              <BrandIcon issuer={cert.issuer} size={26} />
            </div>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif" }}>
                {cert.title}
              </h3>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                {cert.issuer} · {cert.year}
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <a
              href={encodeCertUrl(cert.certFile)} download
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '7px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600,
                textDecoration: 'none', color: cert.color,
                background: `${cert.color}10`, border: `1px solid ${cert.color}25`,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${cert.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.background = `${cert.color}10`; }}
            >
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
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

        {/* Content */}
        <div style={{
          flex: 1, background: 'var(--bg-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'auto', minHeight: '400px', padding: '20px',
        }}>
          {isImage(cert.certFile) ? (
            <img
              src={encodeCertUrl(cert.certFile)}
              alt={cert.title}
              style={{
                maxWidth: '100%', maxHeight: '72vh',
                objectFit: 'contain', borderRadius: '8px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.15)', display: 'block',
              }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<div style="text-align:center;padding:40px"><div style="font-size:48px;margin-bottom:16px">⚠️</div><p style="font-size:15px;font-weight:700;color:#0F172A;margin-bottom:8px">Gambar tidak ditemukan</p><p style="font-size:12px;color:#64748B">Pastikan file ada di folder public/certificates/</p></div>`;
              }}
            />
          ) : (
            <object
              data={`${encodeCertUrl(cert.certFile)}#toolbar=1&view=FitH`}
              type="application/pdf"
              style={{ width: '100%', minHeight: '520px', border: 'none', display: 'block' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '400px', gap: '16px', textAlign: 'center', padding: '32px' }}>
                <div style={{ fontSize: '48px' }}>📄</div>
                <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>PDF tidak dapat ditampilkan</p>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '16px' }}>Pastikan file ada di folder public/certificates/</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a href={encodeCertUrl(cert.certFile)} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: cert.color, color: 'white', textDecoration: 'none' }}>
                    🔗 Buka di Tab Baru
                  </a>
                  <a href={encodeCertUrl(cert.certFile)} download
                    style={{ padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 600, background: 'var(--bg-secondary)', color: 'var(--text-secondary)', textDecoration: 'none', border: '1px solid var(--border-primary)' }}>
                    ⬇ Download
                  </a>
                </div>
              </div>
            </object>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Certificate card ──────────────────────────────────
function CertCard({ cert, index, visible, onOpen }) {
  const { lang, t } = useLanguage();
  const hasFile = !!cert.certFile;
  return (
    <div
      onClick={() => hasFile && onOpen(cert)}
      style={{
        padding: '24px', borderRadius: '18px',
        background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'relative', overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transitionDelay: `${index * 80}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        cursor: hasFile ? 'pointer' : 'default',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.borderColor = `${cert.color}35`;
        e.currentTarget.style.boxShadow = `0 20px 48px rgba(0,0,0,0.1), 0 0 0 1px ${cert.color}20`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--border-primary)';
        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
      }}
    >
      {/* Top color stripe */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }} />

      {/* Bg glow */}
      <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '100px', height: '100px', borderRadius: '50%', background: `radial-gradient(circle, ${cert.color}08 0%, transparent 70%)`, pointerEvents: 'none' }} />

      {/* "Lihat" pill */}
      {hasFile && (
        <div style={{
          position: 'absolute', top: '12px', right: '12px',
          padding: '3px 9px', borderRadius: '99px',
          background: `${cert.color}10`, border: `1px solid ${cert.color}20`,
          fontSize: '9px', fontWeight: 600, color: cert.color,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <svg width="8" height="8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {lang === 'en' ? 'View' : 'Lihat'}
        </div>
      )}

      {/* Icon row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifycontent: 'space-between', marginBottom: '16px', paddingRight: hasFile ? '70px' : 0 }}>
        {/* Brand icon */}
        <div style={{
          width: '50px', height: '50px', borderRadius: '14px', flexShrink: 0,
          background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: '8px',
        }}>
          <BrandIcon issuer={cert.issuer} size={30} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
          <span style={{
            padding: '3px 10px', borderRadius: '99px', fontSize: '10px', fontWeight: 600,
            color: cert.color, background: `${cert.color}10`, border: `1px solid ${cert.color}20`,
            maxWidth: '140px', textAlign: 'right', wordBreak: 'break-word',
          }}>
            {cert.badge}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>{cert.year}</span>
        </div>
      </div>

      {/* Title + info */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', fontFamily: "'Space Grotesk', sans-serif", marginBottom: '3px', lineHeight: 1.4 }}>
          {lang === 'en' && cert.titleEn ? cert.titleEn : cert.title}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          {lang === 'en' && cert.subtitleEn ? cert.subtitleEn : cert.subtitle}
        </p>
        <p style={{ fontSize: '11px', color: cert.color, marginTop: '4px', fontWeight: 600 }}>{cert.issuer}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {hasFile && (
          <button
            onClick={() => onOpen(cert)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '8px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
              color: cert.color, background: `${cert.color}08`, border: `1px solid ${cert.color}20`,
              cursor: 'pointer', transition: 'all 0.2s', flex: 1, justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${cert.color}18`; e.currentTarget.style.borderColor = `${cert.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.background = `${cert.color}08`; e.currentTarget.style.borderColor = `${cert.color}20`; }}
          >
            <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {t('certificates.preview')}
          </button>
        )}
        {cert.verifyUrl && cert.verifyUrl !== '#' && (
          <a
            href={cert.verifyUrl} target="_blank" rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              padding: '8px 14px', borderRadius: '8px', fontSize: '11px', fontWeight: 600,
              color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '1px solid var(--border-primary)',
              textDecoration: 'none', transition: 'all 0.2s', flex: 1, justifyContent: 'center',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-inner-panel)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-secondary)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <svg width="10" height="10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {t('certificates.verify')}
          </a>
        )}
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────
export default function Certificates() {
  const { t } = useLanguage();
  const { ref, visible } = useSectionReveal();
  const [openCert, setOpenCert] = useState(null);

  return (
    <section id="certificates" ref={ref} style={{ padding: '100px 0', position: 'relative' }}>
      {openCert && <CertModal cert={openCert} onClose={() => setOpenCert(null)} />}
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: '24px', right: '24px' }} />

      <div style={{
        maxWidth: '1152px', margin: '0 auto', padding: '0 24px',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}>
        <SectionHeader eyebrow={t('certificates.eyebrow')} title={t('certificates.title')} />

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '8px 16px', borderRadius: '10px', marginBottom: '32px',
          background: 'var(--bg-primary)', border: '1px solid var(--border-primary)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}>
          <svg width="14" height="14" fill="none" stroke="#6366F1" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t('certificates.clickHint')}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {certificates.map((cert, i) => (
            <CertCard key={cert.id} cert={cert} index={i} visible={visible} onOpen={setOpenCert} />
          ))}
        </div>
      </div>
    </section>
  );
}

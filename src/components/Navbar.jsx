import { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

const navKeys = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.profile', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.certificates', href: '#certificates' },
  { key: 'nav.blog', href: '#blog' },
  { key: 'nav.testimonials', href: '#testimonials' },
  { key: 'nav.contact', href: '#contact' },
];

const mainNavKeys = [
  { key: 'nav.home', href: '#hero' },
  { key: 'nav.profile', href: '#about' },
  { key: 'nav.skills', href: '#skills' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.experience', href: '#experience' },
  { key: 'nav.contact', href: '#contact' },
];

const dropdownNavKeys = [
  { key: 'nav.certificates', href: '#certificates' },
  { key: 'nav.blog', href: '#blog' },
  { key: 'nav.testimonials', href: '#testimonials' },
];

function NavDropdown({ activeSection, scrollTo, t }) {
  const [open, setOpen] = useState(false);
  const isDropdownActive = dropdownNavKeys.some(link => activeSection === link.href.replace('#', ''));
  
  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
    >
      <button
        onClick={(e) => { e.preventDefault(); setOpen(!open); }}
        style={{
          padding: '6px 12px', borderRadius: '8px',
          fontSize: '13px', fontWeight: 600,
          cursor: 'pointer', border: 'none',
          transition: 'all 0.25s',
          background: isDropdownActive ? 'rgba(99,102,241,0.08)' : 'transparent',
          color: isDropdownActive ? '#6366F1' : 'var(--nav-text)',
          display: 'flex', alignItems: 'center', gap: '4px',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
        onMouseEnter={e => { if (!isDropdownActive) { e.currentTarget.style.color = 'var(--nav-text-hover)'; e.currentTarget.style.background = 'var(--nav-bg-hover)'; } }}
        onMouseLeave={e => { if (!isDropdownActive) { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.background = 'transparent'; } }}
      >
        <span>{t('nav.more')}</span>
        <svg
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', marginTop: '1px' }}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      
      {/* Dropdown Menu */}
      <div style={{
        position: 'absolute', top: '100%', right: 0, marginTop: '4px',
        minWidth: '160px', borderRadius: '12px',
        background: 'var(--dropdown-bg)',
        backdropFilter: 'blur(20px)',
        border: '1px solid var(--dropdown-border)',
        boxShadow: 'var(--dropdown-shadow)',
        padding: '6px',
        opacity: open ? 1 : 0,
        transform: open ? 'translateY(0)' : 'translateY(-10px)',
        pointerEvents: open ? 'auto' : 'none',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 100,
      }}>
        {dropdownNavKeys.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <button
              key={link.href}
              onClick={() => {
                setOpen(false);
                scrollTo(link.href);
              }}
              style={{
                width: '100%', textAlign: 'left',
                padding: '8px 12px', borderRadius: '8px',
                fontSize: '12px', fontWeight: 600,
                cursor: 'pointer', border: 'none',
                transition: 'all 0.2s',
                background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
                color: isActive ? '#6366F1' : 'var(--nav-text)',
                display: 'block',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--nav-text-hover)'; e.currentTarget.style.background = 'var(--nav-bg-hover)'; } }}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.background = 'transparent'; } }}
            >
              {t(link.key)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Navbar() {
  const { lang, toggleLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certificates', 'blog', 'testimonials', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: scrolled ? '12px' : '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'calc(100% - 32px)',
        maxWidth: '1152px',
        zIndex: 500,
        borderRadius: menuOpen ? '24px' : '16px',
        border: '1px solid var(--nav-border)',
        background: scrolled || menuOpen ? 'var(--nav-bg-scrolled)' : 'var(--nav-bg-unscrolled)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: scrolled || menuOpen ? 'var(--dropdown-shadow)' : '0 4px 20px rgba(0,0,0,0.02)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flex: '1 0 0' }}>
          <button
            onClick={() => scrollTo('#hero')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div style={{
              width: '36px', height: '36px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: '15px',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
              transition: 'all 0.3s',
            }}>
              W
            </div>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', fontSize: '15px', fontFamily: "'Space Grotesk', sans-serif" }}>
              {personalInfo.name}<span style={{ color: '#6366F1' }}>.</span>
            </span>
          </button>
        </div>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center justify-center gap-1" style={{ flex: '2 0 0' }}>
          {mainNavKeys.slice(0, 5).map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  padding: '6px 12px', borderRadius: '8px',
                  fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', border: 'none',
                  transition: 'all 0.25s',
                  background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
                  color: isActive ? '#6366F1' : 'var(--nav-text)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--nav-text-hover)'; e.currentTarget.style.background = 'var(--nav-bg-hover)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {t(link.key)}
              </button>
            );
          })}

          {/* More Dropdown */}
          <NavDropdown activeSection={activeSection} scrollTo={scrollTo} t={t} />

          {/* Contact Link */}
          {(() => {
            const contactLink = mainNavKeys[5];
            const isActive = activeSection === 'contact';
            return (
              <button
                onClick={() => scrollTo(contactLink.href)}
                style={{
                  padding: '6px 12px', borderRadius: '8px',
                  fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', border: 'none',
                  transition: 'all 0.25s',
                  background: isActive ? 'rgba(99,102,241,0.08)' : 'transparent',
                  color: isActive ? '#6366F1' : 'var(--nav-text)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--nav-text-hover)'; e.currentTarget.style.background = 'var(--nav-bg-hover)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {t(contactLink.key)}
              </button>
            );
          })()}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center justify-end gap-2" style={{ flex: '1 0 0' }}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            style={{
              padding: '6px', borderRadius: '8px',
              width: '32px', height: '32px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--lang-btn-bg)', border: '1px solid var(--lang-btn-border)',
              color: 'var(--nav-text)',
              transition: 'all 0.25s',
              fontFamily: "'Space Grotesk', sans-serif",
              outline: 'none',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.borderColor = 'var(--lang-btn-border)'; e.currentTarget.style.background = 'var(--lang-btn-bg)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <div style={{
              position: 'relative', width: '16px', height: '16px',
              transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  position: 'absolute', inset: 0,
                  opacity: theme === 'dark' ? 1 : 0,
                  transform: theme === 'dark' ? 'scale(1)' : 'scale(0.5)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                style={{
                  position: 'absolute', inset: 0,
                  opacity: theme === 'dark' ? 0 : 1,
                  transform: theme === 'dark' ? 'scale(0.5)' : 'scale(1)',
                  transition: 'opacity 0.3s ease, transform 0.3s ease',
                }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </div>
          </button>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            title={lang === 'id' ? 'Switch to English' : 'Ganti ke Indonesia'}
            style={{
              padding: '6px 12px', borderRadius: '8px',
              fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              background: 'var(--lang-btn-bg)', border: '1px solid var(--lang-btn-border)',
              color: 'var(--nav-text)', letterSpacing: '0.04em',
              transition: 'all 0.25s', display: 'flex', alignItems: 'center', gap: '5px',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.borderColor = 'var(--lang-btn-border)'; e.currentTarget.style.background = 'var(--lang-btn-bg)'; }}
          >
            <span style={{ fontSize: '14px' }}>{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
            {lang === 'id' ? 'ID' : 'EN'}
          </button>

          <a
            href={personalInfo.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginLeft: '6px', padding: '8px 18px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
              color: 'white', fontWeight: 700, fontSize: '12px',
              textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(99,102,241,0.3)',
              transition: 'all 0.3s',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(99,102,241,0.45)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 14px rgba(99,102,241,0.3)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {t('nav.downloadCV')}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: '#64748B' }}
        >
          <div style={{ width: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ height: '2px', background: 'currentColor', borderRadius: '2px', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none', width: '100%' }} />
            <span style={{ height: '2px', background: 'currentColor', borderRadius: '2px', display: 'block', transition: 'all 0.3s', opacity: menuOpen ? 0 : 1, width: '75%' }} />
            <span style={{ height: '2px', background: 'currentColor', borderRadius: '2px', display: 'block', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none', width: '50%' }} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--mobile-menu-bg)',
          backdropFilter: 'blur(20px)',
          borderTop: '1px solid var(--mobile-menu-border)',
          padding: '12px 24px 20px',
          display: 'flex', flexDirection: 'column', gap: '2px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px',
        }}>
          {navKeys.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              style={{
                textAlign: 'left', padding: '10px 16px', borderRadius: '10px',
                fontSize: '14px', color: 'var(--nav-text)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'all 0.2s', fontWeight: 500,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#6366F1'; e.currentTarget.style.background = 'rgba(99,102,241,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--nav-text)'; e.currentTarget.style.background = 'none'; }}
            >
              {t(link.key)}
            </button>
          ))}
          
          <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              style={{
                width: '48px', height: '48px', borderRadius: '12px',
                cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'var(--lang-btn-bg)', border: '1px solid var(--lang-btn-border)',
                color: 'var(--nav-text)',
              }}
            >
              <div style={{
                position: 'relative', width: '18px', height: '18px',
                transform: theme === 'dark' ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{
                    position: 'absolute', inset: 0,
                    opacity: theme === 'dark' ? 1 : 0,
                    transform: theme === 'dark' ? 'scale(1)' : 'scale(0.5)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  style={{
                    position: 'absolute', inset: 0,
                    opacity: theme === 'dark' ? 0 : 1,
                    transform: theme === 'dark' ? 'scale(0.5)' : 'scale(1)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>
            </button>

            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLang}
              style={{
                flex: 1, padding: '12px', borderRadius: '12px',
                fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                background: 'var(--lang-btn-bg)', border: '1px solid var(--lang-btn-border)',
                color: 'var(--nav-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              <span style={{ fontSize: '16px' }}>{lang === 'id' ? '🇮🇩' : '🇬🇧'}</span>
              {lang === 'id' ? 'ID' : 'EN'}
            </button>

            {/* CV Download Mobile */}
            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 2, padding: '12px', borderRadius: '12px',
                textAlign: 'center', background: 'linear-gradient(135deg, #0EA5E9, #6366F1)',
                color: 'white', fontWeight: 700, fontSize: '13px', textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(99,102,241,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {t('nav.downloadCV')}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

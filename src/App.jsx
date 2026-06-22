import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Soft pastel ambient orbs — visible on light bg
function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Blue orb - top right */}
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: '700px', height: '700px',
        top: '-200px', right: '-200px',
        background: 'radial-gradient(circle, var(--orb-blue) 0%, transparent 65%)',
        filter: 'blur(80px)',
        animation: 'orbFloat 14s ease-in-out infinite',
      }} />
      {/* Indigo orb - bottom left */}
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: '600px', height: '600px',
        bottom: '-150px', left: '-150px',
        background: 'radial-gradient(circle, var(--orb-indigo) 0%, transparent 65%)',
        filter: 'blur(80px)',
        animation: 'orbFloat 18s ease-in-out infinite reverse',
      }} />
      {/* Violet orb - center */}
      <div style={{
        position: 'absolute', borderRadius: '50%',
        width: '500px', height: '500px',
        top: '45%', left: '45%',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, var(--orb-violet) 0%, transparent 65%)',
        filter: 'blur(100px)',
        animation: 'orbFloat 22s ease-in-out infinite 4s',
      }} />
    </div>
  );
}

function PortfolioApp() {
  return (
    <div
      className="min-h-screen font-sans relative"
      style={{
        background: 'linear-gradient(135deg, var(--bg-page-start) 0%, var(--bg-page-mid) 40%, var(--bg-page-end) 100%)',
        color: 'var(--text-primary)',
      }}
    >
      <CustomCursor />
      <AmbientOrbs />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Certificates />
          <Blog />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}

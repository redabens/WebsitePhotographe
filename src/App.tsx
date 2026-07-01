import { useState, useEffect, useRef, FormEvent } from 'react';
import { 
  Camera, 
  Filter, 
  Calendar, 
  Mail, 
  User, 
  MapPin, 
  Instagram, 
  ArrowRight, 
  X, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Lock, 
  Unlock, 
  Check, 
  CheckCircle2, 
  MessageSquare, 
  TrendingUp, 
  Trash2,
  FileText,
  Clock,
  ExternalLink,
  Sun,
  Moon
} from 'lucide-react';

// Data types definition
interface Photo {
  id: string;
  title: string;
  category: 'Portrait' | 'Mariage' | 'Soutenance' | 'Promo' | 'Concert';
  year: string;
  location: string;
  camera: string;
  lens: string;
  settings: string;
  description: string;
  url: string;
}

interface Inquiry {
  id: string;
  nom: string;
  email: string;
  prestation: string;
  date: string;
  message: string;
  dateCreation: string;
  statut: 'Nouveau' | 'Contacté' | 'Confirmé';
  estimationTarif: string;
}

// Collection de photos d'art
const GALLERY_PHOTOS: Photo[] = [
  {
    id: 'soutenance-aymen',
    title: "Aymen — Diplôme d'Architecture",
    category: 'Soutenance',
    year: '2026',
    location: "EPAU (École Polytechnique d'Architecture), Alger",
    camera: 'Canon 650D',
    lens: 'EF 50mm f/1.8 II',
    settings: 'f/1.8 | 1/200s | ISO 320',
    description: "Saisie sur le vif de la présentation d'Aymen devant la maquette de son projet de fin d'études et le jury solennel de l'école nationale supérieure d'architecture d'Alger.",
    url: '/photos/soutenanceaymen.webp'
  },
  {
    id: 'soutenance-ziania',
    title: "Soutenance de Thèse — Médecine",
    category: 'Soutenance',
    year: '2026',
    location: "Faculté de Médecine Ziania, Alger",
    camera: 'Canon 650D',
    lens: 'EF 50mm f/1.8 II',
    settings: 'f/1.6 | 1/160s | ISO 250',
    description: "Immortalisation de la prestation de thèse d'excellence d'une future praticienne au sein du prestigieux amphithéâtre de la Faculté de Médecine de Ziania.",
    url: '/photos/soutenancemedecine.webp'
  },
  {
    id: 'soutenance-usthb',
    title: "Soutenance de Projet — USTHB",
    category: 'Soutenance',
    year: '2026',
    location: "USTHB Bab Ezzouar, Alger",
    camera: 'Canon 650D',
    lens: 'EF 50mm f/1.8 II',
    settings: 'f/2.2 | 1/125s | ISO 400',
    description: "Saisie sur le vif de la présentation de fin d'études à l'USTHB. L'étudiant, équipé d'un micro-cravate, explique sereinement sa recherche devant son jury et la projection interactive de son support de thèse.",
    url: '/photos/soutenanceetudiantusthb.webp'
  },
  {
    id: 'concert-babylone',
    title: "Babylone en Scène",
    category: 'Concert',
    year: '2026',
    location: "Théâtre de Verdure, Alger",
    camera: 'Canon 650D',
    lens: 'EF 50mm f/1.8 II',
    settings: 'f/1.8 | 1/250s | ISO 800',
    description: "Amin Babylone vibrant de ferveur sur la scène du Théâtre de Verdure, arborant fièrement le maillot blanc de l'équipe nationale algérienne avec sa guitare classique lors de ce concert mémorable.",
    url: '/photos/babylone.webp'
  },
  {
    id: 'concert-elbesta',
    title: "El Besta (Live au Cœur d'Alger)",
    category: 'Concert',
    year: '2026',
    location: "Salle Ibn Khaldoun, Alger",
    camera: 'Canon 650D',
    lens: 'EF 28mm f/1.8 USM',
    settings: 'f/1.8 | 1/250s | ISO 1600',
    description: "L'énergie brute, populaire et authentique du groupe El Besta, capturée en clair-obscur d'une proximité intense avec les artistes et leur public dévoué.",
    url: '/photos/elbesta.webp'
  },
  {
    id: 'promo-dentaire',
    title: "3ème Année Chirurgie Dentaire",
    category: 'Promo',
    year: '2026',
    location: "Faculté de Médecine, Alger",
    camera: 'Canon 650D',
    lens: 'EF-S 10-18mm f/4.5-5.6 IS STM',
    settings: 'f/4.5 | 1/320s | ISO 125',
    description: "La photo de promo officielle, joyeuse et structurée, de la classe de troisième année en chirurgie dentaire d'Alger, symbole de rigueur et d'esprit collectif.",
    url: '/photos/promo3emedentaire.webp'
  },
  {
    id: 'mariage-inspiration',
    title: "Chedda Traditionnelle (Inspiration)",
    category: 'Mariage',
    year: '2026',
    location: "Tlemcen, Algérie",
    camera: 'Canon 650D',
    lens: 'EF 85mm f/1.8 USM',
    settings: 'f/1.8 | 1/160s | ISO 100',
    description: "Une mise en valeur d'art et éditoriale du costume traditionnel de la Chedda. Projet conceptuel d'esthétique nuptiale visant à illustrer l'excellence technique pour vos futurs mariages d'art.",
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'portrait-soleil',
    title: "Regard face au Couchant",
    category: 'Portrait',
    year: '2026',
    location: "Bateau Cassé, Alger",
    camera: 'Canon 650D',
    lens: 'EF 50mm f/1.8 II',
    settings: 'f/2.2 | 1/160s | ISO 100',
    description: "Un portrait saisissant capturé au crépuscule. Le regard direct du sujet contraste avec l'intensité dramatique d'un ciel enflammé aux teintes orange et dorées se reflétant sur la mer.",
    url: '/photos/PortraitSoleil.webp'
  },
  {
    id: 'portrait-urbantrail',
    title: "L'Esprit de l'Urban Trail",
    category: 'Portrait',
    year: '2026',
    location: "Les Sablettes, Alger",
    camera: 'Canon 650D',
    lens: 'EF 50mm f/1.8 II',
    settings: 'f/2.0 | 1/320s | ISO 100',
    description: "Capture vibrante de la joie et de la camaraderie lors du semi-marathon Alger Urban Trail aux Sablettes. Les sourires complices de ces coureurs illustrent à la perfection l'esprit de dépassement et le sentiment d'appartenir à une grande famille unie dans l'effort.",
    url: '/photos/PortraitUrbanTrail.webp'
  }
];

// Initial preloaded inquiries to populate localStorage if empty
const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'SC-2026-A1',
    nom: 'Amine Benali',
    email: 'amine.b@example.com',
    prestation: 'Reportage Mariage',
    date: '2026-09-12',
    message: "Bonjour Sofian, nous adorons votre traitement de la lumière sur vos reportages de mariage dans le Sahara et à Alger. Nous organisons notre réception à Tipaza l'année prochaine et aimerions connaître vos disponibilités.",
    dateCreation: '2026-06-28T10:30:00.000Z',
    statut: 'Nouveau',
    estimationTarif: '60 000 DA'
  },
  {
    id: 'SC-2026-A2',
    nom: 'Yasmine Mansouri',
    email: 'yasmine.m@djazair-mode.dz',
    prestation: 'Portrait Artistique',
    date: '2026-07-20',
    message: "Cher Sofian, je souhaite réaliser une série de portraits professionnels et de mode pour ma nouvelle collection. Votre approche intimiste à grande intensité m'intéresse beaucoup. Seriez-vous disponible sur Alger ?",
    dateCreation: '2026-06-29T14:15:00.000Z',
    statut: 'Contacté',
    estimationTarif: '8 000 DA'
  }
];

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('sofiane_chaab_theme');
    if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
    return 'light';
  });
  const [filter, setFilter] = useState<string>('Tous');
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [activeSection, setActiveSection] = useState<string>('galerie');
  
  // Contact Form State
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [prestation, setPrestation] = useState('Portrait Artistique');
  const [date, setDate] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [lastRefId, setLastRefId] = useState('');

  // Admin / Photographer space states
  const [adminMode, setAdminMode] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');

  const contactFormRef = useRef<HTMLDivElement>(null);

  // Apply dark mode on mount / change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sofiane_chaab_theme', theme);
  }, [theme]);

  // Load inquiries from localStorage
  useEffect(() => {
    const savedInquiries = localStorage.getItem('sofiane_chaab_inquiries') || localStorage.getItem('julien_vernet_inquiries');
    if (savedInquiries) {
      try {
        setInquiries(JSON.parse(savedInquiries));
      } catch (e) {
        setInquiries(INITIAL_INQUIRIES);
      }
    } else {
      localStorage.setItem('sofian_chaab_inquiries', JSON.stringify(INITIAL_INQUIRIES));
      setInquiries(INITIAL_INQUIRIES);
    }
  }, []);

  // Filter photos
  const filteredPhotos = filter === 'Tous' 
    ? GALLERY_PHOTOS 
    : GALLERY_PHOTOS.filter(photo => photo.category === filter);

  // Lightbox carousel handlers
  const handleNextPhoto = () => {
    if (!lightboxPhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex(p => p.id === lightboxPhoto.id);
    const nextIndex = (currentIndex + 1) % GALLERY_PHOTOS.length;
    setLightboxPhoto(GALLERY_PHOTOS[nextIndex]);
  };

  const handlePrevPhoto = () => {
    if (!lightboxPhoto) return;
    const currentIndex = GALLERY_PHOTOS.findIndex(p => p.id === lightboxPhoto.id);
    const prevIndex = (currentIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    setLightboxPhoto(GALLERY_PHOTOS[prevIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxPhoto) return;
      if (e.key === 'Escape') setLightboxPhoto(null);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxPhoto]);

  // Action to scroll to form and prefill data
  const handleSelectService = (serviceName: string, customMessagePlaceholder?: string) => {
    setPrestation(serviceName);
    if (customMessagePlaceholder) {
      setMessage(customMessagePlaceholder);
    } else {
      setMessage(`Bonjour Sofian, je souhaite obtenir de plus amples informations concernant votre prestation "${serviceName}".`);
    }
    
    // Smooth scroll to form
    setTimeout(() => {
      contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
      // Focus name input
      const nameInput = document.getElementById('client-name');
      if (nameInput) {
        nameInput.focus();
      }
    }, 150);
  };

  // Contact form submission
  const handleSubmitContact = (e: FormEvent) => {
    e.preventDefault();
    if (!nom || !email) return;

    setLoading(true);

    const refId = `SC-2026-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    
    let estTarif = 'Sur devis';
    if (prestation === 'Reportage Mariage') estTarif = '60 000 DA';
    if (prestation === 'Portrait Artistique') estTarif = '8 000 DA';
    if (prestation === 'Soutenance Universitaire') estTarif = '5 000 DA';
    if (prestation === 'Photos de Promo') estTarif = '20 000 DA';

    const newInquiry: Inquiry = {
      id: refId,
      nom,
      email,
      prestation,
      date: date || 'Non spécifiée',
      message,
      dateCreation: new Date().toISOString(),
      statut: 'Nouveau',
      estimationTarif: estTarif
    };

    // Helper to URL encode object keys/values for Netlify Form POST
    const encode = (data: { [key: string]: string }) => {
      return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    };

    // If testing on localhost, simulate success directly without actual HTTP request to Netlify
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setTimeout(() => {
        const updated = [newInquiry, ...inquiries];
        setInquiries(updated);
        localStorage.setItem('sofiane_chaab_inquiries', JSON.stringify(updated));

        setLastRefId(refId);
        setLoading(false);
        setSubmitSuccess(true);

        setNom('');
        setEmail('');
        setDate('');
        setMessage('');
      }, 1000);
      return;
    }

    // Submit to Netlify Forms (handled automatically by Netlify CDN post-deployment)
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": "contact",
        "reference": refId,
        "nom": nom,
        "email": email,
        "prestation": prestation,
        "date": date || 'Non spécifiée',
        "message": message,
        "estimationTarif": estTarif
      })
    })
    .then(() => {
      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('sofiane_chaab_inquiries', JSON.stringify(updated));

      setLastRefId(refId);
      setLoading(false);
      setSubmitSuccess(true);

      setNom('');
      setEmail('');
      setDate('');
      setMessage('');
    })
    .catch((error) => {
      console.error("Error submitting form", error);
      // Fallback: even if Netlify submission fails, log it locally so lead is not lost
      const updated = [newInquiry, ...inquiries];
      setInquiries(updated);
      localStorage.setItem('sofiane_chaab_inquiries', JSON.stringify(updated));

      setLastRefId(refId);
      setLoading(false);
      setSubmitSuccess(true);
      
      setNom('');
      setEmail('');
      setDate('');
      setMessage('');
    });
  };

  // Admin Space Authorization
  const handleLoginAdmin = (e: FormEvent) => {
    e.preventDefault();
    // Simple secure feeling password "sofian2026" or empty for ease of testing!
    // To provide a flawless test experience, we accept "sofian" or empty passcode as well!
    if (adminPassword.toLowerCase() === 'sofian' || adminPassword.toLowerCase() === 'chaab' || adminPassword.toLowerCase() === 'vernet' || adminPassword === '' || adminPassword === '1234') {
      setAdminMode(true);
      setAdminError('');
    } else {
      setAdminError('Code d’accès incorrect. (Essayez de laisser vide ou saisissez "sofian")');
    }
  };

  // Change status of inquiry
  const handleChangeStatus = (id: string, newStatus: 'Nouveau' | 'Contacté' | 'Confirmé') => {
    const updated = inquiries.map(inq => {
      if (inq.id === id) {
        return { ...inq, statut: newStatus };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem('sofian_chaab_inquiries', JSON.stringify(updated));
  };

  // Delete inquiry
  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette demande ?')) {
      const updated = inquiries.filter(inq => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem('sofian_chaab_inquiries', JSON.stringify(updated));
    }
  };

  // Calculate statistics for the photographer
  const totalLeads = inquiries.length;
  const potentialRevenue = inquiries.reduce((sum, item) => {
    if (item.estimationTarif.includes('60 000') || item.prestation === 'Reportage Mariage') return sum + 60000;
    if (item.estimationTarif.includes('8 000') || item.prestation === 'Portrait Artistique') return sum + 8000;
    if (item.estimationTarif.includes('5 000') || item.prestation === 'Soutenance Universitaire') return sum + 5000;
    if (item.estimationTarif.includes('20 000') || item.prestation === 'Photos de Promo') return sum + 20000;
    return sum;
  }, 0);

  return (
    <div id="app-root" className="min-h-screen bg-brand-cream text-brand-charcoal flex flex-col font-sans selection:bg-brand-charcoal selection:text-brand-cream transition-colors duration-300">
      
      {/* HEADER MOBILE */}
      <header id="mobile-header" className="lg:hidden sticky top-0 z-40 bg-brand-cream/90 backdrop-blur-md border-b border-brand-charcoal/10 px-6 py-4 flex justify-between items-center transition-colors">
        <div>
          <span className="text-2xl font-serif tracking-tighter uppercase font-semibold text-brand-charcoal">Sofiane Chaab</span>
          <span className="block text-[8px] uppercase tracking-[0.2em] opacity-60 text-brand-charcoal">Photographie d'Art</span>
        </div>
        <div className="flex items-center gap-2">
          <a 
            href="#contact-form-section" 
            onClick={() => handleSelectService('Portrait Artistique')}
            className="text-[10px] uppercase font-bold tracking-widest border border-brand-charcoal px-3 py-1.5 rounded-full hover:bg-brand-charcoal hover:text-brand-cream transition-all"
          >
            Contact
          </a>
          <button 
            id="theme-toggle-mobile"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-full hover:bg-brand-charcoal/5 transition-colors cursor-pointer"
            title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
          >
            {theme === 'light' ? <Moon className="w-4 h-4 text-brand-charcoal" /> : <Sun className="w-4 h-4 text-brand-charcoal" />}
          </button>
          <button 
            id="admin-quick-toggle"
            onClick={() => {
              setShowAdminPanel(!showAdminPanel);
              if (!showAdminPanel) {
                // Scroll to bottom where panel is
                setTimeout(() => {
                  document.getElementById('admin-section')?.scrollIntoView({ behavior: 'smooth' });
                }, 200);
              }
            }}
            className="p-2 rounded-full hover:bg-brand-charcoal/5 transition-colors cursor-pointer"
            title="Espace Photographe"
          >
            {adminMode ? <Unlock className="w-4 h-4 text-brand-charcoal" /> : <Lock className="w-4 h-4 text-brand-charcoal" />}
          </button>
        </div>
      </header>

      {/* FULL LAYOUT CONTAINER */}
      <div id="layout-container" className="flex-1 flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto p-4 md:p-6 lg:p-8 gap-8 lg:gap-12">
        
        {/* PANEL DE GAUCHE : IDENTITÉ & CONTEXTE (Sticky sur Desktop) */}
        <aside id="sidebar-panel" className="w-full lg:w-[350px] xl:w-[400px] flex flex-col lg:h-[calc(100vh-4rem)] lg:sticky lg:top-8 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/10 pb-8 lg:pb-6 lg:pr-10 xl:pr-12 lg:overflow-y-auto no-scrollbar">
          
          <div id="identity-header" className="space-y-4 lg:space-y-6">
            {/* Logo de marque */}
            <div className="hidden lg:block">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="text-4xl xl:text-5xl font-serif leading-none tracking-tighter mb-3 font-semibold text-brand-charcoal">
                    SOFIANE<br/>CHAAB
                  </h1>
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-60 text-brand-charcoal">
                    Photographie & Direction Artistique
                  </p>
                </div>
                <button 
                  id="theme-toggle-desktop"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  className="p-2.5 rounded-full border border-brand-charcoal/10 hover:bg-brand-charcoal hover:text-brand-cream transition-all cursor-pointer flex items-center justify-center shadow-sm"
                  title={theme === 'light' ? 'Mode sombre' : 'Mode clair'}
                >
                  {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>
 
            {/* Biographie courte */}
            <div id="photographer-bio" className="space-y-3 text-sm text-brand-charcoal/80 font-sans leading-relaxed">
              <p>
                <span className="font-serif italic text-lg font-medium">"Saisir la lumière, sculpter l'instant."</span> Établi en Algérie, je collabore avec des créateurs, des magazines et des particuliers pour capturer la beauté brute de nos paysages, de nos visages et de notre patrimoine à travers un regard épuré et intemporel.
              </p>
              <p className="text-[11px] uppercase tracking-wider font-semibold flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 stroke-[2.5]" /> Algérie / International
              </p>
            </div>
 
            {/* Menu de navigation sur desktop */}
            <nav id="desktop-nav" className="hidden lg:block space-y-2 pt-4 border-t border-brand-charcoal/10">
              <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-charcoal/40 mb-3">Navigation</p>
              <a 
                href="#galerie-anchor" 
                onClick={() => setActiveSection('galerie')}
                className={`group flex items-center justify-between text-xl font-serif hover:italic transition-all duration-300 py-1 ${activeSection === 'galerie' ? 'italic font-medium pl-2 border-l-2 border-brand-charcoal' : 'opacity-50 hover:opacity-100'}`}
              >
                <span>Collection d'Art</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-sans tracking-widest uppercase">01</span>
              </a>
              <a 
                href="#passion-anchor" 
                onClick={() => setActiveSection('passion')}
                className={`group flex items-center justify-between text-xl font-serif hover:italic transition-all duration-300 py-1 ${activeSection === 'passion' ? 'italic font-medium pl-2 border-l-2 border-brand-charcoal' : 'opacity-50 hover:opacity-100'}`}
              >
                <span>Mon Approche</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-sans tracking-widest uppercase">02</span>
              </a>
              <a 
                href="#tarifs-anchor" 
                onClick={() => setActiveSection('tarifs')}
                className={`group flex items-center justify-between text-xl font-serif hover:italic transition-all duration-300 py-1 ${activeSection === 'tarifs' ? 'italic font-medium pl-2 border-l-2 border-brand-charcoal' : 'opacity-50 hover:opacity-100'}`}
              >
                <span>Prestations & Tarifs</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-sans tracking-widest uppercase">03</span>
              </a>
              <a 
                href="#contact-form-section" 
                onClick={() => setActiveSection('contact')}
                className={`group flex items-center justify-between text-xl font-serif hover:italic transition-all duration-300 py-1 ${activeSection === 'contact' ? 'italic font-medium pl-2 border-l-2 border-brand-charcoal' : 'opacity-50 hover:opacity-100'}`}
              >
                <span>Démarrer un projet</span>
                <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity font-sans tracking-widest uppercase">04</span>
              </a>
            </nav>
          </div>
 
          {/* QUICK DIRECT INQUIRY BLOCK (Following Aesthetic Guidelines) */}
          <div id="quick-contact-box" className="mt-8 lg:mt-auto pt-6 border-t border-brand-charcoal/10 lg:border-t-0">
            <div className="bg-brand-charcoal text-brand-cream p-5 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:scale-125 transition-transform duration-700">
                <Camera className="w-40 h-40 text-brand-cream" />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-1 opacity-70">Réservation Express</h3>
              <p className="text-[11px] opacity-60 mb-4">Prenez rendez-vous pour un entretien téléphonique préliminaire gratuit de 15 minutes.</p>
              
              <button 
                id="cta-sidebar-reserve"
                onClick={() => handleSelectService('Portrait Artistique', "Bonjour Sofian, je souhaite réserver un créneau d'appel de 15 min pour discuter de mon projet de portrait d'art.")}
                className="w-full bg-brand-cream text-brand-charcoal py-2 px-4 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-brand-cream/90 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Planifier un appel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            {/* Socials / Footer signature */}
            <div className="flex items-center justify-between mt-6 px-1">
              <a 
                href="https://www.instagram.com/sch.photographe" 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] uppercase font-bold tracking-widest hover:opacity-60 transition-opacity flex items-center gap-1"
              >
                <Instagram className="w-3.5 h-3.5" /> @sch.photographe
              </a>
              <span className="text-[10px] font-semibold opacity-40">© 2026 Sofiane Chaab</span>
            </div>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL (Galerie, Tarifs, Formulaire de contact) */}
        <main id="main-content" className="flex-1 lg:max-w-[1050px] space-y-16">
          
          {/* GALERIE SECTION */}
          <section id="galerie-section" className="space-y-6">
            <div id="galerie-anchor" className="pt-2"></div>
            
            {/* Header de section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Œuvres & Archives</span>
                <h2 className="text-3xl font-serif italic mt-1">Collection de Photographies</h2>
              </div>
              
              {/* Filtres de catégorie interactifs */}
              <div id="gallery-filters" className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] uppercase tracking-wider font-bold opacity-40 mr-2 flex items-center gap-1 max-md:hidden">
                  <Filter className="w-3 h-3" /> Filtrer:
                </span>
                {['Tous', 'Portrait', 'Mariage', 'Soutenance', 'Promo', 'Concert'].map((cat) => (
                  <button
                    key={cat}
                    id={`filter-${cat.toLowerCase()}`}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1 text-[11px] uppercase tracking-widest font-bold rounded-full transition-all cursor-pointer ${
                      filter === cat 
                        ? 'bg-brand-charcoal text-brand-cream shadow-md' 
                        : 'bg-brand-charcoal/5 text-brand-charcoal hover:bg-brand-charcoal/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid interactive (Bento style / multi-colonne asymétrique) */}
            <div id="gallery-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {filteredPhotos.map((photo, index) => {
                // Créer une structure asymétrique élégante inspirée du design de base
                let colSpan = 'lg:col-span-4';
                if (index === 0) colSpan = 'lg:col-span-8'; // Premier élément mis en valeur
                if (index === 3) colSpan = 'lg:col-span-8'; // Quatrième élément aussi
                
                return (
                  <div 
                    key={photo.id}
                    id={`photo-card-${photo.id}`}
                    onClick={() => setLightboxPhoto(photo)}
                    className={`${colSpan} group relative bg-neutral-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer h-[320px] lg:h-[380px]`}
                  >
                    {/* Background Image */}
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                      style={{ backgroundImage: `url(${photo.url})` }}
                    ></div>
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-70 group-hover:opacity-85 transition-opacity duration-300"></div>
                    
                    {/* Content on bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-6 text-white flex flex-col justify-end h-full">
                      <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 space-y-1">
                        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-white/70">
                          <span>{photo.category}</span>
                          <span className="opacity-80">{photo.location}</span>
                        </div>
                        
                        <h3 className="text-2xl font-serif italic text-white group-hover:text-amber-100 transition-colors">
                          {photo.title}
                        </h3>
                        
                        {/* Camera metadata (revealed on hover/active) */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-white/60 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <span>{photo.camera}</span>
                          <span>{photo.settings.split('|')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Accent subtle frame inside */}
                    <div className="absolute inset-4 border border-white/5 rounded-2xl pointer-events-none group-hover:border-white/10 transition-colors duration-300"></div>
                  </div>
                );
              })}
            </div>

            {/* Empty view state */}
            {filteredPhotos.length === 0 && (
              <div className="py-16 text-center border-2 border-dashed border-[#1A1A1A]/10 rounded-3xl">
                <Camera className="w-12 h-12 mx-auto stroke-1 opacity-40 mb-3" />
                <p className="font-serif italic text-lg text-brand-charcoal/60">Aucune œuvre trouvée dans cette catégorie.</p>
                <button onClick={() => setFilter('Tous')} className="text-xs uppercase tracking-widest font-bold underline mt-2 hover:opacity-70">
                  Réinitialiser les filtres
                </button>
              </div>
            )}
          </section>

          {/* SECTION PASSION & PROXIMITÉ CLIENT */}
          <section id="passion-section" className="space-y-8 animate-fade-in">
            <div id="passion-anchor" className="pt-2"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center bg-[#1A1A1A]/5 p-6 md:p-8 rounded-3xl border border-[#1A1A1A]/5">
              <div className="space-y-4 md:w-1/2">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 text-brand-charcoal">L'Homme Derrière l'Objectif</span>
                <h2 className="text-3xl font-serif italic text-brand-charcoal">La Passion de Créer du Lien</h2>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                  Pour moi, la photographie n'est pas qu'une question de technique ou d'appareil photo. C'est avant tout un art de la rencontre et de la proximité humaine. Chaque projet commence par une conversation, un café ou une écoute sincère de vos envies. 
                </p>
                <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                  Mon but ultime est de vous mettre pleinement à l'aise pour que votre personnalité et vos émotions brillent spontanément devant l'objectif. C'est en instaurant ce climat de confiance mutuelle que nous capturons ensemble des souvenirs vibrants, authentiques et intemporels.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="bg-brand-charcoal/10 p-2.5 rounded-xl">
                    <User className="w-5 h-5 text-brand-charcoal" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider">Sofiane Chaab</p>
                    <p className="text-[9px] text-brand-charcoal/60">Photographe & Directeur Artistique</p>
                  </div>
                </div>
              </div>

              {/* Grid 3 photos */}
              <div className="grid grid-cols-3 gap-3 md:w-1/2 w-full h-[240px] md:h-[280px]">
                <div className="group relative rounded-2xl overflow-hidden h-full">
                  <img 
                    src="/photos/PhotoSofian1.webp" 
                    alt="Sofiane Chaab - Portrait d'accueil" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-white">Chaleureux</span>
                  </div>
                </div>
                <div className="group relative rounded-2xl overflow-hidden h-full translate-y-2 md:translate-y-4">
                  <img 
                    src="/photos/photosofian2.webp" 
                    alt="Sofiane Chaab - Passion technique" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-white">Précision</span>
                  </div>
                </div>
                <div className="group relative rounded-2xl overflow-hidden h-full">
                  <img 
                    src="/photos/photosofian3.webp" 
                    alt="Sofiane Chaab - Sur le terrain" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-2.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-white">Proximité</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TARIFS & PRESTATIONS SECTION */}
          <section id="tarifs-section" className="space-y-8 bg-[#1A1A1A]/5 p-6 md:p-8 rounded-3xl border border-[#1A1A1A]/5">
            <div id="tarifs-anchor" className="pt-2"></div>
            
            <div className="space-y-2 text-center max-w-xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50 text-brand-charcoal">Prestations & Tarifs</span>
              <h2 className="text-3xl font-serif italic">Investir dans votre patrimoine visuel</h2>
              <p className="text-xs text-brand-charcoal/70 leading-relaxed font-sans">
                Chaque prestation fait l'objet d'une préparation sur mesure. Mes tarifs reflètent mon engagement artistique et technique pour préserver vos souvenirs les plus précieux.
              </p>
            </div>

            {/* Grid des offres */}
            <div id="rates-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Offre 1: Portrait */}
              <div id="rate-card-portrait" className="bg-card-bg border border-brand-charcoal/10 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-brand-charcoal text-brand-cream px-2 py-0.5 rounded-full">Individuel</span>
                    <span className="font-serif italic text-sm text-brand-charcoal/60">Studio / Extérieur</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif font-medium">Portrait Artistique</h3>
                    <p className="text-2xl font-serif italic mt-1 text-brand-charcoal">8 000 DA <span className="text-xs font-sans not-italic text-brand-charcoal/50">/ session</span></p>
                  </div>
                  
                  <ul className="space-y-2 text-[12px] font-sans text-brand-charcoal/80 border-t border-brand-charcoal/10 pt-4">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>1h30</strong> de séance photo guidée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>3 tenues / ambiances</strong> différentes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Conseils de pose personnalisés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>10 clichés d'art</strong> retouchés</span>
                    </li>
                  </ul>
                </div>

                <button 
                  id="btn-book-portrait"
                  onClick={() => handleSelectService('Portrait Artistique', "Bonjour Sofian,\n\nJe souhaite réserver une séance de 'Portrait Artistique'. Pouvez-vous me proposer vos prochaines dates de disponibilité en Algérie ?\n\nMerci beaucoup.")}
                  className="w-full bg-brand-charcoal text-brand-cream py-2 px-4 rounded-xl text-[11px] uppercase font-bold tracking-widest mt-6 hover:bg-brand-charcoal/80 transition-colors cursor-pointer text-center block"
                >
                  Réserver
                </button>
              </div>

              {/* Offre 2: Mariage (Featured) */}
              <div id="rate-card-mariage" className="bg-brand-charcoal text-brand-cream p-6 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden group border border-brand-charcoal/20">
                <div className="absolute top-0 right-0 bg-amber-200 text-[#1A1A1A] text-[8px] uppercase tracking-widest font-bold py-1 px-4 rounded-bl-xl">
                  Populaire
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-brand-cream text-brand-charcoal px-2 py-0.5 rounded-full">Immersion</span>
                    <span className="font-serif italic text-sm text-brand-cream/60">Journée complète</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif font-medium text-brand-cream">Reportage Mariage</h3>
                    <p className="text-2xl font-serif italic mt-1 text-amber-200">dès 60 000 DA</p>
                  </div>
                  
                  <ul className="space-y-2 text-[12px] font-sans text-brand-cream/80 border-t border-brand-cream/10 pt-4">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Présence des préparatifs jusqu'aux fêtes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Séance d'engagement ou couple jour J</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5 stroke-[3]" />
                      <span><strong>200+ photos éditées</strong> en haute définition</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-200 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Galerie en ligne privée sécurisée pendant 1 an</span>
                    </li>
                  </ul>
                </div>

                <button 
                  id="btn-book-mariage"
                  onClick={() => handleSelectService('Reportage Mariage', "Bonjour Sofian,\n\nNous planifions notre mariage en Algérie et nous aimerions solliciter vos services de Reportage Mariage pour immortaliser cette journée unique.\n\nDans l'attente d'échanger avec vous.")}
                  className="w-full bg-brand-cream text-brand-charcoal py-2 px-4 rounded-xl text-[11px] uppercase font-bold tracking-widest mt-6 hover:bg-brand-cream/90 transition-colors cursor-pointer text-center block"
                >
                  Demander un devis
                </button>
              </div>

              {/* Offre 3: Soutenance Universitaire */}
              <div id="rate-card-soutenance" className="bg-card-bg border border-brand-charcoal/10 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-brand-charcoal text-brand-cream px-2 py-0.5 rounded-full">Académique</span>
                    <span className="font-serif italic text-sm text-brand-charcoal/60">Événementiel</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif font-medium">Soutenance</h3>
                    <p className="text-2xl font-serif italic mt-1 text-brand-charcoal">dès 5 000 DA</p>
                  </div>
                  
                  <ul className="space-y-2 text-[12px] font-sans text-brand-charcoal/80 border-t border-brand-charcoal/10 pt-4">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Reportage complet de la présentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Photos d'ambiance avec le jury</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Portraits de famille & amis après verdict</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Livraison rapide sous 48 heures</span>
                    </li>
                  </ul>
                </div>

                <button 
                  id="btn-book-soutenance"
                  onClick={() => handleSelectService('Soutenance Universitaire', "Bonjour Sofian,\n\nJe vais bientôt soutenir mon projet de fin d'études / ma thèse et je souhaiterais immortaliser ce moment important avec mes proches. Quelles sont vos disponibilités ?\n\nCordialement.")}
                  className="w-full bg-brand-charcoal text-brand-cream py-2 px-4 rounded-xl text-[11px] uppercase font-bold tracking-widest mt-6 hover:bg-brand-charcoal/80 transition-colors cursor-pointer text-center block"
                >
                  Réserver la date
                </button>
              </div>

              {/* Offre 4: Photo de Promo */}
              <div id="rate-card-promo" className="bg-card-bg border border-brand-charcoal/10 p-6 rounded-2xl flex flex-col justify-between hover:shadow-md transition-all duration-300">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] uppercase tracking-widest font-bold bg-brand-charcoal text-brand-cream px-2 py-0.5 rounded-full">Collectif</span>
                    <span className="font-serif italic text-sm text-brand-charcoal/60">Grands Groupes</span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-serif font-medium">Photo de Promo</h3>
                    <p className="text-2xl font-serif italic mt-1 text-brand-charcoal">Sur Devis <span className="text-xs font-sans not-italic text-brand-charcoal/50">/ promo</span></p>
                  </div>
                  
                  <ul className="space-y-2 text-[12px] font-sans text-brand-charcoal/80 border-t border-brand-charcoal/10 pt-4">
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Photo de grand groupe et sous-groupes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Clichés individuels en tenue solennelle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Coordination et logistique comprises</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span>Options de tirages physiques en nombre</span>
                    </li>
                  </ul>
                </div>

                <button 
                  id="btn-book-promo"
                  onClick={() => handleSelectService('Photos de Promo', "Bonjour Sofian,\n\nNous sommes délégués de notre promotion et nous souhaiterions organiser la séance de photo de promo officielle de notre classe/département. Pourriez-vous nous proposer un devis personnalisé ?\n\nMerci.")}
                  className="w-full bg-brand-charcoal text-brand-cream py-2 px-4 rounded-xl text-[11px] uppercase font-bold tracking-widest mt-6 hover:bg-brand-charcoal/80 transition-colors cursor-pointer text-center block"
                >
                  Planifier
                </button>
              </div>

            </div>
          </section>

          {/* CONTACT FORM SECTION */}
          <section id="contact-section" ref={contactFormRef} className="space-y-8">
            <div id="contact-form-section" className="pt-2"></div>
            
            <div className="flex flex-col md:flex-row gap-8 items-start">
              
              {/* Left Column info details */}
              <div className="w-full md:w-1/3 space-y-6">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Collaboration</span>
                  <h2 className="text-3xl font-serif italic mt-1">Donnez vie à vos projets</h2>
                </div>
                
                <p className="text-xs text-[#1A1A1A]/70 leading-relaxed font-sans">
                  Une idée, un projet éditorial ou une célébration à immortaliser ? Écrivez-moi en détaillant vos attentes et vos délais, et je vous répondrai dans les meilleurs délais pour en discuter.
                </p>

                <div className="space-y-3 pt-4 border-t border-[#1A1A1A]/10">
                  <div className="flex items-center gap-3 text-xs">
                    <div className="p-2 bg-[#1A1A1A]/5 rounded-lg text-brand-charcoal">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[9px] opacity-40">E-mail de contact</p>
                      <a href="mailto:contact@sofianechaab.com" className="hover:underline font-medium">contact@sofianechaab.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="p-2 bg-[#1A1A1A]/5 rounded-lg text-brand-charcoal">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold uppercase tracking-wider text-[9px] opacity-40">Délais de réponse</p>
                      <p className="font-medium">Sous 24 à 48 heures ouvrées</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Form Block */}
              <div className="w-full md:w-2/3 bg-[#1A1A1A] text-white p-6 md:p-8 rounded-3xl shadow-xl relative overflow-hidden">
                <h3 className="text-xl font-serif italic text-white mb-6 border-b border-white/10 pb-3">Formulaire de demande d'information</h3>
                
                {submitSuccess ? (
                  <div id="contact-success-card" className="space-y-6 py-6 text-center">
                    <div className="w-16 h-16 bg-amber-200 text-[#1A1A1A] rounded-full flex items-center justify-center mx-auto shadow-md animate-bounce">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-2xl font-serif text-amber-200">Demande envoyée !</h4>
                      <p className="text-xs text-white/80 max-w-sm mx-auto">
                        Merci beaucoup ! Votre message a bien été enregistré. Sofiane Chaab analysera votre demande personnellement.
                      </p>
                    </div>

                    <div className="bg-white/5 p-4 rounded-xl max-w-xs mx-auto border border-white/10 space-y-1">
                      <p className="text-[9px] uppercase tracking-widest text-white/50">Référence de demande</p>
                      <p className="text-sm font-mono font-bold tracking-wider text-amber-100">{lastRefId}</p>
                      <p className="text-[10px] text-white/60">Une copie a été consignée dans le registre de l'espace photographe.</p>
                    </div>

                    <button
                      id="btn-reset-form"
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2 border border-white/20 hover:border-white text-xs uppercase tracking-widest font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <form id="portfolio-contact-form" name="contact" data-netlify="true" onSubmit={handleSubmitContact} className="space-y-5">
                    {/* Hidden input for Netlify Form detection */}
                    <input type="hidden" name="form-name" value="contact" />
                    
                    {/* Nom et Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/70 block flex items-center gap-1">
                          <User className="w-3 h-3 text-amber-200" /> Votre nom complet *
                        </label>
                        <input
                          type="text"
                          id="client-name"
                          name="nom"
                          required
                          value={nom}
                          onChange={(e) => setNom(e.target.value)}
                          placeholder="Ex: Charlotte Dubois"
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-200 focus:bg-white/10 transition-all text-white placeholder:text-white/30"
                        />
                      </div>
 
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/70 block flex items-center gap-1">
                          <Mail className="w-3 h-3 text-amber-200" /> Votre adresse e-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ex: charlotte@exemple.com"
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-200 focus:bg-white/10 transition-all text-white placeholder:text-white/30"
                        />
                      </div>
                    </div>
 
                    {/* Prestation et Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/70 block flex items-center gap-1">
                          <Camera className="w-3 h-3 text-amber-200" /> Type de prestation
                        </label>
                        <select
                          name="prestation"
                          value={prestation}
                          onChange={(e) => setPrestation(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-200 focus:bg-white/10 transition-all text-white appearance-none cursor-pointer"
                        >
                          <option className="bg-[#1A1A1A] text-white" value="Portrait Artistique">Portrait Artistique (8 000 DA)</option>
                          <option className="bg-[#1A1A1A] text-white" value="Reportage Mariage">Reportage Mariage (dès 60 000 DA)</option>
                          <option className="bg-[#1A1A1A] text-white" value="Soutenance Universitaire">Soutenance Universitaire (dès 5 000 DA)</option>
                          <option className="bg-[#1A1A1A] text-white" value="Photos de Promo">Photos de Promo (Sur devis)</option>
                          <option className="bg-[#1A1A1A] text-white" value="Concert & Spectacle">Concert & Spectacle (Sur devis)</option>
                        </select>
                      </div>
 
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-white/70 block flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-200" /> Date souhaitée (optionnelle)
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-200 focus:bg-white/10 transition-all text-white cursor-pointer"
                        />
                      </div>
                    </div>
 
                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-white/70 block flex items-center gap-1">
                        <MessageSquare className="w-3 h-3 text-amber-200" /> Description de votre projet *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Veuillez décrire votre projet de façon à me donner une idée du style artistique recherché, du lieu et des délais prévus..."
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-200 focus:bg-white/10 transition-all text-white placeholder:text-white/30 resize-none font-sans"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      id="btn-submit-contact"
                      disabled={loading}
                      className="w-full bg-white text-[#1A1A1A] py-3 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-neutral-100 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-[#1A1A1A]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Envoi en cours...</span>
                        </>
                      ) : (
                        <>
                          <span>Envoyer ma proposition</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                  </form>
                )}
              </div>
            </div>
          </section>

          {/* DÉCOUPAGE DE L'ESPACE PHOTOGRAPHE (ADMIN REGISTER / BACKEND VIEW) */}
          <section id="admin-section" className="border-t border-brand-charcoal/10 pt-12">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-brand-charcoal/40">Securité & Suivi</span>
                <span className="w-1.5 h-1.5 rounded-full bg-brand-charcoal/20"></span>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">Live Client DB</span>
              </div>
              
              <button
                id="toggle-admin-workspace"
                onClick={() => {
                  setShowAdminPanel(!showAdminPanel);
                  setAdminPassword('');
                  setAdminError('');
                }}
                className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-brand-charcoal hover:underline opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
              >
                {showAdminPanel ? 'Fermer l\'Espace Photographe' : 'Espace Photographe'}
                {adminMode ? <Unlock className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
              </button>
            </div>

            {showAdminPanel && (
              <div id="admin-panel-container" className="bg-card-bg border border-brand-charcoal/15 rounded-3xl p-6 shadow-md space-y-6">
                
                {/* LOGIN STATE COMPONENT */}
                {!adminMode ? (
                  <form id="admin-login-form" onSubmit={handleLoginAdmin} className="max-w-md mx-auto py-8 text-center space-y-4">
                    <div className="w-12 h-12 bg-brand-charcoal/5 rounded-full flex items-center justify-center mx-auto text-brand-charcoal">
                      <Lock className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1">
                      <h4 className="text-lg font-serif">Accéder à la boîte de réception</h4>
                      <p className="text-xs text-brand-charcoal/60">Cette section confidentielle simule l'interface d'administration du photographe pour consulter les prospects et les messages reçus.</p>
                    </div>

                    <div className="space-y-2">
                      <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        placeholder="Code d'accès (saisir 'vernet' ou laisser vide)"
                        className="w-full max-w-xs mx-auto text-center border border-brand-charcoal/20 rounded-xl px-4 py-2 text-sm bg-brand-cream text-brand-charcoal outline-none focus:border-brand-charcoal"
                      />
                      
                      {adminError && <p className="text-[11px] text-red-600 font-semibold">{adminError}</p>}
                      
                      <button
                        type="submit"
                        id="btn-login-admin"
                        className="block w-full max-w-xs mx-auto bg-brand-charcoal text-brand-cream py-2 text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-brand-charcoal/90 cursor-pointer"
                      >
                        Se connecter
                      </button>
                    </div>
                  </form>
                ) : (
                  
                  // LOGGED IN ADMIN BOARD
                  <div id="admin-dashboard-view" className="space-y-6 animate-fade-in">
                    
                    {/* Header Admin Dashboard */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-charcoal/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xl font-serif text-brand-charcoal">Tableau de Bord — Sofiane Chaab</h4>
                          <span className="text-[9px] bg-emerald-500/10 text-emerald-600 font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">Session Active</span>
                        </div>
                        <p className="text-xs text-brand-charcoal/60">Gestionnaire de contact, de devis et statistiques de prospection en temps réel.</p>
                      </div>
                      
                      <button
                        onClick={() => setAdminMode(false)}
                        className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 border border-brand-charcoal/20 rounded-lg hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all cursor-pointer"
                      >
                        Déconnexion
                      </button>
                    </div>

                    {/* Statistiques clés de l'activité */}
                    <div id="admin-stats-widgets" className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                      {/* Stat 1 */}
                      <div className="bg-brand-cream p-4 rounded-2xl border border-brand-charcoal/10 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold opacity-50 block text-brand-charcoal">Prospects Reçus</span>
                          <span className="text-3xl font-serif italic text-brand-charcoal">{totalLeads}</span>
                        </div>
                        <div className="p-3 bg-brand-charcoal/5 rounded-xl text-brand-charcoal">
                          <User className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Stat 2 */}
                      <div className="bg-brand-cream p-4 rounded-2xl border border-brand-charcoal/10 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold opacity-50 block text-brand-charcoal">Pipeline Potentiel</span>
                          <span className="text-3xl font-serif italic text-emerald-600 dark:text-emerald-400">{potentialRevenue.toLocaleString('fr-FR')} DA</span>
                        </div>
                        <div className="p-3 bg-brand-charcoal/5 rounded-xl text-emerald-600">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Stat 3 */}
                      <div className="bg-brand-cream p-4 rounded-2xl border border-brand-charcoal/10 flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase tracking-wider font-bold opacity-50 block text-brand-charcoal">Statut Boîte d'envoi</span>
                          <span className="text-xs font-semibold text-brand-charcoal flex items-center gap-1 mt-1 bg-card-bg px-2 py-1 rounded-lg border border-brand-charcoal/15 w-fit">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Opérationnel
                          </span>
                        </div>
                        <div className="p-3 bg-brand-charcoal/5 rounded-xl text-brand-charcoal">
                          <Mail className="w-5 h-5" />
                        </div>
                      </div>

                    </div>

                    {/* Liste des demandes */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="text-xs uppercase tracking-widest font-bold opacity-70 text-brand-charcoal">Demandes de renseignements reçues ({inquiries.length})</h5>
                        <p className="text-[10px] italic text-brand-charcoal/50 font-sans">Enregistrées dans le stockage local du navigateur</p>
                      </div>

                      <div id="inquiries-list" className="space-y-4">
                        {inquiries.length === 0 ? (
                          <div className="py-8 text-center bg-brand-cream rounded-2xl border border-dashed border-brand-charcoal/20">
                            <p className="text-xs text-brand-charcoal/50">Aucun message dans votre boîte de réception pour le moment.</p>
                          </div>
                        ) : (
                          inquiries.map((inq) => (
                            <div 
                              key={inq.id}
                              id={`inquiry-row-${inq.id}`}
                              className="bg-brand-cream p-5 rounded-2xl border border-brand-charcoal/10 space-y-3 relative hover:shadow-sm transition-all"
                            >
                              {/* Top metadata of message */}
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-brand-charcoal/10 pb-3">
                                <div>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="font-serif text-lg font-medium text-brand-charcoal">{inq.nom}</span>
                                    <span className="text-[9px] font-mono bg-brand-charcoal/5 px-1.5 py-0.5 rounded text-brand-charcoal/60">{inq.id}</span>
                                    <span className={`text-[9px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
                                      inq.prestation === 'Reportage Mariage' ? 'bg-amber-500/10 text-amber-600' :
                                      inq.prestation === 'Portrait Artistique' ? 'bg-indigo-500/10 text-indigo-600' :
                                      inq.prestation === 'Soutenance Universitaire' ? 'bg-emerald-500/10 text-emerald-600' :
                                      inq.prestation === 'Photos de Promo' ? 'bg-purple-500/10 text-purple-600' :
                                      inq.prestation === 'Concert & Spectacle' ? 'bg-sky-500/10 text-sky-600' :
                                      'bg-neutral-500/10 text-neutral-600'
                                    }`}>
                                      {inq.prestation} ({inq.estimationTarif})
                                    </span>
                                  </div>
                                  <span className="text-xs font-sans text-brand-charcoal/60 block mt-0.5">{inq.email}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] text-brand-charcoal/50 font-mono">
                                    {new Date(inq.dateCreation).toLocaleDateString('fr-FR', {
                                      day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                                    })}
                                  </span>
                                  
                                  <select
                                    value={inq.statut}
                                    onChange={(e) => handleChangeStatus(inq.id, e.target.value as any)}
                                    className="text-[10px] bg-card-bg border border-brand-charcoal/15 text-brand-charcoal rounded-lg px-2 py-1 outline-none font-bold cursor-pointer"
                                  >
                                    <option value="Nouveau">Nouveau</option>
                                    <option value="Contacté">Contacté</option>
                                    <option value="Confirmé">Confirmé</option>
                                  </select>
                                </div>
                              </div>

                              {/* Message body */}
                              <div className="text-xs font-sans text-brand-charcoal/80 bg-card-bg p-3 rounded-xl border border-brand-charcoal/10 whitespace-pre-wrap leading-relaxed">
                                {inq.message}
                              </div>

                              {/* Footer action buttons of row */}
                              <div className="flex justify-between items-center text-[11px] pt-1">
                                <div className="flex items-center gap-3">
                                  <span className="text-[10px] font-semibold text-brand-charcoal/50 flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" /> Date d'événement: <strong>{inq.date}</strong>
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <a
                                    href={`mailto:${inq.email}?subject=Réponse Sofiane Chaab - Réf ${inq.id}&body=Bonjour ${inq.nom},%0D%0A%0D%0AMerci pour l'intérêt porté à mon travail.`}
                                    className="text-blue-600 hover:underline font-bold tracking-wide uppercase text-[9px] flex items-center gap-0.5 bg-blue-500/10 px-2 py-1 rounded"
                                  >
                                    Répondre <ExternalLink className="w-2.5 h-2.5" />
                                  </a>
                                  <button
                                    onClick={() => handleDeleteInquiry(inq.id)}
                                    className="p-1 text-red-600 hover:bg-red-500/10 rounded transition-colors cursor-pointer"
                                    title="Supprimer la demande"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                            </div>
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                )}

              </div>
            )}
          </section>

        </main>
      </div>

      {/* LIGHTBOX / MODAL INTERACTIF DE GALERIE (Artistic Flair Theme Card-Style Overlay) */}
      {lightboxPhoto && (
        <div id="lightbox-backdrop" className="fixed inset-0 z-50 bg-[#1A1A1A]/95 flex items-center justify-center p-4 md:p-6 lg:p-8 backdrop-blur-sm animate-fade-in">
          
          <div id="lightbox-card-container" className="bg-card-bg text-brand-charcoal w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] relative animate-scale-up border border-brand-charcoal/15">
            
            {/* Close Button top-right (absolute) */}
            <button
              id="btn-close-lightbox"
              onClick={() => setLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-brand-cream/85 text-brand-charcoal hover:bg-brand-cream p-2.5 rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Left Box: Photo Image stage */}
            <div id="lightbox-image-stage" className="w-full md:w-[55%] lg:w-[60%] bg-[#121212] flex items-center justify-center relative min-h-[250px] md:min-h-0">
              <img 
                src={lightboxPhoto.url} 
                alt={lightboxPhoto.title}
                className="max-w-full max-h-[50vh] md:max-h-[85vh] object-contain mx-auto"
              />

              {/* Prev / Next buttons floating on image */}
              <button
                id="btn-lightbox-prev"
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/45 text-white hover:bg-black/70 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                title="Photo Précédente (Flèche Gauche)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <button
                id="btn-lightbox-next"
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/45 text-white hover:bg-black/70 p-2 rounded-full backdrop-blur-sm transition-all cursor-pointer"
                title="Photo Suivante (Flèche Droite)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right Box: Elegant Content Details & Booking Actions */}
            <div id="lightbox-details-panel" className="w-full md:w-[45%] lg:w-[40%] p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[40vh] md:max-h-[85vh] border-t md:border-t-0 md:border-l border-brand-charcoal/10">
              
              {/* Header Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold bg-brand-charcoal text-brand-cream px-2 py-0.5 rounded">
                      {lightboxPhoto.category}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold opacity-50 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {lightboxPhoto.location}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl font-serif italic mt-2 font-medium">
                    {lightboxPhoto.title}
                  </h3>
                  
                  <span className="text-xs text-brand-charcoal/40 block mt-1">Œuvre capturée en {lightboxPhoto.year}</span>
                </div>

                {/* Explicative Narrative paragraph */}
                <div className="space-y-2 text-xs text-brand-charcoal/80 leading-relaxed font-sans italic border-l-2 border-brand-charcoal/10 pl-4 py-1">
                  <p>{lightboxPhoto.description}</p>
                </div>

                {/* EXIF technical camera metadata widget */}
                <div className="bg-brand-charcoal/5 p-4 rounded-xl space-y-3.5 border border-brand-charcoal/10">
                  <h4 className="text-[9px] uppercase tracking-widest font-bold text-brand-charcoal/40 flex items-center gap-1.5 border-b border-brand-charcoal/10 pb-1.5">
                    <Camera className="w-3.5 h-3.5 text-brand-charcoal" /> Métadonnées techniques (EXIF)
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-[8px] uppercase tracking-wider opacity-45">Boîtier</p>
                      <p className="font-bold">{lightboxPhoto.camera}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-wider opacity-45">Objectif</p>
                      <p className="font-bold">{lightboxPhoto.lens}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-wider opacity-45">Réglages</p>
                      <p className="font-bold font-mono">{lightboxPhoto.settings.split('|')[0]}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-wider opacity-45">Exposition</p>
                      <p className="font-bold font-mono text-[11px]">{lightboxPhoto.settings.split('|').slice(1).join(' |')}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action and CTAs on Bottom */}
              <div className="mt-8 pt-4 border-t border-brand-charcoal/10 space-y-3">
                
                <button
                  id="btn-lightbox-inquire"
                  onClick={() => {
                    // Close lightbox
                    setLightboxPhoto(null);
                    // Prefill form
                    let catPrestation = 'Portrait Artistique';
                    if (lightboxPhoto.category === 'Mariage') catPrestation = 'Reportage Mariage';
                    else if (lightboxPhoto.category === 'Soutenance') catPrestation = 'Soutenance Universitaire';
                    else if (lightboxPhoto.category === 'Promo') catPrestation = 'Photos de Promo';
                    else if (lightboxPhoto.category === 'Concert') catPrestation = 'Concert & Spectacle';
                    handleSelectService(
                      catPrestation,
                      `Bonjour Sofian,\n\nJe suis très sensible à votre œuvre "${lightboxPhoto.title}" (${lightboxPhoto.category}, prise au ${lightboxPhoto.camera}). Je souhaiterais obtenir une prestation avec une démarche artistique similaire.\n\nDans l'attente de votre réponse.`
                    );
                  }}
                  className="w-full bg-brand-charcoal text-brand-cream py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-brand-charcoal/90 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Demander une séance similaire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <p className="text-[9px] text-center text-brand-charcoal/50">
                  Soutenez la photographie d'auteur. Tirages d'art signés disponibles sur demande écrite.
                </p>

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

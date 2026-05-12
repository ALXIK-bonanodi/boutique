/* ══════════════════════════════════════════════
   nav-footer.js — Bona Nodi
   Navbar + footer communs sur toutes les pages
   ══════════════════════════════════════════════ */

const BN_SB_URL = 'https://twtstslwhvrhmjfcfvvu.supabase.co';
const BN_SB_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR3dHN0c2x3aHZyaG1qZmNmdnZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTQ1MzcsImV4cCI6MjA5MDQ3MDUzN30.11Ejag3jxcBtx9unK33dnaCjSIJDu0FszLeyYw91zgE';

const BN_DEFAULTS = {
  instagram: 'https://instagram.com/bonanodi',
  tiktok:    'https://tiktok.com/@bonanodi',
  pinterest: 'https://pinterest.com/bonanodi',
  collections: [
    { label: 'Chainmail',      href: 'index.html?collection=chainmail' },
    { label: 'Poisson Perles', href: 'index.html?collection=poisson' },
    { label: 'Sacs',           href: 'index.html?collection=sac' },
    { label: 'Porte-clefs',    href: 'index.html?collection=porteclef' }
  ],
  types: [
    { label: "Boucles d'oreilles", href: 'index.html?type=boucles' },
    { label: 'Colliers',           href: 'index.html?type=collier' },
    { label: 'Bracelets',          href: 'index.html?type=bracelet' },
    { label: 'Bagues',             href: 'index.html?type=bague' },
    { label: 'Sacs',               href: 'index.html?type=sac' },
    { label: 'Porte-clefs',        href: 'index.html?type=porteclef' }
  ]
};

/* ── Injecter le CSS ── */
function bnInjectCSS() {
  if (document.getElementById('bn-nav-css')) return;
  const s = document.createElement('style');
  s.id = 'bn-nav-css';
  s.textContent = `
    .bn-navbar{position:fixed;top:0;left:0;right:0;z-index:300;background:rgba(26,21,16,0);transition:background 0.4s}
    .bn-navbar.scrolled{background:rgba(26,21,16,0.96);backdrop-filter:blur(16px);border-bottom:1px solid rgba(232,201,122,0.14)}
    .bn-nav-main{display:flex;align-items:center;justify-content:space-between;padding:0.6rem 2.5rem;gap:1rem}
    .bn-logo{text-decoration:none;display:flex;align-items:center;gap:0.65rem;flex-shrink:0}
    .bn-logo img{height:36px;width:36px;border-radius:50%;object-fit:cover;border:1px solid rgba(232,201,122,0.3)}
    .bn-logo-l1{font-family:'Bebas Neue',sans-serif;font-size:1.25rem;letter-spacing:0.2em;color:#e8c97a;display:block;line-height:1}
    .bn-logo-l2{font-family:'Cormorant Garamond',serif;font-style:italic;font-weight:300;font-size:0.58rem;letter-spacing:0.3em;color:#e0558a;text-transform:uppercase;display:block}
    .bn-nav-links{display:flex;align-items:center}
    .bn-nav-item{position:relative}
    .bn-nav-btn{font-family:'DM Mono',monospace;font-size:0.56rem;letter-spacing:0.14em;text-transform:uppercase;color:#9a9070;padding:0.55rem 0.9rem;display:flex;align-items:center;gap:0.3rem;transition:color 0.2s;cursor:pointer;background:none;border:none;white-space:nowrap}
    .bn-nav-btn:hover,.bn-nav-item:hover>.bn-nav-btn{color:#faf5e8}
    .bn-caret{font-size:0.4rem;opacity:0.5;transition:transform 0.2s}
    .bn-nav-item:hover>.bn-nav-btn .bn-caret{transform:rotate(180deg)}
    .bn-dropdown{position:absolute;top:100%;left:50%;transform:translateX(-50%) translateY(-6px);background:rgba(26,21,16,0.98);border:1px solid rgba(232,201,122,0.14);backdrop-filter:blur(16px);min-width:180px;padding:0.5rem 0;opacity:0;pointer-events:none;transition:opacity 0.2s,transform 0.2s;display:flex;flex-direction:column;z-index:10}
    .bn-nav-item:hover .bn-dropdown{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}
    .bn-dropdown a{font-family:'DM Mono',monospace;font-size:0.54rem;letter-spacing:0.12em;text-transform:uppercase;color:#9a9070;text-decoration:none;padding:0.5rem 1.1rem;transition:color 0.15s,background 0.15s;display:block;white-space:nowrap}
    .bn-dropdown a:hover{color:#faf5e8;background:rgba(232,201,122,0.05)}
    .bn-dd-sep{height:1px;background:rgba(232,201,122,0.14);margin:0.3rem 0}
    .bn-nav-right{display:flex;align-items:center;gap:0.4rem;flex-shrink:0}
    .bn-cart-btn,.bn-account-btn{background:transparent;border:1px solid rgba(232,201,122,0.14);color:#faf5e8;cursor:pointer;padding:0.4rem 0.8rem;font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.12em;display:flex;align-items:center;gap:0.5rem;clip-path:polygon(0 0,calc(100% - 6px) 0,100% 6px,100% 100%,6px 100%,0 calc(100% - 6px));transition:all 0.2s;text-decoration:none}
    .bn-cart-btn:hover,.bn-account-btn:hover{border-color:#c4286e;color:#e8c97a}
    .bn-cart-count{background:#c4286e;color:#faf5e8;font-size:0.5rem;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center}
    .bn-cart-count.hidden{display:none}
    .bn-hamburger{display:none;background:transparent;border:1px solid rgba(232,201,122,0.14);color:#9a9070;padding:0.4rem 0.7rem;cursor:pointer;font-size:1.1rem;transition:all 0.2s}
    .bn-hamburger:hover{border-color:#c4286e;color:#faf5e8}
    .bn-mobile{display:none;border-top:1px solid rgba(232,201,122,0.14);padding:0.8rem 1.5rem 1.2rem;flex-direction:column;gap:0.3rem;background:rgba(26,21,16,0.98);backdrop-filter:blur(16px)}
    .bn-mobile.open{display:flex}
    .bn-mobile a{font-family:'DM Mono',monospace;font-size:0.58rem;letter-spacing:0.14em;text-transform:uppercase;color:#9a9070;text-decoration:none;padding:0.5rem 0;border-bottom:1px solid rgba(232,201,122,0.1);transition:color 0.2s}
    .bn-mobile a:hover{color:#faf5e8}
    .bn-mob-sec{font-family:'DM Mono',monospace;font-size:0.46rem;letter-spacing:0.18em;text-transform:uppercase;color:#e0558a;padding:0.6rem 0 0.2rem}
    .bn-footer{border-top:1px solid rgba(232,201,122,0.14);background:#1a1510;margin-top:4rem}
    .bn-foot-main{max-width:1200px;margin:0 auto;padding:2.5rem 2.5rem 1.5rem;display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:2rem}
    .bn-foot-logo{font-family:'Bebas Neue',sans-serif;font-size:1.5rem;letter-spacing:0.2em;color:#e8c97a;display:block;margin-bottom:0.5rem}
    .bn-foot-brand p{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:0.9rem;color:#9a9070;line-height:1.6;max-width:24ch}
    .bn-socials{display:flex;gap:0.5rem;margin-top:1rem;flex-wrap:wrap}
    .bn-social{font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.12em;text-transform:uppercase;padding:0.3rem 0.7rem;border:1px solid rgba(232,201,122,0.14);color:#9a9070;text-decoration:none;transition:all 0.2s;clip-path:polygon(0 0,calc(100% - 5px) 0,100% 5px,100% 100%,5px 100%,0 calc(100% - 5px))}
    .bn-social:hover{border-color:#c4286e;color:#e0558a}
    .bn-foot-col h4{font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.2em;text-transform:uppercase;color:#e0558a;margin-bottom:0.7rem}
    .bn-foot-col a{display:block;font-family:'DM Mono',monospace;font-size:0.52rem;letter-spacing:0.1em;text-transform:uppercase;color:#9a9070;text-decoration:none;padding:0.25rem 0;transition:color 0.2s}
    .bn-foot-col a:hover{color:#faf5e8}
    .bn-foot-bottom{border-top:1px solid rgba(232,201,122,0.14);padding:1rem 2.5rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem}
    .bn-foot-copy{font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:0.1em;color:#9a9070}
    .bn-foot-legal{display:flex;gap:1rem;flex-wrap:wrap}
    .bn-foot-legal a{font-family:'DM Mono',monospace;font-size:0.5rem;letter-spacing:0.1em;text-transform:uppercase;color:#9a9070;text-decoration:none;transition:color 0.2s}
    .bn-foot-legal a:hover{color:#e8c97a}
    @media(max-width:850px){.bn-nav-links{display:none}.bn-hamburger{display:flex}.bn-nav-main{padding:0.5rem 1rem}}
    @media(max-width:750px){.bn-foot-main{grid-template-columns:1fr 1fr}}
    @media(max-width:480px){.bn-foot-main{grid-template-columns:1fr}.bn-foot-bottom{flex-direction:column;align-items:flex-start}}
  `;
  document.head.appendChild(s);
}

/* ── Construire et injecter la navbar ── */
function bnBuildNav(cfg) {
  const cols = cfg.collections || BN_DEFAULTS.collections;
  const types = cfg.types || BN_DEFAULTS.types;
  const cart = (function() {
    try { return JSON.parse(localStorage.getItem('bn_cart') || '[]').reduce(function(s,i){return s+i.qty;},0); } catch(e){ return 0; }
  })();

  var nav = document.createElement('nav');
  nav.className = 'bn-navbar';
  nav.id = 'bn-navbar';
  nav.innerHTML =
    '<div class="bn-nav-main">' +
      '<a href="index.html" class="bn-logo">' +
        '<img src="logo.png" alt="Bona Nodi" onerror="this.style.display=\'none\'">' +
        '<span><span class="bn-logo-l1">BONA NODI</span><span class="bn-logo-l2">bijoux artisanaux</span></span>' +
      '</a>' +
      '<div class="bn-nav-links">' +
        '<div class="bn-nav-item">' +
          '<button class="bn-nav-btn">Collections <span class="bn-caret">▼</span></button>' +
          '<div class="bn-dropdown">' +
            cols.map(function(c){return '<a href="'+c.href+'">'+c.label+'</a>';}).join('') +
            '<div class="bn-dd-sep"></div>' +
            '<a href="index.html#boutique">Tout voir</a>' +
          '</div>' +
        '</div>' +
        '<div class="bn-nav-item">' +
          '<button class="bn-nav-btn">Par type <span class="bn-caret">▼</span></button>' +
          '<div class="bn-dropdown">' +
            types.map(function(t){return '<a href="'+t.href+'">'+t.label+'</a>';}).join('') +
          '</div>' +
        '</div>' +
        '<div class="bn-nav-item">' +
          '<button class="bn-nav-btn">À propos <span class="bn-caret">▼</span></button>' +
          '<div class="bn-dropdown">' +
            '<a href="about.html">La créatrice</a>' +
            '<a href="entretien.html">Entretien des bijoux</a>' +
            '<a href="cgv.html#art8">SAV & Réparations</a>' +
            '<a href="contact.html">Contact</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="bn-nav-right">' +
        '<a href="compte.html" class="bn-account-btn">◯ Compte</a>' +
        '<a href="index.html" class="bn-cart-btn" id="bn-cart-btn">' +
          '🛒 Panier' +
          '<span class="bn-cart-count' + (cart > 0 ? '' : ' hidden') + '" id="bn-cart-count">' + cart + '</span>' +
        '</a>' +
        '<button class="bn-hamburger" id="bn-hamburger">☰</button>' +
      '</div>' +
    '</div>' +
    '<div class="bn-mobile" id="bn-mobile">' +
      '<span class="bn-mob-sec">Collections</span>' +
      cols.map(function(c){return '<a href="'+c.href+'">'+c.label+'</a>';}).join('') +
      '<span class="bn-mob-sec">Par type</span>' +
      types.map(function(t){return '<a href="'+t.href+'">'+t.label+'</a>';}).join('') +
      '<span class="bn-mob-sec">Infos</span>' +
      '<a href="about.html">À propos</a>' +
      '<a href="entretien.html">Entretien</a>' +
      '<a href="cgv.html">CGV & SAV</a>' +
      '<a href="contact.html">Contact</a>' +
      '<a href="compte.html">Mon compte</a>' +
    '</div>';

  document.body.insertBefore(nav, document.body.firstChild);

  /* Scroll */
  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  });
  if (window.scrollY > 40) nav.classList.add('scrolled');

  /* Hamburger */
  document.getElementById('bn-hamburger').addEventListener('click', function() {
    document.getElementById('bn-mobile').classList.toggle('open');
  });

  /* Padding body pour la navbar fixe */
  document.body.style.paddingTop = '60px';
}

/* ── Construire et injecter le footer ── */
function bnBuildFooter(cfg) {
  var cols = cfg.collections || BN_DEFAULTS.collections;
  var ig   = cfg.instagram || BN_DEFAULTS.instagram;
  var tt   = cfg.tiktok    || BN_DEFAULTS.tiktok;
  var pt   = cfg.pinterest  || BN_DEFAULTS.pinterest;
  var autre = cfg.autre || '';
  var autreLabel = cfg.autre_label || '';

  var socials = '';
  if (ig) socials += '<a href="'+ig+'" target="_blank" class="bn-social">Instagram</a>';
  if (tt) socials += '<a href="'+tt+'" target="_blank" class="bn-social">TikTok</a>';
  if (pt) socials += '<a href="'+pt+'" target="_blank" class="bn-social">Pinterest</a>';
  if (autre && autreLabel) socials += '<a href="'+autre+'" target="_blank" class="bn-social">'+autreLabel+'</a>';

  var foot = document.createElement('footer');
  foot.className = 'bn-footer';
  foot.innerHTML =
    '<div class="bn-foot-main">' +
      '<div class="bn-foot-brand">' +
        '<span class="bn-foot-logo">BONA NODI</span>' +
        '<p>Bijoux artisanaux fait main — chainmail, perles, savoir-faire.</p>' +
        '<div class="bn-socials">' + socials + '</div>' +
      '</div>' +
      '<div class="bn-foot-col">' +
        '<h4>Boutique</h4>' +
        cols.map(function(c){return '<a href="'+c.href+'">'+c.label+'</a>';}).join('') +
        '<a href="index.html#boutique">Tout voir</a>' +
      '</div>' +
      '<div class="bn-foot-col">' +
        '<h4>Informations</h4>' +
        '<a href="about.html">À propos</a>' +
        '<a href="entretien.html">Entretien des bijoux</a>' +
        '<a href="cgv.html#art8">SAV & Réparations</a>' +
        '<a href="contact.html">Contact</a>' +
      '</div>' +
      '<div class="bn-foot-col">' +
        '<h4>Mon compte</h4>' +
        '<a href="compte.html">Mon espace</a>' +
        '<a href="compte.html#commandes">Mes commandes</a>' +
        '<a href="compte.html#wishlist">Ma wishlist</a>' +
      '</div>' +
    '</div>' +
    '<div class="bn-foot-bottom">' +
      '<span class="bn-foot-copy">© 2025 Bona Nodi — Bijoux artisanaux fait main</span>' +
      '<div class="bn-foot-legal">' +
        '<a href="cgv.html">CGV</a>' +
        '<a href="cgv.html#art10">Données personnelles</a>' +
        '<a href="cgv.html#art6">Droit de rétractation</a>' +
      '</div>' +
    '</div>';

  document.body.appendChild(foot);
}

/* ── Chargement des settings puis rendu ── */
function bnInit() {
  bnInjectCSS();

  /* Essayer de charger les settings depuis Supabase */
  try {
    var sb = window.supabase.createClient(BN_SB_URL, BN_SB_KEY);
    sb.from('boutique_settings')
      .select('key,value')
      .in('key', ['nav_footer','instagram','tiktok','pinterest'])
      .then(function(res) {
        var cfg = {};
        if (res.data) {
          res.data.forEach(function(r) {
            if (r.key === 'nav_footer' && r.value) Object.assign(cfg, r.value);
            else if (r.value) cfg[r.key] = r.value;
          });
        }
        bnBuildNav(cfg);
        bnBuildFooter(cfg);
      })
      .catch(function() {
        bnBuildNav({});
        bnBuildFooter({});
      });
  } catch(e) {
    bnBuildNav({});
    bnBuildFooter({});
  }
}

/* Lancer quand le DOM est prêt */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bnInit);
} else {
  bnInit();
}

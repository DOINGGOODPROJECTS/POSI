import fs from "node:fs/promises";

const targetPath = process.argv[2];
if (!targetPath) {
  console.error("Usage: node patch_faro_lang.mjs /path/to/index.html");
  process.exit(2);
}

const CSS_MARKER = "/* ─── FARO LANGUAGE SWITCHER ─── */";
const SCRIPT_MARKER_PREFIX = "<!-- FARO_LANG_SWITCHER";

function mustFind(source, needle, label) {
  const index = source.indexOf(needle);
  if (index === -1) throw new Error(`Could not find ${label} in ${targetPath}`);
  return index;
}

function replaceOrInsertScript(html, scriptBlock) {
  const existingStart = html.indexOf(SCRIPT_MARKER_PREFIX);
  if (existingStart !== -1) {
    const endScript = html.indexOf("</script>", existingStart);
    if (endScript === -1) {
      throw new Error(
        `Could not find closing </script> for existing FARO lang switcher in ${targetPath}`,
      );
    }
    const end = endScript + "</script>".length;
    return html.slice(0, existingStart) + scriptBlock + html.slice(end);
  }

  const bodyClose = mustFind(html, "\n</body>", "</body>");
  return html.slice(0, bodyClose) + scriptBlock + html.slice(bodyClose);
}

let html = await fs.readFile(targetPath, "utf8");
let out = html;

// 1) Insert CSS
if (!out.includes(CSS_MARKER)) {
  const insertAfter = ".nav-cta:hover { background: var(--sage) !important; color: var(--ivory) !important; }\n";
  const cssBlock = `${insertAfter}

  ${CSS_MARKER}
  .nav-right {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  /* ensure CTA keeps nav link typography even when outside .nav-links */
  .nav-cta {
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
  }

  .lang-switcher { position: relative; }
  .lang-button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1px solid rgba(28,31,46,0.14);
    background: rgba(247,244,239,0.95);
    padding: 9px 12px;
    border-radius: 2px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }
  .lang-button:hover {
    background: rgba(247,244,239,1);
    border-color: rgba(28,31,46,0.22);
    transform: translateY(-1px);
  }
  .lang-code {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.16em;
    color: var(--slate);
  }
  .lang-caret {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid rgba(28,31,46,0.7);
  }

  .lang-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 12px);
    width: 180px;
    background: rgba(247,244,239,0.98);
    border: 1px solid rgba(28,31,46,0.14);
    border-radius: 2px;
    overflow: hidden;
    box-shadow: 0 18px 55px rgba(28,31,46,0.18);
    z-index: 500;
  }
  .lang-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 12px;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: var(--slate);
    text-align: left;
  }
  .lang-menu-item:hover { background: rgba(221,238,233,0.65); }

  @media (max-width: 860px) {
    .nav-right { gap: 12px; }
    .lang-button { padding: 8px 10px; }
  }
`;

  out = out.replace(insertAfter, cssBlock);
}

// 1b) Make menu visibility class-based (more robust than `hidden`)
if (out.includes(CSS_MARKER)) {
  if (!out.includes(".lang-switcher.open .lang-menu")) {
    out = out.replace(
      ".lang-menu {\n",
      ".lang-menu {\n    display: none;\n",
    );
    out = out.replace(
      ".lang-menu-item:hover { background: rgba(221,238,233,0.65); }\n",
      ".lang-menu-item:hover { background: rgba(221,238,233,0.65); }\n  .lang-switcher.open .lang-menu { display: block; }\n",
    );
  } else if (!out.includes("display: none;") && out.includes(".lang-menu {")) {
    out = out.replace(".lang-menu {\n", ".lang-menu {\n    display: none;\n");
  }
}

// 2) Restructure NAV to include .nav-right + language switcher
if (!out.includes('class="lang-switcher"')) {
  const navStart = mustFind(out, '<nav id="main-nav">', "<nav id=\"main-nav\">");
  const navEnd = mustFind(out, "</nav>", "closing </nav>");
  const navBlock = out.slice(navStart, navEnd + "</nav>".length);

  const ulStart = mustFind(navBlock, '<ul class="nav-links">', "<ul class=\"nav-links\">");
  const ulEnd = mustFind(navBlock, "</ul>", "closing </ul> in nav");
  const ulBlock = navBlock.slice(ulStart, ulEnd + "</ul>".length);

  const launchNeedle =
    '<li><a href="https://faro.solondev.com/chat/" class="nav-cta" target="_blank" rel="noopener noreferrer">Launch App</a></li>';
  if (!ulBlock.includes(launchNeedle)) {
    throw new Error("Could not find Launch App nav item to extract.");
  }

  const ulWithoutLaunch = ulBlock.replace(launchNeedle, "").replace(/\n\s*\n/g, "\n");

  const navWithRight = navBlock.replace(
    ulBlock,
    `<div class="nav-right">
  ${ulWithoutLaunch}
  <div class="lang-switcher">
    <button type="button" class="lang-button" aria-label="Language" aria-haspopup="menu" aria-expanded="false">
      <span class="lang-code">EN</span>
      <span class="lang-caret" aria-hidden="true"></span>
    </button>
    <div class="lang-menu" role="menu" aria-label="Language" hidden>
      <button type="button" class="lang-menu-item" role="menuitem" data-lang="fr">
        <span>Français</span>
        <span class="lang-code">FR</span>
      </button>
      <button type="button" class="lang-menu-item" role="menuitem" data-lang="en">
        <span>English</span>
        <span class="lang-code">EN</span>
      </button>
    </div>
  </div>
  <a href="https://faro.solondev.com/chat/" class="nav-cta" target="_blank" rel="noopener noreferrer">Launch App</a>
</div>`,
  );

  out = out.slice(0, navStart) + navWithRight + out.slice(navEnd + "</nav>".length);
}

// 2b) Ensure language switcher is at the far right (after Launch App)
{
  const navStart = out.indexOf('<nav id="main-nav">');
  if (navStart !== -1) {
    const navEnd = out.indexOf("</nav>", navStart);
    if (navEnd !== -1) {
      const navBlock = out.slice(navStart, navEnd + "</nav>".length);
      const rightStart = navBlock.indexOf('<div class="nav-right">');
      if (rightStart !== -1) {
        const rightEnd = navBlock.lastIndexOf("</div>", navBlock.indexOf("</nav>"));
        if (rightEnd !== -1) {
          const rightBlock = navBlock.slice(rightStart, rightEnd + "</div>".length);

          const switcherStart = rightBlock.indexOf('<div class="lang-switcher">');
          const ctaStart = rightBlock.indexOf('<a href="https://faro.solondev.com/chat/" class="nav-cta"');

          if (switcherStart !== -1 && ctaStart !== -1 && switcherStart < ctaStart) {
            const switcherEnd = rightBlock.indexOf("</div>", switcherStart);
            if (switcherEnd === -1) {
              throw new Error("Could not find end of lang-switcher block.");
            }
            const switcherBlock = rightBlock.slice(switcherStart, switcherEnd + "</div>".length);

            const ctaEnd = rightBlock.indexOf("</a>", ctaStart);
            if (ctaEnd === -1) {
              throw new Error("Could not find end of nav-cta link.");
            }
            const ctaBlock = rightBlock.slice(ctaStart, ctaEnd + "</a>".length);

            let updated = rightBlock;
            updated = updated.replace(switcherBlock, "").replace(ctaBlock, "");

            const ulEnd = updated.indexOf("</ul>");
            if (ulEnd === -1) {
              throw new Error("Could not find </ul> inside nav-right.");
            }

            const head = updated.slice(0, ulEnd + "</ul>".length);
            const tail = updated.slice(ulEnd + "</ul>".length);
            const spacer = "\n  ";
            const rebuilt = head + spacer + ctaBlock + spacer + switcherBlock + tail;

            const rebuiltNavBlock = navBlock.replace(rightBlock, rebuilt);
            out =
              out.slice(0, navStart) +
              rebuiltNavBlock +
              out.slice(navEnd + "</nav>".length);
          }
        }
      }
    }
  }
}

// 2c) Remove `hidden` attribute on menu (we now use .open class)
out = out.replace(
  '<div class="lang-menu" role="menu" aria-label="Language" hidden>',
  '<div class="lang-menu" role="menu" aria-label="Language">',
);

// 2d) Ensure order inside `.nav-right`: links -> switcher -> CTA
{
  const needleCta =
    '<a href="https://faro.solondev.com/chat/" class="nav-cta" target="_blank" rel="noopener noreferrer">Launch App</a>';
  const needleSwitcherStart = '<div class="lang-switcher">';
  const rightStart = out.indexOf('<div class="nav-right">');
  const navEnd = rightStart === -1 ? -1 : out.indexOf("</nav>", rightStart);

  if (rightStart !== -1 && navEnd !== -1) {
    const navBlock = out.slice(rightStart, navEnd);
    const ctaIndex = navBlock.indexOf(needleCta);
    const switcherIndex = navBlock.indexOf(needleSwitcherStart);

    if (ctaIndex !== -1 && switcherIndex !== -1 && ctaIndex < switcherIndex) {
      const switcherEndRel = navBlock.indexOf("</div>", switcherIndex);
      if (switcherEndRel === -1) {
        throw new Error("Could not find end of lang-switcher block.");
      }
      const switcherBlock = navBlock.slice(
        switcherIndex,
        switcherEndRel + "</div>".length,
      );

      const before = navBlock.slice(0, ctaIndex);
      const between = navBlock.slice(ctaIndex + needleCta.length, switcherIndex);
      const after = navBlock.slice(switcherEndRel + "</div>".length);

      const rebuilt =
        before + switcherBlock + between + needleCta + after;

      out = out.slice(0, rightStart) + rebuilt + out.slice(navEnd);
    }
  }
}

// 3) Add/replace translation script
{
  const scriptBlock = `

<!-- FARO_LANG_SWITCHER v3 -->
<script>
(() => {
  const STORAGE_KEY = "faro-lang";

  const messages = {
    en: {
      nav: {
        what: "What Is Faro",
        how: "How It Works",
        cando: "What It Does",
        beta: "Beta",
        launch: "Launch App",
      },
      hero: {
        eyebrow: "Meet Faro — Your AI Business Location Companion",
        headlineHtml: "The smartest place to build your business<br>isn't a guess.<br><em>Faro knows.</em>",
        sub: "Faro is an AI companion that helps underrepresented entrepreneurs discover the best places to start and grow their businesses—based on real opportunity, not guesswork.",
        ask: "Ask Faro Now",
        action: "See Faro in Action →",
        promptLabel: "Try asking Faro →",
        promptItems: [
          "I'm launching a beauty brand—which U.S. cities have the best foot traffic and founder support?",
          "Compare Atlanta vs. Austin for a small logistics business—costs, taxes, and local incentives.",
          "Where do underrepresented tech founders raise capital fastest?",
        ],
        stats: ["U.S. Cities Covered", "Specialized AI Agents", "No Consultant Required", "Building in Public"],
      },
      problem: {
        label: "Why This Matters",
        headlineHtml: "The playing field was never level.<br><em>Faro levels your intelligence.</em>",
        bodyHtml: [
          "Underrepresented entrepreneurs don't lack ambition or talent. They lack access—to the right data, the right networks, and the insider knowledge that tells you <em style='color:rgba(247,244,239,0.9);font-style:italic'>where</em> your business is most likely to win.",
          "The wrong location choice costs founders years and capital they can't afford to lose. Most rely on gut feeling, word of mouth, or “best cities” lists built for someone else.",
        ],
        pullQuote: "We build the decision layer that tells underrepresented entrepreneurs where they are most likely to succeed—and connects them to the resources to do it.",
      },
      what: {
        label: "What Is Faro",
        headline: "Your AI companion for location intelligence that actually works for you.",
        paragraphsHtml: [
          "Ask Faro a question—by text or voice—and it draws on a deep, carefully curated mix of public datasets and hard-to-access sources to deliver answers built around your business, your stage, and your goals.",
          "<strong>Faro isn't a search engine. It's a decision layer.</strong>",
          "It interprets cost-of-living data, workforce statistics, business climate indicators, local tax structures, procurement pathways, equity and inclusion signals, and capital access data—then synthesizes them into clear recommendations with the context you need to act.",
          "Unlike generic rankings built for the average founder, Faro is built for founders who have been overlooked by those rankings. Every answer is calibrated to the realities underrepresented entrepreneurs actually face.",
        ],
        asideLabel: "Faro interprets",
        asideQuote: "“Not just what the data says—but what it means for you.”",
        tags: [
          "Cost of Living",
          "Workforce Stats",
          "Tax Structures",
          "Equity Signals",
          "Capital Access",
          "Procurement",
          "Inclusion Metrics",
          "Business Climate",
          "Community Wealth",
        ],
      },
      howItWorks: {
        label: "How It Works",
        headlineHtml: "Three steps to your <em>next smart move.</em>",
        steps: [
          { title: "Ask", body: "Type or speak your question in plain language. Tell Faro where you are, what you're building, and what decision you're trying to make." },
          { title: "Faro Gets to Work", body: "Faro routes your question through specialized AI agents—covering location strategy, market comparison, funding discovery, and network mapping—and synthesizes the results into one clear, coherent answer." },
          { title: "Act", body: "You get a ranked shortlist, a comparison, a funding lead, or a step-by-step action plan—whatever your question needs. Clear enough to act on today." },
        ],
        dataLabel: "Data Edge",
        dataParagraphs: [
          "Faro is built on open, public sources—government datasets, workforce statistics, cost indices, and verified incentive programs. But we don't stop there.",
          "We go the extra mile to unearth and access precious datasets that most platforms never touch: granular equity signals, hyperlocal business climate indicators, community wealth data, and inclusion metrics that reveal the lived experience of founders in each market.",
        ],
        examplePrompt:
          "“Compare Detroit vs. Charlotte for my construction services business—costs, incentives, and where I'm more likely to get government contracts.”",
      },
      canDo: {
        label: "What Faro Can Do",
        headlineHtml: "One AI companion.<br>Every location decision.",
        lead:
          "Faro handles the full range of questions underrepresented founders face when deciding where to build.",
        items: [
          { title: "Where to Start", body: "Best cities and states to launch, based on startup costs, regulatory ease, and founder-friendly ecosystems." },
          { title: "Where to Relocate", body: "Side-by-side city comparisons with cost, tax, and opportunity tradeoffs explained in plain language." },
          { title: "Where to Expand", body: "Markets sized and scored for your sector, stage, and growth goals—so you move with conviction." },
          { title: "How to Fund Your Move", body: "Grants, incentives, and capital pathways tied to your location and founder profile, ready to pursue immediately." },
          { title: "Who to Connect With", body: "Accelerators, mentors, community partners, and local programs matched to your business—because the right network changes everything." },
        ],
        closing:
          "And this is just the beginning. Faro gets smarter and more powerful with every question asked.",
      },
      beta: {
        label: "Beta",
        headlineHtml: "We're building Faro in public—<em>and we want you in the room.</em>",
        paragraphs: [
          "Faro is in early beta. That means you get access to a powerful AI companion that already delivers real answers to real location questions—while we continue to expand our data, sharpen our agents, and build the features founders have been asking for.",
          "Your questions make Faro better. Every conversation trains a smarter, more useful tool for the entire community.",
        ],
        cta: "Ask Faro Now — It's Free",
        note: "No account required · No consultant · No guesswork",
      },
      finalCta: {
        label: "Your Move",
        headlineHtml: "Your next move is your <em>most important one.</em>",
        sub: "Ask Faro where you're most likely to succeed—and what to do next.",
        button: "Ask Faro Now",
        micro: "Free to use · No consultant required · Built for founders like you",
      },
      footer: {
        tagline:
          "AI-powered location intelligence for underrepresented entrepreneurs. We build the decision layer that tells you where you're most likely to succeed—and connects you to the resources to do it.",
        links: ["Ask Faro", "Compare Cities", "Privacy", "Terms"],
      },
    },
    fr: {
      nav: {
        what: "Qu'est-ce que Faro",
        how: "Comment ça marche",
        cando: "Ce que Faro fait",
        beta: "Bêta",
        launch: "Lancer l'app",
      },
      hero: {
        eyebrow: "Découvrez Faro — votre compagnon IA pour l'implantation d'entreprise",
        headlineHtml: "Le meilleur endroit pour bâtir votre entreprise<br>n'est pas une intuition.<br><em>Faro le sait.</em>",
        sub: "Faro est un compagnon IA qui aide les entrepreneurs sous-représentés à trouver les meilleurs lieux pour lancer et développer leur activité — en s'appuyant sur de vraies opportunités, pas sur des suppositions.",
        ask: "Demander à Faro",
        action: "Voir Faro en action →",
        promptLabel: "Essayez de demander à Faro →",
        promptItems: [
          "Je lance une marque beauté — quelles villes des États-Unis offrent le meilleur trafic et le meilleur soutien aux fondateurs ?",
          "Compare Atlanta et Austin pour une petite entreprise logistique — coûts, taxes et incitations locales.",
          "Où les fondateurs tech sous-représentés lèvent-ils le plus vite ?",
        ],
        stats: ["Villes US couvertes", "Agents IA spécialisés", "Sans consultant", "Construction en public"],
      },
      problem: {
        label: "Pourquoi c'est important",
        headlineHtml: "Le terrain n'a jamais été égal.<br><em>Faro vous donne l'avantage informationnel.</em>",
        bodyHtml: [
          "Les entrepreneurs sous-représentés ne manquent ni d'ambition ni de talent. Ils manquent d'accès — aux bonnes données, aux bons réseaux et aux connaissances « insider » qui indiquent <em style='color:rgba(247,244,239,0.9);font-style:italic'>où</em> votre entreprise a le plus de chances de gagner.",
          "Un mauvais choix d'implantation coûte aux fondateurs des années et un capital qu'ils ne peuvent pas se permettre de perdre. La plupart s'en remettent à l'intuition, au bouche-à-oreille ou à des classements « meilleures villes » conçus pour quelqu'un d'autre.",
        ],
        pullQuote:
          "Nous construisons la couche de décision qui dit aux entrepreneurs sous-représentés où ils ont le plus de chances de réussir — et les connecte aux ressources pour y parvenir.",
      },
      what: {
        label: "Qu'est-ce que Faro",
        headline: "Votre compagnon IA pour une intelligence de localisation qui fonctionne vraiment pour vous.",
        paragraphsHtml: [
          "Posez une question à Faro — par texte ou voix — et l'outil s'appuie sur un mélange profond et soigneusement sélectionné de jeux de données publics et de sources difficiles d'accès pour fournir des réponses adaptées à votre business, votre stade et vos objectifs.",
          "<strong>Faro n'est pas un moteur de recherche. C'est une couche de décision.</strong>",
          "Faro interprète les données de coût de la vie, les statistiques de main-d'œuvre, les indicateurs de climat des affaires, les structures fiscales locales, les voies d'accès aux marchés publics, les signaux d'équité et d'inclusion, ainsi que l'accès au capital — puis les synthétise en recommandations claires avec le contexte nécessaire pour agir.",
          "Contrairement aux classements génériques conçus pour le fondateur « moyen », Faro est conçu pour les fondateurs que ces classements ont ignorés. Chaque réponse est calibrée sur les réalités que vivent réellement les entrepreneurs sous-représentés.",
        ],
        asideLabel: "Faro interprète",
        asideQuote: "« Pas seulement ce que disent les données — mais ce qu'elles signifient pour vous. »",
        tags: [
          "Coût de la vie",
          "Main-d'œuvre",
          "Fiscalité",
          "Signaux d'équité",
          "Accès au capital",
          "Marchés publics",
          "Inclusion",
          "Climat des affaires",
          "Richesse locale",
        ],
      },
      howItWorks: {
        label: "Comment ça marche",
        headlineHtml: "Trois étapes vers votre <em>prochaine décision intelligente.</em>",
        steps: [
          { title: "Demander", body: "Écrivez ou dictez votre question en langage simple. Dites à Faro où vous êtes, ce que vous construisez et quelle décision vous devez prendre." },
          { title: "Faro travaille", body: "Faro route votre question vers des agents IA spécialisés — stratégie d'implantation, comparaison de marchés, recherche de financement et cartographie de réseaux — puis synthétise le tout en une réponse claire et cohérente." },
          { title: "Agir", body: "Vous obtenez une shortlist classée, une comparaison, une piste de financement ou un plan d'action étape par étape — selon votre besoin. Suffisamment clair pour agir dès aujourd'hui." },
        ],
        dataLabel: "Avantage data",
        dataParagraphs: [
          "Faro s'appuie sur des sources publiques ouvertes — jeux de données gouvernementaux, statistiques de main-d'œuvre, indices de coûts et programmes d'incitations vérifiés. Mais nous n'en restons pas là.",
          "Nous allons plus loin pour dénicher et accéder à des données précieuses que la plupart des plateformes n'exploitent jamais : signaux d'équité granulaires, indicateurs hyperlocaux de climat des affaires, données de richesse communautaire et métriques d'inclusion qui révèlent l'expérience vécue des fondateurs dans chaque marché.",
        ],
        examplePrompt:
          "« Compare Detroit et Charlotte pour mon activité de services BTP — coûts, incitations et où j'ai le plus de chances d'obtenir des contrats publics. »",
      },
      canDo: {
        label: "Ce que Faro fait",
        headlineHtml: "Un compagnon IA.<br>Chaque décision d'implantation.",
        lead:
          "Faro couvre toute la gamme de questions auxquelles les fondateurs sous-représentés font face lorsqu'ils choisissent où construire.",
        items: [
          { title: "Où démarrer", body: "Les meilleures villes et États pour lancer, selon les coûts de démarrage, la facilité réglementaire et les écosystèmes favorables aux fondateurs." },
          { title: "Où se relocaliser", body: "Comparaisons ville par ville avec les arbitrages de coûts, taxes et opportunités expliqués en langage simple." },
          { title: "Où s'étendre", body: "Des marchés dimensionnés et scorés pour votre secteur, votre stade et vos objectifs de croissance — pour avancer avec conviction." },
          { title: "Financer le move", body: "Subventions, incitations et voies d'accès au capital liées à votre localisation et à votre profil, prêtes à être poursuivies immédiatement." },
          { title: "Qui contacter", body: "Accélérateurs, mentors, partenaires communautaires et programmes locaux adaptés à votre business — car le bon réseau change tout." },
        ],
        closing:
          "Et ce n'est que le début. Faro devient plus intelligent et plus puissant à chaque question posée.",
      },
      beta: {
        label: "Bêta",
        headlineHtml: "Nous construisons Faro en public — <em>et on veut vous avoir dans la boucle.</em>",
        paragraphs: [
          "Faro est en bêta précoce. Cela signifie que vous avez accès à un compagnon IA puissant qui délivre déjà de vraies réponses à de vraies questions d'implantation — pendant que nous continuons à enrichir nos données, affûter nos agents et construire les fonctionnalités demandées par les fondateurs.",
          "Vos questions rendent Faro meilleur. Chaque conversation entraîne un outil plus intelligent et plus utile pour toute la communauté.",
        ],
        cta: "Demander à Faro — c'est gratuit",
        note: "Aucun compte requis · Sans consultant · Sans devinette",
      },
      finalCta: {
        label: "Votre move",
        headlineHtml: "Votre prochain choix est votre <em>plus important.</em>",
        sub: "Demandez à Faro où vous avez le plus de chances de réussir — et quoi faire ensuite.",
        button: "Demander à Faro",
        micro: "Gratuit · Sans consultant · Conçu pour des fondateurs comme vous",
      },
      footer: {
        tagline:
          "Intelligence de localisation propulsée par l'IA pour les entrepreneurs sous-représentés. Nous construisons la couche de décision qui vous dit où vous avez le plus de chances de réussir — et vous connecte aux ressources pour y parvenir.",
        links: ["Demander à Faro", "Comparer des villes", "Confidentialité", "Conditions"],
      },
    },
  };

  function detectLang() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") return stored;
    return "en";
  }

  function setText(selector, text) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.textContent = text;
  }

  function setHtml(selector, html) {
    const el = document.querySelector(selector);
    if (!el) return;
    el.innerHTML = html;
  }

  function setAllText(selector, values) {
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach((el, index) => {
      if (typeof values[index] !== "string") return;
      el.textContent = values[index];
    });
  }

  function setAllHtml(selector, values) {
    const els = Array.from(document.querySelectorAll(selector));
    els.forEach((el, index) => {
      if (typeof values[index] !== "string") return;
      el.innerHTML = values[index];
    });
  }

  function apply(lang) {
    const dict = messages[lang] || messages.en;
    document.documentElement.lang = lang;

    // nav
    setText('a[href="#what"]', dict.nav.what);
    setText('a[href="#how"]', dict.nav.how);
    setText('a[href="#can-do"]', dict.nav.cando);
    setText('a[href="#beta"]', dict.nav.beta);
    setText('a.nav-cta', dict.nav.launch);

    // hero
    setText(".hero-eyebrow", dict.hero.eyebrow);
    setHtml(".hero-headline", dict.hero.headlineHtml);
    setText(".hero-sub", dict.hero.sub);
    setText('.hero-ctas .btn-primary', dict.hero.ask);
    setText('.hero-ctas .btn-ghost', dict.hero.action);
    setText(".prompt-label", dict.hero.promptLabel);
    setAllText(".prompt-item", dict.hero.promptItems);
    setAllText(".hero-stats .stat .stat-lbl", dict.hero.stats);

    // problem header
    setText("#problem .sec-label", dict.problem.label);
    setHtml("#problem .sec-headline", dict.problem.headlineHtml);
    setAllHtml("#problem .problem-body > p", dict.problem.bodyHtml);
    setText("#problem .pull-quote p", dict.problem.pullQuote);

    // what section
    setText("#what .sec-label", dict.what.label);
    setText("#what .what-text .sec-headline", dict.what.headline);
    setAllHtml("#what .what-text p", dict.what.paragraphsHtml);
    setText("#what .aside-label", dict.what.asideLabel);
    setText("#what .aside-quote", dict.what.asideQuote);
    setAllText("#what .tags .tag", dict.what.tags);

    // how it works
    setText("#how .sec-label", dict.howItWorks.label);
    setHtml("#how .sec-headline", dict.howItWorks.headlineHtml);
    setAllText("#how .step-title", dict.howItWorks.steps.map((s) => s.title));
    setAllText("#how .step-body", dict.howItWorks.steps.map((s) => s.body));
    setText("#how .data-strip-label", dict.howItWorks.dataLabel);
    setAllText("#how .data-strip-text p", dict.howItWorks.dataParagraphs);
    setText("#how .example-prompt p", dict.howItWorks.examplePrompt);

    // can do
    setText("#can-do .sec-label", dict.canDo.label);
    setHtml("#can-do .sec-headline", dict.canDo.headlineHtml);
    setText("#can-do .cando-header p.reveal", dict.canDo.lead);
    setAllText("#can-do .cando-title", dict.canDo.items.map((i) => i.title));
    setAllText("#can-do .cando-desc", dict.canDo.items.map((i) => i.body));
    setText("#can-do .cando-closing", dict.canDo.closing);

    // beta
    setText("#beta .sec-label", dict.beta.label);
    setHtml("#beta .sec-headline", dict.beta.headlineHtml);
    setAllText("#beta .beta-body p", dict.beta.paragraphs);
    setText("#beta .btn-beta", dict.beta.cta);
    setText("#beta .beta-note", dict.beta.note);

    // final cta
    setText("#final-cta .sec-label", dict.finalCta.label);
    setHtml("#final-cta .sec-headline", dict.finalCta.headlineHtml);
    setText("#final-cta .cta-sub", dict.finalCta.sub);
    setText('#final-cta a.btn-primary', dict.finalCta.button);
    setText("#final-cta .cta-micro", dict.finalCta.micro);

    // footer
    setText("footer .footer-tagline", dict.footer.tagline);
    setAllText("footer .footer-nav a", dict.footer.links);

    // switcher UI
    const switcher = document.querySelector(".lang-switcher");
    if (switcher) {
      const code = switcher.querySelector(".lang-button .lang-code");
      if (code) code.textContent = lang.toUpperCase();
      const items = switcher.querySelectorAll(".lang-menu-item[data-lang]");
      items.forEach((item) => {
        const itemLang = item.getAttribute("data-lang");
        if (itemLang === lang) item.setAttribute("aria-current", "true");
        else item.removeAttribute("aria-current");
      });
    }
  }

  function setLang(lang) {
    window.localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
  }

  function setupSwitcher() {
    const root = document.querySelector(".lang-switcher");
    if (!root) return;

    const button = root.querySelector(".lang-button");
    const menu = root.querySelector(".lang-menu");
    if (!button || !menu) return;

    function setOpen(open) {
      root.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    }

    button.addEventListener("click", (e) => {
      e.preventDefault();
      setOpen(!root.classList.contains("open"));
    });
    window.addEventListener("pointerdown", (e) => {
      if (!root.contains(e.target)) setOpen(false);
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    menu.querySelectorAll(".lang-menu-item[data-lang]").forEach((el) => {
      el.addEventListener("click", () => {
        const next = el.getAttribute("data-lang");
        if (next === "en" || next === "fr") setLang(next);
        setOpen(false);
      });
    });

    setOpen(false);
  }

  const initialLang = detectLang();
  setupSwitcher();
  apply(initialLang);
})();
</script>
`;

  out = replaceOrInsertScript(out, scriptBlock);
}

if (out === html) {
  console.log("No changes needed:", targetPath);
  process.exit(0);
}

await fs.writeFile(targetPath, out, "utf8");
console.log("Patched:", targetPath);

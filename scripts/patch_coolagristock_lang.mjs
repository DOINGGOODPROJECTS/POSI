import fs from "node:fs/promises";

const targetPath = process.argv[2];
if (!targetPath) {
  console.error("Usage: node patch_coolagristock_lang.mjs /path/to/index.html");
  process.exit(2);
}

const CSS_MARKER = "/* ─── LANGUAGE SWITCHER ─── */";
const SCRIPT_MARKER_PREFIX = "<!-- LANG_SWITCHER";

function mustReplace(source, searchValue, replaceValue, label) {
  if (!source.includes(searchValue)) {
    throw new Error(`Could not find ${label} marker in ${targetPath}`);
  }
  return source.replace(searchValue, replaceValue);
}

const input = await fs.readFile(targetPath, "utf8");
let output = input;

// 1) Add nav-right + switcher markup
if (!output.includes('class="lang-switcher"')) {
  const oldNavTail =
    '  </ul>\n  <a href="#download" class="nav-download">Download Free</a>\n</nav>';

  const newNavTail = `  </ul>
  <div class="nav-right">
    <a href="#download" class="nav-download">Download Free</a>
    <div class="lang-switcher">
      <button type="button" class="lang-button" aria-label="Language" aria-haspopup="menu" aria-expanded="false">
        <img class="lang-flag" src="" alt="" aria-hidden="true">
        <span class="lang-caret" aria-hidden="true"></span>
      </button>
      <div class="lang-menu" role="menu" aria-label="Language" hidden>
        <button type="button" class="lang-menu-item" role="menuitem" data-lang="fr">
          <img class="lang-flag" src="" alt="" aria-hidden="true">
          <span>Français</span>
        </button>
        <button type="button" class="lang-menu-item" role="menuitem" data-lang="en">
          <img class="lang-flag" src="" alt="" aria-hidden="true">
          <span>English</span>
        </button>
      </div>
    </div>
  </div>
</nav>`;

  output = mustReplace(output, oldNavTail, newNavTail, "nav tail");
}

// 2) Add CSS
if (!output.includes(CSS_MARKER)) {
  const injectionPoint = "  .nav-download:hover { background: var(--sage); }\n";
  const cssBlock = `${injectionPoint}

  ${CSS_MARKER}
  .nav-right {
    display: flex;
    align-items: center;
    gap: 0.9rem;
  }

  .lang-switcher { position: relative; }
  .lang-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(92,58,30,0.18);
    background: rgba(253, 250, 243, 0.92);
    padding: 7px 10px;
    border-radius: 12px;
    cursor: pointer;
    transition: background 0.2s, border-color 0.2s, transform 0.15s;
  }
  .lang-button:hover {
    background: rgba(253, 250, 243, 1);
    border-color: rgba(92,58,30,0.28);
    transform: translateY(-1px);
  }
  .lang-flag {
    width: 28px;
    height: 18px;
    border-radius: 7px;
    border: 1px solid rgba(92,58,30,0.14);
    display: block;
  }
  .lang-caret {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 6px solid rgba(92,58,30,0.7);
  }

  .lang-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    width: 190px;
    background: rgba(253, 250, 243, 0.98);
    border: 1px solid rgba(92,58,30,0.18);
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 18px 55px rgba(28, 18, 9, 0.18);
    z-index: 300;
  }
  .lang-menu-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 12px 12px;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.95rem;
    color: var(--bark);
    text-align: left;
  }
  .lang-menu-item:hover { background: rgba(232, 201, 122, 0.18); }
`;

  output = mustReplace(output, injectionPoint, cssBlock, "nav download hover rule");
}

function replaceOrInsertScript(html, scriptBlock) {
  const existingStart = html.indexOf(SCRIPT_MARKER_PREFIX);
  if (existingStart !== -1) {
    const endScript = html.indexOf("</script>", existingStart);
    if (endScript === -1) {
      throw new Error(`Could not find closing </script> for existing lang switcher in ${targetPath}`);
    }
    const end = endScript + "</script>".length;
    return html.slice(0, existingStart) + scriptBlock + html.slice(end);
  }

  if (!html.includes("\n</body>")) {
    throw new Error(`Could not find </body> tag in ${targetPath}`);
  }
  return html.replace("\n</body>", `${scriptBlock}\n</body>`);
}

// 3) Add/replace script (v2)
{
  const scriptBlock = `

<!-- LANG_SWITCHER v2 -->
<script>
(() => {
  const STORAGE_KEY = "coolagristock-lang";

  const svgFr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2"><rect width="1" height="2" x="0" y="0" fill="#0055a4"/><rect width="1" height="2" x="1" y="0" fill="#ffffff"/><rect width="1" height="2" x="2" y="0" fill="#ef4135"/></svg>';
  const svgUs = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 100"><rect width="190" height="100" fill="#b22234"/><g fill="#ffffff"><rect y="7.69" width="190" height="7.69"/><rect y="23.07" width="190" height="7.69"/><rect y="38.46" width="190" height="7.69"/><rect y="53.84" width="190" height="7.69"/><rect y="69.23" width="190" height="7.69"/><rect y="84.61" width="190" height="7.69"/></g><rect width="76" height="53.85" fill="#3c3b6e"/><g fill="#ffffff"><circle cx="8" cy="8" r="2"/><circle cx="20" cy="8" r="2"/><circle cx="32" cy="8" r="2"/><circle cx="44" cy="8" r="2"/><circle cx="56" cy="8" r="2"/><circle cx="68" cy="8" r="2"/><circle cx="14" cy="16" r="2"/><circle cx="26" cy="16" r="2"/><circle cx="38" cy="16" r="2"/><circle cx="50" cy="16" r="2"/><circle cx="62" cy="16" r="2"/><circle cx="8" cy="24" r="2"/><circle cx="20" cy="24" r="2"/><circle cx="32" cy="24" r="2"/><circle cx="44" cy="24" r="2"/><circle cx="56" cy="24" r="2"/><circle cx="68" cy="24" r="2"/><circle cx="14" cy="32" r="2"/><circle cx="26" cy="32" r="2"/><circle cx="38" cy="32" r="2"/><circle cx="50" cy="32" r="2"/><circle cx="62" cy="32" r="2"/><circle cx="8" cy="40" r="2"/><circle cx="20" cy="40" r="2"/><circle cx="32" cy="40" r="2"/><circle cx="44" cy="40" r="2"/><circle cx="56" cy="40" r="2"/><circle cx="68" cy="40" r="2"/><circle cx="14" cy="48" r="2"/><circle cx="26" cy="48" r="2"/><circle cx="38" cy="48" r="2"/><circle cx="50" cy="48" r="2"/><circle cx="62" cy="48" r="2"/></g></svg>';

  const flags = {
    en: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgUs),
    fr: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgFr),
  };

  const messages = {
    en: {
      nav: {
        problem: "Problem",
        who: "Who it serves",
        features: "Features",
        oss: "Open source",
        outcomes: "Expected outcomes",
        download: "Download Free",
      },
      hero: {
        titleHtml: 'Warehouse intelligence<br>for the farmers and<br><span class="line-accent">small traders who feed us</span>',
        sub: "COOL AGRISTOCK is a free, open-source warehouse management platform that brings AI-powered inventory visibility to farmer cooperatives and agricultural SMEs — the actors most exposed to post-harvest loss, and the least served by digital tools.",
        primary: "Download Free",
        secondary: "See how it works →",
        badges: [
          "Free & Open-Source",
          "AI / ML Enabled",
          "SMS Native",
          "Low-Bandwidth Ready",
          "Federated Learning",
        ],
        stats: ["Post-harvest losses through proactive monitoring", "No licensing cost — free forever"],
      },
      language: {
        label: "Language",
        fr: "Français",
        en: "English",
      },
      problem: {
        tag: "The reality on the ground",
        titleHtml: 'Physical storage exists.<br><em>Digital management does not.</em>',
        quote:
          '"Warehouses sit full of produce while managers run on memory and paper — and both betray them."',
        pointsHtml: [
          "<strong>No reliable inventory records.</strong> Cooperatives and small traders track stock by hand, with no consistent record of what is stored, for whom, in what condition, or for how long.",
          "<strong>Hidden losses accumulate silently.</strong> Without early warning systems, spoilage and quality degradation go undetected until the damage is done and margins are gone.",
          "<strong>Weak accountability creates disputes.</strong> Farmers can't verify what's stored on their behalf. Managers can't prove what happened. Trust breaks down and collective action fails.",
          "<strong>Commercial tools are built for other worlds.</strong> Enterprise WMS software assumes reliable internet, hardware budgets, and IT teams — none of which exist in rural West Africa.",
        ],
      },
      who: {
        tag: "Who it serves",
        titleHtml: "Built for those <em>with most to lose</em>",
        cards: [
          {
            title: "Farmer cooperatives",
            desc: "Producer groups managing shared warehouses on behalf of member farmers — where accountability between farmers and managers is often fragile and paper-based. COOL AGRISTOCK gives them the digital infrastructure of an industrial operator, free.",
            tag: "Collective storage",
          },
          {
            title: "Agricultural SMEs & traders",
            desc: "Small traders, collectors, and rural processors who buy, store, and resell harvest-season crops. Operating on thin margins where a single spoilage event can be catastrophic — and who have never had access to a system like this.",
            tag: "Rural commerce",
          },
          {
            title: "Input & commodity traders",
            desc: "Small enterprises handling seeds, fertilizers, or raw commodities across seasonal cycles — with no system to track what stock is aging, at risk, or ready to move. COOL AGRISTOCK replaces the notebook with intelligent visibility.",
            tag: "Input supply chains",
          },
          {
            title: "Development programs & DFIs",
            desc: "NGOs, programs, and investors building or funding agricultural storage infrastructure who need a deployable digital layer for their beneficiaries — free, auditable, locally adaptable, and built to scale without licensing risk.",
            tag: "Finance & programs",
          },
        ],
      },
      features: {
        tag: "What it does",
        titleHtml: "Six capabilities.<br><em>One platform.</em>",
        lead:
          "From real-time inventory to AI-driven spoilage alerts and SMS balance queries — COOL AGRISTOCK replaces the paper register with end-to-end warehouse intelligence, engineered for the conditions that actually exist.",
        items: [
          {
            name: "AI shelf-life & spoilage alerts",
            text: "ML models assess degradation risk by crop type, time in storage, and historical patterns — triggering alerts before losses occur, not after.",
          },
          {
            name: "Real-time inventory tracking",
            text: "Know what is in stock, for which depositor, at what quantity — with a full tamper-resistant audit trail replacing paper registers.",
          },
          {
            name: "Seasonal release planning",
            text: "Anticipate peak periods and plan collective sales windows to maximize price and minimize spoilage during harvest surges.",
          },
          {
            name: "SMS stock queries",
            text: "Depositors check balances and storage status by SMS in plain language — no smartphone, no app, no training required.",
          },
          {
            name: "Manager performance insights",
            text: "Automated dashboards on loss rates, turnover speed, and utilization — governance by evidence, not memory.",
          },
          {
            name: "Low-bandwidth design",
            text: "Engineered for rural connectivity — lightweight transfers and SMS fallback keep operations running on the most constrained networks.",
          },
        ],
      },
      outcomes: {
        tag: "Expected outcomes",
        titleHtml: "Less loss.<br>More income.<br><em>More trust.</em>",
        lead:
          "By digitizing and intelligently managing warehouse operations, COOL AGRISTOCK addresses the full chain of consequences that flow from invisible, unmanaged storage.",
        labels: [
          "Post-harvest losses through proactive monitoring and early alerts",
          "Income stability for farmers and small traders through better sales timing",
          "Accountability and trust between depositors and cooperative managers",
          "Food waste and its environmental and economic footprint",
        ],
      },
      oss: {
        tag: "Open-source infrastructure",
        titleHtml: "Locally adaptable.<br><em>Collectively intelligent.</em>",
        lead:
          "COOL AGRISTOCK is freely auditable and adaptable across crops, regions, and business models. Its learning models improve through federated learning — cooperatives and SMEs contribute to shared intelligence without ever exposing raw data. Development partners and governments can integrate, extend, and fund without proprietary lock-in.",
        pillars: [
          {
            title: "Free forever, zero lock-in",
            text: "No licensing fees, no vendor dependency. The full codebase is open on GitHub — deploy, modify, and audit without restriction.",
          },
          {
            title: "Federated learning across deployments",
            text: "Each cooperative and SME that deploys the platform makes the AI models smarter — shared intelligence without shared data.",
          },
          {
            title: "Adaptable across crops and regions",
            text: "Configurable for any crop type, storage context, or region. Already designed for West Africa, ready for anywhere.",
          },
        ],
      },
      getStarted: {
        tag: "Get started",
        titleHtml: "Free to deploy.<br><em>Free forever.</em>",
        lead:
          "No procurement process. No licensing fee. No IT department required. Share a few details and download COOL AGRISTOCK — ready to configure for your warehouse in days, not months.",
        trustHtml: [
          "<strong>No license cost, ever</strong>Open-source release on GitHub. Deploy for one warehouse or one hundred.",
          "<strong>Your data stays yours</strong>We collect only contact details for product updates and impact learning.",
          "<strong>Built with the field in mind</strong>Developed from Côte d'Ivoire, tested in real cooperative and SME contexts across West Africa.",
        ],
        form: {
          title: "Download COOL AGRISTOCK",
          sub: "A free, open-source warehouse management platform for cooperatives and agricultural SMEs.",
          labels: [
            "Full name *",
            "Email *",
            "Phone / SMS *",
            "Organization",
            "Organization type *",
            "Country & city *",
          ],
          placeholders: {
            name: "Your name",
            email: "you@organization.org",
            phone: "+225 ...",
            org: "Organization name",
            country: "e.g. Abidjan, Côte d'Ivoire",
          },
          typeOptions: [
            "Select one…",
            "Farmer cooperative",
            "Agricultural SME / trader",
            "Input supplier",
            "NGO / Development program",
            "Government",
            "Research institution",
            "Funder / Investor",
            "Other",
          ],
          consent:
            "I agree to be contacted for software updates and product feedback. This information is used only for impact learning and product improvement.",
          submit: "Download COOL AGRISTOCK",
          note: "FREE & OPEN-SOURCE · GITHUB RELEASE · NO LICENSE REQUIRED",
          success: {
            title: "Your download is starting.",
            body: "Thank you. We'll be in touch with setup guidance and product updates.",
            link: "Click here if it doesn't start automatically ↓",
          },
        },
      },
      footer: {
        centerHtml:
          'COOL AGRISTOCK is a product of <strong style="color:var(--straw);font-weight:500;">Solon</strong>, the mission-minded software development firm.<br>Free to use. Free to deploy. Built for impact.',
      },
    },
    fr: {
      nav: {
        problem: "Problème",
        who: "À qui ça sert",
        features: "Fonctionnalités",
        oss: "Open source",
        outcomes: "Résultats",
        download: "Télécharger",
      },
      hero: {
        titleHtml: "Intelligence d'entrepôt<br>pour les agriculteurs et<br><span class=\"line-accent\">les petits commerçants qui nous nourrissent</span>",
        sub: "COOL AGRISTOCK est une plateforme gratuite et open source de gestion d’entrepôt, qui apporte une visibilité d’inventaire augmentée par l’IA aux coopératives agricoles et aux PME — les acteurs les plus exposés aux pertes post-récolte et les moins servis par les outils numériques.",
        primary: "Télécharger",
        secondary: "Voir comment ça marche →",
        badges: [
          "Gratuit & open source",
          "IA / ML",
          "SMS natif",
          "Faible bande passante",
          "Apprentissage fédéré",
        ],
        stats: ["Réduction des pertes post-récolte grâce au suivi proactif", "Aucun coût de licence — gratuit pour toujours"],
      },
      language: {
        label: "Langue",
        fr: "Français",
        en: "English",
      },
      problem: {
        tag: "La réalité sur le terrain",
        titleHtml: "Le stockage physique existe.<br><em>La gestion numérique, non.</em>",
        quote:
          '"Les entrepôts se remplissent tandis que les gestionnaires fonctionnent à la mémoire et au papier — et les deux finissent par les trahir."',
        pointsHtml: [
          "<strong>Aucun registre d’inventaire fiable.</strong> Les coopératives et petits commerçants suivent les stocks à la main, sans trace cohérente de ce qui est stocké, pour qui, dans quel état, ni depuis combien de temps.",
          "<strong>Les pertes invisibles s’accumulent.</strong> Sans systèmes d’alerte, les avaries et la dégradation de qualité passent inaperçues jusqu’à ce qu’il soit trop tard et que les marges disparaissent.",
          "<strong>Une faible redevabilité crée des conflits.</strong> Les agriculteurs ne peuvent pas vérifier ce qui est stocké pour eux. Les gestionnaires ne peuvent pas prouver ce qui s’est passé. La confiance se brise et l’action collective échoue.",
          "<strong>Les outils commerciaux sont faits pour d’autres réalités.</strong> Les logiciels WMS d’entreprise supposent un internet fiable, des budgets matériel et des équipes IT — inexistants en zones rurales d’Afrique de l’Ouest.",
        ],
      },
      who: {
        tag: "À qui ça sert",
        titleHtml: "Conçu pour celles et ceux <em>qui ont le plus à perdre</em>",
        cards: [
          {
            title: "Coopératives agricoles",
            desc: "Groupes de producteurs gérant des entrepôts partagés pour leurs membres — où la redevabilité entre agriculteurs et gestionnaires est souvent fragile et basée sur le papier. COOL AGRISTOCK leur offre gratuitement l’infrastructure numérique d’un opérateur industriel.",
            tag: "Stockage collectif",
          },
          {
            title: "PME agricoles & commerçants",
            desc: "Petits commerçants, collecteurs et transformateurs ruraux qui achètent, stockent et revendent des cultures saisonnières. Ils opèrent avec des marges faibles où un seul épisode de détérioration peut être catastrophique — et n’ont jamais eu accès à un système comme celui-ci.",
            tag: "Commerce rural",
          },
          {
            title: "Intrants & négociants",
            desc: "Petites entreprises gérant des semences, engrais ou matières premières sur des cycles saisonniers — sans système pour savoir quels stocks vieillissent, sont à risque ou prêts à sortir. COOL AGRISTOCK remplace le cahier par une visibilité intelligente.",
            tag: "Chaînes d’approvisionnement",
          },
          {
            title: "Programmes & finance du développement",
            desc: "ONG, programmes et investisseurs finançant des infrastructures de stockage qui ont besoin d’une couche numérique déployable pour leurs bénéficiaires — gratuite, auditable, adaptable localement et scalable sans risque de licences.",
            tag: "Financement & programmes",
          },
        ],
      },
      features: {
        tag: "Ce que ça fait",
        titleHtml: "Six capacités.<br><em>Une plateforme.</em>",
        lead:
          "De l’inventaire en temps réel aux alertes de détérioration pilotées par l’IA et aux requêtes SMS — COOL AGRISTOCK remplace le registre papier par une intelligence d’entrepôt de bout en bout, conçue pour les contraintes du terrain.",
        items: [
          {
            name: "Alertes IA de durée de vie & détérioration",
            text: "Des modèles ML évaluent le risque par type de culture, durée en stockage et historiques — et déclenchent des alertes avant les pertes, pas après.",
          },
          {
            name: "Suivi d’inventaire en temps réel",
            text: "Savoir ce qui est en stock, pour quel déposant, et en quelle quantité — avec une piste d’audit robuste qui remplace les registres papier.",
          },
          {
            name: "Planification des sorties saisonnières",
            text: "Anticiper les pics et planifier des fenêtres de vente collectives pour maximiser le prix et minimiser la détérioration pendant les afflux de récolte.",
          },
          {
            name: "Requêtes de stock par SMS",
            text: "Les déposants vérifient soldes et statut par SMS en langage simple — sans smartphone, sans app, sans formation.",
          },
          {
            name: "Indicateurs de performance des gestionnaires",
            text: "Tableaux de bord automatisés sur pertes, vitesse de rotation et utilisation — une gouvernance par la preuve, pas par la mémoire.",
          },
          {
            name: "Design faible bande passante",
            text: "Conçu pour la connectivité rurale — transferts légers et fallback SMS pour rester opérationnel sur les réseaux les plus contraints.",
          },
        ],
      },
      outcomes: {
        tag: "Résultats attendus",
        titleHtml: "Moins de pertes.<br>Plus de revenus.<br><em>Plus de confiance.</em>",
        lead:
          "En numérisant et en pilotant intelligemment les opérations, COOL AGRISTOCK traite toute la chaîne de conséquences liée à un stockage invisible et non géré.",
        labels: [
          "Pertes post-récolte grâce au suivi proactif et aux alertes précoces",
          "Stabilité des revenus grâce à un meilleur timing de vente",
          "Redevabilité et confiance entre déposants et gestionnaires",
          "Gaspillage alimentaire et son empreinte environnementale et économique",
        ],
      },
      oss: {
        tag: "Infrastructure open source",
        titleHtml: "Adaptable localement.<br><em>Intelligente collectivement.</em>",
        lead:
          "COOL AGRISTOCK est librement auditable et adaptable à différents produits, régions et modèles économiques. Ses modèles s’améliorent via l’apprentissage fédéré — les coopératives et PME contribuent à une intelligence partagée sans exposer de données brutes. Les partenaires et gouvernements peuvent intégrer, étendre et financer sans verrou propriétaire.",
        pillars: [
          {
            title: "Gratuit pour toujours, sans verrou",
            text: "Aucun frais de licence, aucune dépendance fournisseur. Le code est ouvert sur GitHub — déployer, modifier et auditer sans restriction.",
          },
          {
            title: "Apprentissage fédéré entre déploiements",
            text: "Chaque coopérative/PME qui déploie la plateforme rend les modèles IA plus intelligents — intelligence partagée sans données partagées.",
          },
          {
            title: "Adaptable à toutes cultures et régions",
            text: "Configurable pour tout type de culture, contexte de stockage ou région. Conçu pour l’Afrique de l’Ouest, prêt pour partout.",
          },
        ],
      },
      getStarted: {
        tag: "Démarrer",
        titleHtml: "Gratuit à déployer.<br><em>Gratuit pour toujours.</em>",
        lead:
          "Aucun processus d’achat. Aucun frais de licence. Aucun département IT requis. Partagez quelques informations et téléchargez COOL AGRISTOCK — prêt à configurer pour votre entrepôt en quelques jours, pas en quelques mois.",
        trustHtml: [
          "<strong>Aucun coût de licence, jamais</strong>Publication open source sur GitHub. Déployez pour un entrepôt ou cent.",
          "<strong>Vos données restent les vôtres</strong>Nous collectons uniquement des coordonnées pour les mises à jour et l’apprentissage d’impact.",
          "<strong>Conçu pour le terrain</strong>Développé depuis la Côte d'Ivoire, testé en conditions réelles dans des coopératives et PME en Afrique de l’Ouest.",
        ],
        form: {
          title: "Télécharger COOL AGRISTOCK",
          sub: "Une plateforme gratuite et open source de gestion d’entrepôt pour coopératives et PME agricoles.",
          labels: [
            "Nom complet *",
            "Email *",
            "Téléphone / SMS *",
            "Organisation",
            "Type d’organisation *",
            "Pays & ville *",
          ],
          placeholders: {
            name: "Votre nom",
            email: "vous@organisation.org",
            phone: "+225 ...",
            org: "Nom de l'organisation",
            country: "ex. Abidjan, Côte d'Ivoire",
          },
          typeOptions: [
            "Choisir…",
            "Coopérative agricole",
            "PME agricole / commerçant",
            "Fournisseur d’intrants",
            "ONG / Programme de développement",
            "Gouvernement",
            "Institution de recherche",
            "Bailleur / Investisseur",
            "Autre",
          ],
          consent:
            "J’accepte d’être contacté(e) pour les mises à jour du logiciel et les retours produit. Ces informations sont utilisées uniquement pour l’apprentissage d’impact et l’amélioration du produit.",
          submit: "Télécharger COOL AGRISTOCK",
          note: "GRATUIT & OPEN SOURCE · VERSION GITHUB · AUCUNE LICENCE REQUISE",
          success: {
            title: "Votre téléchargement démarre.",
            body: "Merci. Nous vous contacterons avec des conseils d’installation et des mises à jour produit.",
            link: "Cliquez ici si cela ne démarre pas automatiquement ↓",
          },
        },
      },
      footer: {
        centerHtml:
          'COOL AGRISTOCK est un produit de <strong style="color:var(--straw);font-weight:500;">Solon</strong>, une entreprise de développement logiciel orientée impact.<br>Gratuit à utiliser. Gratuit à déployer. Conçu pour l’impact.',
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

    setText('a[href="#problem"]', dict.nav.problem);
    setText('a[href="#who"]', dict.nav.who);
    setText('a[href="#features"]', dict.nav.features);
    setText('a[href="#open-source"]', dict.nav.oss);
    setText(".nav-download", dict.nav.download);

    const heroTitle = document.querySelector(".hero-title");
    if (heroTitle) heroTitle.innerHTML = dict.hero.titleHtml;

    setText(".hero-sub", dict.hero.sub);

    const primary = document.querySelector(".hero-actions .btn-primary");
    if (primary) {
      const svg = primary.querySelector("svg");
      const svgHtml = svg ? svg.outerHTML : "";
      primary.innerHTML = svgHtml + " " + dict.hero.primary;
    }
    setText(".hero-actions .btn-secondary", dict.hero.secondary);

    // hero right: badges + stat labels
    setAllText(".badge-strip .badge", dict.hero.badges || []);
    setAllText(".stat-row .stat-card .stat-label", dict.hero.stats || []);

    // sections
    setText("#problem .section-tag", dict.problem.tag);
    setHtml("#problem .section-title", dict.problem.titleHtml);
    setText("#problem .problem-quote", dict.problem.quote);
    setAllHtml("#problem .problem-point p", dict.problem.pointsHtml);

    setText("#who .section-tag", dict.who.tag);
    setHtml("#who .section-title", dict.who.titleHtml);
    const whoCards = Array.from(document.querySelectorAll("#who .who-card"));
    whoCards.forEach((card, index) => {
      const data = (dict.who.cards || [])[index];
      if (!data) return;
      const title = card.querySelector(".who-title");
      const desc = card.querySelector(".who-desc");
      const tag = card.querySelector(".who-tag");
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      if (tag) tag.textContent = data.tag;
    });

    setText("#features .features-header .section-tag", dict.features.tag);
    setHtml("#features .features-header .section-title", dict.features.titleHtml);
    setText("#features .features-header .section-lead", dict.features.lead);
    const featureCards = Array.from(document.querySelectorAll("#features .feature-card"));
    featureCards.forEach((card, index) => {
      const item = (dict.features.items || [])[index];
      if (!item) return;
      const name = card.querySelector(".feature-name");
      const text = card.querySelector(".feature-text");
      if (name) name.textContent = item.name;
      if (text) text.textContent = item.text;
    });

    setText("#outcomes .section-tag", dict.outcomes.tag);
    setHtml("#outcomes .section-title", dict.outcomes.titleHtml);
    setText("#outcomes .section-lead", dict.outcomes.lead);
    setAllText("#outcomes .outcome-label", dict.outcomes.labels);

    setText("#open-source .section-tag", dict.oss.tag);
    setHtml("#open-source .section-title", dict.oss.titleHtml);
    setText("#open-source .section-lead", dict.oss.lead);
    const ossPillars = Array.from(document.querySelectorAll("#open-source .oss-pillar"));
    ossPillars.forEach((pillar, index) => {
      const data = (dict.oss.pillars || [])[index];
      if (!data) return;
      const title = pillar.querySelector(".oss-pillar-title");
      const text = pillar.querySelector(".oss-pillar-text");
      if (title) title.textContent = data.title;
      if (text) text.textContent = data.text;
    });

    setText("#download .section-tag", dict.getStarted.tag);
    setHtml("#download .section-title", dict.getStarted.titleHtml);
    setText("#download .section-lead", dict.getStarted.lead);
    setAllHtml("#download .trust-item p", dict.getStarted.trustHtml);

    setText("#form-wrapper h3", dict.getStarted.form.title);
    setText("#form-wrapper p.sub", dict.getStarted.form.sub);

    const fieldLabels = Array.from(document.querySelectorAll("#form-wrapper .field label"));
    fieldLabels.forEach((label, index) => {
      if (typeof dict.getStarted.form.labels[index] !== "string") return;
      label.textContent = dict.getStarted.form.labels[index];
    });

    const nameInput = document.getElementById("f-name");
    const emailInput = document.getElementById("f-email");
    const phoneInput = document.getElementById("f-phone");
    const orgInput = document.getElementById("f-org");
    const countryInput = document.getElementById("f-country");
    if (nameInput) nameInput.setAttribute("placeholder", dict.getStarted.form.placeholders.name);
    if (emailInput) emailInput.setAttribute("placeholder", dict.getStarted.form.placeholders.email);
    if (phoneInput) phoneInput.setAttribute("placeholder", dict.getStarted.form.placeholders.phone);
    if (orgInput) orgInput.setAttribute("placeholder", dict.getStarted.form.placeholders.org);
    if (countryInput) countryInput.setAttribute("placeholder", dict.getStarted.form.placeholders.country);

    const typeSelect = document.getElementById("f-type");
    if (typeSelect) {
      const options = Array.from(typeSelect.querySelectorAll("option"));
      options.forEach((opt, index) => {
        if (typeof dict.getStarted.form.typeOptions[index] !== "string") return;
        opt.textContent = dict.getStarted.form.typeOptions[index];
      });
    }

    const consent = document.querySelector('label[for="f-consent"]');
    if (consent) consent.textContent = dict.getStarted.form.consent;

    const submit = document.querySelector(".submit-btn");
    if (submit) {
      const svg = submit.querySelector("svg");
      const svgHtml = svg ? svg.outerHTML : "";
      submit.innerHTML = svgHtml + " " + dict.getStarted.form.submit;
    }
    setText(".form-note", dict.getStarted.form.note);

    setText("#success-state h4", dict.getStarted.form.success.title);
    setText("#success-state p", dict.getStarted.form.success.body);
    setText("#success-state a", dict.getStarted.form.success.link);

    setHtml(".footer-center", dict.footer.centerHtml);

    const root = document.querySelector(".lang-switcher");
    if (!root) return;

    const button = root.querySelector(".lang-button");
    const menu = root.querySelector(".lang-menu");
    const buttonFlag = root.querySelector(".lang-button .lang-flag");
    if (button) {
      button.setAttribute("aria-label", dict.language.label);
    }
    if (menu) {
      menu.setAttribute("aria-label", dict.language.label);
    }
    if (buttonFlag && buttonFlag.tagName === "IMG") {
      buttonFlag.src = flags[lang];
    }

    const itemFr = root.querySelector('.lang-menu-item[data-lang="fr"]');
    const itemEn = root.querySelector('.lang-menu-item[data-lang="en"]');
    if (itemFr) {
      const span = itemFr.querySelector("span");
      if (span) span.textContent = dict.language.fr;
      const img = itemFr.querySelector("img");
      if (img) img.src = flags.fr;
    }
    if (itemEn) {
      const span = itemEn.querySelector("span");
      if (span) span.textContent = dict.language.en;
      const img = itemEn.querySelector("img");
      if (img) img.src = flags.en;
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
      menu.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
    }

    button.addEventListener("click", () => {
      setOpen(menu.hidden);
    });

    window.addEventListener("pointerdown", (e) => {
      if (!root.contains(e.target)) setOpen(false);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });

    menu.querySelectorAll(".lang-menu-item[data-lang]").forEach((el) => {
      el.addEventListener("click", () => {
        const lang = el.getAttribute("data-lang");
        if (lang === "en" || lang === "fr") setLang(lang);
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
  output = replaceOrInsertScript(output, scriptBlock);
}

if (output === input) {
  console.log("No changes needed:", targetPath);
  process.exit(0);
}

await fs.writeFile(targetPath, output, "utf8");
console.log("Patched:", targetPath);

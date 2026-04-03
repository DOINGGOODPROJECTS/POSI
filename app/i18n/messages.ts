export type Lang = "en" | "fr";

const en = {
  nav: {
    problem: "Problem",
    protocol: "Protocol",
    how: "How It Works",
    impact: "Impact",
    capital: "Capital",
    litepaper: "Litepaper",
  },
  hero: {
    tag: "Power Stewardship Initiative",
    h1Line1: "Onchain Accountability",
    h1Line2Prefix: "for",
    h1Line2Accent: "Real-World",
    h1Line3: "Energy Infrastructure",
    sub:
      "POSI is a mission-locked stewardship platform that embeds a standardized, blockchain-anchored performance protocol into privatized electricity distribution utilities across frontier markets — bridging institutional governance reform with verifiable onchain transparency.",
    explore: "Explore the Protocol",
    download: "Download Litepaper",
    stats: {
      dimensionsValue: "4",
      dimensionsLabel: "Protocol Dimensions",
      horizonValue: "10–20yr",
      horizonLabel: "Alignment Horizon",
      marketsValue: "Africa / Asia",
      marketsLabel: "Target Markets",
    },
  },
  problem: {
    tag: "// The Institutional Gap",
    h2Line1: "Distribution utilities aren't failing",
    h2Line2: "for lack of technology.",
    lead:
      "Across Africa and Asia, privatized and concession-based utilities struggle with institutional dysfunction — not generation shortfalls. The missing layer is disciplined governance, long-term performance accountability, and verifiable transparency.",
    cells: {
      lossesTitle: "High Technical & Commercial Losses",
      lossesBody:
        "Persistent infrastructure degradation and metering failures drain 20–40% of distributed electricity, destroying financial sustainability before any renewable ambition can take hold.",
      governanceTitle: "Weak Governance Discipline",
      governanceBody:
        "Even where privatization structures exist, board oversight is fragmented, long-term strategy inconsistent, and institutional incentives misaligned with reliability or energy transition targets.",
      accountabilityTitle: "No Standardized Accountability",
      accountabilityBody:
        'There is no common language for what "performing" means across frontier market utilities. Capital providers, regulators, and governments operate without a shared, verifiable performance baseline.',
      mismatchTitle: "Short-Term Capital Mismatch",
      mismatchBody:
        "Infrastructure assets demand 10–20 year commitment horizons. Most available capital is structured for short cycles, creating a chronic mismatch that prevents durable institutional reform.",
    },
  },
  protocol: {
    tag: "// The POSI Protocol",
    h2Line1: "A standardized stewardship protocol,",
    h2Line2: "anchored immutably onchain.",
    lead:
      "The POSI Stewardship Protocol is the first standardized, blockchain-anchored governance framework designed specifically for distribution utilities in frontier markets. It defines, measures, and publicly verifies institutional improvement across four core dimensions — creating a replicable accountability layer that travels with capital.",
    pillars: {
      p1Title: "Operational Reliability",
      p1Desc:
        "Reduction of technical and commercial losses, improved maintenance execution, expanded service connections and uptime discipline.",
      p2Title: "Financial Sustainability",
      p2Desc:
        "Revenue collection improvement, cost recovery rates, disciplined capital allocation and long-term balance sheet integrity.",
      p3Title: "Transition Readiness",
      p3Desc:
        "Gradual shift of capex toward grid strengthening and renewable integration; tracked reduction in diesel dependence over reporting cycles.",
      p4Title: "Governance Quality",
      p4Desc:
        "Board oversight practices, planning transparency, consistency of long-term strategy, and documented accountability to defined KPIs.",
    },
    chain: {
      header: "Onchain Attestation Registry — Live",
      b1Label: "Attestation #0047 · Q1 2025",
      b1Data:
        "UTILITY: West Africa Dist. Co. · PROTOCOL v1.2\nTECHNICAL LOSS: 21.3% → 18.4% ↓ VERIFIED",
      b2Label: "Attestation #0031 · Q3 2024",
      b2Data:
        "UTILITY: West Africa Dist. Co. · PROTOCOL v1.1\nCOLLECTION RATE: 68.1% → 72.6% ↑ VERIFIED",
      b3Label: "Attestation #0018 · Q1 2024",
      b3Data:
        "UTILITY: West Africa Dist. Co. · PROTOCOL v1.0\nBASELINE ESTABLISHED · GOVERNANCE SCORE: C+",
      noteStrong: "Architecture:",
      note:
        "Performance disclosures are cryptographically hashed and timestamped onchain. Supporting documentation remains off-chain. The blockchain serves as a permanent integrity and comparability layer — not a financial instrument.",
    },
  },
  how: {
    tag: "// Mechanism",
    h2: "Protocol + Equity + Chain.",
    lead:
      "Three interlocking elements create an enforceable model of institutional reform. Each reinforces the others — removing the systemic gaps that have historically kept governance reform advisory rather than binding.",
    steps: {
      s1TitlePrefix: "Define Stewardship",
      s1TitleAccent: "Onchain",
      s1Body:
        "The POSI Protocol publishes a standardized, versioned set of performance indicators for distribution utilities. Each reporting cycle, attestations are anchored onchain via cryptographic hashes — creating an immutable, comparable accountability registry.",
      s2TitlePrefix: "Acquire",
      s2TitleAccent: "Minority Equity",
      s2Body:
        "POSI takes strategic minority positions in privatized or concession-based utilities, structured to secure board representation or formal shareholder influence. The equity position creates enforcement leverage. Without it, the protocol risks being advisory. Without the protocol, the equity risks being passive.",
      s3TitlePrefix: "Drive",
      s3TitleAccent: "Institutional Reform",
      s3Body:
        "Through governance engagement, POSI aligns management and board strategy with protocol KPIs — spanning loss reduction, financial discipline, renewable integration, and transparency. Performance evolution is documented, verified, and publicly attested each cycle.",
    },
  },
  audience: {
    tag: "// Who This Is For",
    h2Line1: "Built for two worlds.",
    h2Line2: "Operating in one.",
    lead:
      "POSI speaks fluently to blockchain and digital capital communities while delivering institutional credibility to regulators, governments, and utility operators. No tokenized securities. No speculative instruments. Just real-world performance, verifiably recorded.",
    crypto: {
      title: "Blockchain & Digital Capital Leaders",
      body:
        "POSI is a real-world asset protocol with genuine institutional depth. The onchain attestation registry creates a permanent, public accountability layer — applying blockchain's core value proposition (immutability, transparency, verifiability) to critical infrastructure governance in markets where it matters most.",
      list: [
        "Onchain attestation architecture anchoring verifiable real-world disclosures",
        "Standardized, versioned protocol enabling cross-utility comparability",
        "Cryptographic integrity layer — not tokenized equity, no retail instruments",
        "Long-duration capital structure aligned with infrastructure asset horizons",
        "Transparent, immutable stewardship registry building institutional trust",
      ],
    },
    utility: {
      title: "Utility & Infrastructure Leaders",
      body:
        "POSI engages as a conventional, long-term institutional shareholder. No operational intrusion. No real-time telemetry requirements. POSI brings aligned governance influence, structured capital, and a performance framework that strengthens regulatory credibility and transition readiness.",
      list: [
        "Minority equity partner with board-level governance engagement rights",
        "10–20 year capital alignment horizon matching infrastructure asset lives",
        "Protocol based on audited disclosures and regulatory filings — not intrusive data access",
        "Structured support for loss reduction, capital planning, and renewable integration",
        "Verifiable performance record strengthening access to future institutional capital",
      ],
    },
  },
  impact: {
    tag: "// Measurable Outcomes",
    h2: "Stewardship that compounds.",
    lead:
      "POSI targets tangible, measurable improvement across the utilities it stewards — with every gain publicly attested and building a replicable institutional model.",
    metrics: {
      m1Val: "↓ Loss",
      m1Label:
        "Technical & commercial loss reduction across the distribution network",
      m2Val: "↑ Revenue",
      m2Label:
        "Improved collection rates and cost recovery discipline over reporting cycles",
      m3Val: "↑ Access",
      m3Label:
        "Expanded service connections and improved reliability for underserved populations",
      m4Val: "↑ Clean",
      m4Label:
        "Increased renewable capex share and structured reduction of diesel dependence",
    },
    items: {
      i1Title: "Replicable Institutional Model",
      i1Body:
        "By standardizing how utility improvement is defined and publicly verified, POSI creates a governance template that is replicable across frontier markets — making stewardship itself a scalable asset.",
      i2Title: "Universal, Reliable, Clean Electricity",
      i2Body:
        "Improved governance discipline and transition readiness build the institutional foundation for long-term clean energy delivery to the rapidly growing populations of Africa and Asia.",
    },
  },
  capital: {
    tag: "// Capital Structure",
    h2Line1: "Stable-value capital.",
    h2Line2: "Infrastructure-grade discipline.",
    lead:
      "POSI operates through a regulated, off-chain investment vehicle funded primarily with stable-value capital. Equity holdings are subject to standard audit and reporting requirements, aligned with 10–20 year infrastructure horizons. The blockchain component supplements — not replaces — regulatory oversight.",
    use: {
      u1Title: "Mission-Locked Holding Structure",
      u1Body:
        "Establishment of the regulated off-chain vehicle and mission governance framework.",
      u2Title: "Protocol v1 Publication",
      u2Body:
        "First public release of the standardized POSI Stewardship Protocol with full indicator documentation.",
      u3Title: "Onchain Attestation Registry",
      u3Body:
        "Deployment of the immutable performance attestation architecture and public registry infrastructure.",
      u4Title: "1–3 Minority Equity Positions",
      u4Body:
        "Acquisition of initial minority stakes in targeted privatized or concession utilities in Africa or Asia.",
      u5Title: "Technical Stewardship Engagements",
      u5Body:
        "Protocol-aligned loss reduction programs, capital planning assessments, and governance strengthening measures.",
    },
    safeguards: [
      "Regulated off-chain investment vehicle",
      "Standard audit & reporting requirements",
      "No tokenized securities or retail instruments",
      "No speculative financial instruments",
      "Onchain layer for attestation integrity only",
      "Long-duration alignment (10–20 year horizon)",
      "Conservative, governance-led deployment",
    ],
  },
  cta: {
    tag: "// Join the Initiative",
    h2Line1: "The institution that delivers electricity",
    h2Line2: "must itself be {accent}.",
    accent: "accountable",
    body:
      "POSI is seeking committed capital partners, utility co-investors, and protocol collaborators who understand that the next frontier in energy transition is not generation — it is governance.",
    contact: "Contact the Team",
    download: "Download Litepaper",
  },
  footer: {
    tagline: "Universal · Reliable · Clean",
    copy: "© {year} Power Stewardship Initiative · Frontier Markets Energy Governance",
  },
  language: {
    current: "Language",
    french: "Français",
    english: "English",
  },
};

const fr: typeof en = {
  nav: {
    problem: "Problème",
    protocol: "Protocole",
    how: "Fonctionnement",
    impact: "Impact",
    capital: "Capital",
    litepaper: "Litepaper",
  },
  hero: {
    tag: "Power Stewardship Initiative",
    h1Line1: "Responsabilité onchain",
    h1Line2Prefix: "pour",
    h1Line2Accent: "le monde réel",
    h1Line3: "des infrastructures énergétiques",
    sub:
      "POSI est une plateforme de stewardship à mission verrouillée, qui intègre un protocole de performance standardisé et ancré sur la blockchain au sein des services de distribution d’électricité privatisés dans les marchés émergents — reliant la réforme de la gouvernance institutionnelle à une transparence onchain vérifiable.",
    explore: "Explorer le protocole",
    download: "Télécharger le litepaper",
    stats: {
      dimensionsValue: "4",
      dimensionsLabel: "Dimensions du protocole",
      horizonValue: "10–20 ans",
      horizonLabel: "Horizon d’alignement",
      marketsValue: "Afrique / Asie",
      marketsLabel: "Marchés cibles",
    },
  },
  problem: {
    tag: "// Le fossé institutionnel",
    h2Line1: "Les utilities de distribution n’échouent pas",
    h2Line2: "faute de technologie.",
    lead:
      "En Afrique et en Asie, les utilities privatisées et en concession souffrent de dysfonctionnements institutionnels — pas de pénuries de production. La couche manquante est une gouvernance disciplinée, une responsabilité de performance à long terme et une transparence vérifiable.",
    cells: {
      lossesTitle: "Pertes techniques et commerciales élevées",
      lossesBody:
        "La dégradation persistante des infrastructures et les défaillances de comptage entraînent la perte de 20 à 40 % de l’électricité distribuée, ruinant la soutenabilité financière avant que toute ambition renouvelable ne puisse s’installer.",
      governanceTitle: "Discipline de gouvernance insuffisante",
      governanceBody:
        "Même lorsque des structures de privatisation existent, la supervision des conseils est fragmentée, la stratégie de long terme incohérente et les incitations institutionnelles mal alignées avec la fiabilité ou les objectifs de transition énergétique.",
      accountabilityTitle: "Aucune responsabilité standardisée",
      accountabilityBody:
        "Il n’existe pas de langage commun pour définir ce que signifie « être performant » dans les utilities des marchés émergents. Bailleurs de capitaux, régulateurs et gouvernements opèrent sans base de performance partagée et vérifiable.",
      mismatchTitle: "Décalage avec le capital de court terme",
      mismatchBody:
        "Les actifs d’infrastructure exigent des horizons d’engagement de 10 à 20 ans. La majorité du capital disponible est structurée sur des cycles courts, créant un décalage chronique qui empêche une réforme institutionnelle durable.",
    },
  },
  protocol: {
    tag: "// Le protocole POSI",
    h2Line1: "Un protocole de stewardship standardisé,",
    h2Line2: "ancré onchain de façon immuable.",
    lead:
      "Le protocole de stewardship POSI est le premier cadre de gouvernance standardisé et ancré sur la blockchain, conçu spécifiquement pour les utilities de distribution dans les marchés émergents. Il définit, mesure et vérifie publiquement l’amélioration institutionnelle sur quatre dimensions clés — créant une couche de responsabilité réplicable qui accompagne le capital.",
    pillars: {
      p1Title: "Fiabilité opérationnelle",
      p1Desc:
        "Réduction des pertes techniques et commerciales, amélioration de l’exécution de la maintenance, extension des raccordements et discipline de disponibilité.",
      p2Title: "Soutenabilité financière",
      p2Desc:
        "Amélioration de la collecte, taux de recouvrement des coûts, allocation disciplinée du capital et solidité du bilan à long terme.",
      p3Title: "Préparation à la transition",
      p3Desc:
        "Bascule progressive du capex vers le renforcement du réseau et l’intégration des renouvelables ; réduction suivie de la dépendance au diesel sur les cycles de reporting.",
      p4Title: "Qualité de gouvernance",
      p4Desc:
        "Pratiques de supervision du conseil, transparence de la planification, cohérence de la stratégie de long terme et responsabilité documentée vis-à-vis des KPI définis.",
    },
    chain: {
      header: "Registre d’attestations onchain — En direct",
      b1Label: "Attestation #0047 · T1 2025",
      b1Data:
        "UTILITY : West Africa Dist. Co. · PROTOCOLE v1.2\nPERTE TECHNIQUE : 21,3 % → 18,4 % ↓ VÉRIFIÉ",
      b2Label: "Attestation #0031 · T3 2024",
      b2Data:
        "UTILITY : West Africa Dist. Co. · PROTOCOLE v1.1\nTAUX DE COLLECTE : 68,1 % → 72,6 % ↑ VÉRIFIÉ",
      b3Label: "Attestation #0018 · T1 2024",
      b3Data:
        "UTILITY : West Africa Dist. Co. · PROTOCOLE v1.0\nBASELINE ÉTABLIE · SCORE DE GOUVERNANCE : C+",
      noteStrong: "Architecture :",
      note:
        "Les déclarations de performance sont hachées cryptographiquement et horodatées onchain. La documentation de support reste hors chaîne. La blockchain sert de couche permanente d’intégrité et de comparabilité — pas d’instrument financier.",
    },
  },
  how: {
    tag: "// Mécanisme",
    h2: "Protocole + Equity + Chaîne.",
    lead:
      "Trois éléments imbriqués créent un modèle exécutoire de réforme institutionnelle. Chacun renforce les autres — comblant les lacunes systémiques qui ont historiquement cantonné la réforme de la gouvernance à un rôle consultatif plutôt qu’engageant.",
    steps: {
      s1TitlePrefix: "Définir le stewardship",
      s1TitleAccent: "onchain",
      s1Body:
        "Le protocole POSI publie un ensemble standardisé et versionné d’indicateurs de performance pour les utilities de distribution. À chaque cycle, les attestations sont ancrées onchain via des empreintes cryptographiques — créant un registre de responsabilité immuable et comparable.",
      s2TitlePrefix: "Acquérir une",
      s2TitleAccent: "equity minoritaire",
      s2Body:
        "POSI prend des positions minoritaires stratégiques dans des utilities privatisées ou en concession, structurées pour obtenir une représentation au conseil ou une influence formelle d’actionnaire. Cette position crée un levier d’exécution. Sans elle, le protocole risque de rester consultatif. Sans le protocole, l’equity risque d’être passive.",
      s3TitlePrefix: "Conduire la",
      s3TitleAccent: "réforme institutionnelle",
      s3Body:
        "Par l’engagement de gouvernance, POSI aligne la stratégie de la direction et du conseil sur les KPI du protocole — couvrant la réduction des pertes, la discipline financière, l’intégration des renouvelables et la transparence. L’évolution des performances est documentée, vérifiée et attestée publiquement à chaque cycle.",
    },
  },
  audience: {
    tag: "// Pour qui",
    h2Line1: "Conçu pour deux mondes.",
    h2Line2: "Opérant dans un seul.",
    lead:
      "POSI parle couramment aux communautés blockchain et capital digital, tout en apportant une crédibilité institutionnelle aux régulateurs, gouvernements et opérateurs. Aucune valeur mobilière tokenisée. Aucun instrument spéculatif. Uniquement des performances réelles, enregistrées de manière vérifiable.",
    crypto: {
      title: "Leaders blockchain & capital digital",
      body:
        "POSI est un protocole d’actifs réels doté d’une profondeur institutionnelle. Le registre d’attestations onchain crée une couche de responsabilité permanente et publique — appliquant la proposition de valeur centrale de la blockchain (immutabilité, transparence, vérifiabilité) à la gouvernance d’infrastructures critiques dans les marchés où cela compte le plus.",
      list: [
        "Architecture d’attestation onchain ancrant des divulgations réelles vérifiables",
        "Protocole standardisé et versionné permettant la comparabilité inter-utilities",
        "Couche d’intégrité cryptographique — pas d’equity tokenisée, pas d’instruments retail",
        "Structure de capital longue durée alignée sur les horizons d’actifs d’infrastructure",
        "Registre de stewardship transparent et immuable renforçant la confiance institutionnelle",
      ],
    },
    utility: {
      title: "Leaders utilities & infrastructures",
      body:
        "POSI intervient comme actionnaire institutionnel classique et de long terme. Aucune intrusion opérationnelle. Aucun besoin de télémétrie en temps réel. POSI apporte une influence de gouvernance alignée, un capital structuré et un cadre de performance qui renforce la crédibilité réglementaire et la préparation à la transition.",
      list: [
        "Partenaire en equity minoritaire avec des droits d’engagement de gouvernance au niveau du conseil",
        "Horizon d’alignement capital 10–20 ans correspondant à la durée de vie des actifs",
        "Protocole basé sur des disclosures auditées et des dépôts réglementaires — pas d’accès intrusif aux données",
        "Support structuré pour la réduction des pertes, la planification du capital et l’intégration des renouvelables",
        "Historique de performance vérifiable facilitant l’accès à du capital institutionnel futur",
      ],
    },
  },
  impact: {
    tag: "// Résultats mesurables",
    h2: "Un stewardship qui se compose.",
    lead:
      "POSI vise une amélioration tangible et mesurable dans les utilities qu’elle accompagne — chaque gain étant attesté publiquement et construisant un modèle institutionnel réplicable.",
    metrics: {
      m1Val: "↓ Pertes",
      m1Label:
        "Réduction des pertes techniques et commerciales sur le réseau de distribution",
      m2Val: "↑ Revenus",
      m2Label:
        "Amélioration des taux de collecte et discipline de recouvrement des coûts sur les cycles de reporting",
      m3Val: "↑ Accès",
      m3Label:
        "Extension des raccordements et amélioration de la fiabilité pour les populations sous-desservies",
      m4Val: "↑ Propre",
      m4Label:
        "Augmentation de la part capex renouvelable et réduction structurée de la dépendance au diesel",
    },
    items: {
      i1Title: "Modèle institutionnel réplicable",
      i1Body:
        "En standardisant la manière dont l’amélioration des utilities est définie et vérifiée publiquement, POSI crée un modèle de gouvernance réplicable dans les marchés émergents — faisant du stewardship un actif scalable.",
      i2Title: "Électricité universelle, fiable et propre",
      i2Body:
        "Une meilleure discipline de gouvernance et une préparation à la transition posent les bases institutionnelles d’une fourniture d’énergie propre à long terme pour les populations en forte croissance d’Afrique et d’Asie.",
    },
  },
  capital: {
    tag: "// Structure de capital",
    h2Line1: "Un capital à valeur stable.",
    h2Line2: "Une discipline de niveau infrastructure.",
    lead:
      "POSI opère via un véhicule d’investissement réglementé hors chaîne, financé principalement par du capital à valeur stable. Les participations en equity sont soumises à des exigences standard d’audit et de reporting, alignées sur des horizons d’infrastructure de 10 à 20 ans. Le composant blockchain complète — sans remplacer — la supervision réglementaire.",
    use: {
      u1Title: "Structure de détention à mission verrouillée",
      u1Body:
        "Mise en place du véhicule réglementé hors chaîne et du cadre de gouvernance de mission.",
      u2Title: "Publication du protocole v1",
      u2Body:
        "Première publication publique du protocole de stewardship POSI standardisé, avec documentation complète des indicateurs.",
      u3Title: "Registre d’attestations onchain",
      u3Body:
        "Déploiement de l’architecture d’attestation immuable et de l’infrastructure de registre public.",
      u4Title: "1 à 3 positions en equity minoritaire",
      u4Body:
        "Acquisition de participations minoritaires initiales dans des utilities privatisées ou en concession ciblées en Afrique ou en Asie.",
      u5Title: "Engagements de stewardship technique",
      u5Body:
        "Programmes de réduction des pertes alignés sur le protocole, évaluations de planification du capital et mesures de renforcement de la gouvernance.",
    },
    safeguards: [
      "Véhicule d’investissement réglementé hors chaîne",
      "Exigences standard d’audit & reporting",
      "Aucune valeur mobilière tokenisée ni instruments retail",
      "Aucun instrument financier spéculatif",
      "Couche onchain uniquement pour l’intégrité des attestations",
      "Alignement longue durée (horizon 10–20 ans)",
      "Déploiement conservateur, piloté par la gouvernance",
    ],
  },
  cta: {
    tag: "// Rejoindre l’initiative",
    h2Line1: "L’institution qui délivre l’électricité",
    h2Line2: "doit elle-même être {accent}.",
    accent: "responsable",
    body:
      "POSI recherche des partenaires de capital engagés, des co-investisseurs utilities et des collaborateurs de protocole qui comprennent que la prochaine frontière de la transition énergétique n’est pas la production — mais la gouvernance.",
    contact: "Contacter l’équipe",
    download: "Télécharger le litepaper",
  },
  footer: {
    tagline: "Universel · Fiable · Propre",
    copy:
      "© {year} Power Stewardship Initiative · Gouvernance énergétique des marchés émergents",
  },
  language: {
    current: "Langue",
    french: "Français",
    english: "English",
  },
};

export const messages = { en, fr };

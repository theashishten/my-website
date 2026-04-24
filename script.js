// ─── Dynamic Year ─────────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();

// ─── Toast ────────────────────────────────────────────────────────
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.style.background = type === "error" ? "#ef4444" : "#111827";
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// ─── Filter Logic ─────────────────────────────────────────────────
const filterButtons = document.querySelectorAll(".filters__btn");
const projectCards  = document.querySelectorAll(".project");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filterValue = btn.getAttribute("data-filter");
    filterButtons.forEach((b) => b.classList.remove("filters__btn--active"));
    btn.classList.add("filters__btn--active");

    projectCards.forEach((card) => {
      const cardTag = card.getAttribute("data-tag");
      if (filterValue === "All" || filterValue === cardTag) {
        card.classList.remove("hidden");
        setTimeout(() => card.classList.remove("fade-out"), 50);
      } else {
        card.classList.add("fade-out");
        setTimeout(() => card.classList.add("hidden"), 300);
      }
    });
  });
});

// ─── Scroll-reveal animation ──────────────────────────────────────
const observerOpts = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("is-visible");
      revealObserver.unobserve(e.target);
    }
  });
}, observerOpts);

document.querySelectorAll(".project, .tool-column, .philosophy-card, .timeline__row")
  .forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

// ─── Case Study Data ──────────────────────────────────────────────
const cases = {

  whatsapp: {
    tag: "AUTOMATION",
    color: "thumb-4",
    title: "WhatsApp Automation Engine",
    subtitle: "AI-powered sales & support agent for KDK Softwares",
    overview: "Built 'Priya' — a full WhatsApp AI agent that handles lead qualification, product discovery, and onboarding flows for KDK Softwares' CA firm clients. The system processes inbound leads, routes them through smart qualification sequences, and hands off high-intent prospects to the sales team automatically.",
    stats: [
      { label: "Automation Platform", value: "n8n" },
      { label: "AI Model", value: "Claude API" },
      { label: "Delivery", value: "Rampwin" },
      { label: "CRM", value: "Zoho" },
    ],
    sections: [
      {
        heading: "The Problem",
        body: "KDK's sales team was manually responding to hundreds of WhatsApp inquiries daily. Leads were dropping off due to slow response times, and there was no consistent qualification process—meaning the sales team was spending equal time on cold leads and hot ones."
      },
      {
        heading: "What I Built",
        body: "A multi-turn conversational AI agent ('Priya') built on n8n workflows with Claude API at the core. The agent greets inbound leads, identifies their product interest across KDK's suite (Spectrum Cloud, ExpressGST, ExpressTDS, ExpressITR, Bill Setu), qualifies them based on firm type and need, and either answers common queries or routes to sales. Pipe-separated message formatting ensures WhatsApp-friendly responses."
      },
      {
        heading: "Technical Stack",
        body: "n8n (self-hosted at automation.kdksoftware.com) → Claude API for NLP → Rampwin for WhatsApp delivery → Zoho CRM for contact sync → Zoho MA for follow-up sequences. Implemented a Vectorless RAG pipeline using PageIndex for product knowledge retrieval without a traditional vector DB."
      },
      {
        heading: "Outcome",
        body: "24/7 response coverage with consistent qualification logic. Sales team now receives pre-qualified leads with context. Lead nurturing sequences are triggered automatically based on product interest scoring."
      }
    ],
    externalLink: "https://ashishten.notion.site/Whatsapp-Automation-2c72b1ee83be80ab9833e9c2a56b0665?source=copy_link"
  },

  swil: {
    tag: "MARKETING",
    color: "thumb-1",
    title: "SwilERP Marketing",
    subtitle: "Full-funnel digital marketing for a retail & distribution SaaS",
    overview: "Owned the entire digital marketing function for SwilERP — a SaaS platform for retail and distribution businesses. Responsibilities spanned lead generation, CRM automation, WhatsApp onboarding, and content strategy.",
    stats: [
      { label: "Industry", value: "Retail SaaS" },
      { label: "Duration", value: "Jul 2023 – Apr 2025" },
      { label: "Channels", value: "SEO, Meta Ads, WhatsApp" },
      { label: "Stack", value: "Zoho, n8n, WhatsApp API" },
    ],
    sections: [
      {
        heading: "Role & Scope",
        body: "As Digital Marketing Specialist, I ran all growth activities: paid and organic acquisition, lead nurturing via WhatsApp API, and CRM configuration in Zoho. I also built the automation infrastructure from scratch — no workflows existed when I joined."
      },
      {
        heading: "WhatsApp Onboarding Flows",
        body: "Designed and built a multi-step onboarding sequence for new trial signups delivered via WhatsApp. The sequence covered product activation, feature discovery, and support touchpoints — reducing churn in the first 30 days."
      },
      {
        heading: "Lead Generation",
        body: "Built Meta Lead Ads pipelines connected directly to Zoho CRM via webhooks. Added instant WhatsApp response on form submission, dramatically improving lead response time from hours to seconds."
      },
      {
        heading: "Results",
        body: "Established a repeatable inbound system. Automated lead qualification and nurturing reduced manual sales effort while improving pipeline quality."
      }
    ]
  },

  ovya: {
    tag: "BRAND DESIGN",
    color: "thumb-2",
    title: "Ovya Home Luxury",
    subtitle: "Digital presence & growth for a luxury furniture brand",
    overview: "Full-stack digital marketing for Ovya Home — a premium furniture brand. Covered the complete digital presence: website, SEO, paid ads, and automation.",
    stats: [
      { label: "Category", value: "Luxury Furniture" },
      { label: "Engagement", value: "Ongoing Freelance" },
      { label: "Focus", value: "SEO + Ads + Web Dev" },
      { label: "Stack", value: "WordPress, Meta Ads, GA4" },
    ],
    sections: [
      {
        heading: "The Brief",
        body: "Ovya Home needed a digital identity that matched the luxury positioning of their physical product. Their existing website was outdated, had no SEO foundation, and their ad spend was not generating quality leads."
      },
      {
        heading: "Website Redesign",
        body: "Redesigned the website with a luxury-first aesthetic — clean editorial layouts, high-quality product photography guidance, and fast load times. Built with conversion in mind: clear CTAs for showroom visits and inquiry forms."
      },
      {
        heading: "SEO & Content Strategy",
        body: "Built an SEO foundation targeting high-intent keywords in the luxury furniture and interior design space. Created content clusters around product categories and interior style guides to attract organic discovery."
      },
      {
        heading: "Paid Advertising",
        body: "Set up Meta Ads campaigns targeting high-income homeowners and interior design professionals. A/B tested creatives and landing pages to find the most effective messaging for luxury positioning."
      }
    ]
  },

  experiments: {
    tag: "WEBSITES",
    color: "thumb-3",
    title: "Experiments & Prototypes",
    subtitle: "Personal builds: apps, tools & side projects",
    overview: "A collection of technical experiments and self-initiated projects — primarily React and Next.js builds exploring interfaces, AI integration, and productivity tools.",
    stats: [
      { label: "Primary Stack", value: "React, Next.js" },
      { label: "AI Integration", value: "Claude API" },
      { label: "Tooling", value: "Vite, Tailwind" },
      { label: "Type", value: "Side Projects" },
    ],
    sections: [
      {
        heading: "Ink — AI Notepad",
        body: "Built a feature-rich notepad app with MCP server integration using the Anthropic API and React. Implemented a full agentic loop with 14 tools, multi-turn memory, and a minimalist analog aesthetic. The app uses Claude as an intelligent writing assistant embedded directly in the editor."
      },
      {
        heading: "CloudSheet — Spreadsheet App",
        body: "A React-based Excel-like spreadsheet app with formula evaluation, cell formatting, multi-sheet support, and Excel-style formula autocomplete with a FUNC_INFO dropdown. Built entirely in-browser with no backend dependency."
      },
      {
        heading: "This Portfolio",
        body: "Designed and built from scratch — no templates. The design system uses Bricolage Grotesque, custom CSS animations, scroll-triggered reveals, and a minimal editorial layout language. Every interaction is intentional."
      },
      {
        heading: "What's Next",
        body: "Continuously building. Current interests: Go and Rust for backend tooling, AI infrastructure concepts, and exploring agentic workflow patterns beyond standard automation."
      }
    ]
  },

  inventory: {
    tag: "BRAND DESIGN",
    color: "thumb-5",
    title: "Inventory UX Concepts",
    subtitle: "UI/UX explorations for retail management software",
    overview: "A series of UX design explorations for inventory and retail management interfaces — part of broader work on making enterprise tools feel usable and modern.",
    stats: [
      { label: "Tools", value: "Figma, Protopie" },
      { label: "Domain", value: "Retail / ERP" },
      { label: "Type", value: "UX Design" },
      { label: "Focus", value: "Clarity & Speed" },
    ],
    sections: [
      {
        heading: "The Challenge",
        body: "Retail management software is notoriously dense — too many fields, too little hierarchy. The challenge was designing interfaces that let store managers act quickly without needing training manuals."
      },
      {
        heading: "Design Approach",
        body: "Applied progressive disclosure principles — showing only what's necessary at each step. Used strong visual hierarchy to separate critical actions (stock levels, reorder points) from secondary data (historical logs, reports)."
      },
      {
        heading: "Key Screens",
        body: "Designed inventory dashboard with real-time stock status indicators, a fast-entry purchase order flow, and a product detail page optimized for scanning and editing. Each screen was prototyped in Protopie for interaction testing."
      },
      {
        heading: "Learnings",
        body: "Enterprise UX requires resisting the urge to show everything at once. The best interfaces in this space feel boring on purpose — predictable, fast, and error-resistant."
      }
    ]
  },

  growth: {
    tag: "MARKETING",
    color: "thumb-6",
    title: "Growth Systems",
    subtitle: "SEO, YouTube & Pinterest ecosystems for organic growth",
    overview: "Built organic growth engines across multiple channels — creating systems that compound over time rather than requiring constant paid spend.",
    stats: [
      { label: "Channels", value: "SEO, YouTube, Pinterest" },
      { label: "Tools", value: "SEMrush, GA4, Ahrefs" },
      { label: "Approach", value: "Content Ecosystems" },
      { label: "Focus", value: "Compounding Returns" },
    ],
    sections: [
      {
        heading: "Philosophy",
        body: "Paid ads rent attention. Organic systems own it. My approach to growth focuses on building content ecosystems that work together — a blog post supports a YouTube video that drives Pinterest traffic that feeds email signups."
      },
      {
        heading: "SEO Systems",
        body: "Built keyword-clustered content architectures for multiple clients. Focused on topical authority over individual keyword ranking — creating pillar pages supported by satellite content to signal expertise to search engines."
      },
      {
        heading: "Video & Visual",
        body: "Developed YouTube channel strategies for SaaS clients — covering product tutorials, comparison content, and thought leadership. Pinterest was used as a top-of-funnel visual discovery channel, especially for e-commerce and home decor brands."
      },
      {
        heading: "Measurement",
        body: "Built GA4 tracking setups with custom events for meaningful actions. Created automated reporting dashboards in Looker Studio connected to live data sources — giving clients visibility without manual reporting overhead."
      }
    ]
  }

};

// ─── Modal Logic ──────────────────────────────────────────────────
function openCase(id) {
  const data = cases[id];
  if (!data) return;

  const statsHtml = data.stats.map(s => `
    <div class="cs-stat">
      <div class="cs-stat__label">${s.label}</div>
      <div class="cs-stat__value">${s.value}</div>
    </div>
  `).join("");

  const sectionsHtml = data.sections.map(s => `
    <div class="cs-section">
      <h3 class="cs-section__heading">${s.heading}</h3>
      <p class="cs-section__body">${s.body}</p>
    </div>
  `).join("");

  const externalBtn = data.externalLink
    ? `<a href="${data.externalLink}" target="_blank" class="cs-external-btn">
        View full case study ↗
       </a>`
    : "";

  document.getElementById("modalContent").innerHTML = `
    <div class="cs-hero cs-hero--${data.color}"></div>
    <div class="cs-body">
      <p class="cs-tag">${data.tag}</p>
      <h2 class="cs-title">${data.title}</h2>
      <p class="cs-subtitle">${data.subtitle}</p>

      <div class="cs-stats">${statsHtml}</div>

      <p class="cs-overview">${data.overview}</p>

      <div class="cs-sections">${sectionsHtml}</div>

      ${externalBtn}
    </div>
  `;

  const modal = document.getElementById("caseModal");
  modal.classList.add("modal--open");
  document.body.style.overflow = "hidden";

  // Reset scroll
  document.querySelector(".modal-container").scrollTop = 0;
}

function closeCase() {
  document.getElementById("caseModal").classList.remove("modal--open");
  document.body.style.overflow = "";
}

function handleModalClick(e) {
  if (e.target === document.getElementById("caseModal")) closeCase();
}

// Keyboard close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCase();
});

import { L, type Lang } from './helpers'

export const buildHome = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('首页', 'Home'),
    slug: 'home',
    status: 'published',
    meta: {
      title: t('研翌数据科技 · AI + HI 健康智能体', 'Yanyi Data Technology · AI + HI for Health'),
      description: t('以自研 AI 技术底座，打造懂情感、懂健康的智能伙伴。', 'Emotion- and health-aware AI companions on a self-developed foundation.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('AI + HI · 自研技术底座', 'AI + HI · In-house foundation'),
        title: t('用 AI + HI，打造懂情感、懂健康的智能伙伴', 'AI + HI — companions that understand emotion and health'),
        subtitle: t(
          '研翌数据科技以自研 AI 技术底座，赋能健康、保险、教育与工业等多场景智能体，让专业的守护人人可及。',
          'Yanyi Data Technology powers intelligent agents across health, insurance, education and industry — making professional care accessible to all.',
        ),
        primaryCta: { label: t('预约 Demo', 'Book a Demo'), href: '/contact' },
        secondaryCta: { label: t('了解技术底座', 'Explore the Technology'), href: '/technology' },
      },
      {
        blockType: 'valueProps',
        title: t('为爱而生的科技', 'Technology born for love'),
        subtitle: t('我们用 AI 与人类智慧的融合，重新定义健康陪伴。', 'We redefine companionship through the fusion of AI and human wisdom.'),
        items: [
          { icon: 'heart', title: t('懂情感', 'Emotion-aware'), description: t('识别情绪、给予温度，建立长期信任。', 'Recognizes emotion and builds lasting trust.') },
          { icon: 'activity', title: t('懂健康', 'Health-aware'), description: t('专业知识与个性化画像驱动的健康洞察。', 'Health insights driven by expertise and personalization.') },
          { icon: 'layers', title: t('自研底座', 'In-house foundation'), description: t('四域协同、可复用的 AI 技术底座。', 'A reusable four-domain AI foundation.') },
          { icon: 'lock', title: t('可私有化', 'Private-ready'), description: t('支持私有化部署，满足安全与合规。', 'Private deployment for security and compliance.') },
        ],
      },
      {
        blockType: 'techArchitecture',
        title: t('统一 AI 技术底座，四域协同', 'One AI foundation, four domains in concert'),
        subtitle: t('以「人体」隐喻组织系统：思考、执行、语音、记忆，各司其职、协同进化。', 'Organized like a body — thinking, action, voice and memory, each with a clear role.'),
        domains: [
          { icon: 'brain', role: t('大脑', 'Brain'), name: t('思考与编排', 'Thinking & orchestration'), description: t('人格化、意图理解、对话编排与决策路由。', 'Persona, intent, dialog orchestration and routing.') },
          { icon: 'wrench', role: t('小脑', 'Cerebellum'), name: t('工具执行', 'Tool execution'), description: t('基于 MCP 协议的工具与技能执行。', 'Tool and skill execution via the MCP protocol.') },
          { icon: 'mic', role: t('嘴和耳朵', 'Mouth & Ears'), name: t('实时语音', 'Real-time voice'), description: t('低延迟流式语音识别、合成与对话。', 'Low-latency streaming STT, TTS and voice dialog.') },
          { icon: 'database', role: t('记忆', 'Memory'), name: t('记忆与画像', 'Memory & profile'), description: t('用户画像、长期记忆与知识图谱统一出口。', 'Profiles, long-term memory and knowledge graph.') },
        ],
        note: t('* 对外仅呈现能力，不涉及内部实现细节。', '* Capabilities shown; implementation details omitted.'),
      },
      {
        blockType: 'capabilityGrid',
        title: t('核心技术能力', 'Core capabilities'),
        subtitle: t('从人格化到私有化部署，构成可落地的差异化能力。', 'From persona to private deployment — differentiated, deployable capabilities.'),
        capabilities: [
          { icon: 'sparkles', title: t('人格化引擎', 'Persona engine'), description: t('配置驱动的多人格架构，一致、可切换。', 'Config-driven multi-persona architecture.') },
          { icon: 'database', title: t('长期记忆与画像', 'Memory & profile'), description: t('会话/跨会话记忆与结构化用户画像，越用越懂。', 'Session & long-term memory plus structured profiles.') },
          { icon: 'mic', title: t('实时语音交互', 'Real-time voice'), description: t('低延迟流式语音，自然对话体验。', 'Low-latency streaming voice for natural dialog.') },
          { icon: 'workflow', title: t('工具与 MCP 执行', 'Tools & MCP'), description: t('标准 MCP 协议的工具生态，扩展性强。', 'Standard MCP tool ecosystem, highly extensible.') },
          { icon: 'network', title: t('知识图谱 RAG', 'Knowledge & RAG'), description: t('多策略检索与知识图谱，答案可追溯。', 'Multi-strategy retrieval and knowledge graph.') },
          { icon: 'lock', title: t('私有化部署', 'Private deployment'), description: t('支持本地化与多租户隔离，合规可控。', 'Localized, multi-tenant, compliant deployment.') },
        ],
      },
      {
        blockType: 'scenarioShowcase',
        title: t('AI 场景', 'AI scenarios'),
        subtitle: t('同一底座，落地于不同高价值行业场景。', 'One foundation, deployed across high-value scenarios.'),
        scenarios: [
          { icon: 'heart', name: t('健康康养', 'Health & elder care'), description: t('个人健康管理、情感陪伴与居家辅助。', 'Personal health, companionship and at-home assistance.'), link: { label: t('了解更多', 'Learn more'), href: '/products/evomate' } },
          { icon: 'shield', name: t('保险', 'Insurance'), description: t('代理人专业问答、培训与场景对练。', 'Agent Q&A, training and scenario practice.'), link: { label: t('了解更多', 'Learn more'), href: '/products/insurevertex-ai' } },
          { icon: 'graduation-cap', name: t('校园心理', 'Campus mental health'), description: t('家校生协同的青少年心理健康支持。', 'Collaborative youth mental-health support.'), link: { label: t('了解更多', 'Learn more'), href: '/products/sproutguard' } },
          { icon: 'factory', name: t('工业', 'Industry'), description: t('高价值流程与关键资产的 AI 应用底座。', 'AI platform for high-value processes and assets.'), link: { label: t('了解更多', 'Learn more'), href: '/products/industriax' } },
        ],
      },
      {
        blockType: 'productMatrix',
        title: t('产品矩阵', 'Product matrix'),
        subtitle: t('从健康到工业，一套底座支撑多场景智能体。', 'From health to industry — one foundation, many agents.'),
      },
      {
        blockType: 'statsMetrics',
        title: t('工程化指标', 'Engineering metrics'),
        stats: [
          { value: '<300ms', label: t('对话响应', 'Response time') },
          { value: '1000+', label: t('并发能力', 'Concurrency') },
          { value: t('多模型', 'Multi-model'), label: t('不锁定厂商', 'No vendor lock-in') },
          { value: t('私有化', 'Private'), label: t('可本地部署', 'Self-hostable') },
        ],
      },
      {
        blockType: 'caseHighlights',
        title: t('精选案例', 'Selected cases'),
        subtitle: t('在真实场景中验证的负责任 AI。', 'Responsible AI proven in real scenarios.'),
      },
      {
        blockType: 'ctaBanner',
        title: t('让我们聊聊你的 AI 场景', 'Let’s talk about your AI scenario'),
        subtitle: t('无论是商务合作、产品试用还是投资洽谈，欢迎与我们联系。', 'Partnership, product trial or investment — we’d love to connect.'),
        primaryCta: { label: t('商务咨询', 'Contact Sales'), href: '/contact' },
        secondaryCta: { label: t('了解技术', 'Explore Technology'), href: '/technology' },
      },
    ],
  }
}

export const buildTechnology = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('技术底座', 'Technology'),
    slug: 'technology',
    status: 'published',
    meta: {
      title: t('技术底座 · 四域协同的 AI 架构', 'Technology · Four-domain AI architecture'),
      description: t('思考、执行、语音、记忆四域协同的自研 AI 技术底座。', 'A self-developed AI foundation: thinking, action, voice and memory.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('TECHNOLOGY', 'TECHNOLOGY'),
        title: t('自研 AI 技术底座', 'Our self-developed AI foundation'),
        subtitle: t('以清晰的职责边界与工程化能力，支撑多场景智能体快速、稳定落地。', 'Clear boundaries and engineering rigor for fast, stable agents across scenarios.'),
        primaryCta: { label: t('预约 Demo', 'Book a Demo'), href: '/contact' },
        secondaryCta: { label: t('查看产品', 'See Products'), href: '/products' },
      },
      {
        blockType: 'techArchitecture',
        title: t('四域协同架构', 'Four-domain architecture'),
        subtitle: t('思考、执行、语音、记忆——边界清晰，独立演进，统一编排。', 'Thinking, action, voice, memory — bounded, independent, orchestrated.'),
        domains: [
          { icon: 'brain', role: t('大脑', 'Brain'), name: t('思考与编排', 'Thinking & orchestration'), description: t('人格化、意图理解、对话编排与决策路由。', 'Persona, intent, orchestration and routing.') },
          { icon: 'wrench', role: t('小脑', 'Cerebellum'), name: t('工具执行', 'Tool execution'), description: t('基于 MCP 协议的工具与技能执行。', 'Tool & skill execution via MCP.') },
          { icon: 'mic', role: t('嘴和耳朵', 'Mouth & Ears'), name: t('实时语音', 'Real-time voice'), description: t('低延迟流式语音识别、合成与对话。', 'Low-latency streaming voice.') },
          { icon: 'database', role: t('记忆', 'Memory'), name: t('记忆与画像', 'Memory & profile'), description: t('画像、长期记忆与知识图谱统一出口。', 'Profiles, memory and knowledge graph.') },
        ],
        note: t('* 对外仅呈现能力，不涉及内部实现细节。', '* Capabilities shown; implementation details omitted.'),
      },
      {
        blockType: 'capabilityGrid',
        title: t('核心技术能力', 'Core capabilities'),
        capabilities: [
          { icon: 'sparkles', title: t('人格化引擎', 'Persona engine'), description: t('配置驱动的多人格，一致、可切换、可治理。', 'Config-driven, consistent, governable personas.') },
          { icon: 'database', title: t('长期记忆与画像', 'Memory & profile'), description: t('会话/跨会话记忆与结构化画像。', 'Session/long-term memory and profiles.') },
          { icon: 'mic', title: t('实时语音交互', 'Real-time voice'), description: t('流式 STT/TTS 与端到端语音对话。', 'Streaming STT/TTS and end-to-end voice.') },
          { icon: 'workflow', title: t('工具与 MCP 执行', 'Tools & MCP'), description: t('标准协议工具生态，热插拔扩展。', 'Standard-protocol, hot-pluggable tools.') },
          { icon: 'network', title: t('知识图谱 RAG', 'Knowledge & RAG'), description: t('多策略检索、可追溯引用与降级。', 'Multi-strategy retrieval with citations.') },
          { icon: 'lock', title: t('私有化部署', 'Private deployment'), description: t('本地化、多租户隔离与可观测。', 'Localized, multi-tenant, observable.') },
        ],
      },
      {
        blockType: 'valueProps',
        title: t('我们的差异化', 'How we differ'),
        items: [
          { icon: 'gauge', title: t('工程化可落地', 'Engineered to ship'), description: t('从原型到生产的工程能力与稳定性。', 'Engineering and stability from prototype to production.') },
          { icon: 'cpu', title: t('多模型不锁定', 'No lock-in'), description: t('统一接口适配多模型，规避厂商锁定。', 'Unified interface across models.') },
          { icon: 'shield', title: t('负责任 AI', 'Responsible AI'), description: t('可追溯、可审计、人类监督前置。', 'Traceable, auditable, human-in-the-loop.') },
        ],
      },
      {
        blockType: 'faq',
        title: t('常见问题', 'FAQ'),
        items: [
          { question: t('技术底座可以私有化部署吗？', 'Can the foundation be self-hosted?'), answer: t('可以。支持本地化与多租户隔离，满足安全与合规要求。', 'Yes — localized, multi-tenant deployment for security and compliance.') },
          { question: t('是否绑定特定大模型？', 'Are you tied to a specific LLM?'), answer: t('不绑定。统一接口适配多模型，可按场景与成本灵活选择。', 'No — a unified interface adapts to multiple models.') },
          { question: t('如何保证回答的可信与可追溯？', 'How do you ensure trustworthy answers?'), answer: t('答案优先引用来源，关键口径走治理与审批流程，关键操作留痕审计。', 'Answers cite sources; key statements go through governance; key actions are audited.') },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: t('想深入了解我们的技术底座？', 'Want a deeper look at our foundation?'),
        subtitle: t('我们很乐意为你做一次技术演示。', 'We’d be glad to give you a technical walkthrough.'),
        primaryCta: { label: t('预约技术演示', 'Book a Technical Demo'), href: '/contact' },
      },
    ],
  }
}

export const buildAbout = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('关于我们', 'About'),
    slug: 'about',
    status: 'published',
    meta: {
      title: t('关于研翌数据科技', 'About Yanyi Data Technology'),
      description: t('科技为爱而生，让健康与品质同行。', 'Technology born for love — for lasting health and quality of life.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('ABOUT', 'ABOUT'),
        title: t('科技为爱而生，让健康与品质同行', 'Technology born for love'),
        subtitle: t('我们用 AI 与人类智慧的融合，打造懂情感、懂健康的智能伙伴。', 'We build emotion- and health-aware companions through AI and human wisdom.'),
      },
      {
        blockType: 'valueProps',
        title: t('使命 · 愿景 · 价值观', 'Mission · Vision · Values'),
        items: [
          { icon: 'heart', title: t('使命', 'Mission'), description: t('让专业的健康守护人人可及。', 'Make professional health care accessible to all.') },
          { icon: 'rocket', title: t('愿景', 'Vision'), description: t('成为最懂你健康的「老朋友」。', 'Become the trusted companion who knows your health best.') },
          { icon: 'users', title: t('价值观', 'Values'), description: t('专业、严谨、为爱而生。', 'Professional, rigorous, born for love.') },
        ],
      },
      {
        blockType: 'timeline',
        title: t('发展历程', 'Milestones'),
        subtitle: t('稳步推进的产品与技术路线。', 'A steady product and technology roadmap.'),
        milestones: [
          { period: '2025', title: t('技术底座成型', 'Foundation built'), description: t('完成自研 AI 技术底座与首批场景验证。', 'Built the in-house AI foundation and first scenario validations.') },
          { period: '2026', title: t('多场景落地', 'Scenarios deployed'), description: t('健康、保险、校园心理与工业场景陆续试点。', 'Pilots across health, insurance, campus and industry.') },
          { period: t('未来', 'Next'), title: t('规模化与生态', 'Scale & ecosystem'), description: t('沉淀数据与技术壁垒，构建可持续生态。', 'Build data and tech moats and a sustainable ecosystem.') },
        ],
      },
      {
        blockType: 'teamPreview',
        title: t('核心团队', 'Core team'),
        subtitle: t('科技与健康领域的跨界团队。', 'A cross-disciplinary team across tech and health.'),
      },
      {
        blockType: 'ctaBanner',
        title: t('与我们同行', 'Join us on the journey'),
        subtitle: t('无论是合作还是加入我们，都欢迎联系。', 'Whether to partner or to join — get in touch.'),
        primaryCta: { label: t('联系我们', 'Contact Us'), href: '/contact' },
        secondaryCta: { label: t('加入我们', 'Careers'), href: '/careers' },
      },
    ],
  }
}

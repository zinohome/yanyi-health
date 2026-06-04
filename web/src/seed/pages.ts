import { L, type Lang } from './helpers'

type Ids = { health: number[]; industry: number[] }

export const buildHome = (lang: Lang, ids: Ids) => {
  const t = L(lang)
  return {
    title: t('首页', 'Home'),
    slug: 'home',
    status: 'published',
    meta: {
      title: t('研翌数据科技 · 生命全周期健康 AI Agent 平台', 'Yanyi · Life-Cycle Health AI Agent Platform'),
      description: t('让 AI 长期理解人的健康状态。', 'Helping AI understand human health over a lifetime.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('生命全周期健康 AI Agent 平台', 'Life-Cycle Health AI Agent Platform'),
        title: t('让 AI 长期理解人的健康状态', 'Helping AI understand human health over a lifetime'),
        subtitle: t(
          '我们基于 AI Agent、长期记忆系统、多模态状态建模、风险分层与专家协同，帮助医疗机构与科研平台把专业服务从院内延伸到院外，从单次问诊延伸到长期状态管理。',
          'With AI agents, long-term memory, multimodal state modeling, risk tiering and expert collaboration, we extend professional care beyond the clinic — from a single visit to long-term state management.',
        ),
        primaryCta: { label: t('查看解决方案', 'View Solutions'), href: '/solutions' },
        secondaryCta: { label: t('了解核心技术', 'Explore Technology'), href: '/technology' },
      },
      {
        blockType: 'contentMedia',
        title: t('我们解决的问题', 'The problem we solve'),
        body: t(
          '医疗系统擅长诊断和治疗明确疾病，但人的真实健康状态大量发生在医院之外：两次产检之间、出院之后、孩子成长过程中、青少年情绪波动里、成人长期压力与睡眠问题中、运动训练与恢复过程里、老人独居与慢病日常中。\n\n这些状态往往不是一次问诊能解决的，而需要长期理解、持续提醒、风险识别、专业科普与专家协同。研翌数据用 AI Agent 和长期记忆系统，补上医疗健康服务中最重要的"院外连续状态管理"空白。',
          'Healthcare excels at diagnosing and treating disease, but real health states mostly happen outside the clinic: between checkups, after discharge, through a child’s growth, in teenage mood swings, in adult stress and sleep, in training and recovery, in seniors living alone.\n\nThese states need long-term understanding, continuous reminders, risk detection, education and expert collaboration. We close the gap of continuous out-of-clinic management with AI agents and long-term memory.',
        ),
        mediaPosition: 'right',
      },
      {
        blockType: 'capabilityGrid',
        title: t('我们的核心能力', 'Our core capabilities'),
        subtitle: t('从长期记忆到可解释治理，构成可信赖的健康 AI 基础设施。', 'From long-term memory to explainable governance — trustworthy health-AI infrastructure.'),
        capabilities: [
          { icon: 'database', title: t('长期记忆系统', 'Long-term memory'), description: t('跨时间、跨场景、跨数据源的个体状态档案。', 'Per-individual state profiles across time, scenarios and sources.') },
          { icon: 'layers', title: t('多模态状态建模', 'Multimodal modeling'), description: t('融合语言、行为、设备、生理、检查等多源数据。', 'Fusing language, behavior, device, physiological and clinical data.') },
          { icon: 'workflow', title: t('AI Agent 工作流', 'AI agent workflows'), description: t('面向不同专业场景构建专属 Agent。', 'Purpose-built agents for each professional scenario.') },
          { icon: 'gauge', title: t('风险分层与异常识别', 'Risk tiering'), description: t('低/中/高/危机 四级风险分层与处置。', 'Low/medium/high/crisis risk tiering and handling.') },
          { icon: 'shield', title: t('可解释 AI 与专家审核', 'Explainable AI'), description: t('建议有依据、可审核、可追溯，专家规则可配置。', 'Cited, auditable, traceable advice with configurable expert rules.') },
          { icon: 'lock', title: t('权限隔离与数据安全', 'Security & isolation'), description: t('权限隔离、记忆隔离、数据脱敏与全链路审计。', 'Permission/memory isolation, data masking and full audit.') },
          { icon: 'network', title: t('医疗/心理/营养知识库', 'Domain knowledge'), description: t('医院审核知识库与受控内容治理。', 'Hospital-reviewed knowledge with controlled governance.') },
          { icon: 'cpu', title: t('私有化部署与系统对接', 'Private deployment'), description: t('私有化部署，与医院系统对接。', 'Private deployment and hospital-system integration.') },
        ],
      },
      {
        blockType: 'productMatrix',
        title: t('生命全周期解决方案', 'Life-cycle solutions'),
        subtitle: t('覆盖母婴、心理、身心、运动营养与老年照护等关键阶段。', 'Covering maternal, mental, well-being, sports-nutrition and elderly stages.'),
        products: ids.health,
      },
      {
        blockType: 'productMatrix',
        title: t('产业 / 行业拓展', 'Industry extensions'),
        subtitle: t('同一套技术底座，向保险、工业等高价值行业延伸。', 'The same foundation, extended to insurance, industry and beyond.'),
        products: ids.industry,
      },
      {
        blockType: 'statsMetrics',
        title: t('为什么是研翌', 'Why Yanyi'),
        stats: [
          { value: t('生命全周期', 'Life-cycle'), label: t('从孕产到老年', 'Maternity to aging') },
          { value: t('院外连续', 'Continuous'), label: t('院内延伸到院外', 'Beyond the clinic') },
          { value: t('可解释', 'Explainable'), label: t('可审核可追溯', 'Auditable & traceable') },
          { value: t('私有化', 'Private'), label: t('医院系统对接', 'Hospital integration') },
        ],
      },
      {
        blockType: 'caseHighlights',
        title: t('合作与试点', 'Pilots & partnerships'),
        subtitle: t('与医疗机构、妇幼体系与专科共同验证真实价值。', 'Validating real value with hospitals, maternal systems and specialists.'),
      },
      {
        blockType: 'ctaBanner',
        title: t('与我们共同推进 AI 健康转化', 'Advance AI health translation with us'),
        subtitle: t('欢迎医院、妇幼保健体系、精神心理专科与重点实验室联系合作。', 'Hospitals, maternal systems, mental-health specialists and key labs are welcome.'),
        primaryCta: { label: t('医疗科研合作', 'Clinical & Research'), href: '/clinical-research' },
        secondaryCta: { label: t('联系我们', 'Contact Us'), href: '/contact' },
      },
    ],
  }
}

export const buildTechnology = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('核心技术', 'Technology'),
    slug: 'technology',
    status: 'published',
    meta: {
      title: t('EvoMetaX 长期状态智能引擎', 'EvoMetaX — Long-term State Engine'),
      description: t('长期记忆、多模态状态建模、Agent 工作流、风险分层与可解释治理。', 'Memory, multimodal modeling, agent workflows, risk tiering and governance.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('EVOMETAX', 'EVOMETAX'),
        title: t('EvoMetaX 长期状态智能引擎', 'EvoMetaX — the long-term state engine'),
        subtitle: t(
          'EvoMetaX 是研翌面向生命全周期健康场景构建的长期状态 AI Agent 技术底座，由长期记忆、多模态状态建模、Agent 工作流、风险分层和可解释治理组成。',
          'EvoMetaX is our long-term state AI agent foundation for life-cycle health — memory, multimodal modeling, agent workflows, risk tiering and explainable governance.',
        ),
        primaryCta: { label: t('查看解决方案', 'View Solutions'), href: '/solutions' },
        secondaryCta: { label: t('安全与合规', 'Safety & Governance'), href: '/safety' },
      },
      {
        blockType: 'techArchitecture',
        title: t('四域协同的技术底座', 'A four-domain foundation'),
        subtitle: t('以「人体」隐喻组织系统——大脑思考、小脑执行、嘴耳语音、记忆沉淀，边界清晰、独立演进、统一编排。', 'Organized like a body — brain thinks, cerebellum acts, mouth & ears speak and listen, memory remembers. Bounded, independent, orchestrated.'),
        domains: [
          {
            icon: 'brain',
            role: t('大脑', 'Brain'),
            name: t('思考与编排', 'Thinking & Orchestration'),
            description: t(
              '系统唯一的会话事实源，统一管理人格、对话历史与上下文。自研编排引擎完成意图识别、知识/画像/记忆的并行召回与组装，并对工具调用做决策路由；支持配置驱动的多人格、热重载与多模型接入，不锁定单一厂商。',
              'The single source of truth for every conversation — managing persona, history and context. A self-built orchestrator performs intent recognition, parallel recall of knowledge/profile/memory, context assembly and tool routing; config-driven multi-persona, hot-reload and multi-model with no vendor lock-in.',
            ),
          },
          {
            icon: 'wrench',
            role: t('小脑', 'Cerebellum'),
            name: t('工具与技能执行', 'Tools & Skills'),
            description: t(
              '基于开放的 MCP（Model Context Protocol）协议的工具执行层：把检索、计算、外部系统对接等能力封装为独立、可热插拔的工具服务，与大脑解耦，专注稳定、可观测的执行，并可按行业场景扩展专业工具集。',
              'A tool-execution layer on the open MCP (Model Context Protocol): retrieval, computation and system integrations are packaged as independent, hot-pluggable tool services — decoupled from the brain, focused on stable, observable execution, extensible per scenario.',
            ),
          },
          {
            icon: 'mic',
            role: t('嘴和耳朵', 'Mouth & Ears'),
            name: t('实时语音', 'Real-time Voice'),
            description: t(
              '可私有化的实时语音平台：流式语音识别 + 流式语音合成（支持音色克隆）+ 端到端实时语音对话。低延迟首包、支持打断（barge-in）、多轮记忆与中途换人格，针对中文优化，单卡即可部署。',
              'A self-hosted real-time voice platform: streaming ASR + streaming TTS (with voice cloning) + end-to-end voice dialogue. Low first-packet latency, barge-in, multi-turn memory and on-the-fly persona switching — Chinese-optimized, runs on a single GPU.',
            ),
          },
          {
            icon: 'database',
            role: t('记忆', 'Memory'),
            name: t('记忆与画像', 'Memory & Profile'),
            description: t(
              '统一的记忆服务：单一 API 整合会话记忆、结构化用户画像与知识图谱三类引擎，沉淀跨时间、跨场景的长期状态档案，并输出可直接拼入模型的记忆上下文；内置多租户隔离、审计与备份。',
              'A unified memory service: one API over three engines — conversation memory, structured user profiles and a knowledge graph — building long-term, cross-time state profiles and prompt-ready memory context, with multi-tenant isolation, audit and backup.',
            ),
          },
        ],
        note: '',
      },
      {
        blockType: 'capabilityGrid',
        title: t('EvoMetaX 五大技术模块', 'Five EvoMetaX modules'),
        capabilities: [
          { icon: 'database', title: t('长期记忆', 'Long-term memory'), description: t('理解历史轨迹、当前状态、变化趋势与个体化基线。', 'History, current state, trends and personalized baselines.') },
          { icon: 'layers', title: t('多模态状态建模', 'Multimodal modeling'), description: t('融合对话、打卡、检查、体征、睡眠、运动、营养、情绪等。', 'Fuses dialogue, check-ins, reports, vitals, sleep, exercise, nutrition and mood.') },
          { icon: 'workflow', title: t('AI Agent 工作流', 'Agent workflows'), description: t('孕产、随访、产后、新生儿、心理、营养、康复、照护等专属 Agent。', 'Dedicated agents for maternity, follow-up, postpartum, mental health, nutrition, rehab and care.') },
          { icon: 'gauge', title: t('风险分层与异常识别', 'Risk tiering'), description: t('低风险科普 / 中风险随访 / 高风险就医 / 危机干预。', 'Education / follow-up / referral / crisis intervention.') },
          { icon: 'shield', title: t('可解释 AI 与医疗治理', 'Explainable governance'), description: t('医院审核知识库、专家规则、建议依据、版本管理、全链路留痕。', 'Reviewed knowledge, expert rules, cited advice, versioning and full audit.') },
        ],
      },
      {
        blockType: 'faq',
        title: t('常见问题', 'FAQ'),
        items: [
          { question: t('可以私有化部署并对接医院系统吗？', 'Can it be self-hosted and integrate with hospital systems?'), answer: t('可以。支持私有化部署、权限隔离、记忆隔离与数据脱敏。', 'Yes — private deployment with permission/memory isolation and data masking.') },
          { question: t('如何保证医疗建议可信？', 'How is medical advice kept trustworthy?'), answer: t('医院审核知识库、专家规则、建议依据展示、人工复核与全链路留痕。', 'Hospital-reviewed knowledge, expert rules, cited advice, human review and full audit.') },
          { question: t('AI 会替代医生吗？', 'Does AI replace doctors?'), answer: t('不会。我们做专家的智能助手与院外连续管理基础设施，不替代诊断与治疗。', 'No — we assist experts and provide out-of-clinic infrastructure, not diagnosis or treatment.') },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: t('想深入了解 EvoMetaX？', 'Want a deeper look at EvoMetaX?'),
        subtitle: t('我们很乐意为你做一次技术演示与合作探讨。', 'We’d be glad to give a technical walkthrough.'),
        primaryCta: { label: t('预约技术交流', 'Book a Technical Talk'), href: '/contact' },
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
      description: t('我们让 AI 从"回答问题"走向"长期理解状态"。', 'We move AI from answering to understanding state over time.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('ABOUT', 'ABOUT'),
        title: t('让 AI 从"回答问题"走向"长期理解状态"', 'From answering questions to understanding state over time'),
        subtitle: t(
          '研翌数据是一家专注于 AI Agent、长期记忆系统、多模态状态建模、风险分层与智能决策引擎的科技公司。我们相信，真正有价值的健康 AI，应能在长期关系中理解个体状态、识别趋势、支持专业决策。',
          'Yanyi focuses on AI agents, long-term memory, multimodal modeling, risk tiering and decision engines. We believe valuable health AI understands individual state over a long relationship, spots trends and supports professional decisions.',
        ),
      },
      {
        blockType: 'valueProps',
        title: t('使命 · 愿景 · 定位', 'Mission · Vision · Position'),
        items: [
          { icon: 'heart', title: t('使命', 'Mission'), description: t('用可信赖的 AI Agent 和长期记忆系统，帮助人更早理解自己的状态、更好获得专业支持、更持续地管理身心健康。', 'Help people understand their state earlier, get professional support and manage health continuously.') },
          { icon: 'rocket', title: t('愿景', 'Vision'), description: t('让每个人、每个家庭、每个医疗健康机构，都拥有可持续、可信赖、可解释的长期健康智能系统。', 'A sustainable, trustworthy, explainable long-term health system for everyone, every family and every institution.') },
          { icon: 'users', title: t('定位', 'Position'), description: t('做专家的智能助手，做家庭的长期支持系统，做院外连续管理的 AI 基础设施。', "The expert's assistant, the family's long-term support, the infrastructure for out-of-clinic care.") },
        ],
      },
      {
        blockType: 'timeline',
        title: t('发展历程', 'Milestones'),
        milestones: [
          { period: '2025', title: t('EvoMetaX 技术底座成型', 'EvoMetaX foundation built'), description: t('完成长期记忆、多模态建模与 Agent 工作流的底座搭建。', 'Built memory, multimodal modeling and agent workflows.') },
          { period: '2026', title: t('多场景试点落地', 'Scenario pilots'), description: t('母婴、心理、运动营养与老年照护等场景陆续试点。', 'Pilots across maternal, mental, sports-nutrition and elderly care.') },
          { period: t('未来', 'Next'), title: t('医疗科研协同与规模化', 'Research & scale'), description: t('联合医疗机构与重点实验室推进 AI 健康转化。', 'Advance AI health translation with hospitals and key labs.') },
        ],
      },
      {
        blockType: 'teamPreview',
        title: t('核心团队', 'Core team'),
        subtitle: t('来自科技、AI、产业数字化、医疗健康与商业化领域。', 'From tech, AI, digital industry, health and commercialization.'),
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

export const buildClinical = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('医疗科研合作', 'Clinical & Research'),
    slug: 'clinical-research',
    status: 'published',
    meta: {
      title: t('医疗科研合作', 'Clinical & Research Collaboration'),
      description: t('与医疗机构、妇幼保健体系、精神心理专科与重点实验室共同推进 AI 健康转化。', 'Advancing AI health translation with hospitals, maternal systems, specialists and key labs.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('COLLABORATION', 'COLLABORATION'),
        title: t('共同推进 AI 健康转化', 'Advancing AI health translation together'),
        subtitle: t('与医疗机构、妇幼保健体系、精神心理专科和重点实验室共建可信赖的健康 AI。', 'Building trustworthy health AI with hospitals, maternal systems, mental-health specialists and key labs.'),
        primaryCta: { label: t('联系合作', 'Partner with us'), href: '/contact' },
      },
      {
        blockType: 'capabilityGrid',
        title: t('合作方向', 'Collaboration areas'),
        capabilities: [
          { icon: 'heart', title: t('母婴安全与孕产妇连续管理', 'Maternal & child continuity'), description: t('建档后 AI 管理、高危院外随访、产后与新生儿照护、区域妇幼平台。', 'Post-registration management, high-risk follow-up, postpartum & newborn care, regional platforms.') },
          { icon: 'activity', title: t('围产期心理健康', 'Perinatal mental health'), description: t('孕期焦虑与产后抑郁识别、妇产—精神科协同、情绪随访。', 'Antenatal anxiety & postpartum depression, OB/GYN–psychiatry referral, mood follow-up.') },
          { icon: 'graduation-cap', title: t('儿童青少年心理健康', 'Youth mental health'), description: t('医—校—家—社协同、情绪压力与睡眠管理、家长与教师辅助。', 'Hospital-school-family-community, emotion/sleep management, parent & teacher assist.') },
          { icon: 'gauge', title: t('智慧营养与运动机能监测', 'Smart nutrition & performance'), description: t('运动员长期机能档案、营养干预分析、运动健康大模型与 Agent。', 'Performance profiles, nutrition analysis, sports-health models and agents.') },
          { icon: 'bot', title: t('成人身心健康与睡眠', 'Adult well-being & sleep'), description: t('高压人群与睡眠门诊随访、心身医学长期管理、企业员工心理健康。', 'High-pressure & sleep-clinic follow-up, psychosomatic management, employee mental health.') },
        ],
      },
      {
        blockType: 'timeline',
        title: t('合作模式', 'Collaboration models'),
        milestones: [
          { period: t('联合 POC', 'Joint POC'), title: t('1–3 个月快速验证', '1–3 month validation'), description: t('形成可演示产品原型与场景价值评估。', 'A demoable prototype and value assessment.') },
          { period: t('联合课题', 'Joint research'), title: t('共同申报课题', 'Co-apply for grants'), description: t('北京市、国家级、卫健委、科技转化等方向。', 'Municipal, national, health-commission and translation grants.') },
          { period: t('联合实验室', 'Joint lab'), title: t('长期研发合作', 'Long-term R&D'), description: t('围绕母婴、心理、运动营养与长期状态管理。', 'On maternal, mental, sports-nutrition and long-term state management.') },
          { period: t('成果转化', 'Translation'), title: t('产业化推广', 'Industrialization'), description: t('软件产品、专利、软著、论文、示范应用与推广。', 'Software, patents, copyrights, papers, demos and rollout.') },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: t('探索长期健康状态 AI 的真实价值', 'Explore the real value of long-term health AI'),
        subtitle: t('欢迎与医院、妇幼体系、专科、重点实验室与科研机构联系。', 'Hospitals, maternal systems, specialists, labs and institutions welcome.'),
        primaryCta: { label: t('联系合作', 'Partner with us'), href: '/contact' },
      },
    ],
  }
}

export const buildSafety = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('安全与合规', 'Safety & Governance'),
    slug: 'safety',
    status: 'published',
    meta: {
      title: t('安全与合规', 'Safety & Governance'),
      description: t('医疗健康 AI 的前提是安全、克制、可控。', 'The premise of health AI is to be safe, restrained and controllable.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('SAFETY & GOVERNANCE', 'SAFETY & GOVERNANCE'),
        title: t('医疗健康 AI 的前提是安全、克制、可控', 'Health AI must be safe, restrained, controllable'),
        subtitle: t('我们设定清晰边界，并以治理机制保障可解释、可审核、可追溯。', 'We set clear boundaries and ensure explainability, auditability and traceability.'),
      },
      {
        blockType: 'valueProps',
        title: t('我们的边界', 'Our boundaries'),
        subtitle: t('有所不为，才能可信。', 'Trust comes from restraint.'),
        items: [
          { icon: 'shield', title: t('不替代医生与诊断', 'No doctor or diagnosis'), description: t('不替代医生、不自动诊断、不给出处方级医疗建议。', 'We do not replace doctors, auto-diagnose or give prescriptions.') },
          { icon: 'heart', title: t('不替代心理治疗与急救', 'No therapy or emergency'), description: t('不替代心理治疗师、不替代急救系统。', 'We do not replace therapists or emergency systems.') },
          { icon: 'lock', title: t('不绕过专业流程', 'No bypassing process'), description: t('不绕过医院与专业服务流程，不把危机当普通问答。', 'We never bypass clinical processes or treat crises as ordinary chat.') },
        ],
      },
      {
        blockType: 'capabilityGrid',
        title: t('我们的治理机制', 'Our governance'),
        capabilities: [
          { icon: 'network', title: t('审核知识库', 'Reviewed knowledge'), description: t('医院/专家审核知识库与内容版本管理。', 'Hospital/expert-reviewed knowledge with version control.') },
          { icon: 'gauge', title: t('风险分层与危机识别', 'Risk & crisis'), description: t('风险分层规则、危机风险识别与转介。', 'Risk-tiering rules, crisis detection and referral.') },
          { icon: 'shield', title: t('人工审核', 'Human review'), description: t('高风险状态人工审核与建议依据展示。', 'Human review for high-risk states and cited advice.') },
          { icon: 'lock', title: t('隐私与权限', 'Privacy & access'), description: t('用户授权、数据脱敏、权限隔离、记忆隔离。', 'Consent, masking, permission and memory isolation.') },
          { icon: 'cpu', title: t('私有化部署', 'Private deployment'), description: t('私有化部署与全链路审计。', 'Private deployment and end-to-end audit.') },
          { icon: 'sparkles', title: t('可解释可追溯', 'Explainable'), description: t('建议有依据、可审核、可追溯。', 'Cited, auditable, traceable advice.') },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: t('做专家的智能助手，做家庭的长期支持', "The expert's assistant, the family's support"),
        subtitle: t('做医疗机构院外连续管理的 AI 基础设施。', 'The AI infrastructure for out-of-clinic continuous care.'),
        primaryCta: { label: t('联系我们', 'Contact Us'), href: '/contact' },
      },
    ],
  }
}

export const buildResources = (lang: Lang) => {
  const t = L(lang)
  return {
    title: t('资料下载', 'Resources'),
    slug: 'resources',
    status: 'published',
    meta: {
      title: t('资料下载', 'Resources'),
      description: t('公司介绍、解决方案与白皮书资料。', 'Company intro, solutions and white papers.'),
    },
    layout: [
      {
        blockType: 'hero',
        eyebrow: t('RESOURCES', 'RESOURCES'),
        title: t('资料下载', 'Resources'),
        subtitle: t('公司介绍、解决方案说明与白皮书（即将上线）。', 'Company introduction, solution briefs and white papers (coming soon).'),
        primaryCta: { label: t('联系获取资料', 'Request materials'), href: '/contact' },
      },
      {
        blockType: 'faq',
        title: t('资料清单', 'Available materials'),
        items: [
          { question: t('公司介绍（PDF）', 'Company Introduction (PDF)'), answer: t('[资料 待上传] 可通过"联系我们"获取最新版本。', '[To be uploaded] Available on request via Contact.') },
          { question: t('生命全周期解决方案手册', 'Life-cycle Solutions Brochure'), answer: t('[资料 待上传] 涵盖六大场景方案与适用对象。', '[To be uploaded] Covers six scenarios and target users.') },
          { question: t('EvoMetaX 技术白皮书', 'EvoMetaX Technical White Paper'), answer: t('[资料 待上传] 长期记忆、多模态建模与治理机制。', '[To be uploaded] Memory, multimodal modeling and governance.') },
        ],
      },
      {
        blockType: 'ctaBanner',
        title: t('需要更多资料？', 'Need more materials?'),
        subtitle: t('告诉我们你的合作方向，我们会提供对应资料。', 'Tell us your interest and we’ll share the right materials.'),
        primaryCta: { label: t('联系我们', 'Contact Us'), href: '/contact' },
      },
    ],
  }
}

import { rt, L, type Lang } from './helpers'

/* ============================ 站点设置 ============================ */
export const buildSiteSettings = (lang: Lang) => {
  const t = L(lang)
  return {
    companyName: t('北京研翌数据科技有限公司', 'Yanyi Data Technology Co., Ltd.'),
    slogan: t('科技为爱而生，让健康与品质同行', 'Technology born for love — for lasting health and quality of life'),
    email: 'contact@yanyi-health.com',
    phone: t('[电话 待替换]', '[Phone — TBD]'),
    address: t('[公司地址 待替换]', '[Office address — TBD]'),
    icp: '[ICP 备案号 待替换]',
    defaultMeta: {
      title: t('研翌数据科技 · AI + HI 健康智能体', 'Yanyi Data Technology · AI + HI for Health'),
      description: t(
        '研翌数据科技以自研 AI 技术底座，打造懂情感、懂健康的智能伙伴，赋能健康、保险、教育与工业多场景。',
        'Yanyi Data Technology builds emotion- and health-aware AI companions on a self-developed foundation, powering health, insurance, education and industry.',
      ),
    },
  }
}

/* ============================ 分类 ============================ */
export const categories = [
  { slug: 'company', build: (l: Lang) => ({ title: L(l)('公司动态', 'Company') }) },
  { slug: 'tech', build: (l: Lang) => ({ title: L(l)('技术观点', 'Technology') }) },
  { slug: 'industry', build: (l: Lang) => ({ title: L(l)('行业洞察', 'Industry') }) },
]

/* ============================ 产品矩阵 ============================ */
export const buildProducts = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      name: t('EvoMate', 'EvoMate'),
      slug: 'evomate',
      icon: 'heart',
      scenario: 'health',
      order: 1,
      status: 'published',
      tagline: t('AI 健康智能体 + 具身陪伴', 'AI health agent + embodied companion'),
      summary: t(
        '面向中老年人群的个人健康 AI 伙伴，融合家庭医生、营养师与健康教练的智慧，提供情感陪伴、健康管理与居家辅助。',
        'A personal health AI companion for older adults, blending the wisdom of a family doctor, nutritionist and health coach for companionship, health management and at-home assistance.',
      ),
      problem: t(
        '家庭场景中专业健康支持普遍缺位，老年人孤独感强、慢病管理难，中年人则在照护父母与自身健康之间疲于奔命。EvoMate 让专业、贴身、全天候的健康守护变得人人可及。',
        'Professional health support is largely absent at home. Older adults face loneliness and chronic-disease management; the sandwich generation struggles between caring for parents and their own health. EvoMate makes professional, always-on health companionship accessible to everyone.',
      ),
      audience: t('45–70 岁人群及其子女', 'Adults aged 45–70 and their children'),
      features: [
        { title: t('情感陪伴', 'Emotional companionship'), description: t('识别情绪、缓解孤独与压力，越用越懂你。', 'Recognizes emotion, eases loneliness and stress — and understands you more over time.') },
        { title: t('健康管理', 'Health management'), description: t('如家庭医生般监测健康、预警风险、生成健康档案。', 'Monitors health, flags risks and builds a personal health profile like a family doctor.') },
        { title: t('营养与习惯', 'Nutrition & habits'), description: t('定制饮食方案，像健康教练一样督促健康计划。', 'Personalized nutrition plans and coach-style habit building.') },
      ],
    },
    {
      name: t('SelfCEO 身心陪伴官', 'SelfCEO'),
      slug: 'self-ceo',
      icon: 'activity',
      scenario: 'health',
      order: 2,
      status: 'published',
      tagline: t('AI 身心一体陪伴', 'AI mind-body companion'),
      summary: t(
        '以「情绪节律 + 身体节律 + AI 陪伴官」三轴联动的身心健康应用，帮助每个人成为自己身心状态的「CEO」。',
        'A mind-body wellness app linking emotional rhythm, physical rhythm and an AI companion — helping everyone become the CEO of their own wellbeing.',
      ),
      problem: t(
        '现代人长期处于压力与情绪波动中，却缺乏可持续、个性化的身心管理工具。SelfCEO 用 AI 把碎片化的情绪与身体信号，沉淀为可理解、可行动的节律洞察。',
        'People live under chronic stress and mood swings yet lack sustainable, personalized tools. SelfCEO turns fragmented emotional and physical signals into understandable, actionable rhythm insights.',
      ),
      audience: t('关注身心健康的都市人群', 'Urban users who care about mind-body wellbeing'),
      features: [
        { title: t('情绪节律', 'Emotional rhythm'), description: t('情绪记录、日记与冥想，看见自己的情绪曲线。', 'Mood logging, journaling and meditation to visualize your emotional curve.') },
        { title: t('身体节律', 'Physical rhythm'), description: t('体征、睡眠、运动与用药的连续追踪与提醒。', 'Continuous tracking of vitals, sleep, exercise and medication.') },
        { title: t('AI 陪伴官', 'AI companion'), description: t('个性化对话陪伴，主动关怀与建议。', 'Personalized conversational companionship with proactive care.') },
      ],
    },
    {
      name: t('保智通 InsureVertex AI', 'InsureVertex AI'),
      slug: 'insurevertex-ai',
      icon: 'shield',
      scenario: 'insurance',
      order: 3,
      status: 'published',
      tagline: t('保险代理人智能助手', 'Intelligent assistant for insurance agents'),
      summary: t(
        '面向保险代理人的垂直业务智能体，以「专业知识大脑 + 数字化培训教练 + 场景化对练陪跑」把答疑升级为可交付结果。',
        'A vertical agent for insurance professionals — a knowledge brain, a digital training coach and scenario-based practice partner that turns Q&A into deliverable results.',
      ),
      problem: t(
        '强监管下的保险业务需要可落地的负责任 AI：边界清晰、可审计可追溯。代理人的能力提升正从「知识获取」走向「训练闭环与持续进化」。',
        'Highly regulated insurance needs responsible, auditable AI with clear boundaries. Agent capability is shifting from knowledge access to a closed-loop training and continuous improvement.',
      ),
      audience: t('保险代理人与团队负责人', 'Insurance agents and team leaders'),
      features: [
        { title: t('专业知识问答', 'Knowledge Q&A'), description: t('带引用、可追溯、口径可治理的专业问答。', 'Cited, traceable, governable professional answers.') },
        { title: t('数字化培训', 'Digital training'), description: t('课件、题库与讲稿生产，培训内容可发布可治理。', 'Generates courseware, question banks and scripts — governable and publishable.') },
        { title: t('场景对练陪跑', 'Scenario practice'), description: t('角色扮演式对练与评分，越练越强。', 'Role-play practice with scoring — get stronger with every session.') },
      ],
    },
    {
      name: t('青禾智护 SproutGuard', 'SproutGuard'),
      slug: 'sproutguard',
      icon: 'graduation-cap',
      scenario: 'education',
      order: 4,
      status: 'published',
      tagline: t('校园青少年心理健康支持体系', 'Youth mental-health support for schools'),
      summary: t(
        '以 AI 与专业心理支持能力，连接学生、家长、老师与咨询师，构建「记录—理解—陪练—干预—跟踪」的青少年心理健康协同网络。',
        'Connecting students, parents, teachers and counselors with AI and professional support to build a collaborative youth mental-health network: record, understand, practice, intervene, follow up.',
      ),
      problem: t(
        '青少年心理健康问题日益突出，家庭与学校普遍缺乏早期识别与科学沟通的工具，高风险信号难以被及时发现与干预。',
        'Youth mental-health needs are rising, while families and schools lack tools for early detection and constructive communication, leaving high-risk signals unaddressed.',
      ),
      audience: t('初高中学生家庭与学校', 'Junior/senior-high families and schools'),
      features: [
        { title: t('情绪树洞与成长教练', 'Safe space & growth coach'), description: t('学生端隐私倾诉、共情陪伴与成长建议。', 'Private expression, empathetic companionship and growth guidance for students.') },
        { title: t('亲子沟通陪练', 'Parent coaching'), description: t('家长沟通复盘与情境对练，给出更合适的表达。', 'Communication review and scenario practice for parents.') },
        { title: t('分级风险与转介', 'Tiered risk & referral'), description: t('风险分级识别、人工复核与转介建议（非医疗诊断）。', 'Tiered risk detection, human review and referral (non-diagnostic).') },
      ],
    },
    {
      name: t('IndustriaX 工业 AI 应用底座', 'IndustriaX'),
      slug: 'industriax',
      icon: 'factory',
      scenario: 'industry',
      order: 5,
      status: 'published',
      tagline: t('面向高价值工业流程与关键资产的 AI 应用平台', 'AI application platform for high-value industrial processes and critical assets'),
      summary: t(
        '将同一套 AI 技术底座延伸至工业场景，面向高价值流程与关键资产，提供知识沉淀、智能问答与流程辅助的应用底座。',
        'Extends the same AI foundation into industry — an application platform for high-value processes and critical assets, with knowledge capture, intelligent Q&A and process assistance.',
      ),
      audience: t('工业企业与关键资产运营方', 'Industrial enterprises and critical-asset operators'),
      features: [
        { title: t('工业知识沉淀', 'Industrial knowledge'), description: t('把分散的工艺、设备与运维知识结构化、可检索。', 'Structures and makes searchable scattered process, equipment and O&M knowledge.') },
        { title: t('智能问答与辅助', 'Intelligent assistance'), description: t('面向一线的可追溯问答与流程辅助。', 'Traceable Q&A and process assistance for frontline teams.') },
        { title: t('可私有化部署', 'Private deployment'), description: t('适配企业内网与安全合规要求。', 'Fits enterprise intranet and compliance requirements.') },
      ],
    },
  ]
}

/* ============================ 案例（匿名化） ============================ */
export const buildCases = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      title: t('港险代理人智能助手试点', 'Pilot: AI assistant for insurance agents'),
      slug: 'case-insurance-pilot',
      client: t('某头部港险机构', 'A leading insurance organization'),
      industry: 'insurance',
      order: 1,
      status: 'published',
      summary: t(
        '以专业知识大脑 + 数字化培训为核心，帮助代理团队把「答疑」升级为「可交付结果」，并以可追溯、可治理的方式落地负责任 AI。',
        'A knowledge brain plus digital training helps agent teams turn Q&A into deliverable results, deploying responsible AI in a traceable, governable way.',
      ),
      metrics: [
        { value: t('可追溯', 'Traceable'), label: t('答案带引用与口径治理', 'Cited, governed answers') },
        { value: t('训练闭环', 'Closed loop'), label: t('对练与评分驱动成长', 'Practice & scoring') },
      ],
    },
    {
      title: t('校园心理健康协同试点', 'Pilot: school mental-health network'),
      slug: 'case-school-pilot',
      client: t('某重点中学', 'A key secondary school'),
      industry: 'education',
      order: 2,
      status: 'published',
      summary: t(
        '打通「记录—理解—陪练—干预—跟踪」闭环，帮助家长与老师更早识别与回应学生的心理状态，并以隐私优先的方式保护学生。',
        'A closed loop from recording to follow-up helps parents and teachers detect and respond to students earlier, with a privacy-first design.',
      ),
      metrics: [
        { value: t('隐私优先', 'Privacy-first'), label: t('默认私密、授权可控', 'Private by default') },
        { value: t('家校协同', 'Family-school'), label: t('多方视角整合', 'Unified perspectives') },
      ],
    },
  ]
}

/* ============================ 团队（能力画像占位） ============================ */
export const buildTeam = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      name: t('创始人 & CEO', 'Founder & CEO'),
      role: t('连续创业者 · 工业互联网与健康', 'Serial entrepreneur · IIoT & health'),
      bio: t('[能力画像 待替换] 科技与健康领域深耕多年，曾主导大型平台从 0 到 1。', '[Profile — TBD] Years in tech and health, led large platforms from zero to one.'),
      order: 1,
    },
    {
      name: t('CTO', 'CTO'),
      role: t('AI 架构 · 大模型与 Agent 系统', 'AI architecture · LLM & agent systems'),
      bio: t('[能力画像 待替换] 负责自研技术底座与多 Agent 架构设计。', '[Profile — TBD] Leads the in-house AI foundation and multi-agent architecture.'),
      order: 2,
    },
    {
      name: t('首席科学家', 'Chief Scientist'),
      role: t('健康 AI · 多模态与记忆系统', 'Health AI · multimodal & memory'),
      bio: t('[能力画像 待替换] 专注健康垂类模型与长期记忆系统。', '[Profile — TBD] Focuses on health-domain models and long-term memory.'),
      order: 3,
    },
    {
      name: t('产品负责人', 'Head of Product'),
      role: t('场景产品 · 从试点到规模化', 'Scenario products · pilot to scale'),
      bio: t('[能力画像 待替换] 负责行业场景产品的设计与落地。', '[Profile — TBD] Drives scenario product design and delivery.'),
      order: 4,
    },
  ]
}

/* ============================ 招聘 ============================ */
export const buildJobs = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      title: t('高级全栈工程师', 'Senior Full-stack Engineer'),
      slug: 'senior-fullstack',
      department: 'engineering',
      location: t('北京 / 远程', 'Beijing / Remote'),
      type: 'fulltime',
      order: 1,
      status: 'published',
      description: rt([
        t('负责公司产品与平台的前后端开发，参与架构设计与工程实践。', 'Build front-end and back-end for our products and platform; contribute to architecture and engineering practice.'),
        t('要求：扎实的 TypeScript/Node 与现代前端框架经验；对 AI 应用有热情。', 'Requirements: solid TypeScript/Node and modern front-end experience; passion for AI applications.'),
      ]),
    },
    {
      title: t('AI 算法工程师（LLM / Agent）', 'AI Engineer (LLM / Agent)'),
      slug: 'ai-engineer',
      department: 'ai',
      location: t('北京', 'Beijing'),
      type: 'fulltime',
      order: 2,
      status: 'published',
      description: rt([
        t('负责大模型应用、Agent 编排、记忆与知识系统的研发。', 'Develop LLM applications, agent orchestration, memory and knowledge systems.'),
        t('要求：熟悉 RAG、向量检索、多 Agent 协作与提示工程。', 'Requirements: familiar with RAG, vector search, multi-agent collaboration and prompting.'),
      ]),
    },
    {
      title: t('产品经理（AI 健康 / 行业场景）', 'Product Manager (AI Health / Verticals)'),
      slug: 'product-manager',
      department: 'product',
      location: t('北京', 'Beijing'),
      type: 'fulltime',
      order: 3,
      status: 'published',
      description: rt([
        t('负责行业场景产品从需求到落地的全流程，连接技术与业务。', 'Own scenario products end to end, bridging technology and business.'),
        t('要求：优秀的结构化思考与跨团队协作能力；有健康/保险/教育经验优先。', 'Requirements: strong structured thinking and cross-team collaboration; health/insurance/education experience a plus.'),
      ]),
    },
  ]
}

/* ============================ 资讯 / Blog ============================ */
export const buildPosts = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      slug: 'why-ai-plus-hi',
      categoryKey: 'company',
      publishedAt: '2026-05-20',
      author: t('研翌数据', 'Yanyi'),
      title: t('AI + HI：我们为什么这样定义健康陪伴', 'AI + HI: how we define health companionship'),
      excerpt: t('真正有价值的健康陪伴，不只是更聪明的模型，而是 AI 与人类智慧的深度融合。', 'Truly valuable health companionship is not just a smarter model, but a deep fusion of AI and human wisdom.'),
      content: rt([
        t('我们相信，健康陪伴的核心不是技术参数，而是「懂」——懂情感，也懂健康。', 'We believe the core of health companionship is not specs, but understanding — of both emotion and health.'),
        t('AI 提供规模与持续性，HI（人类智慧）提供温度与专业判断。两者结合，才能让专业的健康守护变得人人可及。', 'AI brings scale and continuity; HI brings warmth and professional judgment. Together they make professional care accessible to all.'),
      ]),
    },
    {
      slug: 'four-domain-architecture',
      categoryKey: 'tech',
      publishedAt: '2026-05-12',
      author: t('技术团队', 'Engineering'),
      title: t('技术底座解读：四域协同的 AI 架构', 'Inside our four-domain AI architecture'),
      excerpt: t('思考、执行、语音、记忆——四个边界清晰的域，协同构成可复用的 AI 底座。', 'Thinking, action, voice and memory — four clearly bounded domains forming a reusable AI foundation.'),
      content: rt([
        t('我们用「人体」隐喻来组织系统：大脑负责思考与编排，小脑负责工具执行，嘴和耳朵负责实时语音，记忆负责画像与长期记忆。', 'We organize the system with a human-body metaphor: the brain thinks and orchestrates, the cerebellum executes tools, the mouth and ears handle real-time voice, and memory holds profiles and long-term recall.'),
        t('清晰的职责边界让每个域都能独立演进、独立部署，并被多个上层应用复用。', 'Clear boundaries let each domain evolve and deploy independently, and be reused across applications.'),
      ]),
    },
    {
      slug: 'scenarios-from-insurance-to-campus',
      categoryKey: 'industry',
      publishedAt: '2026-04-28',
      author: t('研翌数据', 'Yanyi'),
      title: t('AI 场景落地：从保险到校园心理健康', 'From insurance to campus: putting AI scenarios to work'),
      excerpt: t('同一套技术底座，如何在不同高价值场景中落地为可交付的结果。', 'How one foundation becomes deliverable results across high-value scenarios.'),
      content: rt([
        t('在保险场景，我们把「答疑」升级为话术、课件与评分；在校园场景，我们连接家校生，构建心理健康协同网络。', 'In insurance we turn Q&A into scripts, courseware and scoring; on campus we connect families, schools and students into a mental-health network.'),
        t('场景不同，底座相同——这正是可复用 AI 底座的价值所在。', 'Different scenarios, same foundation — that is the value of a reusable AI base.'),
      ]),
    },
  ]
}

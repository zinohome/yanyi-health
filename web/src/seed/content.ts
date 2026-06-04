import { rt, L, type Lang } from './helpers'

/* ============================ 站点设置 ============================ */
export const buildSiteSettings = (lang: Lang) => {
  const t = L(lang)
  return {
    companyName: t('北京研翌数据科技有限公司', 'Yanyi Data Technology Co., Ltd.'),
    slogan: t('让 AI 长期理解人的健康状态', 'Helping AI understand human health over a lifetime'),
    email: '',
    wechatId: 'perffie',
    phone: '18600576849',
    address: '',
    icp: '京ICP备2025154917号-1',
    defaultMeta: {
      title: t('研翌数据科技 · 生命全周期健康 AI Agent 平台', 'Yanyi Data Technology · Life-Cycle Health AI Agent Platform'),
      description: t(
        '研翌数据构建面向生命全周期健康管理的长期状态 AI Agent 平台，覆盖母婴安全、心理健康、运动营养、老年照护等场景。',
        'A long-term, stateful Health AI Agent platform for maternal & child health, mental wellness, sports nutrition and healthy aging.',
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

/* ============================ 解决方案（生命全周期） ============================ */
export const buildProducts = (lang: Lang) => {
  const t = L(lang)
  const aud = (...xs: [string, string][]) => xs.map(([zh, en]) => ({ value: t(zh, en) }))
  const feat = (...xs: [string, string, string, string][]) =>
    xs.map(([zt, et, zd, ed]) => ({ title: t(zt, et), description: t(zd, ed) }))

  return [
    {
      name: t('母婴安全 AI Agent', 'Maternal & Child Safety Agent'),
      slug: 'maternal-care',
      icon: 'heart',
      scenario: 'maternal',
      order: 1,
      status: 'published',
      tagline: t('从建档到孩子 1 岁，陪伴每一次关键变化', 'From registration to age one — by your side at every milestone'),
      summary: t(
        '从孕妇建册/医院建档开始，覆盖孕期、分娩、产后恢复、新生儿照护与 0–1 岁成长发育，提供科普、提醒、打卡、异常初筛、风险提示与医护协同。',
        'From hospital registration through pregnancy, delivery, postpartum recovery, newborn care and 0–1 development — education, reminders, check-ins, early screening, risk alerts and care-team collaboration.',
      ),
      problem: t(
        '母婴风险大量发生在两次产检之间与出院之后，单次问诊难以连续跟进。我们用长期记忆与风险分层补上"院外连续状态管理"的空白。',
        'Maternal and infant risks largely occur between checkups and after discharge, where single visits fall short. We close the gap with long-term memory and risk tiering for continuous out-of-clinic management.',
      ),
      audience: aud(
        ['医院妇产科', 'Hospital OB/GYN'],
        ['妇幼保健院', 'Maternal & child health centers'],
        ['区域卫健委', 'Regional health authorities'],
        ['社区妇幼网络', 'Community maternal networks'],
        ['孕产妇和家庭', 'Mothers & families'],
      ),
      features: feat(
        ['按孕周科普与产检提醒', 'Week-by-week education & checkup reminders', '建档后手机端 Agent 开通，按孕周推送科普与产检提醒。', 'Mobile agent activated after registration, with week-based education and checkup reminders.'],
        ['多维健康打卡', 'Multi-dimensional check-ins', '血压、血糖、体重、胎动、情绪等结构化打卡与异常交互。', 'Structured check-ins for blood pressure, glucose, weight, fetal movement and mood.'],
        ['高危随访与分层管理', 'High-risk follow-up & tiering', '高危孕产妇随访提醒，医护端分层管理看板。', 'Follow-up reminders for high-risk pregnancies and a tiered management dashboard for clinicians.'],
        ['产后与新生儿照护', 'Postpartum & newborn care', '分娩准备、产后恢复、母乳喂养、新生儿照护与 0–1 岁发育提醒。', 'Delivery prep, postpartum recovery, breastfeeding, newborn care and 0–1 development guidance.'],
      ),
    },
    {
      name: t('围产期心理健康 Agent', 'Perinatal Mental Health Agent'),
      slug: 'perinatal-mental-health',
      icon: 'heart',
      scenario: 'perinatal',
      order: 2,
      status: 'published',
      tagline: t('把产科安全与心理安全放进同一个连续管理系统', 'Physical and emotional safety in one continuous system'),
      summary: t(
        '面向孕期与产后女性，关注孕期焦虑、产后抑郁风险、睡眠剥夺、育儿压力与家庭支持，支持妇产科—精神心理科协同转介。',
        'For pregnant and postpartum women — addressing antenatal anxiety, postpartum depression risk, sleep deprivation and family support, with OB/GYN–psychiatry referral.',
      ),
      problem: t(
        '产后情绪问题常被忽视，且分散在产科与精神心理科之间。我们让心理安全与产科安全在同一连续系统中被持续看见。',
        'Postpartum emotional issues are often overlooked and split across departments. We keep mental and physical safety visible within one continuous system.',
      ),
      audience: aud(
        ['医院妇产科', 'Hospital OB/GYN'],
        ['精神心理专科', 'Psychiatry & psychology'],
        ['妇幼保健院', 'Maternal & child health centers'],
        ['产后康复机构', 'Postpartum recovery centers'],
        ['孕产妇和家庭', 'Mothers & families'],
      ),
      features: feat(
        ['孕期焦虑与产前支持', 'Antenatal anxiety support', '孕期焦虑与压力科普、产前恐惧支持。', 'Education on antenatal anxiety and stress, and prenatal fear support.'],
        ['产后情绪随访', 'Postpartum mood follow-up', '产后情绪打卡、睡眠剥夺与育儿压力支持、产后抑郁风险提示。', 'Mood check-ins, sleep-deprivation and parenting-stress support, postpartum depression risk alerts.'],
        ['家庭支持', 'Family support', '家属支持与沟通建议，营造支持性家庭环境。', 'Guidance for family members to build a supportive environment.'],
        ['协同转介与人工介入', 'Referral & human-in-the-loop', '妇产科—精神心理科协同转介，高风险状态人工介入流程。', 'OB/GYN–psychiatry referral and human intervention for high-risk states.'],
      ),
    },
    {
      name: t('儿童青少年心理健康 Agent', 'Youth Mental Health Agent'),
      slug: 'youth-mental-health',
      icon: 'graduation-cap',
      scenario: 'youth',
      order: 3,
      status: 'published',
      tagline: t('连接医院、学校、家庭与社区的青少年心理支持系统', 'Connecting hospital, school, family and community for youth mental health'),
      summary: t(
        '面向儿童青少年、家长、学校与医院心理门诊，支持情绪压力识别、亲子关系支持、学习压力管理、早期求助引导与医—校—家协同。',
        'For children, teens, parents, schools and clinics — emotion/stress detection, parent-child support, study-stress management, early help-seeking and hospital-school-family collaboration.',
      ),
      problem: t(
        '青少年情绪问题与亲子、学业压力交织，早期信号难被及时发现与回应。我们构建医—校—家—社协同的连续支持网络。',
        'Youth emotional issues intertwine with family and academic stress, and early signals go unnoticed. We build a continuous hospital-school-family-community network.',
      ),
      audience: aud(
        ['精神心理专科医院', 'Mental health hospitals'],
        ['儿童心理卫生中心', 'Child psychology centers'],
        ['学校心理中心', 'School counseling centers'],
        ['家庭', 'Families'],
        ['区域心理健康服务平台', 'Regional mental-health platforms'],
      ),
      features: feat(
        ['情绪与压力管理', 'Emotion & stress management', '情绪压力记录、睡眠与学习压力管理、相关科普。', 'Emotion logging, sleep and study-stress management, and education.'],
        ['亲子与求助支持', 'Parent-child & help-seeking', '亲子沟通支持、主动求助引导、家长支持 Agent。', 'Parent-child communication support, help-seeking guidance and a parent-support agent.'],
        ['医—校—家协同', 'Hospital-school-family link', '学校心理老师辅助 Agent，医—校—家协同管理。', 'A counselor-assist agent and coordinated hospital-school-family management.'],
        ['风险提示与危机干预', 'Risk & crisis flow', '厌学/拒学风险提示，高风险危机干预提示（非诊断）。', 'School-refusal risk alerts and crisis-intervention prompts (non-diagnostic).'],
      ),
    },
    {
      name: t('成人身心健康 Agent', 'Adult Well-being Agent'),
      slug: 'adult-wellness',
      icon: 'activity',
      scenario: 'adult',
      order: 4,
      status: 'published',
      tagline: t('面向高压人群的长期身心状态支持', 'Long-term mind-body support for high-pressure lives'),
      summary: t(
        '面向高压职场人、长期疲劳与睡眠问题人群，提供情绪、压力、睡眠、身体状态与生活节律的长期支持。',
        'For high-pressure professionals and people with fatigue or sleep issues — long-term support for emotion, stress, sleep, body state and life rhythm.',
      ),
      problem: t(
        '成人长期压力与睡眠问题往往得不到连续关注。我们提供可持续、个性化的身心状态长期支持。',
        'Chronic stress and sleep problems rarely get continuous attention. We provide sustainable, personalized long-term support.',
      ),
      audience: aud(
        ['高压职场人', 'High-pressure professionals'],
        ['企业员工健康平台', 'Corporate wellness platforms'],
        ['心理门诊 / 睡眠门诊', 'Psychology & sleep clinics'],
        ['心身医学科', 'Psychosomatic medicine'],
        ['家庭用户', 'Individuals & families'],
      ),
      features: feat(
        ['情绪与压力理解', 'Emotion & stress', '长期理解情绪与压力，提供自我调适训练。', 'Long-term understanding of emotion and stress with self-regulation training.'],
        ['睡眠与生活节律', 'Sleep & rhythm', '睡眠与生活节律支持、身体状态记录。', 'Sleep and life-rhythm support with body-state tracking.'],
        ['职场与关系支持', 'Work & relationships', '职场压力、家庭与亲密关系支持。', 'Support for workplace stress and family/intimate relationships.'],
        ['必要时连接专业', 'Connect to professionals', '必要时连接心理门诊、睡眠门诊等专业服务。', 'Connect to clinics and professional services when needed.'],
      ),
    },
    {
      name: t('运动健康与营养代谢 AI 引擎', 'Sports & Nutrition AI Engine'),
      slug: 'sports-nutrition',
      icon: 'gauge',
      scenario: 'sports',
      order: 5,
      status: 'published',
      tagline: t('让运动和营养数据拥有长期记忆', 'Give sports and nutrition data a long-term memory'),
      summary: t(
        '面向运动医学、营养代谢与科研平台，提供长期机能档案、多模态数据融合、个体化营养运动建议、训练恢复分析与专业 Agent 工作流。',
        'For sports medicine, metabolic nutrition and research — long-term performance profiles, multimodal fusion, personalized advice, recovery analysis and professional agent workflows.',
      ),
      problem: t(
        '运动与营养数据零散、缺乏长期纵向理解。我们用长期记忆与多模态建模沉淀可研究、可干预的机能档案。',
        'Sports and nutrition data are fragmented and lack longitudinal understanding. We build researchable, actionable profiles via memory and multimodal modeling.',
      ),
      audience: aud(
        ['运动医学研究团队', 'Sports-medicine research teams'],
        ['营养代谢实验室', 'Metabolic nutrition labs'],
        ['专业运动队', 'Professional sports teams'],
        ['医院运动医学科', 'Hospital sports-medicine depts'],
        ['健康管理机构', 'Health-management organizations'],
      ),
      features: feat(
        ['长期机能档案', 'Long-term performance profile', '运动员长期机能档案，训练负荷与恢复状态分析。', 'Athlete performance profiles with training-load and recovery analysis.'],
        ['营养代谢融合', 'Nutrition & metabolism', '营养代谢数据融合、个体化智能配餐。', 'Metabolic-data fusion and personalized meal planning.'],
        ['干预效果追踪', 'Intervention tracking', '功能营养干预效果追踪、疲劳与损伤风险提示。', 'Functional-nutrition effect tracking and fatigue/injury risk alerts.'],
        ['专业 Agent 工作流', 'Professional agent workflows', '队医 Agent、营养师 Agent、康复教练 Agent、科研分析 Agent。', 'Team-doctor, dietitian, rehab-coach and research-analysis agents.'],
      ),
    },
    {
      name: t('老年照护与慢病陪伴 Agent', 'Elderly & Chronic Care Agent'),
      slug: 'elderly-care',
      icon: 'users',
      scenario: 'elderly',
      order: 6,
      status: 'published',
      tagline: t('让长期独立生活的人被持续看见和支持', 'Keep those living independently continuously seen and supported'),
      summary: t(
        '面向老年人、慢病人群与家庭照护者，提供日常状态记录、用药提醒、情绪陪伴、异常提示与家庭协同支持。',
        'For older adults, people with chronic conditions and caregivers — daily check-ins, medication reminders, companionship, anomaly alerts and family collaboration.',
      ),
      problem: t(
        '独居老人与慢病人群的日常状态缺乏连续关注。我们提供长期陪伴、异常提示与家庭—社区协同。',
        'Daily states of seniors living alone and chronic patients lack continuous attention. We offer long-term companionship, alerts and family-community collaboration.',
      ),
      audience: aud(
        ['老年人', 'Older adults'],
        ['慢病人群', 'People with chronic conditions'],
        ['家庭照护者', 'Family caregivers'],
        ['社区健康服务机构', 'Community health services'],
        ['养老机构', 'Eldercare institutions'],
      ),
      features: feat(
        ['日常健康打卡', 'Daily check-ins', '日常健康打卡、慢病生活方式支持。', 'Daily health check-ins and chronic-care lifestyle support.'],
        ['用药与复诊提醒', 'Medication & follow-up', '用药与复诊提醒，异常状态提醒。', 'Medication and follow-up reminders with anomaly alerts.'],
        ['情绪与孤独陪伴', 'Companionship', '情绪与孤独感支持，温暖陪伴。', 'Emotional and loneliness support with warm companionship.'],
        ['家庭与社区协同', 'Family & community', '家庭成员协同，必要时连接医生与社区服务。', 'Family collaboration and connection to doctors/community when needed.'],
      ),
    },
    {
      name: t('保智通 InsureVertex AI', 'InsureVertex AI'),
      slug: 'insurevertex-ai',
      icon: 'shield',
      scenario: 'industry',
      order: 7,
      status: 'published',
      tagline: t('技术底座的行业拓展：保险代理人智能助手', 'Industry extension: intelligent assistant for insurance agents'),
      summary: t(
        '将长期记忆、知识库与 Agent 工作流的技术底座拓展到保险场景，为代理人提供专业问答、数字化培训与场景对练。',
        'Extending our memory, knowledge and agent-workflow foundation to insurance — professional Q&A, digital training and scenario practice for agents.',
      ),
      problem: t(
        '同一套技术底座可在强监管行业落地负责任 AI：可追溯、可治理、人类监督前置。',
        'The same foundation deploys responsible, auditable, human-supervised AI in regulated industries.',
      ),
      audience: aud(['保险代理人', 'Insurance agents'], ['团队负责人', 'Team leaders'], ['保险机构', 'Insurers']),
      features: feat(
        ['专业知识问答', 'Knowledge Q&A', '带引用、可追溯、口径可治理的专业问答。', 'Cited, traceable, governable professional answers.'],
        ['数字化培训与对练', 'Training & practice', '课件题库生产与角色扮演式对练评分。', 'Courseware generation and role-play practice with scoring.'],
      ),
    },
    {
      name: t('IndustriaX 工业 AI 应用底座', 'IndustriaX'),
      slug: 'industriax',
      icon: 'factory',
      scenario: 'industry',
      order: 8,
      status: 'published',
      tagline: t('技术底座的行业拓展：高价值工业流程 AI 平台', 'Industry extension: AI platform for high-value industrial processes'),
      summary: t(
        '将同一套 AI 技术底座延伸至工业场景，面向高价值流程与关键资产，提供知识沉淀、智能问答与流程辅助。',
        'Extending the foundation to industry — knowledge capture, intelligent Q&A and process assistance for high-value processes and critical assets.',
      ),
      problem: t(
        '工业知识分散、经验难以沉淀。可私有化部署，适配企业内网与安全合规要求。',
        'Industrial knowledge is scattered and hard to retain. Private deployment fits intranet and compliance needs.',
      ),
      audience: aud(['工业企业', 'Industrial enterprises'], ['关键资产运营方', 'Critical-asset operators']),
      features: feat(
        ['工业知识沉淀', 'Industrial knowledge', '把分散的工艺、设备与运维知识结构化、可检索。', 'Structure scattered process/equipment/O&M knowledge into a searchable base.'],
        ['智能问答与私有化', 'Q&A & private deploy', '面向一线的可追溯问答，支持私有化部署。', 'Traceable frontline Q&A with private deployment.'],
      ),
    },
  ]
}

/* ============================ 案例（匿名化） ============================ */
export const buildCases = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      title: t('区域妇幼健康连续管理试点', 'Pilot: regional maternal & child continuous care'),
      slug: 'case-maternal-pilot',
      client: t('某区域妇幼保健机构', 'A regional maternal & child health institution'),
      industry: 'maternal',
      order: 1,
      status: 'published',
      summary: t(
        '以孕产妇建档后 AI Agent 管理为核心，打通孕期—产后—新生儿连续状态管理与高危随访，验证院外连续管理价值。',
        'Centered on post-registration AI agent management, connecting pregnancy-postpartum-newborn continuity and high-risk follow-up.',
      ),
      metrics: [
        { value: t('连续管理', 'Continuous'), label: t('院外状态不中断', 'No out-of-clinic gap') },
        { value: t('可追溯', 'Traceable'), label: t('建议有依据可审核', 'Auditable advice') },
      ],
    },
    {
      title: t('医—校—家青少年心理协同试点', 'Pilot: hospital-school-family youth mental health'),
      slug: 'case-youth-pilot',
      client: t('某精神心理专科与试点学校', 'A psychiatry specialty & pilot schools'),
      industry: 'youth',
      order: 2,
      status: 'published',
      summary: t(
        '连接医院心理门诊、学校与家庭，支持情绪压力识别、亲子支持与早期求助引导，隐私优先、可控授权。',
        'Connecting clinics, schools and families for emotion detection, parent support and early help-seeking — privacy-first with controlled authorization.',
      ),
      metrics: [
        { value: t('医校家', 'Tri-party'), label: t('多方视角整合', 'Unified perspectives') },
        { value: t('隐私优先', 'Privacy-first'), label: t('默认私密授权可控', 'Private by default') },
      ],
    },
  ]
}

/* ============================ 团队（能力画像占位） ============================ */
export const buildTeam = (lang: Lang) => {
  const t = L(lang)
  return [
    { name: t('创始人 & CEO', 'Founder & CEO'), role: t('连续创业者 · 产业数字化与健康', 'Serial entrepreneur · digital industry & health'), bio: t('[能力画像 待替换] 科技与健康领域深耕多年。', '[Profile — TBD] Years across tech and health.'), order: 1 },
    { name: t('CTO', 'CTO'), role: t('AI 架构 · 长期记忆与 Agent 系统', 'AI architecture · memory & agent systems'), bio: t('[能力画像 待替换] 负责 EvoMetaX 技术底座。', '[Profile — TBD] Leads the EvoMetaX foundation.'), order: 2 },
    { name: t('首席医学官', 'Chief Medical Officer'), role: t('医疗健康 · 临床转化与治理', 'Health · clinical translation & governance'), bio: t('[能力画像 待替换] 负责医疗合规与专家协同。', '[Profile — TBD] Leads clinical governance and expert collaboration.'), order: 3 },
    { name: t('产品负责人', 'Head of Product'), role: t('场景产品 · 从试点到规模化', 'Scenario products · pilot to scale'), bio: t('[能力画像 待替换] 负责场景方案落地。', '[Profile — TBD] Drives scenario delivery.'), order: 4 },
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
        t('负责健康 AI 平台的前后端开发，参与架构设计与工程实践。', 'Build front-end and back-end for our health AI platform.'),
        t('要求：扎实的 TypeScript/Node 与现代前端经验；对医疗健康 AI 有热情。', 'Requirements: solid TypeScript/Node; passion for health AI.'),
      ]),
    },
    {
      title: t('AI 算法工程师（LLM / Agent / 记忆）', 'AI Engineer (LLM / Agent / Memory)'),
      slug: 'ai-engineer',
      department: 'ai',
      location: t('北京', 'Beijing'),
      type: 'fulltime',
      order: 2,
      status: 'published',
      description: rt([
        t('负责长期记忆、多模态状态建模、Agent 工作流与风险分层研发。', 'Develop long-term memory, multimodal modeling, agent workflows and risk tiering.'),
        t('要求：熟悉 RAG、向量检索、多 Agent 协作与可解释机制。', 'Requirements: RAG, vector search, multi-agent collaboration and explainability.'),
      ]),
    },
    {
      title: t('医疗产品经理（健康 / 心理 / 妇幼）', 'Medical Product Manager'),
      slug: 'product-manager',
      department: 'product',
      location: t('北京', 'Beijing'),
      type: 'fulltime',
      order: 3,
      status: 'published',
      description: rt([
        t('负责健康场景方案从需求到落地，连接临床、科研与工程。', 'Own health-scenario solutions end to end, bridging clinical, research and engineering.'),
        t('要求：医疗/心理/妇幼相关背景优先，优秀的结构化思考能力。', 'Requirements: health/psychology/maternal background preferred; strong structured thinking.'),
      ]),
    },
  ]
}

/* ============================ 资讯 / Blog ============================ */
export const buildPosts = (lang: Lang) => {
  const t = L(lang)
  return [
    {
      slug: 'understand-health-over-time',
      categoryKey: 'company',
      publishedAt: '2026-05-20',
      author: t('研翌数据', 'Yanyi'),
      title: t('让 AI 长期理解人的健康状态', 'Helping AI understand health over a lifetime'),
      excerpt: t('真正有价值的健康 AI，不止于回答问题，而是在长期关系中理解个体状态。', 'Valuable health AI does not just answer questions — it understands state over a long relationship.'),
      content: rt([
        t('医疗系统擅长诊断和治疗明确疾病，但人的真实健康状态大量发生在医院之外。', 'Healthcare excels at diagnosing disease, yet real health states mostly happen outside the clinic.'),
        t('我们用 AI Agent 与长期记忆系统，补上"院外连续状态管理"的空白。', 'We use AI agents and long-term memory to close the gap of continuous out-of-clinic management.'),
      ]),
    },
    {
      slug: 'evometax-long-term-state-engine',
      categoryKey: 'tech',
      publishedAt: '2026-05-12',
      author: t('技术团队', 'Engineering'),
      title: t('EvoMetaX：长期状态智能引擎解读', 'Inside EvoMetaX: a long-term state engine'),
      excerpt: t('长期记忆、多模态状态建模、Agent 工作流、风险分层与可解释治理。', 'Long-term memory, multimodal modeling, agent workflows, risk tiering and explainable governance.'),
      content: rt([
        t('EvoMetaX 由长期记忆、多模态状态建模、Agent 工作流、风险分层和可解释治理组成。', 'EvoMetaX combines memory, multimodal modeling, agent workflows, risk tiering and explainable governance.'),
        t('它让 AI 从"回答问题"走向"长期理解状态"，并在需要时连接专家与医疗流程。', 'It moves AI from answering to understanding state over time, connecting experts and clinical processes when needed.'),
      ]),
    },
    {
      slug: 'responsible-health-ai',
      categoryKey: 'industry',
      publishedAt: '2026-04-28',
      author: t('研翌数据', 'Yanyi'),
      title: t('医疗健康 AI 的前提：安全、克制、可控', 'The premise of health AI: safe, restrained, controllable'),
      excerpt: t('不替代医生、不自动诊断；可解释、可审核、可追溯。', 'Not replacing doctors or auto-diagnosing; explainable, auditable, traceable.'),
      content: rt([
        t('医疗与心理场景中的 AI 必须可解释、可审核、可追溯，并设清晰边界。', 'AI in medical and mental-health settings must be explainable, auditable, traceable, with clear boundaries.'),
        t('做专家的智能助手，做家庭的长期支持系统，做院外连续管理的 AI 基础设施。', "Be the expert's assistant, the family's long-term support, and the infrastructure for out-of-clinic care."),
      ]),
    },
  ]
}

import { rt, L, type Lang } from './helpers'

/* ============================ 站点设置 ============================ */
export const buildSiteSettings = (lang: Lang) => {
  const t = L(lang)
  return {
    companyName: t('北京研翌数据科技有限公司', 'Yanyi Data Technology Co., Ltd.'),
    slogan: t('专注医疗健康AI智能体，以专业医学护航全周期身心健康', 'Focused healthcare AI agents, delivering professional medical guidance for whole-life wellbeing'),
    email: 'contact@yanyi-ai.com',
    wechatId: 'perffie',
    phone: '18600576849',
    address: '',
    icp: '京ICP备2025154917号',
    defaultMeta: {
      title: t('研翌科技 · 生命全周期健康 AI Agent 平台', 'Yanyi Technology · Life-Cycle Health AI Agent Platform'),
      description: t(
        '研翌科技构建面向生命全周期健康管理的长期状态 AI Agent 平台，覆盖母婴安全、心理健康、运动营养、老年照护等场景。',
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
  const pts = (...xs: [string, string][]) => xs.map(([zh, en]) => ({ value: t(zh, en) }))
  const feat = (...xs: [string, string, string, string][]) =>
    xs.map(([zt, et, zd, ed]) => ({ title: t(zt, et), description: t(zd, ed) }))
  // 闭环步骤与价值成效同为 {title, description}
  const flow = feat
  const hl = feat

  return [
    {
      name: t('母婴安全 AI Agent', 'Maternal & Child Safety AI Agent'),
      slug: 'maternal-care',
      overview: t(
        '从孕妇建册开始，把分散在产检、打卡与日常里的健康信号串成一条连续的状态轨迹；让医院的专业照护延伸到家庭，覆盖孕期、分娩、产后恢复到新生儿 0–1 岁成长。',
        'From hospital registration, we weave scattered signals from checkups, check-ins and daily life into one continuous trajectory — extending professional care into the home across pregnancy, delivery, postpartum recovery and the baby’s first year.',
      ),
      painPoints: pts(
        ['两次产检之间风险难以连续监测', 'Risks go unmonitored between checkups'],
        ['出院后家庭照护出现断档', 'Care breaks down after discharge'],
        ['高危孕产妇随访成本高、易遗漏', 'High-risk follow-up is costly and easily missed'],
      ),
      workflow: flow(
        ['建档开通', 'Onboarding', '孕妇建册后手机端 Agent 一键开通', 'One-tap mobile agent after registration'],
        ['孕期管理', 'Pregnancy', '按孕周科普、产检提醒与多维打卡', 'Week-based education, reminders and check-ins'],
        ['异常初筛', 'Screening', '结构化交互识别异常、风险分层', 'Structured screening and risk tiering'],
        ['高危随访', 'Follow-up', '高危分层随访 + 医护看板', 'Tiered high-risk follow-up with a clinician dashboard'],
        ['产后照护', 'Postpartum', '产后恢复、母乳喂养与新生儿成长', 'Recovery, breastfeeding and newborn growth'],
      ),
      highlights: hl(
        ['院外不断档', 'Continuous', '院内照护延伸到家庭，状态不中断', 'Care extends from clinic to home'],
        ['风险早识别', 'Early detection', '分层预警，把风险前移', 'Tiered alerts move risk upstream'],
        ['医护减负', 'Lighter load', '看板化管理，随访更高效', 'Dashboard-driven, efficient follow-up'],
      ),
      icon: 'heart',
      scenario: 'maternal',
      order: 3,
      status: 'published',
      tagline: t('从建档到孩子 1 岁，陪伴每一次关键变化', 'From registration to age one — by your side at every milestone'),
      summary: t(
        '从孕妇建册/医院建档开始，覆盖孕期、分娩、产后恢复、新生儿照护与 0–1 岁成长发育，提供孕周科普 · 产检提醒与准备 · 报告解释辅助 · 血压/血糖/体重/胎动记录 · 饮食运动睡眠提醒 · 异常症状主动追问 · 分层就医引导等全程支持。',
        'From hospital registration through pregnancy, delivery, postpartum recovery, newborn care and 0–1 development — weekly education, checkup reminders & prep, report interpretation, BP/glucose/weight/fetal-movement logging, diet/exercise/sleep reminders, proactive symptom follow-up, and tiered referral guidance.',
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
        ['孕周科普与产检提醒准备', 'Weekly education & checkup prep', '建档后按孕周推送科普内容，并提前提醒产检时间与注意事项。', 'Week-based education and advance checkup reminders with preparation tips after registration.'],
        ['报告解释辅助', 'Report interpretation', '产检报告关键指标解读与异常提示，帮助孕妇理解检查结果。', 'Key indicator explanation and anomaly flagging on prenatal reports to help mothers understand results.'],
        ['多维健康记录', 'Multi-dimensional health logging', '血压、血糖、体重、胎动、饮食、运动、睡眠等结构化打卡与趋势追踪。', 'Structured logging of BP, glucose, weight, fetal movement, diet, exercise and sleep with trend tracking.'],
        ['异常症状主动追问', 'Proactive symptom follow-up', '对录入的异常症状主动追问细节，辅助早期风险识别。', 'Proactively follows up on reported symptoms to capture details and support early risk detection.'],
        ['分层就医引导', 'Tiered referral guidance', '根据风险分级给出居家观察、门诊复查或急诊就医的分层建议。', 'Tiered guidance — home observation, outpatient review or emergency visit — based on risk level.'],
        ['高危随访与分层管理', 'High-risk follow-up & tiering', '高危孕产妇随访提醒，医护端分层管理看板。', 'Follow-up reminders for high-risk pregnancies and a tiered management dashboard for clinicians.'],
        ['产后与新生儿照护', 'Postpartum & newborn care', '分娩准备、产后恢复、母乳喂养、新生儿照护与 0–1 岁发育提醒。', 'Delivery prep, postpartum recovery, breastfeeding, newborn care and 0–1 development guidance.'],
      ),
    },
    {
      name: t('围产期心理健康 AI Agent', 'Perinatal Mental Health AI Agent'),
      slug: 'perinatal-mental-health',
      overview: t(
        '把产科安全与心理安全放进同一个连续系统，持续关注孕期焦虑、产后抑郁风险、睡眠剥夺与家庭支持，并打通妇产科—精神心理科的协同转介。',
        'Bringing physical and emotional safety into one continuous system — antenatal anxiety, postpartum depression risk, sleep deprivation and family support, with OB/GYN–psychiatry referral.',
      ),
      painPoints: pts(
        ['产后情绪问题常被忽视', 'Postpartum emotions are often overlooked'],
        ['心理与产科服务相互割裂', 'Mental and obstetric care are siloed'],
        ['家庭支持与沟通不足', 'Family support and communication fall short'],
      ),
      workflow: flow(
        ['情绪科普', 'Education', '孕期焦虑与产前心理支持', 'Antenatal anxiety & prenatal support'],
        ['状态打卡', 'Check-in', '产后情绪与睡眠状态打卡', 'Postpartum mood & sleep check-ins'],
        ['风险识别', 'Screening', '产后抑郁风险分级提示', 'Tiered postpartum-depression alerts'],
        ['协同转介', 'Referral', '妇产—精神科协同与人工介入', 'OB/GYN–psychiatry referral & human review'],
      ),
      highlights: hl(
        ['身心一体', 'Whole-person', '心理与产科在同一系统', 'Mental & obstetric in one system'],
        ['风险分级', 'Tiered risk', '分级提示、人工复核', 'Tiered alerts with human review'],
        ['家庭参与', 'Family in loop', '家属支持与沟通建议', 'Family support and guidance'],
      ),
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
      name: t('儿童青少年心理健康 AI Agent', 'Youth Mental Health AI Agent'),
      slug: 'youth-mental-health',
      overview: t(
        '连接医院、学校、家庭与社区，把"感觉孩子不对劲"变成可被理解、可被改善的连续过程；覆盖情绪、学业、亲子与同伴，隐私优先、授权可控。',
        'Connecting hospital, school, family and community — turning "something feels off" into an understandable, improvable process across emotion, study, parenting and peers, privacy-first with controlled authorization.',
      ),
      painPoints: pts(
        ['早期心理信号难被及时发现', 'Early signals go unnoticed'],
        ['亲子沟通困难、冲突升级', 'Parent-child communication breaks down'],
        ['医、校、家信息相互割裂', 'Hospital, school and family stay siloed'],
      ),
      workflow: flow(
        ['记录表达', 'Express', '学生隐私倾诉与情绪记录', 'Private expression & mood logging'],
        ['理解评估', 'Assess', '情绪状态评估与沟通模式识别', 'State assessment & pattern detection'],
        ['陪练建议', 'Coach', '亲子沟通陪练与成长建议', 'Parent-child practice & growth advice'],
        ['干预转介', 'Intervene', '风险分级与转介建议', 'Tiered risk & referral'],
        ['跟踪复盘', 'Follow-up', '阶段报告与多方协同跟进', 'Stage reports & coordinated follow-up'],
      ),
      highlights: hl(
        ['隐私优先', 'Privacy-first', '默认私密、授权可控', 'Private by default, controlled access'],
        ['医校家协同', 'Tri-party', '多方视角整合', 'Unified perspectives'],
        ['风险分级', 'Tiered', '关注/预警/高危分级处置', 'Tiered handling of risk'],
      ),
      icon: 'graduation-cap',
      scenario: 'youth',
      order: 4,
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
      name: t('成人身心健康 AI Agent', 'Adult Well-being AI Agent'),
      slug: 'adult-wellness',
      overview: t(
        '面向高压人群，用长期记忆理解情绪、压力、睡眠与身体状态的变化趋势，提供可持续、个性化的身心支持，并在需要时连接专业服务。',
        'For high-pressure lives — long-term memory to understand trends in emotion, stress, sleep and body state, offering sustainable, personalized support and connecting to professionals when needed.',
      ),
      painPoints: pts(
        ['长期压力缺乏连续关注', 'Chronic stress lacks continuity'],
        ['睡眠与情绪问题反复出现', 'Sleep and mood issues recur'],
        ['自助工具难以长期坚持', 'Self-help tools are hard to sustain'],
      ),
      workflow: flow(
        ['状态记录', 'Record', '情绪、压力、睡眠与身体状态记录', 'Logging emotion, stress, sleep and body'],
        ['趋势洞察', 'Insight', '长期趋势与个体化基线', 'Long-term trends & personalized baselines'],
        ['自我调适', 'Regulate', '个性化调适与练习', 'Personalized self-regulation'],
        ['专业连接', 'Connect', '必要时连接心理/睡眠门诊', 'Connect to clinics when needed'],
      ),
      highlights: hl(
        ['长期理解', 'Long-term', '越用越懂你', 'Understands you over time'],
        ['节律平衡', 'Rhythm', '情绪与生活节律支持', 'Emotion & rhythm support'],
        ['适时转介', 'Referral', '必要时连接专业服务', 'Professional connection when needed'],
      ),
      icon: 'activity',
      scenario: 'adult',
      order: 5,
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
      name: t('运动健康与营养代谢 AI Agent', 'Sports & Nutrition AI Agent'),
      slug: 'sports-nutrition',
      overview: t(
        '面向运动健康、主动健康与智慧营养场景，我们打造"运动健康与营养代谢 AI Agent"，围绕运动机能监测、营养代谢评估、个性化运动营养干预、健康长期状态跟踪、运动性疾病与损伤预警、智能配餐与营养品适配六大能力，帮助用户建立连续、动态、个性化的健康管理闭环。',
        'For active health and smart nutrition, our Sports & Nutrition AI Agent delivers six capabilities: fitness monitoring, metabolic assessment, personalized intervention, long-term health tracking, injury and sports-disease alerts, and intelligent meal & supplement planning — building a continuous, dynamic, personalized health management loop.',
      ),
      painPoints: pts(
        ['数据零散、缺乏纵向分析', 'Fragmented data, no longitudinal view'],
        ['营养与训练干预效果难追踪', 'Intervention effects are hard to track'],
        ['缺乏专业 Agent 协同工作流', 'No professional agent workflow'],
      ),
      workflow: flow(
        ['多模态采集', 'Capture', '训练、营养、睡眠与体征采集', 'Training, nutrition, sleep and vitals'],
        ['机能建模', 'Model', '长期机能档案与负荷分析', 'Performance profiles & load analysis'],
        ['个体化建议', 'Advise', '营养与运动个体化建议', 'Personalized nutrition & training'],
        ['干预追踪', 'Track', '干预效果与损伤风险追踪', 'Effect & injury-risk tracking'],
      ),
      highlights: hl(
        ['长期机能档案', 'Profiles', '可研究的纵向数据', 'Researchable longitudinal data'],
        ['多模态融合', 'Fusion', '多源数据统一理解', 'Unified multimodal view'],
        ['专业 Agent', 'Agents', '队医/营养/康复/科研', 'Doctor / nutrition / rehab / research'],
      ),
      icon: 'gauge',
      scenario: 'sports',
      order: 1,
      status: 'published',
      tagline: t('让运动和营养数据拥有长期记忆', 'Give sports and nutrition data a long-term memory'),
      summary: t(
        '面向运动医学、营养代谢与科研转化场景，融合多模态健康数据与长期机能档案，提供个性化运动营养建议、训练恢复分析、风险预警和专业个人运动健康&营养代谢 AI 助手。',
        'For sports medicine, metabolic nutrition and research translation — fusing multimodal health data with long-term performance profiles to deliver personalized sports-nutrition advice, training-recovery analysis, risk alerts and a professional personal sports-health & metabolic AI assistant.',
      ),
      problem: t(
        '运动与营养数据零散、缺乏长期纵向理解。我们用长期记忆与多模态建模沉淀可研究、可干预的机能档案，建立连续、动态、个性化的健康管理闭环。',
        'Sports and nutrition data are fragmented and lack longitudinal understanding. We use memory and multimodal modeling to build researchable profiles and a continuous, dynamic, personalized health management loop.',
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
      name: t('老年照护与慢病陪伴 AI Agent', 'Elderly & Chronic Care AI Agent'),
      slug: 'elderly-care',
      overview: t(
        '面向老年与慢病人群，提供日常状态记录、用药提醒、情绪陪伴与异常提示，连接家庭与社区，让长期独立生活的人被持续看见、被及时支持。',
        'For older adults and chronic-care — daily check-ins, medication reminders, companionship and anomaly alerts, connecting family and community so independent lives are continuously seen and supported.',
      ),
      painPoints: pts(
        ['独居日常状态无人连续关注', 'Day-to-day state goes unwatched'],
        ['用药与复诊容易遗漏', 'Medication and follow-ups get missed'],
        ['情绪孤独、缺乏陪伴', 'Loneliness without companionship'],
      ),
      workflow: flow(
        ['日常打卡', 'Check-in', '日常健康与慢病状态记录', 'Daily health & chronic-care logging'],
        ['异常识别', 'Detect', '异常状态识别与提示', 'Anomaly detection & alerts'],
        ['提醒陪伴', 'Care', '用药复诊提醒与情绪陪伴', 'Reminders & emotional companionship'],
        ['家庭社区协同', 'Coordinate', '家庭成员与社区服务协同', 'Family & community coordination'],
      ),
      highlights: hl(
        ['持续被看见', 'Always seen', '日常状态不被忽视', 'Daily states never ignored'],
        ['异常早提示', 'Early alert', '风险及时通知家庭', 'Timely alerts to family'],
        ['家庭协同', 'Family', '多方共同照护', 'Shared, coordinated care'],
      ),
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
      name: t('保智通 InsureVertex AI Agent', 'InsureVertex AI Agent'),
      slug: 'insurevertex-ai',
      overview: t(
        '面向保险、财富管理等专业金融服务场景，我们打造金融服务 AI Agent，围绕专业知识问答、AI 销售训练、客户洞察分析与个性化方案生成，帮助金融从业人员提升专业服务能力和客户经营效率。该方案基于专业知识库、长期记忆与 Agent 工作流，能够为代理人、理财顾问、客户经理等角色提供产品知识解读、销售话术训练、客户需求分析、场景化沟通建议和定制化方案辅助。通过"学习—训练—沟通—方案—复盘"的闭环，金融服务 AI Agent 可持续提升团队的专业表达、客户转化、方案匹配和长期经营能力。',
        'For insurance, wealth management and professional financial services, our Financial Services AI Agent covers professional Q&A, AI sales training, customer insight analysis and personalized proposal generation — helping financial professionals improve service quality and client management efficiency. Built on a professional knowledge base, long-term memory and agent workflows, it supports agents, advisors and relationship managers with product knowledge, sales coaching, client-needs analysis, contextual communication guidance and proposal assistance. The "learn–train–communicate–propose–review" loop continuously raises team capability in professional expression, conversion, proposal matching and long-term client development.',
      ),
      painPoints: pts(
        ['专业知识更新快、难以掌握', 'Fast-changing professional knowledge'],
        ['培训与陪练成本高', 'Costly training and coaching'],
        ['展业口径不统一、难合规', 'Inconsistent, hard-to-govern messaging'],
      ),
      workflow: flow(
        ['专业问答', 'Q&A', '带引用、口径可治理的问答', 'Cited, governed answers'],
        ['培训生产', 'Training', '课件与题库自动生产', 'Auto courseware & question banks'],
        ['场景对练', 'Practice', '角色扮演式对练与评分', 'Role-play practice & scoring'],
        ['复盘提升', 'Improve', '复盘与持续训练', 'Review & continuous training'],
      ),
      highlights: hl(
        ['可追溯', 'Traceable', '答案有据可查', 'Cited and auditable'],
        ['训练闭环', 'Closed loop', '越练越强', 'Stronger with practice'],
        ['可治理', 'Governable', '口径与合规前置', 'Governance built in'],
      ),
      icon: 'shield',
      scenario: 'industry',
      order: 7,
      status: 'published',
      tagline: t('技术底座的行业拓展：保险与财富管理专业金融服务 AI Agent', 'Industry extension: AI Agent for insurance and wealth management'),
      summary: t(
        '面向保险、财富管理等专业金融服务场景，构建"知识问答—销售训练—客户洞察—方案生成"的 Agent 工作流，帮助金融从业人员提升专业表达、客户经营与方案转化能力。',
        'For insurance, wealth management and professional financial services — an Agent workflow spanning knowledge Q&A, sales training, customer insight and proposal generation, helping financial professionals improve professional expression, client management and conversion.',
      ),
      problem: t(
        '金融从业人员面临专业知识快速更新、培训成本高、展业口径不一致等挑战。同一套技术底座在强监管行业落地负责任 AI：可追溯、可治理、人类监督前置。',
        'Financial professionals face rapidly evolving knowledge, high training costs and inconsistent client messaging. The same foundation deploys responsible, auditable, human-supervised AI in regulated industries.',
      ),
      audience: aud(['保险代理人', 'Insurance agents'], ['团队负责人', 'Team leaders'], ['保险机构', 'Insurers']),
      features: feat(
        ['专业知识问答', 'Knowledge Q&A', '带引用、可追溯、口径可治理的专业问答。', 'Cited, traceable, governable professional answers.'],
        ['数字化培训与对练', 'Training & practice', '课件题库生产与角色扮演式对练评分。', 'Courseware generation and role-play practice with scoring.'],
      ),
    },
    {
      name: t('IndustriaX 产业智能应用场景', 'IndustriaX'),
      slug: 'industriax',
      overview: t(
        '用 AI 重构市场感知、工程研发与业务决策效率，提升中国先进制造业的市场快速精准反应力，解决中国制造业从「制造效率」走向研发效率 · 业务决策效率 · 市场快速反应力的问题。',
        'Rebuilding market sensing, R&D and business-decision efficiency with AI — improving rapid, precise market response for advanced Chinese manufacturing, moving the industry beyond production efficiency toward R&D efficiency, decision efficiency and market agility.',
      ),
      painPoints: pts(
        ['工业知识分散、难以沉淀', 'Scattered, hard-to-retain knowledge'],
        ['老师傅经验难以传承', 'Expert experience is hard to pass on'],
        ['一线查询效率低', 'Slow frontline lookups'],
      ),
      workflow: flow(
        ['知识沉淀', 'Capture', '工艺/设备/运维知识结构化', 'Structure process/equipment/O&M knowledge'],
        ['智能问答', 'Q&A', '面向一线的可追溯问答', 'Traceable frontline Q&A'],
        ['流程辅助', 'Assist', '关键流程的智能辅助', 'Assistance on key processes'],
        ['私有化部署', 'Deploy', '企业内网部署、安全合规', 'Intranet deployment, compliant'],
      ),
      highlights: hl(
        ['知识资产化', 'Knowledge asset', '经验沉淀为可复用资产', 'Experience becomes a reusable asset'],
        ['可追溯', 'Traceable', '答案可溯源', 'Traceable answers'],
        ['安全可控', 'Secure', '私有化与权限隔离', 'Private with access isolation'],
      ),
      icon: 'factory',
      scenario: 'industry',
      order: 8,
      status: 'published',
      tagline: t('AI 技术底座的跨行业拓展：面向先进制造业的产业智能 AI 应用场景', 'Cross-industry AI extension: intelligent AI applications for advanced manufacturing'),
      summary: t(
        'AI 技术底座的跨行业拓展：面向先进制造业的产业智能 AI 应用场景。用 AI 重构市场感知、工程研发与业务决策效率，提升中国先进制造业的市场快速精准反应力。',
        'Cross-industry extension of the AI foundation: intelligent AI applications for advanced manufacturing. Rebuilding market sensing, R&D and business-decision efficiency to improve rapid, precise market response.',
      ),
      problem: t(
        '中国制造业亟需从「制造效率」走向研发效率 · 业务决策效率 · 市场快速反应力。工业知识分散，经验难以沉淀。我们用 AI 把分散知识变为可复用资产，支持私有化部署与安全合规。',
        "Chinese manufacturing needs to move beyond production efficiency toward R&D efficiency, decision efficiency and market agility. Industrial knowledge is scattered; we turn it into reusable assets with private, compliant deployment.",
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
    {
      name: t('创始人 & CEO', 'Founder & CEO'),
      role: t('战略 · AI 商业化 · 连续创业', 'Strategy · AI commercialization'),
      bio: t(
        '高新技术领域 25 年（含 IBM 16 年），12 年 AI 与 5 年机器人研发及商业化经验；曾带领 AI 团队在医疗、康养、金融、汽车、工业等多行业落地，并主导大型工业互联网平台快速做大。',
        '25 years in deep tech (16 at IBM), 12 in AI and 5 in robotics; led AI commercialization across healthcare, eldercare, finance, automotive and industry, and scaled a major industrial-internet platform.',
      ),
      order: 1,
    },
    {
      name: t('首席科学家', 'Chief Scientist'),
      role: t('AI · 语音识别 · 计算机视觉', 'AI · Speech · Computer Vision'),
      bio: t(
        '曾任全球头部科技企业顶尖 AI 技术带头人；在 AI、数据挖掘、语音识别与计算机视觉领域发表 60+ 篇论文、获 20+ 项中美专利（NeurIPS/ICML/AAAI 等顶会）；曾任教清华、UIUC、NYU。',
        'A top AI technology leader; 60+ papers and 20+ US/China patents across AI, speech and vision (NeurIPS/ICML/AAAI); taught at Tsinghua, UIUC and NYU.',
      ),
      order: 2,
    },
    {
      name: t('联合创始人 · 智能硬件', 'Co-founder · Hardware'),
      role: t('智能硬件 · 芯片 EDA · 出海', 'Smart hardware · EDA · Global'),
      bio: t(
        '连续创业者；曾创建欧美高端智能灌溉品牌（全球市场前三、客户遍及 50+ 国），并组建国内领先的数字芯片 Signoff EDA 团队，突破关键"卡脖子"环节。',
        'Serial founder; built a top-3 global smart-irrigation brand (50+ countries) and a leading digital-chip signoff EDA team.',
      ),
      order: 3,
    },
    {
      name: t('具身智能技术负责人', 'Head of Embodied AI'),
      role: t('机器人 · 强化学习 · 具身智能', 'Robotics · RL · Embodied AI'),
      bio: t(
        '精于机器人运动学/动力学、深度强化学习与物理仿真；多次从 0 到 1 组建团队，正向开发工业机器人与多轴数控系统（相关公司成功上市）。',
        'Expert in robot kinematics/dynamics, deep RL and simulation; repeatedly built teams from scratch, delivering industrial robots and CNC systems (a spin-off went public).',
      ),
      order: 4,
    },
    {
      name: t('AI 技术总监', 'AI Engineering Director'),
      role: t('硅谷 · 大模型 · 对话系统', 'Silicon Valley · LLM · Dialogue'),
      bio: t(
        '硅谷资深 AI 工程师，Meta GenAI / Speech 与 Amazon Alexa AI 对话机器人开发者。',
        'Senior Silicon Valley AI engineer; built Meta GenAI/Speech and Amazon Alexa conversational AI.',
      ),
      order: 5,
    },
    {
      name: t('数据模型总监', 'Data & Modeling Director'),
      role: t('硅谷 · 数据治理 · 大模型应用', 'Data governance · LLM apps'),
      bio: t(
        '硅谷资深技术专家，曾任谷歌、微软团队 Leader 及两家创业公司 CTO；主导基于大模型的内容生成与总结系统。',
        'Senior engineer; team lead at Google and Microsoft, CTO at two startups; led LLM-based generation and summarization.',
      ),
      order: 6,
    },
    {
      name: t('心理健康首席专家', 'Chief Mental Health Expert'),
      role: t('临床心理 · EAP · 家校协同', 'Clinical psychology · EAP'),
      bio: t(
        '临床心理学博士、美国心理学会会员，国际 EAP 协会中国分会常务理事；深耕心理健康与教育领域多年，曾获"长城友谊奖"。',
        'Clinical psychology PhD and APA member; EAP China council member with decades in mental health and education.',
      ),
      order: 7,
    },
    {
      name: t('健康管理首席专家', 'Chief Health Expert'),
      role: t('临床医学 · 健康管理', 'Clinical medicine · Health'),
      bio: t(
        '复旦大学医学博士，深耕临床与健康管理，连接医疗专业能力与 AI 健康场景。',
        'Fudan medical PhD; bridges clinical expertise and AI health scenarios.',
      ),
      order: 8,
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
      author: t('研翌科技', 'Yanyi'),
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
      author: t('研翌科技', 'Yanyi'),
      title: t('医疗健康 AI 的前提：安全、克制、可控', 'The premise of health AI: safe, restrained, controllable'),
      excerpt: t('不替代医生、不自动诊断；可解释、可审核、可追溯。', 'Not replacing doctors or auto-diagnosing; explainable, auditable, traceable.'),
      content: rt([
        t('医疗与心理场景中的 AI 必须可解释、可审核、可追溯，并设清晰边界。', 'AI in medical and mental-health settings must be explainable, auditable, traceable, with clear boundaries.'),
        t('做专家的智能助手，做个人健康的长期支持系统，做院外连续管理的 AI 基础设施。', "Be the expert's assistant, the long-term support for personal health, and the infrastructure for out-of-clinic care."),
      ]),
    },
  ]
}

import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "隐私政策",
  lastUpdated: "30 August 2026",
  intro: [
    `本隐私政策说明 ${LEGAL_COMPANY_NAME}（CUI ${LEGAL_CUI}）在 example.com 运营 ${LEGAL_PRODUCT_NAME} 服务（以下简称「我们」）在您使用我们的网站、控制台和云同步 API 时如何收集、使用、存储和保护您的个人数据。`,
    "我们依据欧盟《通用数据保护条例》（GDPR）及适用的罗马尼亚数据保护法律处理个人数据。",
  ],
  sections: [
    {
      title: "1. 数据控制者",
      paragraphs: [
        `负责您个人数据的数据控制者为 ${LEGAL_COMPANY_NAME}，CUI ${LEGAL_CUI}，注册地址：${LEGAL_REGISTERED_ADDRESS}。`,
        `${LEGAL_PRODUCT_NAME} 是我们 MT5 跟单交易云服务的商号。如有隐私相关咨询或需行使您的权利，请通过 ${LEGAL_CONTACT_EMAIL} 联系我们。`,
      ],
    },
    {
      title: "2. 我们收集的数据",
      paragraphs: ["我们仅收集提供 SaaS Template 服务所必需的数据："],
      bullets: [
        "账户数据：姓名、电子邮件地址、密码哈希（若您通过电子邮件注册）以及个人资料图片（若您通过 Google 登录）。",
        "会话数据：身份验证 Cookie、会话令牌，以及在使用 Web 控制台时可选的 IP 地址和浏览器 User-Agent。",
        "订阅数据：套餐等级、订阅状态及 Stripe 客户标识符。支付卡信息由 Stripe 收集和存储，而非由我们存储。",
        "交易同步数据：由您的 MetaTrader 5 Expert Advisor（EA）发送的经纪商公司名称、账户余额、净值、持仓及已平仓交易历史。对于 Mirror Ownership（防止多个终端连接同一账户时重复交易），EA 可能发送您的 MT5 账户号码以便我们生成单向租约密钥；我们仅存储该哈希值，不存储账户号码或交易密码。",
        "EA API 凭证：您的 SaaS Template User ID，由 EA 在 x-user-id 请求头中传输。请将其视为机密——任何拥有您的 User ID 且订阅有效的人都可能访问您的同步 API。",
        "入门数据：您是否已完成设置向导。",
        "支持数据：若您提交私密帮助表单，我们会存储您的电子邮件、消息类别、主题和正文，并在您已登录时可能将工单关联至您的账户。为防滥用，基于 IP 的临时速率限制计数器可能保存在应用内存中。",
        "帮助机器人消息：若您使用可选的帮助聊天，您的提示词及模型回复将发送至第 5 节所述的 AI 提供商，以便我们基于公开 FAQ 作答。请勿在聊天中粘贴密码或完整密钥。",
      ],
    },
    {
      title: "3. 数据用途及法律依据",
      paragraphs: [
        "我们基于 GDPR 第 6 条，为以下目的并在以下法律依据下处理您的个人数据：",
      ],
      bullets: [
        "提供您的账户、控制台及云同步服务——履行与您的合同（Art. 6(1)(b)）。",
        "通过 Stripe 处理订阅及账单——履行合同及财务记录的法定义务（Art. 6(1)(b) 和 (c)）。",
        "保障服务安全、防止滥用并保护 API 访问——合法利益（Art. 6(1)(f)）。",
        "发送事务性身份验证邮件（如密码重置链接）——履行合同及账户安全的合法利益（Art. 6(1)(b) 和 (f)）。",
        "Google OAuth 登录（若您选择）——您在登录时的同意（Art. 6(1)(a)）。",
        "响应支持请求（电子邮件、私密帮助表单或帮助机器人）及法律问询——合法利益或法定义务（视情况而定）。",
      ],
    },
    {
      title: "4. Cookie",
      paragraphs: [
        "我们使用严格必要的会话 Cookie 以保持您在 SaaS Template 控制台的登录状态。这些 Cookie 对服务至关重要，依据 ePrivacy 指令无需征得同意。",
        "首次访问时，我们会显示 Cookie 偏好横幅。分析功能（Cloudflare Web Analytics 及匿名漏斗事件）仅在您选择「全部接受」或在 Cookie 设置中启用 Analytics 时加载。这是无 Cookie 的聚合分析服务，不识别个人用户，也不使用广告或第三方跟踪 Cookie。",
        "您可随时通过网站页脚的 Cookie 设置更改您的选择。",
        "我们不使用广告或第三方跟踪 Cookie。若未来引入其他非必要 Cookie，我们将更新本政策并在法律要求时征得您的同意。",
      ],
    },
    {
      title: "5. 第三方处理者",
      paragraphs: [
        "我们与可信赖的处理者共享个人数据以运营服务。各处理者仅按我们的指示并在适当的数据保护协议下处理数据：",
      ],
      bullets: [
        "Stripe——支付处理及订阅账单（stripe.com/privacy）。Stripe 对其直接收集的支付数据作为独立控制者行事。",
        "Supabase——托管 PostgreSQL 数据库，用于账户、交易同步及私密支持工单数据。",
        "Railway——应用托管及基础设施。",
        "Google——OAuth 身份验证，仅在您选择 Google 登录时使用（policies.google.com/privacy）。",
        "Resend——密码重置及账户删除确认的事务性邮件，包含您的账户电子邮件及有时效链接（resend.com/legal/privacy-policy）。",
        "Google Gemini API（Google AI Studio / Gemini Developer API）——基于我们公开 FAQ 的可选帮助机器人回复。启用帮助机器人时，聊天消息将发送至 Google 以生成回复。免费层 Gemini API 使用可能按 Google 条款被 Google 用于改进其产品；请勿在帮助聊天中发送敏感密钥。付费或更高层级配置可能适用不同数据条款——若生产层级变更，我们将更新本政策。",
        "Cloudflare——启用时在营销页面提供无 Cookie 的 Web Analytics，并为 example.com 提供 CDN/安全（cloudflare.com/privacypolicy）。",
        "GitHub——仅在您自愿发布公开 issue 时；您在那里发布的内容公开并受 GitHub 条款约束，而非我们的私密支持队列。",
      ],
    },
    {
      title: "6. 国际数据传输",
      paragraphs: [
        "部分处理者可能在欧洲经济区（EEA）以外（包括美国）存储或处理数据。发生此类传输时，我们依赖适当保障措施，例如欧盟标准合同条款及处理者对适用数据保护框架的合规。",
      ],
    },
    {
      title: "7. 数据保留",
      paragraphs: ["我们仅在实现本政策所述目的所需期限内保留您的数据："],
      bullets: [
        "账户及资料数据：在账户活跃期间保留，并在删除请求或账户关闭后保留合理期限，除非法律要求更长期限。",
        "交易同步数据：每次主端同步时替换活跃持仓；已平仓交易历史在账户活跃期间保留以支持控制台指标。",
        "Mirror Ownership 租约数据：存储在交易账户上的单向经纪商登录哈希（brokerLoginHmac）及相关 mirror_leases 行在账户活跃期间保留，并在删除用户账户时移除（数据库级联）。",
        "会话数据：保留至会话过期或您退出登录。",
        "账单记录：按适用财税法律保留，并符合 Stripe 的保留做法。",
        "私密支持工单：在有助于解决您的请求期间及之后合理期限内保留，用于防滥用及服务质量，随后删除或匿名化，除非法律要求更长期限。账户擦除请求可能包括与您用户 ID 关联的未关闭支持工单。",
        "帮助机器人聊天：不作为永久工单历史存储于我们的数据库；消息为生成回复而处理，并可能由 AI 处理者按其 API 层级的保留规则处理。",
      ],
    },
    {
      title: "8. 您在 GDPR 下的权利",
      paragraphs: ["若您位于 EEA 或英国，您对个人数据享有以下权利："],
      bullets: [
        "访问权——请求获取我们持有的您的个人数据副本。",
        "更正权——请求更正不准确的数据。",
        "删除权——请求删除您的数据，但受法定保留义务限制。",
        "限制处理权——在特定情况下请求我们限制对您数据的使用。",
        "数据可携权——在技术可行时以结构化、机器可读格式接收您的数据。",
        "反对权——反对基于合法利益的处理。",
        "撤回同意权——若处理基于同意，您可随时撤回，不影响此前合法处理。",
        "投诉权——向罗马尼亚个人数据处理国家监督局（ANSPDCP，dataprotection.ro）或您当地监管机构提出投诉。",
      ],
    },
    {
      title: "9. 如何行使您的权利",
      paragraphs: [
        `要行使上述任何权利，请从与账户关联的电子邮件地址发送邮件至 ${LEGAL_CONTACT_EMAIL}。我们将按 GDPR 要求在一个月内回复。处理请求前我们可能需要验证您的身份。`,
        "您可在 控制台 → 设置 中永久删除账户。删除将取消所有活跃订阅并移除相关账户数据。您也可通过电子邮件请求擦除。",
      ],
    },
    {
      title: "10. 安全",
      paragraphs: [
        "我们采取技术及组织措施保护您的数据，包括 HTTPS 加密、密码哈希及限定于您用户账户的访问控制。您的 SaaS Template User ID 作为 API 凭证——请勿公开分享或嵌入共享文件。私密支持工单仅对授权运营人员可见。",
      ],
    },
    {
      title: "11. 儿童",
      paragraphs: [
        "SaaS Template 不面向 16 岁以下儿童。我们不会故意收集 16 岁以下任何人的个人数据。若您认为儿童向我们提供了数据，请联系我们，我们将予以删除。",
      ],
    },
    {
      title: "12. 交易数据免责声明",
      paragraphs: [
        "控制台显示或通过同步 API 传输的交易数据是关于您 MetaTrader 账户的运营信息。不构成财务建议、投资研究或交易推荐。交易存在重大亏损风险。可选帮助机器人不构成财务建议且可能不准确；账户相关问题请使用私密支持表单或电子邮件。",
      ],
    },
    {
      title: "13. 本政策的变更",
      paragraphs: [
        "我们可能不时更新本隐私政策。重大变更将在此页面发布并更新日期。变更后继续使用服务即视为接受更新后的政策。",
      ],
    },
    {
      title: "14. 联系方式",
      paragraphs: [
        `隐私问题或数据主体请求：${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}，CUI ${LEGAL_CUI}，${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};

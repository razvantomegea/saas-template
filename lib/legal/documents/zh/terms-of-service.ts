import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_GOVERNING_LAW,
  LEGAL_JURISDICTION_CITY,
  LEGAL_PRODUCT_NAME,
  LEGAL_REFUND_WINDOW_HOURS,
  LEGAL_REGISTERED_ADDRESS,
  LEGAL_TRIAL_DAYS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const termsOfServiceContent: LegalDocumentContent = {
  title: "服务条款",
  lastUpdated: "9 June 2026",
  intro: [
    `本服务条款（「条款」）规范您对 ${LEGAL_COMPANY_NAME}（CUI ${LEGAL_CUI}）在 example.com 运营的 ${LEGAL_PRODUCT_NAME} 云服务（「服务」）的使用。创建账户或使用服务即表示您同意本条款。`,
    "若您不同意，请勿使用本服务。",
  ],
  sections: [
    {
      title: "1. 服务说明",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME} 是用于 MetaTrader 5 跟单交易的云中继与控制台。主端 Expert Advisor（EA）将持仓发布至我们的 API；从端 EA 轮询 API 并在跟随账户上镜像交易。`,
        "SaaS Template Master Publisher 与 Slave Subscriber EA 在 MQL5 Market 上免费分发。订阅 example.com 付费方案可解锁云同步及控制台访问。",
      ],
    },
    {
      title: "2. 合同方",
      paragraphs: [
        `服务由 ${LEGAL_COMPANY_NAME} 提供，CUI ${LEGAL_CUI}，${LEGAL_REGISTERED_ADDRESS}。${LEGAL_PRODUCT_NAME} 为我们的商号。联系方式：${LEGAL_CONTACT_EMAIL}。`,
      ],
    },
    {
      title: "3. 资格",
      paragraphs: [
        "您须年满 18 周岁且具备签订有约束力合同的法律能力方可使用服务。注册即表示您声明符合上述要求。",
      ],
    },
    {
      title: "4. 账户注册",
      paragraphs: [
        "您可使用电子邮件和密码注册，或在可用时使用 Google 登录。您有责任保密登录凭证。",
        "您的 SaaS Template User ID 由 EA 用于验证 API 请求。请将其视为机密凭证。您负责正确配置 EA 及账户下的一切活动。",
      ],
    },
    {
      title: "5. 订阅与账单",
      paragraphs: [
        "付费方案（Starter、TV Sync、Pro、Ultimate）通过 Stripe 按月或按年以 EUR 计费。价格见定价页面，可能经合理通知后变更。",
        `新订阅用户在首次付费订阅时可享受 ${LEGAL_TRIAL_DAYS} 天免费试用。任何试用结束后，除非您在试用结束前取消，否则将自动从您的支付方式扣款。`,
        "订阅在每个计费周期结束时自动续订。您可通过账单页面取消或更改方案，该页面将跳转至 Stripe Customer Portal。",
        "未付款可能导致同步 API 访问被暂停。我们不存储您的完整支付卡信息——所有支付由 Stripe 处理。",
      ],
    },
    {
      title: "6. 退款政策",
      paragraphs: [
        `对于在首次扣款（任何免费试用结束后）${LEGAL_REFUND_WINDOW_HOURS} 小时内收到的请求，我们可酌情退款。申请退款请从注册账户邮箱发送邮件至 ${LEGAL_CONTACT_EMAIL}，说明请求及扣款日期。`,
        "获批退款通过 Stripe 退回原支付方式。超过 24 小时窗口的退款请求通常不受本商业政策接受。",
        "本退款政策不影响您作为消费者依据适用法律可能享有的强制性法定权利。",
      ],
    },
    {
      title: "7. 撤回权（欧盟及罗马尼亚消费者）",
      paragraphs: [
        "若您为欧盟或罗马尼亚消费者，依据指令 2011/83/EU 及罗马尼亚政府紧急条例第 34/2014 号（OUG 34/2014），您通常享有 14 天无理由远程合同撤回权。",
        "对于立即开始履行的数字服务，若您明确同意立即访问并确认服务开始后您将丧失撤回权，则可能失去撤回权。该同意可在结账或账户激活时取得。",
        `要行使法定撤回权，请在撤回期限届满前向 ${LEGAL_CONTACT_EMAIL} 发送明确声明。若有效撤回，我们将无不当延迟地退款，且无论如何在 14 天内退还已收款项。`,
        "有关消费者权益的投诉，可联系罗马尼亚国家消费者保护局（ANPC，anpc.ro）。",
      ],
    },
    {
      title: "8. 可接受使用",
      paragraphs: ["您同意不得："],
      bullets: [
        "向未授权方分享 User ID 或账户凭证。",
        "滥用、过载或试图破坏 API 或基础设施。",
        "未经我们书面同意对服务进行逆向工程、抓取或转售。",
        "将服务用于非法活动或违反经纪商条款。",
        "规避订阅限制（例如您套餐等级的从端账户数量限制）。",
      ],
    },
    {
      title: "9. 知识产权",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}、我们的网站、控制台、API 及专有 EA 归 ${LEGAL_COMPANY_NAME} 或其许可方所有。免费 EA 在 MQL5 Market 的分发受 MetaQuotes 及 MQL5 Market 条款约束。`,
        "在订阅有效期间，您获得有限、非独占、不可转让的许可，将服务用于个人或内部业务交易操作。",
      ],
    },
    {
      title: "10. 第三方服务",
      paragraphs: [
        "服务与 MetaTrader 5、您的经纪商、MQL5 Market、Stripe 及其他第三方集成。我们不对第三方平台的中断、政策变更或故障负责。您对经纪商及交易平台的使用受其自身条款约束。",
      ],
    },
    {
      title: "11. 交易风险免责声明",
      paragraphs: [
        "金融工具交易存在重大亏损风险。跟单交易的历史表现不保证未来结果。SaaS Template 是软件基础设施——不提供财务建议、投资建议或保证盈利。",
        "您独自对交易决策、EA 配置、仓位规模及遵守适用法规负责。使用服务风险自负。",
      ],
    },
    {
      title: "12. 服务可用性",
      paragraphs: [
        "我们力求保持服务可用，但不保证不间断或无错误运行。维护、基础设施问题或第三方故障可能导致停机。除非书面明确约定，否则不适用服务水平协议。",
      ],
    },
    {
      title: "13. 责任限制",
      paragraphs: [
        `在适用法律允许的最大范围内，${LEGAL_COMPANY_NAME} 不对间接、附带、特殊、后果性或惩罚性损害承担责任，包括因使用服务产生的交易损失、利润损失或数据丢失。`,
        `因本条款或服务产生的任何索赔，我们的总累计责任限于索赔前十二（12）个月内向我们支付的费用。本条款任何内容均不限制强制性消费者保护法下不得限制的责任。`,
      ],
    },
    {
      title: "14. 终止",
      paragraphs: [
        "您可随时通过账单页面取消订阅。若您违反本条款或法律要求，我们可暂停或终止您的账户。终止后 API 访问结束，我们可依据隐私政策删除您的数据。",
      ],
    },
    {
      title: "15. 适用法律与争议",
      paragraphs: [
        `本条款受 ${LEGAL_GOVERNING_LAW} 法律管辖。任何争议由 ${LEGAL_JURISDICTION_CITY}、${LEGAL_GOVERNING_LAW} 有管辖权的法院专属管辖，但不影响可能允许您在居住国提起诉讼的强制性消费者权利。`,
      ],
    },
    {
      title: "16. 条款变更",
      paragraphs: [
        "我们可能不时更新本条款。重大变更将在此页面发布并更新日期。变更后继续使用即视为接受。对于重大变更，我们也可能通过电子邮件通知您。",
      ],
    },
    {
      title: "17. 联系方式",
      paragraphs: [
        `有关本条款的问题：${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}，CUI ${LEGAL_CUI}，${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};

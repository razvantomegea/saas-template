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
  title: "서비스 이용약관",
  lastUpdated: "9 June 2026",
  intro: [
    `본 서비스 이용약관("약관")은 ${LEGAL_COMPANY_NAME}(CUI ${LEGAL_CUI})이 example.com에서 운영하는 ${LEGAL_PRODUCT_NAME} 클라우드 서비스("서비스") 이용을 규정합니다. 계정 생성 또는 서비스 이용 시 본 약관에 동의한 것으로 간주됩니다.`,
    `동의하지 않으면 서비스를 이용하지 마세요.`,
  ],
  sections: [
    {
      title: "1. 서비스 설명",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}은 MetaTrader 5 카피 트레이딩을 위한 클라우드 중계 및 대시보드입니다. 마스터 Expert Advisor(EA)가 미결제 포지션을 API에 게시하고, 슬레이브 EA가 API를 폴링하여 팔로워 계좌에서 거래를 미러합니다.`,
        "SaaS Template Master Publisher 및 Slave Subscriber EA는 MQL5 Market에서 무료로 배포됩니다. example.com 유료 구독으로 클라우드 동기화 및 대시보드 접근이 잠금 해제됩니다.",
      ],
    },
    {
      title: "2. 계약 당사자",
      paragraphs: [
        `서비스는 ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}에서 제공됩니다. ${LEGAL_PRODUCT_NAME}은 당사 상호입니다. 연락처: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. 자격",
      paragraphs: [
        "서비스 이용을 위해 최소 18세 이상이며 구속력 있는 계약을 체결할 법적 능력이 있어야 합니다. 등록 시 이러한 요건을 충족함을 진술합니다.",
      ],
    },
    {
      title: "4. 계정 등록",
      paragraphs: [
        "이메일과 비밀번호 또는 가능한 경우 Google 로그인으로 등록할 수 있습니다. 로그인 자격 증명 기밀 유지는 귀하의 책임입니다.",
        "SaaS Template User ID는 EA가 API 요청을 인증하는 데 사용됩니다. 비밀 자격 증명으로 취급하세요. EA 올바른 구성 및 계정 하의 모든 활동은 귀하의 책임입니다.",
      ],
    },
    {
      title: "5. 구독 및 청구",
      paragraphs: [
        "유료 요금제(Starter, TV Sync, Pro, Ultimate)는 Stripe를 통해 월간 또는 연간 EUR로 청구됩니다. 가격은 요금 페이지에 표시되며 합리적 사전 통지로 변경될 수 있습니다.",
        `신규 가입자는 첫 유료 구독에서 ${LEGAL_TRIAL_DAYS}일 무료 체험을 받습니다. 체험 후 체험 종료 전 취소하지 않으면 결제 수단에 자동 청구됩니다.`,
        "구독은 각 청구 기간 종료 시 자동 갱신됩니다. Billing 페이지에서 취소 또는 요금제 변경이 가능하며 Stripe Customer Portal로 리디렉션됩니다.",
        "미납 시 동기화 API 접근이 중단될 수 있습니다. 전체 결제 카드 정보는 저장하지 않으며 모든 결제는 Stripe가 처리합니다.",
      ],
    },
    {
      title: "6. 환불 정책",
      paragraphs: [
        `첫 청구(무료 체험 종료 후) 후 ${LEGAL_REFUND_WINDOW_HOURS}시간 이내 접수된 요청에 대해 재량 환불을 제공합니다. 환불 요청은 등록 계정 이메일에서 요청 내용과 청구일과 함께 ${LEGAL_CONTACT_EMAIL}으로 이메일을 보내 주세요.`,
        "승인된 환불은 Stripe를 통해 원래 결제 수단으로 처리됩니다. 24시간 창 이후 접수된 환불 요청은 본 상업 정책 하에서 일반적으로 수락되지 않습니다.",
        "본 환불 정책은 적용법에 따른 소비자로서의 강제적 법정 권리에 영향을 미치지 않습니다.",
      ],
    },
    {
      title: "7. 청약 철회권(EU 및 루마니아 소비자)",
      paragraphs: [
        "EU 또는 루마니아 소비자인 경우 지침 2011/83/EU 및 루마니아 정부 비상명령 제34/2014호(OUG 34/2014)에 따라 거리 계약에서 사유 없이 14일 청약 철회권을 일반적으로 가집니다.",
        "즉시 이행이 시작되는 디지털 서비스의 경우 즉시 접근에 명시적 동의하고 서비스 시작 후 철회권을 상실함을 인정하면 철회권을 상실할 수 있습니다. 이 동의는 결제 또는 계정 활성화 시 받을 수 있습니다.",
        `법정 청약 철회권을 행사하려면 철회 기간 만료 전 ${LEGAL_CONTACT_EMAIL}으로 명확한 진술을 보내 주세요. 유효하게 철회하면 수령한 대금을 지체 없이 그리고 어떤 경우에도 14일 이내에 환급합니다.`,
        "소비자 권리 불만은 루마니아 국가 소비자 보호청(ANPC) anpc.ro로 연락할 수 있습니다.",
      ],
    },
    {
      title: "8. 허용 가능한 사용",
      paragraphs: ["다음을 하지 않기로 동의합니다:"],
      bullets: [
        "User ID 또는 계정 자격 증명을 무단 당사자와 공유.",
        "API 또는 인프라 남용, 과부하 또는 방해 시도.",
        "당사 서면 동의 없이 서비스 역공학, 스크래핑 또는 재판매.",
        "불법 활동 또는 브로커 약관 위반으로 서비스 이용.",
        "구독 한도 우회(예: 요금제 등급의 슬레이브 계좌 한도).",
      ],
    },
    {
      title: "9. 지적 재산",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, 당사 웹사이트, 대시보드, API 및 독점 EA는 ${LEGAL_COMPANY_NAME} 또는 라이선스 제공자 소유입니다. 무료 EA의 MQL5 Market 배포는 MetaQuotes 및 MQL5 Market 약관의 적용을 받습니다.`,
        "구독이 활성인 동안 개인 또는 내부 사업 거래 운영을 위해 서비스를 사용할 수 있는 제한적, 비독점적, 양도 불가 라이선스를 받습니다.",
      ],
    },
    {
      title: "10. 제3자 서비스",
      paragraphs: [
        "서비스는 MetaTrader 5, 브로커, MQL5 Market, Stripe 및 기타 제3자와 통합됩니다. 제3자 플랫폼 중단, 정책 변경 또는 장애에 대해 당사는 책임지지 않습니다. 브로커 및 거래 플랫폼 이용은 각자의 약관이 적용됩니다.",
      ],
    },
    {
      title: "11. 거래 위험 면책",
      paragraphs: [
        "금융 상품 거래에는 상당한 손실 위험이 있습니다. 카피 거래의 과거 실적은 미래 결과를 보장하지 않습니다. SaaS Template는 소프트웨어 인프라이며 — 금융 조언, 투자 권고 또는 이익 보장을 제공하지 않습니다.",
        "거래 결정, EA 구성, 포지션 크기, 적용 규정 준수는 전적으로 귀하의 책임입니다. 서비스는 본인 책임 하에 이용하세요.",
      ],
    },
    {
      title: "12. 서비스 가용성",
      paragraphs: [
        "서비스 가용성 유지를 목표로 하나 중단 없거나 오류 없는 운영을 보장하지 않습니다. 유지보수, 인프라 문제 또는 제3자 장애로 다운타임이 발생할 수 있습니다. 서면으로 명시 합의하지 않는 한 SLA는 적용되지 않습니다.",
      ],
    },
    {
      title: "13. 책임 제한",
      paragraphs: [
        `적용법이 허용하는 최대 범위에서 ${LEGAL_COMPANY_NAME}은 서비스 이용으로 인한 간접, 부수, 특별, 결과적 또는 징벌적 손해(거래 손실, 이익 상실, 데이터 손실 포함)에 대해 책임지지 않습니다.`,
        `본 약관 또는 서비스에서 발생하는 모든 청구에 대한 당사의 총 책임은 청구 전 12개월 동안 당사에 지불한 수수료로 제한됩니다. 본 약관의 어떠한 조항도 강제적 소비자 보호법 하에서 제한할 수 없는 책임을 제한하지 않습니다.`,
      ],
    },
    {
      title: "14. 해지",
      paragraphs: [
        "Billing 페이지에서 언제든 구독을 취소할 수 있습니다. 본 약관 위반 또는 법률 요구 시 계정을 정지 또는 해지할 수 있습니다. 해지 시 API 접근이 종료되며 개인정보 처리방침에 따라 데이터를 삭제할 수 있습니다.",
      ],
    },
    {
      title: "15. 준거법 및 분쟁",
      paragraphs: [
        `본 약관은 ${LEGAL_GOVERNING_LAW} 법률의 적용을 받습니다. 분쟁은 거주국에서 소송을 제기할 수 있는 강제적 소비자 권리를 침해하지 않는 한 ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW} 관할 법원의 전속 관할에 따릅니다.`,
      ],
    },
    {
      title: "16. 본 약관 변경",
      paragraphs: [
        "본 약관을 수시로 업데이트할 수 있습니다. 중요한 변경은 업데이트된 날짜와 함께 본 페이지에 게시됩니다. 변경 후 계속 사용은 수락을 구성합니다. 중요한 변경에 대해서는 이메일로도 알릴 수 있습니다.",
      ],
    },
    {
      title: "17. 문의",
      paragraphs: [
        `본 약관 관련 질문: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};

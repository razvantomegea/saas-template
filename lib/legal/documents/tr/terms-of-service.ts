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
  title: "Hizmet Şartları",
  lastUpdated: "9 June 2026",
  intro: [
    `Bu Hizmet Şartları ("Şartlar"), ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) tarafından example.com adresinde işletilen ${LEGAL_PRODUCT_NAME} bulut hizmetinin ("Hizmet") kullanımınızı düzenler. Bir hesap oluşturarak veya Hizmeti kullanarak bu Şartları kabul etmiş olursunuz.`,
    `Kabul etmiyorsanız Hizmeti kullanmayın.`,
  ],
  sections: [
    {
      title: "1. Hizmet açıklaması",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, MetaTrader 5 kopya ticareti için bir bulut aktarıcısı ve panodur. Bir master Expert Advisor (EA) açık pozisyonları API'mize yayınlar; slave EA'lar API'yi yoklar ve takipçi hesaplarda işlemleri yansıtır.`,
        "SaaS Template Master Publisher ve Slave Subscriber EA'ları MQL5 Market'te ücretsiz dağıtılır. example.com'a ücretli abonelik bulut senkronizasyonu ve pano erişimini açar.",
      ],
    },
    {
      title: "2. Sözleşme tarafı",
      paragraphs: [
        `Hizmet ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS} tarafından sağlanır. ${LEGAL_PRODUCT_NAME} ticari unvanımızdır. İletişim: ${LEGAL_CONTACT_EMAIL}.`,
      ],
    },
    {
      title: "3. Uygunluk",
      paragraphs: [
        "Hizmeti kullanmak için en az 18 yaşında olmalı ve bağlayıcı sözleşmeler yapma yasal ehliyetine sahip olmalısınız. Kayıt olarak bu gereksinimleri karşıladığınızı beyan edersiniz.",
      ],
    },
    {
      title: "4. Hesap kaydı",
      paragraphs: [
        "E-posta ve parola ile veya mevcut olduğunda Google oturum açma ile kayıt olabilirsiniz. Oturum açma bilgilerinizi gizli tutmaktan siz sorumlusunuz.",
        "SaaS Template User ID'niz EA'lar tarafından API isteklerini doğrulamak için kullanılır. Bunu gizli bir kimlik bilgisi olarak değerlendirin. EA'ları doğru yapılandırmaktan ve hesabınız altındaki tüm faaliyetlerden siz sorumlusunuz.",
      ],
    },
    {
      title: "5. Abonelik ve faturalandırma",
      paragraphs: [
        "Ücretli planlar (Starter, TV Sync, Pro, Ultimate) Stripe aracılığıyla aylık veya yıllık EUR olarak faturalandırılır. Fiyatlar fiyatlandırma sayfamızda gösterilir ve makul bildirimle değişebilir.",
        `Yeni aboneler ilk ücretli aboneliklerinde ${LEGAL_TRIAL_DAYS} günlük ücretsiz deneme alır. Herhangi bir denemeden sonra, deneme bitmeden iptal etmediğiniz sürece ödeme yönteminiz otomatik olarak tahsil edilir.`,
        "Abonelikler her faturalandırma döneminin sonunda otomatik yenilenir. Faturalandırma sayfasından aboneliğinizi iptal edebilir veya planınızı değiştirebilirsiniz; bu sayfa Stripe Customer Portal'a yönlendirir.",
        "Ödeme yapılmaması senkronizasyon API erişiminin askıya alınmasına yol açabilir. Tam ödeme kartı bilgilerinizi saklamıyoruz — tüm ödemeleri Stripe işler.",
      ],
    },
    {
      title: "6. İade politikası",
      paragraphs: [
        `İlk tahsilattan (ücretsiz deneme bittikten sonra) sonraki ${LEGAL_REFUND_WINDOW_HOURS} saat içinde alınan talepler için takdirimize bağlı iade sunuyoruz. İade talep etmek için kayıtlı hesap e-postanızdan talebiniz ve tahsilat tarihiyle ${LEGAL_CONTACT_EMAIL} adresine e-posta gönderin.`,
        "Onaylanan iadeler Stripe aracılığıyla orijinal ödeme yönteminize işlenir. 24 saatlik süre sonrasında alınan iade talepleri bu ticari politika kapsamında genellikle kabul edilmez.",
        "Bu iade politikası geçerli mevzuat kapsamında tüketici olarak sahip olabileceğiniz zorunlu yasal hakları etkilemez.",
      ],
    },
    {
      title: "7. Cayma hakkı (AB ve Romanya tüketicileri)",
      paragraphs: [
        "Avrupa Birliği veya Romanya'da tüketici iseniz, genel olarak 2011/83/AB Direktifi ve Romanya Hükümeti Acil Kararnamesi No. 34/2014 (OUG 34/2014) kapsamında mesafeli sözleşmelerden gerekçe göstermeksizin 14 günlük cayma hakkınız vardır.",
        "Performansın hemen başladığı dijital hizmetlerde, hizmete anında erişime açıkça onay verir ve hizmet başladıktan sonra cayma hakkınızı kaybedeceğinizi kabul ederseniz cayma hakkınızı kaybedebilirsiniz. Bu onay ödeme sırasında veya hesap etkinleştirmede alınabilir.",
        `Yasal cayma hakkınızı kullanmak için cayma süresi dolmadan ${LEGAL_CONTACT_EMAIL} adresine açık bir beyan gönderin. Geçerli şekilde cayarsanız alınan ödemeleri gecikmeksizin ve her halükarda 14 gün içinde iade ederiz.`,
        "Tüketici hakları şikâyetleri için Romanya Ulusal Tüketici Koruma Kurumu'na (ANPC) anpc.ro adresinden ulaşabilirsiniz.",
      ],
    },
    {
      title: "8. Kabul edilebilir kullanım",
      paragraphs: ["Aşağıdakileri yapmamayı kabul edersiniz:"],
      bullets: [
        "User ID'nizi veya hesap kimlik bilgilerinizi yetkisiz taraflarla paylaşmak.",
        "API'yi veya altyapıyı kötüye kullanmak, aşırı yüklemek veya bozmaya çalışmak.",
        "Yazılı iznimiz olmadan Hizmeti tersine mühendislik yapmak, kazımak veya yeniden satmak.",
        "Hizmeti yasadışı faaliyetler için veya aracı kurumunuzun koşullarını ihlal ederek kullanmak.",
        "Abonelik limitlerini aşmak (ör. plan seviyeniz için slave hesap limitleri).",
      ],
    },
    {
      title: "9. Fikri mülkiyet",
      paragraphs: [
        `${LEGAL_PRODUCT_NAME}, web sitemiz, panomuz, API'miz ve tescilli EA'larımız ${LEGAL_COMPANY_NAME} veya lisans verenlerine aittir. Ücretsiz EA'ların MQL5 Market dağıtımı MetaQuotes ve MQL5 Market koşullarına tabidir.`,
        "Aboneliğiniz aktifken Hizmeti kişisel veya dahili iş ticaret operasyonlarınız için kullanmak üzere sınırlı, münhasır olmayan, devredilemez bir lisans alırsınız.",
      ],
    },
    {
      title: "10. Üçüncü taraf hizmetler",
      paragraphs: [
        "Hizmet MetaTrader 5, aracı kurumunuz, MQL5 Market, Stripe ve diğer üçüncü taraflarla entegre olur. Üçüncü taraf platformların kesintileri, politika değişiklikleri veya arızalarından sorumlu değiliz. Aracı kurumları ve ticaret platformlarını kullanımınız kendi koşullarına tabidir.",
      ],
    },
    {
      title: "11. Ticaret riski feragatnamesi",
      paragraphs: [
        "Finansal enstrümanlarda işlem yapmak önemli kayıp riski taşır. Kopyalanan işlemlerin geçmiş performansı gelecek sonuçları garanti etmez. SaaS Template yazılım altyapısıdır — finansal tavsiye, yatırım önerisi veya garantili kâr sağlamaz.",
        "Ticaret kararlarınızdan, EA yapılandırmanızdan, pozisyon boyutlandırmanızdan ve geçerli düzenlemelere uyumdan yalnızca siz sorumlusunuz. Hizmeti kendi riskinizle kullanın.",
      ],
    },
    {
      title: "12. Hizmet kullanılabilirliği",
      paragraphs: [
        "Hizmeti kullanılabilir tutmayı hedefliyoruz ancak kesintisiz veya hatasız çalışmayı garanti etmiyoruz. Bakım, altyapı sorunları veya üçüncü taraf arızaları kesintiye yol açabilir. Yazılı olarak açıkça kararlaştırılmadıkça hizmet seviyesi anlaşması uygulanmaz.",
      ],
    },
    {
      title: "13. Sorumluluk sınırlaması",
      paragraphs: [
        `Geçerli mevzuatın izin verdiği azami ölçüde ${LEGAL_COMPANY_NAME}, Hizmetin kullanımından kaynaklanan ticaret kayıpları, kâr kaybı veya veri kaybı dahil dolaylı, arızi, özel, sonuçsal veya cezai zararlardan sorumlu olmayacaktır.`,
        `Bu Şartlardan veya Hizmetten kaynaklanan tüm talepler için toplam sorumluluğumuz, talepten önceki on iki (12) ayda bize ödediğiniz ücretlerle sınırlıdır. Bu Şartlardaki hiçbir hüküm zorunlu tüketici koruma mevzuatı kapsamında sınırlandırılamayan sorumluluğu sınırlamaz.`,
      ],
    },
    {
      title: "14. Fesih",
      paragraphs: [
        "Aboneliğinizi Faturalandırma sayfasından istediğiniz zaman iptal edebilirsiniz. Bu Şartları ihlal ederseniz veya kanun gerektirirse hesabınızı askıya alabilir veya sonlandırabiliriz. Fesih sonrası API erişiminiz sona erer ve verilerinizi Gizlilik Politikamıza uygun olarak silebiliriz.",
      ],
    },
    {
      title: "15. Uygulanacak hukuk ve uyuşmazlıklar",
      paragraphs: [
        `Bu Şartlar ${LEGAL_GOVERNING_LAW} yasalarına tabidir. Uyuşmazlıklar, ikamet ettiğiniz ülkede dava açmanıza izin veren zorunlu tüketici hakları saklı kalmak kaydıyla, ${LEGAL_JURISDICTION_CITY}, ${LEGAL_GOVERNING_LAW} yetkili mahkemelerinin münhasır yargı yetkisine tabidir.`,
      ],
    },
    {
      title: "16. Bu Şartlardaki değişiklikler",
      paragraphs: [
        "Bu Şartları zaman zaman güncelleyebiliriz. Önemli değişiklikler güncellenmiş tarihle bu sayfada yayınlanır. Değişikliklerden sonra kullanmaya devam etmeniz kabul anlamına gelir. Önemli değişiklikler için e-posta ile de bilgilendirebiliriz.",
      ],
    },
    {
      title: "17. İletişim",
      paragraphs: [
        `Bu Şartlar hakkında sorular: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};

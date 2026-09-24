import {
  LEGAL_COMPANY_NAME,
  LEGAL_CONTACT_EMAIL,
  LEGAL_CUI,
  LEGAL_PRODUCT_NAME,
  LEGAL_REGISTERED_ADDRESS,
} from "@/lib/legal/constants";
import type { LegalDocumentContent } from "@/lib/legal/types";

export const privacyPolicyContent: LegalDocumentContent = {
  title: "Gizlilik Politikası",
  lastUpdated: "30 August 2026",
  intro: [
    `Bu Gizlilik Politikası, ${LEGAL_COMPANY_NAME} (CUI ${LEGAL_CUI}) şirketinin example.com adresindeki ${LEGAL_PRODUCT_NAME} hizmetini ("biz", "bize", "bizim") işletirken web sitemizi, panoyu ve bulut senkronizasyon API'sini kullandığınızda kişisel verilerinizi nasıl topladığını, kullandığını, sakladığını ve koruduğunu açıklar.`,
    "Kişisel verileri AB Genel Veri Koruma Tüzüğü (GDPR) ve geçerli Romanya veri koruma mevzuatına uygun olarak işliyoruz.",
  ],
  sections: [
    {
      title: "1. Veri sorumlusu",
      paragraphs: [
        `Kişisel verilerinizden sorumlu veri sorumlusu ${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, kayıtlı adres: ${LEGAL_REGISTERED_ADDRESS}.`,
        `${LEGAL_PRODUCT_NAME}, MT5 kopya ticaret bulut hizmetimizin ticari unvanıdır. Gizlilik soruları veya haklarınızı kullanmak için ${LEGAL_CONTACT_EMAIL} adresinden bize ulaşın.`,
      ],
    },
    {
      title: "2. Topladığımız veriler",
      paragraphs: [
        "SaaS Template hizmetini sunmak için yalnızca gerekli verileri topluyoruz:",
      ],
      bullets: [
        "Hesap verileri: ad, e-posta adresi, parola özeti (e-posta ile kayıt olursanız) ve profil görseli (Google ile oturum açarsanız).",
        "Oturum verileri: kimlik doğrulama çerezleri, oturum belirteçleri ve web panosunu kullandığınızda isteğe bağlı olarak IP adresiniz ve tarayıcı user-agent bilginiz.",
        "Abonelik verileri: plan seviyesi, abonelik durumu ve Stripe müşteri tanımlayıcısı. Ödeme kartı bilgileri bizim tarafımızdan değil, Stripe tarafından toplanır ve saklanır.",
        "Ticaret senkronizasyon verileri: aracı kurum adı, hesap bakiyesi, özsermaye, açık pozisyonlar ve MetaTrader 5 Expert Advisor'larınız tarafından gönderilen kapanmış işlem geçmişi. Mirror Ownership (aynı hesaba birden fazla terminal bağlandığında yinelenen işlemleri önlemek) için EA, tek yönlü bir kiralama anahtarı türetebilmemiz amacıyla MT5 hesap numaranızı gönderebilir; yalnızca bu özeti saklarız, hesap numarasını veya işlem parolasını saklamayız.",
        "EA API kimlik bilgisi: EA'lar tarafından x-user-id başlığında iletilen SaaS Template User ID'niz. Bunu gizli tutun — User ID'nize ve aktif bir aboneliğe sahip olan herkes senkronizasyon API'nize erişebilir.",
        "Onboarding verileri: kurulum sihirbazını tamamlayıp tamamlamadığınız.",
        "Destek verileri: özel Yardım formunu gönderirseniz e-postanızı, mesaj kategorisini, konuyu ve mesaj metnini saklarız; oturum açmışsanız bileti hesabınıza bağlayabiliriz. Kötüye kullanımı önlemek için geçici IP tabanlı hız sınırı sayaçları uygulama belleğinde tutulabilir.",
        "Yardım botu mesajları: isteğe bağlı Yardım sohbetini kullanırsanız, kamuya açık SSS'mizden yanıt verebilmemiz için istemleriniz ve model yanıtları bölüm 5'te açıklanan yapay zeka sağlayıcısına gönderilir. Sohbete parola veya tam gizli bilgiler yapıştırmayın.",
      ],
    },
    {
      title: "3. Verilerinizi nasıl kullanıyoruz ve hukuki dayanaklar",
      paragraphs: [
        "Kişisel verilerinizi GDPR Madde 6 kapsamında aşağıdaki amaçlar ve hukuki dayanaklarla işliyoruz:",
      ],
      bullets: [
        "Hesabınızı, panonuzu ve bulut senkronizasyon hizmetinizi sağlamak — sizinle olan sözleşmemizin ifası (Madde 6(1)(b)).",
        "Stripe üzerinden abonelik ve faturalandırma işlemleri — sözleşmenin ifası ve mali kayıtlar için yasal yükümlülük (Madde 6(1)(b) ve (c)).",
        "Hizmeti güvence altına almak, kötüye kullanımı önlemek ve API erişimini korumak — meşru menfaat (Madde 6(1)(f)).",
        "İşlemsel kimlik doğrulama e-postaları göndermek (parola sıfırlama bağlantıları gibi) — sözleşmenin ifası ve hesap güvenliğinde meşru menfaat (Madde 6(1)(b) ve (f)).",
        "Google OAuth oturum açma (tercih ederseniz) — oturum açarken verdiğiniz onay (Madde 6(1)(a)).",
        "Destek taleplerine (e-posta, özel Yardım formu veya Yardım botu) ve yasal sorulara yanıt vermek — geçerli olduğu hallerde meşru menfaat veya yasal yükümlülük.",
      ],
    },
    {
      title: "4. Çerezler",
      paragraphs: [
        "SaaS Template panosunda oturumunuzu açık tutmak için kesinlikle gerekli oturum çerezleri kullanıyoruz. Bu çerezler hizmet için zorunludur ve ePrivacy Direktifi kapsamında onay gerektirmez.",
        "İlk ziyaretinizde bir çerez tercihleri banner'ı gösteririz. Analitik (Cloudflare Web Analytics ve anonim huni olayları) yalnızca Tümünü kabul et'i seçerseniz veya Çerez ayarları'nda Analitik'i etkinleştirirseniz yüklenir. Bu, bireysel kullanıcıları tanımlamayan, reklam veya üçüncü taraf izleme çerezleri kullanmayan, çerezsiz toplu analitik hizmetidir.",
        "Tercihinizi site alt bilgisindeki Çerez ayarları ile istediğiniz zaman değiştirebilirsiniz.",
        "Reklam veya üçüncü taraf izleme çerezleri kullanmıyoruz. Gelecekte başka zorunlu olmayan çerezler sunarsak bu politikayı günceller ve gerektiğinde onayınızı isteriz.",
      ],
    },
    {
      title: "5. Üçüncü taraf işleyiciler",
      paragraphs: [
        "Kişisel verileri hizmeti işletmemize yardımcı olan güvenilir işleyicilerle paylaşırız. Her işleyici verileri yalnızca talimatlarımız doğrultusunda ve uygun veri koruma sözleşmeleri kapsamında işler:",
      ],
      bullets: [
        "Stripe — ödeme işleme ve abonelik faturalandırması (stripe.com/privacy). Stripe, doğrudan topladığı ödeme verileri için bağımsız bir veri sorumlusu olarak hareket eder.",
        "Supabase — hesap, ticaret senkronizasyonu ve özel destek bileti verileri için yönetilen PostgreSQL veritabanı barındırması.",
        "Railway — uygulama barındırma ve altyapı.",
        "Google — yalnızca Google ile oturum açmayı seçerseniz OAuth kimlik doğrulaması (policies.google.com/privacy).",
        "Resend — parola sıfırlama ve hesap silme onayı için işlemsel e-postalar; hesap e-posta adresinizi ve süre sınırlı bir bağlantı içerir (resend.com/legal/privacy-policy).",
        "Google Gemini API (Google AI Studio / Gemini Developer API) — kamuya açık SSS'mize dayalı isteğe bağlı Yardım botu yanıtları. Yardım botu etkinleştirildiğinde sohbet mesajları yanıt üretmek için Google'a gönderilir. Ücretsiz katman Gemini API kullanımı Google tarafından kendi ürünlerini geliştirmek için kullanılabilir; Yardım sohbetine hassas gizli bilgiler göndermeyin. Ücretli veya daha yüksek katman yapılandırmaları farklı veri koşulları sunabilir — üretim katmanımız değişirse bu politikayı güncelleriz.",
        "Cloudflare — etkinleştirildiğinde pazarlama sayfalarında çerezsiz Web Analytics ve example.com için CDN/güvenlik (cloudflare.com/privacypolicy).",
        "GitHub — yalnızca gönüllü olarak kamuya açık bir issue gönderirseniz; orada yayınladığınız içerik kamuya açıktır ve GitHub'ın koşullarına tabidir, özel destek kuyruğumuza değil.",
      ],
    },
    {
      title: "6. Uluslararası veri aktarımları",
      paragraphs: [
        "Bazı işleyicilerimiz verileri Avrupa Ekonomik Alanı (AEA) dışında, ABD dahil olmak üzere saklayabilir veya işleyebilir. Bu tür aktarımlarda AB Standart Sözleşme Maddeleri ve işleyicinin geçerli veri koruma çerçevelerine uyumu gibi uygun güvencelere dayanırız.",
      ],
    },
    {
      title: "7. Veri saklama",
      paragraphs: [
        "Verilerinizi yalnızca bu politikada açıklanan amaçlar için gerekli olduğu sürece saklarız:",
      ],
      bullets: [
        "Hesap ve profil verileri: hesabınız aktifken ve silme talebi veya hesap kapatma sonrasında makul bir süre boyunca, kanun daha uzun bir süre gerektirmedikçe.",
        "Ticaret senkronizasyon verileri: aktif pozisyonlar her master senkronizasyonunda güncellenir; kapanmış işlem geçmişi pano metriklerini desteklemek için hesabınız aktifken saklanır.",
        "Mirror Ownership kiralama verileri: ticaret hesaplarında saklanan tek yönlü aracı giriş özeti (brokerLoginHmac) ve ilgili mirror_leases satırları hesabınız aktifken saklanır ve kullanıcı hesabınız silindiğinde kaldırılır (veritabanı cascade).",
        "Oturum verileri: oturum sona erene veya çıkış yapana kadar saklanır.",
        "Fatura kayıtları: geçerli vergi ve muhasebe mevzuatının gerektirdiği şekilde, Stripe'ın saklama uygulamalarına uygun olarak.",
        "Özel destek biletleri: talebinizi çözmek için gerekli olduğu sürece ve sonrasında kötüye kullanım önleme ve hizmet kalitesi için makul bir süre boyunca, kanun daha uzun bir süre gerektirmedikçe silinir veya anonimleştirilir. Hesap silme talepleri kullanıcı kimliğinize bağlı açık destek biletlerini içerebilir.",
        "Yardım botu sohbetleri: veritabanımızda kalıcı bilet geçmişi olarak saklanmaz; mesajlar yanıt üretmek için işlenir ve kullanılan API katmanının saklama kuralları kapsamında yapay zeka işleyicisi tarafından ele alınabilir.",
      ],
    },
    {
      title: "8. GDPR kapsamındaki haklarınız",
      paragraphs: [
        "AEA veya Birleşik Krallık'ta iseniz kişisel verilerinizle ilgili aşağıdaki haklara sahipsiniz:",
      ],
      bullets: [
        "Erişim hakkı — hakkınızda tuttuğumuz kişisel verilerin bir kopyasını talep edin.",
        "Düzeltme hakkı — hatalı verilerin düzeltilmesini talep edin.",
        "Silme hakkı — yasal saklama yükümlülüklerine tabi olarak verilerinizin silinmesini talep edin.",
        "Kısıtlama hakkı — belirli durumlarda verilerinizi nasıl kullandığımızı sınırlamamızı talep edin.",
        "Veri taşınabilirliği hakkı — teknik olarak mümkün olduğunda verilerinizi yapılandırılmış, makine tarafından okunabilir bir biçimde alın.",
        "İtiraz hakkı — meşru menfaatlere dayalı işlemeye itiraz edin.",
        "Onayı geri çekme hakkı — işleme onaya dayanıyorsa, önceki yasal işlemeyi etkilemeden istediğiniz zaman geri çekebilirsiniz.",
        "Şikâyet hakkı — Romanya Kişisel Verilerin İşlenmesi Ulusal Denetim Kurumu (ANSPDCP) dataprotection.ro adresinde veya yerel denetim otoritenizde.",
      ],
    },
    {
      title: "9. Haklarınızı nasıl kullanırsınız",
      paragraphs: [
        `Yukarıdaki haklardan herhangi birini kullanmak için hesabınızla ilişkili e-posta adresinden ${LEGAL_CONTACT_EMAIL} adresine e-posta gönderin. GDPR gereği bir ay içinde yanıt veririz. Talebinizi işlemeden önce kimliğinizi doğrulamamız gerekebilir.`,
        "Hesabınızı Dashboard → Settings bölümünden kalıcı olarak silebilirsiniz. Silme tüm aktif abonelikleri iptal eder ve ilişkili hesap verilerini kaldırır. Silme talebi için bize e-posta da gönderebilirsiniz.",
      ],
    },
    {
      title: "10. Güvenlik",
      paragraphs: [
        "Verilerinizi korumak için HTTPS şifreleme, parola özetleme ve kullanıcı hesabınıza kapsamlı erişim kontrolleri dahil teknik ve organizasyonel önlemler uyguluyoruz. SaaS Template User ID'niz bir API kimlik bilgisi olarak işlev görür — kamuya açık paylaşmayın veya paylaşılan dosyalara gömmeyin. Özel destek biletleri yalnızca yetkili operatörler tarafından görülebilir.",
      ],
    },
    {
      title: "11. Çocuklar",
      paragraphs: [
        "SaaS Template 16 yaşın altındaki çocuklara yönelik değildir. 16 yaşın altındaki kişilerden bilerek kişisel veri toplamıyoruz. Bir çocuğun bize veri sağladığını düşünüyorsanız bize ulaşın; sileriz.",
      ],
    },
    {
      title: "12. Ticaret verileri feragatnamesi",
      paragraphs: [
        "Panoda görüntülenen veya senkronizasyon API'miz aracılığıyla iletilen ticaret verileri MetaTrader hesaplarınız hakkında operasyonel bilgidir. Finansal tavsiye, yatırım araştırması veya işlem önerisi değildir. Ticaret önemli kayıp riski taşır. İsteğe bağlı Yardım botu finansal tavsiye değildir ve hatalı olabilir; hesaba özel sorunlar için özel destek formunu veya e-postayı kullanın.",
      ],
    },
    {
      title: "13. Bu politikadaki değişiklikler",
      paragraphs: [
        "Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler güncellenmiş tarihle bu sayfada yayınlanır. Değişikliklerden sonra hizmeti kullanmaya devam etmeniz güncellenmiş politikayı kabul ettiğiniz anlamına gelir.",
      ],
    },
    {
      title: "14. İletişim",
      paragraphs: [
        `Gizlilik soruları veya veri sahibi talepleri: ${LEGAL_CONTACT_EMAIL}`,
        `${LEGAL_COMPANY_NAME}, CUI ${LEGAL_CUI}, ${LEGAL_REGISTERED_ADDRESS}`,
      ],
    },
  ],
};

/* ============================================================================
   BENGISU & UĞURCAN - SAHIL BOHEM DIJITAL DUGUN DAVETIYESI
   script.js
   ----------------------------------------------------------------------------
   BURASI SENİN DÜZENLEME ALANIN.
   Tüm metinleri, tarihleri, linkleri ve isimleri aşağıdaki CONFIG bloğundan
   değiştirebilirsin. HTML/CSS'e dokunmana gerek yok.
   ========================================================================== */

const CONFIG = {

  /* --- ÇİFTİN BİLGİLERİ --------------------------------------------------- */
  gelinAdi:  "Bengisu",
  damatAdi:  "Uğurcan",

  // Tarayici sekmesi ve WhatsApp/link onizleme metinleri
  siteBaslik: "Bengisu & Uğurcan • Düğün Davetiyesi",
  sosyalBaslik: "Bengisu & Uğurcan Evleniyor!",
  sosyalAciklama: "11 Temmuz 2026 • Sahildeki düğünümüze bekliyoruz.",

  /* --- DÜĞÜN TARİHİ ------------------------------------------------------- */
  // Geri sayımın hedef tarihi. ISO formatı: "YIL-AY-GÜNTSaat:Dakika:Saniye"
  // Örn: 11 Temmuz 2026, saat 20:00 -> "2026-07-11T20:00:00"
  dugunTarihiISO: "2026-07-11T20:00:00",

  // Ekranda gösterilecek tarih/saat metinleri (serbestçe yazabilirsin)
  tarihBuyukMetin: "11 Temmuz 2026",   // Kapak bölümünde
  tarihKisaMetin:  "11.07.2026",      // Mekan kartında
  saatMetin:       "20:00",

  /* --- MEKAN -------------------------------------------------------------- */
  mekanAdi:  "Polis Denizevi Sosyal Tesisleri",
  mekanIlce: "Çanakkale / Merkez",

  // Google Maps gömülü harita (iframe) embed linki.
  // NASIL ALINIR: Google Maps'te mekanı bul -> Paylaş -> "Harita yerleştir" (Embed a map)
  // -> oradaki <iframe src="..."> içindeki src adresini aşağıya yapıştır.
  haritaEmbedUrl: "https://www.google.com/maps?q=Polis%20Denizevi%20Sosyal%20Tesisleri%20%C3%87anakkale&output=embed",

  // "Haritada görmek için tıklayınız" linkinin gideceği normal Google Maps adresi.
  haritaLinki: "https://www.google.com/maps/place/Polis+Denizevi+Sosyal+Tesisleri/@40.11889,26.410079,802m/data=!3m2!1e3!4b1!4m6!3m5!1s0x14b1a9f85a654747:0x32d6ef1467a966ce!8m2!3d40.11889!4d26.410079!16s%2Fg%2F11g6nyy6g9?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D",

  /* --- AİLELER ------------------------------------------------------------ */
  gelinAilesi: "Çiğdem & Erdal",        // Gelinin anne-babası
  damatAilesi: "Nuran & Eray",       // Damadın anne-babası

  /* --- MÜZİK -------------------------------------------------------------- */
  // Çalmasını istediğin müzik dosyası. Dosyayı "audio/" klasörüne koy.
  muzikDosyasi: "audio/muzik.mp3",

  /* --- PROGRAM AKIŞI ------------------------------------------------------ */
  // İstediğin kadar satır ekleyip çıkarabilirsin.
  // "ikon" değeri için kullanılabilir isimler: "kalp", "yemek", "pasta", "muzik"
  program: [
    { ikon: "kalp",  baslik: "Karşılama & Takı Merasimi", saat: "20.00" },
    { ikon: "yemek", baslik: "Yemek Servisi",             saat: "21.00" },
    { ikon: "pasta", baslik: "Pasta Kesimi",              saat: "22.30" },
  ],
  dressCode: "Sahil Şıklığı",

  /* --- NOT BÖLÜMÜ --------------------------------------------------------- */
  notMetni: "Davetimiz sahil oteli atmosferinde gerçekleşecektir. Takı töreni düğün alanında yapılacaktır.",

  /* --- RSVP (KATILIM BİLDİRİMİ) ------------------------------------------ */
  rsvpSonTarih: "4 Temmuz 2026",

  // SEÇENEK A — FORMSPREE (forma yazılanlar e-postana düşer):
  //   1) https://formspree.io adresine ücretsiz üye ol.
  //   2) Yeni bir form oluştur, sana verilen endpoint'i (örn:
  //      https://formspree.io/f/abcdwxyz) aşağıya yapıştır.
  //   3) Boş bırakırsan form WhatsApp'a yönlendirme moduna düşer.
  formspreeEndpoint: "",

  // SEÇENEK B — WHATSAPP (form bilgileri hazır mesaj olarak gelir):
  //   Ülke kodu + numara, başında + ve boşluk olmadan. Örn TR: "905554443322"
  whatsappNumarasi: "905315000149",

  /* --- FOTOĞRAF PAYLAŞIMI ------------------------------------------------- */
  // Misafirlerin fotoğraf yükleyeceği Google Drive / Google Photos klasör linki.
  fotografLinki: "https://drive.google.com/drive/folders/SENIN_KLASOR_LINKIN",

};

/* ============================================================================
   AŞAĞISI MOTOR KISMIDIR — NORMALDE DEĞİŞTİRMENE GEREK YOK.
   ========================================================================== */

/* --- Küçük yardımcı: id ile element seç -------------------------------- */
const $ = (id) => document.getElementById(id);

/* --- Program satırları için basit inline SVG ikonları ------------------- */
const IKONLAR = {
  kalp:  '<path d="M12 21s-6.7-4.3-9.3-8.2C.9 10 1.9 6.2 5.1 5.3 7 4.8 9 5.6 12 8.3c3-2.7 5-3.5 6.9-3 3.2.9 4.2 4.7 2.4 7.5C18.7 16.7 12 21 12 21z"/>',
  yemek: '<path d="M6 2v8a2 2 0 0 0 2 2v10M8 2v6M4 2v6M18 2c-1.7 0-3 2.2-3 5s1.3 5 3 5v10" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  pasta: '<path d="M12 3a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zM5 11c0-1.7 1.3-3 3-3h8c1.7 0 3 1.3 3 3v2c-1 0-1.5.8-2.3.8S18.4 13 17.5 13s-1.4.8-2.2.8S13.9 13 13 13s-1.4.8-2.3.8S9.4 13 8.5 13s-1.4.8-2.2.8S5 13 4 13M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
  muzik: '<path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
};

/* ----------------------------------------------------------------------------
   1) CONFIG'teki metinleri sayfaya yerleştir
---------------------------------------------------------------------------- */
function metinleriYerlestir() {
  const ciftAdi = `${CONFIG.gelinAdi} & ${CONFIG.damatAdi}`;

  // Tarayici sekmesi ve sosyal medya onizleme metinleri
  document.title = CONFIG.siteBaslik;
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", CONFIG.sosyalBaslik);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", CONFIG.sosyalAciklama);

  // Çift isimleri (birden fazla yerde geçiyor)
  document.querySelectorAll("[data-cift-adi]").forEach((el) => (el.textContent = ciftAdi));
  document.querySelector(".alt-bilgi").textContent = `${ciftAdi} • ${CONFIG.tarihKisaMetin}`;

  // Mum mührü baş harfleri (örn: "E&E")
  const muhurMetni = `${CONFIG.gelinAdi.charAt(0)}&${CONFIG.damatAdi.charAt(0)}`;
  document.querySelectorAll("[data-cift-muhur]").forEach((el) => (el.textContent = muhurMetni));

  // Kapak & mekan tarihleri
  $("kapakTarih").textContent       = CONFIG.tarihBuyukMetin;
  $("mekanTarih").textContent       = CONFIG.tarihKisaMetin;
  $("mekanSaat").textContent        = CONFIG.saatMetin;
  $("mekanAdi").textContent         = CONFIG.mekanAdi;
  $("mekanIlce").textContent        = CONFIG.mekanIlce;

  // Aileler
  $("gelinAilesi").textContent      = CONFIG.gelinAilesi;
  $("damatAilesi").textContent      = CONFIG.damatAilesi;

  // Not
  $("notMetni").textContent         = CONFIG.notMetni;

  // Dress code
  $("dressCode").textContent        = "Dress Code: " + CONFIG.dressCode;

  // RSVP son tarih
  $("rsvpSonTarih").innerHTML =
    `Lütfen katılım durumunuzu <strong>${CONFIG.rsvpSonTarih}</strong> tarihine kadar iletiniz.`;

  // Harita
  $("haritaIframe").src             = CONFIG.haritaEmbedUrl;
  $("haritaLink").href              = CONFIG.haritaLinki;

  // Fotoğraf linki
  $("fotografLink").href            = CONFIG.fotografLinki;

  // Müzik kaynağı
  $("muzikKaynak").src              = CONFIG.muzikDosyasi;

  // Program satırlarını oluştur
  const programKutu = $("programListe");
  programKutu.innerHTML = "";
  CONFIG.program.forEach((adim) => {
    const satir = document.createElement("div");
    satir.className = "program-satir reveal";
    satir.innerHTML = `
      <div class="program-ikon">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          ${IKONLAR[adim.ikon] || IKONLAR.kalp}
        </svg>
      </div>
      <div class="program-bilgi">
        <span class="program-baslik">${adim.baslik}</span>
        <span class="program-saat">${adim.saat}</span>
      </div>`;
    programKutu.appendChild(satir);
  });
}

/* ----------------------------------------------------------------------------
   2) ZARF AÇILIŞ ANİMASYONU
   Zarfa tıklanınca: zarf açılır, davetiye görünür, sayfa kaydırılır.
---------------------------------------------------------------------------- */
function zarfiKur() {
  const zarfEkran = $("zarfEkran");
  const zarf      = $("zarf");

  function zarfiAc() {
    if (zarf.classList.contains("acik")) return;
    zarf.classList.add("acik");                 // kapak açılma animasyonu (CSS)

    // Açılış animasyonu bitince zarf ekranını yumuşakça kaldır
    setTimeout(() => {
      zarfEkran.classList.add("gizle");
      document.body.classList.remove("kilitli"); // scroll'u serbest bırak
      // Kapak bölümüne yumuşak kaydır
      $("kapak").scrollIntoView({ behavior: "smooth" });
    }, 1100);
  }

  zarf.addEventListener("click", zarfiAc);
  zarf.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); zarfiAc(); }
  });
}

/* ----------------------------------------------------------------------------
   3) GERİ SAYIM
---------------------------------------------------------------------------- */
function geriSayimiKur() {
  const hedef = new Date(CONFIG.dugunTarihiISO).getTime();

  function guncelle() {
    const fark = hedef - Date.now();

    if (fark <= 0) {
      // Düğün zamanı geldi/geçti
      $("gun").textContent = $("saat").textContent =
      $("dakika").textContent = $("saniye").textContent = "00";
      $("geriSayimMesaj").textContent = "Bugün o özel gün.";
      clearInterval(sayac);
      return;
    }

    const gun    = Math.floor(fark / (1000 * 60 * 60 * 24));
    const saat   = Math.floor((fark % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const dakika = Math.floor((fark % (1000 * 60 * 60)) / (1000 * 60));
    const saniye = Math.floor((fark % (1000 * 60)) / 1000);

    const ikiHane = (n) => String(n).padStart(2, "0");
    $("gun").textContent    = ikiHane(gun);
    $("saat").textContent   = ikiHane(saat);
    $("dakika").textContent = ikiHane(dakika);
    $("saniye").textContent = ikiHane(saniye);
  }

  guncelle();
  const sayac = setInterval(guncelle, 1000);
}

/* ----------------------------------------------------------------------------
   4) MÜZİK ÇALAR (plak / vinyl)
---------------------------------------------------------------------------- */
function muzigiKur() {
  const muzik = $("muzik");
  const plak  = $("plak");
  const yazi  = $("plakYazi");

  plak.addEventListener("click", () => {
    if (muzik.paused) {
      muzik.play()
        .then(() => {
          plak.classList.add("donuyor");
          yazi.textContent = "ÇALIYOR — DURDURMAK İÇİN TIKLA";
        })
        .catch(() => {
          // Tarayıcı otomatik oynatmayı engellerse kullanıcıyı bilgilendir
          yazi.textContent = "Müzik dosyası bulunamadı (audio/ klasörünü kontrol et)";
        });
    } else {
      muzik.pause();
      plak.classList.remove("donuyor");
      yazi.textContent = "DİNLEMEK İÇİN TIKLA";
    }
  });
}

/* ----------------------------------------------------------------------------
   5) RSVP FORMU
   - Formspree endpoint girilmişse: e-postaya gönderir (AJAX).
   - Girilmemişse: bilgileri hazır WhatsApp mesajına çevirir.
   - "WhatsApp ile Gönder" butonu her durumda çalışır.
---------------------------------------------------------------------------- */
function rsvpKur() {
  const form        = $("rsvpForm");
  const durumKutu   = $("rsvpDurum");
  const waButon     = $("whatsappButon");

  // Forma yazılanlardan WhatsApp mesajı üret
  function whatsappLinkiUret() {
    const isim   = $("rsvpIsim").value.trim()   || "(isim girilmedi)";
    const katilim= $("rsvpKatilim").value;
    const kisi   = $("rsvpKisi").value;

    const mesaj =
      `Düğün Katılım Bildirimi\n` +
      `Çift: ${CONFIG.gelinAdi} & ${CONFIG.damatAdi}\n` +
      `İsim: ${isim}\n` +
      `Durum: ${katilim}\n` +
      `Kişi Sayısı: ${kisi}`;

    return `https://wa.me/${CONFIG.whatsappNumarasi}?text=${encodeURIComponent(mesaj)}`;
  }

  // WhatsApp butonu
  waButon.addEventListener("click", () => {
    if (!$("rsvpIsim").value.trim()) {
      durumKutu.textContent = "Lütfen önce isminizi yazın.";
      durumKutu.className = "rsvp-durum hata";
      $("rsvpIsim").focus();
      return;
    }
    window.open(whatsappLinkiUret(), "_blank");
  });

  // Form gönderimi
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const endpointHazir =
      CONFIG.formspreeEndpoint && !CONFIG.formspreeEndpoint.includes("SENIN_KODUN");

    // Formspree ayarlı değilse doğrudan WhatsApp'a yönlendir
    if (!endpointHazir) {
      window.open(whatsappLinkiUret(), "_blank");
      durumKutu.textContent = "WhatsApp üzerinden iletmek için açılan pencereyi onaylayın.";
      durumKutu.className = "rsvp-durum basarili";
      return;
    }

    // Formspree'ye AJAX gönderimi
    durumKutu.textContent = "Gönderiliyor...";
    durumKutu.className = "rsvp-durum";
    try {
      const cevap = await fetch(CONFIG.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (cevap.ok) {
        form.reset();
        durumKutu.textContent = "Teşekkürler! Katılım bildiriminiz bize ulaştı.";
        durumKutu.className = "rsvp-durum basarili";
      } else {
        throw new Error("Gönderim başarısız");
      }
    } catch (err) {
      durumKutu.textContent = "Bir hata oluştu. Lütfen WhatsApp butonunu kullanın.";
      durumKutu.className = "rsvp-durum hata";
    }
  });
}

/* ----------------------------------------------------------------------------
   6) SCROLL FADE-IN ANİMASYONLARI (IntersectionObserver)
   ".reveal" sınıfı olan her öğe görünüme girince ".gorundu" alır.
---------------------------------------------------------------------------- */
function animasyonlariKur() {
  const gozlemci = new IntersectionObserver(
    (girisler) => {
      girisler.forEach((giris) => {
        if (giris.isIntersecting) {
          giris.target.classList.add("gorundu");
          gozlemci.unobserve(giris.target); // bir kez tetiklensin
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => gozlemci.observe(el));
}

/* ----------------------------------------------------------------------------
   BAŞLATICI
---------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("kilitli"); // zarf açılana kadar scroll kilitli
  metinleriYerlestir();
  zarfiKur();
  geriSayimiKur();
  muzigiKur();
  rsvpKur();
  animasyonlariKur();
});





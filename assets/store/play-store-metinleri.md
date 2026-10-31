# Marinext 2100 — Google Play Store Mağaza Giriş Rehberi ve Hazır Metinler

Bu dosya, **Google Play Console** üzerinde **CG Studio Home** geliştirici hesabıyla **Marinext 2100 (`com.cgstudiohome.marinext2100`)** uygulamasını oluştururken sorulan tüm metinleri ve form yanıtlarını kopyala-yapıştır yapabilmeniz için hazırlanmıştır.

* **Geliştirici Adı:** `CG Studio Home`
* **Resmi İletişim E-postası:** `info@erpdanisman.com`
* **Paket Kimliği (`applicationId`):** `com.cgstudiohome.marinext2100`
* **Hedef Android SDK (`targetSdkVersion` / `compileSdkVersion`):** `API 36 (Android 16)`

---

## 1. Mağaza Girişi Metinleri (Türkçe - `tr-TR`)

* **Uygulama Adı (Maks. 30 karakter):**
  `Marinext 2100`

* **Kısa Açıklama (Maks. 80 karakter):**
  `100 bölüm siber zindan, 15 trol bölümü, 14 tarihi kahraman ve 120 FPS aksiyon!`

* **Tam Açıklama (Maks. 4000 karakter):**
```text
Marinext 2100 ile siber gelecek ve tarihi kahramanların buluştuğu yüksek tempolu 2D platform macerasına adım atın!

10 farklı aksiyon dünyasında (Siber Zindan, Kristal Mağara, Magma Çekirdeği, Sıfır Yerçekimi İstasyonu, Lazer Kalesi, Kuantum Boşluğu ve İmparatorluk Zirvesi) yer alan 100 ana görev bölümü ve reflekslerinizi zorlayacak 15 özel Trol Modu bölümü sizi bekliyor.

ÖNE ÇIKAN ÖZELLİKLER:
• 100 Bölüm Ana Hikaye + 15 Bölüm Özel Trol Modu: Her bölümde sürpriz mekanikler, 3D süper trambolinler, yönlü dev rüzgar fanları, solucan deliği ışınlayıcılar, zamanlamalı lazer kapıları ve 20 dev Boss savaşı.
• 14 Efsanevi Karakter Koleksiyonu (✪ Coin) & Gerçek Oyun İçi Yetenekler:
  - Siber Gölge Şövalye, 1950 Klasik Asker, Modern Özel Kuvvetler, Elit İş İnsanı
  - Osmanlı Paşası, Kraliyet Hükümdarı, Yavuz Sultan Selim Han, Fatih Sultan Mehmet Han, Kanuni Sultan Süleyman Han, Yeniçeri Ağası
  - Siber Samuray, Astro-Şövalye, Fırtına Korucusu ve Gölge Suikastçısı!
• Karakter Kişiselleştirme Stüdyosu (❖ Antik Zümrüt & Bölüm Başarı Ödülleri): Kanatlar, silahlar, kasklar, vizörler, zırh işlemeleri, pelerinler ve auralar karakterinize süzülme, hız, zıplama, ekstra kalp ve mıknatıs gücü kazandırır.
• Google Play Games Liderlik Tablosu: 4 farklı kategoride (Skor, 100 Bölüm & Boss, Zümrüt Hazine, Hız Rekoru) gerçek oyuncularla yarışın ve lig ödüllerini toplayın.
• Ayarlanabilir Kare Hızı (30 / 60 / 120 FPS): Her telefon ve tablete uyumlu akıcı oyun motoru.
• 9 Dil Desteği ve Otomatik Dil Algılama: Türkçe, İngilizce, Rusça, İtalyanca, İspanyolca, Fransızca, Korece, Çince ve Japonca.
```

---

## 2. Store Listing Texts (English - `en-US`)

* **App Name:**
  `Marinext 2100`

* **Short Description:**
  `100 cyber platformer levels, 15 troll stages, 14 heroes & 120 FPS action!`

* **Full Description:**
```text
Step into a high-speed 2D action platformer where cyber-futuristic dungeons meet legendary historical heroes in Marinext 2100!

Battle through 100 handcrafted campaign stages across 10 unique action worlds filled with crystal caverns, super trampolines, directional wind turbines, wormhole teleporters, laser gates, and 20 epic Boss fights—plus 15 brain-teasing Troll Mode stages.

KEY FEATURES:
• 100 Campaign Levels + 15 Troll Mode Stages: Master precision jumps, mystery blocks, moving saws, low-gravity zones, and dark dungeon guardians.
• 14 Playable Heroes (✪ Coins) with Unique Gameplay Perks:
  - Cyber Shadow Knight, 1950 Vintage Soldier, Special Forces Commando, Elite Tycoon
  - Ottoman Pasha, Royal Monarch, Sultan Selim I, Sultan Mehmed II, Sultan Suleiman, Janissary Commander
  - Cyber Samurai, Astro-Knight, Storm Ranger, and Shadow Assassin!
• Live Character Customization Studio (❖ Ancient Emeralds & Milestone Rewards): Equip wings, weapons, helmets, visors, armor trims, capes, and auras that grant real gameplay perks (+HP, +Speed, +Jump, +Wing Glide, +Magnet Range).
• Google Play Games Leaderboards: Compete with real players across 4 categories (Score, 100 Levels & Bosses, Emerald Treasure, Speedrun).
• Adaptive Frame Rate (30 / 60 / 120 FPS) & 9 Auto-Detected Languages (TR, EN, RU, IT, ES, FR, KO, ZH, JA).
```

---

## 3. Google Play Console Form Yanıtları (Uygulama İçeriği / App Content)

1. **Uygulama Kategorisi:**
   * **Oyun** -> **Aksiyon (Action)** veya **Platform (Arcade / Platformer)**
2. **Reklamlar (Ads):**
   * *"Evet, uygulamam reklam içeriyor"* (Yes, my app contains ads) seçeneğini işaretleyin.
3. **Veri Güvenliği (Data Safety Formu):**
   * *Uygulamanız gerekli kullanıcı verilerini topluyor veya paylaşıyor mu?* -> **Evet** (Google AdMob SDK nedeniyle).
   * *Veri Türleri:* **Cihaz veya diğer kimlikler (Device or other IDs - Advertising ID)** ve **Yaklaşık Konum (Approximate location - IP tabanlı)** + **Uygulama etkileşimleri / Tanı verileri (Diagnostics)**.
   * *Kullanım Amacı:* **Reklamcılık veya pazarlama (Advertising or marketing)** ve **Analiz / Dolandırıcılık önleme (Analytics & Fraud prevention)**.
4. **Gizlilik Politikası URL'si (Canlı GitHub Pages Linkiniz):**
   * `https://cevatturk.github.io/2100-Mario/privacy-policy.html`
5. **Geliştirici Web Sitesi URL'si (Google AdMob `app-ads.txt` Doğrulaması İçin):**
   * `https://cevatturk.github.io` (Ana dizininde `https://cevatturk.github.io/app-ads.txt` otomatik yayınlanmıştır)
6. **Hazır Görsel Dosyalarınız (`assets/store/` klasöründe):**
   * Uygulama İkonu (`512x512 px`): `assets/store/icon-512.png`
   * Öne Çıkan Görsel / Feature Graphic (`1024x500 px`): `assets/store/feature-graphic-1024x500.png`

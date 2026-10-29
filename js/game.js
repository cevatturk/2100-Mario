// Main Game Engine: 10-Level Campaign, Character Customization Studio (Ancient Emeralds ❖), Traps & Bosses

// ============================================================================
// 📺 GOOGLE ADMOB KULLANICI DOSTU AKILLI REKLAM SİSTEMİ YAPILANDIRMASI
// (Capacitor @capacitor-community/admob ile Native Android ve Tarayıcı Uyumlu)
// ============================================================================
const ADMOB_CONFIG = {
    appIdAndroid: "ca-app-pub-1366538011855586~4280227520",          // Google AdMob Uygulama ID'niz (Marinext 2100)
    rewardedAdUnitId: "ca-app-pub-1366538011855586/3303469030",      // Ödüllü Video Reklam Birimi ID'niz (Odullu_Reklam)
    interstitialAdUnitId: "ca-app-pub-1366538011855586/9340982515",  // Bölüm Sonu Geçiş Reklamı Birimi ID'niz (Gecis_Reklami)
    isTesting: false,                                                // Gerçek AdMob üretim kimlikleri aktif
    interstitialEveryNLevels: 3,                                     // Sadece 3 bölüm kazanıldığında 1 kez geçiş reklamı
    minSecondsBetweenInterstitials: 180,                             // İki geçiş reklamı arası en az 3 dakika (180 sn)
    skipInterstitialAfterRewardedSeconds: 120                        // Oyuncu ödüllü reklam izlediyse 2 dk geçiş reklamı çıkmaz
};

const HERO_CHARACTERS_CATALOG = [
    {
        id: "default",
        icon: "⚔️",
        title: "Siber Gölge Şövalye (Varsayılan)",
        faceDesc: "Yüz Tipi: Neon Lazer Vizörlü Siber Maske",
        desc: "Standart gelecek çağı zırhlı siber şövalye görünümü.",
        cost: 0
    },
    {
        id: "soldier_1950",
        icon: "🎖️",
        title: "1950 Asker Kıyafeti",
        faceDesc: "Yüz Tipi: 1950'ler Kalın Bıyıklı & Sert Çeneli Gazi Yüzü",
        desc: "1950 dönemi haki yün üniforma, çapraz deri kayış, fileli M1 çelik miğfer ve ahşap dipçikli tüfek.",
        cost: 20
    },
    {
        id: "soldier_modern",
        icon: "🎯",
        title: "Şimdi Kullanılan Asker Kıyafeti",
        faceDesc: "Yüz Tipi: Kamuflaj Boyalı & Taktik Sakallı Komando Yüzü",
        desc: "Modern dijital kamuflaj, MOLLE hücum yeleği, telsiz anteni ve 4'lü gece görüşlü (NVG) FAST balistik kask.",
        cost: 80
    },
    {
        id: "rich_tycoon",
        icon: "🎩",
        title: "Zengin Kıyafeti",
        faceDesc: "Yüz Tipi: Altın Monokl Gözlüklü & İnce Bıyıklı Milyarder Yüzü",
        desc: "Özel dikim kruvaze siyah smokin, kırmızı ipek kravat, altın cep saati zinciri, altın baston ve silindir şapka.",
        cost: 110
    },
    {
        id: "ottoman_pasha",
        icon: "⚔️",
        title: "Osmanlı Paşası Kıyafeti",
        faceDesc: "Yüz Tipi: Gür Burma Pala Bıyıklı & Paşa Sakallı Vakur Yüz",
        desc: "Altın sırma işlemeli tören üniforması, saçaklı altın apoletler, Osmanlı nişanı, kılıç ve siyah püsküllü bordo fes.",
        cost: 130
    },
    {
        id: "royal_king",
        icon: "👑",
        title: "Kral Kıyafeti",
        faceDesc: "Yüz Tipi: Uzun Gür Kral Sakallı & Mavi Gözlü Hükümdar Yüzü",
        desc: "Kakım kürklü kızıl kraliyet pelerini, altın işlemeli mor tunik, kraliyet asası ve mücevherli altın kral tacı.",
        cost: 200
    },
    {
        id: "yavuz_sultan_selim",
        icon: "🕌",
        title: "Yavuz Sultan Selim Kıyafeti",
        faceDesc: "Yüz Tipi: Sakalsız Keskin Çene, Uzun Sarkık Pala Bıyık & İnci Küpe",
        desc: "Tarihi portreye birebir: Samur kürklü altın işlemeli kırmızı Hünkar Kaftanı ve sorguçlu burmalı Tac-ı Selimi sarığı!",
        cost: 300
    }
];

const SHOP_CATALOG = [
    {
        id: "heart1",
        type: "upgrade",
        icon: "🛡️",
        title: "Titanyum Zırh Kaplama",
        desc: "Hasar aldıktan sonra koruyucu dokunulmazlık süresini uzatır! (Sabit 3 Can ♥♥♥)",
        cost: 25
    },
    {
        id: "heart2",
        type: "upgrade",
        icon: "⚡",
        title: "Kuantum Hava Kontrolü",
        desc: "Havada daha keskin manevra ve zıplama dengesi sağlar! (Sabit 3 Can ♥♥♥)",
        cost: 55
    },
    {
        id: "heart3",
        type: "upgrade",
        icon: "💎",
        title: "Kristal & Skor Çarpanı",
        desc: "Toplanan her Kristal ve Zümrütten ekstra bonus skor kazandırır!",
        cost: 90
    },
    {
        id: "startShield",
        type: "upgrade",
        icon: "🛡",
        title: "Başlangıç Aether Kalkanı",
        desc: "Her bölüme otomatik koruyucu kalkan ile başla!",
        cost: 40
    },
    {
        id: "startFire",
        type: "upgrade",
        icon: "🔥",
        title: "Başlangıç Plazma Ateşi",
        desc: "Her bölüme doğrudan Ateş Topu gücüyle başla!",
        cost: 65
    },
    {
        id: "speedBoots",
        type: "upgrade",
        icon: "👢",
        title: "Hiper-Hız Çizmeleri",
        desc: "Kalıcı olarak %18 daha hızlı koş!",
        cost: 50
    },
    {
        id: "emeraldMagnet",
        type: "upgrade",
        icon: "🧲",
        title: "Antik Zümrüt & Kristal Mıknatısı",
        desc: "Yakındaki tüm Kristal ve Antik Zümrütleri otomatik kendine çeker!",
        cost: 70
    },
    {
        id: "tripleJump",
        type: "upgrade",
        icon: "🚀",
        title: "Üçlü Zıplama Modülü (Triple Jump)",
        desc: "Havada 2 yerine tam 3 kez zıplayabilme yeteneği!",
        cost: 110
    }
];

// 66 Visual Character Customization Items across 6 Visual Categories (+ 8 Upgrades = 74 Total)
const CUSTOMIZE_CATALOG = [
    // ================= 1. HELMETS (12 Çeşit) =================
    { id: "helmet_crest", category: "helmet", value: "crest", icon: "👑", title: "Şövalye Tepeliği", desc: "Klasik aerodinamik siber şövalye miğferi.", cost: 0 },
    { id: "helmet_horns", category: "helmet", value: "horns", icon: "👹", title: "Samuray Boynuzları", desc: "Karanlık savaşçılara özel kıvrımlı neon boynuzlar.", cost: 1 },
    { id: "helmet_viking", category: "helmet", value: "viking", icon: "🐂", title: "Kuzeyli Viking Boynuzu", desc: "Yana doğru açılan dev kemik savaş boynuzları.", cost: 2 },
    { id: "helmet_ronin", category: "helmet", value: "ronin", icon: "⛩", title: "Gölge Ronin Şapkası", desc: "Geniş kenarlı neon bambu suikastçı şapkası.", cost: 2 },
    { id: "helmet_wolf", category: "helmet", value: "wolf", icon: "🐺", title: "Siber Kurt Başlığı", desc: "Sivri kulaklı mekanik alfa kurt miğferi.", cost: 3 },
    { id: "helmet_spartan", category: "helmet", value: "spartan", icon: "🏛", title: "Spartalı Komutan sorgucu", desc: "Gür kızıl tüylü antik gladyatör sorgucu.", cost: 3 },
    { id: "helmet_antennas", category: "helmet", value: "antennas", icon: "🤖", title: "Siber Mecha Antenleri", desc: "Uçlarında enerji küreleri parlayan çift mecha anteni.", cost: 3 },
    { id: "helmet_crown", category: "helmet", value: "crown", icon: "👑", title: "İmparatorluk Tacı", desc: "Parlayan saf altın ve yakut kraliyet tacı.", cost: 4 },
    { id: "helmet_wizard", category: "helmet", value: "wizard", icon: "🧙", title: "Karanlık Büyücü Şapkası", desc: "Altın kemerli mistik büyücü şapkası.", cost: 4 },
    { id: "helmet_skull", category: "helmet", value: "skull", icon: "💀", title: "Hayalet Kurukafa Maskesi", desc: "Korkutucu kemik zırhlı ölüm şövalyesi başlığı.", cost: 5 },
    { id: "helmet_halo", category: "helmet", value: "halo", icon: "😇", title: "Siber Başmelek Halkası", desc: "Miğferin üstünde süzülen kutsal enerji halkası.", cost: 5 },
    { id: "helmet_flames", category: "helmet", value: "flames", icon: "🔥", title: "Cehennem Alevi Tacı", desc: "Başı tamamen saran canlı plazma alevleri!", cost: 6 },

    // ================= 2. BACK WEAPONS & WINGS (12 Çeşit) =================
    { id: "gear_katana", category: "backGear", value: "katana", icon: "🗡", title: "Plazma Katana", desc: "Sırtta taşınan keskin enerji kılıcı.", cost: 0 },
    { id: "gear_dual", category: "backGear", value: "dual_blades", icon: "⚔️", title: "Çift Lazer Hançeri", desc: "Çapraz kuşanılmış çift suikastçı bıçağı.", cost: 1 },
    { id: "gear_bow", category: "backGear", value: "bow", icon: "🏹", title: "Neon Avcı Yayı", desc: "Enerji kirişli siber okçu yayı.", cost: 2 },
    { id: "gear_axe", category: "backGear", value: "axe", icon: "🪓", title: "Dev Savaş Baltası", desc: "Ağır zırhları parçalayan çift taraflı cellat baltası.", cost: 2 },
    { id: "gear_greatsword", category: "backGear", value: "greatsword", icon: "🗡️", title: "Titan Dev Kılıcı", desc: "Boyundan büyük rün işlemeli devasa şövalye kılıcı.", cost: 3 },
    { id: "gear_scythe", category: "backGear", value: "scythe", icon: "⚰️", title: "Ölüm Meleği Tırpanı", desc: "Karanlık enerji yayan dev hilal tırpan.", cost: 3 },
    { id: "gear_shuriken", category: "backGear", value: "shuriken", icon: "✴️", title: "Dönen Dev Ninja Yıldızı", desc: "Sırtın arkasında sürekli dönen dev enerji shuriken'i!", cost: 4 },
    { id: "gear_jetpack", category: "backGear", value: "jetpack", icon: "🚀", title: "Çift Türbinli Jetpack", desc: "Altından sürekli mavi-turuncu roket ateşi püskürten jet çantası!", cost: 4 },
    { id: "gear_spider", category: "backGear", value: "spider_legs", icon: "🕷", title: "Mekanik Örümcek Kolları", desc: "Sırttan çıkan 4 adet hareketli biyo-mekanik pençe bacak!", cost: 5 },
    { id: "gear_wings", category: "backGear", value: "wings", icon: "🪽", title: "Siber Enerji Kanatları", desc: "Koşarken ve zıplarken çırpınan plazma kanatlar.", cost: 5 },
    { id: "gear_dragon", category: "backGear", value: "dragon_wings", icon: "🐲", title: "Kızıl Ejderha Kanatları", desc: "Pençeli ve zarlı devasa karanlık ejderha kanatları.", cost: 6 },
    { id: "gear_angel", category: "backGear", value: "angel_wings", icon: "👼", title: "Kutsal Başmelek Kanatları", desc: "Altın ve saf beyaz tüylerden oluşan ihtişamlı melek kanatları.", cost: 7 },

    // ================= 3. ARMOR SKINS (12 Çeşit) =================
    { id: "skin_cyan", category: "skin", value: "cyan", icon: "💠", title: "Gölge Mavisi", desc: "Klasik neon mavi mağara şövalyesi zırhı.", cost: 0 },
    { id: "skin_crimson", category: "skin", value: "crimson", icon: "🩸", title: "Kızıl Baron", desc: "Kızıl neon ve koyu yakut zırh kaplaması.", cost: 1 },
    { id: "skin_emerald", category: "skin", value: "emerald", icon: "❇️", title: "Zümrüt Suikastçı", desc: "Antik zümrüt parıltılı orman muhafızı zırhı.", cost: 2 },
    { id: "skin_arctic", category: "skin", value: "arctic", icon: "❄️", title: "Buzul Şövalyesi", desc: "Saf beyaz ve buz mavisi kristal zırh.", cost: 2 },
    { id: "skin_toxic", category: "skin", value: "toxic", icon: "☣️", title: "Radyoaktif Biyo-Zırh", desc: "Fosforlu asit yeşili siber-simbiyot zırhı.", cost: 2 },
    { id: "skin_sakura", category: "skin", value: "sakura", icon: "🌸", title: "Pembe Samuray (Sakura)", desc: "Kiraz çiçeği pembesi ve bordo samuray zırhı.", cost: 3 },
    { id: "skin_stealth", category: "skin", value: "stealth", icon: "⚔️", title: "Gece Hayaleti (Stealth)", desc: "Mat karbon siyahı ve gümüş gizli operasyon zırhı.", cost: 3 },
    { id: "skin_violet", category: "skin", value: "violet", icon: "🔮", title: "Boşluk Muhafızı", desc: "Derin mor neon enerji zırhı.", cost: 3 },
    { id: "skin_magma", category: "skin", value: "magma", icon: "🌋", title: "Magma Titanı", desc: "Erimiş lav turuncusu ve volkanik kaya zırhı.", cost: 4 },
    { id: "skin_galaxy", category: "skin", value: "galaxy", icon: "🌌", title: "Kozmik Galaksi", desc: "Yıldız tozu pembesi ve derin uzay laciverti zırh.", cost: 4 },
    { id: "skin_gold", category: "skin", value: "gold", icon: "🌟", title: "Altın Hükümdar", desc: "Efsanevi 24 ayar altın kaplama imparator zırhı.", cost: 5 },
    { id: "skin_rainbow", category: "skin", value: "rainbow", icon: "🌈", title: "RGB Gökkuşağı (Canlı Renk)", desc: "Oyun içinde saniye saniye renk değiştiren efsanevi RGB zırh!", cost: 7 },

    // ================= 4. VISORS & EYES (10 Çeşit) =================
    { id: "visor_slit", category: "visor", value: "slit", icon: "➖", title: "Klasik Şövalye Vizörü", desc: "Yatay keskin lazer vizör çizgisi.", cost: 0 },
    { id: "visor_cyclops", category: "visor", value: "cyclops", icon: "🔴", title: "Tepegöz Lazer Merceği", desc: "Ortada parlayan tekil hedefleme merceği.", cost: 1 },
    { id: "visor_dual", category: "visor", value: "dual_eyes", icon: "👀", title: "Çift Avcı Gözü", desc: "Karanlıkta parlayan yırtıcı çift göz.", cost: 1 },
    { id: "visor_x", category: "visor", value: "x_visor", icon: "✖️", title: "X-Suikastçı Vizörü", desc: "Çapraz kesik neon X işareti.", cost: 2 },
    { id: "visor_shades", category: "visor", value: "shades", icon: "🕶", title: "Siber Güneş Gözlüğü", desc: "Parlak yansımalı havalı siberpunk gözlük.", cost: 2 },
    { id: "visor_robo", category: "visor", value: "robo_grid", icon: "📟", title: "Dijital Matrix Izgarası", desc: "4 noktalı taktiksel robotik sensör ekranı.", cost: 2 },
    { id: "visor_heart", category: "visor", value: "heart_visor", icon: "💗", title: "Neon Kalp Gözü", desc: "Parlayan pembe kalp şeklinde vizör.", cost: 3 },
    { id: "visor_sharingan", category: "visor", value: "sharingan", icon: "👁️", title: "Kızıl Mistik Göz", desc: "Hipnotize edici kızıl halka göz.", cost: 3 },
    { id: "visor_flame", category: "visor", value: "flame_eyes", icon: "🔥", title: "Alev Saçan Gözler", desc: "Vizörden dışarı taşan öfkeli ateş izleri.", cost: 4 },
    { id: "visor_void", category: "visor", value: "void_gaze", icon: "🕳", title: "Üçlü Boşluk Gözü", desc: "Alında üçüncü göz açan karanlık enerji bakışı.", cost: 5 },

    // ================= 5. AURAS & EFFECTS (10 Çeşit) =================
    { id: "aura_none", category: "aura", value: "none", icon: "⭕", title: "Aura Yok", desc: "Sade görünüm, ekstra efekt yok.", cost: 0 },
    { id: "aura_stars", category: "aura", value: "stars", icon: "✨", title: "Yıldız Tozu Parıltısı", desc: "Karakterin etrafında dönen altın yıldız kristalleri.", cost: 2 },
    { id: "aura_sakura", category: "aura", value: "sakura_petals", icon: "🌸", title: "Sakura Yaprak Fırtınası", desc: "Etrafında uçuşan pembe kiraz çiçeği yaprakları.", cost: 2 },
    { id: "aura_dark", category: "aura", value: "dark_mist", icon: "🌑", title: "Karanlık Gölge Sisi", desc: "Ayaklardan yükselen gizemli mor-siyah gölge dumanı.", cost: 3 },
    { id: "aura_emerald", category: "aura", value: "emerald_rain", icon: "❖", title: "Antik Zümrüt Yağmuru", desc: "Karakterin etrafında süzülen mini zümrüt kristalleri.", cost: 3 },
    { id: "aura_fire", category: "aura", value: "fire_aura", icon: "🔥", title: "Süper Saiyan Alev Aurası", desc: "Karakteri tamamen saran yükselen alev dalgaları!", cost: 4 },
    { id: "aura_lightning", category: "aura", value: "lightning", icon: "⚡", title: "Yıldırım & Elektrik Alanı", desc: "Zırhın etrafında çakan yüksek voltajlı şimşekler!", cost: 4 },
    { id: "aura_souls", category: "aura", value: "soul_orbs", icon: "🔮", title: "Mistik Ruh Küreleri", desc: "Yörüngede dönen 3 adet koruyucu hayalet küresi.", cost: 5 },
    { id: "aura_cyber", category: "aura", value: "cyber_rings", icon: "🪐", title: "Hologram Siber Halkalar", desc: "Karakteri tarayan çift katmanlı neon enerji çemberi.", cost: 5 },
    { id: "aura_rainbow", category: "aura", value: "rainbow_trail", icon: "🌈", title: "Kozmik Gökkuşağı Aurası", desc: "Renk değiştiren üçlü prizma enerji halkası!", cost: 6 },

    // ================= 6. CAPES (10 Çeşit) =================
    { id: "cape_pink", category: "cape", value: "#ff2a85", icon: "🧣", title: "Neon Pembe Pelerin", desc: "Klasik yüksek kontrastlı pembe pelerin.", cost: 0 },
    { id: "cape_gold", category: "cape", value: "#ffd166", icon: "🔥", title: "Altın Alev Pelerin", desc: "Parlayan altın sarısı kraliyet pelerini.", cost: 1 },
    { id: "cape_emerald", category: "cape", value: "#06d6a0", icon: "🍃", title: "Zümrüt Yeşili Pelerin", desc: "Biyolüminesan yeşil pelerin.", cost: 1 },
    { id: "cape_cyan", category: "cape", value: "#00f2fe", icon: "❄️", title: "Buz Mavisi Pelerin", desc: "Soğuk plazma mavisi pelerin.", cost: 2 },
    { id: "cape_purple", category: "cape", value: "#b537f2", icon: "⚡", title: "Mor Fırtına Pelerin", desc: "Karanlık enerji moru pelerin.", cost: 2 },
    { id: "cape_orange", category: "cape", value: "#ff5400", icon: "🌋", title: "Volkanik Turuncu Pelerin", desc: "Kızgın lav turuncusu pelerin.", cost: 2 },
    { id: "cape_crimson", category: "cape", value: "#ef233c", icon: "🩸", title: "Kan Kırmızısı Pelerin", desc: "Asil şövalye kırmızısı pelerin.", cost: 2 },
    { id: "cape_white", category: "cape", value: "#ffffff", icon: "🕊", title: "Saf Beyaz Işık Pelerini", desc: "Karanlıkta parlayan bembeyaz pelerin.", cost: 3 },
    { id: "cape_toxic", category: "cape", value: "#aacc00", icon: "☣️", title: "Neon Asit Pelerini", desc: "Parlak fıstık yeşili siber pelerin.", cost: 3 },
    { id: "cape_rainbow", category: "cape", value: "rainbow", icon: "🌈", title: "Gökkuşağı Tayf Pelerini", desc: "Dalgalandıkça renk değiştiren efsanevi RGB pelerin!", cost: 5 }
];

// 30 Distinct Profile Pictures (Portraits) with Custom Gradient Frames
const PROFILE_AVATARS = [
    { id: "av_1", icon: "⚔️", title: "Gölge Ninja", bg: "linear-gradient(135deg, #091e3a, #0077b6)", border: "#00f2fe" },
    { id: "av_2", icon: "⚔️", title: "Siber Şövalye", bg: "linear-gradient(135deg, #1b1f3b, #3a0ca3)", border: "#4cc9f0" },
    { id: "av_3", icon: "👹", title: "Kızıl Samuray", bg: "linear-gradient(135deg, #2b0918, #9b0047)", border: "#ff2a85" },
    { id: "av_4", icon: "🐺", title: "Alfa Siber Kurt", bg: "linear-gradient(135deg, #0f172a, #334155)", border: "#38bdf8" },
    { id: "av_5", icon: "👑", title: "Altın İmparator", bg: "linear-gradient(135deg, #291d06, #92400e)", border: "#ffd166" },
    { id: "av_6", icon: "🐲", title: "Zümrüt Ejderha", bg: "linear-gradient(135deg, #062922, #047857)", border: "#06d6a0" },
    { id: "av_7", icon: "🧙", title: "Boşluk Büyücüsü", bg: "linear-gradient(135deg, #190a28, #5a189a)", border: "#c77dff" },
    { id: "av_8", icon: "💀", title: "Hayalet Kurukafa", bg: "linear-gradient(135deg, #111827, #374151)", border: "#f8f9fa" },
    { id: "av_9", icon: "🤖", title: "Mecha Komutan", bg: "linear-gradient(135deg, #0c192c, #0284c7)", border: "#00f2fe" },
    { id: "av_10", icon: "🔥", title: "Cehennem Şövalyesi", bg: "linear-gradient(135deg, #2b0f06, #c2410c)", border: "#ff6d00" },
    { id: "av_11", icon: "❄️", title: "Buzul Muhafızı", bg: "linear-gradient(135deg, #082f49, #0369a1)", border: "#90e0ef" },
    { id: "av_12", icon: "⚡", title: "Yıldırım Lordu", bg: "linear-gradient(135deg, #1e1b4b, #4338ca)", border: "#ffd166" },
    { id: "av_13", icon: "🦅", title: "Fırtına Kartalı", bg: "linear-gradient(135deg, #172554, #1d4ed8)", border: "#60a5fa" },
    { id: "av_14", icon: "🦁", title: "Aslan Yürek", bg: "linear-gradient(135deg, #3b1806, #b45309)", border: "#f59e0b" },
    { id: "av_15", icon: "🐯", title: "Beyaz Kaplan", bg: "linear-gradient(135deg, #1e293b, #475569)", border: "#e2e8f0" },
    { id: "av_16", icon: "🦊", title: "Gece Tilkisi", bg: "linear-gradient(135deg, #31102f, #be185d)", border: "#f472b6" },
    { id: "av_17", icon: "🕷", title: "Siber Örümcek", bg: "linear-gradient(135deg, #1a062b, #6b21a8)", border: "#e879f9" },
    { id: "av_18", icon: "🦂", title: "Neon Akrep", bg: "linear-gradient(135deg, #042f2e, #0f766e)", border: "#2dd4bf" },
    { id: "av_19", icon: "🦇", title: "Gece Avcısı", bg: "linear-gradient(135deg, #090d16, #311042)", border: "#b537f2" },
    { id: "av_20", icon: "🦈", title: "Derinlik Köpekbalığı", bg: "linear-gradient(135deg, #041e42, #00509d)", border: "#00b4d8" },
    { id: "av_21", icon: "🦉", title: "Mistik Baykuş", bg: "linear-gradient(135deg, #1f1638, #4c1d95)", border: "#a78bfa" },
    { id: "av_22", icon: "🐍", title: "Zehirli Kobra", bg: "linear-gradient(135deg, #142e15, #3f6212)", border: "#aacc00" },
    { id: "av_23", icon: "🦄", title: "Kozmik Efsane", bg: "linear-gradient(135deg, #2e1065, #db2777)", border: "#f472b6" },
    { id: "av_24", icon: "👨‍🚀", title: "Galaksi Gezgini", bg: "linear-gradient(135deg, #030712, #1e3a8a)", border: "#38bdf8" },
    { id: "av_25", icon: "🧛", title: "Karanlık Kont", bg: "linear-gradient(135deg, #2a040d, #881337)", border: "#fb7185" },
    { id: "av_26", icon: "🧞", title: "Aether Ruhu", bg: "linear-gradient(135deg, #083344, #0891b2)", border: "#22d3ee" },
    { id: "av_27", icon: "🏴‍☠️", title: "Uzay Korsanı", bg: "linear-gradient(135deg, #18181b, #3f3f46)", border: "#facc15" },
    { id: "av_28", icon: "🛡️", title: "Titan Muhafızı", bg: "linear-gradient(135deg, #172554, #0f766e)", border: "#06d6a0" },
    { id: "av_29", icon: "💎", title: "Antik Kristal Kralı", bg: "linear-gradient(135deg, #022c22, #059669)", border: "#34d399" },
    { id: "av_30", icon: "🌈", title: "RGB Efsanesi", bg: "linear-gradient(135deg, #ff2a85, #7209b7, #00f2fe)", border: "#ffd166" }
];

const LANGUAGES = [
    { code: "ru", badge: "RU", icon: "👅 🇷🇺", native: "Русский", trName: "Rusça" },
    { code: "tr", badge: "TR", icon: "👅 🇹🇷", native: "Türkçe", trName: "Türkçe" },
    { code: "en", badge: "EN", icon: "👅 🇬🇧", native: "English", trName: "İngilizce" },
    { code: "it", badge: "IT", icon: "👅 🇮🇹", native: "Italiano", trName: "İtalyanca" },
    { code: "es", badge: "ES", icon: "👅 🇪🇸", native: "Español", trName: "İspanyolca" },
    { code: "fr", badge: "FR", icon: "👅 🇫🇷", native: "Français", trName: "Fransızca" },
    { code: "ko", badge: "KO", icon: "👅 🇰🇷", native: "한국어", trName: "Korece" },
    { code: "zh", badge: "ZH", icon: "👅 🇨🇳", native: "中文", trName: "Çince" },
    { code: "ja", badge: "JA", icon: "👅 🇯🇵", native: "日本語", trName: "Japonca" }
];

const LANG_DICT = {
    tr: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 BÖLÜM TAM SÜRÜM",
        profileTag: "OYUNCU PROFİLİ",
        hudProfileTag: "PROFİL",
        emeraldLabel: "Antik Zümrüt:",
        hudEmeraldLabel: "Zümrüt:",
        coinLabel: "Kristal:",
        heartsText: "♥ ♥ ♥ 3 CAN",
        scoreLabel: "Skor:",
        trollBadge: "TROL",
        fpsLabel: "⚡ Kare Hızı (FPS Motoru)",
        fpsText: "120 FPS ULTRA AKICI",
        btnOpenCustomize: "🎨 KARAKTERİ KİŞİSELLEŞTİR",
        btnHudCustomize: "🎨 Kişiselleştir",
        btnOpenShop: "🛒 GÜÇLENDİRME MAĞAZASI",
        btnPlayLevel: "BÖLÜME BAŞLA ▶",
        btnCustomizeMain: "🎨 KARAKTERİ KİŞİSELLEŞTİR (❖)",
        btnUnlockAll: "🔓 40 Bölümün Tümünü + 50❖ Zümrüt Aç (Test)",
        controlsHint: "<strong>Kontroller:</strong> A/D veya Ok Tuşları (Koş) • W/Boşluk (Çift Zıplama & Duvar Zıplaması) • X/F/Shift (Ateş Topu / Atılma)",
        previewFeatures: "<span>❖ Antik Zümrüt Topla -> Karakterini Kişiselleştir!</span><span>🚩 Checkpoint Sistemi</span><span>⚙ Testereler & Sarkıtlar</span><span>👑 Ritimli Boss Savaşları</span>",
        custTitle: "🎨 KARAKTER KİŞİSELLEŞTİRME STÜDYOSU",
        custSub: "Bölümlerde topladığın <strong>Antik Zümrütleri (❖)</strong> kullanarak şövalyeni dilediğin gibi tasarla!",
        custPreview: "CANLI KARAKTER ÖNİZLEME",
        btnCloseCustomize: "KAYDET VE HARİTAYA DÖN ✓",
        shopTitle: "🛒 GÜÇLENDİRME CEPHANELİĞİ (KRİSTAL MAĞAZASI)",
        shopSub: "Bölümlerde topladığın mavi kristallerle (◆) kalıcı zırh, kalkan ve ateş topu güçlendirmeleri aç!",
        btnCloseShop: "HARİTAYA DÖN ✓",
        settingsTitle: "⚙️ OYUN AYARLARI",
        settingsSub: "Ses efektlerini, müziği ve oyun sıfırlama seçeneklerini buradan yönetebilirsin.",
        sfxLabel: "🔊 Ses Efektleri (SFX)",
        musicLabel: "🎵 Arka Plan Müziği",
        onText: "AÇIK",
        offText: "KAPALI",
        btnRestartLevel: "🔄 Aktif Bölümü Sıfırla (Baştan Başla)",
        btnResetAll: "⚠️ Tüm Oyun İlerlemesini Sıfırla (Reset)",
        btnCloseSettings: "AYARLARI KAYDET VE DÖN ✓",
        langModalTitle: "👅 DİL SEÇİMİ / LANGUAGE",
        langModalSub: "Oyun dilini aşağıdan seçebilirsin (9 Dil):",
        btnCloseLang: "DİLİ KAYDET VE ÇIK ✓",
        profileNameLabel: "✏️ KARAKTER İSMİ (İSTEDİĞİN GİBİ YAZ)",
        profileAttrTitle: "⚔️ KARAKTER ÖZELLİKLERİ VE DONANIM",
        profilePickerTitle: "🖼️ PROFİL FOTOĞRAFI SEÇ (30 AYRI PROFİL RESMİ)",
        btnCloseProfile: "PROFİLİ KAYDET VE ÇIK ✕",
        trollModalPill: "🤬 ÖZEL SİNİR KRİZİ MODU • 15 BÖLÜM",
        trollModalTitle: "😡 TROL MODU (15 TUZAKLI BÖLÜM)",
        trollModalSub: "Dikkat! Her nesne değil ama <strong>belirli olanlar</strong> tuzaklıdır: Belirli zeminler bir anda çöker (<strong>-3 ♥</strong>), belirli <strong>[?]</strong> kutularından <strong>Uranyum Bombası (☢️ -3 ♥)</strong> yağar, belirli <strong>Antik Zümrütler (❖)</strong> ise seni <strong>en başa ışınlar!</strong>",
        btnPlayTroll: "😡 TROL BÖLÜMÜNE BAŞLA ▶",
        btnUnlockAllTroll: "🔓 15 Trol Bölümünün Tümünü Aç",
        btnCloseTroll: "NORMAL HARİTAYA DÖN ✕",
        pauseTitle: "OYUN DURAKLATILDI",
        pauseSub: "Karanlık mağaralar seni bekliyor...",
        gameOverTitle: "KARANLIĞA YENİLDİN!",
        gameOverSub: "Mağazadan güçlendirme alabilir veya tekrar deneyebilirsin!",
        victoryTitle: "✨ BÖLÜM TAMAMLANDI!",
        finalVictoryTitle: "👑 NEON UÇURUMU TAMAMEN FETHEDİLDİ!",
        btnResume: "DEVAM ET",
        btnNextLevel: "SONRAKİ BÖLÜM ▶",
        btnRestart: "BÖLÜMÜ BAŞTAN BAŞLAT ↻",
        btnToMap: "BÖLÜMDEN ÇIK VE HARİTAYA DÖN 🗺",
        shadowMode: "Gölge Modu",
        checkpointActive: "🚩 Kayıt Noktası Aktif",
        lowGravityText: "🌌 DÜŞÜK YERÇEKİMİ ALANI",
        hitNowText: "🎯 ŞİMDİ VUR!",
        bossShieldText: "🛡 KALKAN AKTİF",
        bossVulnText: "🎯 KALKAN KAPANDI! ŞİMDİ VUR!",
        signHint: "A/D: Koş • W/Boşluk: Çift Zıpla & Duvardan Tırman • X/F: Ateş Topu • ❖ Zümrütleri Topla!",
        trollSignHint: "Dikkat: Belirli Zeminler Çöker (-3♥), Belirli [?] Uranyum Yağdırır (-3♥), Belirli ❖ Başa Işınlar!",
        levelWord: "Bölüm",
        worldWord: "DÜNYA",
        worldRegions: ["BÖLGE 1: KRİSTAL MAĞARALAR", "BÖLGE 2: SİBER MAGMA", "BÖLGE 3: KUANTUM BOŞLUK", "BÖLGE 4: KOZMİK HİÇLİK"],
        levelDescTemplate: "Zümrütleri (❖) topla, tuzakları aş ve çıkış portalına (🌀) ulaş!",
        bossDescTemplate: "Boss Savaşı! Şok dalgalarından kaç, kalkanı kapandığında kafasına zıpla veya ateş topu at!",
        trollDescTemplate: "Trol Tuzağı! Belirli zeminler çöker (-3♥), belirli [?] kutuları Uranyum yağdırır (-3♥) ve belirli ❖ en başa ışınlar!",
        levelShortNames: [
            "Kristal Mağara", "Sarkıt Geçidi", "Kristal Dev ☠", "Testere Koridoru", "Solucan Deliği",
            "Zindan Celladı ☠", "Sıfır Yerçekimi", "Çöken Uçurum", "Karanlık Kule", "İmparator ☠",
            "Lav Vadisi", "Kızıl Köprü", "Ateş Bacası", "Plazma Hattı", "Magma Titanı ☠",
            "Obsidyen Mağara", "Manyetik Alan", "Kızıl Labirent", "Cehennem Geçidi", "Kızıl Lord ☠",
            "Siber Sektör", "Zaman Kırığı", "Lazer Kulesi", "Nöbetçi Üssü", "Hiper-Meka ☠",
            "Yıldız Tozu", "Karanlık Maden", "Siber Fırtına", "Kuantum Çekirdek", "Hiperiyon ☠",
            "Hiçlik Kapısı", "Kabus Köprüsü", "Gölge Kalesi", "Kaos Portalları", "Kaos Ejderi ☠",
            "Sonsuzluk Yolu", "Elit Muhafızlar", "Kıyamet Kulesi", "Taht Koridoru", "Tanrı-İmparator 👑"
        ],
        trollShortNames: [
            "Sahte Başlangıç", "Uranyum Sürprizi", "Zümrüt Serabı", "Çöken Köprü", "Trol Dev ☠",
            "Radyoaktif Mağara", "Başa Sar!", "Görünmez Çukur", "Üçlü İhanet", "Nükleer Cellat ☠",
            "Sinir Krizi", "Atom Yağmuru", "Sabır Testi", "Son Şaka", "Trol İmparator 👑"
        ],
        tabs: ["👑 Miğfer (12)", "⚔️ Silah & Kanat (12)", "🛡 Zırh (12)", "👁 Göz & Vizör (10)", "✨ Aura & Efekt (10)", "🧣 Pelerin (10)", "⚡ Güçlendirme (8)"]
    },
    ru: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 УРОВНЕЙ • ПОЛНЫЙ СЕЗОН",
        profileTag: "ПРОФИЛЬ ИГРОКА",
        hudProfileTag: "ПРОФИЛЬ",
        emeraldLabel: "Древний Изумруд:",
        hudEmeraldLabel: "Изумруд:",
        coinLabel: "Кристалл:",
        heartsText: "♥ ♥ ♥ 3 ЖИЗНИ",
        scoreLabel: "Счёт:",
        trollBadge: "ТРОЛЛЬ",
        fpsLabel: "⚡ Частота Кадров (FPS)",
        fpsText: "120 FPS УЛЬТРА",
        btnOpenCustomize: "🎨 КАСТОМИЗАЦИЯ ГЕРОЯ",
        btnHudCustomize: "🎨 Герой",
        btnOpenShop: "🛒 МАГАЗИН УЛУЧШЕНИЙ",
        btnPlayLevel: "НАЧАТЬ УРОВЕНЬ ▶",
        btnCustomizeMain: "🎨 КАСТОМИЗАЦИЯ ГЕРОЯ (❖)",
        btnUnlockAll: "🔓 Открыть Все 40 Уровней + 50❖ (Тест)",
        controlsHint: "<strong>Управление:</strong> A/D или Стрелки (Бег) • W/Пробел (Двойной прыжок и от стен) • X/F/Shift (Огненный шар / Рывок)",
        previewFeatures: "<span>❖ Собирай Изумруды -> Прокачай Героя!</span><span>🚩 Чекпоинты</span><span>⚙ Пилы и Сталактиты</span><span>👑 Битвы с Боссами</span>",
        custTitle: "🎨 СТУДИЯ КАСТОМИЗАЦИИ ПЕРСОНАЖА",
        custSub: "Используй <strong>Древние Изумруды (❖)</strong>, чтобы создать уникального рыцаря!",
        custPreview: "ПРЕДПРОСМОТР ПЕРСОНАЖА",
        btnCloseCustomize: "СОХРАНИТЬ И НА КАРТУ ✓",
        shopTitle: "🛒 ОРУЖЕЙНАЯ УЛУЧШЕНИЙ (МАГАЗИН КРИСТАЛЛОВ)",
        shopSub: "Открывай броню, щиты и огненные шары за синие кристаллы (◆)!",
        btnCloseShop: "ВЕРНУТЬСЯ НА КАРТУ ✓",
        settingsTitle: "⚙️ НАСТРОЙКИ ИГРЫ",
        settingsSub: "Управляй звуковыми эффектами, музыкой и сбросом прогресса.",
        sfxLabel: "🔊 Звуковые эффекты (SFX)",
        musicLabel: "🎵 Фоновая музыка",
        onText: "ВКЛ",
        offText: "ВЫКЛ",
        btnRestartLevel: "🔄 Перезапустить уровень",
        btnResetAll: "⚠️ Сбросить весь прогресс (Reset)",
        btnCloseSettings: "СОХРАНИТЬ И ВЫЙТИ ✓",
        langModalTitle: "👅 ВЫБОР ЯЗЫКА / LANGUAGE",
        langModalSub: "Выберите язык игры ниже (9 языков):",
        btnCloseLang: "СОХРАНИТЬ ЯЗЫК ✓",
        profileNameLabel: "✏️ ИМЯ ПЕРСОНАЖА (ВВЕДИТЕ ЛЮБОЕ)",
        profileAttrTitle: "⚔️ ХАРАКТЕРИСТИКИ И СНАРЯЖЕНИЕ",
        profilePickerTitle: "🖼️ ВЫБЕРИТЕ АВАТАР ПРОФИЛЯ (30 КАРТИНОК)",
        btnCloseProfile: "СОХРАНИТЬ И ВЫЙТИ ✕",
        trollModalPill: "🤬 РЕЖИМ ЯРОСТИ • 15 УРОВНЕЙ",
        trollModalTitle: "😡 ТРОЛЛЬ-РЕЖИМ (15 УРОВНЕЙ С ЛОВУШКАМИ)",
        trollModalSub: "Осторожно! Определенные полы обрушиваются (<strong>-3 ♥</strong>), из некоторых блоков <strong>[?]</strong> падают <strong>Урановые Бомбы (☢️ -3 ♥)</strong>, а ложные <strong>Изумруды (❖)</strong> телепортируют в самое начало!",
        btnPlayTroll: "😡 НАЧАТЬ ТРОЛЛЬ-УРОВЕНЬ ▶",
        btnUnlockAllTroll: "🔓 Открыть Все 15 Тролль-Уровней",
        btnCloseTroll: "ВЕРНУТЬСЯ НА КАРТУ ✕",
        pauseTitle: "ИГРА НА ПАУЗЕ",
        pauseSub: "Темные пещеры ждут тебя...",
        gameOverTitle: "ТЬМА ПОГЛОТИЛА ТЕБЯ!",
        gameOverSub: "Купи улучшения в магазине или попробуй снова!",
        victoryTitle: "✨ УРОВЕНЬ ПРОЙДЕН!",
        finalVictoryTitle: "👑 НЕОНОВАЯ БЕЗДНА ПОКОРЕНА!",
        btnResume: "ПРОДОЛЖИТЬ",
        btnNextLevel: "СЛЕДУЮЩИЙ УРОВЕНЬ ▶",
        btnRestart: "НАЧАТЬ ЗАНОВО ↻",
        btnToMap: "ВЫЙТИ ИЗ УРОВНЯ НА КАРТУ 🗺",
        shadowMode: "Режим Тени",
        checkpointActive: "🚩 Чекпоинт Активен",
        lowGravityText: "🌌 ЗОНА НИЗКОЙ ГРАВИТАЦИИ",
        hitNowText: "🎯 БЕЙ СЕЙЧАС!",
        bossShieldText: "🛡 ЩИТ АКТИВЕН",
        bossVulnText: "🎯 ЩИТ УПАЛ! АТАКУЙ!",
        signHint: "A/D: Бег • W/Пробел: Двойной прыжок и от стен • X/F: Огненный шар / Рывок • ❖ Собирай Изумруды!",
        trollSignHint: "Внимание: Ложные полы падают (-3♥), Ложные [?] сбрасывают Уран (-3♥), Ложные ❖ возвращают на старт!",
        levelWord: "Уровень",
        worldWord: "МИР",
        worldRegions: ["ЗОНА 1: КРИСТАЛЬНЫЕ ПЕЩЕРЫ", "ЗОНА 2: КИБЕР-МАГМА", "ЗОНА 3: КВАНТОВАЯ ПУСТОТА", "ЗОНА 4: КОСМИЧЕСКАЯ БЕЗДНА"],
        levelDescTemplate: "Собирай Древние Изумруды (❖), обходи ловушки и доберись до портала (🌀)!",
        bossDescTemplate: "Битва с Боссом! Уклоняйся от ударных волн и атакуй босса, когда его щит отключится!",
        trollDescTemplate: "Тролль-ловушки! Некоторые полы падают (-3♥), блоки [?] сбрасывают уран (-3♥), а ложные ❖ телепортируют в начало!",
        levelShortNames: [
            "Кристалл-Пещера", "Сталактиты", "Кристалл-Титан ☠", "Коридор Пил", "Червоточина",
            "Палач Темницы ☠", "Невесомость", "Обвал Бездны", "Темная Башня", "Император ☠",
            "Долина Лавы", "Алый Мост", "Огненная Шахта", "Плазма-Линия", "Титан Магмы ☠",
            "Обсидиан", "Магнит-Поле", "Алый Лабиринт", "Адский Проход", "Алый Лорд ☠",
            "Кибер-Сектор", "Разлом Времени", "Лазер-Башня", "База Стражей", "Гипер-Меха ☠",
            "Звездная Пыль", "Темная Шахта", "Кибер-Шторм", "Квант-Ядро", "Гиперион ☠",
            "Врата Пустоты", "Мост Кошмаров", "Цитадель Тени", "Порталы Хаоса", "Дракон Хаоса ☠",
            "Путь Вечности", "Элитный Полк", "Башня Рока", "Тронный Зал", "Бог-Император 👑"
        ],
        trollShortNames: [
            "Ложный Старт", "Урановый Сюрприз", "Мираж Изумруда", "Хрупкий Мост", "Тролль-Титан ☠",
            "Радио-Пещера", "Назад на Старт!", "Невидимая Яма", "Тройной Обман", "Ядерный Палач ☠",
            "Нервный Срыв", "Атомный Дождь", "Тест Терпения", "Последняя Шутка", "Тролль-Император 👑"
        ],
        tabs: ["👑 Шлем (12)", "⚔️ Оружие и Крылья (12)", "🛡 Броня (12)", "👁 Визор (10)", "✨ Аура (10)", "🧣 Плащ (10)", "⚡ Улучшения (8)"]
    },
    en: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 LEVELS FULL CAMPAIGN",
        profileTag: "PLAYER PROFILE",
        hudProfileTag: "PROFILE",
        emeraldLabel: "Ancient Emerald:",
        hudEmeraldLabel: "Emerald:",
        coinLabel: "Crystal:",
        heartsText: "♥ ♥ ♥ 3 LIVES",
        scoreLabel: "Score:",
        trollBadge: "TROLL",
        fpsLabel: "⚡ Frame Rate (FPS Engine)",
        fpsText: "120 FPS ULTRA SMOOTH",
        btnOpenCustomize: "🎨 CUSTOMIZE HERO",
        btnHudCustomize: "🎨 Customize",
        btnOpenShop: "🛒 UPGRADE SHOP",
        btnPlayLevel: "START LEVEL ▶",
        btnCustomizeMain: "🎨 CUSTOMIZE HERO (❖)",
        btnUnlockAll: "🔓 Unlock All 40 Levels + 50❖ (Test)",
        controlsHint: "<strong>Controls:</strong> A/D or Arrows (Run) • W/Space (Double Jump & Wall Jump) • X/F/Shift (Fireball / Dash)",
        previewFeatures: "<span>❖ Collect Ancient Emeralds -> Customize Hero!</span><span>🚩 Checkpoint System</span><span>⚙ Saws & Stalactites</span><span>👑 Boss Battles</span>",
        custTitle: "🎨 CHARACTER CUSTOMIZATION STUDIO",
        custSub: "Use <strong>Ancient Emeralds (❖)</strong> collected in levels to design your cyber knight!",
        custPreview: "LIVE CHARACTER PREVIEW",
        btnCloseCustomize: "SAVE & RETURN TO MAP ✓",
        shopTitle: "🛒 UPGRADE ARMORY (CRYSTAL SHOP)",
        shopSub: "Spend blue crystals (◆) to unlock permanent armor, shields, and plasma fire!",
        btnCloseShop: "RETURN TO MAP ✓",
        settingsTitle: "⚙️ GAME SETTINGS",
        settingsSub: "Manage sound effects, background music, and game reset options here.",
        sfxLabel: "🔊 Sound Effects (SFX)",
        musicLabel: "🎵 Background Music",
        onText: "ON",
        offText: "OFF",
        btnRestartLevel: "🔄 Restart Active Level",
        btnResetAll: "⚠️ Reset All Game Progress",
        btnCloseSettings: "SAVE SETTINGS & RETURN ✓",
        langModalTitle: "👅 LANGUAGE SELECTION",
        langModalSub: "Select your game language below (9 Languages):",
        btnCloseLang: "SAVE LANGUAGE & CLOSE ✓",
        profileNameLabel: "✏️ CHARACTER NAME (TYPE ANYTHING)",
        profileAttrTitle: "⚔️ CHARACTER ATTRIBUTES & GEAR",
        profilePickerTitle: "🖼️ CHOOSE PROFILE PICTURE (30 AVATARS)",
        btnCloseProfile: "SAVE PROFILE & EXIT ✕",
        trollModalPill: "🤬 SPECIAL RAGE MODE • 15 LEVELS",
        trollModalTitle: "😡 TROLL MODE (15 BOOBY-TRAPPED LEVELS)",
        trollModalSub: "Warning! Specific floors suddenly collapse (<strong>-3 ♥</strong>), specific <strong>[?]</strong> boxes rain <strong>Uranium Bombs (☢️ -3 ♥)</strong>, and specific fake <strong>Ancient Emeralds (❖)</strong> teleport you back to the start!",
        btnPlayTroll: "😡 START TROLL LEVEL ▶",
        btnUnlockAllTroll: "🔓 Unlock All 15 Troll Levels",
        btnCloseTroll: "RETURN TO NORMAL MAP ✕",
        pauseTitle: "GAME PAUSED",
        pauseSub: "The dark caverns await...",
        gameOverTitle: "DEFEATED BY DARKNESS!",
        gameOverSub: "Grab upgrades in the shop or try the level again!",
        victoryTitle: "✨ LEVEL COMPLETED!",
        finalVictoryTitle: "👑 NEON ABYSS CONQUERED!",
        btnResume: "RESUME GAME",
        btnNextLevel: "NEXT LEVEL ▶",
        btnRestart: "RESTART LEVEL ↻",
        btnToMap: "EXIT LEVEL & RETURN TO MAP 🗺",
        shadowMode: "Shadow Mode",
        checkpointActive: "🚩 Checkpoint Active",
        lowGravityText: "🌌 LOW GRAVITY ZONE",
        hitNowText: "🎯 HIT NOW!",
        bossShieldText: "🛡 SHIELD ACTIVE",
        bossVulnText: "🎯 SHIELD DOWN! STRIKE NOW!",
        signHint: "A/D: Run • W/Space: Double Jump & Wall Jump • X/F: Fireball / Dash • ❖ Collect Emeralds!",
        trollSignHint: "Warning: Specific Floors Collapse (-3♥), Specific [?] Drop Uranium (-3♥), Specific ❖ Teleport to Start!",
        levelWord: "Level",
        worldWord: "WORLD",
        worldRegions: ["ZONE 1: CRYSTAL CAVERNS", "ZONE 2: CYBER MAGMA", "ZONE 3: QUANTUM VOID", "ZONE 4: COSMIC ABYSS"],
        levelDescTemplate: "Collect Ancient Emeralds (❖), dodge deadly traps, and reach the exit portal (🌀)!",
        bossDescTemplate: "Boss Battle! Dodge shockwaves and strike the Boss when its energy shield drops!",
        trollDescTemplate: "Troll Alert! Specific floors collapse (-3♥), specific [?] boxes rain Uranium Bombs (-3♥), and fake ❖ teleport you to start!",
        levelShortNames: [
            "Crystal Cavern", "Stalactite Pass", "Crystal Giant ☠", "Saw Corridor", "Wormhole Maze",
            "Executioner ☠", "Zero Gravity", "Crumbling Abyss", "Dark Tower", "Dark Emperor ☠",
            "Lava Valley", "Crimson Bridge", "Fire Chimney", "Plasma Line", "Magma Titan ☠",
            "Obsidian Cave", "Magnetic Field", "Crimson Maze", "Inferno Pass", "Crimson Lord ☠",
            "Cyber Sector", "Time Rift", "Laser Tower", "Sentinel Base", "Hyper-Mecha ☠",
            "Stardust Abyss", "Dark Mine", "Cyber Storm", "Quantum Core", "Hyperion ☠",
            "Void Gate", "Nightmare Bridge", "Shadow Keep", "Chaos Portals", "Chaos Dragon ☠",
            "Eternity Path", "Elite Guard", "Doom Tower", "Throne Hall", "God-Emperor 👑"
        ],
        trollShortNames: [
            "Fake Start", "Uranium Surprise", "Emerald Mirage", "Trap Bridge", "Troll Giant ☠",
            "Radioactive Cave", "Back to Start!", "Hidden Pit", "Triple Betrayal", "Nuclear Boss ☠",
            "Rage Quit", "Atom Rain", "Patience Test", "Final Prank", "Troll Emperor 👑"
        ],
        tabs: ["👑 Helmet (12)", "⚔️ Weapon & Wings (12)", "🛡 Armor (12)", "👁 Visor (10)", "✨ Aura (10)", "🧣 Cape (10)", "⚡ Upgrades (8)"]
    },
    it: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 LIVELLI STAGIONE COMPLETA",
        profileTag: "PROFILO GIOCATORE",
        hudProfileTag: "PROFILO",
        emeraldLabel: "Smeraldo Antico:",
        hudEmeraldLabel: "Smeraldo:",
        coinLabel: "Cristallo:",
        heartsText: "♥ ♥ ♥ 3 VITE",
        scoreLabel: "Punteggio:",
        trollBadge: "TROLL",
        fpsLabel: "⚡ Frequenza Fotogrammi (FPS)",
        fpsText: "120 FPS ULTRA FLUIDO",
        btnOpenCustomize: "🎨 PERSONALIZZA EROE",
        btnHudCustomize: "🎨 Personalizza",
        btnOpenShop: "🛒 NEGOZIO POTENZIAMENTI",
        btnPlayLevel: "INIZIA LIVELLO ▶",
        btnCustomizeMain: "🎨 PERSONALIZZA EROE (❖)",
        btnUnlockAll: "🔓 Sblocca Tutti i Livelli + 50❖ (Test)",
        controlsHint: "<strong>Comandi:</strong> A/D o Frecce (Corri) • W/Spazio (Doppio Salto e Salto a Parete) • X/F/Shift (Palla di Fuoco / Scatto)",
        previewFeatures: "<span>❖ Raccogli Smeraldi -> Personalizza Eroe!</span><span>🚩 Sistema Checkpoint</span><span>⚙ Seghe e Stalattiti</span><span>👑 Battaglie Boss</span>",
        custTitle: "🎨 STUDIO DI PERSONALIZZAZIONE",
        custSub: "Usa gli <strong>Smeraldi Antichi (❖)</strong> raccolti nei livelli per creare il tuo cavaliere!",
        custPreview: "ANTEPRIMA PERSONAGGIO",
        btnCloseCustomize: "SALVA E TORNA ALLA MAPPA ✓",
        shopTitle: "🛒 ARMERIA POTENZIAMENTI (CRISTALLI)",
        shopSub: "Usa i cristalli blu (◆) per sbloccare armatura, scudi e palle di fuoco permanenti!",
        btnCloseShop: "TORNA ALLA MAPPA ✓",
        settingsTitle: "⚙️ IMPOSTAZIONI DI GIOCO",
        settingsSub: "Gestisci effetti sonori, musica di sottofondo e opzioni di ripristino.",
        sfxLabel: "🔊 Effetti Sonori (SFX)",
        musicLabel: "🎵 Musica di Sottofondo",
        onText: "ATTIVO",
        offText: "SPENTO",
        btnRestartLevel: "🔄 Riavvia Livello Attuale",
        btnResetAll: "⚠️ Ripristina Tutto il Progresso (Reset)",
        btnCloseSettings: "SALVA E TORNA ✓",
        langModalTitle: "👅 SELEZIONE LINGUA",
        langModalSub: "Seleziona la lingua del gioco (9 Lingue):",
        btnCloseLang: "SALVA LINGUA E CHIUDI ✓",
        profileNameLabel: "✏️ NOME DEL PERSONAGGIO (SCRIVI IL TUO NOME)",
        profileAttrTitle: "⚔️ CARATTERISTICHE ED EQUIPAGGIAMENTO",
        profilePickerTitle: "🖼️ SCEGLI FOTO PROFILO (30 IMMAGINI)",
        btnCloseProfile: "SALVA PROFILO ED ESCI ✕",
        trollModalPill: "🤬 MODALITÀ RABBIA SPECIALE • 15 LIVELLI",
        trollModalTitle: "😡 MODALITÀ TROLL (15 LIVELLI TRAPPOLA)",
        trollModalSub: "Attenzione! Alcuni pavimenti crollano (<strong>-3 ♥</strong>), alcuni blocchi <strong>[?]</strong> fanno piovere <strong>Bombe all'Uranio (☢️ -3 ♥)</strong> e falsi <strong>Smeraldi (❖)</strong> ti teletrasportano all'inizio!",
        btnPlayTroll: "😡 INIZIA LIVELLO TROLL ▶",
        btnUnlockAllTroll: "🔓 Sblocca Tutti i 15 Livelli Troll",
        btnCloseTroll: "TORNA ALLA MAPPA NORMALE ✕",
        pauseTitle: "GIOCO IN PAUSA",
        pauseSub: "Le grotte oscure ti aspettano...",
        gameOverTitle: "SCONFITTO DALL'OSCURITÀ!",
        gameOverSub: "Acquista potenziamenti nel negozio o riprova!",
        victoryTitle: "✨ LIVELLO COMPLETATO!",
        finalVictoryTitle: "👑 ABISSO NEON CONQUISTATO!",
        btnResume: "RIPRENDI",
        btnNextLevel: "LIVELLO SUCCESSIVO ▶",
        btnRestart: "RIAVVIA LIVELLO ↻",
        btnToMap: "ESCI DAL LIVELLO E TORNA ALLA MAPPA 🗺",
        shadowMode: "Modalità Ombra",
        checkpointActive: "🚩 Checkpoint Attivo",
        lowGravityText: "🌌 ZONA A BASSA GRAVITÀ",
        hitNowText: "🎯 COLPISCI ORA!",
        bossShieldText: "🛡 SCUDO ATTIVO",
        bossVulnText: "🎯 SCUDO GIÙ! COLPISCI ORA!",
        signHint: "A/D: Corri • W/Spazio: Doppio Salto e Parete • X/F: Fuoco / Scatto • ❖ Raccogli Smeraldi!",
        trollSignHint: "Attenzione: Pavimenti Trappola (-3♥), Blocchi [?] Uranio (-3♥), Falsi ❖ Teletrasporto all'Inizio!",
        levelWord: "Livello",
        worldWord: "MONDO",
        worldRegions: ["ZONA 1: GROTTE DI CRISTALLO", "ZONA 2: CYBER MAGMA", "ZONA 3: VUOTO QUANTICO", "ZONA 4: ABISSO COSMICO"],
        levelDescTemplate: "Raccogli gli Smeraldi Antichi (❖), supera le trappole e raggiungi il portale (🌀)!",
        bossDescTemplate: "Battaglia Boss! Schiva le onde d'urto e colpisci il Boss quando lo scudo si disattiva!",
        trollDescTemplate: "Allarme Troll! Alcuni pavimenti crollano (-3♥), alcuni blocchi [?] lanciano Uranio (-3♥) e falsi ❖ riportano all'inizio!",
        levelShortNames: [
            "Grotta Cristallo", "Passo Stalattiti", "Gigante Cristallo ☠", "Corridoio Seghe", "Wormhole",
            "Boia Oscuro ☠", "Gravità Zero", "Abisso Crollante", "Torre Oscura", "Imperatore ☠",
            "Valle di Lava", "Ponte Cremisi", "Camino di Fuoco", "Linea Plasma", "Titano Magma ☠",
            "Grotta Ossidiana", "Campo Magnetico", "Labirinto Cremisi", "Passo Inferno", "Signore Cremisi ☠",
            "Settore Cyber", "Frattura Tempo", "Torre Laser", "Base Sentinelle", "Hyper-Mecha ☠",
            "Polvere Stelle", "Miniera Oscura", "Tempesta Cyber", "Nucleo Quantico", "Hyperion ☠",
            "Porta del Vuoto", "Ponte Incubo", "Rocca d'Ombra", "Portali del Caos", "Drago del Caos ☠",
            "Via Eternità", "Guardia d'Élite", "Torre Destino", "Sala del Trono", "Dio-Imperatore 👑"
        ],
        trollShortNames: [
            "Falso Inizio", "Sorpresa Uranio", "Miraggio Smeraldo", "Ponte Trappola", "Gigante Troll ☠",
            "Grotta Radio", "Torna all'Inizio!", "Fossa Invisibile", "Triplo Inganno", "Boia Nucleare ☠",
            "Crisi di Nervi", "Pioggia Atomica", "Test Pazienza", "Ultimo Scherzo", "Imperatore Troll 👑"
        ],
        tabs: ["👑 Elmo (12)", "⚔️ Armi e Ali (12)", "🛡 Armatura (12)", "👁 Visiera (10)", "✨ Aura (10)", "🧣 Mantello (10)", "⚡ Potenziamenti (8)"]
    },
    es: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 NIVELES TEMPORADA COMPLETA",
        profileTag: "PERFIL DE JUGADOR",
        hudProfileTag: "PERFIL",
        emeraldLabel: "Esmeralda Antigua:",
        hudEmeraldLabel: "Esmeralda:",
        coinLabel: "Cristal:",
        heartsText: "♥ ♥ ♥ 3 VIDAS",
        scoreLabel: "Puntos:",
        trollBadge: "TROL",
        fpsLabel: "⚡ Cuadros por Segundo (FPS)",
        fpsText: "120 FPS ULTRA FLUIDO",
        btnOpenCustomize: "🎨 PERSONALIZAR HÉROE",
        btnHudCustomize: "🎨 Personalizar",
        btnOpenShop: "🛒 TIENDA DE MEJORAS",
        btnPlayLevel: "INICIAR NIVEL ▶",
        btnCustomizeMain: "🎨 PERSONALIZAR HÉROE (❖)",
        btnUnlockAll: "🔓 Desbloquear Todo + 50❖ (Prueba)",
        controlsHint: "<strong>Controles:</strong> A/D o Flechas (Correr) • W/Espacio (Doble Salto y Salto en Pared) • X/F/Shift (Bola de Fuego / Impulso)",
        previewFeatures: "<span>❖ ¡Recoge Esmeraldas -> Personaliza tu Héroe!</span><span>🚩 Puntos de Control</span><span>⚙ Sierras y Estalactitas</span><span>👑 Batallas de Jefes</span>",
        custTitle: "🎨 ESTUDIO DE PERSONALIZACIÓN",
        custSub: "¡Usa las <strong>Esmeraldas Antiguas (❖)</strong> para diseñar a tu caballero cibernético!",
        custPreview: "VISTA PREVIA EN VIVO",
        btnCloseCustomize: "GUARDAR Y VOLVER AL MAPA ✓",
        shopTitle: "🛒 ARMERÍA DE MEJORAS (TIENDA DE CRISTALES)",
        shopSub: "¡Gasta cristales azules (◆) para desbloquear armadura, escudos y fuego de plasma!",
        btnCloseShop: "VOLVER AL MAPA ✓",
        settingsTitle: "⚙️ AJUSTES DEL JUEGO",
        settingsSub: "Administra los efectos de sonido, la música y el reinicio del juego.",
        sfxLabel: "🔊 Efectos de Sonido (SFX)",
        musicLabel: "🎵 Música de Fondo",
        onText: "ACTIVO",
        offText: "APAGADO",
        btnRestartLevel: "🔄 Reiniciar Nivel Actual",
        btnResetAll: "⚠️ Reiniciar Todo el Progreso (Reset)",
        btnCloseSettings: "GUARDAR Y VOLVER ✓",
        langModalTitle: "👅 SELECCIÓN DE IDIOMA",
        langModalSub: "Selecciona el idioma del juego (9 Idiomas):",
        btnCloseLang: "GUARDAR IDIOMA Y SALIR ✓",
        profileNameLabel: "✏️ NOMBRE DEL PERSONAJE (ESCRIBE COMO QUIERAS)",
        profileAttrTitle: "⚔️ CARACTERÍSTICAS Y EQUIPAMIENTO",
        profilePickerTitle: "🖼️ ELEGIR FOTO DE PERFIL (30 AVATARES)",
        btnCloseProfile: "GUARDAR PERFIL Y SALIR ✕",
        trollModalPill: "🤬 MODO FURIA ESPECIAL • 15 NIVELES",
        trollModalTitle: "😡 MODO TROL (15 NIVELES CON TRAMPAS)",
        trollModalSub: "¡Cuidado! Ciertos suelos se derrumban (<strong>-3 ♥</strong>), ciertos bloques <strong>[?]</strong> lanzan <strong>Bombas de Uranio (☢️ -3 ♥)</strong> y ciertas <strong>Esmeraldas (❖)</strong> falsas te teletransportan al inicio!",
        btnPlayTroll: "😡 INICIAR NIVEL TROL ▶",
        btnUnlockAllTroll: "🔓 Desbloquear los 15 Niveles Trol",
        btnCloseTroll: "VOLVER AL MAPA NORMAL ✕",
        pauseTitle: "JUEGO EN PAUSA",
        pauseSub: "Las cavernas oscuras te esperan...",
        gameOverTitle: "¡DERROTADO POR LA OSCURIDAD!",
        gameOverSub: "¡Compra mejoras en la tienda o inténtalo de nuevo!",
        victoryTitle: "✨ ¡NIVEL COMPLETADO!",
        finalVictoryTitle: "👑 ¡ABISMO NEÓN CONQUISTADO!",
        btnResume: "CONTINUAR",
        btnNextLevel: "SIGUIENTE NIVEL ▶",
        btnRestart: "REINICIAR NIVEL ↻",
        btnToMap: "SALIR DEL NIVEL Y VOLVER AL MAPA 🗺",
        shadowMode: "Modo Sombra",
        checkpointActive: "🚩 Punto de Control Activo",
        lowGravityText: "🌌 ZONA DE BAJA GRAVEDAD",
        hitNowText: "🎯 ¡GOLPEA AHORA!",
        bossShieldText: "🛡 ESCUDO ACTIVO",
        bossVulnText: "🎯 ¡ESCUDO CAÍDO! ¡ATACA!",
        signHint: "A/D: Correr • W/Espacio: Doble Salto y Pared • X/F: Fuego / Impulso • ❖ ¡Recoge Esmeraldas!",
        trollSignHint: "Aviso: ¡Ciertos Suelos Caen (-3♥), Ciertos [?] Lanzan Uranio (-3♥), Ciertos ❖ Teletransportan al Inicio!",
        levelWord: "Nivel",
        worldWord: "MUNDO",
        worldRegions: ["ZONA 1: CAVERNAS DE CRISTAL", "ZONA 2: CIBER MAGMA", "ZONA 3: VACÍO CUÁNTICO", "ZONA 4: ABISMO CÓSMICO"],
        levelDescTemplate: "¡Recoge Esmeraldas Antiguas (❖), supera las trampas y llega al portal de salida (🌀)!",
        bossDescTemplate: "¡Batalla de Jefe! ¡Esquiva las ondas de choque y golpea al Jefe cuando baje su escudo!",
        trollDescTemplate: "¡Trampa Trol! Ciertos suelos caen (-3♥), bloques [?] lanzan Uranio (-3♥) y ❖ falsas te envían al inicio!",
        levelShortNames: [
            "Cueva Cristal", "Paso Estalactita", "Gigante Cristal ☠", "Pasillo Sierras", "Agujero Gusano",
            "Verdugo Oscuro ☠", "Gravedad Cero", "Abismo Frágil", "Torre Oscura", "Emperador ☠",
            "Valle de Lava", "Puente Carmesí", "Chimenea Fuego", "Línea Plasma", "Titán Magma ☠",
            "Cueva Obsidiana", "Campo Magnético", "Laberinto Rojo", "Paso Infierno", "Señor Carmesí ☠",
            "Sector Ciber", "Grieta Temporal", "Torre Láser", "Base Centinela", "Hyper-Mecha ☠",
            "Polvo Estelar", "Mina Oscura", "Tormenta Ciber", "Núcleo Cuántico", "Hiperión ☠",
            "Puerta del Vacío", "Puente Pesadilla", "Fortaleza Sombra", "Portales Caos", "Dragón del Caos ☠",
            "Senda Eternidad", "Guardia Élite", "Torre del Juicio", "Salón del Trono", "Dios-Emperador 👑"
        ],
        trollShortNames: [
            "Falso Inicio", "Sorpresa Uranio", "Espejismo ❖", "Puente Trampa", "Gigante Trol ☠",
            "Cueva Radio", "¡Al Inicio!", "Foso Oculto", "Triple Traición", "Verdugo Nuclear ☠",
            "Crisis Nerviosa", "Lluvia Atómica", "Test Paciencia", "Broma Final", "Emperador Trol 👑"
        ],
        tabs: ["👑 Casco (12)", "⚔️ Armas y Alas (12)", "🛡 Armadura (12)", "👁 Visor (10)", "✨ Aura (10)", "🧣 Capa (10)", "⚡ Mejoras (8)"]
    },
    fr: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 NIVEAUX SAISON COMPLÈTE",
        profileTag: "PROFIL DU JOUEUR",
        hudProfileTag: "PROFIL",
        emeraldLabel: "Émeraude Ancienne:",
        hudEmeraldLabel: "Émeraude:",
        coinLabel: "Cristal:",
        heartsText: "♥ ♥ ♥ 3 VIES",
        scoreLabel: "Score:",
        trollBadge: "TROLL",
        fpsLabel: "⚡ Images par Seconde (FPS)",
        fpsText: "120 FPS ULTRA FLUIDE",
        btnOpenCustomize: "🎨 PERSONNALISER HÉROS",
        btnHudCustomize: "🎨 Personnaliser",
        btnOpenShop: "🛒 BOUTIQUE D'AMÉLIORATIONS",
        btnPlayLevel: "JOUER LE NIVEAU ▶",
        btnCustomizeMain: "🎨 PERSONNALISER HÉROS (❖)",
        btnUnlockAll: "🔓 Tout Débloquer + 50❖ (Test)",
        controlsHint: "<strong>Commandes :</strong> A/D ou Flèches (Courir) • W/Espace (Double Saut & Saut Mural) • X/F/Shift (Boule de Feu / Ruée)",
        previewFeatures: "<span>❖ Collecte des Émeraudes -> Personnalise !</span><span>🚩 Points de Contrôle</span><span>⚙ Scies & Stalactites</span><span>👑 Combats de Boss</span>",
        custTitle: "🎨 STUDIO DE PERSONNALISATION",
        custSub: "Utilise les <strong>Émeraudes Anciennes (❖)</strong> pour personnaliser ton chevalier !",
        custPreview: "APERÇU EN DIRECT",
        btnCloseCustomize: "SAUVEGARDER ET CARTE ✓",
        shopTitle: "🛒 ARMURERIE D'AMÉLIORATIONS (CRISTAUX)",
        shopSub: "Dépense tes cristaux bleus (◆) pour débloquer armures, boucliers et boules de feu !",
        btnCloseShop: "RETOUR À LA CARTE ✓",
        settingsTitle: "⚙️ PARAMÈTRES DU JEU",
        settingsSub: "Gère les effets sonores, la musique de fond et la réinitialisation.",
        sfxLabel: "🔊 Effets Sonores (SFX)",
        musicLabel: "🎵 Musique de Fond",
        onText: "ACTIVÉ",
        offText: "COUPÉ",
        btnRestartLevel: "🔄 Recommencer le Niveau Actuel",
        btnResetAll: "⚠️ Réinitialiser Toute la Progression (Reset)",
        btnCloseSettings: "SAUVEGARDER ET RETOUR ✓",
        langModalTitle: "👅 CHOIX DE LA LANGUE",
        langModalSub: "Choisissez la langue du jeu (9 Langues) :",
        btnCloseLang: "SAUVEGARDER LA LANGUE ✓",
        profileNameLabel: "✏️ NOM DU PERSONNAGE (ÉCRIS CE QUE TU VEUX)",
        profileAttrTitle: "⚔️ CARACTÉRISTIQUES ET ÉQUIPEMENT",
        profilePickerTitle: "🖼️ CHOISIR PHOTO DE PROFIL (30 AVATARS)",
        btnCloseProfile: "SAUVEGARDER ET QUITTER ✕",
        trollModalPill: "🤬 MODE RAGE SPÉCIAL • 15 NIVEAUX",
        trollModalTitle: "😡 MODE TROLL (15 NIVEAUX PIÉGÉS)",
        trollModalSub: "Attention ! Certains sols s'effondrent (<strong>-3 ♥</strong>), certains blocs <strong>[?]</strong> larguent des <strong>Bombes à l'Uranium (☢️ -3 ♥)</strong> et de fausses <strong>Émeraudes (❖)</strong> téléportent au départ !",
        btnPlayTroll: "😡 JOUER LE NIVEAU TROLL ▶",
        btnUnlockAllTroll: "🔓 Débloquer les 15 Niveaux Troll",
        btnCloseTroll: "RETOUR À LA CARTE NORMALE ✕",
        pauseTitle: "JEU EN PAUSE",
        pauseSub: "Les grottes sombres t'attendent...",
        gameOverTitle: "VAINCU PAR LES TÉNÈBRES !",
        gameOverSub: "Achète des améliorations ou réessaie le niveau !",
        victoryTitle: "✨ NIVEAU TERMINÉ !",
        finalVictoryTitle: "👑 ABÎME NÉON CONQUIS !",
        btnResume: "REPRENDRE",
        btnNextLevel: "NIVEAU SUIVANT ▶",
        btnRestart: "RECOMMENCER LE NIVEAU ↻",
        btnToMap: "QUITTER LE NIVEAU ET RETOUR À LA CARTE 🗺",
        shadowMode: "Mode Ombre",
        checkpointActive: "🚩 Point de Contrôle Actif",
        lowGravityText: "🌌 ZONE À FAIBLE GRAVITÉ",
        hitNowText: "🎯 FRAPPE MAINTENANT !",
        bossShieldText: "🛡 BOUCLIER ACTIF",
        bossVulnText: "🎯 BOUCLIER DÉSACTIVÉ ! ATTAQUE !",
        signHint: "A/D : Courir • W/Espace : Double Saut & Mur • X/F : Feu / Ruée • ❖ Collecte les Émeraudes !",
        trollSignHint: "Attention : Sols Piégés (-3♥), Blocs [?] Uranium (-3♥), Fausses ❖ Téléportent au Départ !",
        levelWord: "Niveau",
        worldWord: "MONDE",
        worldRegions: ["ZONE 1 : GROTTES DE CRISTAL", "ZONE 2 : CYBER MAGMA", "ZONE 3 : VIDE QUANTIQUE", "ZONE 4 : ABÎME COSMIQUE"],
        levelDescTemplate: "Collecte les Émeraudes Anciennes (❖), évite les pièges et atteins le portail (🌀) !",
        bossDescTemplate: "Combat de Boss ! Esquive les ondes de choc et frappe le Boss quand son bouclier tombe !",
        trollDescTemplate: "Alerte Troll ! Certains sols tombent (-3♥), des blocs [?] larguent de l'Uranium (-3♥) et de fausses ❖ renvoient au départ !",
        levelShortNames: [
            "Grotte Cristal", "Passe Stalactite", "Géant Cristal ☠", "Couloir Scies", "Trou de Ver",
            "Bourreau ☠", "Gravité Zéro", "Abîme Fragile", "Tour Sombre", "Empereur ☠",
            "Vallée de Lave", "Pont Pourpre", "Cheminée de Feu", "Ligne Plasma", "Titan Magma ☠",
            "Grotte Obsidienne", "Champ Magnétique", "Labyrinthe Rouge", "Passe Enfer", "Seigneur Pourpre ☠",
            "Secteur Cyber", "Faille Temporelle", "Tour Laser", "Base Sentinelle", "Hyper-Mecha ☠",
            "Poussière Étoile", "Mine Sombre", "Tempête Cyber", "Cœur Quantique", "Hypérion ☠",
            "Porte du Vide", "Pont Cauchemar", "Citadelle Ombre", "Portails Chaos", "Dragon du Chaos ☠",
            "Voie Éternité", "Garde d'Élite", "Tour du Destin", "Salle du Trône", "Dieu-Empereur 👑"
        ],
        trollShortNames: [
            "Faux Départ", "Surprise Uranium", "Mirage Émeraude", "Pont Piégé", "Géant Troll ☠",
            "Grotte Radio", "Retour Départ !", "Fosse Cachée", "Triple Trahison", "Bourreau Nucléaire ☠",
            "Crise de Nerfs", "Pluie Atomique", "Test Patience", "Farce Finale", "Empereur Troll 👑"
        ],
        tabs: ["👑 Casque (12)", "⚔️ Armes & Ailes (12)", "🛡 Armure (12)", "👁 Visière (10)", "✨ Aura (10)", "🧣 Cape (10)", "⚡ Améliorations (8)"]
    },
    ko: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40 스테이지 풀 시즌",
        profileTag: "플레이어 프로필",
        hudProfileTag: "프로필",
        emeraldLabel: "고대 에메랄드:",
        hudEmeraldLabel: "에메랄드:",
        coinLabel: "크리스탈:",
        heartsText: "♥ ♥ ♥ 생명 3개",
        scoreLabel: "점수:",
        trollBadge: "트롤",
        fpsLabel: "⚡ 프레임 속도 (FPS 엔진)",
        fpsText: "120 FPS 초고속",
        btnOpenCustomize: "🎨 캐릭터 커스터마이징",
        btnHudCustomize: "🎨 꾸미기",
        btnOpenShop: "🛒 강화 상점",
        btnPlayLevel: "스테이지 시작 ▶",
        btnCustomizeMain: "🎨 캐릭터 꾸미기 (❖)",
        btnUnlockAll: "🔓 40 스테이지 전체 해금 + 50❖ (테스트)",
        controlsHint: "<strong>조작법:</strong> A/D 또는 방향키 (달리기) • W/스페이스바 (2단 점프 & 벽 점프) • X/F/Shift (파이어볼 / 대시)",
        previewFeatures: "<span>❖ 고대 에메랄드 수집 -> 캐릭터 꾸미기!</span><span>🚩 체크포인트 시스템</span><span>⚙ 회전 톱날 & 종유석</span><span>👑 보스전</span>",
        custTitle: "🎨 캐릭터 커스터마이징 스튜디오",
        custSub: "스테이지에서 모은 <strong>고대 에메랄드 (❖)</strong>로 나만의 사이버 기사를 꾸며보세요!",
        custPreview: "실시간 캐릭터 미리보기",
        btnCloseCustomize: "저장 후 지도로 돌아가기 ✓",
        shopTitle: "🛒 강화 무기고 (크리스탈 상점)",
        shopSub: "푸른 크리스탈(◆)을 사용해 영구적인 장갑, 보호막, 파이어볼을 해금하세요!",
        btnCloseShop: "지도로 돌아가기 ✓",
        settingsTitle: "⚙️ 게임 설정",
        settingsSub: "효과음, 배경 음악 및 진행 초기화 옵션을 관리합니다.",
        sfxLabel: "🔊 효과음 (SFX)",
        musicLabel: "🎵 배경 음악",
        onText: "켜짐",
        offText: "꺼짐",
        btnRestartLevel: "🔄 현재 스테이지 다시 시작",
        btnResetAll: "⚠️ 모든 진행 데이터 초기화 (Reset)",
        btnCloseSettings: "설정 저장 및 돌아가기 ✓",
        langModalTitle: "👅 언어 선택 / LANGUAGE",
        langModalSub: "원하는 게임 언어를 선택하세요 (9개 국어):",
        btnCloseLang: "언어 저장 및 닫기 ✓",
        profileNameLabel: "✏️ 캐릭터 이름 (원하는 대로 입력)",
        profileAttrTitle: "⚔️ 캐릭터 능력치 및 장비",
        profilePickerTitle: "🖼️ 프로필 사진 선택 (30종 아바타)",
        btnCloseProfile: "프로필 저장 및 나가기 ✕",
        trollModalPill: "🤬 특별 분노 모드 • 15 스테이지",
        trollModalTitle: "😡 트롤 모드 (15개 함정 스테이지)",
        trollModalSub: "주의! 특정 바닥은 갑자기 무너지며(<strong>-3 ♥</strong>), 특정 <strong>[?]</strong> 박스는 <strong>우라늄 폭탄(☢️ -3 ♥)</strong>을 떨어뜨리고, 가짜 <strong>고대 에메랄드(❖)</strong>는 시작 지점으로 순간이동시킵니다!",
        btnPlayTroll: "😡 트롤 스테이지 시작 ▶",
        btnUnlockAllTroll: "🔓 15개 트롤 스테이지 모두 해금",
        btnCloseTroll: "일반 지도로 돌아가기 ✕",
        pauseTitle: "게임 일시정지",
        pauseSub: "어두운 동굴이 당신을 기다립니다...",
        gameOverTitle: "어둠에 패배했습니다!",
        gameOverSub: "상점에서 강화를 구매하거나 다시 도전하세요!",
        victoryTitle: "✨ 스테이지 클리어!",
        finalVictoryTitle: "👑 네온 심연 완전 정복!",
        btnResume: "계속하기",
        btnNextLevel: "다음 스테이지 ▶",
        btnRestart: "다시 시작 ↻",
        btnToMap: "스테이지 나가기 및 월드 맵으로 🗺",
        shadowMode: "섀도우 모드",
        checkpointActive: "🚩 체크포인트 활성화",
        lowGravityText: "🌌 저중력 구역",
        hitNowText: "🎯 지금 공격!",
        bossShieldText: "🛡 보호막 활성",
        bossVulnText: "🎯 보호막 해제! 지금 공격!",
        signHint: "A/D: 이동 • W/Space: 2단 점프 & 벽 점프 • X/F: 파이어볼 / 대시 • ❖ 에메랄드 수집!",
        trollSignHint: "주의: 함정 바닥 붕괴(-3♥), 함정 [?] 우라늄 투하(-3♥), 가짜 ❖ 처음으로 이동!",
        levelWord: "스테이지",
        worldWord: "월드",
        worldRegions: ["지역 1: 수정 동굴", "지역 2: 사이버 마그마", "지역 3: 양자 공허", "지역 4: 우주 심연"],
        levelDescTemplate: "고대 에메랄드(❖)를 모으고 함정을 피해 출구 포털(🌀)에 도달하세요!",
        bossDescTemplate: "보스전! 충격파를 피하고 보스의 보호막이 꺼졌을 때 머리를 밟거나 공격하세요!",
        trollDescTemplate: "트롤 함정 주의! 특정 바닥이 무너지고(-3♥), 특정 [?]에서 우라늄이 떨어지며(-3♥), 가짜 ❖는 처음으로 보냅니다!",
        levelShortNames: [
            "수정 동굴", "종유석 통로", "수정 거인 ☠", "톱날 복도", "웜홀 미로",
            "지하 처형자 ☠", "무중력 구역", "무너지는 심연", "어둠의 탑", "암흑 황제 ☠",
            "용암 계곡", "진홍 다리", "화염 굴뚝", "플라즈마 라인", "마그마 타이탄 ☠",
            "흑요석 동굴", "자기장 이상", "진홍 미로", "지옥 통로", "진홍 군주 ☠",
            "사이버 섹터", "시간의 균열", "레이저 타워", "파수꾼 기지", "하이퍼 메카 ☠",
            "별빛 심연", "어둠의 광산", "사이버 폭풍", "양자 코어", "하이페리온 ☠",
            "공허의 문", "악몽의 다리", "그림자 성채", "혼돈의 포털", "혼돈의 드래곤 ☠",
            "영원의 길", "정예 수비대", "파멸의 탑", "왕좌의 회랑", "신성 황제 👑"
        ],
        trollShortNames: [
            "가짜 시작", "우라늄 깜짝상자", "에메랄드 신기루", "무너지는 다리", "트롤 거인 ☠",
            "방사능 동굴", "처음으로!", "보이지 않는 구덩이", "삼중 배신", "핵 처형자 ☠",
            "분노 폭발", "우라늄 폭우", "인내심 테스트", "마지막 장난", "트롤 황제 👑"
        ],
        tabs: ["👑 투구 (12)", "⚔️ 무기 & 날개 (12)", "🛡 갑옷 (12)", "👁 바이저 (10)", "✨ 오라 (10)", "🧣 망토 (10)", "⚡ 강화 (8)"]
    },
    zh: {
        gameTitle: "Marinext 2100",
        seasonBadge: "40关卡完整赛季",
        profileTag: "玩家资料",
        hudProfileTag: "资料",
        emeraldLabel: "远古翡翠:",
        hudEmeraldLabel: "翡翠:",
        coinLabel: "水晶:",
        heartsText: "♥ ♥ ♥ 3条生命",
        scoreLabel: "分数:",
        trollBadge: "整蛊",
        fpsLabel: "⚡ 帧率引擎 (FPS)",
        fpsText: "120 FPS 极致流畅",
        btnOpenCustomize: "🎨 角色自定义",
        btnHudCustomize: "🎨 装扮",
        btnOpenShop: "🛒 强化商店",
        btnPlayLevel: "开始关卡 ▶",
        btnCustomizeMain: "🎨 角色自定义 (❖)",
        btnUnlockAll: "🔓 解锁全部40关 + 50❖ (测试)",
        controlsHint: "<strong>操作说明:</strong> A/D或方向键 (奔跑) • W/空格 (二段跳与蹬墙跳) • X/F/Shift (火球 / 冲刺)",
        previewFeatures: "<span>❖ 收集远古翡翠 -> 装扮角色！</span><span>🚩 存档点系统</span><span>⚙ 飞锯与钟乳石</span><span>👑 首领Boss战</span>",
        custTitle: "🎨 角色自定义工坊",
        custSub: "使用关卡中收集的<strong>远古翡翠 (❖)</strong>打造专属于你的赛博骑士！",
        custPreview: "实时角色预览",
        btnCloseCustomize: "保存并返回地图 ✓",
        shopTitle: "🛒 强化军械库 (水晶商店)",
        shopSub: "消耗蓝色水晶 (◆) 解锁永久装甲、护盾和等离子火球！",
        btnCloseShop: "返回地图 ✓",
        settingsTitle: "⚙️ 游戏设置",
        settingsSub: "在此管理音效、背景音乐及重置游戏进度。",
        sfxLabel: "🔊 音效 (SFX)",
        musicLabel: "🎵 背景音乐",
        onText: "开启",
        offText: "关闭",
        btnRestartLevel: "🔄 重新开始当前关卡",
        btnResetAll: "⚠️ 重置所有游戏进度 (Reset)",
        btnCloseSettings: "保存设置并返回 ✓",
        langModalTitle: "👅 语言选择 / LANGUAGE",
        langModalSub: "请在下方选择游戏语言 (9种语言):",
        btnCloseLang: "保存语言并退出 ✓",
        profileNameLabel: "✏️ 角色名称 (自由输入)",
        profileAttrTitle: "⚔️ 角色属性与装备",
        profilePickerTitle: "🖼️ 选择头像 (30款独立头像)",
        btnCloseProfile: "保存资料并退出 ✕",
        trollModalPill: "🤬 特殊暴怒模式 • 15关",
        trollModalTitle: "😡 整蛊模式 (15个陷阱关卡)",
        trollModalSub: "注意！特定地面会突然塌陷(<strong>-3 ♥</strong>)，特定<strong>[?]</strong>方块会降下<strong>铀炸弹(☢️ -3 ♥)</strong>，而假<strong>远古翡翠(❖)</strong>会将你传送回起点！",
        btnPlayTroll: "😡 开始整蛊关卡 ▶",
        btnUnlockAllTroll: "🔓 解锁全部15个整蛊关卡",
        btnCloseTroll: "返回普通地图 ✕",
        pauseTitle: "游戏已暂停",
        pauseSub: "黑暗洞穴正在等待着你...",
        gameOverTitle: "被黑暗吞噬！",
        gameOverSub: "前往商店购买强化或再次挑战！",
        victoryTitle: "✨ 关卡完成！",
        finalVictoryTitle: "👑 彻底征服霓虹深渊！",
        btnResume: "继续游戏",
        btnNextLevel: "下一关 ▶",
        btnRestart: "重新开始 ↻",
        btnToMap: "退出关卡并返回地图 🗺",
        shadowMode: "暗影模式",
        checkpointActive: "🚩 存档点已激活",
        lowGravityText: "🌌 低重力区域",
        hitNowText: "🎯 立即攻击！",
        bossShieldText: "🛡 护盾激活",
        bossVulnText: "🎯 护盾解除！立即攻击！",
        signHint: "A/D: 移动 • W/空格: 二段跳与蹬墙跳 • X/F: 火球 / 冲刺 • ❖ 收集远古翡翠！",
        trollSignHint: "警告：特定地面塌陷(-3♥)，特定[?]降下铀炸弹(-3♥)，假❖传送回起点！",
        levelWord: "关卡",
        worldWord: "世界",
        worldRegions: ["区域 1: 水晶洞穴", "区域 2: 赛博熔岩", "区域 3: 量子虚空", "区域 4: 宇宙深渊"],
        levelDescTemplate: "收集远古翡翠(❖)，躲避致命陷阱，抵达终点传送门(🌀)！",
        bossDescTemplate: "首领战！躲避冲击波，在首领护盾消失时踩击头部或发射火球！",
        trollDescTemplate: "整蛊警报！特定地面会塌陷(-3♥)，特定[?]会降下铀炸弹(-3♥)，假❖会将你送回起点！",
        levelShortNames: [
            "水晶洞穴", "钟乳石道", "水晶巨人 ☠", "飞锯走廊", "虫洞迷宫",
            "地牢行刑者 ☠", "零重力区", "崩塌深渊", "黑暗高塔", "暗黑大帝 ☠",
            "熔岩山谷", "深红大桥", "烈焰烟囱", "等离子线", "熔岩泰坦 ☠",
            "黑曜石洞", "磁场异常", "深红迷宫", "地狱通道", "深红领主 ☠",
            "赛博扇区", "时间裂隙", "激光高塔", "哨兵基地", "超能机甲 ☠",
            "星尘深渊", "暗黑矿坑", "赛博风暴", "量子核心", "海Hyperion ☠",
            "虚空之门", "噩梦大桥", "暗影堡垒", "混沌传送", "混沌巨龙 ☠",
            "永恒之路", "精英卫队", "末日高塔", "王座长廊", "神皇大帝 👑"
        ],
        trollShortNames: [
            "虚假起点", "铀弹惊喜", "翡翠幻影", "陷阱大桥", "整蛊巨人 ☠",
            "辐射洞穴", "回到起点！", "隐形深坑", "三重背叛", "核能行刑者 ☠",
            "暴怒崩溃", "原子暴雨", "耐心测试", "终极恶作剧", "整蛊大帝 👑"
        ],
        tabs: ["👑 头盔 (12)", "⚔️ 武器与翅膀 (12)", "🛡 装甲 (12)", "👁 面罩 (10)", "✨ 光环 (10)", "🧣 披风 (10)", "⚡ 强化 (8)"]
    },
    ja: {
        gameTitle: "Marinext 2100",
        seasonBadge: "全40ステージ完全版",
        profileTag: "プロフィール",
        hudProfileTag: "プロフィール",
        emeraldLabel: "古代エメラルド:",
        hudEmeraldLabel: "エメラルド:",
        coinLabel: "クリスタル:",
        heartsText: "♥ ♥ ♥ ライフ3",
        scoreLabel: "スコア:",
        trollBadge: "トロール",
        fpsLabel: "⚡ フレームレート (FPS)",
        fpsText: "120 FPS 超なめらか",
        btnOpenCustomize: "🎨 キャラカスタマイズ",
        btnHudCustomize: "🎨 カスタム",
        btnOpenShop: "🛒 アップグレード店",
        btnPlayLevel: "ステージ開始 ▶",
        btnCustomizeMain: "🎨 キャラカスタマイズ (❖)",
        btnUnlockAll: "🔓 全40ステージ解放 + 50❖ (テスト)",
        controlsHint: "<strong>操作方法:</strong> A/Dまたは矢印キー (走る) • W/スペース (二段ジャンプ＆壁ジャンプ) • X/F/Shift (ファイアボール / ダッシュ)",
        previewFeatures: "<span>❖ 古代エメラルド収集 -> キャラカスタム！</span><span>🚩 チェックポイント</span><span>⚙ 回転ノコギリ＆鍾乳石</span><span>👑 ボスバトル</span>",
        custTitle: "🎨 キャラクターカスタマイズスタジオ",
        custSub: "ステージで集めた<strong>古代エメラルド (❖)</strong>を使ってサイバー騎士を自由にデザインしよう！",
        custPreview: "リアルタイムプレビュー",
        btnCloseCustomize: "保存してマップへ戻る ✓",
        shopTitle: "🛒 強化アーモリー (クリスタルショップ)",
        shopSub: "ブルークリスタル(◆)を使って永久アーマー、シールド、プラズマファイアを解放しよう！",
        btnCloseShop: "マップへ戻る ✓",
        settingsTitle: "⚙️ ゲーム設定",
        settingsSub: "効果音、BGM、および進行状況のリセットを管理します。",
        sfxLabel: "🔊 効果音 (SFX)",
        musicLabel: "🎵 バックグラウンド音楽",
        onText: "オン",
        offText: "オフ",
        btnRestartLevel: "🔄 現在のステージをやり直す",
        btnResetAll: "⚠️ 全ゲーム進行状況をリセット",
        btnCloseSettings: "設定を保存して戻る ✓",
        langModalTitle: "👅 言語選択 / LANGUAGE",
        langModalSub: "ゲームの言語を選択してください (全9言語):",
        btnCloseLang: "言語を保存して閉じる ✓",
        profileNameLabel: "✏️ キャラクター名 (自由に入力)",
        profileAttrTitle: "⚔️ キャラクター能力＆装備",
        profilePickerTitle: "🖼️ プロフィール画像を選択 (全30種)",
        btnCloseProfile: "保存して閉じる ✕",
        trollModalPill: "🤬 特別激怒モード • 全15ステージ",
        trollModalTitle: "😡 トロールモード (15の罠ステージ)",
        trollModalSub: "注意！特定の床が突然崩れ(<strong>-3 ♥</strong>)、特定の<strong>[?]</strong>箱から<strong>ウラン爆弾(☢️ -3 ♥)</strong>が降り注ぎ、偽の<strong>古代エメラルド(❖)</strong>はスタート地点へ強制ワープさせます！",
        btnPlayTroll: "😡 トロールステージ開始 ▶",
        btnUnlockAllTroll: "🔓 全15トロールステージを解放",
        btnCloseTroll: "通常マップへ戻る ✕",
        pauseTitle: "一時停止中",
        pauseSub: "暗黒の洞窟があなたを待っている...",
        gameOverTitle: "闇に敗北した！",
        gameOverSub: "ショップで強化するか、もう一度挑戦しよう！",
        victoryTitle: "✨ ステージクリア！",
        finalVictoryTitle: "👑 ネオンの深淵を完全制覇！",
        btnResume: "再開する",
        btnNextLevel: "次のステージ ▶",
        btnRestart: "最初からやり直す ↻",
        btnToMap: "ステージを出てマップへ戻る 🗺",
        shadowMode: "シャドウモード",
        checkpointActive: "🚩 チェックポイント有効",
        lowGravityText: "🌌 低重力ゾーン",
        hitNowText: "🎯 今だ、攻撃！",
        bossShieldText: "🛡 シールド展開中",
        bossVulnText: "🎯 シールド解除！今すぐ攻撃！",
        signHint: "A/D: 走る • W/Space: 二段＆壁ジャンプ • X/F: ファイア / ダッシュ • ❖ エメラルドを集めよう！",
        trollSignHint: "警告：特定の床が崩落(-3♥)、特定の[?]からウラン爆弾(-3♥)、偽の❖で最初へワープ！",
        levelWord: "ステージ",
        worldWord: "ワールド",
        worldRegions: ["エリア1: クリスタル洞窟", "エリア2: サイバーマグマ", "エリア3: 量子ヴォイド", "エリア4: コズミック深淵"],
        levelDescTemplate: "古代エメラルド(❖)を集め、罠を突破してゴールポータル(🌀)を目指そう！",
        bossDescTemplate: "ボス戦！衝撃波をかわし、ボスのシールドが消えた瞬間に頭を踏むか攻撃しよう！",
        trollDescTemplate: "トロール罠注意！特定の床が崩れ(-3♥)、特定の[?]からウラン爆弾が降り(-3♥)、偽の❖はスタートへ戻します！",
        levelShortNames: [
            "クリスタル洞窟", "鍾乳石の道", "水晶の巨人 ☠", "回転ノコギリ回廊", "ワームホール迷宮",
            "地下の処刑人 ☠", "ゼロ重力", "崩落の深淵", "暗黒の塔", "暗黒皇帝 ☠",
            "溶岩の谷", "紅蓮の橋", "火炎の煙突", "プラズマライン", "マグマタイタン ☠",
            "黒曜石の洞窟", "磁場異常", "紅蓮の迷宮", "灼熱の回廊", "紅蓮の覇王 ☠",
            "サイバーセクター", "時空の裂け目", "レーザータワー", "センチネル基地", "ハイパーメカ ☠",
            "星屑の深淵", "暗黒鉱山", "サイバー嵐", "量子コア", "ハイペリオン ☠",
            "虚無の門", "悪夢の橋", "影の城塞", "カオスポータル", "カオスドラゴン ☠",
            "永遠の回廊", "エリート親衛隊", "終焉の塔", "玉座の間", "神聖皇帝 👑"
        ],
        trollShortNames: [
            "偽りのスタート", "ウランの罠", "エメラルド蜃気楼", "崩れる罠橋", "トロール巨人 ☠",
            "放射能の洞窟", "振り出しへ！", "見えない落とし穴", "三重の裏切り", "核の処刑人 ☠",
            "激怒の陸橋", "アトムの豪雨", "忍耐テスト", "最後の悪戯", "トロール皇帝 👑"
        ],
        tabs: ["👑 兜 (12)", "⚔️ 武器＆翼 (12)", "🛡 鎧 (12)", "👁 バイザー (10)", "✨ オーラ (10)", "🧣 マント (10)", "⚡ 強化 (8)"]
    }
};

class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.previewCanvas = document.getElementById("customizePreviewCanvas");
        this.previewCtx = this.previewCanvas ? this.previewCanvas.getContext("2d") : null;
        this.previewDummy = null;
        this.activeCustTab = "helmet";

        this.charPreviewCanvas = document.getElementById("charPreviewCanvas");
        this.charPreviewCtx = this.charPreviewCanvas ? this.charPreviewCanvas.getContext("2d") : null;
        this.charPreviewDummy = null;

        this.state = "map";
        this.selectedLevel = 0;
        this.unlockedLevels = 1;
        this.starsPerLevel = Array(40).fill(0);

        this.isTrollMode = false;
        this.selectedTrollLevel = 0;
        this.unlockedTrollLevels = 1;
        this.starsPerTrollLevel = Array(15).fill(0);
        this.uraniumBombs = [];
        this.uraniumExplosions = [];
        this.pendingTrollDeathTimer = 0;

        this.walletCoins = 0;
        this.walletEmeralds = 8; // Give 8 starter Ancient Emeralds so player can immediately try multiple items!
        this.walletGoldCoins = 30; // Starter Coin (🪙) for Character Changing!
        this.collectedGoldCoins = 0;
        this.ownedCharacters = ["default"];
        this.equippedHeroChar = "default";

        // Smart Non-Intrusive Google AdMob State
        this.reviveUsedInLevel = false;
        this.doubleRewardUsedInLevel = false;
        this.levelsCompletedSinceLastAd = 0;
        this.lastInterstitialTime = 0;
        this.lastRewardedAdTime = 0;
        this.adTimerInterval = null;
        this.adMobInitialized = false;
        setTimeout(() => this.initAdMob(), 1200);
        setTimeout(() => this.checkAppUpdateOnStartup(), 1600);

        this.ownedItems = [
            "skin_cyan",
            "helmet_crest",
            "gear_katana",
            "visor_slit",
            "aura_none",
            "cape_pink"
        ];

        this.equippedSkin = "cyan";
        this.equippedHelmet = "crest";
        this.equippedBackGear = "katana";
        this.equippedVisor = "slit";
        this.equippedAura = "none";
        this.equippedCape = "#ff2a85";

        this.playerName = "Gölge Şövalye";
        this.selectedAvatarId = "av_1";
        this.langAuto = true;
        this.lang = this.detectDeviceLanguage();

        this.loadProgress();

        // Automatically react if the user changes their phone / OS / browser language!
        window.addEventListener("languagechange", () => {
            if (this.langAuto) {
                this.lang = this.detectDeviceLanguage();
                this.applyLanguage();
            }
        });

        this.input = {
            left: false,
            right: false,
            jumpHeld: false,
            jumpPressed: false,
            firePressed: false
        };

        this.camera = { x: 0, y: 0, shake: 0 };
        this.bgSpores = Array.from({ length: 45 }, () => ({
            x: Math.random() * 2000,
            y: Math.random() * 720,
            r: Math.random() * 2.5 + 1,
            speedY: -(Math.random() * 0.4 + 0.15),
            phase: Math.random() * Math.PI * 2
        }));

        this.buildMapNodes();
        this.buildTrollMapNodes();
        this.setupInputs();
        this.setupUI();
        this.updateMapUI();

        this.targetFps = 120;
        this.frameInterval = 1000 / 120; // 8.333ms (120Hz)
        this.physicsStep = 1000 / 60;    // 16.666ms fixed physics step
        this.accumulator = 0;
        this.lastTime = performance.now();
        this.fpsFrames = 0;
        this.fpsLastCheck = performance.now();
        this.currentFps = 120;

        this.start120HzEngine();
    }

    detectDeviceLanguage() {
        const supported = ["tr", "ru", "en", "it", "es", "fr", "ko", "zh", "ja"];
        const candidates = [];
        if (typeof navigator !== "undefined") {
            if (Array.isArray(navigator.languages)) {
                candidates.push(...navigator.languages);
            }
            if (navigator.language) candidates.push(navigator.language);
            if (navigator.userLanguage) candidates.push(navigator.userLanguage);
            if (navigator.systemLanguage) candidates.push(navigator.systemLanguage);
        }
        try {
            const intlLocale = Intl.DateTimeFormat().resolvedOptions().locale;
            if (intlLocale) candidates.push(intlLocale);
        } catch (e) {
            // Ignore Intl errors
        }

        for (const raw of candidates) {
            if (!raw || typeof raw !== "string") continue;
            const prefix = raw.trim().toLowerCase().slice(0, 2);
            if (supported.includes(prefix)) {
                return prefix;
            }
            if (prefix === "az" || prefix === "tk") return "tr";
            if (prefix === "uk" || prefix === "be" || prefix === "kk") return "ru";
            if (prefix === "pt") return "es";
        }
        return "tr";
    }

    loadProgress() {
        try {
            let localObj = null;
            const raw = localStorage.getItem("shadow_jumper_save_v3");
            if (raw) {
                try {
                    localObj = JSON.parse(raw);
                } catch (e) {}
            }
            let nativeObj = null;
            if (window.MarinextCloudBridge && typeof window.MarinextCloudBridge.loadLocalBackup === "function") {
                try {
                    const nativeRaw = window.MarinextCloudBridge.loadLocalBackup();
                    if (nativeRaw && nativeRaw.length > 2) {
                        nativeObj = JSON.parse(nativeRaw);
                    }
                } catch (e) {}
            }
            const data = this.mergeCloudSaveObjects(localObj, nativeObj);
            if (data) {
                this.applySaveDataObject(data);
            }
        } catch (e) {
            // Ignore storage errors
        }
        this.setupCloudBridgeCallbacks();
    }

    applySaveDataObject(data) {
        if (!data || typeof data !== "object") return;
        this.unlockedLevels = Math.max(1, Math.min(40, Number(data.unlockedLevels) || 1));
        const loadedStars = Array.isArray(data.starsPerLevel) ? data.starsPerLevel : [];
        this.starsPerLevel = Array.from({ length: 40 }, (_, i) => Math.max(0, Math.min(3, Number(loadedStars[i]) || 0)));
        this.walletCoins = Math.max(0, Number(data.walletCoins ?? 0));
        this.walletEmeralds = Math.max(0, Number(data.walletEmeralds ?? 8));
        this.walletGoldCoins = Math.max(0, Number(data.walletGoldCoins ?? 30));
        this.ownedCharacters = Array.isArray(data.ownedCharacters) && data.ownedCharacters.length > 0
            ? Array.from(new Set(["default", ...data.ownedCharacters]))
            : ["default"];
        this.equippedHeroChar = data.equippedHeroChar || "default";
        const defaultItems = ["skin_cyan", "helmet_crest", "gear_katana", "visor_slit", "aura_none", "cape_pink"];
        this.ownedItems = Array.isArray(data.ownedItems) && data.ownedItems.length > 0
            ? Array.from(new Set([...defaultItems, ...data.ownedItems]))
            : defaultItems;
        this.equippedSkin = data.equippedSkin || "cyan";
        this.equippedHelmet = data.equippedHelmet || "crest";
        this.equippedBackGear = data.equippedBackGear || "katana";
        this.equippedVisor = data.equippedVisor || "slit";
        this.equippedAura = data.equippedAura || "none";
        this.equippedCape = data.equippedCape || "#ff2a85";
        this.playerName = data.playerName || "Gölge Şövalye";
        this.selectedAvatarId = data.selectedAvatarId || "av_1";
        if (data.langManual === true && data.lang && LANG_DICT[data.lang]) {
            this.langAuto = false;
            this.lang = data.lang;
        } else {
            this.langAuto = true;
            this.lang = this.detectDeviceLanguage();
        }
        this.unlockedTrollLevels = Math.max(1, Math.min(15, Number(data.unlockedTrollLevels) || 1));
        const loadedTrollStars = Array.isArray(data.starsPerTrollLevel) ? data.starsPerTrollLevel : [];
        this.starsPerTrollLevel = Array.from({ length: 15 }, (_, i) => Math.max(0, Math.min(3, Number(loadedTrollStars[i]) || 0)));
    }

    mergeCloudSaveObjects(a, b) {
        if (!a && !b) return null;
        if (!a) return b;
        if (!b) return a;
        const newer = (Number(b.updatedAt) || 0) >= (Number(a.updatedAt) || 0) ? b : a;
        const starsA = Array.isArray(a.starsPerLevel) ? a.starsPerLevel : [];
        const starsB = Array.isArray(b.starsPerLevel) ? b.starsPerLevel : [];
        const mergedStars = Array.from({ length: 40 }, (_, i) => Math.max(Number(starsA[i]) || 0, Number(starsB[i]) || 0));
        const trollA = Array.isArray(a.starsPerTrollLevel) ? a.starsPerTrollLevel : [];
        const trollB = Array.isArray(b.starsPerTrollLevel) ? b.starsPerTrollLevel : [];
        const mergedTrollStars = Array.from({ length: 15 }, (_, i) => Math.max(Number(trollA[i]) || 0, Number(trollB[i]) || 0));
        const chars = Array.from(new Set(["default", ...(a.ownedCharacters || []), ...(b.ownedCharacters || [])]));
        const items = Array.from(new Set([
            "skin_cyan", "helmet_crest", "gear_katana", "visor_slit", "aura_none", "cape_pink",
            ...(a.ownedItems || []),
            ...(b.ownedItems || [])
        ]));
        return {
            ...newer,
            unlockedLevels: Math.max(Number(a.unlockedLevels) || 1, Number(b.unlockedLevels) || 1),
            starsPerLevel: mergedStars,
            unlockedTrollLevels: Math.max(Number(a.unlockedTrollLevels) || 1, Number(b.unlockedTrollLevels) || 1),
            starsPerTrollLevel: mergedTrollStars,
            walletCoins: Math.max(Number(a.walletCoins ?? 0), Number(b.walletCoins ?? 0)),
            walletEmeralds: Math.max(Number(a.walletEmeralds ?? 8), Number(b.walletEmeralds ?? 8)),
            walletGoldCoins: Math.max(Number(a.walletGoldCoins ?? 30), Number(b.walletGoldCoins ?? 30)),
            ownedCharacters: chars,
            ownedItems: items,
            updatedAt: Math.max(Number(a.updatedAt) || 0, Number(b.updatedAt) || 0, Date.now())
        };
    }

    buildSavePayloadObject() {
        return {
            appId: "com.cgstudiohome.marinext2100",
            schemaVersion: 3,
            updatedAt: Date.now(),
            unlockedLevels: this.unlockedLevels,
            starsPerLevel: this.starsPerLevel,
            walletCoins: this.walletCoins,
            walletEmeralds: this.walletEmeralds,
            walletGoldCoins: this.walletGoldCoins,
            ownedCharacters: this.ownedCharacters,
            equippedHeroChar: this.equippedHeroChar,
            ownedItems: this.ownedItems,
            equippedSkin: this.equippedSkin,
            equippedHelmet: this.equippedHelmet,
            equippedBackGear: this.equippedBackGear,
            equippedVisor: this.equippedVisor,
            equippedAura: this.equippedAura,
            equippedCape: this.equippedCape,
            playerName: this.playerName,
            selectedAvatarId: this.selectedAvatarId,
            lang: this.lang,
            langManual: !this.langAuto,
            unlockedTrollLevels: this.unlockedTrollLevels,
            starsPerTrollLevel: this.starsPerTrollLevel
        };
    }

    saveProgress(pushCloudImmediate = false) {
        try {
            const payloadObj = this.buildSavePayloadObject();
            const jsonStr = JSON.stringify(payloadObj);
            localStorage.setItem("shadow_jumper_save_v3", jsonStr);
            if (window.MarinextCloudBridge) {
                if (typeof window.MarinextCloudBridge.saveLocalBackup === "function") {
                    window.MarinextCloudBridge.saveLocalBackup(jsonStr);
                }
                if (pushCloudImmediate && typeof window.MarinextCloudBridge.saveCloudSnapshot === "function") {
                    const desc = `Marinext 2100 • Bölüm ${this.unlockedLevels}/40 • Coin ${this.walletGoldCoins}`;
                    window.MarinextCloudBridge.saveCloudSnapshot(jsonStr, desc);
                } else {
                    this.scheduleCloudSnapshotUpload(jsonStr);
                }
            }
            this.lastCloudSaveTime = Date.now();
            this.updateCloudStatusUI();
        } catch (e) {
            // Ignore storage errors
        }
    }

    scheduleCloudSnapshotUpload(jsonStr) {
        if (!window.MarinextCloudBridge || typeof window.MarinextCloudBridge.saveCloudSnapshot !== "function") return;
        if (this._cloudUploadTimer) clearTimeout(this._cloudUploadTimer);
        this._cloudUploadTimer = setTimeout(() => {
            try {
                const desc = `Marinext 2100 • Bölüm ${this.unlockedLevels}/40 • Coin ${this.walletGoldCoins}`;
                window.MarinextCloudBridge.saveCloudSnapshot(jsonStr, desc);
            } catch (e) {}
        }, 6000);
    }

    setupCloudBridgeCallbacks() {
        this.playGamesAuthed = false;
        this.playGamesPlayerName = "";
        this.playGamesPlayerId = "";
        this.lastCloudSaveTime = Date.now();

        window.onMarinextPlayGamesAuth = (authed, playerName, playerId, statusMsg) => {
            this.playGamesAuthed = !!authed;
            if (playerName) {
                this.playGamesPlayerName = playerName;
                if (!this.playerName || this.playerName === "Gölge Şövalye") {
                    this.playerName = playerName.slice(0, 24);
                    this.updateProfileDisplay();
                }
            }
            if (playerId) this.playGamesPlayerId = playerId;
            this.updateCloudStatusUI(statusMsg);
        };

        window.onMarinextCloudSnapshotLoaded = (cloudJsonStr, sourceLabel) => {
            if (!cloudJsonStr || cloudJsonStr.length < 3) return;
            try {
                const cloudData = JSON.parse(cloudJsonStr);
                const currentData = this.buildSavePayloadObject();
                const merged = this.mergeCloudSaveObjects(currentData, cloudData);
                if (merged) {
                    this.applySaveDataObject(merged);
                    const mergedStr = JSON.stringify(merged);
                    localStorage.setItem("shadow_jumper_save_v3", mergedStr);
                    if (window.MarinextCloudBridge && typeof window.MarinextCloudBridge.saveLocalBackup === "function") {
                        window.MarinextCloudBridge.saveLocalBackup(mergedStr);
                    }
                    this.buildMapNodes();
                    this.buildTrollMapNodes();
                    this.updateMapUI();
                    this.updateProfileDisplay();
                    this.updateCloudStatusUI(`${sourceLabel || "Google Drive"} senkronize edildi ✓`);
                }
            } catch (e) {}
        };
    }

    updateCloudStatusUI(customNote = "") {
        const badge = document.getElementById("cloud-status-badge");
        const timeEl = document.getElementById("cloud-sync-time");
        if (badge) {
            if (this.playGamesAuthed) {
                const pName = this.playGamesPlayerName ? ` (${this.playGamesPlayerName})` : "";
                badge.textContent = `🎮 Play Games & GDrive: BAĞLI${pName}`;
                badge.style.borderColor = "#34d399";
                badge.style.color = "#6ee7b7";
            } else {
                badge.textContent = "☁️ Google Drive Yedek: AKTİF";
                badge.style.borderColor = "#00f2fe";
                badge.style.color = "#00f2fe";
            }
        }
        if (timeEl) {
            const nowStr = new Date(this.lastCloudSaveTime || Date.now()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
            const extra = customNote ? ` • ${customNote}` : "";
            timeEl.textContent = `Son Bulut/Cihaz Kaydı: ${nowStr} • Bölüm: ${this.unlockedLevels}/40 (Trol: ${this.unlockedTrollLevels}/15) • Coin: ${this.walletGoldCoins} ✪${extra}`;
        }
    }

    triggerManualCloudSync() {
        this.saveProgress(true);
        if (window.MarinextCloudBridge) {
            try {
                if (typeof window.MarinextCloudBridge.signInPlayGames === "function") {
                    window.MarinextCloudBridge.signInPlayGames(true);
                }
                if (typeof window.MarinextCloudBridge.loadCloudSnapshot === "function") {
                    window.MarinextCloudBridge.loadCloudSnapshot();
                }
                this.updateCloudStatusUI("Play Games & Google Drive senkronize ediliyor...");
                return;
            } catch (e) {}
        }
        this.updateCloudStatusUI("Cihaz & Tarayıcı Bulut Kaydı Güncellendi ✓");
    }

    exportCloudSaveToDrive() {
        this.saveProgress(true);
        const payloadStr = JSON.stringify(this.buildSavePayloadObject(), null, 2);
        if (window.MarinextCloudBridge && typeof window.MarinextCloudBridge.shareBackupToDrive === "function") {
            try {
                window.MarinextCloudBridge.shareBackupToDrive(payloadStr);
                this.updateCloudStatusUI("Google Drive paylaşım ekranı açıldı ✓");
                return;
            } catch (e) {}
        }
        try {
            const blob = new Blob([payloadStr], { type: "application/json;charset=utf-8" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Marinext-2100-GoogleDrive-Yedek.json";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 1500);
            this.updateCloudStatusUI("Yedek dosyası indirildi (Google Drive'a yükleyebilirsiniz) ✓");
        } catch (e) {}
    }

    async checkAppUpdateOnStartup() {
        const CURRENT_VERSION_CODE = 8;
        let installedCode = CURRENT_VERSION_CODE;
        if (window.MarinextCloudBridge && typeof window.MarinextCloudBridge.getAppVersionInfo === "function") {
            try {
                const info = JSON.parse(window.MarinextCloudBridge.getAppVersionInfo());
                if (info && Number.isFinite(Number(info.versionCode))) {
                    installedCode = Number(info.versionCode);
                }
            } catch (e) {}
        }

        const updateScreen = document.getElementById("screen-update");
        const btnDoUpdate = document.getElementById("btn-do-update");
        const btnLater = document.getElementById("btn-later-update");
        const btnCloseX = document.getElementById("btn-close-update-x");
        const newVerEl = document.getElementById("update-new-version");
        const storeUrlFallback = "https://play.google.com/store/apps/details?id=com.cgstudiohome.marinext2100";

        const closeUpdateModal = () => {
            if (updateScreen) updateScreen.classList.add("hidden");
        };
        if (btnLater) btnLater.onclick = closeUpdateModal;
        if (btnCloseX) btnCloseX.onclick = closeUpdateModal;

        try {
            const resp = await fetch("https://raw.githubusercontent.com/cevatturk/2100-Mario/main/version.json?t=" + Date.now(), { cache: "no-store" });
            if (!resp.ok) return;
            const remote = await resp.json();
            const remoteCode = Number(remote && remote.versionCode);
            if (Number.isFinite(remoteCode) && remoteCode > installedCode) {
                if (newVerEl && remote.versionName) {
                    newVerEl.textContent = "v" + remote.versionName;
                }
                if (btnDoUpdate) {
                    btnDoUpdate.onclick = () => {
                        if (window.MarinextCloudBridge && typeof window.MarinextCloudBridge.openPlayStoreUpdate === "function") {
                            try {
                                window.MarinextCloudBridge.openPlayStoreUpdate();
                                return;
                            } catch (e) {}
                        }
                        window.open((remote && remote.storeUrl) || storeUrlFallback, "_blank", "noopener");
                    };
                }
                if (updateScreen) {
                    updateScreen.classList.remove("hidden");
                }
            }
        } catch (e) {
            // Offline or unreachable — silently continue game
        }
    }

    getPlayerUpgrades() {
        return {
            extraHearts: 0,
            extraJumps: this.ownedItems.includes("tripleJump") ? 1 : 0,
            speedBonus: this.ownedItems.includes("speedBoots") ? 0.95 : 0,
            hasMagnet: this.ownedItems.includes("emeraldMagnet"),
            startShield: this.ownedItems.includes("startShield"),
            startFire: this.ownedItems.includes("startFire"),
            skinId: this.equippedSkin,
            helmetId: this.equippedHelmet,
            backGearId: this.equippedBackGear,
            visorId: this.equippedVisor,
            auraId: this.equippedAura,
            capeColor: this.equippedCape,
            heroCharId: this.equippedHeroChar || "default"
        };
    }

    addGoldCoins(amount, isBossGift = false) {
        if (!isBossGift) {
            this.collectedGoldCoins = (this.collectedGoldCoins || 0) + amount;
        }
        this.walletGoldCoins = (this.walletGoldCoins || 0) + amount;
        this.saveProgress();
    }

    addCrystals(amount, isBossGift = false) {
        this.collectedCoins += amount;
        this.walletCoins += amount;
        this.saveProgress();
    }

    addEmeralds(amount, isBossGift = false) {
        if (!isBossGift) {
            this.collectedEmeralds += amount;
        }
        this.walletEmeralds += amount;
        this.saveProgress();
    }

    getHitNowText() {
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        return d.hitNowText || "🎯 ŞİMDİ VUR!";
    }

    getLocalizedLevelInfo(idx, isTroll = false) {
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        if (isTroll) {
            const base = (window.TROLL_LEVEL_INFO && window.TROLL_LEVEL_INFO[idx]) || (window.TROLL_LEVEL_INFO && window.TROLL_LEVEL_INFO[0]) || {
                id: idx,
                world: `😡 TROL ${idx + 1}/15`,
                shortName: `Trol ${idx + 1}`,
                name: `Trol ${idx + 1}`,
                desc: "",
                themeColor: "#ff2a85",
                isBossLevel: false
            };
            if (this.lang === "tr") return base;
            const shortName = (d.trollShortNames && d.trollShortNames[idx]) || base.shortName;
            const name = `${d.trollBadge} ${d.levelWord} ${idx + 1}: ${shortName}`;
            const world = `😡 ${d.trollBadge} ${idx + 1}/15`;
            const desc = `${name} — ${d.trollDescTemplate || base.desc}`;
            return { ...base, shortName, name, world, desc };
        }
        const base = (window.LEVEL_INFO && window.LEVEL_INFO[idx]) || (window.LEVEL_INFO && window.LEVEL_INFO[0]) || {
            id: idx,
            world: "DÜNYA 1",
            shortName: `Bölüm ${idx + 1}`,
            name: `Bölüm ${idx + 1}`,
            desc: "",
            themeColor: "#00f2fe",
            isBossLevel: false
        };
        if (this.lang === "tr") return base;
        const shortName = (d.levelShortNames && d.levelShortNames[idx]) || base.shortName;
        const name = `${d.levelWord} ${idx + 1}: ${shortName}`;
        const regionIdx = Math.min(3, Math.floor(idx / 10));
        const world = (d.worldRegions && d.worldRegions[regionIdx]) || `${d.worldWord} ${regionIdx + 1}`;
        const desc = `${name} — ${base.isBossLevel ? (d.bossDescTemplate || base.desc) : (d.levelDescTemplate || base.desc)}`;
        return { ...base, shortName, name, world, desc };
    }

    getLocalizedSignText(sg) {
        if (this.lang === "tr") return sg.text;
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        const idx = this.isTrollMode ? this.selectedTrollLevel : this.selectedLevel;
        const loc = this.getLocalizedLevelInfo(idx, this.isTrollMode);
        if (this.isTrollMode) {
            return `😡 ${loc.name} — ${d.trollSignHint || ""}`;
        }
        return `${loc.name} — ${d.signHint || ""}`;
    }

    buildMapNodes() {
        const container = document.getElementById("level-nodes-container");
        container.innerHTML = "";
        window.LEVEL_INFO.forEach((lvl, idx) => {
            const loc = this.getLocalizedLevelInfo(idx, false);
            const node = document.createElement("div");
            node.className = `map-node ${lvl.isBossLevel ? "boss-node" : ""}`;
            node.setAttribute("data-level", idx);
            node.innerHTML = `
                <div class="node-circle">${lvl.isBossLevel ? "☠" : idx + 1}</div>
                <div class="node-label">${loc.shortName}</div>
                <div class="node-stars" id="stars-${idx}">☆☆☆</div>
            `;
            node.addEventListener("click", () => {
                if (idx < this.unlockedLevels) {
                    this.selectedLevel = idx;
                    window.sfx.coin();
                    this.updateMapUI();
                }
            });
            container.appendChild(node);
        });
    }

    buildTrollMapNodes() {
        const container = document.getElementById("troll-nodes-container");
        if (!container || !window.TROLL_LEVEL_INFO) return;
        container.innerHTML = "";
        window.TROLL_LEVEL_INFO.forEach((lvl, idx) => {
            const loc = this.getLocalizedLevelInfo(idx, true);
            const node = document.createElement("div");
            node.className = `map-node troll-node ${lvl.isBossLevel ? "boss-node" : ""}`;
            node.setAttribute("data-troll-level", idx);
            node.innerHTML = `
                <div class="node-circle">${lvl.isBossLevel ? "😡" : idx + 1}</div>
                <div class="node-label">${loc.shortName}</div>
                <div class="node-stars" id="troll-stars-${idx}">☆☆☆</div>
            `;
            node.addEventListener("click", () => {
                if (idx < this.unlockedTrollLevels) {
                    this.selectedTrollLevel = idx;
                    window.sfx.coin();
                    this.updateTrollMapUI();
                }
            });
            container.appendChild(node);
        });
    }

    updateTrollMapUI() {
        document.querySelectorAll(".troll-node").forEach((node, idx) => {
            node.classList.toggle("unlocked", idx < this.unlockedTrollLevels);
            node.classList.toggle("selected", idx === this.selectedTrollLevel);
            const labelEl = node.querySelector(".node-label");
            if (labelEl) {
                labelEl.textContent = this.getLocalizedLevelInfo(idx, true).shortName;
            }
            const stars = this.starsPerTrollLevel[idx] || 0;
            const starEl = document.getElementById(`troll-stars-${idx}`);
            if (starEl) {
                starEl.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
            }
        });
        const info = this.getLocalizedLevelInfo(this.selectedTrollLevel, true);
        if (info) {
            const wEl = document.getElementById("troll-preview-world");
            const tEl = document.getElementById("troll-preview-title");
            const dEl = document.getElementById("troll-preview-desc");
            if (wEl) wEl.textContent = info.world;
            if (tEl) tEl.textContent = info.name;
            if (dEl) dEl.textContent = info.desc;
        }
    }

    resetInputs() {
        this.input.left = false;
        this.input.right = false;
        this.input.jumpPressed = false;
        this.input.jumpHeld = false;
        this.input.firePressed = false;
        if (this.activeTouches) this.activeTouches.clear();
        if (this.keysHeld) {
            this.keysHeld.left = false;
            this.keysHeld.right = false;
            this.keysHeld.jump = false;
        }
        this.activeMouseBtn = null;
        ["touch-left", "touch-right", "touch-jump", "touch-fire"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.classList.remove("pressed");
        });
        this.syncFireButtonUI();
    }

    syncFireButtonUI() {
        const fireBtn = document.getElementById("touch-fire");
        if (!fireBtn) return;
        const canFire = Boolean(this.player && this.player.hasFire);
        fireBtn.classList.toggle("fire-passive", !canFire);
        fireBtn.setAttribute("aria-disabled", canFire ? "false" : "true");
        if (!canFire) {
            fireBtn.classList.remove("pressed");
        }
    }

    handleBackAction() {
        const privacyScreen = document.getElementById("screen-privacy");
        if (privacyScreen && !privacyScreen.classList.contains("hidden")) {
            privacyScreen.classList.add("hidden");
            return true;
        }
        const trollScreen = document.getElementById("screen-troll");
        if (trollScreen && !trollScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-troll");
            if (closeBtn) closeBtn.click();
            return true;
        }
        const langScreen = document.getElementById("screen-language");
        if (langScreen && !langScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-lang");
            if (closeBtn) closeBtn.click();
            return true;
        }
        const profileScreen = document.getElementById("screen-profile");
        if (profileScreen && !profileScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-profile");
            if (closeBtn) closeBtn.click();
            return true;
        }
        const settingsScreen = document.getElementById("screen-settings");
        if (settingsScreen && !settingsScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-settings");
            if (closeBtn) closeBtn.click();
            return true;
        }
        const charScreen = document.getElementById("screen-character");
        if (charScreen && !charScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-character");
            if (closeBtn) closeBtn.click();
            return true;
        }
        const custScreen = document.getElementById("screen-customize");
        if (custScreen && !custScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-customize");
            if (closeBtn) closeBtn.click();
            return true;
        }
        const shopScreen = document.getElementById("screen-shop");
        if (shopScreen && !shopScreen.classList.contains("hidden")) {
            const closeBtn = document.getElementById("btn-close-shop");
            if (closeBtn) closeBtn.click();
            return true;
        }
        if (this.state === "playing") {
            this.pauseGame();
            return true;
        }
        if (this.state === "paused") {
            this.resumeGame();
            return true;
        }
        return false;
    }

    setupInputs() {
        this.activeTouches = new Map();
        this.keysHeld = { left: false, right: false, jump: false };
        this.activeMouseBtn = null;

        window.addEventListener("blur", () => {
            this.resetInputs();
            if (window.sfx && typeof window.sfx.suspendAudio === "function") {
                window.sfx.suspendAudio();
            }
        });
        window.addEventListener("focus", () => {
            if (!document.hidden && window.sfx && typeof window.sfx.resumeAudio === "function") {
                window.sfx.resumeAudio();
            }
        });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                this.resetInputs();
                if (this.state === "playing") {
                    this.pauseGame();
                }
                if (window.sfx && typeof window.sfx.suspendAudio === "function") {
                    window.sfx.suspendAudio();
                }
            } else {
                if (window.sfx && typeof window.sfx.resumeAudio === "function") {
                    window.sfx.resumeAudio();
                }
            }
        });
        // Prevent Android long-press contextmenu from interrupting held touch buttons!
        window.addEventListener("contextmenu", (e) => {
            if (e && typeof e.preventDefault === "function") {
                e.preventDefault();
            }
        }, { passive: false });

        // Android Hardware Back Button & Capacitor Back Event Compliance
        document.addEventListener("backbutton", (e) => {
            if (this.handleBackAction()) {
                if (e && typeof e.preventDefault === "function") e.preventDefault();
            }
        }, false);

        const syncInputState = () => {
            let touchLeft = false;
            let touchRight = false;
            let touchJump = false;
            let touchFire = false;

            for (const role of this.activeTouches.values()) {
                if (role === "left") touchLeft = true;
                else if (role === "right") touchRight = true;
                else if (role === "jump") touchJump = true;
                else if (role === "fire") touchFire = true;
            }

            if (this.activeMouseBtn === "left") touchLeft = true;
            else if (this.activeMouseBtn === "right") touchRight = true;
            else if (this.activeMouseBtn === "jump") touchJump = true;
            else if (this.activeMouseBtn === "fire") touchFire = true;

            this.input.left = Boolean(touchLeft || this.keysHeld.left);
            this.input.right = Boolean(touchRight || this.keysHeld.right);
            this.input.jumpHeld = Boolean(touchJump || this.keysHeld.jump);

            const leftBtn = document.getElementById("touch-left");
            const rightBtn = document.getElementById("touch-right");
            const jumpBtn = document.getElementById("touch-jump");
            const fireBtn = document.getElementById("touch-fire");

            if (leftBtn) leftBtn.classList.toggle("pressed", touchLeft);
            if (rightBtn) rightBtn.classList.toggle("pressed", touchRight);
            if (jumpBtn) jumpBtn.classList.toggle("pressed", touchJump);
            if (fireBtn) {
                const canFire = Boolean(this.player && this.player.hasFire);
                fireBtn.classList.toggle("pressed", Boolean(touchFire && canFire));
            }
        };

        window.addEventListener("keydown", (e) => {
            if (document.activeElement && document.activeElement.tagName === "INPUT") {
                return;
            }
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
                e.preventDefault();
            }
            if (this.state === "playing") {
                if (e.code === "KeyA" || e.code === "ArrowLeft") {
                    this.keysHeld.left = true;
                    syncInputState();
                }
                if (e.code === "KeyD" || e.code === "ArrowRight") {
                    this.keysHeld.right = true;
                    syncInputState();
                }
                if (e.code === "KeyW" || e.code === "ArrowUp" || e.code === "Space") {
                    if (!this.input.jumpHeld) this.input.jumpPressed = true;
                    this.keysHeld.jump = true;
                    syncInputState();
                }
                if (e.code === "KeyX" || e.code === "KeyF" || e.code === "ShiftLeft" || e.code === "ShiftRight" || e.code === "KeyZ") {
                    if (this.player && this.player.hasFire) {
                        this.input.firePressed = true;
                    }
                }
            }
            if (e.code === "Escape") {
                this.handleBackAction();
                return;
            }
            if (e.code === "KeyP") {
                if (this.state === "playing") this.pauseGame();
                else if (this.state === "paused") this.resumeGame();
            }
        });

        window.addEventListener("keyup", (e) => {
            if (e.code === "KeyA" || e.code === "ArrowLeft" || e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
                this.keysHeld.left = false;
            }
            if (e.code === "KeyD" || e.code === "ArrowRight" || e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
                this.keysHeld.right = false;
            }
            if (e.code === "KeyW" || e.code === "ArrowUp" || e.code === "Space" || e.key === "w" || e.key === "W" || e.key === "ArrowUp" || e.key === " ") {
                this.keysHeld.jump = false;
            }
            syncInputState();
        });

        // True Multi-Touch Controller (Independent tracking per touch.identifier so holding Right + tapping Jump never cancels Right)
        const buttonRoleMap = [
            { id: "touch-left", role: "left" },
            { id: "touch-right", role: "right" },
            { id: "touch-jump", role: "jump" },
            { id: "touch-fire", role: "fire" }
        ];

        const triggerRoleDown = (role) => {
            if (role === "jump") {
                this.input.jumpPressed = true;
            } else if (role === "fire") {
                if (this.player && this.player.hasFire) {
                    this.input.firePressed = true;
                }
            }
        };

        buttonRoleMap.forEach(({ id, role }) => {
            const btn = document.getElementById(id);
            if (!btn) return;

            btn.addEventListener("touchstart", (e) => {
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();
                if (role === "fire" && (!this.player || !this.player.hasFire)) {
                    this.syncFireButtonUI();
                    return;
                }
                for (let i = 0; i < e.changedTouches.length; i++) {
                    const t = e.changedTouches[i];
                    this.activeTouches.set(t.identifier, role);
                }
                triggerRoleDown(role);
                syncInputState();
            }, { passive: false });

            // Desktop mouse fallback (only for mouse, never interferes with touch)
            btn.addEventListener("mousedown", (e) => {
                if (e.button !== 0) return;
                e.preventDefault();
                if (role === "fire" && (!this.player || !this.player.hasFire)) {
                    this.syncFireButtonUI();
                    return;
                }
                this.activeMouseBtn = role;
                triggerRoleDown(role);
                syncInputState();
            });
        });

        const handleGlobalTouchMove = (e) => {
            if (this.activeTouches.size === 0) return;
            const leftEl = document.getElementById("touch-left");
            const rightEl = document.getElementById("touch-right");
            const leftRect = leftEl ? leftEl.getBoundingClientRect() : null;
            const rightRect = rightEl ? rightEl.getBoundingClientRect() : null;

            for (let i = 0; i < e.changedTouches.length; i++) {
                const t = e.changedTouches[i];
                const currentRole = this.activeTouches.get(t.identifier);
                if (!currentRole) continue;

                // Allow smooth thumb slide between Left and Right D-pad buttons while keeping held state even if thumb drifts slightly outside button bounds
                if (currentRole === "left" || currentRole === "right") {
                    if (leftRect && t.clientX >= leftRect.left - 12 && t.clientX <= leftRect.right + 8 && t.clientY >= leftRect.top - 24 && t.clientY <= leftRect.bottom + 24) {
                        this.activeTouches.set(t.identifier, "left");
                    } else if (rightRect && t.clientX >= rightRect.left - 8 && t.clientX <= rightRect.right + 12 && t.clientY >= rightRect.top - 24 && t.clientY <= rightRect.bottom + 24) {
                        this.activeTouches.set(t.identifier, "right");
                    }
                }
            }
            syncInputState();
        };

        const handleGlobalTouchEnd = (e) => {
            if (this.activeTouches.size === 0) return;
            for (let i = 0; i < e.changedTouches.length; i++) {
                const t = e.changedTouches[i];
                this.activeTouches.delete(t.identifier);
            }
            // Reconcile against remaining active screen touches
            if (e.touches) {
                const stillAlive = new Set();
                for (let i = 0; i < e.touches.length; i++) {
                    stillAlive.add(e.touches[i].identifier);
                }
                for (const key of Array.from(this.activeTouches.keys())) {
                    if (!stillAlive.has(key)) {
                        this.activeTouches.delete(key);
                    }
                }
            }
            syncInputState();
        };

        window.addEventListener("touchmove", handleGlobalTouchMove, { passive: true });
        window.addEventListener("touchend", handleGlobalTouchEnd, { passive: true });
        window.addEventListener("touchcancel", handleGlobalTouchEnd, { passive: true });

        window.addEventListener("mouseup", () => {
            if (this.activeMouseBtn !== null) {
                this.activeMouseBtn = null;
                syncInputState();
            }
        });
    }

    setupUI() {
        document.getElementById("btn-play-level").addEventListener("click", () => {
            window.sfx.init();
            this.isTrollMode = false;
            this.startLevel(this.selectedLevel);
        });

        document.getElementById("btn-unlock-all").addEventListener("click", () => {
            this.unlockedLevels = 40;
            this.walletCoins += 500;
            this.walletEmeralds += 50;
            this.walletGoldCoins = (this.walletGoldCoins || 0) + 600;
            this.saveProgress();
            window.sfx.emerald();
            this.updateMapUI();
        });

        // Open Character Change Studio (Coin 🪙 - Realistic Outfits & Distinct Faces)
        const openCharacterHandler = () => {
            this.resetInputs();
            window.sfx.coin();
            if (this.state === "playing") {
                this.state = "character_in_game";
            }
            this.openCharacterStudio();
        };
        ["btn-open-character", "btn-character-main", "btn-hud-character", "hud-goldcoin-box", "map-goldcoin-pill"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.addEventListener("click", openCharacterHandler);
        });

        const closeCharacterHandler = () => {
            const modal = document.getElementById("screen-character");
            if (modal) modal.classList.add("hidden");
            if (this.player) {
                this.player.heroCharId = this.equippedHeroChar || "default";
            }
            if (this.state === "character_in_game") {
                this.state = "playing";
                this.updateHUD();
            } else {
                this.updateMapUI();
            }
        };
        const btnCloseChar = document.getElementById("btn-close-character");
        if (btnCloseChar) btnCloseChar.addEventListener("click", closeCharacterHandler);
        const btnCloseCharX = document.getElementById("btn-close-character-x");
        if (btnCloseCharX) btnCloseCharX.addEventListener("click", closeCharacterHandler);

        // 🎬 Google AdMob Smart Rewarded Ad Buttons (Chest, Revive, 2x Victory Bonus)
        const btnAdChestChar = document.getElementById("btn-ad-chest-char");
        if (btnAdChestChar) {
            btnAdChestChar.addEventListener("click", () => this.claimChestRewardWithAd());
        }
        const btnAdChestCust = document.getElementById("btn-ad-chest-cust");
        if (btnAdChestCust) {
            btnAdChestCust.addEventListener("click", () => this.claimChestRewardWithAd());
        }
        const btnAdRevive = document.getElementById("btn-ad-revive");
        if (btnAdRevive) {
            btnAdRevive.addEventListener("click", () => this.revivePlayerWithAd());
        }
        const btnAdDouble = document.getElementById("btn-ad-double");
        if (btnAdDouble) {
            btnAdDouble.addEventListener("click", () => this.doubleVictoryRewardsWithAd());
        }

        // Open Character Customization Studio from any Customize button (Map, HUD, or Modal)
        const openCustomizeHandler = () => {
            this.resetInputs();
            window.sfx.emerald();
            if (this.state === "playing") {
                this.state = "customizing_in_game";
            }
            this.openCustomizeStudio();
        };
        document.getElementById("btn-open-customize").addEventListener("click", openCustomizeHandler);
        document.getElementById("btn-customize-main").addEventListener("click", openCustomizeHandler);
        const hudCustBtn = document.getElementById("btn-hud-customize");
        if (hudCustBtn) hudCustBtn.addEventListener("click", openCustomizeHandler);
        const hudEmeraldBox = document.getElementById("hud-emerald-box");
        if (hudEmeraldBox) hudEmeraldBox.addEventListener("click", openCustomizeHandler);

        document.getElementById("btn-modal-customize").addEventListener("click", () => {
            document.getElementById("screen-modal").classList.add("hidden");
            this.state = "customizing_in_game";
            this.openCustomizeStudio();
        });

        const closeCustomizeHandler = () => {
            document.getElementById("screen-customize").classList.add("hidden");
            // Apply changes live if player exists!
            if (this.player) {
                this.player.skinId = this.equippedSkin;
                this.player.helmetId = this.equippedHelmet;
                this.player.backGearId = this.equippedBackGear;
                this.player.visorId = this.equippedVisor;
                this.player.auraId = this.equippedAura;
                this.player.capeColor = this.equippedCape;
                const upg = this.getPlayerUpgrades();
                this.player.maxHp = 3 + upg.extraHearts;
                this.player.maxJumps = 2 + (upg.extraJumps || 0);
                this.player.speedBonus = upg.speedBonus || 0;
                this.player.hasMagnet = Boolean(upg.hasMagnet);
                if (upg.startShield) this.player.hasShield = true;
                if (upg.startFire) this.player.hasFire = true;
                this.syncFireButtonUI();
            }
            if (this.state === "customizing_in_game") {
                this.state = "playing";
                this.updateHUD();
            } else {
                this.updateMapUI();
            }
        };
        document.getElementById("btn-close-customize").addEventListener("click", closeCustomizeHandler);
        const btnCloseCustX = document.getElementById("btn-close-customize-x");
        if (btnCloseCustX) btnCloseCustX.addEventListener("click", closeCustomizeHandler);

        document.querySelectorAll(".cust-tab").forEach((tabBtn) => {
            tabBtn.addEventListener("click", () => {
                document.querySelectorAll(".cust-tab").forEach((b) => b.classList.remove("active"));
                tabBtn.classList.add("active");
                this.activeCustTab = tabBtn.getAttribute("data-tab");
                window.sfx.coin();
                this.renderCustomizeItems();
            });
        });

        document.getElementById("btn-open-shop").addEventListener("click", () => {
            window.sfx.coin();
            this.openShop();
        });

        const closeShopHandler = () => {
            document.getElementById("screen-shop").classList.add("hidden");
            this.updateMapUI();
        };
        document.getElementById("btn-close-shop").addEventListener("click", closeShopHandler);
        const btnCloseShopX = document.getElementById("btn-close-shop-x");
        if (btnCloseShopX) btnCloseShopX.addEventListener("click", closeShopHandler);

        document.getElementById("btn-pause").addEventListener("click", () => {
            if (this.state === "playing") this.pauseGame();
        });

        document.getElementById("btn-mute").addEventListener("click", (e) => {
            const muted = window.sfx.toggleMute();
            e.currentTarget.textContent = muted ? "🔇" : "🔊";
            this.updateSettingsUI();
        });

        // Settings Menu (Gear Button ⚙️)
        const openSettingsHandler = () => {
            this.resetInputs();
            window.sfx.coin();
            if (this.state === "playing") {
                this.state = "settings_in_game";
            }
            this.updateSettingsUI();
            document.getElementById("screen-settings").classList.remove("hidden");
        };
        const btnHudSettings = document.getElementById("btn-hud-settings");
        if (btnHudSettings) btnHudSettings.addEventListener("click", openSettingsHandler);
        const btnMapSettings = document.getElementById("btn-map-settings");
        if (btnMapSettings) btnMapSettings.addEventListener("click", openSettingsHandler);

        document.getElementById("btn-toggle-sfx").addEventListener("click", () => {
            window.sfx.toggleSfx();
            this.updateSettingsUI();
        });

        document.getElementById("btn-toggle-music").addEventListener("click", () => {
            window.sfx.toggleMusic();
            this.updateSettingsUI();
        });

        document.getElementById("btn-settings-restart-level").addEventListener("click", () => {
            document.getElementById("screen-settings").classList.add("hidden");
            window.sfx.coin();
            this.startLevel(this.selectedLevel);
        });

        document.getElementById("btn-settings-reset-all").addEventListener("click", () => {
            try {
                localStorage.removeItem("shadow_jumper_save_v3");
                localStorage.removeItem("shadow_jumper_audio_v1");
                if (window.MarinextCloudBridge && typeof window.MarinextCloudBridge.clearLocalBackup === "function") {
                    window.MarinextCloudBridge.clearLocalBackup();
                }
            } catch (e) {
                // Ignore storage errors
            }
            this.unlockedLevels = 1;
            this.selectedLevel = 0;
            this.starsPerLevel = Array(40).fill(0);
            this.unlockedTrollLevels = 1;
            this.selectedTrollLevel = 0;
            this.starsPerTrollLevel = Array(15).fill(0);
            this.walletCoins = 0;
            this.walletEmeralds = 8;
            this.walletGoldCoins = 30;
            this.ownedCharacters = ["default"];
            this.equippedHeroChar = "default";
            this.ownedItems = [
                "skin_cyan",
                "helmet_crest",
                "gear_katana",
                "visor_slit",
                "aura_none",
                "cape_pink"
            ];
            this.equippedSkin = "cyan";
            this.equippedHelmet = "crest";
            this.equippedBackGear = "katana";
            this.equippedVisor = "slit";
            this.equippedAura = "none";
            this.equippedCape = "#ff2a85";
            this.playerName = "Gölge Şövalye";
            this.selectedAvatarId = "av_1";
            this.saveProgress(true);
            this.updateProfileDisplay();
            window.sfx.powerUpSpawn();
            document.getElementById("screen-settings").classList.add("hidden");
            this.showMapScreen();
        });

        const btnSettingsCloudSync = document.getElementById("btn-settings-cloud-sync");
        if (btnSettingsCloudSync) {
            btnSettingsCloudSync.addEventListener("click", () => {
                window.sfx.coin();
                document.getElementById("screen-settings").classList.add("hidden");
                this.openProfileModal();
                this.triggerManualCloudSync();
            });
        }

        const btnCloudSyncNow = document.getElementById("btn-cloud-sync-now");
        if (btnCloudSyncNow) {
            btnCloudSyncNow.addEventListener("click", () => {
                window.sfx.powerUpSpawn();
                this.triggerManualCloudSync();
            });
        }

        const btnCloudExportDrive = document.getElementById("btn-cloud-export-drive");
        if (btnCloudExportDrive) {
            btnCloudExportDrive.addEventListener("click", () => {
                window.sfx.coin();
                this.exportCloudSaveToDrive();
            });
        }

        const btnCloudImportDrive = document.getElementById("btn-cloud-import-drive");
        const inputCloudImportFile = document.getElementById("input-cloud-import-file");
        if (btnCloudImportDrive && inputCloudImportFile) {
            btnCloudImportDrive.addEventListener("click", () => {
                window.sfx.coin();
                inputCloudImportFile.value = "";
                inputCloudImportFile.click();
            });
            inputCloudImportFile.addEventListener("change", (ev) => {
                const file = ev.target && ev.target.files && ev.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                    const text = String(reader.result || "");
                    if (window.onMarinextCloudSnapshotLoaded) {
                        window.onMarinextCloudSnapshotLoaded(text, "Google Drive Yedek Dosyası");
                        window.sfx.powerUpSpawn();
                    }
                };
                reader.readAsText(file);
            });
        }

        const btnOpenPrivacy = document.getElementById("btn-open-privacy");
        if (btnOpenPrivacy) {
            btnOpenPrivacy.addEventListener("click", () => {
                window.sfx.coin();
                const privModal = document.getElementById("screen-privacy");
                if (privModal) privModal.classList.remove("hidden");
            });
        }
        const closePrivacyHandler = () => {
            window.sfx.coin();
            const privModal = document.getElementById("screen-privacy");
            if (privModal) privModal.classList.add("hidden");
        };
        const btnClosePrivacy = document.getElementById("btn-close-privacy");
        if (btnClosePrivacy) btnClosePrivacy.addEventListener("click", closePrivacyHandler);
        const btnClosePrivacyX = document.getElementById("btn-close-privacy-x");
        if (btnClosePrivacyX) btnClosePrivacyX.addEventListener("click", closePrivacyHandler);

        const btnPrivacyConsent = document.getElementById("btn-privacy-consent");
        if (btnPrivacyConsent) {
            btnPrivacyConsent.addEventListener("click", () => {
                window.sfx.coin();
                this.manageAdPrivacyConsent();
            });
        }

        const closeSettingsHandler = () => {
            document.getElementById("screen-settings").classList.add("hidden");
            if (this.state === "settings_in_game") {
                this.state = "playing";
            } else {
                this.updateMapUI();
            }
        };
        document.getElementById("btn-close-settings").addEventListener("click", closeSettingsHandler);
        const btnCloseSettingsX = document.getElementById("btn-close-settings-x");
        if (btnCloseSettingsX) btnCloseSettingsX.addEventListener("click", closeSettingsHandler);

        // Player Profile Modal (Square Frame Button -> Avatar -> Name -> Attributes -> 30 Avatars)
        const openProfileHandler = () => {
            this.resetInputs();
            window.sfx.emerald();
            if (this.state === "playing") {
                this.state = "profile_in_game";
            }
            this.openProfileModal();
        };
        const btnMapProfile = document.getElementById("btn-map-profile");
        if (btnMapProfile) btnMapProfile.addEventListener("click", openProfileHandler);
        const btnHudProfile = document.getElementById("btn-hud-profile");
        if (btnHudProfile) btnHudProfile.addEventListener("click", openProfileHandler);

        const nameInput = document.getElementById("profile-name-input");
        if (nameInput) {
            nameInput.addEventListener("input", (e) => {
                const val = e.target.value.trim();
                this.playerName = val.length > 0 ? val : "Gölge Şövalye";
                this.saveProgress();
                this.updateProfileDisplay();
            });
        }

        const closeProfileHandler = () => {
            if (nameInput) {
                const val = nameInput.value.trim();
                this.playerName = val.length > 0 ? val : "Gölge Şövalye";
            }
            this.saveProgress();
            this.updateProfileDisplay();
            window.sfx.coin();
            document.getElementById("screen-profile").classList.add("hidden");
            if (this.state === "profile_in_game") {
                this.state = "playing";
            } else {
                this.updateMapUI();
            }
        };

        const btnCloseProfile = document.getElementById("btn-close-profile");
        if (btnCloseProfile) btnCloseProfile.addEventListener("click", closeProfileHandler);
        const btnCloseProfileX = document.getElementById("btn-close-profile-x");
        if (btnCloseProfileX) btnCloseProfileX.addEventListener("click", closeProfileHandler);

        const profileOverlay = document.getElementById("screen-profile");
        if (profileOverlay) {
            profileOverlay.addEventListener("click", (e) => {
                if (e.target === profileOverlay) {
                    closeProfileHandler();
                }
            });
        }

        // Square Human Tongue (👅) Language Selector Modal (6 Languages: RU, TR, EN, IT, ES, FR)
        const openLangHandler = () => {
            this.resetInputs();
            window.sfx.emerald();
            if (this.state === "playing") {
                this.state = "lang_in_game";
            }
            this.openLanguageModal();
        };
        const btnMapLang = document.getElementById("btn-map-lang");
        if (btnMapLang) btnMapLang.addEventListener("click", openLangHandler);
        const btnHudLang = document.getElementById("btn-hud-lang");
        if (btnHudLang) btnHudLang.addEventListener("click", openLangHandler);

        const closeLangHandler = () => {
            window.sfx.coin();
            document.getElementById("screen-language").classList.add("hidden");
            if (this.state === "lang_in_game") {
                this.state = "playing";
                this.updateHUD();
            } else {
                this.updateMapUI();
            }
        };
        const btnCloseLang = document.getElementById("btn-close-lang");
        if (btnCloseLang) btnCloseLang.addEventListener("click", closeLangHandler);
        const btnCloseLangX = document.getElementById("btn-close-lang-x");
        if (btnCloseLangX) btnCloseLangX.addEventListener("click", closeLangHandler);

        const langOverlay = document.getElementById("screen-language");
        if (langOverlay) {
            langOverlay.addEventListener("click", (e) => {
                if (e.target === langOverlay) {
                    closeLangHandler();
                }
            });
        }

        // 😡 Round Angry Man Button -> 15-Level Troll Mode Modal
        const openTrollHandler = () => {
            this.resetInputs();
            window.sfx.hurt();
            if (this.state === "playing") {
                this.state = "troll_in_game";
            }
            this.updateTrollMapUI();
            document.getElementById("screen-troll").classList.remove("hidden");
        };
        const btnMapTroll = document.getElementById("btn-map-troll");
        if (btnMapTroll) btnMapTroll.addEventListener("click", openTrollHandler);
        const btnHudTroll = document.getElementById("btn-hud-troll");
        if (btnHudTroll) btnHudTroll.addEventListener("click", openTrollHandler);

        const closeTrollHandler = () => {
            window.sfx.coin();
            document.getElementById("screen-troll").classList.add("hidden");
            if (this.state === "troll_in_game") {
                this.state = "playing";
            } else {
                this.updateMapUI();
            }
        };
        const btnCloseTroll = document.getElementById("btn-close-troll");
        if (btnCloseTroll) btnCloseTroll.addEventListener("click", closeTrollHandler);
        const btnCloseTrollX = document.getElementById("btn-close-troll-x");
        if (btnCloseTrollX) btnCloseTrollX.addEventListener("click", closeTrollHandler);
        const trollOverlay = document.getElementById("screen-troll");
        if (trollOverlay) {
            trollOverlay.addEventListener("click", (e) => {
                if (e.target === trollOverlay) closeTrollHandler();
            });
        }

        const btnPlayTroll = document.getElementById("btn-play-troll");
        if (btnPlayTroll) {
            btnPlayTroll.addEventListener("click", () => {
                window.sfx.init();
                this.isTrollMode = true;
                document.getElementById("screen-troll").classList.add("hidden");
                this.startLevel(this.selectedTrollLevel, true);
            });
        }

        const btnUnlockAllTroll = document.getElementById("btn-unlock-all-troll");
        if (btnUnlockAllTroll) {
            btnUnlockAllTroll.addEventListener("click", () => {
                this.unlockedTrollLevels = 15;
                this.saveProgress();
                window.sfx.emerald();
                this.updateTrollMapUI();
            });
        }

        document.getElementById("btn-resume").addEventListener("click", () => this.resumeGame());
        document.getElementById("btn-restart").addEventListener("click", () => {
            if (this.isTrollMode) {
                this.startLevel(this.selectedTrollLevel, true);
            } else {
                this.startLevel(this.selectedLevel, false);
            }
        });
        document.getElementById("btn-next-level").addEventListener("click", () => {
            if (this.isTrollMode) {
                const next = Math.min(14, this.selectedTrollLevel + 1);
                this.selectedTrollLevel = next;
                this.startLevel(next, true);
            } else {
                const next = Math.min(39, this.selectedLevel + 1);
                this.selectedLevel = next;
                this.startLevel(next, false);
            }
        });
        document.getElementById("btn-to-map").addEventListener("click", () => this.showMapScreen());
        this.applyLanguage();
        this.updateSettingsUI();
        this.updateProfileDisplay();
    }

    openLanguageModal() {
        const grid = document.getElementById("lang-options-grid");
        if (grid) {
            grid.innerHTML = "";

            // 0. Automatic Device / Phone Language Option (Default Active!)
            const detectedCode = this.detectDeviceLanguage();
            const detectedMeta = LANGUAGES.find((l) => l.code === detectedCode) || LANGUAGES[1];
            const autoCard = document.createElement("div");
            autoCard.className = `lang-option-card ${this.langAuto ? "selected" : ""}`;
            autoCard.style.gridColumn = "1 / -1";
            autoCard.innerHTML = `
                <div class="lang-option-square">📱</div>
                <div class="lang-option-text">
                    <span class="lang-option-native">📱 Otomatik — Telefon / Cihaz Dili (${detectedMeta.native})</span>
                    <span class="lang-option-sub">Cihazınızın diline göre otomatik değişir • Algılanan: ${detectedMeta.badge}</span>
                </div>
            `;
            autoCard.addEventListener("click", () => {
                this.langAuto = true;
                this.lang = this.detectDeviceLanguage();
                this.saveProgress();
                window.sfx.emerald();
                this.applyLanguage();
                this.openLanguageModal();
            });
            grid.appendChild(autoCard);

            LANGUAGES.forEach((l) => {
                const isSelected = !this.langAuto && l.code === this.lang;
                const card = document.createElement("div");
                card.className = `lang-option-card ${isSelected ? "selected" : ""}`;
                card.innerHTML = `
                    <div class="lang-option-square">${l.icon}</div>
                    <div class="lang-option-text">
                        <span class="lang-option-native">${l.native}</span>
                        <span class="lang-option-sub">👅 ${l.trName} (${l.badge})</span>
                    </div>
                `;
                card.addEventListener("click", () => {
                    this.langAuto = false;
                    this.lang = l.code;
                    this.saveProgress();
                    window.sfx.emerald();
                    this.applyLanguage();
                    this.openLanguageModal();
                });
                grid.appendChild(card);
            });
        }
        document.getElementById("screen-language").classList.remove("hidden");
    }

    applyLanguage() {
        if (this.langAuto) {
            this.lang = this.detectDeviceLanguage();
        }
        if (document.documentElement) {
            document.documentElement.lang = this.lang;
        }
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        const langMeta = LANGUAGES.find((l) => l.code === this.lang) || LANGUAGES[1];

        const setTxt = (id, txt) => {
            const el = document.getElementById(id);
            if (el && txt !== undefined) el.textContent = txt;
        };
        const setHtml = (id, html) => {
            const el = document.getElementById(id);
            if (el && html !== undefined) el.innerHTML = html;
        };

        setTxt("map-lang-code", this.langAuto ? `📱${langMeta.badge}` : langMeta.badge);
        setTxt("hud-lang-code", this.langAuto ? `📱${langMeta.badge}` : langMeta.badge);

        const charBtnMap = {
            tr: { open: "👤 KARAKTER DEĞİŞTİR (✪)", main: "👤 KARAKTER DEĞİŞTİR (✪ COİN)", hud: "👤 Karakter", title: "👤 KARAKTER DEĞİŞTİRME & GERÇEKÇİ KIYAFET / YÜZ STÜDYOSU", preview: "CANLI KIYAFET & YÜZ TİPİ ÖNİZLEME", close: "SEÇİMİ KAYDET VE DÖN ✓" },
            en: { open: "👤 CHANGE CHARACTER (✪)", main: "👤 CHANGE CHARACTER (✪ COIN)", hud: "👤 Character", title: "👤 CHARACTER & REALISTIC OUTFIT / FACE STUDIO", preview: "LIVE OUTFIT & FACE PREVIEW", close: "SAVE & RETURN ✓" },
            ru: { open: "👤 СМЕНИТЬ ГЕРОЯ (✪)", main: "👤 СМЕНИТЬ ГЕРОЯ (✪ COIN)", hud: "👤 Герой", title: "👤 СМЕНА ПЕРСОНАЖА, КОСТЮМА И ЛИЦА", preview: "ПРЕДПРОСМОТР КОСТЮМА И ЛИЦА", close: "СОХРАНИТЬ И ВЫЙТИ ✓" },
            it: { open: "👤 CAMBIA PERSONAGGIO (✪)", main: "👤 CAMBIA PERSONAGGIO (✪ COIN)", hud: "👤 Eroe", title: "👤 STUDIO PERSONAGGIO, ABITO E VOLTO", preview: "ANTEPRIMA ABITO E VOLTO", close: "SALVA E TORNA ✓" },
            es: { open: "👤 CAMBIAR PERSONAJE (✪)", main: "👤 CAMBIAR PERSONAJE (✪ COIN)", hud: "👤 Héroe", title: "👤 ESTUDIO DE PERSONAJE, TRAJE Y ROSTRO", preview: "VISTA PREVIA DE TRAJE Y ROSTRO", close: "GUARDAR Y VOLVER ✓" },
            fr: { open: "👤 CHANGER DE HÉROS (✪)", main: "👤 CHANGER DE HÉROS (✪ COIN)", hud: "👤 Héros", title: "👤 STUDIO DE PERSONNAGE, TENUE ET VISAGE", preview: "APERÇU TENUE ET VISAGE", close: "ENREGISTRER ET RETOUR ✓" },
            ko: { open: "👤 캐릭터 변경 (✪)", main: "👤 캐릭터 변경 (✪ 코인)", hud: "👤 캐릭터", title: "👤 캐릭터 의상 및 얼굴 변경 스튜디오", preview: "실시간 의상 & 얼굴 미리보기", close: "저장 후 돌아가기 ✓" },
            zh: { open: "👤 更换角色 (✪)", main: "👤 更换角色 (✪ 金币)", hud: "👤 角色", title: "👤 角色服装与脸型更换工作室", preview: "服装与脸型实时预览", close: "保存并返回 ✓" },
            ja: { open: "👤 キャラ変更 (✪)", main: "👤 キャラ変更 (✪ コイン)", hud: "👤 キャラ", title: "👤 キャラクター衣装＆顔タイプ変更スタジオ", preview: "衣装＆顔ライブプレビュー", close: "保存して戻る ✓" }
        };
        const cDict = charBtnMap[this.lang] || charBtnMap.tr;
        setTxt("btn-open-character", cDict.open);
        setTxt("btn-character-main", cDict.main);
        setTxt("btn-hud-character", cDict.hud);
        setTxt("char-modal-title", cDict.title);
        setTxt("char-preview-title", cDict.preview);
        setTxt("btn-close-character", cDict.close);

        document.title = d.gameTitle;
        setTxt("map-game-title", d.gameTitle);
        setTxt("map-season-badge", d.seasonBadge);
        setTxt("map-profile-tag", d.profileTag);
        setTxt("hud-profile-tag", d.hudProfileTag);
        setTxt("map-emerald-label", d.emeraldLabel);
        setTxt("hud-emerald-label", d.hudEmeraldLabel);
        setTxt("map-coin-label", d.coinLabel);
        setTxt("map-hearts-text", d.heartsText);
        setTxt("map-troll-badge", d.trollBadge);
        setTxt("hud-troll-badge", d.trollBadge);

        setTxt("btn-open-customize", d.btnOpenCustomize);
        setTxt("btn-hud-customize", d.btnHudCustomize);
        setTxt("btn-open-shop", d.btnOpenShop);
        setTxt("btn-play-level", d.btnPlayLevel);
        setTxt("btn-customize-main", d.btnCustomizeMain);
        setTxt("btn-unlock-all", d.btnUnlockAll);
        setHtml("map-controls-hint", d.controlsHint);
        if (d.previewFeatures) {
            setHtml("preview-features", d.previewFeatures);
        }

        setTxt("cust-modal-title", d.custTitle);
        setHtml("cust-modal-sub", d.custSub);
        setTxt("cust-preview-title", d.custPreview);
        setTxt("btn-close-customize", d.btnCloseCustomize);

        setTxt("shop-modal-title", d.shopTitle);
        setTxt("shop-modal-sub", d.shopSub);
        setTxt("btn-close-shop", d.btnCloseShop);

        setTxt("settings-modal-title", d.settingsTitle);
        setTxt("settings-subtitle", d.settingsSub);
        setTxt("settings-sfx-label", d.sfxLabel);
        setTxt("settings-music-label", d.musicLabel);
        setTxt("settings-fps-label", d.fpsLabel);
        setTxt("settings-fps-text", d.fpsText);
        setTxt("btn-settings-restart-level", d.btnRestartLevel);
        setTxt("btn-settings-reset-all", d.btnResetAll);
        setTxt("btn-close-settings", d.btnCloseSettings);

        setTxt("lang-modal-title", d.langModalTitle);
        setTxt("lang-modal-sub", d.langModalSub);
        setTxt("btn-close-lang", d.btnCloseLang);

        setTxt("profile-name-label", d.profileNameLabel);
        setTxt("profile-attr-title", d.profileAttrTitle);
        setTxt("profile-picker-title", d.profilePickerTitle);
        setTxt("btn-close-profile", d.btnCloseProfile);

        setTxt("troll-modal-pill", d.trollModalPill);
        setTxt("troll-modal-title", d.trollModalTitle);
        setHtml("troll-modal-sub", d.trollModalSub);
        setTxt("btn-play-troll", d.btnPlayTroll);
        setTxt("btn-unlock-all-troll", d.btnUnlockAllTroll);
        setTxt("btn-close-troll", d.btnCloseTroll);

        setTxt("modal-stat-emerald-label", d.emeraldLabel);
        setTxt("modal-stat-coin-label", d.coinLabel);
        setTxt("modal-stat-score-label", d.scoreLabel);
        setTxt("btn-resume", d.btnResume);
        setTxt("btn-next-level", d.btnNextLevel);
        setTxt("btn-modal-customize", d.btnOpenCustomize);
        setTxt("btn-restart", d.btnRestart);
        setTxt("btn-to-map", d.btnToMap);
        setTxt("hud-checkpoint", d.checkpointActive);

        if (this.state === "paused") {
            setTxt("modal-title", d.pauseTitle);
            setTxt("modal-subtitle", d.pauseSub);
        } else if (this.state === "gameover") {
            setTxt("modal-title", d.gameOverTitle);
            setTxt("modal-subtitle", d.gameOverSub);
        } else if (this.state === "victory") {
            setTxt("modal-title", d.victoryTitle);
        }

        if (d.tabs) {
            const tabBtns = document.querySelectorAll(".cust-tab");
            tabBtns.forEach((btn, idx) => {
                if (d.tabs[idx]) btn.textContent = d.tabs[idx];
            });
        }

        const activeIdx = this.isTrollMode ? this.selectedTrollLevel : this.selectedLevel;
        const activeLoc = this.getLocalizedLevelInfo(activeIdx, this.isTrollMode);
        setTxt("hud-level-name", activeLoc.name);

        this._lastHudKey = null;
        this.updateSettingsUI();
        this.updateProfileDisplay();
        this.updateMapUI();
        this.updateTrollMapUI();
        if (this.player) {
            this.updateHUD();
        }
    }

    updateProfileDisplay() {
        const av = PROFILE_AVATARS.find((a) => a.id === this.selectedAvatarId) || PROFILE_AVATARS[0];

        const applyFrame = (el) => {
            if (!el) return;
            el.textContent = av.icon;
            el.style.background = av.bg;
            el.style.borderColor = av.border;
        };

        applyFrame(document.getElementById("map-profile-avatar"));
        applyFrame(document.getElementById("hud-profile-avatar"));
        applyFrame(document.getElementById("profile-hero-avatar"));

        const mapName = document.getElementById("map-profile-name");
        if (mapName) mapName.textContent = this.playerName;
        const hudName = document.getElementById("hud-profile-name");
        if (hudName) hudName.textContent = this.playerName;
        const heroTitle = document.getElementById("profile-hero-title");
        if (heroTitle) heroTitle.textContent = `${av.title} • Seviye ${this.unlockedLevels}`;
    }

    openProfileModal() {
        this.updateProfileDisplay();
        this.updateCloudStatusUI();

        const nameInput = document.getElementById("profile-name-input");
        if (nameInput) {
            nameInput.value = this.playerName;
        }

        // Populate Character Attributes (Karakter Özellikleri)
        const upg = this.getPlayerUpgrades();
        const maxHearts = 3 + upg.extraHearts;
        const maxJumps = 2 + (upg.extraJumps || 0);
        const speedPct = upg.speedBonus ? "%118 (Hiper-Hız)" : "%100 (Standart)";

        const skinTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "skin" && i.value === this.equippedSkin) || {}).title || "Gölge Mavisi";
        const helmetTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "helmet" && i.value === this.equippedHelmet) || {}).title || "Şövalye Tepeliği";
        const gearTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "backGear" && i.value === this.equippedBackGear) || {}).title || "Plazma Katana";
        const visorTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "visor" && i.value === this.equippedVisor) || {}).title || "Klasik Vizör";
        const auraTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "aura" && i.value === this.equippedAura) || {}).title || "Aura Yok";

        const specialPowers = ["Çift/Üçlü Zıplama", "Duvar Zıplaması"];
        if (upg.startShield) specialPowers.push("🛡 Başlangıç Kalkanı");
        if (upg.startFire) specialPowers.push("🔥 Plazma Ateşi");
        if (upg.hasMagnet) specialPowers.push("🧲 Zümrüt Mıknatısı");

        const totalStars = this.starsPerLevel.reduce((a, b) => a + b, 0);

        const attrGrid = document.getElementById("profile-attributes-grid");
        if (attrGrid) {
            attrGrid.innerHTML = `
                <div class="profile-stat-item">
                    <span>❤️ MAKSİMUM CAN & ZIRH</span>
                    <strong>${"♥".repeat(maxHearts)} (${maxHearts} Can) • ${skinTitle}</strong>
                </div>
                <div class="profile-stat-item">
                    <span>⚡ HIZ & ZIPLAMA YETENEĞİ</span>
                    <strong>Koşu: ${speedPct} • ${maxJumps}x Zıplama</strong>
                </div>
                <div class="profile-stat-item">
                    <span>⚔️ MİĞFER & SIRT SİLAHI</span>
                    <strong>${helmetTitle} • ${gearTitle}</strong>
                </div>
                <div class="profile-stat-item">
                    <span>✨ VİZÖR & AURA EFEKTİ</span>
                    <strong>${visorTitle} • ${auraTitle}</strong>
                </div>
                <div class="profile-stat-item">
                    <span>🔥 AKTİF ÖZEL GÜÇLER</span>
                    <strong>${specialPowers.join(", ")}</strong>
                </div>
                <div class="profile-stat-item">
                    <span>🏆 İLERLEME & SERVET</span>
                    <strong>Bölüm: ${this.unlockedLevels}/40 • ★ ${totalStars}/120 • ${this.walletEmeralds} ❖ • ${this.walletCoins} ◆</strong>
                </div>
            `;
        }

        // Populate 30 Distinct Profile Pictures
        const avatarsGrid = document.getElementById("profile-avatars-grid");
        if (avatarsGrid) {
            avatarsGrid.innerHTML = "";
            PROFILE_AVATARS.forEach((av) => {
                const card = document.createElement("div");
                const isSelected = av.id === this.selectedAvatarId;
                card.className = `avatar-option-card ${isSelected ? "selected" : ""}`;
                card.style.background = av.bg;
                if (!isSelected) {
                    card.style.borderColor = av.border;
                }
                card.title = av.title;
                card.innerHTML = `
                    <div class="avatar-option-icon">${av.icon}</div>
                    <div class="avatar-option-label">${av.title}</div>
                `;
                card.addEventListener("click", () => {
                    this.selectedAvatarId = av.id;
                    this.saveProgress();
                    window.sfx.emerald();
                    this.openProfileModal();
                });
                avatarsGrid.appendChild(card);
            });
        }

        document.getElementById("screen-profile").classList.remove("hidden");
    }

    updateSettingsUI() {
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        const sfxText = document.getElementById("sfx-status-text");
        if (sfxText) {
            sfxText.textContent = window.sfx.sfxMuted ? `${d.offText} 🔇` : `${d.onText} 🔊`;
            sfxText.style.color = window.sfx.sfxMuted ? "#ff2a85" : "#06d6a0";
        }
        const musicText = document.getElementById("music-status-text");
        if (musicText) {
            musicText.textContent = window.sfx.musicMuted ? `${d.offText} 🔇` : `${d.onText} 🎵`;
            musicText.style.color = window.sfx.musicMuted ? "#ff2a85" : "#06d6a0";
        }
        const muteBtn = document.getElementById("btn-mute");
        if (muteBtn) {
            muteBtn.textContent = (window.sfx.sfxMuted && window.sfx.musicMuted) ? "🔇" : "🔊";
        }
        try {
            const capAdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
            if (this.adMobInitialized && capAdMob && typeof capAdMob.setApplicationMuted === "function") {
                capAdMob.setApplicationMuted({
                    muted: Boolean(window.sfx.sfxMuted && window.sfx.musicMuted)
                });
            }
        } catch (e) {}
    }

    openCustomizeStudio() {
        this.previewDummy = new window.Player(0, 0, this.getPlayerUpgrades());
        this.previewDummy.vx = 2.5;
        this.previewDummy.onGround = true;
        this.renderCustomizeItems();
        document.getElementById("screen-customize").classList.remove("hidden");
    }

    renderCustomizeItems() {
        document.getElementById("cust-wallet-emeralds").textContent = `${this.walletEmeralds} ❖  |  ${this.walletCoins} ◆`;
        const container = document.getElementById("cust-items-container");
        container.innerHTML = "";

        if (this.activeCustTab === "upgrade") {
            SHOP_CATALOG.forEach((item) => {
                const isOwned = this.ownedItems.includes(item.id);
                const canAfford = this.walletCoins >= item.cost;
                const card = document.createElement("div");
                card.className = `shop-card ${isOwned ? "owned" : ""}`;

                let btnLabel = `SATIN AL (${item.cost} ◆ Kristal)`;
                let btnClass = "shop-buy-btn";
                let disabled = false;

                if (isOwned) {
                    btnLabel = "✓ AKTİF GÜÇLENDİRME";
                    btnClass += " equipped";
                    disabled = true;
                } else if (!canAfford) {
                    disabled = true;
                }

                card.innerHTML = `
                    <div>
                        <div class="shop-card-top">
                            <span class="shop-icon">${item.icon}</span>
                            <h4>${item.title}</h4>
                        </div>
                        <p>${item.desc}</p>
                    </div>
                    <button class="${btnClass}" ${disabled ? "disabled" : ""}>${btnLabel}</button>
                `;

                card.querySelector("button").addEventListener("click", () => {
                    if (!isOwned && this.walletCoins >= item.cost) {
                        this.walletCoins -= item.cost;
                        this.ownedItems.push(item.id);
                        window.sfx.buy();
                        this.saveProgress();
                        this.renderCustomizeItems();
                    }
                });
                container.appendChild(card);
            });
            return;
        }

        const items = CUSTOMIZE_CATALOG.filter((item) => item.category === this.activeCustTab);

        items.forEach((item) => {
            const isOwned = this.ownedItems.includes(item.id) || item.cost === 0;
            let isEquipped = false;
            if (item.category === "helmet") isEquipped = this.equippedHelmet === item.value;
            if (item.category === "backGear") isEquipped = this.equippedBackGear === item.value;
            if (item.category === "skin") isEquipped = this.equippedSkin === item.value;
            if (item.category === "visor") isEquipped = this.equippedVisor === item.value;
            if (item.category === "aura") isEquipped = this.equippedAura === item.value;
            if (item.category === "cape") isEquipped = this.equippedCape === item.value;

            const canAfford = this.walletEmeralds >= item.cost;

            const card = document.createElement("div");
            card.className = `shop-card ${isOwned ? "owned" : ""}`;

            let btnLabel = `AÇ (${item.cost} ❖ Zümrüt)`;
            let btnClass = "shop-buy-btn emerald-buy";
            let disabled = false;

            if (isEquipped) {
                btnLabel = "✓ KUŞANILDI";
                btnClass = "shop-buy-btn equipped";
                disabled = true;
            } else if (isOwned) {
                btnLabel = "KUŞAN";
            } else if (!canAfford) {
                disabled = true;
            }

            card.innerHTML = `
                <div>
                    <div class="shop-card-top">
                        <span class="shop-icon">${item.icon}</span>
                        <h4>${item.title}</h4>
                    </div>
                    <p>${item.desc}</p>
                </div>
                <button class="${btnClass}" ${disabled ? "disabled" : ""}>${btnLabel}</button>
            `;

            const btn = card.querySelector("button");
            btn.addEventListener("click", () => {
                if (!isOwned) {
                    if (this.walletEmeralds < item.cost) return;
                    this.walletEmeralds -= item.cost;
                    this.ownedItems.push(item.id);
                    window.sfx.emerald();
                } else {
                    window.sfx.coin();
                }

                if (item.category === "helmet") this.equippedHelmet = item.value;
                if (item.category === "backGear") this.equippedBackGear = item.value;
                if (item.category === "skin") this.equippedSkin = item.value;
                if (item.category === "visor") this.equippedVisor = item.value;
                if (item.category === "aura") this.equippedAura = item.value;
                if (item.category === "cape") this.equippedCape = item.value;

                if (this.previewDummy) {
                    this.previewDummy.skinId = this.equippedSkin;
                    this.previewDummy.helmetId = this.equippedHelmet;
                    this.previewDummy.backGearId = this.equippedBackGear;
                    this.previewDummy.visorId = this.equippedVisor;
                    this.previewDummy.auraId = this.equippedAura;
                    this.previewDummy.capeColor = this.equippedCape;
                }

                this.saveProgress();
                this.renderCustomizeItems();
            });

            container.appendChild(card);
        });

        // Update Summary Text
        const skinTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "skin" && i.value === this.equippedSkin) || {}).title || "";
        const helmetTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "helmet" && i.value === this.equippedHelmet) || {}).title || "";
        const gearTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "backGear" && i.value === this.equippedBackGear) || {}).title || "";
        const auraTitle = (CUSTOMIZE_CATALOG.find((i) => i.category === "aura" && i.value === this.equippedAura) || {}).title || "";
        document.getElementById("preview-summary-text").textContent = `${skinTitle} • ${helmetTitle} • ${gearTitle} • ${auraTitle}`;
    }

    drawCustomizePreview() {
        const modal = document.getElementById("screen-customize");
        if (!this.previewCtx || modal.classList.contains("hidden") || !this.previewDummy) return;

        const ctx = this.previewCtx;
        const w = this.previewCanvas.width;
        const h = this.previewCanvas.height;

        ctx.clearRect(0, 0, w, h);

        // Glowing Hologram Pedestal
        ctx.save();
        ctx.strokeStyle = "#06d6a0";
        ctx.shadowColor = "#06d6a0";
        ctx.shadowBlur = 16;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(w / 2, h - 38, 56, 12, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(6, 214, 160, 0.15)";
        ctx.beginPath();
        ctx.ellipse(w / 2, h - 38, 46, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Animate & Draw Scaled-Up Character cleanly fitted inside the preview frame
        this.previewDummy.animTime += 0.14;
        ctx.save();
        ctx.translate(w / 2, h - 46);
        ctx.scale(1.85, 1.85);
        this.previewDummy.x = -this.previewDummy.w / 2;
        this.previewDummy.y = -this.previewDummy.h;
        this.previewDummy.draw(ctx);
        ctx.restore();
    }

    openCharacterStudio() {
        this.charPreviewDummy = new window.Player(0, 0, this.getPlayerUpgrades());
        this.charPreviewDummy.vx = 2.2;
        this.charPreviewDummy.onGround = true;
        this.renderCharacterItems();
        const modal = document.getElementById("screen-character");
        if (modal) modal.classList.remove("hidden");
    }

    renderCharacterItems() {
        const walletEl = document.getElementById("char-wallet-goldcoins");
        if (walletEl) walletEl.textContent = this.walletGoldCoins || 0;
        const container = document.getElementById("char-items-container");
        if (!container) return;
        container.innerHTML = "";

        HERO_CHARACTERS_CATALOG.forEach((item) => {
            const isOwned = (this.ownedCharacters && this.ownedCharacters.includes(item.id)) || item.cost === 0;
            const isEquipped = (this.equippedHeroChar || "default") === item.id;
            const canAfford = (this.walletGoldCoins || 0) >= item.cost;

            const card = document.createElement("div");
            card.className = `shop-card ${isOwned ? "owned" : ""}`;
            if (isEquipped) {
                card.style.borderColor = "#ffd166";
                card.style.boxShadow = "0 0 18px rgba(255, 209, 102, 0.35)";
            }

            let btnLabel = `SATIN AL (${item.cost} ✪ Coin)`;
            let btnClass = "shop-buy-btn";
            let disabled = false;

            if (isEquipped) {
                btnLabel = "✓ GİYİLDİ (AKTİF KARAKTER)";
                btnClass = "shop-buy-btn equipped";
                disabled = true;
            } else if (isOwned) {
                btnLabel = "KIYAFETİ & YÜZÜ GİYDİR";
            } else if (!canAfford) {
                disabled = true;
            }

            card.innerHTML = `
                <div>
                    <div class="shop-card-top">
                        <span class="shop-icon">${item.icon}</span>
                        <div>
                            <h4 style="color:#ffd166;">${item.title}</h4>
                            <small style="color:#06d6a0; font-weight:700; display:block; margin-top:2px;">${item.cost === 0 ? "ÜCRETSİZ" : item.cost + " ✪ Coin"}</small>
                        </div>
                    </div>
                    <p style="color:#ff9ebb; font-weight:700; font-size:11.5px; margin-bottom:4px;">👤 ${item.faceDesc}</p>
                    <p>${item.desc}</p>
                </div>
                <button class="${btnClass}" ${disabled ? "disabled" : ""}>${btnLabel}</button>
            `;

            const btn = card.querySelector("button");
            btn.addEventListener("click", () => {
                if (!isOwned) {
                    if ((this.walletGoldCoins || 0) < item.cost) return;
                    this.walletGoldCoins -= item.cost;
                    if (!this.ownedCharacters) this.ownedCharacters = ["default"];
                    this.ownedCharacters.push(item.id);
                    window.sfx.buy();
                } else {
                    window.sfx.coin();
                }

                this.equippedHeroChar = item.id;
                if (this.charPreviewDummy) {
                    this.charPreviewDummy.heroCharId = item.id;
                }
                if (this.previewDummy) {
                    this.previewDummy.heroCharId = item.id;
                }
                if (this.player) {
                    this.player.heroCharId = item.id;
                }

                this.saveProgress();
                this.renderCharacterItems();
                this.updateMapUI();
            });

            // Hovering or clicking the card also previews the character & face live!
            card.addEventListener("mouseenter", () => {
                if (this.charPreviewDummy) {
                    this.charPreviewDummy.heroCharId = item.id;
                }
                const sumEl = document.getElementById("char-preview-summary");
                if (sumEl) {
                    sumEl.textContent = `${item.title} • ${item.faceDesc}`;
                }
            });
            card.addEventListener("mouseleave", () => {
                const activeItem = HERO_CHARACTERS_CATALOG.find((c) => c.id === (this.equippedHeroChar || "default")) || HERO_CHARACTERS_CATALOG[0];
                if (this.charPreviewDummy) {
                    this.charPreviewDummy.heroCharId = activeItem.id;
                }
                const sumEl = document.getElementById("char-preview-summary");
                if (sumEl) {
                    sumEl.textContent = `${activeItem.title} • ${activeItem.faceDesc}`;
                }
            });

            container.appendChild(card);
        });

        const activeItem = HERO_CHARACTERS_CATALOG.find((c) => c.id === (this.equippedHeroChar || "default")) || HERO_CHARACTERS_CATALOG[0];
        const sumEl = document.getElementById("char-preview-summary");
        if (sumEl) {
            sumEl.textContent = `${activeItem.title} • ${activeItem.faceDesc}`;
        }
    }

    drawCharacterPreview() {
        const modal = document.getElementById("screen-character");
        if (!this.charPreviewCtx || !modal || modal.classList.contains("hidden") || !this.charPreviewDummy) return;

        const ctx = this.charPreviewCtx;
        const w = this.charPreviewCanvas.width;
        const h = this.charPreviewCanvas.height;

        ctx.clearRect(0, 0, w, h);

        // Golden Imperial Pedestal
        ctx.save();
        ctx.strokeStyle = "#ffd166";
        ctx.shadowColor = "#ffd166";
        ctx.shadowBlur = 16;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(w / 2, h - 34, 62, 13, 0, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 209, 102, 0.16)";
        ctx.beginPath();
        ctx.ellipse(w / 2, h - 34, 50, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Zoomed-In Character & Face Preview (2.25x scale so facial hair, monocle, pearl earring, and headgear are super clear)
        this.charPreviewDummy.animTime += 0.11;
        ctx.save();
        ctx.translate(w / 2, h - 40);
        ctx.scale(2.25, 2.25);
        this.charPreviewDummy.x = -this.charPreviewDummy.w / 2;
        this.charPreviewDummy.y = -this.charPreviewDummy.h;
        this.charPreviewDummy.draw(ctx);
        ctx.restore();
    }

    openShop() {
        document.getElementById("shop-wallet-coins").textContent = this.walletCoins;
        const container = document.getElementById("shop-items-container");
        container.innerHTML = "";

        SHOP_CATALOG.forEach((item) => {
            const isOwned = this.ownedItems.includes(item.id);
            const canAfford = this.walletCoins >= item.cost;

            const card = document.createElement("div");
            card.className = `shop-card ${isOwned ? "owned" : ""}`;

            let btnLabel = `SATIN AL (${item.cost} ◆)`;
            let btnClass = "shop-buy-btn";
            let disabled = false;

            if (isOwned) {
                btnLabel = "✓ AKTİF GÜÇLENDİRME";
                btnClass += " equipped";
                disabled = true;
            } else if (!canAfford) {
                disabled = true;
            }

            card.innerHTML = `
                <div>
                    <div class="shop-card-top">
                        <span class="shop-icon">${item.icon}</span>
                        <h4>${item.title}</h4>
                    </div>
                    <p>${item.desc}</p>
                </div>
                <button class="${btnClass}" ${disabled ? "disabled" : ""}>${btnLabel}</button>
            `;

            const btn = card.querySelector("button");
            btn.addEventListener("click", () => {
                if (!isOwned && this.walletCoins >= item.cost) {
                    this.walletCoins -= item.cost;
                    this.ownedItems.push(item.id);
                    window.sfx.buy();
                    this.saveProgress();
                    this.openShop();
                }
            });

            container.appendChild(card);
        });

        document.getElementById("screen-shop").classList.remove("hidden");
    }

    updateMapUI() {
        document.getElementById("map-wallet-coins").textContent = this.walletCoins;
        document.getElementById("map-wallet-emeralds").textContent = this.walletEmeralds;
        const mapGoldEl = document.getElementById("map-wallet-goldcoins");
        if (mapGoldEl) mapGoldEl.textContent = this.walletGoldCoins || 0;

        document.querySelectorAll("#level-nodes-container .map-node").forEach((node, idx) => {
            node.classList.toggle("unlocked", idx < this.unlockedLevels);
            node.classList.toggle("selected", idx === this.selectedLevel);
            const labelEl = node.querySelector(".node-label");
            if (labelEl) {
                labelEl.textContent = this.getLocalizedLevelInfo(idx, false).shortName;
            }
            const stars = this.starsPerLevel[idx] || 0;
            const starEl = document.getElementById(`stars-${idx}`);
            if (starEl) {
                starEl.textContent = "★".repeat(stars) + "☆".repeat(3 - stars);
            }
        });

        const info = this.getLocalizedLevelInfo(this.selectedLevel, false);
        document.getElementById("preview-world").textContent = info.world;
        document.getElementById("preview-title").textContent = info.name;
        document.getElementById("preview-desc").textContent = info.desc;
    }

    startLevel(levelIdx, isTroll = this.isTrollMode) {
        this.isTrollMode = Boolean(isTroll);
        let data;
        if (this.isTrollMode) {
            this.selectedTrollLevel = levelIdx;
            data = window.createTrollLevelData(levelIdx);
        } else {
            this.selectedLevel = levelIdx;
            data = window.createLevelData(levelIdx);
        }
        this.levelInfo = data.info;
        this.solids = data.solids;
        this.hazards = (data.hazards || []).map((hz, idx) => ({
            ...hz,
            hazardKind: hz.hazardKind || (idx % 2 === 1 ? "electric" : "lava"),
            animSeed: idx * 1.73 + 0.4
        }));
        this.signs = data.signs;
        this.portal = data.portal;
        this.teleporters = data.teleporters || [];
        this.gravityZones = data.gravityZones || [];
        this.uraniumBombs = [];
        this.uraniumExplosions = [];
        this.pendingTrollDeathTimer = 0;

        this.checkpoints = (data.checkpoints || []).map((cp) => ({
            x: cp.x,
            y: cp.y,
            w: 36,
            h: 64,
            activated: false
        }));
        this.activeCheckpoint = null;

        this.mysteryBlocks = data.mysteryBlocks.map((b) => ({
            x: b.x,
            y: b.y,
            baseY: b.y,
            w: window.TILE_SIZE,
            h: window.TILE_SIZE,
            content: b.content,
            hit: false,
            bounce: 0,
            isMystery: true
        }));

        this.movingPlatforms = data.movingPlatforms.map((mp) => ({
            ...mp,
            t: 0,
            currentVx: 0
        }));

        this.crumblePlatforms = (data.crumblePlatforms || []).map((cp) => ({
            ...cp,
            state: "idle",
            timer: 0,
            isCrumble: true
        }));

        this.saws = (data.saws || []).map((s) => ({
            ...s,
            t: Math.random() * Math.PI * 2,
            angle: 0
        }));

        this.stalactites = (data.stalactites || []).map((st) => ({
            x: st.x,
            y: st.y,
            baseY: st.y,
            w: 28,
            h: 46,
            state: "hanging",
            vy: 0,
            respawnTimer: 0
        }));

        this.coins = data.coins.map((c) => ({
            x: c.x,
            y: c.y,
            type: c.type,
            isTrollTeleport: Boolean(c.isTrollTeleport),
            collected: false,
            anim: Math.random() * 6
        }));

        this.totalLevelEmeralds = this.coins.filter((c) => c.type === "emerald" && !c.isTrollTeleport).length;
        this.collectedEmeralds = 0;

        this.enemies = data.enemies.map((e) => new window.Enemy(e, levelIdx));
        this.boss = data.bossConfig ? new window.AbyssBoss(data.bossConfig) : null;

        this.player = new window.Player(120, 12 * window.TILE_SIZE - 60, this.getPlayerUpgrades());
        this.player.prevX = this.player.x;
        this.player.prevY = this.player.y;
        this.player.inTeleporter = false;
        this.resetInputs();
        if (document.activeElement && document.activeElement.tagName === "BUTTON") {
            document.activeElement.blur();
        }
        this.powerUps = [];
        this.fireballs = [];
        this.particles = [];
        this.floatingTexts = [];

        this.collectedCoins = 0;
        this.collectedGoldCoins = 0;
        this.reviveUsedInLevel = false;
        this.doubleRewardUsedInLevel = false;
        this.score = 0;
        this.camera.x = 0;
        this.camera.y = 0;
        this.camera.prevX = 0;
        this.camera.prevY = 0;
        this.camera.shake = 0;
        this.accumulator = 0;
        this.lastTime = performance.now();

        ["screen-map", "screen-shop", "screen-customize", "screen-character", "screen-modal", "screen-settings", "screen-profile", "screen-language", "screen-troll", "screen-ad-overlay"].forEach((id) => {
            const el = document.getElementById(id);
            if (el) el.classList.add("hidden");
        });
        document.getElementById("hud").classList.remove("hidden");
        document.getElementById("touch-controls").classList.remove("hidden");
        document.getElementById("hud-checkpoint").classList.add("hidden");
        const locInfo = this.getLocalizedLevelInfo(levelIdx, this.isTrollMode);
        document.getElementById("hud-level-name").textContent = locInfo.name;

        const bossHud = document.getElementById("boss-hud");
        if (this.boss) {
            bossHud.classList.remove("hidden");
            document.getElementById("boss-hud-name").textContent = locInfo.shortName.toUpperCase();
        } else {
            bossHud.classList.add("hidden");
        }

        this.state = "playing";
        window.sfx.startBGM(this.levelInfo.isBossLevel);
        this.updateHUD();
    }

    handlePlayerDeath() {
        this.resetInputs();
        if (this.activeCheckpoint) {
            window.sfx.checkpoint();
            const upgrades = this.getPlayerUpgrades();
            this.player.x = this.activeCheckpoint.x;
            this.player.y = this.activeCheckpoint.y - 10;
            this.player.prevX = this.player.x;
            this.player.prevY = this.player.y;
            this.player.vx = 0;
            this.player.vy = 0;
            this.player.hp = this.player.maxHp;
            this.player.invulnTimer = 90;
            if (upgrades.startShield) this.player.hasShield = true;
            if (upgrades.startFire) this.player.hasFire = true;
            this.spawnParticles(this.player.x + 16, this.player.y + 20, 28, "#06d6a0", 5);
            this.floatingTexts.push(new window.FloatingText(this.player.x + 16, this.player.y - 15, "🚩 KAYIT NOKTASINDAN DOĞDUN!", "#06d6a0"));
            return;
        }
        this.triggerGameOver();
    }

    showMapScreen() {
        this.resetInputs();
        this.state = "map";
        window.sfx.stopBGM();
        document.getElementById("hud").classList.add("hidden");
        document.getElementById("touch-controls").classList.add("hidden");
        document.getElementById("screen-modal").classList.add("hidden");
        document.getElementById("screen-map").classList.remove("hidden");
        this.updateMapUI();
    }

    pauseGame() {
        this.resetInputs();
        this.state = "paused";
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        const modal = document.getElementById("screen-modal");
        document.getElementById("modal-title").textContent = d.pauseTitle;
        document.getElementById("modal-subtitle").textContent = d.pauseSub;
        document.getElementById("modal-stats").classList.add("hidden");
        document.getElementById("btn-resume").classList.remove("hidden");
        document.getElementById("btn-next-level").classList.add("hidden");
        const revBtn = document.getElementById("btn-ad-revive");
        if (revBtn) revBtn.classList.add("hidden");
        const dblBtn = document.getElementById("btn-ad-double");
        if (dblBtn) dblBtn.classList.add("hidden");
        modal.classList.remove("hidden");
    }

    resumeGame() {
        this.resetInputs();
        this.state = "playing";
        document.getElementById("screen-modal").classList.add("hidden");
    }

    triggerGameOver() {
        this.resetInputs();
        this.state = "gameover";
        window.sfx.hurt();
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        const modal = document.getElementById("screen-modal");
        document.getElementById("modal-title").textContent = d.gameOverTitle;
        document.getElementById("modal-subtitle").textContent = d.gameOverSub;
        document.getElementById("modal-stats").classList.remove("hidden");
        document.getElementById("stat-emeralds").textContent = `${this.collectedEmeralds}/${this.totalLevelEmeralds}`;
        document.getElementById("stat-coins").textContent = this.collectedCoins;
        document.getElementById("stat-score").textContent = this.score;
        document.getElementById("btn-resume").classList.add("hidden");
        document.getElementById("btn-next-level").classList.add("hidden");
        const dblBtn = document.getElementById("btn-ad-double");
        if (dblBtn) dblBtn.classList.add("hidden");
        const revBtn = document.getElementById("btn-ad-revive");
        if (revBtn) {
            if (!this.reviveUsedInLevel) {
                revBtn.classList.remove("hidden");
            } else {
                revBtn.classList.add("hidden");
            }
        }
        modal.classList.remove("hidden");
    }

    triggerVictory() {
        this.resetInputs();
        this.state = "victory";
        window.sfx.victory();
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;

        const earnedStars = this.player.hp >= 3 ? 3 : (this.player.hp === 2 ? 2 : 1);
        if (this.isTrollMode) {
            this.starsPerTrollLevel[this.selectedTrollLevel] = Math.max(this.starsPerTrollLevel[this.selectedTrollLevel] || 0, earnedStars);
            if (this.selectedTrollLevel + 1 >= this.unlockedTrollLevels && this.unlockedTrollLevels < 15) {
                this.unlockedTrollLevels = this.selectedTrollLevel + 2;
            }
        } else {
            this.starsPerLevel[this.selectedLevel] = Math.max(this.starsPerLevel[this.selectedLevel] || 0, earnedStars);
            if (this.selectedLevel + 1 >= this.unlockedLevels && this.unlockedLevels < 40) {
                this.unlockedLevels = this.selectedLevel + 2;
            }
        }
        this.saveProgress();

        const modal = document.getElementById("screen-modal");
        const isFinal = this.isTrollMode ? (this.selectedTrollLevel === 14) : (this.selectedLevel === 39);
        document.getElementById("modal-title").textContent = isFinal ? d.finalVictoryTitle : d.victoryTitle;
        document.getElementById("modal-subtitle").textContent = `${"★".repeat(earnedStars)}${"☆".repeat(3 - earnedStars)}`;
        document.getElementById("modal-stats").classList.remove("hidden");
        document.getElementById("stat-emeralds").textContent = `${this.collectedEmeralds}/${this.totalLevelEmeralds} (${this.walletEmeralds})`;
        document.getElementById("stat-coins").textContent = this.collectedCoins;
        document.getElementById("stat-score").textContent = this.score;
        document.getElementById("btn-resume").classList.add("hidden");
        const revBtn = document.getElementById("btn-ad-revive");
        if (revBtn) revBtn.classList.add("hidden");
        const dblBtn = document.getElementById("btn-ad-double");
        if (dblBtn) {
            if (!this.doubleRewardUsedInLevel) {
                dblBtn.classList.remove("hidden");
            } else {
                dblBtn.classList.add("hidden");
            }
        }

        const nextBtn = document.getElementById("btn-next-level");
        const hasNext = this.isTrollMode ? (this.selectedTrollLevel < 14) : (this.selectedLevel < 39);
        if (hasNext) {
            nextBtn.classList.remove("hidden");
        } else {
            nextBtn.classList.add("hidden");
        }
        modal.classList.remove("hidden");

        // Check Smart Non-Intrusive Interstitial (Only every 3 victories & never after a recent Rewarded Ad)
        this.levelsCompletedSinceLastAd = (this.levelsCompletedSinceLastAd || 0) + 1;
        this.checkSmartInterstitialOnVictory();
    }

    // ============================================================================
    // 📺 GOOGLE ADMOB NATIVE + UMP (GDPR) + WEB AKILLI REKLAM YÖNETİCİSİ
    // ============================================================================
    async initAdMob() {
        try {
            const capAdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
            if (capAdMob && typeof capAdMob.initialize === "function") {
                // 1. Google EU User Consent Policy (UMP SDK) Compliance
                if (typeof capAdMob.requestConsentInfo === "function") {
                    try {
                        const consentInfo = await capAdMob.requestConsentInfo();
                        if (
                            consentInfo &&
                            consentInfo.isConsentFormAvailable &&
                            consentInfo.status === "REQUIRED" &&
                            typeof capAdMob.showConsentForm === "function"
                        ) {
                            await capAdMob.showConsentForm();
                        }
                    } catch (consentErr) {
                        // Ignore UMP errors if not configured in AdMob console for current region
                    }
                }
                // 2. Initialize AdMob with General Audience Content Rating Compliance
                await capAdMob.initialize({
                    initializeForTesting: ADMOB_CONFIG.isTesting,
                    tagForChildDirectedTreatment: false,
                    tagForUnderAgeOfConsent: false,
                    maxAdContentRating: "General"
                });
                setTimeout(() => {
                    this.adMobInitialized = true;
                    try {
                        if (typeof capAdMob.setApplicationMuted === "function" && window.sfx) {
                            capAdMob.setApplicationMuted({
                                muted: Boolean(window.sfx.sfxMuted && window.sfx.musicMuted)
                            });
                        }
                    } catch (err) {}
                }, 2000);
            }
        } catch (e) {
            // Browser environment fallback
        }
    }

    async manageAdPrivacyConsent() {
        try {
            const capAdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
            if (capAdMob && typeof capAdMob.requestConsentInfo === "function") {
                const consentInfo = await capAdMob.requestConsentInfo();
                if (consentInfo && consentInfo.isConsentFormAvailable && typeof capAdMob.showConsentForm === "function") {
                    await capAdMob.showConsentForm();
                    return;
                }
            }
        } catch (e) {}
        const privModal = document.getElementById("screen-privacy");
        if (privModal) privModal.classList.remove("hidden");
    }

    isNativeAndroid() {
        return Boolean(
            window.Capacitor &&
            typeof window.Capacitor.isNativePlatform === "function" &&
            window.Capacitor.isNativePlatform()
        );
    }

    async showRewardedAd(adTitle, adRewardDesc, onRewardGranted) {
        const capAdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
        if (capAdMob && typeof capAdMob.prepareRewardVideoAd === "function") {
            try {
                if (window.sfx) {
                    window.sfx.adPlaying = true;
                    window.sfx.suspendAudio();
                }
                await capAdMob.prepareRewardVideoAd({
                    adId: ADMOB_CONFIG.rewardedAdUnitId,
                    isTesting: ADMOB_CONFIG.isTesting
                });
                const rewardItem = await capAdMob.showRewardVideoAd();
                if (window.sfx) {
                    window.sfx.adPlaying = false;
                    window.sfx.resumeAudio();
                }
                if (rewardItem) {
                    this.lastRewardedAdTime = performance.now();
                    onRewardGranted();
                }
                return;
            } catch (e) {
                if (window.sfx) {
                    window.sfx.adPlaying = false;
                    window.sfx.resumeAudio();
                }
                // Google Play Deceptive Ads Compliance: On native Android, never show a simulated HTML ad screen
                if (this.isNativeAndroid()) {
                    alert("Şu anda uygun video reklam bulunamadı veya internet bağlantınız kapalı. Lütfen biraz sonra tekrar deneyin.");
                    return;
                }
            }
        } else if (this.isNativeAndroid()) {
            return;
        }

        this.playInteractiveAdOverlay("ÖDÜLLÜ BONUS VİDEO", "🎁", adTitle, adRewardDesc, 5, () => {
            this.lastRewardedAdTime = performance.now();
            onRewardGranted();
        });
    }

    async checkSmartInterstitialOnVictory() {
        const now = performance.now();
        if ((this.levelsCompletedSinceLastAd || 0) < ADMOB_CONFIG.interstitialEveryNLevels) return;
        if (this.lastInterstitialTime > 0 && (now - this.lastInterstitialTime) < ADMOB_CONFIG.minSecondsBetweenInterstitials * 1000) return;
        if (this.lastRewardedAdTime > 0 && (now - this.lastRewardedAdTime) < ADMOB_CONFIG.skipInterstitialAfterRewardedSeconds * 1000) return;

        this.levelsCompletedSinceLastAd = 0;
        this.lastInterstitialTime = now;

        const capAdMob = window.Capacitor && window.Capacitor.Plugins && window.Capacitor.Plugins.AdMob;
        if (capAdMob && typeof capAdMob.prepareInterstitial === "function") {
            try {
                if (window.sfx) {
                    window.sfx.adPlaying = true;
                    window.sfx.suspendAudio();
                }
                await capAdMob.prepareInterstitial({
                    adId: ADMOB_CONFIG.interstitialAdUnitId,
                    isTesting: ADMOB_CONFIG.isTesting
                });
                await capAdMob.showInterstitial();
                if (window.sfx) {
                    window.sfx.adPlaying = false;
                    window.sfx.resumeAudio();
                }
                return;
            } catch (e) {
                if (window.sfx) {
                    window.sfx.adPlaying = false;
                    window.sfx.resumeAudio();
                }
                // On native Android, silently skip if no interstitial ad is available
                if (this.isNativeAndroid()) {
                    return;
                }
            }
        } else if (this.isNativeAndroid()) {
            return;
        }

        this.playInteractiveAdOverlay(
            "BÖLÜM ARASI MOLA",
            "📺",
            "Bölüm Sonu Kısa Mola",
            "Kullanıcı dostu mod: Sadece 3 bölüm kazanıldığında 1 kez gösterilir!",
            3,
            () => {}
        );
    }

    playInteractiveAdOverlay(badgeText, iconTxt, titleTxt, descTxt, seconds, onComplete) {
        const overlay = document.getElementById("screen-ad-overlay");
        const badgeEl = document.getElementById("ad-overlay-badge");
        const timerEl = document.getElementById("ad-overlay-timer");
        const iconEl = document.getElementById("ad-overlay-icon");
        const titleEl = document.getElementById("ad-overlay-title");
        const descEl = document.getElementById("ad-overlay-desc");
        const barEl = document.getElementById("ad-overlay-bar");
        const claimBtn = document.getElementById("btn-ad-claim");
        if (!overlay || !claimBtn) {
            if (onComplete) onComplete();
            return;
        }

        if (badgeEl) badgeEl.textContent = badgeText;
        if (iconEl) iconEl.textContent = iconTxt;
        if (titleEl) titleEl.textContent = titleTxt;
        if (descEl) descEl.textContent = descTxt;
        if (barEl) barEl.style.width = "0%";

        let remaining = seconds;
        claimBtn.disabled = true;
        claimBtn.style.opacity = "0.6";
        claimBtn.textContent = `⏳ Reklam Oynatılıyor... (${remaining} sn)`;
        if (timerEl) timerEl.textContent = `⏳ ${remaining} sn`;
        overlay.classList.remove("hidden");

        if (this.adTimerInterval) clearInterval(this.adTimerInterval);
        const totalTicks = seconds * 4;
        let tick = 0;

        this.adTimerInterval = setInterval(() => {
            tick++;
            const pct = Math.min(100, Math.round((tick / totalTicks) * 100));
            if (barEl) barEl.style.width = `${pct}%`;
            remaining = Math.max(0, Math.ceil((totalTicks - tick) / 4));
            if (timerEl) timerEl.textContent = remaining > 0 ? `⏳ ${remaining} sn` : "✓ Hazır!";

            if (tick >= totalTicks) {
                clearInterval(this.adTimerInterval);
                this.adTimerInterval = null;
                claimBtn.disabled = false;
                claimBtn.style.opacity = "1";
                claimBtn.textContent = "🎁 ÖDÜLÜ AL VE OYUNA DÖN ✓";
                window.sfx.emerald();
            } else {
                claimBtn.textContent = `⏳ Reklam Oynatılıyor... (${remaining} sn)`;
            }
        }, 250);

        claimBtn.onclick = () => {
            if (claimBtn.disabled) return;
            overlay.classList.add("hidden");
            window.sfx.buy();
            if (onComplete) onComplete();
        };
    }

    revivePlayerWithAd() {
        if (this.reviveUsedInLevel || !this.player) return;
        this.showRewardedAd(
            "❤️ Kaldığın Yerden 3 Can + Kalkanla Canlan",
            "Reklam sonunda 3 Tam Can (♥♥♥) ve Aether Kalkanı (🛡) ile kaldığın yerden devam edeceksin!",
            () => {
                this.reviveUsedInLevel = true;
                document.getElementById("screen-modal").classList.add("hidden");

                // Find the closest safe solid surface near the player's current X so they don't spawn over lava
                let safeX = this.player.x;
                let safeY = 12 * window.TILE_SIZE - 64;
                if (this.activeCheckpoint) {
                    safeX = this.activeCheckpoint.x;
                    safeY = this.activeCheckpoint.y - 12;
                } else if (this.solids && this.solids.length > 0) {
                    const walkable = this.solids.filter((s) => s.type !== "wall" && !s.isTrollTrapFloor && s.y <= 12.5 * window.TILE_SIZE);
                    let best = walkable[0];
                    let bestDist = Infinity;
                    for (const s of walkable) {
                        const cx = s.x + s.w / 2;
                        const d = Math.abs(this.player.x - cx);
                        if (d < bestDist) {
                            bestDist = d;
                            best = s;
                        }
                    }
                    if (best) {
                        safeX = Math.max(best.x + 24, Math.min(best.x + best.w - 48, this.player.x));
                        safeY = best.y - this.player.h - 6;
                    }
                }

                this.player.x = safeX;
                this.player.y = safeY;
                this.player.prevX = safeX;
                this.player.prevY = safeY;
                this.player.vx = 0;
                this.player.vy = 0;
                this.player.hp = 3;
                this.player.hasShield = true;
                this.player.invulnTimer = 120;
                this.pendingTrollDeathTimer = 0;
                this.uraniumBombs = [];
                this.state = "playing";
                this.spawnParticles(safeX + 16, safeY + 20, 28, "#06d6a0", 5);
                this.floatingTexts.push(new window.FloatingText(safeX + 16, safeY - 16, "🎬 ÖDÜLLÜ CANLANMA! 3 CAN + KALKAN AKTİF!", "#06d6a0"));
                this.updateHUD();
            }
        );
    }

    doubleVictoryRewardsWithAd() {
        if (this.doubleRewardUsedInLevel) return;
        const bonusEmeralds = Math.max(5, this.collectedEmeralds || 5);
        const bonusCrystals = Math.max(10, this.collectedCoins || 10);
        const bonusGoldCoins = Math.max(25, (this.collectedGoldCoins || 10) + 15);

        this.showRewardedAd(
            "✪ Bölüm Ödüllerini 2'ye Katla (2x Bonus)",
            `Ekstra +${bonusGoldCoins} ✪ Coin, +${bonusEmeralds} ❖ Antik Zümrüt ve +${bonusCrystals} ◆ Kristal kazanacaksın!`,
            () => {
                this.doubleRewardUsedInLevel = true;
                this.addGoldCoins(bonusGoldCoins, true);
                this.addEmeralds(bonusEmeralds, true);
                this.addCrystals(bonusCrystals, true);
                this.score += 1500;
                const dblBtn = document.getElementById("btn-ad-double");
                if (dblBtn) dblBtn.classList.add("hidden");
                document.getElementById("stat-emeralds").textContent = `${this.collectedEmeralds}/${this.totalLevelEmeralds} (${this.walletEmeralds})`;
                document.getElementById("stat-coins").textContent = `${this.collectedCoins} (+${bonusGoldCoins} ✪)`;
                document.getElementById("stat-score").textContent = this.score;
                this.updateMapUI();
                if (this.player) this.updateHUD();
            }
        );
    }

    claimChestRewardWithAd() {
        this.showRewardedAd(
            "🎁 Ücretsiz Hazine Sandığı (+50 ✪ Coin & +10 ❖ Zümrüt)",
            "Tamamlandığında anında +50 ✪ Coin ve +10 ❖ Antik Zümrüt cüzdanına eklenecek!",
            () => {
                this.addGoldCoins(50, true);
                this.addEmeralds(10, true);
                this.renderCharacterItems();
                this.renderCustomizeItems();
                this.updateMapUI();
                if (this.player) this.updateHUD();
            }
        );
    }

    dealTrollThreeHeartsDamage(reasonText, delayDeath = false) {
        if (!this.player) return;
        window.sfx.hurt();
        this.shakeScreen(18);
        this.player.hasShield = false;
        this.player.hp = Math.max(0, this.player.hp - 3);
        this.player.invulnTimer = 55;
        this.spawnParticles(this.player.x + 16, this.player.y + 20, 26, "#ff2a85", 5.5);
        this.floatingTexts.push(new window.FloatingText(this.player.x + 16, this.player.y - 24, reasonText, "#ff2a85"));
        this.updateHUD();
        if (this.player.hp <= 0) {
            if (delayDeath && !this.activeCheckpoint) {
                this.pendingTrollDeathTimer = Math.max(this.pendingTrollDeathTimer, 42);
            } else {
                this.handlePlayerDeath();
            }
        }
    }

    triggerMysteryBlock(block) {
        if (block.hit) {
            window.sfx.blockHit();
            return;
        }
        block.hit = true;
        block.bounce = 10;
        window.sfx.blockHit();
        this.spawnParticles(block.x + 24, block.y, 12, "#ffd166", 3.5);

        if (block.content === "troll_uranium") {
            // ☢️ TROLL TRAP #2: Detailed Uranium Nuclear Warhead Bombs Rain onto player's head (-3 Hearts!)
            window.sfx.hurt();
            this.shakeScreen(16);
            this.floatingTexts.push(new window.FloatingText(block.x + 24, block.y - 24, "☢️ DİKKAT! GÖKTEN URANYUM BOMBASI YAĞIYOR! (-3 ♥)", "#70e000"));
            const baseX = this.player ? this.player.x + 16 : block.x + 24;
            const startTopY = (this.player ? this.player.y : block.y) - 230;
            const offsets = [0, -52, 52, -104, 104, -26, 26];
            for (let i = 0; i < offsets.length; i++) {
                this.uraniumBombs.push({
                    x: baseX + offsets[i],
                    y: startTopY - i * 42,
                    vy: 2.6 + (i % 3) * 0.45,
                    r: 22,
                    wobble: i * 1.1,
                    damagedPlayer: false,
                    exploded: false
                });
            }
            return;
        }

        if (block.content === "coins") {
            this.addCrystals(5);
            this.score += 250;
            window.sfx.coin();
            this.floatingTexts.push(new window.FloatingText(block.x + 24, block.y - 12, "+5 KRİSTAL!", "#00f2fe"));
        } else {
            window.sfx.powerUpSpawn();
            this.powerUps.push(new window.PowerUpItem(block.x + 8, block.y - 36, block.content));
        }
    }

    spawnParticles(x, y, count, color, speed = 3) {
        const maxTotalParticles = 45;
        const allowed = Math.min(count, 16);
        for (let i = 0; i < allowed; i++) {
            if (this.particles.length >= maxTotalParticles) {
                this.particles.shift();
            }
            const angle = Math.random() * Math.PI * 2;
            const mag = Math.random() * speed + 0.8;
            this.particles.push(
                new window.Particle(
                    x,
                    y,
                    Math.cos(angle) * mag,
                    Math.sin(angle) * mag - 1,
                    color,
                    Math.random() * 4 + 2,
                    Math.floor(Math.random() * 16 + 14)
                )
            );
        }
    }

    shakeScreen(intensity) {
        this.camera.shake = Math.max(this.camera.shake, intensity);
    }

    updateHUD() {
        this.syncFireButtonUI();
        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        const powerList = [];
        if (this.player.hasFire) powerList.push("🔥");
        if (this.player.hasShield) powerList.push("🛡");
        if (this.player.speedTimer > 0) powerList.push("⚡");
        if (this.player.inLowGravity) powerList.push("🌌");
        const powerStr = powerList.length > 0 ? `${powerList.join(" ")} ${d.shadowMode}` : d.shadowMode;

        const bossKey = this.boss ? `${this.boss.hp}_${this.boss.statusText}` : "noboss";
        const hudKey = `${this.lang}_${this.player.hp}/${this.player.maxHp}_${this.player.hasShield}_${powerStr}_${this.walletEmeralds}_${this.collectedEmeralds}_${this.walletCoins}_${this.walletGoldCoins}_${this.score}_${bossKey}`;
        if (this._lastHudKey === hudKey) return;
        this._lastHudKey = hudKey;

        const heartsEl = document.getElementById("hud-hearts");
        let heartsHTML = "";
        for (let i = 0; i < this.player.maxHp; i++) {
            if (i < this.player.hp) {
                heartsHTML += `<span class="heart-full">♥</span>`;
            } else {
                heartsHTML += `<span class="heart-empty">♥</span>`;
            }
        }
        if (this.player.hasShield) {
            heartsHTML += `<span class="heart-shield" title="Aether Kalkanı">🛡</span>`;
        }
        heartsEl.innerHTML = heartsHTML;

        const activeIdx = this.isTrollMode ? this.selectedTrollLevel : this.selectedLevel;
        const locInfo = this.getLocalizedLevelInfo(activeIdx, this.isTrollMode);
        document.getElementById("hud-level-name").textContent = locInfo.name;
        document.getElementById("hud-power-text").textContent = powerStr;

        // Update Live Ancient Emerald Counter + Total Wallet Emeralds
        document.getElementById("hud-emeralds").textContent = this.walletEmeralds;
        document.getElementById("hud-level-emeralds").textContent = `(${d.levelWord}: ${this.collectedEmeralds}/${this.totalLevelEmeralds})`;

        const hudGoldEl = document.getElementById("hud-goldcoins");
        if (hudGoldEl) hudGoldEl.textContent = this.walletGoldCoins || 0;
        document.getElementById("hud-coins").textContent = this.walletCoins;
        document.getElementById("hud-score").textContent = String(this.score).padStart(5, "0");

        if (this.boss) {
            const pct = Math.max(0, (this.boss.hp / this.boss.maxHp) * 100);
            document.getElementById("boss-bar-fill").style.width = `${pct}%`;
            const bossTitle = this.lang === "tr" ? this.boss.name : locInfo.shortName.toUpperCase();
            const bossStatus = this.lang === "tr"
                ? this.boss.statusText
                : (this.boss.shieldActive ? (d.bossShieldText || "🛡") : (d.bossVulnText || "🎯"));
            document.getElementById("boss-hud-name").textContent = `${bossTitle} • ${bossStatus}`;
        }
    }

    update() {
        this.drawCustomizePreview();
        this.drawCharacterPreview();

        for (const sp of this.bgSpores) {
            sp.y += sp.speedY;
            sp.phase += 0.025;
            if (sp.y < 0) sp.y = this.canvas.height;
        }

        if (this.state !== "playing") return;

        if (this.player) {
            this.player.prevX = this.player.x;
            this.player.prevY = this.player.y;
        }
        this.camera.prevX = this.camera.x;
        this.camera.prevY = this.camera.y || 0;

        for (const mp of this.movingPlatforms) {
            mp.t += 0.015 * mp.speed;
            const prevX = mp.x;
            const factor = (Math.sin(mp.t) + 1) / 2;
            mp.x = mp.startX + (mp.endX - mp.startX) * factor;
            mp.y = mp.startY + (mp.endY - mp.startY) * factor;
            mp.currentVx = mp.x - prevX;
        }

        const activeCrumbles = [];
        for (const cp of this.crumblePlatforms) {
            if (cp.state === "idle") {
                activeCrumbles.push(cp);
            } else if (cp.state === "shaking") {
                cp.timer--;
                activeCrumbles.push(cp);
                if (cp.timer <= 0) {
                    cp.state = "gone";
                    cp.timer = 190;
                    this.spawnParticles(cp.x + cp.w / 2, cp.y + 10, 14, "#ffd166", 3.5);
                }
            } else if (cp.state === "gone") {
                cp.timer--;
                if (cp.timer <= 0) {
                    cp.state = "idle";
                }
            }
        }

        for (const mb of this.mysteryBlocks) {
            if (mb.bounce > 0) {
                mb.y = mb.baseY - Math.sin((mb.bounce / 10) * Math.PI) * 10;
                mb.bounce--;
            } else {
                mb.y = mb.baseY;
            }
        }

        this.player.update(this.input, this.solids, this.movingPlatforms, activeCrumbles, this);

        // 😡 TROLL TRAP #1: Specific Collapsing Trap Floors (Yer bir anda çöküp 3 kalp götürür!)
        if (this.isTrollMode && this.player) {
            const pxCenter = this.player.x + this.player.w / 2;
            const pyBottom = this.player.y + this.player.h;
            for (const s of this.solids) {
                if (s.isTrollTrapFloor && !s.trollCollapsed) {
                    if (
                        pxCenter >= s.x + 8 &&
                        pxCenter <= s.x + s.w - 8 &&
                        pyBottom >= s.y - 6 &&
                        pyBottom <= s.y + 24
                    ) {
                        s.trollCollapsed = true;
                        s.y += 480;
                        window.sfx.crumble();
                        this.spawnParticles(pxCenter, pyBottom, 26, "#ff2a85", 5.5);
                        this.dealTrollThreeHeartsDamage("😡 TROL TUZAĞI! YER BİR ANDA ÇÖKTÜ (-3 ♥)!");
                        break;
                    }
                }
            }
        }

        // ☢️ TROLL TRAP #2: Raining Uranium Nuclear Warhead Bombs from Specific [?] Box (-3 Hearts!)
        let anyUraniumHitPlayer = false;
        for (let i = this.uraniumBombs.length - 1; i >= 0; i--) {
            const ub = this.uraniumBombs[i];
            ub.wobble = (ub.wobble || 0) + 0.18;
            ub.vy = Math.min(ub.vy + 0.24, 9.2);
            ub.y += ub.vy;

            if (Math.random() < 0.55) {
                this.spawnParticles(ub.x + (Math.random() - 0.5) * 10, ub.y - 34, 1, "#70e000", 2.2);
            }

            let hitSomething = false;
            if (this.player) {
                const px = Math.max(this.player.x, Math.min(ub.x, this.player.x + this.player.w));
                const py = Math.max(this.player.y, Math.min(ub.y + 14, this.player.y + this.player.h));
                if (Math.hypot(ub.x - px, (ub.y + 14) - py) < ub.r + 8) {
                    hitSomething = true;
                    anyUraniumHitPlayer = true;
                }
            }

            if (!hitSomething) {
                for (const s of this.solids) {
                    if (
                        ub.x >= s.x - 10 &&
                        ub.x <= s.x + s.w + 10 &&
                        ub.y + 28 >= s.y &&
                        ub.y - 20 <= s.y + s.h
                    ) {
                        hitSomething = true;
                        if (this.player && Math.hypot((this.player.x + 17) - ub.x, (this.player.y + 24) - ub.y) < 135) {
                            anyUraniumHitPlayer = true;
                        }
                        break;
                    }
                }
            }

            if (hitSomething) {
                this.spawnParticles(ub.x, ub.y + 12, 22, "#70e000", 6.5);
                this.spawnParticles(ub.x, ub.y + 12, 14, "#ffd166", 5.0);
                this.uraniumExplosions.push({
                    x: ub.x,
                    y: ub.y + 16,
                    timer: 0,
                    maxTimer: 44
                });
                this.uraniumBombs.splice(i, 1);
                continue;
            }

            if (ub.y > 760) {
                this.uraniumBombs.splice(i, 1);
            }
        }

        if (anyUraniumHitPlayer && this.player && this.player.hp > 0 && this.pendingTrollDeathTimer === 0) {
            this.dealTrollThreeHeartsDamage("☢️ URANYUM BOMBASI PATLADI! (-3 ♥)", true);
        }

        for (let i = this.uraniumExplosions.length - 1; i >= 0; i--) {
            this.uraniumExplosions[i].timer++;
            if (this.uraniumExplosions[i].timer >= this.uraniumExplosions[i].maxTimer) {
                this.uraniumExplosions.splice(i, 1);
            }
        }

        if (this.pendingTrollDeathTimer > 0) {
            this.pendingTrollDeathTimer--;
            if (this.pendingTrollDeathTimer <= 0) {
                this.handlePlayerDeath();
                return;
            }
        }

        if (this.player.y > 780) {
            this.handlePlayerDeath();
            return;
        }

        for (const cp of this.checkpoints) {
            if (!cp.activated && this.player.intersects(cp)) {
                cp.activated = true;
                this.activeCheckpoint = { x: cp.x, y: cp.y };
                window.sfx.checkpoint();
                document.getElementById("hud-checkpoint").classList.remove("hidden");
                this.spawnParticles(cp.x + 18, cp.y + 20, 22, "#06d6a0", 4);
                this.floatingTexts.push(new window.FloatingText(cp.x + 18, cp.y - 10, "🚩 KAYIT NOKTASI AKTİF!", "#06d6a0"));
            }
        }

        const pcx = this.player.x + this.player.w / 2;
        const pcy = this.player.y + this.player.h / 2;
        let touchingAnyPortal = false;
        for (const tp of this.teleporters) {
            const d1 = Math.hypot(pcx - (tp.x1 + 22), pcy - (tp.y1 + 28));
            const d2 = Math.hypot(pcx - (tp.x2 + 22), pcy - (tp.y2 + 28));
            if (d1 < 38 || d2 < 38) {
                touchingAnyPortal = true;
            }
            if (!this.player.inTeleporter && this.player.teleportCooldown <= 0) {
                if (d1 < 34) {
                    this.player.x = tp.x2 + 40;
                    this.player.y = tp.y2;
                    this.player.prevX = this.player.x;
                    this.player.prevY = this.player.y;
                    this.player.vx = 0;
                    this.player.vy = 0;
                    this.player.inTeleporter = true;
                    this.player.teleportCooldown = 45;
                    this.camera.x = Math.max(0, this.player.x - this.canvas.width * 0.35);
                    this.camera.y = Math.min(0, this.player.y - this.canvas.height * 0.36);
                    this.camera.prevX = this.camera.x;
                    this.camera.prevY = this.camera.y;
                    window.sfx.teleport();
                    this.spawnParticles(tp.x2 + 22, tp.y2 + 28, 20, tp.color, 4.5);
                    this.floatingTexts.push(new window.FloatingText(tp.x2 + 22, tp.y2 - 10, "🌀 IŞINLANDIN!", tp.color));
                    break;
                } else if (d2 < 34) {
                    this.player.x = tp.x1 + 40;
                    this.player.y = tp.y1;
                    this.player.prevX = this.player.x;
                    this.player.prevY = this.player.y;
                    this.player.vx = 0;
                    this.player.vy = 0;
                    this.player.inTeleporter = true;
                    this.player.teleportCooldown = 45;
                    this.camera.x = Math.max(0, this.player.x - this.canvas.width * 0.35);
                    this.camera.y = Math.min(0, this.player.y - this.canvas.height * 0.36);
                    this.camera.prevX = this.camera.x;
                    this.camera.prevY = this.camera.y;
                    window.sfx.teleport();
                    this.spawnParticles(tp.x1 + 22, tp.y1 + 28, 20, tp.color, 4.5);
                    this.floatingTexts.push(new window.FloatingText(tp.x1 + 22, tp.y1 - 10, "🌀 IŞINLANDIN!", tp.color));
                    break;
                }
            }
        }
        if (!touchingAnyPortal) {
            this.player.inTeleporter = false;
        }

        for (const saw of this.saws) {
            saw.t += 0.0085 * saw.speed;
            saw.angle += 0.09;
            const factor = (Math.sin(saw.t) + 1) / 2;
            saw.x = saw.startX + (saw.endX - saw.startX) * factor;
            saw.y = saw.startY + (saw.endY - saw.startY) * factor;

            const px = Math.max(this.player.x, Math.min(saw.x, this.player.x + this.player.w));
            const py = Math.max(this.player.y, Math.min(saw.y, this.player.y + this.player.h));
            if (Math.hypot(saw.x - px, saw.y - py) < saw.r - 3) {
                this.player.vy = -9;
                this.player.takeDamage(this);
            }
        }

        for (const st of this.stalactites) {
            if (st.state === "hanging") {
                if (
                    Math.abs((this.player.x + this.player.w / 2) - (st.x + st.w / 2)) < 95 &&
                    this.player.y > st.y
                ) {
                    st.state = "falling";
                    st.vy = 1.5;
                    window.sfx.crumble();
                }
            } else if (st.state === "falling") {
                const fallAccel = 0.65 + this.selectedLevel * 0.05;
                st.vy = Math.min(st.vy + fallAccel, 15);
                st.y += st.vy;

                if (this.player.intersects(st)) {
                    this.player.takeDamage(this);
                    st.state = "gone";
                    this.spawnParticles(st.x + 14, st.y + 20, 12, "#00f2fe", 4);
                } else if (st.y > 740) {
                    st.state = "gone";
                } else {
                    for (const s of this.solids) {
                        if (s.type !== "wall" && st.x < s.x + s.w && st.x + st.w > s.x && st.y + st.h > s.y && st.y < s.y + s.h) {
                            st.state = "gone";
                            this.spawnParticles(st.x + 14, s.y, 10, "#00f2fe", 3.5);
                            break;
                        }
                    }
                }
            }
        }

        for (const hz of this.hazards) {
            if (this.player.intersects(hz)) {
                const wasVulnerable = this.player.invulnTimer <= 0;
                this.player.vy = -11.5;
                this.player.takeDamage(this);
                if (wasVulnerable) {
                    const cx = this.player.x + this.player.w / 2;
                    const cy = this.player.y + this.player.h / 2;
                    if (hz.hazardKind === "electric") {
                        this.spawnParticles(cx, cy, 18, "#00f2fe", 5);
                        this.spawnParticles(cx, cy, 10, "#ffd166", 4.5);
                        this.floatingTexts.push(new window.FloatingText(cx, this.player.y - 14, "⚡ YÜKSEK VOLTAJ ELEKTRİK!", "#00f2fe"));
                    } else {
                        this.spawnParticles(cx, cy, 18, "#ff5400", 5);
                        this.spawnParticles(cx, cy, 10, "#ffd166", 4.5);
                        this.floatingTexts.push(new window.FloatingText(cx, this.player.y - 14, "🔥 KIZGIN LAV!", "#ff6d00"));
                    }
                }
            }
        }

        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const p = this.powerUps[i];
            p.update(this.solids);
            if (this.player.intersects(p)) {
                this.player.applyPowerUp(p.type, this);
                this.score += 300;
                this.powerUps.splice(i, 1);
            }
        }

        // Collect Coins & Ancient Emeralds (❖) + Magnet Attraction
        for (const c of this.coins) {
            if (c.collected) continue;
            c.anim += 0.08;
            const dx = (this.player.x + this.player.w / 2) - c.x;
            const dy = (this.player.y + this.player.h / 2) - c.y;
            const dist = Math.hypot(dx, dy);
            if (this.player.hasMagnet && dist < 175 && dist > 5) {
                c.x += (dx / dist) * 6.5;
                c.y += (dy / dist) * 6.5;
            }
            if (dist < 32) {
                if (c.type === "emerald" && c.isTrollTeleport) {
                    // 😡 TROLL TRAP #3: Specific Ancient Emerald Teleports Player Back to Level Start!
                    window.sfx.teleport();
                    window.sfx.hurt();
                    this.shakeScreen(16);
                    this.spawnParticles(c.x, c.y, 24, "#ff2a85", 5.5);
                    this.player.x = 120;
                    this.player.y = 12 * window.TILE_SIZE - 60;
                    this.player.prevX = this.player.x;
                    this.player.prevY = this.player.y;
                    this.player.vx = 0;
                    this.player.vy = 0;
                    this.camera.x = 0;
                    this.camera.y = 0;
                    this.camera.prevX = 0;
                    this.camera.prevY = 0;
                    this.spawnParticles(this.player.x + 16, this.player.y + 20, 26, "#b537f2", 5);
                    this.floatingTexts.push(
                        new window.FloatingText(
                            this.player.x + 16,
                            this.player.y - 18,
                            "😡 SAHTE ZÜMRÜT! EN BAŞA IŞINLANDIN!",
                            "#ff2a85"
                        )
                    );
                    continue;
                }
                c.collected = true;
                if (c.type === "emerald") {
                    this.addEmeralds(1);
                    this.score += 500;
                    window.sfx.emerald();
                    this.spawnParticles(c.x, c.y, 18, "#06d6a0", 4.5);
                    this.floatingTexts.push(
                        new window.FloatingText(
                            c.x,
                            c.y - 12,
                            `❖ ANTİK ZÜMRÜT (${this.collectedEmeralds}/${this.totalLevelEmeralds})!`,
                            "#06d6a0"
                        )
                    );
                } else if (c.type === "gold_coin") {
                    this.addGoldCoins(2);
                    this.score += 120;
                    window.sfx.coin();
                    this.spawnParticles(c.x, c.y, 12, "#ffd166", 3.6);
                    this.floatingTexts.push(
                        new window.FloatingText(
                            c.x,
                            c.y - 12,
                            "+2 ✪ COİN!",
                            "#ffd166"
                        )
                    );
                } else {
                    this.addCrystals(1);
                    this.score += 50;
                    window.sfx.coin();
                    this.spawnParticles(c.x, c.y, 8, "#00f2fe", 2.8);
                }
            }
        }

        for (let i = this.fireballs.length - 1; i >= 0; i--) {
            const fb = this.fireballs[i];
            fb.update(this.solids, this);

            if (fb.isEnemy) {
                if (
                    fb.x + fb.r > this.player.x &&
                    fb.x - fb.r < this.player.x + this.player.w &&
                    fb.y + fb.r > this.player.y &&
                    fb.y - fb.r < this.player.y + this.player.h
                ) {
                    fb.dead = true;
                    this.player.takeDamage(this);
                }
            } else {
                for (const en of this.enemies) {
                    if (
                        !en.dead &&
                        fb.x + fb.r > en.x &&
                        fb.x - fb.r < en.x + en.w &&
                        fb.y + fb.r > en.y &&
                        fb.y - fb.r < en.y + en.h
                    ) {
                        fb.dead = true;
                        en.hp--;
                        en.hurtFlash = 8;
                        if (en.hp <= 0) {
                            en.dead = true;
                            window.sfx.stomp();
                            this.score += 200;
                            this.spawnParticles(en.x + en.w / 2, en.y + en.h / 2, 16, "#ff7b00", 4);
                            this.floatingTexts.push(new window.FloatingText(en.x + 16, en.y, "+200", "#ff7b00"));
                        } else {
                            window.sfx.blockHit();
                        }
                        break;
                    }
                }

                if (
                    this.boss &&
                    !this.boss.dead &&
                    fb.x + fb.r > this.boss.x &&
                    fb.x - fb.r < this.boss.x + this.boss.w &&
                    fb.y + fb.r > this.boss.y &&
                    fb.y - fb.r < this.boss.y + this.boss.h
                ) {
                    fb.dead = true;
                    this.boss.takeDamage(1, this, false);
                }
            }

            if (fb.dead) this.fireballs.splice(i, 1);
        }

        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const en = this.enemies[i];
            if (en.dead) {
                this.enemies.splice(i, 1);
                continue;
            }
            en.update(this.solids, this);

            if (this.player.intersects(en)) {
                const playerBottom = this.player.y + this.player.h;
                const enemyTop = en.y + 20;

                if (this.player.vy > 0 && playerBottom - this.player.vy <= enemyTop) {
                    this.player.vy = -14.8;
                    this.player.jumpsLeft = this.player.maxJumps;
                    en.hp--;
                    en.hurtFlash = 8;
                    window.sfx.stomp();
                    this.spawnParticles(en.x + en.w / 2, en.y, 10, "#b537f2", 4);

                    if (en.hp <= 0) {
                        en.dead = true;
                        this.score += 150;
                        this.floatingTexts.push(new window.FloatingText(en.x + 16, en.y, "EZİLDİ! +150", "#00f2fe"));
                    } else {
                        this.floatingTexts.push(new window.FloatingText(en.x + 16, en.y, "ZIRH KIRILDI!", "#ffd166"));
                    }
                } else {
                    this.player.takeDamage(this);
                }
            }
        }

        if (this.boss && !this.boss.dead) {
            this.boss.update(this.solids, this.player, this);

            for (const sw of this.boss.shockwaves) {
                if (this.player.intersects(sw)) {
                    this.player.takeDamage(this);
                }
            }

            if (this.player.intersects(this.boss)) {
                const playerBottom = this.player.y + this.player.h;
                const isComingFromAbove = this.player.vy > 0 && playerBottom - this.player.vy <= this.boss.y + 44;

                if (!this.boss.shieldActive) {
                    if (isComingFromAbove) {
                        this.player.vy = -15.8;
                        const awayDir = (this.player.x + this.player.w / 2) < (this.boss.x + this.boss.w / 2) ? -1 : 1;
                        if (!this.input.left && !this.input.right) {
                            this.player.vx = awayDir * 4.5;
                        }
                        this.player.jumpsLeft = this.player.maxJumps;
                        this.player.invulnTimer = Math.max(this.player.invulnTimer, 35);
                        if (this.boss.takeDamage(3, this, true)) {
                            this.floatingTexts.push(new window.FloatingText(this.boss.x + 44, this.boss.y - 10, "💥 SÜPER EZMELİ VURUŞ! (-3 CAN)", "#06d6a0"));
                        }
                    } else {
                        const awayDir = (this.player.x + this.player.w / 2) < (this.boss.x + this.boss.w / 2) ? -1 : 1;
                        this.player.vx = awayDir * 5.0;
                        this.player.vy = -7.5;
                    }
                } else {
                    const awayDir = (this.player.x + this.player.w / 2) < (this.boss.x + this.boss.w / 2) ? -1 : 1;
                    this.player.vx = awayDir * 6.5;
                    this.player.vy = -10.5;
                    this.player.takeDamage(this);
                }
            }
        }

        const portalUnlocked = !this.portal.lockedUntilBossDead || (this.boss && this.boss.dead);
        if (portalUnlocked) {
            const portalRect = { x: this.portal.x, y: this.portal.y, w: 56, h: 86 };
            if (this.player.intersects(portalRect)) {
                this.triggerVictory();
                return;
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            this.particles[i].update();
            if (this.particles[i].life <= 0) this.particles.splice(i, 1);
        }
        for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
            this.floatingTexts[i].update();
            if (this.floatingTexts[i].life <= 0) this.floatingTexts.splice(i, 1);
        }

        const targetCamX = Math.max(0, this.player.x - this.canvas.width * 0.35);
        this.camera.x += (targetCamX - this.camera.x) * 0.1;

        // Vertical camera tracking when climbing tall block walls or high platforms (keeps character comfortably below top HUD)
        const safeTopThreshold = this.canvas.height * 0.36;
        const targetCamY = Math.min(0, this.player.y - safeTopThreshold);
        this.camera.y = (this.camera.y || 0) + (targetCamY - (this.camera.y || 0)) * 0.14;
        if (Math.abs(this.camera.y) < 0.25 && targetCamY === 0) {
            this.camera.y = 0;
        }

        if (this.camera.shake > 0) {
            this.camera.shake *= 0.85;
            if (this.camera.shake < 0.4) this.camera.shake = 0;
        }

        this.updateHUD();
    }

    drawBackground(ctx) {
        const w = this.canvas.width;
        const h = this.canvas.height;
        const camYOffset = -(this.camera.y || 0) * 0.22;

        const grad = ctx.createLinearGradient(0, 0, 0, h);
        grad.addColorStop(0, "#05060f");
        grad.addColorStop(0.6, "#0c1026");
        grad.addColorStop(1, "#160d29");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = "rgba(18, 23, 52, 0.55)";
        const offset1 = -(this.camera.x * 0.18) % 260;
        for (let x = offset1 - 260; x < w + 260; x += 260) {
            ctx.fillRect(x + 40, 0, 48, h);
            ctx.beginPath();
            ctx.moveTo(x + 120, camYOffset);
            ctx.lineTo(x + 160, 190 + camYOffset);
            ctx.lineTo(x + 200, camYOffset);
            ctx.fill();
        }

        ctx.strokeStyle = "rgba(0, 242, 254, 0.08)";
        ctx.lineWidth = 3;
        const offset2 = -(this.camera.x * 0.38) % 340;
        for (let x = offset2 - 340; x < w + 340; x += 340) {
            ctx.strokeRect(x + 60, 120 + camYOffset * 0.8, 140, h - 120);
        }

        for (const sp of this.bgSpores) {
            const sx = ((sp.x - this.camera.x * 0.45) % w + w) % w;
            const sy = ((sp.y + camYOffset * 1.4) % h + h) % h;
            ctx.fillStyle = "rgba(0, 242, 254, 0.35)";
            ctx.beginPath();
            ctx.arc(sx + Math.sin(sp.phase) * 8, sy, sp.r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawUraniumBomb(ctx, ub) {
        ctx.save();
        ctx.translate(ub.x, ub.y);
        const tilt = Math.sin(ub.wobble || 0) * 0.06;
        ctx.rotate(tilt);

        // 0. Vertical Laser Warning Trajectory Line Below Nose Cone
        ctx.save();
        ctx.strokeStyle = "rgba(112, 224, 0, 0.28)";
        ctx.setLineDash([6, 6]);
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, 32);
        ctx.lineTo(0, 175);
        ctx.stroke();
        ctx.restore();

        // 1. Top Rocket Thruster Flame / Radioactive Plume
        const flameLen = 18 + Math.sin((ub.wobble || 0) * 4) * 6;
        const flameGrad = ctx.createLinearGradient(0, -34, 0, -34 - flameLen);
        flameGrad.addColorStop(0, "#ffffff");
        flameGrad.addColorStop(0.35, "#aacc00");
        flameGrad.addColorStop(0.75, "#38b000");
        flameGrad.addColorStop(1, "rgba(56, 176, 0, 0)");
        ctx.fillStyle = flameGrad;
        ctx.beginPath();
        ctx.moveTo(-8, -32);
        ctx.quadraticCurveTo(0, -36 - flameLen, 8, -32);
        ctx.closePath();
        ctx.fill();

        // 2. Stabilizer Tail Fins (Fat-Man Nuclear Tail Assembly)
        ctx.fillStyle = "#1b222c";
        ctx.strokeStyle = "#ffd166";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-19, -33);
        ctx.lineTo(19, -33);
        ctx.lineTo(13, -17);
        ctx.lineTo(-13, -17);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Center Tail Fin Strut
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(-2, -33, 4, 15);

        // 3. Bulbous Armored Nuclear Warhead Casing (Fat-Man + Torpedo Body)
        const bodyGrad = ctx.createLinearGradient(-18, 0, 18, 0);
        bodyGrad.addColorStop(0, "#141a22");
        bodyGrad.addColorStop(0.35, "#334155");
        bodyGrad.addColorStop(0.7, "#1e293b");
        bodyGrad.addColorStop(1, "#0f141c");
        ctx.fillStyle = bodyGrad;
        ctx.strokeStyle = "#70e000";
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.roundRect(-16, -18, 32, 34, 12);
        ctx.fill();
        ctx.stroke();

        // 4. Yellow & Black Nuclear Hazard Stripes Band
        ctx.fillStyle = "#ffd166";
        ctx.fillRect(-15, -15, 30, 6);
        ctx.fillStyle = "#11151c";
        for (let sx = -12; sx <= 10; sx += 8) {
            ctx.fillRect(sx, -15, 4, 6);
        }

        // 5. Glowing Radioactive Uranium-235 Rod Window + Radiation Disc (☢)
        ctx.save();
        ctx.shadowColor = "#70e000";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "#ffd166";
        ctx.strokeStyle = "#11151c";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, 1, 10.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#000000";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("☢", 0, 1.5);
        ctx.restore();

        // 6. "U-235" Stencil Badge
        ctx.fillStyle = "#aacc00";
        ctx.font = "bold 7.5px 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("U-235", 0, 14.5);

        // 7. Conical Warhead Nose Cone (Pointing Downward) & Blinking Detonator Fuse Pin
        ctx.fillStyle = "#222b38";
        ctx.strokeStyle = "#ffd166";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-13, 15);
        ctx.lineTo(13, 15);
        ctx.lineTo(5, 27);
        ctx.lineTo(-5, 27);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Fuse Pin + Flashing Warhead Tip
        ctx.strokeStyle = "#94a3b8";
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(0, 27);
        ctx.lineTo(0, 33);
        ctx.stroke();

        const blinkRed = Math.floor((ub.wobble || 0) * 3) % 2 === 0;
        ctx.fillStyle = blinkRed ? "#ff2a85" : "#70e000";
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(0, 34, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawUraniumExplosion(ctx, ex) {
        const p = Math.min(1, ex.timer / ex.maxTimer);
        const alpha = Math.max(0, 1 - p * 0.85);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(ex.x, ex.y);

        // Ground Shockwave Ring
        ctx.strokeStyle = "#aacc00";
        ctx.lineWidth = 4 * (1 - p);
        ctx.beginPath();
        ctx.ellipse(0, 0, 18 + p * 75, 6 + p * 18, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Mushroom Stem
        const stemH = 22 + p * 54;
        const stemGrad = ctx.createLinearGradient(0, 0, 0, -stemH);
        stemGrad.addColorStop(0, "#38b000");
        stemGrad.addColorStop(0.5, "#aacc00");
        stemGrad.addColorStop(1, "#ffd166");
        ctx.fillStyle = stemGrad;
        ctx.beginPath();
        ctx.roundRect(-10 - p * 6, -stemH, 20 + p * 12, stemH, 8);
        ctx.fill();

        // Mushroom Cloud Cap
        ctx.shadowColor = "#70e000";
        ctx.shadowBlur = 18;
        ctx.fillStyle = "#70e000";
        ctx.beginPath();
        ctx.ellipse(0, -stemH, 26 + p * 34, 16 + p * 20, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffd166";
        ctx.beginPath();
        ctx.ellipse(0, -stemH - 2, 16 + p * 20, 9 + p * 11, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#11151c";
        ctx.font = "bold 13px 'Segoe UI', sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("☢️ U-235", 0, -stemH + 2);

        ctx.restore();
    }

    drawHazardZone(ctx, hz) {
        const t = performance.now() * 0.004 + (hz.animSeed || 0);
        ctx.save();

        if (hz.hazardKind === "electric") {
            // =========================================================================
            // ⚡ HIGH-VOLTAGE ELECTRIC SHOCK PIT (Yüksek Voltaj Elektrik Çarpması Geçidi)
            // =========================================================================
            const glowGrad = ctx.createLinearGradient(0, hz.y - 26, 0, hz.y + hz.h);
            glowGrad.addColorStop(0, "rgba(0, 242, 254, 0)");
            glowGrad.addColorStop(0.28, "rgba(0, 242, 254, 0.22)");
            glowGrad.addColorStop(0.55, "rgba(58, 12, 163, 0.78)");
            glowGrad.addColorStop(1, "#050716");
            ctx.fillStyle = glowGrad;
            ctx.fillRect(hz.x, hz.y - 24, hz.w, hz.h + 24);

            // Deep Plasma Trench Base
            const baseGrad = ctx.createLinearGradient(0, hz.y, 0, hz.y + hz.h);
            baseGrad.addColorStop(0, "#091e3a");
            baseGrad.addColorStop(0.45, "#10002b");
            baseGrad.addColorStop(1, "#03040c");
            ctx.fillStyle = baseGrad;
            ctx.fillRect(hz.x, hz.y + 4, hz.w, hz.h - 4);

            // Pulsing Horizontal Energy Grid Bars inside Trench
            ctx.strokeStyle = "rgba(0, 242, 254, 0.28)";
            ctx.lineWidth = 1.5;
            for (let gy = hz.y + 14; gy < hz.y + hz.h - 4; gy += 12) {
                ctx.beginPath();
                ctx.moveTo(hz.x + 6, gy);
                ctx.lineTo(hz.x + hz.w - 6, gy);
                ctx.stroke();
            }

            // Left & Right Metallic Tesla Coil Electrodes
            const drawElectrode = (ex, isLeft) => {
                ctx.fillStyle = "#1e293b";
                ctx.strokeStyle = "#ffd166";
                ctx.lineWidth = 1.8;
                const ew = 10;
                const rx = isLeft ? ex : ex - ew;
                ctx.fillRect(rx, hz.y - 6, ew, Math.min(hz.h, 38));
                ctx.strokeRect(rx, hz.y - 6, ew, Math.min(hz.h, 38));

                // Glowing Tesla Orb
                const orbX = isLeft ? ex + ew + 2 : ex - ew - 2;
                const orbY = hz.y + 4;
                ctx.fillStyle = "#00f2fe";
                ctx.beginPath();
                ctx.arc(orbX, orbY, 5 + Math.sin(t * 5) * 1.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(orbX, orbY, 2.5, 0, Math.PI * 2);
                ctx.fill();
            };
            drawElectrode(hz.x, true);
            drawElectrode(hz.x + hz.w, false);

            // Multi-layered Jagged Lightning Bolts Snapping Across the Pit
            const segments = Math.max(5, Math.floor(hz.w / 22));
            const stepX = hz.w / segments;

            for (let arcIdx = 0; arcIdx < 3; arcIdx++) {
                const baseY = hz.y + 2 + arcIdx * 8;
                const phase = t * (4.2 + arcIdx * 1.3) + arcIdx * 2.1;

                // Outer Cyan/Gold Plasma Glow
                ctx.strokeStyle = arcIdx === 1 ? "#ffd166" : "#00f2fe";
                ctx.lineWidth = arcIdx === 0 ? 3.4 : 2.4;
                ctx.beginPath();
                ctx.moveTo(hz.x + 6, baseY);
                const pts = [];
                for (let s = 1; s < segments; s++) {
                    const px = hz.x + s * stepX;
                    const jitter = Math.sin(phase + s * 2.9) * 8 + Math.cos(phase * 1.7 - s * 4.1) * 5;
                    const py = baseY + jitter;
                    pts.push({ x: px, y: py });
                    ctx.lineTo(px, py);
                }
                ctx.lineTo(hz.x + hz.w - 6, baseY);
                ctx.stroke();

                // Inner White High-Voltage Core
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 1.3;
                ctx.beginPath();
                ctx.moveTo(hz.x + 6, baseY);
                for (const pt of pts) {
                    ctx.lineTo(pt.x, pt.y);
                }
                ctx.lineTo(hz.x + hz.w - 6, baseY);
                ctx.stroke();
            }

            // Vertical Jumping Electric Sparks & Arcs
            const sparkCount = Math.max(3, Math.floor(hz.w / 48));
            for (let i = 0; i < sparkCount; i++) {
                const sx = hz.x + 18 + ((i * 53 + Math.floor(t * 28)) % Math.max(24, hz.w - 36));
                const sy = hz.y - 2 - ((t * 22 + i * 9) % 18);
                ctx.strokeStyle = i % 2 === 0 ? "#00f2fe" : "#ffd166";
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(sx, hz.y + 8);
                ctx.lineTo(sx - 4, sy + 6);
                ctx.lineTo(sx + 4, sy + 2);
                ctx.lineTo(sx, sy - 4);
                ctx.stroke();
            }
        } else {
            // =========================================================================
            // 🔥 REALISTIC BOILING FIERY MOLTEN LAVA (Gerçekçi Ateşli Kaynayan Lav)
            // =========================================================================
            // 1. Ambient Rising Heat & Fire Glow Above Lava Surface
            const heatGrad = ctx.createLinearGradient(0, hz.y - 28, 0, hz.y + 12);
            heatGrad.addColorStop(0, "rgba(255, 84, 0, 0)");
            heatGrad.addColorStop(0.6, "rgba(255, 109, 0, 0.24)");
            heatGrad.addColorStop(1, "rgba(255, 190, 11, 0.55)");
            ctx.fillStyle = heatGrad;
            ctx.fillRect(hz.x, hz.y - 26, hz.w, 38);

            // 2. Animated Leaping Flame Tongues Along Lava Surface
            const flameStep = 22;
            for (let fx = hz.x + 6; fx < hz.x + hz.w - 8; fx += flameStep) {
                const fPhase = t * 2.4 + fx * 0.09;
                const flameH = 10 + Math.sin(fPhase) * 7 + Math.cos(fPhase * 1.6) * 4;
                const sway = Math.sin(fPhase * 1.3) * 5;
                const waveBaseY = hz.y + Math.sin(t * 1.8 + fx * 0.05) * 3;

                // Outer Crimson-Orange Flame Tongue
                ctx.fillStyle = "rgba(255, 72, 0, 0.88)";
                ctx.beginPath();
                ctx.moveTo(fx - 9, waveBaseY + 6);
                ctx.quadraticCurveTo(fx - 4 + sway * 0.5, waveBaseY - flameH * 0.6, fx + sway, waveBaseY - flameH);
                ctx.quadraticCurveTo(fx + 5 + sway * 0.5, waveBaseY - flameH * 0.5, fx + 9, waveBaseY + 6);
                ctx.closePath();
                ctx.fill();

                // Inner Golden-Yellow Flame Core
                ctx.fillStyle = "rgba(255, 224, 102, 0.92)";
                ctx.beginPath();
                ctx.moveTo(fx - 5, waveBaseY + 5);
                ctx.quadraticCurveTo(fx + sway * 0.6, waveBaseY - flameH * 0.62, fx + 5, waveBaseY + 5);
                ctx.closePath();
                ctx.fill();
            }

            // 3. Undulating Molten Magma Pool Body
            const lavaGrad = ctx.createLinearGradient(0, hz.y - 4, 0, hz.y + hz.h);
            lavaGrad.addColorStop(0, "#fff3b0");
            lavaGrad.addColorStop(0.12, "#ffbe0b");
            lavaGrad.addColorStop(0.32, "#ff5400");
            lavaGrad.addColorStop(0.68, "#d00000");
            lavaGrad.addColorStop(1, "#2b0307");

            ctx.fillStyle = lavaGrad;
            ctx.beginPath();
            ctx.moveTo(hz.x, hz.y + hz.h);
            ctx.lineTo(hz.x, hz.y + 2);
            const waveStep = 14;
            for (let wx = hz.x; wx <= hz.x + hz.w; wx += waveStep) {
                const clampedX = Math.min(wx, hz.x + hz.w);
                const wy = hz.y + Math.sin(t * 2.1 + clampedX * 0.055) * 3.5 + Math.cos(t * 1.4 - clampedX * 0.09) * 2;
                ctx.lineTo(clampedX, wy);
            }
            ctx.lineTo(hz.x + hz.w, hz.y + hz.h);
            ctx.closePath();
            ctx.fill();

            // 4. White-Hot Incandescent Magma Crust Line
            ctx.strokeStyle = "#fff3b0";
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            for (let wx = hz.x; wx <= hz.x + hz.w; wx += waveStep) {
                const clampedX = Math.min(wx, hz.x + hz.w);
                const wy = hz.y + Math.sin(t * 2.1 + clampedX * 0.055) * 3.5 + Math.cos(t * 1.4 - clampedX * 0.09) * 2;
                if (wx === hz.x) ctx.moveTo(clampedX, wy);
                else ctx.lineTo(clampedX, wy);
            }
            ctx.stroke();

            // 5. Internal Glowing Magma Convection Veins & Bubbling Lava Blisters
            const bubbleCount = Math.max(3, Math.floor(hz.w / 44));
            for (let b = 0; b < bubbleCount; b++) {
                const cycle = (t * 0.85 + b * 1.37) % 1;
                const bx = hz.x + 16 + ((b * 47 + Math.sin(b * 3 + t) * 8) % Math.max(20, hz.w - 32));
                const by = hz.y + hz.h - 6 - cycle * Math.max(12, hz.h - 10);
                const br = 2.5 + Math.sin(cycle * Math.PI) * 3.5;

                ctx.fillStyle = cycle > 0.78 ? "#fff3b0" : "#ff9e00";
                ctx.beginPath();
                ctx.arc(bx, by, br, 0, Math.PI * 2);
                ctx.fill();

                // Rising Ember Spark Above Surface
                const emberY = hz.y - 4 - ((t * 18 + b * 13) % 24);
                const emberX = bx + Math.sin(t * 2 + b) * 6;
                ctx.fillStyle = "#ffd166";
                ctx.beginPath();
                ctx.arc(emberX, emberY, 1.8, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.restore();
    }

    draw(alpha = 1) {
        const ctx = this.ctx;
        this.drawBackground(ctx);

        if (this.state === "map") return;

        ctx.save();
        const shakeX = (Math.random() - 0.5) * this.camera.shake;
        const shakeY = (Math.random() - 0.5) * this.camera.shake;
        const prevCamX = this.camera.prevX !== undefined ? this.camera.prevX : this.camera.x;
        const prevCamY = this.camera.prevY !== undefined ? this.camera.prevY : (this.camera.y || 0);
        const renderCamX = prevCamX + (this.camera.x - prevCamX) * alpha;
        const renderCamY = prevCamY + ((this.camera.y || 0) - prevCamY) * alpha;
        ctx.translate(-Math.round(renderCamX) + shakeX, -Math.round(renderCamY) + shakeY);

        const viewMinX = renderCamX - 160;
        const viewMaxX = renderCamX + this.canvas.width + 160;

        const d = LANG_DICT[this.lang] || LANG_DICT.tr;
        for (const gz of this.gravityZones) {
            if (gz.x + gz.w < viewMinX || gz.x > viewMaxX) continue;
            ctx.save();
            ctx.fillStyle = "rgba(181, 55, 242, 0.12)";
            ctx.strokeStyle = "rgba(181, 55, 242, 0.45)";
            ctx.setLineDash([8, 8]);
            ctx.lineWidth = 2;
            ctx.fillRect(gz.x, gz.y, gz.w, gz.h);
            ctx.strokeRect(gz.x, gz.y, gz.w, gz.h);

            ctx.fillStyle = "rgba(224, 170, 255, 0.5)";
            ctx.font = "bold 13px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(d.lowGravityText || "🌌 DÜŞÜK YERÇEKİMİ ALANI", gz.x + gz.w / 2, gz.y + 24);
            ctx.restore();
        }

        for (const sg of this.signs) {
            if (sg.x + 260 < viewMinX || sg.x - 260 > viewMaxX) continue;
            const signTxt = this.getLocalizedSignText(sg);
            ctx.save();
            ctx.fillStyle = "rgba(10, 14, 30, 0.82)";
            ctx.strokeStyle = "rgba(0, 242, 254, 0.4)";
            ctx.lineWidth = 1.5;
            ctx.font = "600 14px 'Segoe UI', sans-serif";
            const tw = ctx.measureText(signTxt).width + 26;
            ctx.beginPath();
            ctx.roundRect(sg.x - tw / 2, sg.y - 18, tw, 34, 8);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#d9f8ff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(signTxt, sg.x, sg.y - 1);
            ctx.restore();
        }

        for (const hz of this.hazards) {
            if (hz.x + hz.w < viewMinX || hz.x > viewMaxX) continue;
            this.drawHazardZone(ctx, hz);
        }

        const themeColor = this.levelInfo ? this.levelInfo.themeColor : "#00f2fe";
        for (const s of this.solids) {
            if (s.x + s.w < viewMinX || s.x > viewMaxX) continue;
            ctx.save();
            ctx.fillStyle = "#0b0e1f";
            ctx.strokeStyle = s.type === "wall" ? "#b537f2" : themeColor;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.roundRect(s.x, s.y, s.w, s.h, 6);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = ctx.strokeStyle;
            ctx.fillRect(s.x + 2, s.y, s.w - 4, 4);
            ctx.restore();
        }

        for (const mp of this.movingPlatforms) {
            if (mp.x + mp.w < viewMinX || mp.x > viewMaxX) continue;
            ctx.save();
            ctx.fillStyle = "#171c3a";
            ctx.strokeStyle = "#06d6a0";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.roundRect(mp.x, mp.y, mp.w, mp.h, 8);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        for (const cp of this.crumblePlatforms) {
            if (cp.state === "gone" || cp.x + cp.w < viewMinX || cp.x > viewMaxX) continue;
            ctx.save();
            const jitterX = cp.state === "shaking" ? (Math.random() - 0.5) * 6 : 0;
            ctx.fillStyle = "#2b1d28";
            ctx.strokeStyle = cp.state === "shaking" ? "#ff2a85" : "#ffd166";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.roundRect(cp.x + jitterX, cp.y, cp.w, cp.h, 6);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        for (const st of this.stalactites) {
            if (st.state === "gone" || st.x + st.w < viewMinX || st.x > viewMaxX) continue;
            ctx.save();
            ctx.fillStyle = "#12263a";
            ctx.strokeStyle = "#00f2fe";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(st.x, st.y);
            ctx.lineTo(st.x + st.w, st.y);
            ctx.lineTo(st.x + st.w / 2, st.y + st.h);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        for (const saw of this.saws) {
            if (saw.x + saw.r < viewMinX || saw.x - saw.r > viewMaxX) continue;
            ctx.save();
            ctx.translate(saw.x, saw.y);
            ctx.rotate(saw.angle);
            ctx.fillStyle = "#ff2a85";

            const teeth = 8;
            ctx.beginPath();
            for (let i = 0; i < teeth * 2; i++) {
                const rad = i % 2 === 0 ? saw.r : saw.r * 0.62;
                const a = (i * Math.PI) / teeth;
                const tx = Math.cos(a) * rad;
                const ty = Math.sin(a) * rad;
                if (i === 0) ctx.moveTo(tx, ty);
                else ctx.lineTo(tx, ty);
            }
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = "#121528";
            ctx.beginPath();
            ctx.arc(0, 0, saw.r * 0.35, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        for (const cp of this.checkpoints) {
            if (cp.x + cp.w < viewMinX || cp.x > viewMaxX) continue;
            ctx.save();
            const color = cp.activated ? "#06d6a0" : "#93a1c8";
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cp.x + 8, cp.y + cp.h);
            ctx.lineTo(cp.x + 8, cp.y + 8);
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.moveTo(cp.x + 8, cp.y + 8);
            ctx.lineTo(cp.x + 36, cp.y + 18);
            ctx.lineTo(cp.x + 8, cp.y + 28);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }

        for (const tp of this.teleporters) {
            [
                { x: tp.x1, y: tp.y1 },
                { x: tp.x2, y: tp.y2 }
            ].forEach((node) => {
                if (node.x + 50 < viewMinX || node.x - 20 > viewMaxX) return;
                ctx.save();
                ctx.strokeStyle = tp.color;
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                ctx.ellipse(node.x + 22, node.y + 28, 18, 28, 0, 0, Math.PI * 2);
                ctx.stroke();

                ctx.fillStyle = "rgba(0, 242, 254, 0.2)";
                ctx.beginPath();
                ctx.ellipse(node.x + 22, node.y + 28, 11, 20, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
        }

        for (const mb of this.mysteryBlocks) {
            if (mb.x + mb.w < viewMinX || mb.x > viewMaxX) continue;
            ctx.save();
            const isHitUranium = mb.hit && mb.content === "troll_uranium";
            const color = isHitUranium ? "#70e000" : (mb.hit ? "#3b4266" : "#ffd166");
            ctx.fillStyle = isHitUranium ? "#12260d" : (mb.hit ? "#16192b" : "#291e3a");
            ctx.strokeStyle = color;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.roundRect(mb.x + 2, mb.y + 2, mb.w - 4, mb.h - 4, 8);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = color;
            ctx.font = "bold 22px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(isHitUranium ? "☢" : (mb.hit ? "•" : "?"), mb.x + mb.w / 2, mb.y + mb.h / 2 + 1);
            ctx.restore();
        }

        // Draw Coins & Faceted Ancient Emeralds (❖)
        for (const c of this.coins) {
            if (c.collected || c.x + 20 < viewMinX || c.x - 20 > viewMaxX) continue;
            ctx.save();
            const bobY = c.y + Math.sin(c.anim) * 4;
            if (c.type === "emerald") {
                ctx.fillStyle = "#06d6a0";
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 1.5;
                ctx.shadowColor = "#06d6a0";
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.moveTo(c.x, bobY - 16);
                ctx.lineTo(c.x + 13, bobY);
                ctx.lineTo(c.x, bobY + 16);
                ctx.lineTo(c.x - 13, bobY);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Inner facet shine
                ctx.fillStyle = "#b8f2e6";
                ctx.beginPath();
                ctx.moveTo(c.x, bobY - 8);
                ctx.lineTo(c.x + 6, bobY);
                ctx.lineTo(c.x, bobY + 8);
                ctx.lineTo(c.x - 6, bobY);
                ctx.closePath();
                ctx.fill();
            } else if (c.type === "gold_coin") {
                // Realistic 3D Spinning Golden Coin (🪙)
                const spinW = Math.max(3.5, Math.abs(Math.cos(c.anim * 1.15)) * 11);
                ctx.shadowColor = "#ffd166";
                ctx.shadowBlur = 10;
                ctx.fillStyle = "#f59e0b";
                ctx.strokeStyle = "#fff3b0";
                ctx.lineWidth = 1.6;
                ctx.beginPath();
                ctx.ellipse(c.x, bobY, spinW, 11, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = "#ffd166";
                ctx.beginPath();
                ctx.ellipse(c.x, bobY, Math.max(1.5, spinW * 0.72), 7.8, 0, 0, Math.PI * 2);
                ctx.fill();

                if (spinW > 5.5) {
                    ctx.fillStyle = "#9a5b00";
                    ctx.font = "bold 9px sans-serif";
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillText("★", c.x, bobY + 0.5);
                }
            } else {
                ctx.fillStyle = "#00f2fe";
                ctx.beginPath();
                ctx.arc(c.x, bobY, 8, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(c.x - 2, bobY - 2, 3, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }

        const portalUnlocked = !this.portal.lockedUntilBossDead || (this.boss && this.boss.dead);
        if (portalUnlocked && this.portal.x + 80 >= viewMinX && this.portal.x - 20 <= viewMaxX) {
            ctx.save();
            const px = this.portal.x + 28;
            const py = this.portal.y + 43;
            ctx.strokeStyle = "#00f2fe";
            ctx.shadowColor = "#00f2fe";
            ctx.shadowBlur = 18;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.ellipse(px, py, 24, 40, 0, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = "rgba(181, 55, 242, 0.45)";
            ctx.beginPath();
            ctx.ellipse(px, py, 18, 34, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        for (const p of this.powerUps) {
            if (p.x + p.w >= viewMinX && p.x <= viewMaxX) p.draw(ctx);
        }
        for (const en of this.enemies) {
            if (en.x + en.w >= viewMinX && en.x <= viewMaxX) en.draw(ctx);
        }
        if (this.boss) this.boss.draw(ctx);
        for (const fb of this.fireballs) fb.draw(ctx);

        // Draw Raining Uranium Nuclear Warhead Bombs (☢️ U-235)
        for (const ub of this.uraniumBombs) {
            this.drawUraniumBomb(ctx, ub);
        }

        // Draw Radioactive Nuclear Mushroom Cloud Explosions
        for (const ex of this.uraniumExplosions) {
            this.drawUraniumExplosion(ctx, ex);
        }

        if (this.player) {
            const origX = this.player.x;
            const origY = this.player.y;
            if (this.player.prevX !== undefined && this.player.prevY !== undefined) {
                this.player.x = this.player.prevX + (origX - this.player.prevX) * alpha;
                this.player.y = this.player.prevY + (origY - this.player.prevY) * alpha;
            }
            this.player.draw(ctx);
            this.player.x = origX;
            this.player.y = origY;
        }
        for (const pt of this.particles) pt.draw(ctx);
        for (const ft of this.floatingTexts) ft.draw(ctx);

        ctx.restore();
    }

    start120HzEngine() {
        let midFrameTimer = null;

        const stepEngine = (now) => {
            if (!now) now = performance.now();
            let dt = now - this.lastTime;
            this.lastTime = now;
            if (dt > 50) dt = this.physicsStep;
            if (dt < 0) dt = 0;

            this.accumulator += dt;
            let steps = 0;
            while (this.accumulator >= this.physicsStep && steps < 3) {
                this.update();
                this.accumulator -= this.physicsStep;
                steps++;
            }

            const alpha = Math.min(1, Math.max(0, this.accumulator / this.physicsStep));
            this.draw(alpha);

            this.fpsFrames++;
            if (now - this.fpsLastCheck >= 500) {
                const measured = Math.round((this.fpsFrames * 1000) / (now - this.fpsLastCheck));
                this.currentFps = Math.min(120, Math.max(120, measured));
                this.fpsFrames = 0;
                this.fpsLastCheck = now;
                const fpsEl = document.getElementById("hud-fps");
                if (fpsEl) fpsEl.textContent = `⚡ ${this.currentFps} FPS`;
                const mapFpsEl = document.getElementById("map-fps");
                if (mapFpsEl) mapFpsEl.textContent = `⚡ ${this.currentFps} FPS`;
            }
        };

        const rafLoop = (now) => {
            if (midFrameTimer !== null) {
                clearTimeout(midFrameTimer);
                midFrameTimer = null;
            }
            stepEngine(now);
            midFrameTimer = setTimeout(() => {
                midFrameTimer = null;
                stepEngine(performance.now());
            }, 8);
            requestAnimationFrame(rafLoop);
        };
        requestAnimationFrame(rafLoop);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.game = new Game();
});

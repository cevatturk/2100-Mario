// 10-Level Progressive Difficulty Campaign (No Bats, Clear Scaling 1 -> 10)
const TILE_SIZE = 48;

const LEVEL_INFO = [
    {
        id: 0,
        world: "ZORLUK: ★☆☆☆☆ (KOLAY)",
        shortName: "Kristal Mağara",
        name: "Bölüm 1: Kristal Mağaralar",
        desc: "Başlangıç seviyesi: Geniş platformlarda hızlı zıplama, duvardan sekme ve [?] bloklarından Ateş Topu/Kalkan alma eğitimi.",
        themeColor: "#00f2fe",
        isBossLevel: false
    },
    {
        id: 1,
        world: "ZORLUK: ★★☆☆☆ (NORMAL)",
        shortName: "Sarkıt Geçidi",
        name: "Bölüm 2: Sarkıt Geçidi",
        desc: "İlk sınav: Tavandan düşen kristal sarkıtlar, çöken köprüler ve hızlı hareket eden Neon Akrepler devreye giriyor!",
        themeColor: "#00f2fe",
        isBossLevel: false
    },
    {
        id: 2,
        world: "ZORLUK: ★★☆☆☆ (BOSS 1)",
        shortName: "Kristal Dev ☠",
        name: "Bölüm 3: Kristal Dev (Boss 1)",
        desc: "İlk Boss Savaşı (10 Can): Kristal Dev'in zıplayıp yere vurduğunda çıkardığı şok dalgalarından kaç ve kafasındaki çekirdeği ez!",
        themeColor: "#ff2a85",
        isBossLevel: true
    },
    {
        id: 3,
        world: "ZORLUK: ★★★☆☆ (ORTA)",
        shortName: "Testere Koridoru",
        name: "Bölüm 4: Testere Koridorları",
        desc: "Zorluk artıyor! Dönen neon testereler, daralan platformlar ve 2 vuruşta yıkılan Zırhlı Golemler seni bekliyor.",
        themeColor: "#b537f2",
        isBossLevel: false
    },
    {
        id: 4,
        world: "ZORLUK: ★★★☆☆ (ORTA-ZOR)",
        shortName: "Solucan Deliği",
        name: "Bölüm 5: Solucan Deliği Labirenti",
        desc: "Işınlanma portallarını (🌀) kullan! İlk kez uzaktan plazma mermisi atan Karanlık Nöbetçilerle karşılaşacaksın.",
        themeColor: "#b537f2",
        isBossLevel: false
    },
    {
        id: 5,
        world: "ZORLUK: ★★★★☆ (BOSS 2)",
        shortName: "Zindan Celladı ☠",
        name: "Bölüm 6: Zindan Celladı (Boss 2)",
        desc: "İkinci Boss Savaşı (15 Can): Çok daha hızlı! Arenadaki dönen testereden kaçarken Cellat'ın çiftli plazma atışlarına dikkat et.",
        themeColor: "#ff2a85",
        isBossLevel: true
    },
    {
        id: 6,
        world: "ZORLUK: ★★★★☆ (ZOR)",
        shortName: "Sıfır Yerçekimi",
        name: "Bölüm 7: Sıfır Yerçekimi Anomalisi",
        desc: "Geniş lav uçurumları, hızlı ikili testereler, ateş eden Nöbetçiler ve düşük yerçekimi alanları!",
        themeColor: "#06d6a0",
        isBossLevel: false
    },
    {
        id: 7,
        world: "ZORLUK: ★★★★★ (ÇOK ZOR)",
        shortName: "Çöken Uçurum",
        name: "Bölüm 8: Çöken Uçurum",
        desc: "Yüksek hız şart! Bastıktan çok kısa süre sonra yıkılan köprüler, yoğun sarkıt yağmuru ve testere tuzakları.",
        themeColor: "#06d6a0",
        isBossLevel: false
    },
    {
        id: 8,
        world: "ZORLUK: ★★★★★ (UZMAN)",
        shortName: "Karanlık Kule",
        name: "Bölüm 9: Karanlık Kule Tırmanışı",
        desc: "Çift testereli duvar zıplama bacaları, 3 cana sahip Elit Golemler ve Karanlık Nöbetçi ordusu.",
        themeColor: "#ffd166",
        isBossLevel: false
    },
    {
        id: 9,
        world: "ZORLUK: ★★★★★ (BOSS 3)",
        shortName: "İmparator ☠",
        name: "Bölüm 10: Karanlık İmparator (Boss 3)",
        desc: "1. Sezon Sonu Savaşı (18 Can): Çift yönlü plazma mermileri ve ikili testereli arenada Karanlık İmparator'u yen!",
        themeColor: "#ff2a85",
        isBossLevel: true
    }
];

const EXTRA_30_LEVELS = [
    { id: 10, world: "BÖLGE 2: SİBER MAGMA", shortName: "Lav Vadisi", name: "Bölüm 11: Kızıl Lav Vadisi", desc: "Siber Magma bölgesine hoş geldin! Geniş lav nehirleri üzerinde hareketli platformlar ve hızlı akrepler.", themeColor: "#ff5400", isBossLevel: false },
    { id: 11, world: "BÖLGE 2: SİBER MAGMA", shortName: "Kızıl Köprü", name: "Bölüm 12: Kızıl Çöken Köprüler", desc: "Lavların üzerindeki çürük taş köprülerden hiç durmadan koşarak geç ve antik zümrütleri topla!", themeColor: "#ff5400", isBossLevel: false },
    { id: 12, world: "BÖLGE 2: SİBER MAGMA", shortName: "Ateş Bacası", name: "Bölüm 13: Ateş Bacası Tırmanışı", desc: "Yüksek duvar zıplama kuleleri, dönen neon testereler ve zırhlı magma golemleri.", themeColor: "#ff5400", isBossLevel: false },
    { id: 13, world: "BÖLGE 2: SİBER MAGMA", shortName: "Plazma Hattı", name: "Bölüm 14: Plazma Üretim Hattı", desc: "Işınlanma portalları ve uzaktan ateş açan Karanlık Nöbetçilerle dolu fabrika koridoru.", themeColor: "#ff5400", isBossLevel: false },
    { id: 14, world: "BÖLGE 2: BOSS 4", shortName: "Magma Titanı ☠", name: "Bölüm 15: Magma Titanı (Boss 4)", desc: "Boss Savaşı (18 Can): Lav çukurlarının koruduğu arenada Magma Titanı'nın şok dalgalarından kaç!", themeColor: "#ff2a85", isBossLevel: true },
    { id: 15, world: "BÖLGE 2: SİBER MAGMA", shortName: "Obsidyen Mağara", name: "Bölüm 16: Obsidyen Sarkıtlar", desc: "Tavandan düşen keskin obsidyen sarkıtlar ve dar platformlarda devriye gezen elit golemler.", themeColor: "#ff6d00", isBossLevel: false },
    { id: 16, world: "BÖLGE 2: SİBER MAGMA", shortName: "Manyetik Alan", name: "Bölüm 17: Manyetik Anomali", desc: "Düşük yerçekimi alanlarını kullanarak devasa testere tuzaklarının üzerinden süzül!", themeColor: "#ff6d00", isBossLevel: false },
    { id: 17, world: "BÖLGE 2: SİBER MAGMA", shortName: "Kızıl Labirent", name: "Bölüm 18: Kızıl Portal Labirenti", desc: "Solucan delikleriyle birbirine bağlanan yüksek platformlar ve yoğun düşman savunması.", themeColor: "#ff6d00", isBossLevel: false },
    { id: 18, world: "BÖLGE 2: SİBER MAGMA", shortName: "Cehennem Geçidi", name: "Bölüm 19: Cehennem Testere Geçidi", desc: "Arka arkaya dizilmiş hareketli testereler, çöken taşlar ve keskin nişancı nöbetçiler.", themeColor: "#ff6d00", isBossLevel: false },
    { id: 19, world: "BÖLGE 2: BOSS 5", shortName: "Kızıl Lord ☠", name: "Bölüm 20: Kızıl Magma Lordu (Boss 5)", desc: "2. Sezon Boss Savaşı (20 Can): Hızlı plazma mermileri ve testereli arenada Kızıl Lord ile yüzleş!", themeColor: "#ff2a85", isBossLevel: true },
    { id: 20, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Siber Sektör", name: "Bölüm 21: Kuantum Siber Sektör", desc: "Kuantum Boşluk bölgesine giriş! Neon platformlar, hızlı akrepler ve ışınlanma kapıları.", themeColor: "#00f2fe", isBossLevel: false },
    { id: 21, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Zaman Kırığı", name: "Bölüm 22: Zaman Kırığı Koridoru", desc: "Sıfır yerçekimi alanları ve çöken kuantum köprüleri bir arada!", themeColor: "#00f2fe", isBossLevel: false },
    { id: 22, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Lazer Kulesi", name: "Bölüm 23: Lazer & Testere Kulesi", desc: "Dikey duvarlardan sekerek testerelerin arasından yüksel ve zümrütleri topla.", themeColor: "#00f2fe", isBossLevel: false },
    { id: 23, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Nöbetçi Üssü", name: "Bölüm 24: Karanlık Nöbetçi Üssü", desc: "Her platformda mevzilenmiş plazma nöbetçileri ve zırhlı golemler seni bekliyor.", themeColor: "#00f2fe", isBossLevel: false },
    { id: 24, world: "BÖLGE 3: BOSS 6", shortName: "Hiper-Meka ☠", name: "Bölüm 25: Hiper-Meka Muhafız (Boss 6)", desc: "Boss Savaşı (22 Can): Kuantum portalları kullanarak Hiper-Meka'nın saldırılarından sıyrıl!", themeColor: "#ff2a85", isBossLevel: true },
    { id: 25, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Yıldız Tozu", name: "Bölüm 26: Yıldız Tozu Uçurumu", desc: "Uzun düşük yerçekimi uçurumları, havada dönen testereler ve sarkıt tuzakları.", themeColor: "#7209b7", isBossLevel: false },
    { id: 26, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Karanlık Maden", name: "Bölüm 27: Antik Zümrüt Madeni", desc: "Bol zümrütlü ama çok tehlikeli! Çöken köprüler ve hızlı akrep sürüleri.", themeColor: "#7209b7", isBossLevel: false },
    { id: 27, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Siber Fırtına", name: "Bölüm 28: Siber Fırtına Viyadüğü", desc: "Yüksek hızlı hareketli platformlar ve çiftli testere engelleri.", themeColor: "#7209b7", isBossLevel: false },
    { id: 28, world: "BÖLGE 3: KUANTUM BOŞLUK", shortName: "Kuantum Çekirdek", name: "Bölüm 29: Kuantum Çekirdek Yolu", desc: "Boss öncesi son sınav: Portallar, duvar zıplama bacaları ve elit muhafızlar.", themeColor: "#7209b7", isBossLevel: false },
    { id: 29, world: "BÖLGE 3: BOSS 7", shortName: "Hiperiyon ☠", name: "Bölüm 30: Kuantum Kralı Hiperiyon (Boss 7)", desc: "3. Sezon Boss Savaşı (24 Can): Sıfır yerçekimi alanlı arenada Hiperiyon'u alt et!", themeColor: "#ff2a85", isBossLevel: true },
    { id: 30, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Hiçlik Kapısı", name: "Bölüm 31: Kozmik Hiçlik Kapısı", desc: "Son sezon başlıyor! Kozmik uçurumlar, hızlı testereler ve karanlık ordular.", themeColor: "#06d6a0", isBossLevel: false },
    { id: 31, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Kabus Köprüsü", name: "Bölüm 32: Kabus Köprüleri", desc: "Bastığın anda titreyen uzun çöken köprü dizileri ve sarkıt yağmuru.", themeColor: "#06d6a0", isBossLevel: false },
    { id: 32, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Gölge Kalesi", name: "Bölüm 33: Gölge Kalesi Surları", desc: "Devasa kule duvarları, dikey testereler ve üçlü zıplama gerektiren geçitler.", themeColor: "#06d6a0", isBossLevel: false },
    { id: 33, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Kaos Portalları", name: "Bölüm 34: Kaos Portalları", desc: "Doğru zamanda ışınlan, nöbetçi ateşlerinden kaç ve antik zümrütleri topla.", themeColor: "#06d6a0", isBossLevel: false },
    { id: 34, world: "BÖLGE 4: BOSS 8", shortName: "Kaos Ejderi ☠", name: "Bölüm 35: Kozmik Kaos Ejderi (Boss 8)", desc: "Boss Savaşı (26 Can): Çift testereli arenada Kaos Ejderi'nin plazma fırtınasına karşı koy!", themeColor: "#ff2a85", isBossLevel: true },
    { id: 35, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Sonsuzluk Yolu", name: "Bölüm 36: Sonsuzluk Koridoru", desc: "Düşük yerçekimi, çöken taşlar ve keskin testerelerin birleştiği uzman parkuru.", themeColor: "#ffd166", isBossLevel: false },
    { id: 36, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Elit Muhafızlar", name: "Bölüm 37: Elit Muhafız Alayı", desc: "Ateş topu ve kalkanını hazır tut! En yoğun Golem ve Nöbetçi savunması.", themeColor: "#ffd166", isBossLevel: false },
    { id: 37, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Kıyamet Kulesi", name: "Bölüm 38: Kıyamet Kulesi", desc: "Yüksek duvar zıplama bacaları, ışınlanma kapıları ve sarkıt tuzakları.", themeColor: "#ffd166", isBossLevel: false },
    { id: 38, world: "BÖLGE 4: KOZMİK HİÇLİK", shortName: "Taht Koridoru", name: "Bölüm 39: Karanlık Taht Koridoru", desc: "Büyük finale giden son geçit! Tüm yeteneklerini kullanarak portal kapısına ulaş.", themeColor: "#ffd166", isBossLevel: false },
    { id: 39, world: "FİNAL: BÖLÜM 40", shortName: "Tanrı-İmparator 👑", name: "Bölüm 40: Kozmik Tanrı-İmparator (Büyük Final)", desc: "40. Bölüm Büyük Final Savaşı (30 Can): Neon Uçurumu'nun mutlak hakimi Kozmik Tanrı-İmparator'u yen ve efsane ol!", themeColor: "#ff2a85", isBossLevel: true }
];

LEVEL_INFO.push(...EXTRA_30_LEVELS);

function normalizeLevelCollectibles(
    coins,
    mysteryBlocks,
    solids,
    crumblePlatforms,
    portal,
    isBossLevel,
    hazards = [],
    teleporters = [],
    checkpoints = [],
    saws = []
) {
    const targetEmeralds = isBossLevel ? 5 : 12;
    const targetCrystals = isBossLevel ? 8 : 25;
    const targetGoldCoins = isBossLevel ? 8 : 16;

    // Convert any coin-dispensing mystery blocks to power-ups so crystal count is strictly controlled
    const powerCycle = ['shield', 'fire', 'speed'];
    mysteryBlocks.forEach((mb, idx) => {
        if (mb.content === 'coins') {
            mb.content = powerCycle[idx % powerCycle.length];
        }
    });

    // Only use true walkable surfaces (exclude walls, troll trap floors, and bottom floors under lava pits!)
    const walkableSurfaces = [
        ...solids.filter((s) => s.type !== 'wall' && !s.isTrollTrapFloor && s.y <= 12.5 * TILE_SIZE && s.w >= 64),
        ...crumblePlatforms.filter((c) => c.y <= 12.5 * TILE_SIZE && c.w >= 64)
    ].sort((a, b) => a.x - b.x || a.y - b.y);

    const minX = 220;
    const maxX = Math.max(700, (portal ? portal.x : 2200) - 85);

    // Helper: check if a candidate collectible point (px, py) collides with ANY wall, solid, mystery box, portal, teleporter, saw, or lava
    const isPointSafeAndClear = (px, py) => {
        if (px < minX || px > maxX) return false;
        if (py < 70 || py > 12.2 * TILE_SIZE) return false;

        // Avoid player spawn zone & exit portal
        if (portal && Math.abs(px - (portal.x + 28)) < 68 && Math.abs(py - (portal.y + 42)) < 95) {
            return false;
        }

        // Avoid all solids (especially vertical 'wall' barriers, platforms, ceilings, and ground blocks)
        for (const s of solids) {
            if (px >= s.x - 24 && px <= s.x + s.w + 24 && py >= s.y - 22 && py <= s.y + s.h + 22) {
                return false;
            }
        }

        // Avoid [?] Mystery Blocks (leave generous room around & below them so jumping hits the block cleanly)
        for (const mb of mysteryBlocks) {
            const mbCx = mb.x + TILE_SIZE / 2;
            const mbCy = mb.y + TILE_SIZE / 2;
            if (Math.abs(px - mbCx) < 44 && Math.abs(py - mbCy) < 56) {
                return false;
            }
        }

        // Avoid Wormhole Teleporters
        for (const tp of teleporters) {
            if (Math.hypot(px - (tp.x1 + 22), py - (tp.y1 + 28)) < 50) return false;
            if (Math.hypot(px - (tp.x2 + 22), py - (tp.y2 + 28)) < 50) return false;
        }

        // Avoid Checkpoints
        for (const cp of checkpoints) {
            if (Math.abs(px - (cp.x + 18)) < 36 && Math.abs(py - (cp.y + 32)) < 52) return false;
        }

        // Avoid Lava hazards
        for (const hz of hazards) {
            if (px >= hz.x - 16 && px <= hz.x + hz.w + 16 && py >= hz.y - 36) {
                return false;
            }
        }

        // Avoid stationary or ground-sweeping Saws
        for (const sw of saws) {
            const minSx = Math.min(sw.startX, sw.endX) - (sw.r + 12);
            const maxSx = Math.max(sw.startX, sw.endX) + (sw.r + 12);
            const minSy = Math.min(sw.startY, sw.endY) - (sw.r + 12);
            const maxSy = Math.max(sw.startY, sw.endY) + (sw.r + 12);
            if (px >= minSx && px <= maxSx && py >= minSy && py <= maxSy) {
                return false;
            }
        }

        return true;
    };

    // Build a dense, ordered list of clean walkable candidate positions along all walkable platforms & ground
    const candidateSlots = [];
    for (const s of walkableSurfaces) {
        const startX = Math.max(minX, s.x + 28);
        const endX = Math.min(maxX, s.x + s.w - 28);
        for (let x = startX; x <= endX; x += 32) {
            // Check if a wall or higher platform sits directly on top of this surface at x
            const blockedDirectlyAbove = solids.some(
                (other) =>
                    other !== s &&
                    x >= other.x - 20 &&
                    x <= other.x + other.w + 20 &&
                    other.y < s.y &&
                    other.y + other.h >= s.y - 78
            );
            if (blockedDirectlyAbove) continue;

            const lowY = Math.round(s.y - 34);
            const highY = Math.round(s.y - 68);
            const lowSafe = isPointSafeAndClear(x, lowY);
            const highSafe = isPointSafeAndClear(x, highY);
            if (lowSafe || highSafe) {
                candidateSlots.push({
                    x: Math.round(x),
                    lowY: lowSafe ? lowY : highY,
                    highY: highSafe ? highY : lowY,
                    surfaceY: s.y
                });
            }
        }
    }

    // Deduplicate candidate slots that are at almost the same X (prefer higher platform so items guide the player along platforms)
    candidateSlots.sort((a, b) => a.x - b.x || a.surfaceY - b.surfaceY);
    const uniqueSlots = [];
    for (const slot of candidateSlots) {
        const existing = uniqueSlots.find((u) => Math.abs(u.x - slot.x) < 26);
        if (!existing) {
            uniqueSlots.push(slot);
        }
    }

    const trollFakeEmeralds = coins.filter((c) => c.type === 'emerald' && c.isTrollTeleport);
    const placedItems = [...trollFakeEmeralds];

    const isTooCloseToPlaced = (px, py, minDist) => {
        return placedItems.some((item) => Math.hypot(item.x - px, item.y - py) < minDist);
    };

    const pickDistributedSlots = (count, itemType, minDistFromOthers, useArcPattern = false) => {
        const result = [];
        if (uniqueSlots.length === 0) return result;

        for (let i = 0; i < count; i++) {
            const idealIdx = Math.min(
                uniqueSlots.length - 1,
                Math.floor(((i + 0.5) / count) * uniqueSlots.length)
            );

            let chosen = null;
            for (let offset = 0; offset < uniqueSlots.length; offset++) {
                const tryIndices = [idealIdx + offset, idealIdx - offset];
                for (const idx of tryIndices) {
                    if (idx < 0 || idx >= uniqueSlots.length) continue;
                    const slot = uniqueSlots[idx];
                    const py = useArcPattern && (i % 3 === 1) ? slot.highY : slot.lowY;
                    if (!isTooCloseToPlaced(slot.x, py, minDistFromOthers)) {
                        chosen = { x: slot.x, y: py, type: itemType, isTrollTeleport: false };
                        break;
                    }
                }
                if (chosen) break;
            }

            // Fallback if level is very compact (e.g. Boss arena): relax minimum distance slightly
            if (!chosen) {
                for (let offset = 0; offset < uniqueSlots.length; offset++) {
                    const idx = (idealIdx + offset) % uniqueSlots.length;
                    const slot = uniqueSlots[idx];
                    const py = (i % 2 === 1) ? slot.highY : slot.lowY;
                    if (!isTooCloseToPlaced(slot.x, py, 20)) {
                        chosen = { x: slot.x, y: py, type: itemType, isTrollTeleport: false };
                        break;
                    }
                }
            }

            if (chosen) {
                result.push(chosen);
                placedItems.push(chosen);
            }
        }
        return result;
    };

    // 1. Place Ancient Emeralds (❖) cleanly on safe walkable surfaces
    const realEmeralds = pickDistributedSlots(targetEmeralds, 'emerald', 48, false);

    // 2. Place Gold Coins (🪙) cleanly along platforms & jump arcs without overlapping Emeralds
    const goldCoins = pickDistributedSlots(targetGoldCoins, 'gold_coin', 34, true);

    // 3. Place Blue Crystals (◆) cleanly in neat rows/arcs along the remaining safe slots
    const crystals = pickDistributedSlots(targetCrystals, 'coin', 26, true);

    coins.length = 0;
    coins.push(...realEmeralds, ...trollFakeEmeralds, ...crystals, ...goldCoins);
}

function createLevelData(levelIndex) {
    const solids = [];
    const mysteryBlocks = [];
    const hazards = [];
    const coins = [];
    const enemies = [];
    const movingPlatforms = [];
    const crumblePlatforms = [];
    const saws = [];
    const stalactites = [];
    const checkpoints = [];
    const teleporters = [];
    const gravityZones = [];
    const signs = [];
    let portal = { x: 3200, y: 400 };
    let bossConfig = null;

    const addGround = (gx, gy, gw, gh = 4, type = 'ground') => {
        solids.push({
            x: gx * TILE_SIZE,
            y: gy * TILE_SIZE,
            w: gw * TILE_SIZE,
            h: gh * TILE_SIZE,
            type
        });
    };

    const addCrumble = (gx, gy, gw = 2.5) => {
        crumblePlatforms.push({
            x: gx * TILE_SIZE,
            y: gy * TILE_SIZE,
            w: gw * TILE_SIZE,
            h: 22
        });
    };

    const addSaw = (gx, gy, endGx = null, endGy = null, speed = 1.4, r = 24) => {
        const sx = gx * TILE_SIZE;
        const sy = gy * TILE_SIZE;
        saws.push({
            x: sx,
            y: sy,
            r,
            startX: sx,
            endX: endGx !== null ? endGx * TILE_SIZE : sx,
            startY: sy,
            endY: endGy !== null ? endGy * TILE_SIZE : sy,
            speed
        });
    };

    const addCoinArc = (startX, y, count, spacing = 44, arcHeight = 35) => {
        for (let i = 0; i < count; i++) {
            const t = count > 1 ? i / (count - 1) : 0.5;
            const offsetY = Math.sin(t * Math.PI) * arcHeight;
            coins.push({
                x: startX + i * spacing,
                y: y - offsetY,
                type: 'coin'
            });
        }
    };

    switch (levelIndex) {
        case 0: {
            // BÖLÜM 1 (KOLAY): Geniş platformlar, lav yok, sadece 2 yavaş Slime, kolay öğrenme
            addGround(0, 12, 22, 5);
            signs.push({ x: 200, y: 12 * TILE_SIZE - 55, text: "Bölüm 1 (Kolay): A/D Koş | W/Boşluk Hızlı Zıpla" });
            signs.push({ x: 560, y: 12 * TILE_SIZE - 55, text: "[?] Bloklarına Alttan Vur -> Ateş Topu & Kalkan!" });

            mysteryBlocks.push({ x: 9 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'coins' });
            mysteryBlocks.push({ x: 11 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
            addCoinArc(280, 10.5 * TILE_SIZE, 5);
            enemies.push({ x: 700, y: 11 * TILE_SIZE, type: 'slime', minX: 540, maxX: 880 });

            addGround(23, 11, 16, 6);
            addCoinArc(25 * TILE_SIZE, 9.5 * TILE_SIZE, 6);
            enemies.push({ x: 29 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'slime', minX: 25 * TILE_SIZE, maxX: 34 * TILE_SIZE });

            addGround(28, 8, 5, 1, 'platform');
            mysteryBlocks.push({ x: 30 * TILE_SIZE, y: 5 * TILE_SIZE, content: 'speed' });
            coins.push({ x: 30 * TILE_SIZE + 24, y: 7.1 * TILE_SIZE, type: 'emerald' });

            // Checkpoint 1 + Easy Wall Jump
            addGround(40, 12, 26, 5);
            checkpoints.push({ x: 41.5 * TILE_SIZE, y: 12 * TILE_SIZE - 64 });
            signs.push({ x: 44.5 * TILE_SIZE, y: 12 * TILE_SIZE - 55, text: "Duvara Zıpla -> Duvardan Sek! (Wall Jump)" });

            addGround(47, 5, 2, 7, 'wall');
            addGround(52, 4, 2, 6, 'wall');
            for (let i = 0; i < 4; i++) {
                coins.push({ x: 50.5 * TILE_SIZE, y: (9 - i * 1.2) * TILE_SIZE, type: 'coin' });
            }
            coins.push({ x: 45 * TILE_SIZE, y: 11.1 * TILE_SIZE, type: 'emerald' });

            coins.push({ x: 60 * TILE_SIZE, y: 11.1 * TILE_SIZE, type: 'emerald' });
            portal = { x: 63 * TILE_SIZE, y: 12 * TILE_SIZE - 86 };
            break;
        }

        case 1: {
            // BÖLÜM 2 (NORMAL): İlk lav çukuru, çöken köprüler, düşen sarkıtlar ve Neon Akrep (crawler)
            addGround(0, 12, 15, 5);
            signs.push({ x: 250, y: 12 * TILE_SIZE - 55, text: "Bölüm 2: Çöken Köprüler, Sarkıtlar ve Hızlı Akrepler!" });
            mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
            mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });

            addGround(12, 1, 24, 1.5, 'wall');
            stalactites.push({ x: 14 * TILE_SIZE, y: 2.5 * TILE_SIZE });
            stalactites.push({ x: 22 * TILE_SIZE, y: 2.5 * TILE_SIZE });
            stalactites.push({ x: 31 * TILE_SIZE, y: 2.5 * TILE_SIZE });

            hazards.push({ x: 15 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 13 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(15, 14, 13, 3);
            addCrumble(16.5, 11, 2.8);
            addCrumble(20.5, 9.8, 2.8);
            addCrumble(24.5, 11, 2.8);
            addCoinArc(17 * TILE_SIZE, 9.2 * TILE_SIZE, 6, 50);

            addGround(28, 11, 15, 6);
            checkpoints.push({ x: 29.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
            enemies.push({ x: 34 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'slime', minX: 31 * TILE_SIZE, maxX: 38 * TILE_SIZE });
            enemies.push({ x: 39 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'crawler', minX: 35 * TILE_SIZE, maxX: 42 * TILE_SIZE });
            mysteryBlocks.push({ x: 36 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'speed' });

            hazards.push({ x: 43 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 12 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(43, 14, 12, 3);
            addCrumble(44.5, 10.5, 2.5);
            addCrumble(49.5, 9.2, 2.5);
            coins.push({ x: 50.5 * TILE_SIZE, y: 8.3 * TILE_SIZE, type: 'emerald' });

            addGround(55, 10, 16, 7);
            enemies.push({ x: 60 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'crawler', minX: 56 * TILE_SIZE, maxX: 64 * TILE_SIZE });
            enemies.push({ x: 65 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'golem', minX: 61 * TILE_SIZE, maxX: 68 * TILE_SIZE });
            coins.push({ x: 66 * TILE_SIZE, y: 9.1 * TILE_SIZE, type: 'emerald' });

            portal = { x: 69 * TILE_SIZE, y: 10 * TILE_SIZE - 86 };
            break;
        }

        case 2: {
            // BÖLÜM 3 (BOSS 1 - KRİSTAL DEV): 10 Can
            addGround(0, 12, 44, 5);
            addGround(0, 0, 2, 12, 'wall');
            addGround(42, 0, 2, 12, 'wall');

            signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: "BOSS 1: Kristal Dev! Güçlendirmeleri Al ve İlerle!" });
            mysteryBlocks.push({ x: 7 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
            mysteryBlocks.push({ x: 9 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            checkpoints.push({ x: 12 * TILE_SIZE, y: 12 * TILE_SIZE - 64 });

            addGround(17, 9, 4, 0.7, 'platform');
            addGround(25, 7.2, 5, 0.7, 'platform');
            addGround(33, 9, 4, 0.7, 'platform');
            coins.push({ x: 19 * TILE_SIZE, y: 8.1 * TILE_SIZE, type: 'emerald' });

            bossConfig = {
                name: "KRİSTAL DEV (BOSS 1)",
                hp: 10,
                x: 31 * TILE_SIZE,
                y: 12 * TILE_SIZE - 110,
                minX: 15 * TILE_SIZE,
                maxX: 40 * TILE_SIZE,
                variant: 1
            };
            portal = { x: 27 * TILE_SIZE, y: 12 * TILE_SIZE - 86, lockedUntilBossDead: true };
            break;
        }

        case 3: {
            // BÖLÜM 4 (ORTA): Dönen Testereler + Zırhlı Golemler + Hızlı Akrepler
            addGround(0, 12, 16, 5);
            signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: "Bölüm 4 (Orta): Dönen Testereler ve Zırhlı Golemler!" });
            mysteryBlocks.push({ x: 7 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 9 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });

            addSaw(11, 11.8, 15, 11.8, 1.4, 24);

            hazards.push({ x: 16 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 16 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(16, 14, 16, 3);
            addGround(18, 10, 4, 0.8, 'platform');
            addSaw(18.5, 9.8, 21.5, 9.8, 1.3, 20);
            addGround(25, 8.5, 4, 0.8, 'platform');
            addCoinArc(18.5 * TILE_SIZE, 7.8 * TILE_SIZE, 6, 48);

            addGround(32, 11, 14, 6);
            checkpoints.push({ x: 33.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
            enemies.push({ x: 37 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'golem', minX: 35 * TILE_SIZE, maxX: 42 * TILE_SIZE });
            enemies.push({ x: 41 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'crawler', minX: 36 * TILE_SIZE, maxX: 45 * TILE_SIZE });
            mysteryBlocks.push({ x: 39 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'shield' });

            addGround(48, 3, 2, 9, 'wall');
            addGround(53, 2, 2, 10, 'wall');
            addSaw(51.5, 9.5, 51.5, 4.5, 1.3, 20);
            for (let i = 0; i < 5; i++) {
                coins.push({ x: 51.5 * TILE_SIZE, y: (10 - i * 1.3) * TILE_SIZE, type: 'coin' });
            }
            coins.push({ x: 46.8 * TILE_SIZE, y: 11.1 * TILE_SIZE, type: 'emerald' });

            addGround(46, 12, 28, 5);
            addSaw(56, 11.8, 62, 11.8, 1.5, 26);
            enemies.push({ x: 64 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'golem', minX: 62 * TILE_SIZE, maxX: 69 * TILE_SIZE });
            enemies.push({ x: 68 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'crawler', minX: 63 * TILE_SIZE, maxX: 71 * TILE_SIZE });
            coins.push({ x: 68 * TILE_SIZE, y: 11.1 * TILE_SIZE, type: 'emerald' });

            portal = { x: 72 * TILE_SIZE, y: 12 * TILE_SIZE - 86 };
            break;
        }

        case 4: {
            // BÖLÜM 5 (ORTA-ZOR): Solucan Deliği + Ateş Eden Karanlık Nöbetçiler (Sentinel)
            addGround(0, 12, 16, 5);
            signs.push({ x: 260, y: 12 * TILE_SIZE - 55, text: "Bölüm 5: 🌀 Solucan Deliğine Gir ve Nöbetçileri Atlat!" });
            mysteryBlocks.push({ x: 7 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 9 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });

            // Barrier wall + Wormhole #1 (Teleports player cleanly past the barrier onto the mid-screen platform)
            addGround(15, 4, 2, 8, 'wall');
            teleporters.push({
                x1: 13 * TILE_SIZE, y1: 12 * TILE_SIZE - 56,
                x2: 18.5 * TILE_SIZE, y2: 8.5 * TILE_SIZE - 56,
                color: "#00f2fe"
            });

            // Continuous lower lava + ground so the screen is never empty below!
            hazards.push({ x: 16 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 17 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(16, 14, 17, 3);

            // Mid-screen main platform after Wormhole #1 (comfortable height y = 8.5)
            addGround(17, 8.5, 16, 1.2, 'platform');
            addCoinArc(20.5 * TILE_SIZE, 7.2 * TILE_SIZE, 6);
            enemies.push({ x: 24 * TILE_SIZE, y: 7.5 * TILE_SIZE, type: 'sentinel', minX: 20 * TILE_SIZE, maxX: 28 * TILE_SIZE });
            enemies.push({ x: 29 * TILE_SIZE, y: 7.5 * TILE_SIZE, type: 'crawler', minX: 22 * TILE_SIZE, maxX: 32 * TILE_SIZE });
            coins.push({ x: 31 * TILE_SIZE, y: 7.6 * TILE_SIZE, type: 'emerald' });

            // Mid-level checkpoint bastion
            addGround(33, 11, 16, 6);
            checkpoints.push({ x: 34.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
            mysteryBlocks.push({ x: 37.5 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'speed' });
            addSaw(39, 10.8, 44.5, 10.8, 1.4, 22);
            enemies.push({ x: 43 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'sentinel', minX: 39 * TILE_SIZE, maxX: 46.5 * TILE_SIZE });

            // Barrier wall + Wormhole #2 over lava canyon
            addGround(48, 4, 1.5, 7, 'wall');
            hazards.push({ x: 49 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 14 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(49, 14, 14, 3);
            teleporters.push({
                x1: 46.5 * TILE_SIZE, y1: 11 * TILE_SIZE - 56,
                x2: 51.5 * TILE_SIZE, y2: 8.5 * TILE_SIZE - 56,
                color: "#b537f2"
            });
            addGround(50.5, 8.5, 6.5, 1.0, 'platform');
            addCrumble(58.5, 9.2, 3.2);
            coins.push({ x: 55 * TILE_SIZE, y: 7.6 * TILE_SIZE, type: 'emerald' });
            coins.push({ x: 60 * TILE_SIZE, y: 8.3 * TILE_SIZE, type: 'emerald' });

            // Final section & Exit Portal
            addGround(63, 10, 16, 7);
            enemies.push({ x: 67 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'golem', minX: 64 * TILE_SIZE, maxX: 72 * TILE_SIZE });
            enemies.push({ x: 72 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'sentinel', minX: 68 * TILE_SIZE, maxX: 75 * TILE_SIZE });
            portal = { x: 76 * TILE_SIZE, y: 10 * TILE_SIZE - 86 };
            break;
        }

        case 5: {
            // BÖLÜM 6 (BOSS 2 - ZİNDAN CELLADI): 15 Can + Arena Testeresi + Portallar
            addGround(0, 12, 46, 5);
            addGround(0, 0, 2, 12, 'wall');
            addGround(44, 0, 2, 12, 'wall');

            signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: "BOSS 2: Zindan Celladı! Daha Hızlı ve Testereli Arena!" });
            mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
            mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });
            checkpoints.push({ x: 12 * TILE_SIZE, y: 12 * TILE_SIZE - 64 });

            addGround(17, 8.8, 4, 0.7, 'platform');
            addGround(26, 6.8, 5, 0.7, 'platform');
            addGround(35, 8.8, 4, 0.7, 'platform');
            addSaw(25, 11.8, 32, 11.8, 1.5, 22);

            teleporters.push({
                x1: 15.5 * TILE_SIZE, y1: 12 * TILE_SIZE - 56,
                x2: 28 * TILE_SIZE, y2: 6.8 * TILE_SIZE - 56,
                color: "#00f2fe"
            });

            bossConfig = {
                name: "ZİNDAN CELLADI (BOSS 2)",
                hp: 15,
                x: 34 * TILE_SIZE,
                y: 12 * TILE_SIZE - 110,
                minX: 15 * TILE_SIZE,
                maxX: 42 * TILE_SIZE,
                variant: 2
            };
            portal = { x: 28 * TILE_SIZE, y: 12 * TILE_SIZE - 86, lockedUntilBossDead: true };
            break;
        }

        case 6: {
            // BÖLÜM 7 (ZOR): Sıfır Yerçekimi + Çoklu Hızlı Testereler + Elit Golem & Nöbetçiler
            addGround(0, 12, 14, 5);
            signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: "Bölüm 7 (Zor): Düşük Yerçekimi ve Çoklu Testereler!" });
            mysteryBlocks.push({ x: 7 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 9 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });

            gravityZones.push({ x: 13 * TILE_SIZE, y: 1 * TILE_SIZE, w: 20 * TILE_SIZE, h: 12 * TILE_SIZE });
            hazards.push({ x: 14 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 18 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(14, 14, 18, 3);

            addGround(18, 9.5, 2.6, 0.8, 'platform');
            addSaw(22, 4, 22, 10.5, 1.5, 24);
            addGround(25.5, 6.5, 2.6, 0.8, 'platform');
            addSaw(29.5, 3.5, 29.5, 10, 1.6, 24);
            addCoinArc(16 * TILE_SIZE, 6 * TILE_SIZE, 8, 52, 60);
            coins.push({ x: 19.3 * TILE_SIZE, y: 8.6 * TILE_SIZE, type: 'emerald' });

            addGround(32, 11, 14, 6);
            checkpoints.push({ x: 33.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
            enemies.push({ x: 37 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'golem', minX: 35 * TILE_SIZE, maxX: 43 * TILE_SIZE });
            enemies.push({ x: 41 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'sentinel', minX: 36 * TILE_SIZE, maxX: 45 * TILE_SIZE });
            mysteryBlocks.push({ x: 38 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'speed' });

            gravityZones.push({ x: 46 * TILE_SIZE, y: 1 * TILE_SIZE, w: 22 * TILE_SIZE, h: 12 * TILE_SIZE });
            hazards.push({ x: 46 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 22 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(46, 14, 22, 3);

            addCrumble(49.5, 9.5, 2.2);
            addSaw(54, 4.5, 54, 11, 1.6, 26);
            addCrumble(58, 7.5, 2.2);
            addSaw(62.5, 3.5, 62.5, 10.5, 1.7, 26);
            coins.push({ x: 59 * TILE_SIZE, y: 6.6 * TILE_SIZE, type: 'emerald' });

            addGround(68, 10, 15, 7);
            enemies.push({ x: 72 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'golem', minX: 69 * TILE_SIZE, maxX: 77 * TILE_SIZE });
            enemies.push({ x: 76 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'crawler', minX: 70 * TILE_SIZE, maxX: 79 * TILE_SIZE });
            portal = { x: 80 * TILE_SIZE, y: 10 * TILE_SIZE - 86 };
            break;
        }

        case 7: {
            // BÖLÜM 8 (ÇOK ZOR): Hızla Çöken Köprüler + Yoğun Sarkıt Yağmuru + Testereler
            addGround(0, 12, 12, 5);
            signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: "Bölüm 8 (Çok Zor): Köprüler Çok Hızlı Çöker, Hiç Durma!" });
            mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });
            mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });

            hazards.push({ x: 12 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 26 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(12, 14, 26, 3);
            addGround(13, 1, 24, 1.2, 'wall');

            for (let i = 0; i < 6; i++) {
                addCrumble(13.2 + i * 4.2, 10.5 - (i % 2) * 1.4, 2.0);
                stalactites.push({ x: (14.2 + i * 4.2) * TILE_SIZE, y: 2.2 * TILE_SIZE });
                coins.push({ x: (14.2 + i * 4.2) * TILE_SIZE, y: (8.5 - (i % 2) * 1.4) * TILE_SIZE, type: 'coin' });
            }

            addGround(38, 11, 13, 6);
            checkpoints.push({ x: 39.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
            mysteryBlocks.push({ x: 42 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'fire' });
            enemies.push({ x: 44 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'crawler', minX: 40 * TILE_SIZE, maxX: 49 * TILE_SIZE });
            enemies.push({ x: 47 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'sentinel', minX: 42 * TILE_SIZE, maxX: 50 * TILE_SIZE });

            teleporters.push({
                x1: 49.5 * TILE_SIZE, y1: 11 * TILE_SIZE - 56,
                x2: 54 * TILE_SIZE, y2: 9 * TILE_SIZE - 56,
                color: "#06d6a0"
            });

            gravityZones.push({ x: 52 * TILE_SIZE, y: 1 * TILE_SIZE, w: 20 * TILE_SIZE, h: 12 * TILE_SIZE });
            hazards.push({ x: 51 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 21 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(51, 14, 21, 3);
            addGround(52, 9, 4.5, 0.8, 'platform');
            addCrumble(58, 8, 2.4);
            addSaw(62, 3.5, 62, 10.5, 1.7, 26);
            addCrumble(65, 6.5, 2.4);
            addSaw(69, 3.5, 69, 10.5, 1.8, 26);
            coins.push({ x: 66 * TILE_SIZE, y: 5.6 * TILE_SIZE, type: 'emerald' });

            addGround(72, 10, 15, 7);
            enemies.push({ x: 76 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'golem', minX: 73 * TILE_SIZE, maxX: 81 * TILE_SIZE });
            enemies.push({ x: 80 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'sentinel', minX: 75 * TILE_SIZE, maxX: 83 * TILE_SIZE });
            portal = { x: 84 * TILE_SIZE, y: 10 * TILE_SIZE - 86 };
            break;
        }

        case 8: {
            // BÖLÜM 9 (UZMAN): Çift Testereli Kule + Elit Ordular
            addGround(0, 12, 20, 5);
            signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: "Bölüm 9 (Uzman): Karanlık Kule Tırmanışı!" });
            mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
            mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });

            // Wall Jump + Dual Saws
            addGround(14, 3, 2, 9, 'wall');
            addGround(19, 2, 2, 10, 'wall');
            addSaw(17.5, 10.5, 17.5, 6.5, 1.5, 20);
            addSaw(17.5, 6.0, 17.5, 2.5, 1.5, 20);
            coins.push({ x: 23 * TILE_SIZE, y: 6.1 * TILE_SIZE, type: 'emerald' });

            hazards.push({ x: 20 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 16 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
            addGround(20, 14, 16, 3);
            addGround(21, 7, 14, 1, 'platform');
            enemies.push({ x: 25 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'golem', minX: 22 * TILE_SIZE, maxX: 32 * TILE_SIZE });
            enemies.push({ x: 30 * TILE_SIZE, y: 6 * TILE_SIZE, type: 'sentinel', minX: 24 * TILE_SIZE, maxX: 34 * TILE_SIZE });
            addSaw(26, 6.8, 33, 6.8, 1.6, 22);

            addGround(36, 11, 14, 6);
            checkpoints.push({ x: 37.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
            teleporters.push({
                x1: 45.5 * TILE_SIZE, y1: 11 * TILE_SIZE - 56,
                x2: 51 * TILE_SIZE, y2: 11 * TILE_SIZE - 56,
                color: "#ffd166"
            });
            addGround(48, 2, 2, 10, 'wall');

            addGround(50, 11, 32, 6);
            gravityZones.push({ x: 54 * TILE_SIZE, y: 2 * TILE_SIZE, w: 16 * TILE_SIZE, h: 9 * TILE_SIZE });
            addSaw(55, 10.8, 63, 10.8, 1.8, 26);
            addSaw(63, 10.8, 70, 10.8, 1.8, 26);
            addSaw(62, 5, 62, 9.5, 1.6, 24);
            enemies.push({ x: 71 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'golem', minX: 68 * TILE_SIZE, maxX: 77 * TILE_SIZE });
            enemies.push({ x: 75 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'sentinel', minX: 70 * TILE_SIZE, maxX: 78 * TILE_SIZE });
            enemies.push({ x: 73 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'crawler', minX: 67 * TILE_SIZE, maxX: 78 * TILE_SIZE });
            coins.push({ x: 53 * TILE_SIZE, y: 10.1 * TILE_SIZE, type: 'emerald' });

            portal = { x: 79 * TILE_SIZE, y: 11 * TILE_SIZE - 86 };
            break;
        }

        case 9: {
            // BÖLÜM 10 (BOSS 3 - KARANLIK İMPARATOR): 18 Can + Çift Testereli Arena + Portallar
            addGround(0, 12, 48, 5);
            addGround(0, 0, 2, 12, 'wall');
            addGround(46, 0, 2, 12, 'wall');

            signs.push({ x: 250, y: 12 * TILE_SIZE - 55, text: "BÖLÜM 10 BOSS SAVAŞI (18 CAN): KARANLIK İMPARATOR!" });
            mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
            mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
            mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });
            checkpoints.push({ x: 12.5 * TILE_SIZE, y: 12 * TILE_SIZE - 64 });

            gravityZones.push({ x: 24 * TILE_SIZE, y: 2 * TILE_SIZE, w: 10 * TILE_SIZE, h: 10 * TILE_SIZE });

            addGround(17, 8.8, 4.5, 0.7, 'platform');
            addGround(26.5, 6.2, 5, 0.7, 'platform');
            addGround(36.5, 8.8, 4.5, 0.7, 'platform');

            addSaw(20, 11.8, 26, 11.8, 1.5, 20);
            addSaw(32, 11.8, 38, 11.8, 1.5, 20);

            teleporters.push({
                x1: 15.5 * TILE_SIZE, y1: 12 * TILE_SIZE - 56,
                x2: 43.5 * TILE_SIZE, y2: 12 * TILE_SIZE - 56,
                color: "#ff2a85"
            });

            coins.push({ x: 19 * TILE_SIZE, y: 7.9 * TILE_SIZE, type: 'emerald' });

            bossConfig = {
                name: "KARANLIK İMPARATOR (BOSS 3)",
                hp: 18,
                x: 35 * TILE_SIZE,
                y: 12 * TILE_SIZE - 110,
                minX: 15 * TILE_SIZE,
                maxX: 43 * TILE_SIZE,
                variant: 3
            };
            portal = { x: 29 * TILE_SIZE, y: 12 * TILE_SIZE - 86, lockedUntilBossDead: true };
            break;
        }

        default: {
            const info = LEVEL_INFO[levelIndex] || LEVEL_INFO[0];
            if (info.isBossLevel) {
                // BOSS LEVELS 15, 20, 25, 30, 35, 40
                const bossHp = 18 + Math.floor((levelIndex - 10) * 0.4);
                addGround(0, 12, 50, 5);
                addGround(0, 0, 2, 12, 'wall');
                addGround(48, 0, 2, 12, 'wall');

                signs.push({ x: 250, y: 12 * TILE_SIZE - 55, text: `${info.name} (${bossHp} CAN) - Güçlendirmeleri Al!` });
                mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
                mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
                mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });
                checkpoints.push({ x: 12.5 * TILE_SIZE, y: 12 * TILE_SIZE - 64 });

                if (levelIndex % 2 === 1) {
                    gravityZones.push({ x: 23 * TILE_SIZE, y: 2 * TILE_SIZE, w: 12 * TILE_SIZE, h: 10 * TILE_SIZE });
                }

                addGround(17, 8.8, 4.5, 0.7, 'platform');
                addGround(27, 6.2, 5.5, 0.7, 'platform');
                addGround(38, 8.8, 4.5, 0.7, 'platform');

                addSaw(20, 11.8, 27, 11.8, 1.4 + (levelIndex % 3) * 0.15, 20);
                addSaw(33, 11.8, 40, 11.8, 1.4 + (levelIndex % 3) * 0.15, 20);

                teleporters.push({
                    x1: 15.5 * TILE_SIZE, y1: 12 * TILE_SIZE - 56,
                    x2: 45 * TILE_SIZE, y2: 12 * TILE_SIZE - 56,
                    color: info.themeColor || "#ff2a85"
                });

                coins.push({ x: 19 * TILE_SIZE, y: 7.9 * TILE_SIZE, type: 'emerald' });
                coins.push({ x: 29.5 * TILE_SIZE, y: 5.3 * TILE_SIZE, type: 'emerald' });
                coins.push({ x: 40 * TILE_SIZE, y: 7.9 * TILE_SIZE, type: 'emerald' });

                bossConfig = {
                    name: info.name.toUpperCase(),
                    hp: bossHp,
                    x: 36 * TILE_SIZE,
                    y: 12 * TILE_SIZE - 110,
                    minX: 15 * TILE_SIZE,
                    maxX: 45 * TILE_SIZE,
                    variant: ((levelIndex % 3) + 1)
                };
                portal = { x: 29.5 * TILE_SIZE, y: 12 * TILE_SIZE - 86, lockedUntilBossDead: true };
            } else {
                // HANDCRAFTED PROCEDURAL CAMPAIGN LEVELS (BÖLÜM 11 - 39)
                const pattern = levelIndex % 4;

                // Section 1: Start Zone + Power-up Mystery Blocks
                addGround(0, 12, 14, 5);
                signs.push({ x: 240, y: 12 * TILE_SIZE - 55, text: `${info.name}: ${info.shortName}` });
                mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });
                mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
                mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'speed' });
                enemies.push({ x: 11 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'crawler', minX: 7 * TILE_SIZE, maxX: 13 * TILE_SIZE });

                // Section 2: First Obstacle Course (Lava + Crumble Bridges + Stalactites OR Moving Platforms + Saws)
                hazards.push({ x: 14 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 18 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
                addGround(14, 14, 18, 3);

                if (pattern === 0 || pattern === 2) {
                    addGround(15, 1, 16, 1.2, 'wall');
                    for (let i = 0; i < 4; i++) {
                        addCrumble(15.2 + i * 4.0, 10.6 - (i % 2) * 1.3, 2.4);
                        stalactites.push({ x: (16.2 + i * 4.0) * TILE_SIZE, y: 2.2 * TILE_SIZE });
                        coins.push({ x: (16.2 + i * 4.0) * TILE_SIZE, y: (8.8 - (i % 2) * 1.3) * TILE_SIZE, type: 'coin' });
                    }
                    coins.push({ x: 23.2 * TILE_SIZE, y: 9.7 * TILE_SIZE, type: 'emerald' });
                } else {
                    addGround(16, 9.8, 3.5, 0.8, 'platform');
                    addSaw(21, 5, 21, 10.8, 1.5, 22);
                    addGround(23, 8.2, 3.5, 0.8, 'platform');
                    addSaw(28, 4.5, 28, 10.5, 1.6, 22);
                    addCoinArc(16.5 * TILE_SIZE, 7.2 * TILE_SIZE, 6, 48);
                    coins.push({ x: 24.5 * TILE_SIZE, y: 7.3 * TILE_SIZE, type: 'emerald' });
                }

                // Section 3: Mid-Level Safe Bastion + Checkpoint + Guard Squad
                addGround(32, 11, 15, 6);
                checkpoints.push({ x: 33.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });
                enemies.push({ x: 37.5 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'golem', minX: 35 * TILE_SIZE, maxX: 42 * TILE_SIZE });
                enemies.push({ x: 42 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'sentinel', minX: 37 * TILE_SIZE, maxX: 45.5 * TILE_SIZE });
                coins.push({ x: 40 * TILE_SIZE, y: 10.1 * TILE_SIZE, type: 'emerald' });

                // Section 4: Wormhole Teleporter OR Wall-Jump Chimney + Low-Gravity Canyon
                if (pattern === 1 || pattern === 3) {
                    addGround(48, 3, 2, 9, 'wall');
                    addGround(53, 2, 2, 10, 'wall');
                    addSaw(51.5, 10.2, 51.5, 5.2, 1.4, 20);
                    addGround(47, 12, 9, 5);
                } else {
                    addGround(47, 12, 9, 5);
                    addGround(48, 4, 1.5, 8, 'wall');
                    teleporters.push({
                        x1: 45.5 * TILE_SIZE, y1: 11 * TILE_SIZE - 56,
                        x2: 50.5 * TILE_SIZE, y2: 8.2 * TILE_SIZE - 56,
                        color: info.themeColor || "#00f2fe"
                    });
                    addGround(49.5, 8.2, 6.5, 0.9, 'platform');
                }

                // Section 5: Low-Gravity Anomaly Canyon + Saws
                gravityZones.push({ x: 56 * TILE_SIZE, y: 1 * TILE_SIZE, w: 16 * TILE_SIZE, h: 12 * TILE_SIZE });
                hazards.push({ x: 56 * TILE_SIZE, y: 13.5 * TILE_SIZE, w: 16 * TILE_SIZE, h: 3 * TILE_SIZE, type: 'lava' });
                addGround(56, 14, 16, 3);
                addCrumble(58.5, 9.5, 2.5);
                addSaw(63, 4.5, 63, 10.5, 1.6, 24);
                addCrumble(66, 8.0, 2.5);
                coins.push({ x: 67.2 * TILE_SIZE, y: 7.1 * TILE_SIZE, type: 'emerald' });

                // Section 6: Final Citadel & Exit Portal
                addGround(72, 10, 16, 7);
                enemies.push({ x: 76 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'golem', minX: 73.5 * TILE_SIZE, maxX: 81 * TILE_SIZE });
                enemies.push({ x: 80.5 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'sentinel', minX: 76 * TILE_SIZE, maxX: 84 * TILE_SIZE });
                enemies.push({ x: 78 * TILE_SIZE, y: 9 * TILE_SIZE, type: 'crawler', minX: 74 * TILE_SIZE, maxX: 83 * TILE_SIZE });
                coins.push({ x: 82 * TILE_SIZE, y: 9.1 * TILE_SIZE, type: 'emerald' });

                portal = { x: 85 * TILE_SIZE, y: 10 * TILE_SIZE - 86 };
            }
            break;
        }
    }

    const info = LEVEL_INFO[levelIndex];
    normalizeLevelCollectibles(
        coins,
        mysteryBlocks,
        solids,
        crumblePlatforms,
        portal,
        Boolean(info && info.isBossLevel),
        hazards,
        teleporters,
        checkpoints,
        saws
    );

    return {
        info,
        solids,
        mysteryBlocks,
        hazards,
        coins,
        enemies,
        movingPlatforms,
        crumblePlatforms,
        saws,
        stalactites,
        checkpoints,
        teleporters,
        gravityZones,
        signs,
        portal,
        bossConfig
    };
}

window.TILE_SIZE = TILE_SIZE;
window.LEVEL_INFO = LEVEL_INFO;
window.createLevelData = createLevelData;

// ============================================================================
// 😡 15-LEVEL TROLL MODE CAMPAIGN (TROL MODU - 15 BÖLÜM)
// Only specific floors, [?] boxes, and Ancient Emeralds are booby-trapped!
// ============================================================================
const TROLL_LEVEL_INFO = [
    { id: 0, world: "😡 TROL MODU 1/15", shortName: "Sahte Başlangıç", name: "Trol Bölüm 1: Masum Görünen Yol", desc: "Dikkat! Her yer değil ama belirli zeminler bir anda çöker (-3 ♥), bazı [?] kutularından Uranyum Bombası yağar (-3 ♥) ve bazı Zümrütler en başa ışınlar!", themeColor: "#ff2a85", isBossLevel: false, isTroll: true },
    { id: 1, world: "😡 TROL MODU 2/15", shortName: "Uranyum Sürprizi", name: "Trol Bölüm 2: Uranyum Kutusu Tuzağı", desc: "Üç [?] kutusundan ikisi gerçek güç verir ama birine vurursan kafana Uranyum Bombası yağar! Doğru olanı seç.", themeColor: "#ff5400", isBossLevel: false, isTroll: true },
    { id: 2, world: "😡 TROL MODU 3/15", shortName: "Zümrüt Serabı", name: "Trol Bölüm 3: Zümrüt Serabı", desc: "Yerdeki Antik Zümrütlerin bazıları gerçek, ama parlayan tuzak zümrütü alırsan en başa ışınlanırsın!", themeColor: "#06d6a0", isBossLevel: false, isTroll: true },
    { id: 3, world: "😡 TROL MODU 4/15", shortName: "Çöken Köprü", name: "Trol Bölüm 4: Hain Zeminler", desc: "Düz yolda koşarken belirli taş bloklar anında çöker ve 3 kalbini birden götürür! Üst platformları kullan.", themeColor: "#ffd166", isBossLevel: false, isTroll: true },
    { id: 4, world: "😡 TROL MODU 5/15", shortName: "Trol Dev ☠", name: "Trol Bölüm 5: Trol Kralı Muhafız (Boss)", desc: "Trol Boss Savaşı! Arenadaki belirli kutu ve zümrüt tuzaklarına düşmeden Boss'u ez!", themeColor: "#ff2a85", isBossLevel: true, isTroll: true },
    { id: 5, world: "😡 TROL MODU 6/15", shortName: "Radyoaktif Mağara", name: "Trol Bölüm 6: Radyoaktif Mağara", desc: "Kafana Uranyum Bombası yağdıran [?] kutularının üzerinden atla, sadece güvenli kutuları kır!", themeColor: "#38b000", isBossLevel: false, isTroll: true },
    { id: 6, world: "😡 TROL MODU 7/15", shortName: "Başa Sar!", name: "Trol Bölüm 7: Başa Saran Labirent", desc: "Portalın hemen önündeki yem zümrüte sakın dokunma! Yoksa bölümün en başına uçarsın.", themeColor: "#b537f2", isBossLevel: false, isTroll: true },
    { id: 7, world: "😡 TROL MODU 8/15", shortName: "Görünmez Çukur", name: "Trol Bölüm 8: Hain Uçurumlar", desc: "Sağlam görünen zeminlerin ortasındaki tuzak parçalara basmadan zıplayarak ilerle!", themeColor: "#00f2fe", isBossLevel: false, isTroll: true },
    { id: 8, world: "😡 TROL MODU 9/15", shortName: "Üçlü İhanet", name: "Trol Bölüm 9: Üçlü İhanet Koridoru", desc: "Çöken yer, Uranyum kutusu ve Başa ışınlayan zümrüt aynı koridorda! Hafızanı konuştur.", themeColor: "#ff5400", isBossLevel: false, isTroll: true },
    { id: 9, world: "😡 TROL MODU 10/15", shortName: "Nükleer Cellat ☠", name: "Trol Bölüm 10: Nükleer Cellat (Boss)", desc: "10. Trol Bölümü Boss Savaşı! Arenanın ortasındaki çöken zemine ve sahte zümrüte dikkat et!", themeColor: "#ff2a85", isBossLevel: true, isTroll: true },
    { id: 10, world: "😡 TROL MODU 11/15", shortName: "Sinir Krizi", name: "Trol Bölüm 11: Sinir Krizi Viyadüğü", desc: "Gerçek zümrütler üst yolda, en başa ışınlayan sahte zümrütler alt yolda seni bekliyor!", themeColor: "#ffd166", isBossLevel: false, isTroll: true },
    { id: 11, world: "😡 TROL MODU 12/15", shortName: "Atom Yağmuru", name: "Trol Bölüm 12: Atom Yağmuru", desc: "Yanlış [?] kutusuna kafa atarsan gökten Uranyum Bombaları yağar ve 3 canın gider!", themeColor: "#38b000", isBossLevel: false, isTroll: true },
    { id: 12, world: "😡 TROL MODU 13/15", shortName: "Sabır Testi", name: "Trol Bölüm 13: Sabır Testi Kulesi", desc: "Duvar zıplaması yaparken hangi platformun çöküp hangisinin sağlam olduğunu iyi seç!", themeColor: "#b537f2", isBossLevel: false, isTroll: true },
    { id: 13, world: "😡 TROL MODU 14/15", shortName: "Son Şaka", name: "Trol Bölüm 14: Finale Ramak Kala", desc: "Bitiş portalının yanındaki tuzak zemin ve sahte zümrüt son anda seni avlamaya çalışacak!", themeColor: "#00f2fe", isBossLevel: false, isTroll: true },
    { id: 14, world: "😡 TROL FİNAL 15/15", shortName: "Trol İmparator 👑", name: "Trol Bölüm 15: Trol İmparatoru (Büyük Final)", desc: "15. Trol Bölümü Final Savaşı! Hem Trol İmparatoru'nu hem de arenadaki Uranyum ve Zemin tuzaklarını alt et!", themeColor: "#ff2a85", isBossLevel: true, isTroll: true }
];

function createTrollLevelData(trollIndex) {
    const idx = Math.max(0, Math.min(14, trollIndex));
    const info = TROLL_LEVEL_INFO[idx];
    const solids = [];
    const mysteryBlocks = [];
    const hazards = [];
    const coins = [];
    const enemies = [];
    const movingPlatforms = [];
    const crumblePlatforms = [];
    const saws = [];
    const stalactites = [];
    const checkpoints = [];
    const teleporters = [];
    const gravityZones = [];
    const signs = [];
    let portal = { x: 3200, y: 400 };
    let bossConfig = null;

    const addGround = (gx, gy, gw, gh = 4, type = 'ground', isTrollTrapFloor = false) => {
        solids.push({
            x: gx * TILE_SIZE,
            y: gy * TILE_SIZE,
            w: gw * TILE_SIZE,
            h: gh * TILE_SIZE,
            type,
            isTrollTrapFloor,
            trollCollapsed: false
        });
    };

    const addSaw = (gx, gy, endGx = null, endGy = null, speed = 2.6, r = 22) => {
        const sx = gx * TILE_SIZE;
        const sy = gy * TILE_SIZE;
        saws.push({
            x: sx,
            y: sy,
            r,
            startX: sx,
            endX: endGx !== null ? endGx * TILE_SIZE : sx,
            startY: sy,
            endY: endGy !== null ? endGy * TILE_SIZE : sy,
            speed
        });
    };

    if (info.isBossLevel) {
        // TROLL BOSS LEVELS (5, 10, 15)
        const bossHp = 12 + idx;
        // Safe start + specific trap floor in the middle of the arena!
        addGround(0, 12, 22, 5, 'ground', false);
        addGround(22, 12, 4.5, 5, 'ground', true); // SPECIFIC TRAP FLOOR #1 (Collapses & takes 3 hearts!)
        addGround(26.5, 12, 21.5, 5, 'ground', false);

        addGround(0, 0, 2, 12, 'wall');
        addGround(46, 0, 2, 12, 'wall');

        signs.push({
            x: 260,
            y: 12 * TILE_SIZE - 55,
            text: `${info.name} - Dikkat: Ortadaki Kırmızı Çatlak Zemin, Ortadaki [?] ve Sağdaki Zümrüt TROL TUZAĞIDIR!`
        });

        // 2 Safe Mystery Boxes + 1 Specific Uranium Bomb Box!
        mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' });
        mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'troll_uranium' }); // URANIUM BOMB TRAP!
        mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' });

        checkpoints.push({ x: 12.5 * TILE_SIZE, y: 12 * TILE_SIZE - 64 });

        // Safe upper platforms so player can jump over the trap floor
        addGround(17, 8.8, 4.5, 0.7, 'platform', false);
        addGround(23.5, 7.0, 5, 0.7, 'platform', false);
        addGround(34, 8.8, 4.5, 0.7, 'platform', false);

        // 2 Real Emeralds + 1 Specific Teleport-to-Start Trap Emerald!
        coins.push({ x: 19 * TILE_SIZE, y: 8.8 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: false });
        coins.push({ x: 26 * TILE_SIZE, y: 7.0 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: false });
        coins.push({ x: 36.2 * TILE_SIZE, y: 8.8 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: true }); // TELEPORTS TO START!

        bossConfig = {
            name: info.name.toUpperCase(),
            hp: bossHp,
            x: 34 * TILE_SIZE,
            y: 12 * TILE_SIZE - 110,
            minX: 15 * TILE_SIZE,
            maxX: 43 * TILE_SIZE,
            variant: ((idx % 3) + 1)
        };
        portal = { x: 29.5 * TILE_SIZE, y: 12 * TILE_SIZE - 86, lockedUntilBossDead: true };
    } else {
        // REGULAR TROLL LEVELS (1..15)
        // Section 1: Safe Start + Trap Floor #1 (Player can jump over it or use upper safe platform!)
        addGround(0, 12, 13, 5, 'ground', false);
        addGround(13, 12, 4, 5, 'ground', true); // SPECIFIC TRAP FLOOR #1 (Collapses & deals 3 hearts!)
        addGround(17, 12, 14, 5, 'ground', false);

        // Safe upper bypass platform above Trap Floor #1
        addGround(12.5, 8.8, 5, 0.8, 'platform', false);

        signs.push({
            x: 240,
            y: 12 * TILE_SIZE - 55,
            text: `😡 ${info.name}: Belirli Zeminler Çöker (-3♥), Belirli [?] Uranyum Yağdırır (-3♥), Belirli ❖ Başa Işınlar!`
        });

        // 2 Real [?] boxes + 1 Specific Uranium Bomb [?] box!
        mysteryBlocks.push({ x: 6 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'fire' }); // Safe Fireball
        mysteryBlocks.push({ x: 8 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'troll_uranium' }); // URANIUM BOMB TRAP (-3 HEARTS)!
        mysteryBlocks.push({ x: 10 * TILE_SIZE, y: 8.5 * TILE_SIZE, content: 'shield' }); // Safe Shield

        // 1 Real Emerald on upper platform + 1 Specific Teleport-to-Start Emerald on ground!
        coins.push({ x: 15 * TILE_SIZE, y: 8.8 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: false }); // REAL EMERALD
        coins.push({ x: 21 * TILE_SIZE, y: 12 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: true }); // FAKE EMERALD -> TELEPORTS TO START!

        enemies.push({ x: 24 * TILE_SIZE, y: 11 * TILE_SIZE, type: 'crawler', minX: 18 * TILE_SIZE, maxX: 28 * TILE_SIZE });

        // Section 2: Mid-Level Checkpoint + Second Mix of Real & Troll Traps
        addGround(31, 11, 15, 6, 'ground', false);
        checkpoints.push({ x: 32.5 * TILE_SIZE, y: 11 * TILE_SIZE - 64 });

        // 1 Real [?] box + 1 Uranium Bomb [?] box
        mysteryBlocks.push({ x: 36 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'speed' }); // Safe Speed
        mysteryBlocks.push({ x: 38.5 * TILE_SIZE, y: 7.5 * TILE_SIZE, content: 'troll_uranium' }); // URANIUM BOMB TRAP!

        enemies.push({ x: 41 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'golem', minX: 35 * TILE_SIZE, maxX: 44 * TILE_SIZE });
        coins.push({ x: 43 * TILE_SIZE, y: 11 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: false }); // REAL EMERALD

        // Section 3: Second Collapsing Trap Floor + Safe Upper Route
        addGround(46, 11, 5, 6, 'ground', false);
        addGround(51, 11, 4.2, 6, 'ground', true); // SPECIFIC TRAP FLOOR #2 (Collapses & deals 3 hearts!)
        addGround(55.2, 11, 15, 6, 'ground', false);

        // Safe upper route over Trap Floor #2
        addGround(50, 7.6, 6.5, 0.8, 'platform', false);
        addSaw(58, 10.8, 63, 10.8, 1.4 + (idx % 3) * 0.15, 22);

        // 1 Real Emerald on upper route + 1 Teleport-to-Start Trap Emerald right before portal!
        coins.push({ x: 53 * TILE_SIZE, y: 7.6 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: false }); // REAL EMERALD
        coins.push({ x: 64.5 * TILE_SIZE, y: 11 * TILE_SIZE - 34, type: 'emerald', isTrollTeleport: true }); // TROLL EMERALD NEAR PORTAL!

        enemies.push({ x: 62 * TILE_SIZE, y: 10 * TILE_SIZE, type: 'sentinel', minX: 57 * TILE_SIZE, maxX: 66 * TILE_SIZE });

        portal = { x: 67.5 * TILE_SIZE, y: 11 * TILE_SIZE - 86 };
    }

    normalizeLevelCollectibles(
        coins,
        mysteryBlocks,
        solids,
        crumblePlatforms,
        portal,
        Boolean(info && info.isBossLevel),
        hazards,
        teleporters,
        checkpoints,
        saws
    );

    return {
        info,
        solids,
        mysteryBlocks,
        hazards,
        coins,
        enemies,
        movingPlatforms,
        crumblePlatforms,
        saws,
        stalactites,
        checkpoints,
        teleporters,
        gravityZones,
        signs,
        portal,
        bossConfig
    };
}

window.TROLL_LEVEL_INFO = TROLL_LEVEL_INFO;
window.createTrollLevelData = createTrollLevelData;

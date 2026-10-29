// Articulated Character, Monster & Boss Rendering Engine + Snappy Physics

const SKIN_PALETTES = {
    cyan: {
        primary: "#00f2fe",
        secondary: "#0077b6",
        armorDark: "#141b33",
        armorLight: "#2b3868",
        scarf: "#ff2a85",
        eye: "#00f2fe",
        trail: "rgba(0, 242, 254, 0.16)"
    },
    crimson: {
        primary: "#ff2a85",
        secondary: "#9b0047",
        armorDark: "#290d1b",
        armorLight: "#591936",
        scarf: "#ffd166",
        eye: "#ffd166",
        trail: "rgba(255, 42, 133, 0.2)"
    },
    emerald: {
        primary: "#06d6a0",
        secondary: "#047857",
        armorDark: "#0c2421",
        armorLight: "#1b4d44",
        scarf: "#00f2fe",
        eye: "#06d6a0",
        trail: "rgba(6, 214, 160, 0.2)"
    },
    gold: {
        primary: "#ffd166",
        secondary: "#d97706",
        armorDark: "#261f10",
        armorLight: "#57441c",
        scarf: "#b537f2",
        eye: "#ffffff",
        trail: "rgba(255, 209, 102, 0.22)"
    },
    violet: {
        primary: "#c77dff",
        secondary: "#7b2cbf",
        armorDark: "#190a28",
        armorLight: "#3c165e",
        scarf: "#00f2fe",
        eye: "#ff2a85",
        trail: "rgba(199, 125, 255, 0.22)"
    },
    arctic: {
        primary: "#e0fbfc",
        secondary: "#48cae4",
        armorDark: "#1d3557",
        armorLight: "#457b9d",
        scarf: "#00f2fe",
        eye: "#90e0ef",
        trail: "rgba(224, 251, 252, 0.24)"
    },
    magma: {
        primary: "#ff6d00",
        secondary: "#d00000",
        armorDark: "#1f110c",
        armorLight: "#4a1c11",
        scarf: "#ffd166",
        eye: "#ffba08",
        trail: "rgba(255, 109, 0, 0.24)"
    },
    toxic: {
        primary: "#aacc00",
        secondary: "#55a630",
        armorDark: "#132a13",
        armorLight: "#2b580c",
        scarf: "#b537f2",
        eye: "#d4d700",
        trail: "rgba(170, 204, 0, 0.22)"
    },
    stealth: {
        primary: "#adb5bd",
        secondary: "#495057",
        armorDark: "#0b090a",
        armorLight: "#212529",
        scarf: "#ef233c",
        eye: "#ef233c",
        trail: "rgba(173, 181, 189, 0.18)"
    },
    sakura: {
        primary: "#ff85a1",
        secondary: "#f72585",
        armorDark: "#2b1321",
        armorLight: "#5c2747",
        scarf: "#ffffff",
        eye: "#ffe5ec",
        trail: "rgba(255, 133, 161, 0.22)"
    },
    galaxy: {
        primary: "#4cc9f0",
        secondary: "#7209b7",
        armorDark: "#10002b",
        armorLight: "#3a0ca3",
        scarf: "#f72585",
        eye: "#4cc9f0",
        trail: "rgba(76, 201, 240, 0.22)"
    },
    rainbow: {
        primary: "#00f2fe",
        secondary: "#ff2a85",
        armorDark: "#181828",
        armorLight: "#323254",
        scarf: "#ffd166",
        eye: "#ffffff",
        trail: "rgba(255, 255, 255, 0.25)",
        isRainbow: true
    }
};

class Particle {
    constructor(x, y, vx, vy, color, size, life) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.size = size;
        this.life = life;
        this.maxLife = life;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.18;
        this.life--;
    }

    draw(ctx) {
        const alpha = Math.max(0, this.life / this.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class FloatingText {
    constructor(x, y, text, color = "#00f2fe") {
        this.x = x;
        this.y = y;
        this.text = text;
        this.color = color;
        this.life = 45;
        this.maxLife = 45;
    }

    update() {
        this.y -= 1.2;
        this.life--;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
        ctx.font = "bold 16px 'Segoe UI', sans-serif";
        ctx.strokeStyle = "rgba(0, 0, 0, 0.75)";
        ctx.lineWidth = 3;
        ctx.textAlign = "center";
        ctx.strokeText(this.text, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}

class Fireball {
    constructor(x, y, dir, isEnemy = false, customVy = null, speedMult = 1) {
        this.x = x;
        this.y = y;
        this.r = isEnemy ? 10 : 9;
        this.vx = dir * (isEnemy ? 7.2 * speedMult : 11.0);
        this.vy = customVy !== null ? customVy : (isEnemy ? 0 : 2.8);
        this.isEnemy = isEnemy;
        this.bounces = 0;
        this.life = 140;
        this.dead = false;
    }

    update(solids, game) {
        this.x += this.vx;
        if (!this.isEnemy) {
            this.vy += 0.55;
        }
        this.y += this.vy;
        this.life--;
        if (this.life <= 0) this.dead = true;

        if (Math.random() < 0.6) {
            game.spawnParticles(this.x, this.y, 1, this.isEnemy ? "#ff2a85" : "#00f2fe", 2);
        }

        for (const s of solids) {
            if (
                this.x + this.r > s.x &&
                this.x - this.r < s.x + s.w &&
                this.y + this.r > s.y &&
                this.y - this.r < s.y + s.h
            ) {
                if (this.isEnemy) {
                    this.dead = true;
                    return;
                }
                const prevY = this.y - this.vy;
                if (prevY + this.r <= s.y + 10 && this.vy > 0) {
                    this.y = s.y - this.r;
                    this.vy = -7.8;
                    this.bounces++;
                    if (this.bounces > 4) this.dead = true;
                } else {
                    this.dead = true;
                    game.spawnParticles(this.x, this.y, 8, "#ff2a85", 3);
                }
            }
        }
    }

    draw(ctx) {
        ctx.save();
        const color = this.isEnemy ? "#ff2a85" : "#ff7b00";
        const core = this.isEnemy ? "#ffb3d1" : "#fff3b0";

        // Flame tail
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = core;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 0.55, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class PowerUpItem {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.w = 32;
        this.h = 32;
        this.type = type;
        this.vx = 2.2;
        this.vy = -6.5;
        this.bob = 0;
    }

    update(solids) {
        this.vy = Math.min(this.vy + 0.45, 10);
        this.x += this.vx;

        for (const s of solids) {
            if (this.intersects(s)) {
                if (this.vx > 0) this.x = s.x - this.w;
                else this.x = s.x + s.w;
                this.vx *= -1;
            }
        }

        this.y += this.vy;
        for (const s of solids) {
            if (this.intersects(s)) {
                if (this.vy > 0) {
                    this.y = s.y - this.h;
                    this.vy = 0;
                } else {
                    this.y = s.y + s.h;
                    this.vy = 0;
                }
            }
        }
        this.bob += 0.12;
    }

    intersects(r) {
        return (
            this.x < r.x + r.w &&
            this.x + this.w > r.x &&
            this.y < r.y + r.h &&
            this.y + this.h > r.y
        );
    }

    draw(ctx) {
        ctx.save();
        const cx = this.x + this.w / 2;
        const cy = this.y + this.h / 2 + Math.sin(this.bob) * 3;

        let color = "#ff7b00";
        let symbol = "🔥";
        if (this.type === "shield") {
            color = "#00f2fe";
            symbol = "🛡";
        } else if (this.type === "speed") {
            color = "#06d6a0";
            symbol = "⚡";
        }

        ctx.fillStyle = "rgba(12, 16, 35, 0.9)";
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, cy, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.font = "16px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(symbol, cx, cy + 1);
        ctx.restore();
    }
}

// Detailed Anatomical Ground Monsters
class Enemy {
    constructor(cfg, levelIndex = 0) {
        this.type = cfg.type === 'bat' ? 'crawler' : cfg.type;
        this.x = cfg.x;
        this.y = cfg.y;
        this.minX = cfg.minX;
        this.maxX = cfg.maxX;

        const diffMult = 1 + levelIndex * 0.05;

        if (this.type === 'golem') {
            this.w = 50;
            this.h = 58;
            this.vx = 1.15 * diffMult;
            this.hp = levelIndex >= 6 ? 3 : 2;
        } else if (this.type === 'crawler') {
            this.w = 46;
            this.h = 34;
            this.vx = 2.15 * diffMult;
            this.hp = 1;
        } else if (this.type === 'sentinel') {
            this.w = 44;
            this.h = 54;
            this.vx = 1.0 * diffMult;
            this.hp = 2;
        } else {
            // 'slime' -> Fanged Shadow Stalker Beast
            this.w = 42;
            this.h = 36;
            this.vx = 1.4 * diffMult;
            this.hp = 1;
        }

        this.shootTimer = Math.floor(Math.random() * 60) + 90;
        this.levelIndex = levelIndex;
        this.dead = false;
        this.anim = Math.random() * 10;
        this.hurtFlash = 0;
    }

    update(solids, game) {
        this.anim += 0.18;
        if (this.hurtFlash > 0) this.hurtFlash--;

        this.x += this.vx;
        if (this.x < this.minX) {
            this.x = this.minX;
            this.vx = Math.abs(this.vx);
        } else if (this.x + this.w > this.maxX) {
            this.x = this.maxX - this.w;
            this.vx = -Math.abs(this.vx);
        }

        this.y += 6;
        for (const s of solids) {
            if (
                this.x < s.x + s.w &&
                this.x + this.w > s.x &&
                this.y < s.y + s.h &&
                this.y + this.h > s.y
            ) {
                this.y = s.y - this.h;
            }
        }

        if (this.type === 'sentinel' && game && game.player) {
            this.shootTimer--;
            const dist = Math.abs(game.player.x - this.x);
            if (this.shootTimer <= 0 && dist < 520) {
                const dir = game.player.x > this.x ? 1 : -1;
                game.fireballs.push(new Fireball(this.x + this.w / 2 + dir * 16, this.y + 24, dir, true, 0, 0.95));
                this.shootTimer = Math.max(55, 115 - this.levelIndex * 5);
            }
        }
    }

    draw(ctx) {
        ctx.save();
        if (this.hurtFlash > 0 && this.hurtFlash % 2 === 0) {
            ctx.globalAlpha = 0.55;
        }

        const cx = this.x + this.w / 2;
        const bottomY = this.y + this.h;
        const dir = this.vx >= 0 ? 1 : -1;

        ctx.translate(cx, bottomY);
        ctx.scale(dir, 1);

        if (this.type === 'slime') {
            // ==========================================
            // 1. MUTANT SHADOW HOUND / FANGED BEAST
            // ==========================================
            const stride = Math.sin(this.anim * 1.6) * 5;
            const breathe = Math.sin(this.anim) * 2;

            // Back legs
            ctx.strokeStyle = "#4a154b";
            ctx.lineWidth = 5;
            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(-10, -12);
            ctx.lineTo(-14 - stride, -2);
            ctx.moveTo(8, -12);
            ctx.lineTo(12 + stride, -2);
            ctx.stroke();

            // Spiked Back Carapace
            const bodyGrad = ctx.createRadialGradient(0, -18, 4, 0, -18, 24);
            bodyGrad.addColorStop(0, "#c77dff");
            bodyGrad.addColorStop(0.5, "#5a189a");
            bodyGrad.addColorStop(1, "#240046");

            ctx.fillStyle = bodyGrad;
            ctx.beginPath();
            ctx.moveTo(-20, -10);
            ctx.quadraticCurveTo(-18, -34 - breathe, 4, -32 - breathe);
            ctx.quadraticCurveTo(22, -28, 20, -8);
            ctx.closePath();
            ctx.fill();

            // Dorsal Spikes
            ctx.fillStyle = "#ff2a85";
            for (let i = -1; i <= 1; i++) {
                ctx.beginPath();
                ctx.moveTo(i * 8 - 6, -28 - breathe);
                ctx.lineTo(i * 8 - 2, -39 - breathe);
                ctx.lineTo(i * 8 + 3, -27 - breathe);
                ctx.fill();
            }

            // Predatory Glowing Eye & Fanged Jaw
            ctx.fillStyle = "#00f2fe";
            ctx.shadowColor = "#00f2fe";
            ctx.beginPath();
            ctx.moveTo(6, -23);
            ctx.lineTo(15, -20);
            ctx.lineTo(8, -17);
            ctx.fill();

            // White Fangs
            ctx.fillStyle = "#f8f9fa";
            ctx.beginPath();
            ctx.moveTo(8, -11);
            ctx.lineTo(11, -5);
            ctx.lineTo(14, -11);
            ctx.moveTo(14, -11);
            ctx.lineTo(17, -6);
            ctx.lineTo(19, -11);
            ctx.fill();

            // Front Claws
            ctx.strokeStyle = "#9d4edd";
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo(-8, -10);
            ctx.lineTo(-10 + stride, -1);
            ctx.moveTo(10, -10);
            ctx.lineTo(14 - stride, -1);
            ctx.stroke();

        } else if (this.type === 'crawler') {
            // ==========================================
            // 2. BIOMECHANICAL NEON SCORPION
            // ==========================================
            const legWave = Math.sin(this.anim * 2.2) * 5;

            // 6 Articulated Scuttling Legs
            ctx.strokeStyle = "#06d6a0";
            ctx.lineWidth = 3;
            for (let i = -1; i <= 1; i++) {
                const offset = (i % 2 === 0 ? legWave : -legWave);
                ctx.beginPath();
                ctx.moveTo(i * 8, -12);
                ctx.lineTo(i * 11 + offset * 0.5, -18);
                ctx.lineTo(i * 13 + offset, -1);
                ctx.stroke();
            }

            // Arched Segmented Scorpion Tail & Venom Stinger
            ctx.strokeStyle = "#1b4d44";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(-14, -14);
            ctx.quadraticCurveTo(-26, -28, -10, -35 + Math.sin(this.anim) * 2);
            ctx.quadraticCurveTo(2, -38, 8, -32);
            ctx.stroke();

            // Glowing Venom Stinger
            ctx.fillStyle = "#ff2a85";
            ctx.beginPath();
            ctx.moveTo(6, -35);
            ctx.lineTo(16, -29);
            ctx.lineTo(7, -27);
            ctx.closePath();
            ctx.fill();

            // Armored Chitin Body
            const carapaceGrad = ctx.createLinearGradient(-18, -22, 18, -6);
            carapaceGrad.addColorStop(0, "#0b2b26");
            carapaceGrad.addColorStop(0.5, "#195e52");
            carapaceGrad.addColorStop(1, "#091f1c");
            ctx.fillStyle = carapaceGrad;
            ctx.strokeStyle = "#06d6a0";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(0, -13, 18, 8, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Front Pincer Claw & Glowing Eyes
            ctx.fillStyle = "#06d6a0";
            ctx.beginPath();
            ctx.arc(18, -14, 5, 0.3, Math.PI * 1.7);
            ctx.fill();

            ctx.fillStyle = "#ff2a85";
            ctx.fillRect(11, -17, 4, 4);

        } else if (this.type === 'sentinel') {
            // ==========================================
            // 3. DARK CYBER-SNIPER / PLASMA SENTINEL
            // ==========================================
            const walk = Math.sin(this.anim * 1.2) * 5;

            // Legs
            ctx.strokeStyle = "#2b2d42";
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.moveTo(-5, -18);
            ctx.lineTo(-8 + walk, -1);
            ctx.moveTo(5, -18);
            ctx.lineTo(8 - walk, -1);
            ctx.stroke();

            // Armored Tattered Cloak & Torso
            const cloakGrad = ctx.createLinearGradient(0, -48, 0, -10);
            cloakGrad.addColorStop(0, "#3c096c");
            cloakGrad.addColorStop(1, "#10002b");
            ctx.fillStyle = cloakGrad;
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-14, -12);
            ctx.lineTo(-11, -40);
            ctx.lineTo(11, -40);
            ctx.lineTo(13, -12);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Hooded Helmet & Glowing Sniper Visor
            ctx.fillStyle = "#1a1423";
            ctx.beginPath();
            ctx.arc(0, -44, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = "#ff2a85";
            ctx.fillRect(2, -47, 8, 4);

            // Plasma Rifle / Cannon Arm
            ctx.fillStyle = "#2b2d42";
            ctx.strokeStyle = "#00f2fe";
            ctx.lineWidth = 2;
            ctx.fillRect(0, -32, 22, 7);
            ctx.strokeRect(0, -32, 22, 7);

            // Glowing Muzzle
            ctx.fillStyle = "#00f2fe";
            ctx.beginPath();
            ctx.arc(22, -28.5, 4, 0, Math.PI * 2);
            ctx.fill();

        } else if (this.type === 'golem') {
            // ==========================================
            // 4. HULKING ARMORED GOLEM KNIGHT + WARHAMMER
            // ==========================================
            const stomp = Math.sin(this.anim * 1.1) * 6;

            // Heavy Armored Legs
            ctx.fillStyle = "#1d2238";
            ctx.strokeStyle = "#ff2a85";
            ctx.lineWidth = 2;
            ctx.fillRect(-13 + stomp * 0.6, -18, 9, 17);
            ctx.strokeRect(-13 + stomp * 0.6, -18, 9, 17);
            ctx.fillRect(4 - stomp * 0.6, -18, 9, 17);
            ctx.strokeRect(4 - stomp * 0.6, -18, 9, 17);

            // Broad Hulking Torso Plate
            const armorGrad = ctx.createLinearGradient(-20, -48, 20, -16);
            armorGrad.addColorStop(0, "#343a56");
            armorGrad.addColorStop(0.5, "#1b1f33");
            armorGrad.addColorStop(1, "#0f111c");
            ctx.fillStyle = armorGrad;
            ctx.strokeStyle = "#ff2a85";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-16, -16);
            ctx.lineTo(-22, -44);
            ctx.lineTo(22, -44);
            ctx.lineTo(16, -16);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Glowing Reactor Chest Core
            ctx.fillStyle = "#00f2fe";
            ctx.beginPath();
            ctx.moveTo(0, -39);
            ctx.lineTo(7, -31);
            ctx.lineTo(0, -23);
            ctx.lineTo(-7, -31);
            ctx.closePath();
            ctx.fill();

            // Horned Knight Helmet
            ctx.fillStyle = "#22273d";
            ctx.strokeStyle = "#ff2a85";
            ctx.beginPath();
            ctx.roundRect(-11, -56, 22, 14, 4);
            ctx.fill();
            ctx.stroke();

            // Glowing Visor Slit
            ctx.fillStyle = "#ff2a85";
            ctx.shadowColor = "#ff2a85";
            ctx.fillRect(0, -51, 10, 4);

            // Swinging Warhammer in Front Hand
            ctx.save();
            ctx.translate(12, -34);
            ctx.rotate(Math.sin(this.anim * 1.1) * 0.35);
            // Hammer shaft
            ctx.strokeStyle = "#adb5bd";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(0, 8);
            ctx.lineTo(14, -18);
            ctx.stroke();
            // Hammer head
            ctx.fillStyle = "#2b2d42";
            ctx.strokeStyle = "#ff2a85";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.roundRect(6, -24, 16, 10, 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        ctx.restore();
    }
}

// 3 Distinct Anatomical Bosses with Tactical Attack & Defense Rhythm
class AbyssBoss {
    constructor(cfg) {
        this.name = cfg.name || "KARANLIK MUHAFIZ";
        this.variant = cfg.variant || 1; // 1: Crystal Behemoth, 2: Cyber Executioner, 3: Abyssal Emperor
        this.x = cfg.x;
        this.y = cfg.y;
        this.w = 96 + (this.variant - 1) * 8;
        this.h = 114 + (this.variant - 1) * 6;
        this.minX = cfg.minX;
        this.maxX = cfg.maxX;
        this.vx = 0;
        this.vy = 0;
        this.facing = -1;

        this.maxHp = cfg.hp || 10;
        this.hp = this.maxHp;
        this.dead = false;

        this.state = 'shield_patrol';
        this.shieldActive = true;
        this.timer = 70;
        this.stateMaxTimer = 70;
        this.slamsRemaining = 0;
        this.hitsTakenInWindow = 0;

        this.invuln = 0;
        this.anim = 0;
        this.shockwaves = [];
        this.statusText = "🛡 SAVUNMA & HAZIRLIK";
    }

    enterState(newState, duration, statusText = "") {
        this.state = newState;
        this.timer = duration;
        this.stateMaxTimer = Math.max(1, duration);
        if (statusText) this.statusText = statusText;
    }

    update(solids, player, game) {
        if (this.dead) return;
        this.anim += 0.14;
        if (this.invuln > 0) this.invuln--;

        const isEnraged = this.hp <= this.maxHp * 0.45;
        const speedMult = (isEnraged ? 1.28 : 1.0) * (1 + (this.variant - 1) * 0.12);

        this.timer--;

        if (this.state === 'shield_patrol') {
            this.shieldActive = true;
            this.facing = player.x > this.x ? 1 : -1;
            this.vx = this.facing * 1.8 * speedMult;
            this.x += this.vx;

            if (this.timer <= 0) {
                this.vx = 0;
                this.slamsRemaining = this.variant + (isEnraged ? 1 : 0);
                window.sfx.bossRoar();
                this.enterState('telegraph_slam', 42, "⚠️ ZIPLAMA & ŞOK DALGASI GELİYOR!");
            }
        } else if (this.state === 'telegraph_slam') {
            this.shieldActive = true;
            this.vx = 0;
            this.facing = player.x > this.x ? 1 : -1;
            if (this.timer <= 0) {
                this.state = 'jump_slam';
                this.statusText = "💥 ŞOK DALGASI SALDIRISI!";
                this.vy = -15.5;
                const targetDx = (player.x - this.x);
                this.vx = Math.max(-5.8, Math.min(5.8, targetDx * 0.024)) * speedMult;
            }
        } else if (this.state === 'jump_slam') {
            this.shieldActive = true;
            this.x += this.vx;
        } else if (this.state === 'telegraph_dash') {
            this.shieldActive = true;
            this.vx = 0;
            this.facing = player.x > this.x ? 1 : -1;

            if (this.timer === 24) {
                window.sfx.fireball();
                game.fireballs.push(new Fireball(this.x + this.w / 2, this.y + 48, this.facing, true, 0, 0.85));
                if (this.variant >= 2) {
                    game.fireballs.push(new Fireball(this.x + this.w / 2, this.y + 32, this.facing, true, -2.2, 0.9));
                }
            }

            if (this.timer <= 0) {
                window.sfx.bossRoar();
                this.vx = this.facing * (7.2 + this.variant * 0.7) * speedMult;
                this.enterState('dash', 72, "⚡ YILDIRIM ATILMASI!");
            }
        } else if (this.state === 'dash') {
            this.shieldActive = true;
            this.x += this.vx;

            if (this.x <= this.minX + 4 || this.x + this.w >= this.maxX - 4 || this.timer <= 0) {
                this.vx = 0;
                game.shakeScreen(14);
                window.sfx.blockHit();
                game.spawnParticles(this.x + this.w / 2, this.y + 30, 22, "#00f2fe", 5);
                this.shieldActive = false;
                this.hitsTakenInWindow = 0;
                this.enterState('vulnerable', 215, "🎯 KALKAN KAPANDI! ŞİMDİ VUR!");
                game.floatingTexts.push(new FloatingText(this.x + this.w / 2, this.y - 12, "🎯 KALKAN KAPANDI! KAFASINA ZIPLA!", "#06d6a0"));
            }
        } else if (this.state === 'vulnerable') {
            this.shieldActive = false;
            this.vx = 0;

            if (this.timer <= 0) {
                this.shieldActive = true;
                window.sfx.powerUpSpawn();
                game.spawnParticles(this.x + this.w / 2, this.y + this.h / 2, 18, "#ff2a85", 4);
                this.enterState('shield_patrol', 65, "🛡 KALKAN YENİLENDİ!");
            }
        }

        this.x = Math.max(this.minX, Math.min(this.maxX - this.w, this.x));

        this.vy = Math.min(this.vy + 0.82, 17);
        this.y += this.vy;

        for (const s of solids) {
            if (
                s.type === 'ground' &&
                this.x < s.x + s.w &&
                this.x + this.w > s.x &&
                this.y + this.h > s.y &&
                this.y < s.y + s.h
            ) {
                if (this.state === 'jump_slam' && this.vy > 2) {
                    game.shakeScreen(15);
                    window.sfx.bossHit();
                    const swSpeed = (6.0 + this.variant * 0.9) * (isEnraged ? 1.15 : 1.0);
                    this.shockwaves.push({ x: this.x, y: s.y - 24, vx: -swSpeed, w: 30, h: 24, life: 110 });
                    this.shockwaves.push({ x: this.x + this.w - 30, y: s.y - 24, vx: swSpeed, w: 30, h: 24, life: 110 });
                    game.spawnParticles(this.x + this.w / 2, s.y, 24, "#ff2a85", 5);

                    this.slamsRemaining--;
                    if (this.slamsRemaining > 0) {
                        this.enterState('telegraph_slam', 26, `⚠️ ŞOK DALGASI (${this.slamsRemaining} KALDI)!`);
                    } else {
                        this.enterState('telegraph_dash', 42, "⚠️ ATILMA SALDIRISINA HAZIRLANIYOR!");
                    }
                }
                this.y = s.y - this.h;
                this.vy = 0;
            }
        }

        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const sw = this.shockwaves[i];
            sw.x += sw.vx;
            sw.life--;
            if (sw.life <= 0) this.shockwaves.splice(i, 1);
        }
    }

    takeDamage(amount, game, isStomp = false) {
        if (this.invuln > 0 || this.dead) return false;

        if (this.shieldActive) {
            window.sfx.blockHit();
            this.invuln = 10;
            game.spawnParticles(this.x + this.w / 2, this.y + 30, 8, "#ffd166", 3);
            game.floatingTexts.push(new FloatingText(this.x + this.w / 2, this.y - 10, "🛡 KALKANLI! YORULMASINI BEKLE!", "#ffd166"));
            return false;
        }

        this.hp = Math.max(0, this.hp - amount);
        this.invuln = 18;
        this.hitsTakenInWindow += amount;
        window.sfx.bossHit();
        game.shakeScreen(10);
        game.spawnParticles(this.x + this.w / 2, this.y + 25, 14, "#06d6a0", 4.5);

        if (this.hp <= 0) {
            this.dead = true;
            this.shockwaves = [];
            window.sfx.victory();
            game.shakeScreen(18);
            game.spawnParticles(this.x + this.w / 2, this.y + this.h / 2, 24, "#ff2a85", 5.5);
            game.spawnParticles(this.x + this.w / 2, this.y + this.h / 2, 18, "#00f2fe", 4.5);
            game.floatingTexts.push(new FloatingText(this.x + this.w / 2, this.y, `${this.name} YENİLDİ! +2500`, "#ffd166"));
            game.floatingTexts.push(new FloatingText(this.x + this.w / 2, this.y - 26, "🎁 BOSS HEDİYESİ: +20 ❖ ZÜMRÜT, +10 ◆ KRİSTAL, +15 🪙 COİN!", "#06d6a0"));
            game.score += 2500;
            game.addEmeralds(20, true);
            game.addCrystals(10, true);
            if (typeof game.addGoldCoins === "function") game.addGoldCoins(15, true);
            return true;
        }

        if (isStomp || this.hitsTakenInWindow >= 3) {
            this.shieldActive = true;
            this.enterState('shield_patrol', 60, "🛡 KALKAN YENİLENDİ! DİKKAT!");
        }
        return true;
    }

    draw(ctx) {
        if (this.dead) return;
        ctx.save();

        // Draw Shockwaves
        for (const sw of this.shockwaves) {
            ctx.fillStyle = "#ff2a85";
            ctx.beginPath();
            ctx.moveTo(sw.x, sw.y + sw.h);
            ctx.lineTo(sw.x + sw.w / 2, sw.y);
            ctx.lineTo(sw.x + sw.w, sw.y + sw.h);
            ctx.closePath();
            ctx.fill();
        }

        const cx = this.x + this.w / 2;
        const bottomY = this.y + this.h;
        const isVulnerable = !this.shieldActive;
        const isTelegraph = this.state === 'telegraph_slam' || this.state === 'telegraph_dash';

        // Dash Laser Sight
        if (this.state === 'telegraph_dash') {
            ctx.save();
            ctx.strokeStyle = "rgba(255, 42, 133, 0.65)";
            ctx.setLineDash([12, 8]);
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.moveTo(cx, this.y + 52);
            ctx.lineTo(cx + this.facing * 520, this.y + 52);
            ctx.stroke();
            ctx.restore();
        }

        if (this.invuln > 0 && Math.floor(this.invuln / 2) % 2 === 0) {
            ctx.globalAlpha = 0.5;
        }

        const crouch = isTelegraph ? 14 : (isVulnerable ? 12 : 0);
        const walkSwing = Math.abs(this.vx) > 0.2 ? Math.sin(this.anim * 1.5) * 8 : 0;

        const variantColors = ["#00f2fe", "#b537f2", "#ffd166"];
        const mainGlow = isVulnerable ? "#06d6a0" : (isTelegraph ? "#ffd166" : variantColors[this.variant - 1]);

        // ==========================================
        // ARTICULATED BOSS ANATOMY
        // ==========================================
        ctx.save();
        ctx.translate(cx, bottomY);
        ctx.scale(this.facing, 1);

        // 0. Variant 3 (Abyssal Emperor) Dark Matter Wings!
        if (this.variant === 3) {
            const wingFlap = Math.sin(this.anim * 1.2) * 10;
            ctx.fillStyle = "rgba(181, 55, 242, 0.35)";
            ctx.strokeStyle = mainGlow;
            ctx.lineWidth = 2.5;
            for (let side of [-1, 1]) {
                ctx.beginPath();
                ctx.moveTo(0, -68 + crouch);
                ctx.lineTo(side * 68, -110 + wingFlap + crouch);
                ctx.lineTo(side * 52, -45 + crouch);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            }
        }

        // 1. Heavy Armored Legs & Claws
        ctx.fillStyle = "#191d36";
        ctx.strokeStyle = mainGlow;
        ctx.lineWidth = 3;
        // Back leg
        ctx.beginPath();
        ctx.roundRect(-24 - walkSwing * 0.5, -36 + crouch * 0.4, 18, 36 - crouch * 0.4, 6);
        ctx.fill();
        ctx.stroke();
        // Front leg
        ctx.beginPath();
        ctx.roundRect(6 + walkSwing * 0.5, -36 + crouch * 0.4, 18, 36 - crouch * 0.4, 6);
        ctx.fill();
        ctx.stroke();

        // 2. Hulking Armored Chest & Torso
        const torsoGrad = ctx.createLinearGradient(-38, -96 + crouch, 38, -30);
        torsoGrad.addColorStop(0, "#2b2347");
        torsoGrad.addColorStop(0.5, "#151126");
        torsoGrad.addColorStop(1, "#090712");
        ctx.fillStyle = torsoGrad;
        ctx.beginPath();
        ctx.moveTo(-26, -32 + crouch * 0.5);
        ctx.lineTo(-42, -84 + crouch);
        ctx.lineTo(42, -84 + crouch);
        ctx.lineTo(26, -32 + crouch * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Spiked Shoulder Pauldrons
        ctx.fillStyle = "#221a3b";
        for (let side of [-1, 1]) {
            ctx.beginPath();
            ctx.arc(side * 38, -78 + crouch, 16, Math.PI, 0);
            ctx.fill();
            ctx.stroke();
        }

        // Ribcage & Glowing Reactor Core
        ctx.fillStyle = mainGlow;
        ctx.beginPath();
        ctx.arc(0, -60 + crouch, 13 + Math.sin(this.anim * 3) * 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(0, -60 + crouch, 6, 0, Math.PI * 2);
        ctx.fill();

        // 3. Sculpted Demon/Mecha Head & Exposed Brain Core
        ctx.fillStyle = "#1c1630";
        ctx.beginPath();
        ctx.roundRect(-22, -108 + crouch, 44, 28, 8);
        ctx.fill();
        ctx.stroke();

        // Exposed Vulnerable Crown Core on Top of Head
        ctx.fillStyle = isVulnerable ? "#06d6a0" : "#590d22";
        ctx.shadowColor = isVulnerable ? "#06d6a0" : "#ff2a85";
        ctx.beginPath();
        ctx.arc(0, -108 + crouch, 16, Math.PI, 0);
        ctx.fill();

        // Curved Horns
        ctx.fillStyle = mainGlow;
        for (let side of [-1, 1]) {
            ctx.beginPath();
            ctx.moveTo(side * 16, -102 + crouch);
            ctx.quadraticCurveTo(side * 36, -112 + crouch, side * 28, -128 + crouch);
            ctx.lineTo(side * 8, -106 + crouch);
            ctx.closePath();
            ctx.fill();
        }

        // Fierce Glowing Eyes & Fanged Jaw
        ctx.fillStyle = isVulnerable ? "#00f2fe" : "#ff2a85";
        ctx.fillRect(-14, -98 + crouch, 11, 6);
        ctx.fillRect(5, -98 + crouch, 11, 6);

        // 4. Boss-Specific Giant Weapon Arms!
        ctx.save();
        ctx.translate(28, -68 + crouch);
        ctx.rotate(Math.sin(this.anim * 1.4) * 0.25 + (this.state === 'dash' ? 0.5 : 0));

        if (this.variant === 1) {
            // Boss 1: Giant Jagged Crystal Crusher Fist
            ctx.fillStyle = "#00f2fe";
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0, -8);
            ctx.lineTo(28, -14);
            ctx.lineTo(36, 4);
            ctx.lineTo(22, 18);
            ctx.lineTo(0, 12);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.variant === 2) {
            // Boss 2: Cyber Executioner Plasma Scythe Blade
            ctx.fillStyle = "#ff2a85";
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(32, -26);
            ctx.quadraticCurveTo(46, 0, 18, 28);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else {
            // Boss 3: Abyssal Emperor Giant Greatsword
            ctx.fillStyle = "#ffd166";
            ctx.strokeStyle = "#ff2a85";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(0, -6);
            ctx.lineTo(48, -18);
            ctx.lineTo(58, -10);
            ctx.lineTo(8, 8);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        }
        ctx.restore();

        ctx.restore(); // End Boss local transform

        // ==========================================
        // SHIELD OR VULNERABLE OVERLAYS
        // ==========================================
        const drawY = this.y + crouch;
        if (this.shieldActive) {
            ctx.save();
            ctx.strokeStyle = isTelegraph ? "#ffd166" : "rgba(255, 42, 133, 0.78)";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cx, this.y + this.h / 2, this.w * 0.65, 0, Math.PI * 2);
            ctx.stroke();

            // Warning Spikes over head
            ctx.fillStyle = "#ff2a85";
            for (let i = -2; i <= 2; i++) {
                ctx.beginPath();
                ctx.moveTo(cx + i * 14 - 5, drawY + 6);
                ctx.lineTo(cx + i * 14, drawY - 10);
                ctx.lineTo(cx + i * 14 + 5, drawY + 6);
                ctx.fill();
            }
            ctx.restore();
        } else {
            ctx.save();
            const pulse = Math.sin(this.anim * 4) * 5;
            ctx.strokeStyle = "#06d6a0";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(cx, drawY + 6, 22 + pulse, 0, Math.PI * 2);
            ctx.stroke();

            const pct = Math.max(0, this.timer / this.stateMaxTimer);
            ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
            ctx.fillRect(cx - 45, drawY - 38, 90, 8);
            ctx.fillStyle = "#06d6a0";
            ctx.fillRect(cx - 45, drawY - 38, 90 * pct, 8);

            ctx.fillStyle = "#06d6a0";
            ctx.font = "bold 13px 'Segoe UI', sans-serif";
            ctx.textAlign = "center";
            const hitTxt = (window.game && window.game.getHitNowText) ? window.game.getHitNowText() : "🎯 ŞİMDİ VUR!";
            ctx.fillText(hitTxt, cx, drawY - 44);
            ctx.restore();
        }

        ctx.restore();
    }
}

// Articulated Humanoid Cyber-Knight Player Character (74 Customization Options!)
class Player {
    constructor(x, y, upgrades = {}) {
        this.x = x;
        this.y = y;
        this.baseW = 34;
        this.baseH = 48;
        this.w = 34;
        this.h = 48;
        this.vx = 0;
        this.vy = 0;
        this.facing = 1;

        this.maxHp = 3;
        this.hp = 3;
        this.hasShield = !!upgrades.startShield;
        this.hasFire = !!upgrades.startFire;
        this.maxJumps = 2 + (upgrades.extraJumps || 0);
        this.speedMult = upgrades.speedBonus ? 1.15 : 1.0;
        this.hasMagnet = !!upgrades.hasMagnet;

        this.skinId = upgrades.skinId || "cyan";
        this.helmetId = upgrades.helmetId || "crest";
        this.backGearId = upgrades.backGearId || "katana";
        this.visorId = upgrades.visorId || "slit";
        this.auraId = upgrades.auraId || "none";
        this.capeColor = upgrades.capeColor || "#ff2a85";
        this.heroCharId = upgrades.heroCharId || "default";
        this.speedTimer = 0;

        this.onGround = false;
        this.onWall = 0;
        this.wallCoyoteTimer = 0;
        this.lastWallDir = 0;
        this.inLowGravity = false;
        this.jumpsLeft = this.maxJumps;
        this.coyoteTimer = 0;
        this.jumpBuffer = 0;
        this.invulnTimer = 0;
        this.fireCooldown = 0;
        this.teleportCooldown = 0;

        this.trail = [];
        this.animTime = 0;
    }

    applyPowerUp(type, game) {
        window.sfx.powerUpCollect();
        if (type === 'shield') {
            this.hasShield = true;
            game.floatingTexts.push(new FloatingText(this.x + 16, this.y - 10, "AETHER KALKANI AKTİF!", "#00f2fe"));
        } else if (type === 'fire') {
            this.hasFire = true;
            if (game && typeof game.syncFireButtonUI === "function") {
                game.syncFireButtonUI();
            }
            game.floatingTexts.push(new FloatingText(this.x + 16, this.y - 10, "PLAZMA KILICI & ATEŞ TOPU! (X / 🔥)", "#ff7b00"));
        } else if (type === 'speed') {
            this.speedTimer = 600;
            game.floatingTexts.push(new FloatingText(this.x + 16, this.y - 10, "NEON HIZLANMA!", "#06d6a0"));
        }
    }

    takeDamage(game) {
        if (this.invulnTimer > 0) return;
        window.sfx.hurt();
        game.shakeScreen(10);

        if (this.hasShield) {
            this.hasShield = false;
            this.invulnTimer = 75;
            game.spawnParticles(this.x + this.w / 2, this.y + this.h / 2, 20, "#00f2fe", 4);
            game.floatingTexts.push(new FloatingText(this.x + 16, this.y - 10, "Kalkan Kırıldı!", "#00f2fe"));
            return;
        }

        this.hp--;
        this.invulnTimer = 75;
        game.spawnParticles(this.x + this.w / 2, this.y + this.h / 2, 20, "#ff2a85", 4);

        if (this.hp <= 0) {
            game.handlePlayerDeath();
        }
    }

    update(input, solids, movingPlatforms, activeCrumbles, game) {
        if (Math.abs(this.vx) > 0.3) {
            this.animTime += 0.28;
        } else {
            this.animTime += 0.08;
        }

        if (this.invulnTimer > 0) this.invulnTimer--;
        if (this.fireCooldown > 0) this.fireCooldown--;
        if (this.teleportCooldown > 0) this.teleportCooldown--;
        if (this.speedTimer > 0) this.speedTimer--;
        if (this.coyoteTimer > 0) this.coyoteTimer--;
        if (this.wallCoyoteTimer > 0) this.wallCoyoteTimer--;
        if (this.jumpBuffer > 0) this.jumpBuffer--;

        this.inLowGravity = false;
        for (const gz of game.gravityZones) {
            if (this.intersects(gz)) {
                this.inLowGravity = true;
                break;
            }
        }

        const allSolids = [...solids, ...movingPlatforms, ...activeCrumbles, ...game.mysteryBlocks];

        // Proactive wall proximity sensor (4px left/right) so wall climbing works reliably while holding left/right
        if (!this.onGround) {
            for (const s of allSolids) {
                if (this.y + this.h - 4 > s.y && this.y + 4 < s.y + s.h) {
                    if (Math.abs((this.x + this.w) - s.x) <= 4) {
                        this.onWall = 1;
                        this.lastWallDir = 1;
                        this.wallCoyoteTimer = 9;
                        break;
                    } else if (Math.abs(this.x - (s.x + s.w)) <= 4) {
                        this.onWall = -1;
                        this.lastWallDir = -1;
                        this.wallCoyoteTimer = 9;
                        break;
                    }
                }
            }
        }

        const maxSpeed = (this.speedTimer > 0 ? 7.0 : 5.2) * this.speedMult;
        const accel = (this.onGround ? 0.95 : 0.75) * this.speedMult;
        const friction = this.onGround ? 0.78 : 0.86;

        if (input.left) {
            this.vx = Math.max(this.vx - accel, -maxSpeed);
            this.facing = -1;
        } else if (input.right) {
            this.vx = Math.min(this.vx + accel, maxSpeed);
            this.facing = 1;
        } else {
            this.vx *= friction;
            if (Math.abs(this.vx) < 0.1) this.vx = 0;
        }

        if (input.jumpPressed) {
            this.jumpBuffer = 8;
            input.jumpPressed = false;
        }

        const jumpForce = this.inLowGravity ? -12.8 : -14.2;
        const activeWallDir = this.onWall !== 0 ? this.onWall : (this.wallCoyoteTimer > 0 ? this.lastWallDir : 0);

        if (this.jumpBuffer > 0) {
            if (this.coyoteTimer > 0) {
                this.vy = jumpForce;
                this.onGround = false;
                this.coyoteTimer = 0;
                this.jumpsLeft = this.maxJumps - 1;
                this.jumpBuffer = 0;
                window.sfx.jump();
                game.spawnParticles(this.x + this.w / 2, this.y + this.h, 8, "#00f2fe", 3.5);
            } else if (activeWallDir !== 0 && !this.onGround) {
                const isClimbingSameWall = (activeWallDir === 1 && input.right) || (activeWallDir === -1 && input.left);
                this.vy = isClimbingSameWall ? -14.2 : -13.6;
                this.vx = isClimbingSameWall ? (-activeWallDir * 2.6) : (-activeWallDir * 6.8);
                this.facing = isClimbingSameWall ? activeWallDir : -activeWallDir;
                this.jumpsLeft = this.maxJumps - 1;
                this.onWall = 0;
                this.wallCoyoteTimer = 0;
                this.jumpBuffer = 0;
                window.sfx.wallJump();
                game.spawnParticles(
                    activeWallDir === 1 ? this.x + this.w : this.x,
                    this.y + this.h / 2,
                    12,
                    "#b537f2",
                    4
                );
                game.floatingTexts.push(new FloatingText(this.x + this.w / 2, this.y, isClimbingSameWall ? "Duvar Tırmanışı!" : "Duvar Zıplaması!", "#e0aaff"));
            } else if (this.jumpsLeft > 0) {
                this.vy = jumpForce * 0.94;
                this.jumpsLeft--;
                this.jumpBuffer = 0;
                window.sfx.doubleJump();
                game.spawnParticles(this.x + this.w / 2, this.y + this.h, 14, "#ff2a85", 4);
            }
        }

        if (!input.jumpHeld && this.vy < -5.0) {
            this.vy *= 0.75;
        }

        if (input.firePressed) {
            input.firePressed = false;
            if (this.hasFire && this.fireCooldown <= 0) {
                const spawnX = this.facing === 1 ? this.x + this.w + 6 : this.x - 6;
                game.fireballs.push(new Fireball(spawnX, this.y + this.h * 0.45, this.facing, false));
                this.fireCooldown = 18;
                window.sfx.fireball();
            }
        }

        let grav;
        if (this.inLowGravity) {
            grav = this.vy < 0 ? 0.42 : 0.58;
        } else {
            grav = this.vy < 0 ? 0.66 : 0.96;
        }
        const maxFall = (this.onWall !== 0 && this.vy > 0) ? 2.8 : (this.inLowGravity ? 8.5 : 13.8);
        this.vy = Math.min(this.vy + grav, maxFall);

        this.x += this.vx;
        this.onWall = 0;

        for (const s of allSolids) {
            if (this.intersects(s)) {
                if (this.vx > 0) {
                    this.x = s.x - this.w;
                    this.onWall = 1;
                    this.lastWallDir = 1;
                    this.wallCoyoteTimer = 9;
                } else if (this.vx < 0) {
                    this.x = s.x + s.w;
                    this.onWall = -1;
                    this.lastWallDir = -1;
                    this.wallCoyoteTimer = 9;
                }
                this.vx = 0;
            }
        }

        this.y += this.vy;
        this.onGround = false;

        for (const s of allSolids) {
            if (this.intersects(s)) {
                if (this.vy > 0) {
                    this.y = s.y - this.h;
                    this.vy = 0;
                    this.onGround = true;
                    this.coyoteTimer = 7;
                    this.jumpsLeft = this.maxJumps;
                    if (s.currentVx) {
                        this.x += s.currentVx;
                    }
                    if (s.isCrumble && s.state === 'idle') {
                        s.state = 'shaking';
                        s.timer = Math.max(14, 34 - game.selectedLevel * 2);
                        window.sfx.crumble();
                    }
                } else if (this.vy < 0) {
                    this.y = s.y + s.h;
                    this.vy = 0;
                    if (s.isMystery) {
                        game.triggerMysteryBlock(s);
                    }
                }
            }
        }

        if (Math.abs(this.vx) > 2 || Math.abs(this.vy) > 2 || this.speedTimer > 0 || this.auraId === "rainbow_trail") {
            this.trail.push({ x: this.x + this.w / 2, y: this.y + this.h / 2 });
            if (this.trail.length > 6) this.trail.shift();
        } else if (this.trail.length > 0) {
            this.trail.shift();
        }
    }

    intersects(r) {
        return (
            this.x < r.x + r.w &&
            this.x + this.w > r.x &&
            this.y < r.y + r.h &&
            this.y + this.h > r.y
        );
    }

    draw(ctx) {
        ctx.save();
        const palette = SKIN_PALETTES[this.skinId] || SKIN_PALETTES.cyan;
        const rainbowHue = (this.animTime * 28) % 360;
        const rainbowColor = `hsl(${rainbowHue}, 100%, 60%)`;
        const primary = this.hasFire ? "#ff7b00" : (palette.isRainbow ? rainbowColor : palette.primary);

        // Draw Silhouette Motion Trail
        for (let i = 0; i < this.trail.length; i++) {
            const t = this.trail[i];
            if (this.auraId === "rainbow_trail" || palette.isRainbow) {
                ctx.fillStyle = `hsla(${(rainbowHue + i * 35) % 360}, 100%, 60%, 0.25)`;
            } else {
                ctx.fillStyle = this.speedTimer > 0 ? "rgba(6, 214, 160, 0.18)" : palette.trail;
            }
            ctx.beginPath();
            ctx.arc(t.x, t.y, 14, 0, Math.PI * 2);
            ctx.fill();
        }

        if (this.invulnTimer > 0 && Math.floor(this.invulnTimer / 4) % 2 === 0) {
            ctx.globalAlpha = 0.45;
        }

        const cx = this.x + this.w / 2;
        const bottomY = this.y + this.h;

        // Hexagonal Energy Shield Aura
        if (this.hasShield) {
            ctx.save();
            ctx.strokeStyle = "rgba(0, 242, 254, 0.8)";
            ctx.fillStyle = "rgba(0, 242, 254, 0.08)";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.arc(cx, this.y + this.h / 2, 32, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }

        // ==========================================
        // 0. CUSTOM AURA & AMBIENT EFFECTS (10 Types!)
        // ==========================================
        if (this.auraId && this.auraId !== "none") {
            ctx.save();
            const midY = this.y + this.h / 2;
            if (this.auraId === "fire_aura") {
                ctx.fillStyle = "rgba(255, 109, 0, 0.55)";
                for (let i = 0; i < 4; i++) {
                    const ox = Math.sin(this.animTime * 1.3 + i * 1.7) * 16;
                    const oy = ((this.animTime * 8 + i * 12) % 44) - 22;
                    ctx.beginPath();
                    ctx.arc(cx + ox, midY - oy, 5, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.auraId === "lightning") {
                ctx.strokeStyle = "#00f2fe";
                ctx.lineWidth = 2;
                for (let i = 0; i < 2; i++) {
                    const angle = this.animTime * 2 + i * Math.PI;
                    const lx = cx + Math.cos(angle) * 18;
                    const ly = midY + Math.sin(angle) * 18;
                    ctx.beginPath();
                    ctx.moveTo(lx - 5, ly - 8);
                    ctx.lineTo(lx + 4, ly);
                    ctx.lineTo(lx - 3, ly + 4);
                    ctx.lineTo(lx + 5, ly + 10);
                    ctx.stroke();
                }
            } else if (this.auraId === "stars") {
                ctx.fillStyle = "#ffd166";
                for (let i = 0; i < 3; i++) {
                    const a = this.animTime * 0.7 + (i * Math.PI * 2) / 3;
                    ctx.beginPath();
                    ctx.arc(cx + Math.cos(a) * 24, midY + Math.sin(a) * 18, 3.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.auraId === "dark_mist") {
                ctx.fillStyle = "rgba(123, 44, 191, 0.42)";
                for (let i = 0; i < 3; i++) {
                    const ox = Math.cos(this.animTime + i * 2) * 15;
                    const oy = Math.sin(this.animTime * 0.8 + i) * 15;
                    ctx.beginPath();
                    ctx.arc(cx + ox, midY + oy, 9, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.auraId === "soul_orbs") {
                for (let i = 0; i < 3; i++) {
                    const a = this.animTime * 0.9 + (i * Math.PI * 2) / 3;
                    const ox = cx + Math.cos(a) * 26;
                    const oy = midY + Math.sin(a * 2) * 10;
                    ctx.fillStyle = i % 2 === 0 ? "#06d6a0" : "#00f2fe";
                    ctx.beginPath();
                    ctx.arc(ox, oy, 4.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.auraId === "emerald_rain") {
                ctx.fillStyle = "#06d6a0";
                for (let i = 0; i < 3; i++) {
                    const ox = (i - 1) * 14;
                    const oy = ((this.animTime * 6 + i * 15) % 42) - 20;
                    ctx.fillRect(cx + ox - 2, midY - oy, 4, 6);
                }
            } else if (this.auraId === "sakura_petals") {
                ctx.fillStyle = "#ff85a1";
                for (let i = 0; i < 4; i++) {
                    const a = this.animTime * 0.6 + i * 1.5;
                    ctx.beginPath();
                    ctx.ellipse(cx + Math.cos(a) * 22, midY + Math.sin(a) * 20, 4, 2, a, 0, Math.PI * 2);
                    ctx.fill();
                }
            } else if (this.auraId === "cyber_rings") {
                ctx.strokeStyle = primary;
                ctx.lineWidth = 1.8;
                const rOff = (this.animTime * 5) % 28;
                ctx.beginPath();
                ctx.ellipse(cx, bottomY - 8 - rOff, 20, 5, 0, 0, Math.PI * 2);
                ctx.stroke();
            }
            ctx.restore();
        }

        ctx.translate(cx, bottomY);
        ctx.scale(this.facing, 1);

        const isMoving = Math.abs(this.vx) > 0.4;
        const runSwing = isMoving ? Math.sin(this.animTime) * 10 : 0;
        const airTuck = !this.onGround ? -5 : 0;
        const bodyBob = isMoving && this.onGround ? Math.abs(Math.cos(this.animTime)) * -3 : 0;

        if (this.heroCharId && this.heroCharId !== "default") {
            this.drawHeroCharacter(ctx, bodyBob, runSwing, airTuck);
            ctx.restore();
            return;
        }

        // 1. Flowing Multi-Segment Ninja Scarf / Cape
        const chosenCape = this.capeColor === "rainbow"
            ? `hsl(${(rainbowHue + 90) % 360}, 100%, 60%)`
            : (this.capeColor || palette.scarf);
        const scarfColor = this.hasFire ? "#ff5400" : (this.speedTimer > 0 ? "#06d6a0" : chosenCape);
        ctx.fillStyle = scarfColor;
        const wave1 = Math.sin(this.animTime * 0.9) * 5;
        const wave2 = Math.cos(this.animTime * 0.9) * 7;
        ctx.beginPath();
        ctx.moveTo(-6, -34 + bodyBob);
        ctx.quadraticCurveTo(-20, -32 + wave1, -28, -22 + wave2);
        ctx.quadraticCurveTo(-18, -16 + wave2, -5, -24 + bodyBob);
        ctx.closePath();
        ctx.fill();

        // ==========================================
        // 2. CUSTOM BACK WEAPONS & WINGS (12 Types!)
        // ==========================================
        ctx.save();
        ctx.strokeStyle = primary;
        ctx.fillStyle = primary;

        if (this.backGearId === "dual_blades") {
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-14, -44 + bodyBob);
            ctx.lineTo(10, -14 + bodyBob);
            ctx.moveTo(-14, -14 + bodyBob);
            ctx.lineTo(10, -44 + bodyBob);
            ctx.stroke();
        } else if (this.backGearId === "axe") {
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.moveTo(-12, -45 + bodyBob);
            ctx.lineTo(8, -15 + bodyBob);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(-10, -41 + bodyBob, 9, 0.5, Math.PI * 1.4);
            ctx.fill();
        } else if (this.backGearId === "wings") {
            const flap = Math.sin(this.animTime * 0.8) * 6;
            ctx.fillStyle = scarfColor;
            ctx.strokeStyle = primary;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-4, -30 + bodyBob);
            ctx.lineTo(-28, -48 + flap + bodyBob);
            ctx.lineTo(-22, -24 + flap * 0.5 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.backGearId === "dragon_wings") {
            const flap = Math.sin(this.animTime * 0.8) * 7;
            ctx.fillStyle = "#3c096c";
            ctx.strokeStyle = "#ff2a85";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(-4, -32 + bodyBob);
            ctx.lineTo(-32, -54 + flap + bodyBob);
            ctx.lineTo(-26, -36 + flap + bodyBob);
            ctx.lineTo(-30, -24 + flap + bodyBob);
            ctx.lineTo(-14, -22 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.backGearId === "angel_wings") {
            const flap = Math.sin(this.animTime * 0.7) * 6;
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#ffd166";
            ctx.shadowColor = "#ffd166";
            ctx.lineWidth = 2;
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.ellipse(-18 - i * 3, -38 + i * 6 + flap + bodyBob, 12 - i * 2, 4, -0.35, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        } else if (this.backGearId === "scythe") {
            // Grim Reaper Giant Scythe
            ctx.strokeStyle = "#adb5bd";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-12, -52 + bodyBob);
            ctx.lineTo(10, -10 + bodyBob);
            ctx.stroke();
            ctx.fillStyle = "#ff2a85";
            ctx.shadowColor = "#ff2a85";
            ctx.beginPath();
            ctx.moveTo(-12, -52 + bodyBob);
            ctx.quadraticCurveTo(-34, -56 + bodyBob, -28, -36 + bodyBob);
            ctx.quadraticCurveTo(-20, -45 + bodyBob, -10, -47 + bodyBob);
            ctx.closePath();
            ctx.fill();
        } else if (this.backGearId === "greatsword") {
            // Colossal Buster Greatsword
            ctx.fillStyle = "#2b2d42";
            ctx.strokeStyle = primary;
            ctx.lineWidth = 2.2;
            ctx.save();
            ctx.translate(-4, -28 + bodyBob);
            ctx.rotate(-0.65);
            ctx.fillRect(-5, -22, 10, 38);
            ctx.strokeRect(-5, -22, 10, 38);
            ctx.restore();
        } else if (this.backGearId === "jetpack") {
            // Twin Thruster Jetpack + Flame Plume
            ctx.fillStyle = "#2b2d42";
            ctx.strokeStyle = primary;
            ctx.lineWidth = 2;
            ctx.fillRect(-15, -36 + bodyBob, 8, 18);
            ctx.strokeRect(-15, -36 + bodyBob, 8, 18);
            ctx.fillStyle = "#ff6d00";
            ctx.shadowColor = "#ff6d00";
            ctx.beginPath();
            ctx.moveTo(-14, -18 + bodyBob);
            ctx.lineTo(-11, -6 + Math.sin(this.animTime * 3) * 4 + bodyBob);
            ctx.lineTo(-8, -18 + bodyBob);
            ctx.fill();
        } else if (this.backGearId === "spider_legs") {
            // 4 Mechanical Cyber-Spider Legs
            ctx.strokeStyle = primary;
            ctx.lineWidth = 2.5;
            const wv = Math.sin(this.animTime) * 4;
            for (let side of [-1, 1]) {
                ctx.beginPath();
                ctx.moveTo(-6, -28 + bodyBob);
                ctx.lineTo(-22, -38 + side * 8 + wv + bodyBob);
                ctx.lineTo(-30, -20 + side * 12 + bodyBob);
                ctx.stroke();
            }
        } else if (this.backGearId === "bow") {
            // Glowing Energy Bow
            ctx.strokeStyle = "#06d6a0";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(-8, -28 + bodyBob, 16, 1.8, 4.6);
            ctx.stroke();
        } else if (this.backGearId === "shuriken") {
            // Giant Spinning Fuma Shuriken on Back
            ctx.save();
            ctx.translate(-8, -30 + bodyBob);
            ctx.rotate(this.animTime * 0.5);
            ctx.fillStyle = primary;
            for (let i = 0; i < 4; i++) {
                ctx.rotate(Math.PI / 2);
                ctx.beginPath();
                ctx.moveTo(0, -3);
                ctx.lineTo(16, 0);
                ctx.lineTo(0, 3);
                ctx.fill();
            }
            ctx.restore();
        } else {
            // Default: Plasma Katana
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-12, -42 + bodyBob);
            ctx.lineTo(10, -16 + bodyBob);
            ctx.stroke();
        }
        ctx.restore();

        // 3. Articulated Back Leg & Armored Boot
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = palette.armorDark;
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(-2, -18 + bodyBob);
        ctx.lineTo(-4 - runSwing * 0.7, -9 + airTuck);
        ctx.lineTo(-6 - runSwing, -2 + airTuck * 0.5);
        ctx.stroke();

        // 4. Articulated Front Leg & Neon Greave
        ctx.strokeStyle = palette.armorLight;
        ctx.lineWidth = 6.5;
        ctx.beginPath();
        ctx.moveTo(2, -18 + bodyBob);
        ctx.lineTo(4 + runSwing * 0.7, -9 + airTuck);
        ctx.lineTo(6 + runSwing, -2 + airTuck * 0.5);
        ctx.stroke();

        // Glowing Boot Trim
        ctx.strokeStyle = primary;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(4 + runSwing, -2 + airTuck * 0.5);
        ctx.lineTo(9 + runSwing, -2 + airTuck * 0.5);
        ctx.stroke();

        // 5. Armored Cyber-Knight Torso & Chestplate
        const torsoGrad = ctx.createLinearGradient(-10, -36 + bodyBob, 10, -16 + bodyBob);
        torsoGrad.addColorStop(0, palette.armorLight);
        torsoGrad.addColorStop(1, palette.armorDark);
        ctx.fillStyle = torsoGrad;
        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-8, -17 + bodyBob);
        ctx.lineTo(-11, -34 + bodyBob);
        ctx.lineTo(11, -34 + bodyBob);
        ctx.lineTo(8, -17 + bodyBob);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Glowing Chest Core V-Emblem
        ctx.fillStyle = primary;
        ctx.beginPath();
        ctx.arc(2, -26 + bodyBob, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // 6. Sculpted Knight Helmet Base
        ctx.fillStyle = palette.armorDark;
        ctx.strokeStyle = primary;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, -40 + bodyBob, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // ==========================================
        // 7. CUSTOM HELMETS & HEADGEAR (12 Types!)
        // ==========================================
        ctx.save();
        if (this.helmetId === "horns") {
            ctx.fillStyle = "#ff2a85";
            ctx.beginPath();
            ctx.moveTo(-4, -48 + bodyBob);
            ctx.quadraticCurveTo(-14, -56 + bodyBob, -8, -61 + bodyBob);
            ctx.lineTo(1, -49 + bodyBob);
            ctx.moveTo(3, -48 + bodyBob);
            ctx.quadraticCurveTo(12, -55 + bodyBob, 10, -60 + bodyBob);
            ctx.lineTo(6, -47 + bodyBob);
            ctx.fill();
        } else if (this.helmetId === "crown") {
            ctx.fillStyle = "#ffd166";
            ctx.beginPath();
            ctx.moveTo(-8, -48 + bodyBob);
            ctx.lineTo(-9, -57 + bodyBob);
            ctx.lineTo(-3, -52 + bodyBob);
            ctx.lineTo(0, -59 + bodyBob);
            ctx.lineTo(3, -52 + bodyBob);
            ctx.lineTo(9, -57 + bodyBob);
            ctx.lineTo(8, -48 + bodyBob);
            ctx.closePath();
            ctx.fill();
        } else if (this.helmetId === "halo") {
            ctx.strokeStyle = "#06d6a0";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(0, -55 + bodyBob + Math.sin(this.animTime * 0.5) * 2, 11, 3.5, 0, 0, Math.PI * 2);
            ctx.stroke();
        } else if (this.helmetId === "viking") {
            // Winged Viking Horns
            ctx.fillStyle = "#e0fbfc";
            ctx.strokeStyle = primary;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-6, -44 + bodyBob);
            ctx.quadraticCurveTo(-20, -48 + bodyBob, -16, -60 + bodyBob);
            ctx.lineTo(-3, -48 + bodyBob);
            ctx.moveTo(5, -44 + bodyBob);
            ctx.quadraticCurveTo(18, -48 + bodyBob, 15, -60 + bodyBob);
            ctx.lineTo(2, -48 + bodyBob);
            ctx.fill();
            ctx.stroke();
        } else if (this.helmetId === "wolf") {
            // Cyber Wolf Ears
            ctx.fillStyle = palette.armorLight;
            ctx.strokeStyle = primary;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-7, -47 + bodyBob);
            ctx.lineTo(-9, -59 + bodyBob);
            ctx.lineTo(-1, -49 + bodyBob);
            ctx.moveTo(1, -49 + bodyBob);
            ctx.lineTo(7, -59 + bodyBob);
            ctx.lineTo(8, -46 + bodyBob);
            ctx.fill();
            ctx.stroke();
        } else if (this.helmetId === "ronin") {
            // Wide Neon Samurai Ronin Straw Hat (Kasa)
            ctx.fillStyle = "#1b1f3b";
            ctx.strokeStyle = primary;
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(-22, -45 + bodyBob);
            ctx.lineTo(0, -56 + bodyBob);
            ctx.lineTo(22, -45 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.helmetId === "spartan") {
            // Crimson Spartan Plume Crest
            ctx.fillStyle = "#ef233c";
            ctx.beginPath();
            ctx.arc(0, -46 + bodyBob, 14, Math.PI * 1.1, Math.PI * 1.95);
            ctx.lineTo(0, -48 + bodyBob);
            ctx.closePath();
            ctx.fill();
        } else if (this.helmetId === "wizard") {
            // Arcane Dark Wizard Pointed Hat
            ctx.fillStyle = "#3c096c";
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(-16, -46 + bodyBob);
            ctx.lineTo(16, -46 + bodyBob);
            ctx.lineTo(2, -49 + bodyBob);
            ctx.lineTo(-6, -65 + bodyBob);
            ctx.lineTo(-8, -49 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        } else if (this.helmetId === "antennas") {
            // Gundam / Mecha V-Fin Antennas
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(2, -47 + bodyBob);
            ctx.lineTo(-12, -60 + bodyBob);
            ctx.moveTo(2, -47 + bodyBob);
            ctx.lineTo(14, -59 + bodyBob);
            ctx.stroke();
        } else if (this.helmetId === "skull") {
            // White Bone Skull Mask Plate
            ctx.fillStyle = "#f8f9fa";
            ctx.beginPath();
            ctx.arc(1, -40 + bodyBob, 8.5, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.helmetId === "flames") {
            // Blazing Super-Saiyan / Ghost-Rider Fire Hair
            ctx.fillStyle = "#ff6d00";
            const flick = Math.sin(this.animTime * 2) * 3;
            ctx.beginPath();
            ctx.moveTo(-8, -47 + bodyBob);
            ctx.lineTo(-10, -60 + flick + bodyBob);
            ctx.lineTo(-3, -53 + bodyBob);
            ctx.lineTo(1, -64 - flick + bodyBob);
            ctx.lineTo(5, -53 + bodyBob);
            ctx.lineTo(10, -59 + flick + bodyBob);
            ctx.lineTo(8, -47 + bodyBob);
            ctx.closePath();
            ctx.fill();
        } else {
            // Default: Knight Fin Crest
            ctx.fillStyle = primary;
            ctx.beginPath();
            ctx.moveTo(-4, -49 + bodyBob);
            ctx.lineTo(-13, -53 + bodyBob);
            ctx.lineTo(-8, -44 + bodyBob);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // ==========================================
        // 8. CUSTOM VISORS & EYES (10 Types!)
        // ==========================================
        ctx.save();
        const eyeColor = palette.isRainbow ? rainbowColor : palette.eye;
        ctx.fillStyle = eyeColor;
        ctx.strokeStyle = eyeColor;

        if (this.visorId === "cyclops") {
            ctx.fillStyle = "#ff2a85";
            ctx.shadowColor = "#ff2a85";
            ctx.beginPath();
            ctx.arc(6, -40 + bodyBob, 3.8, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.visorId === "dual_eyes") {
            ctx.fillRect(1, -42 + bodyBob, 3.5, 4);
            ctx.fillRect(6, -42 + bodyBob, 3.5, 4);
        } else if (this.visorId === "x_visor") {
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(2, -43 + bodyBob);
            ctx.lineTo(9, -36 + bodyBob);
            ctx.moveTo(9, -43 + bodyBob);
            ctx.lineTo(2, -36 + bodyBob);
            ctx.stroke();
        } else if (this.visorId === "sharingan") {
            ctx.fillStyle = "#ef233c";
            ctx.shadowColor = "#ef233c";
            ctx.beginPath();
            ctx.arc(5, -40 + bodyBob, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#000";
            ctx.beginPath();
            ctx.arc(5, -40 + bodyBob, 1.5, 0, Math.PI * 2);
            ctx.fill();
        } else if (this.visorId === "shades") {
            // Cyberpunk Kamina Shades
            ctx.fillStyle = "#00f2fe";
            ctx.beginPath();
            ctx.moveTo(0, -43 + bodyBob);
            ctx.lineTo(12, -42 + bodyBob);
            ctx.lineTo(6, -36 + bodyBob);
            ctx.closePath();
            ctx.fill();
        } else if (this.visorId === "flame_eyes") {
            ctx.fillStyle = "#ffd166";
            ctx.shadowColor = "#ff6d00";
            ctx.beginPath();
            ctx.arc(5, -40 + bodyBob, 3.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ff6d00";
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(5, -41 + bodyBob);
            ctx.lineTo(-6, -46 + bodyBob);
            ctx.stroke();
        } else if (this.visorId === "heart_visor") {
            ctx.fillStyle = "#ff2a85";
            ctx.font = "10px sans-serif";
            ctx.fillText("♥", 1, -36 + bodyBob);
        } else if (this.visorId === "robo_grid") {
            ctx.fillStyle = "#06d6a0";
            ctx.fillRect(1, -43 + bodyBob, 9, 2);
            ctx.fillRect(1, -39 + bodyBob, 9, 2);
        } else if (this.visorId === "void_gaze") {
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "#ffffff";
            ctx.beginPath();
            ctx.arc(4, -40 + bodyBob, 5, 0, Math.PI * 2);
            ctx.fill();
        } else {
            // Default: Sharp Knight Visor Slit
            ctx.beginPath();
            ctx.moveTo(2, -42 + bodyBob);
            ctx.lineTo(10, -40 + bodyBob);
            ctx.lineTo(9, -37 + bodyBob);
            ctx.lineTo(2, -38 + bodyBob);
            ctx.closePath();
            ctx.fill();
        }
        ctx.restore();

        // 9. Articulated Front Arm & Plasma Gauntlet
        ctx.strokeStyle = palette.armorLight;
        ctx.lineWidth = 5.5;
        ctx.beginPath();
        ctx.moveTo(2, -31 + bodyBob);
        ctx.lineTo(6 - runSwing * 0.8, -21 + bodyBob);
        ctx.stroke();

        ctx.fillStyle = this.hasFire ? "#ff7b00" : primary;
        ctx.beginPath();
        ctx.arc(7 - runSwing * 0.8, -20 + bodyBob, 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    drawHeroCharacter(ctx, bodyBob, runSwing, airTuck) {
        const id = this.heroCharId;
        const wave1 = Math.sin(this.animTime * 0.9) * 4;
        const wave2 = Math.cos(this.animTime * 0.9) * 6;

        // =====================================================
        // 1. CAPE / MANTLE / BACK GEAR (Behind Character Body)
        // =====================================================
        if (id === "soldier_1950") {
            // 1950s Canvas Field Pack (Sırt Çantası) & M1 Garand Wooden Rifle on Back
            ctx.fillStyle = "#6b6343";
            ctx.strokeStyle = "#3d3722";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-14, -33 + bodyBob, 9, 14, 2);
            ctx.fill();
            ctx.stroke();
            // Rolled blanket on top of pack
            ctx.fillStyle = "#4f5830";
            ctx.beginPath();
            ctx.roundRect(-15, -36 + bodyBob, 10, 4, 2);
            ctx.fill();
            // Wooden M1 Garand Rifle barrel & stock sticking out behind
            ctx.save();
            ctx.strokeStyle = "#6f4518";
            ctx.lineWidth = 3.2;
            ctx.beginPath();
            ctx.moveTo(-12, -16 + bodyBob);
            ctx.lineTo(-4, -44 + bodyBob);
            ctx.stroke();
            ctx.strokeStyle = "#2b2d42";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(-4, -44 + bodyBob);
            ctx.lineTo(-1, -52 + bodyBob);
            ctx.stroke();
            ctx.restore();
        } else if (id === "soldier_modern") {
            // Modern Tactical Assault Pack + Radio Antenna + Suppressed M4 Carbine
            ctx.fillStyle = "#5c604d";
            ctx.strokeStyle = "#2b2f24";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-15, -34 + bodyBob, 10, 15, 2.5);
            ctx.fill();
            ctx.stroke();
            // Long Whip Radio Antenna
            ctx.strokeStyle = "#1f2421";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(-11, -34 + bodyBob);
            ctx.lineTo(-15, -52 + bodyBob);
            ctx.stroke();
            // Suppressed Carbine Barrel
            ctx.strokeStyle = "#1a1d24";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-12, -15 + bodyBob);
            ctx.lineTo(-17, -45 + bodyBob);
            ctx.stroke();
        } else if (id === "ottoman_pasha") {
            // Ceremonial Crimson & Gold-Trimmed Pasha Cloak + Curved Ottoman Kilij Scabbard
            ctx.fillStyle = "#7a0c24";
            ctx.beginPath();
            ctx.moveTo(-6, -34 + bodyBob);
            ctx.quadraticCurveTo(-21, -28 + wave1, -25, -8 + wave2);
            ctx.lineTo(-10, -8 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.6;
            ctx.stroke();

            // Curved Gold & Velvet Ottoman Scimitar (Kılıç) at hip/back
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2.8;
            ctx.beginPath();
            ctx.moveTo(-4, -18 + bodyBob);
            ctx.quadraticCurveTo(-18, -14 + bodyBob, -24, -23 + bodyBob);
            ctx.stroke();
        } else if (id === "royal_king") {
            // Majestic Royal Velvet Mantle with White Spotted Ermine Fur Trim
            ctx.fillStyle = "#9b002c";
            ctx.beginPath();
            ctx.moveTo(-6, -35 + bodyBob);
            ctx.quadraticCurveTo(-24, -27 + wave1, -29, -5 + wave2);
            ctx.lineTo(-8, -5 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2;
            ctx.stroke();

            // Ermine White Fur edge with black tail dots
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.roundRect(-12, -36 + bodyBob, 18, 5, 2.5);
            ctx.fill();
            ctx.fillStyle = "#111111";
            ctx.fillRect(-9, -34 + bodyBob, 1.5, 2);
            ctx.fillRect(-3, -34 + bodyBob, 1.5, 2);
            ctx.fillRect(3, -34 + bodyBob, 1.5, 2);
        } else if (id === "yavuz_sultan_selim") {
            // Imperial Flowing Kaftan Back Drape (Altın İşlemeli Kırmızı Hünkar Kaftanı)
            ctx.fillStyle = "#800a1d";
            ctx.beginPath();
            ctx.moveTo(-7, -35 + bodyBob);
            ctx.quadraticCurveTo(-22, -26 + wave1, -24, -6 + wave2);
            ctx.lineTo(-7, -6 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.8;
            ctx.stroke();

            // Imperial Ottoman Shamshir / Yatağan Sword Hilt & Curved Scabbard
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-3, -18 + bodyBob);
            ctx.quadraticCurveTo(-18, -13 + bodyBob, -25, -22 + bodyBob);
            ctx.stroke();
        }

        // =====================================================
        // 2. LEGS, TROUSERS & BOOTS (Animated with Run Cycle)
        // =====================================================
        let pantsColor = "#4b5320";
        let bootColor = "#3d2616";
        let bootTrim = null;

        if (id === "soldier_1950") {
            pantsColor = "#4b5320"; // 1950 Olive Drab wool trousers
            bootColor = "#4a2c18";  // Brown leather combat boots + canvas gaiters
            bootTrim = "#8c7d5b";
        } else if (id === "soldier_modern") {
            pantsColor = "#5e6451"; // MultiCam tactical pants
            bootColor = "#222426";  // Black/coyote tactical boots
            bootTrim = "#3d4035";   // Tactical knee pads
        } else if (id === "rich_tycoon") {
            pantsColor = "#111520"; // Tailored black tuxedo trousers
            bootColor = "#0a0b0e";  // Polished patent-leather Oxford shoes
            bootTrim = "#ffd166";   // Gold shoe buckle
        } else if (id === "ottoman_pasha") {
            pantsColor = "#162447"; // Imperial dark navy trousers with gold side stripe
            bootColor = "#121317";  // Tall black cavalry Pasha boots
            bootTrim = "#ffd166";
        } else if (id === "royal_king") {
            pantsColor = "#2b0938"; // Royal purple hose
            bootColor = "#d4af37";  // Golden royal sabatons / boots
            bootTrim = "#ff2a85";
        } else if (id === "yavuz_sultan_selim") {
            pantsColor = "#6b0918"; // Imperial crimson shalwar/kaftan lower
            bootColor = "#b58900";  // Ottoman Moroccan yellow/gold leather boots (Sarı Çedik Papuç)
            bootTrim = "#ffd166";
        }

        // Back Leg
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 6.5;
        ctx.beginPath();
        ctx.moveTo(-3, -17 + bodyBob);
        ctx.lineTo(-4 - runSwing * 0.75, -6 + airTuck * 0.4);
        ctx.stroke();
        ctx.fillStyle = bootColor;
        ctx.beginPath();
        ctx.roundRect(-8 - runSwing * 0.75, -6 + airTuck * 0.4, 9, 6, 2);
        ctx.fill();

        // Front Leg
        ctx.strokeStyle = pantsColor;
        ctx.lineWidth = 6.8;
        ctx.beginPath();
        ctx.moveTo(3, -17 + bodyBob);
        ctx.lineTo(4 + runSwing * 0.75, -6 - airTuck * 0.4);
        ctx.stroke();
        if (bootTrim) {
            ctx.fillStyle = bootTrim;
            ctx.fillRect(1 + runSwing * 0.5, -12 - airTuck * 0.2, 5, 3);
        }
        ctx.fillStyle = bootColor;
        ctx.beginPath();
        ctx.roundRect(0 + runSwing * 0.75, -6 - airTuck * 0.4, 10, 6, 2);
        ctx.fill();

        // =====================================================
        // 3. TORSO / UNIFORM / SUIT / KAFTAN (Realistic Detail)
        // =====================================================
        if (id === "soldier_1950") {
            // 1950s Olive Drab Wool Field Jacket
            ctx.fillStyle = "#525b26";
            ctx.strokeStyle = "#2f3615";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-9, -35 + bodyBob, 18, 19, 4);
            ctx.fill();
            ctx.stroke();

            // Two buttoned chest pockets
            ctx.fillStyle = "#434a1f";
            ctx.fillRect(-6, -31 + bodyBob, 5, 5);
            ctx.fillRect(1, -31 + bodyBob, 5, 5);

            // Brown leather Sam Browne belt + diagonal cross-chest ammo strap
            ctx.strokeStyle = "#5c3317";
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(-7, -34 + bodyBob);
            ctx.lineTo(7, -19 + bodyBob);
            ctx.stroke();
            ctx.fillStyle = "#4a2810";
            ctx.fillRect(-9, -20 + bodyBob, 18, 3.5);
            // Brass belt buckle
            ctx.fillStyle = "#ffd166";
            ctx.fillRect(-1.5, -20.5 + bodyBob, 4, 4);
        } else if (id === "soldier_modern") {
            // Modern MultiCam Combat Shirt + Coyote MOLLE Plate Carrier Vest
            ctx.fillStyle = "#6b705c";
            ctx.beginPath();
            ctx.roundRect(-9, -35 + bodyBob, 18, 19, 4);
            ctx.fill();
            // Digital camo patches on sleeves/sides
            ctx.fillStyle = "#3f4238";
            ctx.fillRect(-8, -33 + bodyBob, 4, 4);
            ctx.fillRect(4, -28 + bodyBob, 4, 4);

            // Tactical Plate Carrier Vest (Hücum Yeleği)
            ctx.fillStyle = "#8c7a5b";
            ctx.strokeStyle = "#4a3f2d";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-7.5, -33 + bodyBob, 15, 15, 3);
            ctx.fill();
            ctx.stroke();
            // 3 Magazine Pouches & MOLLE Webbing rows
            ctx.fillStyle = "#6e5f45";
            ctx.fillRect(-6, -25 + bodyBob, 3.5, 6);
            ctx.fillRect(-1.5, -25 + bodyBob, 3.5, 6);
            ctx.fillRect(3, -25 + bodyBob, 3.5, 6);
            // Tactical PTT radio mic on chest
            ctx.fillStyle = "#1a1d24";
            ctx.fillRect(2, -31 + bodyBob, 3, 3);
        } else if (id === "rich_tycoon") {
            // Luxury Double-Breasted Black Pinstripe Tuxedo Suit
            ctx.fillStyle = "#111520";
            ctx.strokeStyle = "#2b3248";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.roundRect(-9, -35 + bodyBob, 18, 19, 4);
            ctx.fill();
            ctx.stroke();

            // Crisp White Dress Shirt V-neck
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(-4, -35 + bodyBob);
            ctx.lineTo(4, -35 + bodyBob);
            ctx.lineTo(1, -24 + bodyBob);
            ctx.closePath();
            ctx.fill();

            // Silk Red Tie + Diamond Pin
            ctx.fillStyle = "#e63946";
            ctx.beginPath();
            ctx.moveTo(-0.5, -34 + bodyBob);
            ctx.lineTo(2.5, -34 + bodyBob);
            ctx.lineTo(2, -23 + bodyBob);
            ctx.lineTo(0.5, -21 + bodyBob);
            ctx.lineTo(-1, -23 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.fillStyle = "#00f2fe";
            ctx.fillRect(0.3, -29 + bodyBob, 1.8, 1.8);

            // Red Silk Pocket Square & Gold Pocket-Watch Chain
            ctx.fillStyle = "#ff2a85";
            ctx.beginPath();
            ctx.moveTo(4, -30 + bodyBob);
            ctx.lineTo(7, -32 + bodyBob);
            ctx.lineTo(7, -29 + bodyBob);
            ctx.closePath();
            ctx.fill();

            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-5, -21 + bodyBob);
            ctx.quadraticCurveTo(0, -17 + bodyBob, 6, -21 + bodyBob);
            ctx.stroke();
        } else if (id === "ottoman_pasha") {
            // 19th-Century Ottoman Pasha Imperial Coat (Sırma İşlemeli Paşa Üniforması)
            ctx.fillStyle = "#14213d";
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.roundRect(-9, -35 + bodyBob, 18, 19, 4);
            ctx.fill();
            ctx.stroke();

            // Gold Braid Chest Frogs (Altın Sırma Göğüs İşlemeleri)
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.6;
            for (let yOff of [-31, -28, -25]) {
                ctx.beginPath();
                ctx.moveTo(-6, yOff + bodyBob);
                ctx.lineTo(6, yOff + bodyBob);
                ctx.stroke();
            }

            // Crimson Silk Waist Sash (Kırmızı Paşa Kuşağı)
            ctx.fillStyle = "#c1121f";
            ctx.fillRect(-9, -21 + bodyBob, 18, 4);

            // Gold Fringed Epaulettes (Altın Saçaklı Paşa Apoletleri)
            ctx.fillStyle = "#ffd166";
            ctx.beginPath();
            ctx.ellipse(-8, -34 + bodyBob, 4.5, 2.5, 0, 0, Math.PI * 2);
            ctx.ellipse(8, -34 + bodyBob, 4.5, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();

            // Ottoman Mecidiye Order Star Medal on Chest
            ctx.fillStyle = "#06d6a0";
            ctx.beginPath();
            ctx.arc(4.5, -30 + bodyBob, 2.2, 0, Math.PI * 2);
            ctx.fill();
        } else if (id === "royal_king") {
            // Royal Purple & Gold Brocade Tunic + Jeweled Belt
            ctx.fillStyle = "#3c096c";
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.roundRect(-9, -35 + bodyBob, 18, 19, 4);
            ctx.fill();
            ctx.stroke();

            // Vertical Gold Embroidery Strip down center
            ctx.fillStyle = "#ffd166";
            ctx.fillRect(-2, -35 + bodyBob, 4, 19);

            // Jeweled Royal Belt
            ctx.fillStyle = "#d4af37";
            ctx.fillRect(-9, -21 + bodyBob, 18, 3.8);
            ctx.fillStyle = "#ff0055";
            ctx.beginPath();
            ctx.arc(0, -19.1 + bodyBob, 2.2, 0, Math.PI * 2);
            ctx.fill();
        } else if (id === "yavuz_sultan_selim") {
            // Yavuz Sultan Selim's Imperial Crimson & Gold-Brocaded Kaftan with Dark Sable Fur Collar
            // Inner Emerald/Turquoise Silk Entari
            ctx.fillStyle = "#0a9396";
            ctx.beginPath();
            ctx.roundRect(-8, -35 + bodyBob, 16, 19, 3);
            ctx.fill();

            // Outer Crimson & Gold Ceremonial Kaftan Flaps
            ctx.fillStyle = "#9b002c";
            ctx.fillRect(-9.5, -35 + bodyBob, 6.5, 19);
            ctx.fillRect(3, -35 + bodyBob, 6.5, 19);

            // Golden Ottoman Tulip/Rumi Brocade Motifs & Trim
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.6;
            ctx.strokeRect(-9.5, -35 + bodyBob, 6.5, 19);
            ctx.strokeRect(3, -35 + bodyBob, 6.5, 19);

            // Imperial Jeweled Belt (Cevahir Kuşak)
            ctx.fillStyle = "#ffd166";
            ctx.fillRect(-9.5, -21 + bodyBob, 19, 3.8);
            ctx.fillStyle = "#06d6a0";
            ctx.beginPath();
            ctx.arc(0, -19.1 + bodyBob, 2.2, 0, Math.PI * 2);
            ctx.fill();

            // Rich Dark Sable Fur Collar (Samur Kürklü Yaka) over shoulders
            ctx.fillStyle = "#3d2314";
            ctx.beginPath();
            ctx.moveTo(-10, -35 + bodyBob);
            ctx.lineTo(10, -35 + bodyBob);
            ctx.lineTo(6, -27 + bodyBob);
            ctx.lineTo(0, -31 + bodyBob);
            ctx.lineTo(-6, -27 + bodyBob);
            ctx.closePath();
            ctx.fill();
        }

        // =====================================================
        // 4. REALISTIC HUMAN HEAD & DISTINCT FACE TYPES (YÜZ TİPLERİ)
        // =====================================================
        const skinTones = {
            soldier_1950: "#e0ac84",       // Warm sun-weathered 1950s veteran skin
            soldier_modern: "#d89e74",     // Tactical tanned skin
            rich_tycoon: "#f3c6a4",        // Aristocratic fair-warm skin
            ottoman_pasha: "#dfa87e",      // Noble bronze-warm Pasha skin
            royal_king: "#eec19c",         // Regal warm skin
            yavuz_sultan_selim: "#e5b28a"  // Historical portrait complexion
        };
        const faceSkin = skinTones[id] || "#e5b28a";

        // Neck
        ctx.fillStyle = faceSkin;
        ctx.fillRect(-3, -38 + bodyBob, 6, 4);

        // Sculpted Human Head with Jawline & Ear
        ctx.fillStyle = faceSkin;
        ctx.strokeStyle = "rgba(65, 35, 18, 0.45)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(-8.5, -51 + bodyBob, 17.5, 15.5, [6, 6, 5, 4]);
        ctx.fill();
        ctx.stroke();

        // Human Ear (left side)
        ctx.fillStyle = faceSkin;
        ctx.beginPath();
        ctx.arc(-8.5, -43 + bodyBob, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Nose Profile (Aquiline for Yavuz & Pasha, classic for others)
        ctx.strokeStyle = "rgba(85, 45, 22, 0.75)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        if (id === "yavuz_sultan_selim" || id === "ottoman_pasha") {
            // Prominent Aquiline Nose (Kemerli Burun)
            ctx.moveTo(6.5, -46.5 + bodyBob);
            ctx.quadraticCurveTo(10.5, -43.5 + bodyBob, 8.5, -41 + bodyBob);
            ctx.lineTo(6.2, -41 + bodyBob);
        } else {
            ctx.moveTo(6.5, -46 + bodyBob);
            ctx.lineTo(9.2, -42 + bodyBob);
            ctx.lineTo(6.5, -41.5 + bodyBob);
        }
        ctx.stroke();

        // Human Eyes (White Sclera + Colored Iris + Pupil)
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.ellipse(3.5, -45 + bodyBob, 2.8, 1.8, 0, 0, Math.PI * 2);
        ctx.fill();

        const irisColor = id === "royal_king" ? "#1d63b8" : (id === "rich_tycoon" ? "#2a9d8f" : "#2b1911");
        ctx.fillStyle = irisColor;
        ctx.beginPath();
        ctx.arc(4.2, -45 + bodyBob, 1.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(4.5, -45 + bodyBob, 0.7, 0, Math.PI * 2);
        ctx.fill();

        // CHARACTER-SPECIFIC FACIAL FEATURES (YÜZ TİPİ DETAYLARI)
        if (id === "soldier_1950") {
            // 1950 Soldier Face: Thick rugged dark eyebrows + Classic 1950s Chevron Mustache + Cleft Chin
            ctx.strokeStyle = "#2b1d12";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(0.5, -47.5 + bodyBob);
            ctx.lineTo(6.8, -47 + bodyBob);
            ctx.stroke();

            // Classic 1950s Thick Soldier Mustache
            ctx.fillStyle = "#2b1d12";
            ctx.beginPath();
            ctx.moveTo(1.5, -40.5 + bodyBob);
            ctx.quadraticCurveTo(5.5, -41.5 + bodyBob, 8.8, -39.2 + bodyBob);
            ctx.lineTo(8.2, -37.8 + bodyBob);
            ctx.quadraticCurveTo(5, -39 + bodyBob, 1, -38.5 + bodyBob);
            ctx.closePath();
            ctx.fill();

            // Stern mouth & chin crease
            ctx.strokeStyle = "#6b3e26";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(3, -36.8 + bodyBob);
            ctx.lineTo(6.5, -36.8 + bodyBob);
            ctx.stroke();
        } else if (id === "soldier_modern") {
            // Modern Soldier Face: Green/Black Camo Face Paint Stripes + Full Tactical Stubble Beard + Brow Scar
            // Camo War-Paint Stripes on cheek
            ctx.strokeStyle = "#2d3a22";
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(-2, -43.5 + bodyBob);
            ctx.lineTo(3, -42.5 + bodyBob);
            ctx.moveTo(-2.5, -41.2 + bodyBob);
            ctx.lineTo(2.5, -40.2 + bodyBob);
            ctx.stroke();

            // Sharp Tactical Eyebrow
            ctx.strokeStyle = "#1f1812";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(0.5, -47.2 + bodyBob);
            ctx.lineTo(7, -46.8 + bodyBob);
            ctx.stroke();

            // Full Modern Tactical Short Beard & Jawline Stubble
            ctx.fillStyle = "rgba(35, 26, 18, 0.85)";
            ctx.beginPath();
            ctx.moveTo(-6, -42 + bodyBob);
            ctx.lineTo(-4, -36 + bodyBob);
            ctx.lineTo(8.5, -36 + bodyBob);
            ctx.lineTo(8.5, -40.2 + bodyBob);
            ctx.lineTo(3, -40.2 + bodyBob);
            ctx.lineTo(2, -38 + bodyBob);
            ctx.lineTo(-3, -38.5 + bodyBob);
            ctx.closePath();
            ctx.fill();
        } else if (id === "rich_tycoon") {
            // Rich Tycoon Face: Raised Suave Eyebrow + Gold-Rimmed Monocle with Chain + Upturned Pencil Mustache & Smirk
            ctx.strokeStyle = "#221814";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(0.5, -48 + bodyBob);
            ctx.quadraticCurveTo(4, -49.5 + bodyBob, 7, -47.5 + bodyBob);
            ctx.stroke();

            // Gold-Rimmed Monocle over Eye + Gold Chain
            ctx.fillStyle = "rgba(0, 242, 254, 0.22)";
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(4, -45 + bodyBob, 3.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
            // Monocle chain
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(1.2, -43 + bodyBob);
            ctx.quadraticCurveTo(-2, -38 + bodyBob, -1, -34 + bodyBob);
            ctx.stroke();

            // Suave Upturned Thin Mustache & Goatee
            ctx.strokeStyle = "#1a1412";
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.moveTo(2, -39.5 + bodyBob);
            ctx.quadraticCurveTo(6, -39.5 + bodyBob, 9.5, -41.2 + bodyBob);
            ctx.stroke();
            // Confident Smirk
            ctx.strokeStyle = "#8a4236";
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(2.5, -37.5 + bodyBob);
            ctx.quadraticCurveTo(5.5, -36.8 + bodyBob, 7.2, -38.2 + bodyBob);
            ctx.stroke();
        } else if (id === "ottoman_pasha") {
            // Ottoman Pasha Face: Dignified Trimmed Full Beard + Thick Curled Handlebar Mustache (Gür Burma Pala Bıyık)
            ctx.strokeStyle = "#1e140f";
            ctx.lineWidth = 2.3;
            ctx.beginPath();
            ctx.moveTo(0, -47.8 + bodyBob);
            ctx.lineTo(7.2, -46.8 + bodyBob);
            ctx.stroke();

            // Rounded Pasha Beard along the jaw
            ctx.fillStyle = "#241711";
            ctx.beginPath();
            ctx.moveTo(-6.5, -42 + bodyBob);
            ctx.quadraticCurveTo(-5, -34 + bodyBob, 4, -34 + bodyBob);
            ctx.quadraticCurveTo(9, -34.5 + bodyBob, 8.8, -39 + bodyBob);
            ctx.lineTo(2, -38.5 + bodyBob);
            ctx.lineTo(-4, -39 + bodyBob);
            ctx.closePath();
            ctx.fill();

            // Iconic Curled Handlebar Pasha Mustache (Uçları Kıvrık Gür Pala Bıyık)
            ctx.strokeStyle = "#140d09";
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(0.5, -39.5 + bodyBob);
            ctx.quadraticCurveTo(6, -40.5 + bodyBob, 11.5, -42.5 + bodyBob);
            ctx.stroke();
        } else if (id === "royal_king") {
            // Royal King Face: Majestic Long Golden-Brown & Silver-Streaked Royal Beard & Mustache
            ctx.strokeStyle = "#5c3d1e";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(0.5, -47.8 + bodyBob);
            ctx.lineTo(7, -47.2 + bodyBob);
            ctx.stroke();

            // Full Flowing Royal Beard reaching chest
            ctx.fillStyle = "#6e4720";
            ctx.beginPath();
            ctx.moveTo(-6.5, -42 + bodyBob);
            ctx.quadraticCurveTo(-6, -31 + bodyBob, 3.5, -30.5 + bodyBob);
            ctx.quadraticCurveTo(10.5, -31 + bodyBob, 9.2, -40 + bodyBob);
            ctx.closePath();
            ctx.fill();

            // Wisdom Silver Streaks in King's Beard + Royal Mustache
            ctx.strokeStyle = "#d9d9d9";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(1, -38 + bodyBob);
            ctx.lineTo(2, -32 + bodyBob);
            ctx.moveTo(5, -38 + bodyBob);
            ctx.lineTo(6, -32 + bodyBob);
            ctx.stroke();

            ctx.fillStyle = "#523416";
            ctx.beginPath();
            ctx.ellipse(5, -39.5 + bodyBob, 4.8, 1.8, 0.1, 0, Math.PI * 2);
            ctx.fill();
        } else if (id === "yavuz_sultan_selim") {
            // YAVUZ SULTAN SELİM FACE (Tarihi Portreye Birebir Uygun):
            // 1) Completely Clean-Shaven Sharp Chin (Sakalsız Keskin Çene)
            // 2) Long Downward-Sweeping Thick Selimi Mustache (Aşağı Sarkık Uzun Gür Pala Bıyık)
            // 3) Fierce Arched Eyebrows (Çatık Gür Kaşlar)
            // 4) Iconic Single Pearl Earring (İnci Küpe / Mengüş) on Ear!

            // Fierce Arched Selimi Eyebrow
            ctx.strokeStyle = "#140c08";
            ctx.lineWidth = 2.3;
            ctx.beginPath();
            ctx.moveTo(0, -48.2 + bodyBob);
            ctx.quadraticCurveTo(4, -49.2 + bodyBob, 7.5, -46.5 + bodyBob);
            ctx.stroke();

            // Iconic Single Gold & Pearl Drop Earring on the Ear!
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(-8.5, -40.2 + bodyBob, 2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(-8.5, -37.8 + bodyBob, 2.1, 0, Math.PI * 2);
            ctx.fill();

            // Stern Imperial Lower Lip & Clean-Shaven Chin Contour (Sakalsız Keskin Çene)
            ctx.strokeStyle = "#7a442a";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(4.2, -37.3 + bodyBob);
            ctx.lineTo(7.4, -37.3 + bodyBob);
            ctx.stroke();

            // Sculpted, Voluminous Selimî Pala Bıyık (Centered directly under the Aquiline Nose at x=6.5)
            ctx.save();
            ctx.fillStyle = "#160d08";
            ctx.strokeStyle = "#0b0604";
            ctx.lineWidth = 0.8;

            // 1. Front-Right Wing of Mustache (sweeping outward & down past mouth corner)
            ctx.beginPath();
            ctx.moveTo(6.4, -40.9 + bodyBob);
            ctx.bezierCurveTo(9.4, -40.8 + bodyBob, 11.5, -38.2 + bodyBob, 11.2, -33.8 + bodyBob);
            ctx.bezierCurveTo(9.5, -35.6 + bodyBob, 8.6, -38.5 + bodyBob, 6.4, -38.5 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 2. Cheek-Left Wing of Mustache (full, thick upper-lip body sweeping gracefully down past jawline)
            ctx.beginPath();
            ctx.moveTo(6.8, -40.9 + bodyBob);
            ctx.bezierCurveTo(3.2, -41.3 + bodyBob, 0.2, -38.6 + bodyBob, 0.5, -33.5 + bodyBob);
            ctx.bezierCurveTo(2.3, -35.2 + bodyBob, 3.6, -38.4 + bodyBob, 6.8, -38.5 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 3. Natural Hair-Strand Highlights on the Mustache
            ctx.strokeStyle = "#3d2518";
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(5.8, -40.0 + bodyBob);
            ctx.quadraticCurveTo(2.4, -39.6 + bodyBob, 1.2, -35.2 + bodyBob);
            ctx.moveTo(7.2, -40.0 + bodyBob);
            ctx.quadraticCurveTo(9.6, -39.4 + bodyBob, 10.4, -35.4 + bodyBob);
            ctx.stroke();
            ctx.restore();
        }

        // =====================================================
        // 5. AUTHENTIC HISTORICAL / MODERN HEADGEAR (BAŞLIKLAR)
        // =====================================================
        if (id === "soldier_1950") {
            // 1950s M1 Steel Pot Helmet with Camo Netting & Chinstrap
            ctx.fillStyle = "#3f471d";
            ctx.strokeStyle = "#252b0f";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(0, -48 + bodyBob, 11, Math.PI * 0.98, Math.PI * 0.02, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // Helmet Rim
            ctx.beginPath();
            ctx.moveTo(-12, -48 + bodyBob);
            ctx.lineTo(12.5, -47.5 + bodyBob);
            ctx.stroke();
            // Netting Criss-Cross Lines + Gold Rank Insignia on Front
            ctx.strokeStyle = "rgba(25, 30, 10, 0.55)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-6, -56 + bodyBob);
            ctx.lineTo(2, -48 + bodyBob);
            ctx.moveTo(2, -56 + bodyBob);
            ctx.lineTo(-6, -48 + bodyBob);
            ctx.stroke();
            ctx.fillStyle = "#ffd166";
            ctx.fillRect(5, -53 + bodyBob, 2.5, 3.5);
            // Leather Chinstrap
            ctx.strokeStyle = "#4a2c18";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-5, -47 + bodyBob);
            ctx.lineTo(-2, -36 + bodyBob);
            ctx.stroke();
        } else if (id === "soldier_modern") {
            // Modern High-Cut FAST Ballistic Helmet + Quad NVG Night-Vision Goggles
            ctx.fillStyle = "#4d5244";
            ctx.strokeStyle = "#262922";
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(-0.5, -49 + bodyBob, 10.5, Math.PI * 0.95, Math.PI * 0.05, false);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            // ARC Side Rail & Velcro Patch
            ctx.fillStyle = "#8c7a5b";
            ctx.fillRect(-6, -53 + bodyBob, 7, 3);
            // 4-Tube Quad NVG Night Vision Mount & Glowing Green Lenses
            ctx.fillStyle = "#16191f";
            ctx.fillRect(6, -54 + bodyBob, 8, 5);
            ctx.fillStyle = "#06d6a0";
            ctx.beginPath();
            ctx.arc(13.5, -52.5 + bodyBob, 1.6, 0, Math.PI * 2);
            ctx.arc(13.5, -49.8 + bodyBob, 1.6, 0, Math.PI * 2);
            ctx.fill();
        } else if (id === "rich_tycoon") {
            // Sleek Silk Luxury Top Hat with Solid Gold Band
            ctx.fillStyle = "#10141f";
            ctx.strokeStyle = "#2d354d";
            ctx.lineWidth = 1.2;
            // Top Hat Crown
            ctx.beginPath();
            ctx.roundRect(-8, -64 + bodyBob, 16, 15, 2);
            ctx.fill();
            ctx.stroke();
            // Gold Ribbon Band
            ctx.fillStyle = "#ffd166";
            ctx.fillRect(-8, -52.5 + bodyBob, 16, 3);
            // Wide Curved Hat Brim
            ctx.fillStyle = "#10141f";
            ctx.beginPath();
            ctx.ellipse(0, -49.5 + bodyBob, 13.5, 2.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
        } else if (id === "ottoman_pasha") {
            // Authentic Maroon Ottoman Fez (Kırmızı Osmanlı Fesi) + Flowing Black Silk Tassel (Püskül)
            ctx.fillStyle = "#8a0f2b";
            ctx.strokeStyle = "#4d0717";
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(-8.5, -49 + bodyBob);
            ctx.lineTo(-6.5, -61 + bodyBob);
            ctx.lineTo(6.5, -61 + bodyBob);
            ctx.lineTo(8.5, -49 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Golden Crescent & Star Ornament on Fez
            ctx.fillStyle = "#ffd166";
            ctx.beginPath();
            ctx.arc(2.5, -55 + bodyBob, 2.2, 0.4, Math.PI * 1.6);
            ctx.fill();

            // Black Silk Tassel (Siyah Püskül) hanging from top center to back
            ctx.strokeStyle = "#111111";
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(0, -61 + bodyBob);
            ctx.quadraticCurveTo(-9, -60 + bodyBob, -10.5, -50 + wave1 * 0.4 + bodyBob);
            ctx.stroke();
        } else if (id === "royal_king") {
            // Jeweled Solid-Gold Royal Crown with Crimson Velvet Cap
            ctx.fillStyle = "#9b002c";
            ctx.beginPath();
            ctx.arc(0, -51 + bodyBob, 8.5, Math.PI, 0, false);
            ctx.fill();

            ctx.fillStyle = "#ffd166";
            ctx.strokeStyle = "#b58900";
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.moveTo(-9.5, -49 + bodyBob);
            ctx.lineTo(-10.5, -59 + bodyBob);
            ctx.lineTo(-5, -54 + bodyBob);
            ctx.lineTo(0, -61 + bodyBob);
            ctx.lineTo(5, -54 + bodyBob);
            ctx.lineTo(10.5, -59 + bodyBob);
            ctx.lineTo(9.5, -49 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Rubies, Emeralds & Sapphires on Crown
            ctx.fillStyle = "#ff0055";
            ctx.beginPath();
            ctx.arc(0, -52.5 + bodyBob, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#06d6a0";
            ctx.beginPath();
            ctx.arc(-5.5, -52.5 + bodyBob, 1.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#00f2fe";
            ctx.beginPath();
            ctx.arc(5.5, -52.5 + bodyBob, 1.5, 0, Math.PI * 2);
            ctx.fill();
        } else if (id === "yavuz_sultan_selim") {
            // ICONIC TAC-I SELİMİ (Yavuz Sultan Selim'in Kırmızı Külahlı Burmalı Beyaz Sarığı ve Sorgucu):
            // 1. Tall Faceted Crimson Velvet Crown Cap (Kırmızı Tac-ı Selimi Börkü) rising in center
            ctx.fillStyle = "#9b0a28";
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(-5.5, -54 + bodyBob);
            ctx.lineTo(-4, -67 + bodyBob);
            ctx.lineTo(4, -67 + bodyBob);
            ctx.lineTo(5.5, -54 + bodyBob);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // 2. Voluminous Pleated White Silk Imperial Turban (Burmalı Hünkar Sarığı)
            ctx.fillStyle = "#f8f9fa";
            ctx.strokeStyle = "#ced4da";
            ctx.lineWidth = 1.3;
            ctx.beginPath();
            ctx.ellipse(-4.5, -55 + bodyBob, 7.5, 6.2, -0.2, 0, Math.PI * 2);
            ctx.ellipse(4.5, -55 + bodyBob, 7.5, 6.2, 0.2, 0, Math.PI * 2);
            ctx.ellipse(0, -53.5 + bodyBob, 11.5, 5.5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Diagonal Pleat Folds across the White Turban
            ctx.strokeStyle = "#adb5bd";
            ctx.lineWidth = 1.1;
            ctx.beginPath();
            ctx.moveTo(-8, -56 + bodyBob);
            ctx.lineTo(-1, -50 + bodyBob);
            ctx.moveTo(-3, -58 + bodyBob);
            ctx.lineTo(4, -50 + bodyBob);
            ctx.moveTo(3, -58 + bodyBob);
            ctx.lineTo(9, -51 + bodyBob);
            ctx.stroke();

            // 3. Jeweled Gold Aigrette & Sweeping White Heron Plume (Mücevherli Altın Sorguç)
            ctx.fillStyle = "#ffd166";
            ctx.beginPath();
            ctx.ellipse(4.5, -57 + bodyBob, 2.8, 3.6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#e63946";
            ctx.beginPath();
            ctx.arc(4.5, -57 + bodyBob, 1.5, 0, Math.PI * 2);
            ctx.fill();

            // White Imperial Plume Feather arching upward
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.moveTo(4.5, -60 + bodyBob);
            ctx.quadraticCurveTo(8, -68 + bodyBob, 1.5, -71 + bodyBob);
            ctx.stroke();
        }

        // =====================================================
        // 6. FRONT ARM & HAND-HELD WEAPON / PROP
        // =====================================================
        let sleeveColor = "#525b26";
        if (id === "soldier_modern") sleeveColor = "#6b705c";
        else if (id === "rich_tycoon") sleeveColor = "#111520";
        else if (id === "ottoman_pasha") sleeveColor = "#14213d";
        else if (id === "royal_king") sleeveColor = "#3c096c";
        else if (id === "yavuz_sultan_selim") sleeveColor = "#9b002c";

        const handX = 6 - runSwing * 0.7;
        const handY = -21 + bodyBob;

        ctx.strokeStyle = sleeveColor;
        ctx.lineWidth = 5.5;
        ctx.beginPath();
        ctx.moveTo(2, -31 + bodyBob);
        ctx.lineTo(handX, handY);
        ctx.stroke();

        // Hand
        ctx.fillStyle = faceSkin;
        ctx.beginPath();
        ctx.arc(handX + 1, handY + 1, 3.2, 0, Math.PI * 2);
        ctx.fill();

        // Hand-Held Signature Item
        if (id === "rich_tycoon") {
            // Gold-Topped Luxury Walking Cane (Altın Baston)
            ctx.strokeStyle = "#1a1412";
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.moveTo(handX + 2, handY);
            ctx.lineTo(handX + 4, -3);
            ctx.stroke();
            ctx.fillStyle = "#ffd166";
            ctx.beginPath();
            ctx.arc(handX + 2, handY - 1, 2.8, 0, Math.PI * 2);
            ctx.fill();
        } else if (id === "royal_king") {
            // Golden Royal Scepter with Glowing Ruby Orb (Kraliyet Asası)
            ctx.strokeStyle = "#ffd166";
            ctx.lineWidth = 2.6;
            ctx.beginPath();
            ctx.moveTo(handX + 1, handY + 4);
            ctx.lineTo(handX + 5, handY - 14);
            ctx.stroke();
            ctx.fillStyle = "#ff0055";
            ctx.beginPath();
            ctx.arc(handX + 5, handY - 15, 3.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

window.SKIN_PALETTES = SKIN_PALETTES;
window.Particle = Particle;
window.FloatingText = FloatingText;
window.Fireball = Fireball;
window.PowerUpItem = PowerUpItem;
window.Enemy = Enemy;
window.AbyssBoss = AbyssBoss;
window.Player = Player;

// Procedural Web Audio API Sound & Dark Synth Ambience Engine
class SoundManager {
    constructor() {
        this.ctx = null;
        this.sfxMuted = false;
        this.musicMuted = false;
        this.bgmInterval = null;
        this.bgmStep = 0;
        this.currentIsBoss = false;
        this.adPlaying = false;

        try {
            const saved = JSON.parse(localStorage.getItem("shadow_jumper_audio_v1") || "{}");
            this.sfxMuted = Boolean(saved.sfxMuted);
            this.musicMuted = Boolean(saved.musicMuted);
        } catch (e) {
            // Ignore storage errors
        }

        // Google Play Policy Compliance: Automatically suspend all audio when screen locks or app goes to background
        const handleBackground = () => {
            if (document.hidden) {
                this.suspendAudio();
            } else if (!this.adPlaying) {
                this.resumeAudio();
            }
        };
        document.addEventListener("visibilitychange", handleBackground);
        window.addEventListener("pagehide", () => this.suspendAudio());
        window.addEventListener("blur", () => this.suspendAudio());
        window.addEventListener("focus", () => {
            if (!document.hidden && !this.adPlaying) {
                this.resumeAudio();
            }
        });
    }

    suspendAudio() {
        if (this.ctx && this.ctx.state === "running") {
            try {
                this.ctx.suspend();
            } catch (e) {}
        }
    }

    resumeAudio() {
        if (this.ctx && this.ctx.state === "suspended" && !document.hidden && !this.adPlaying) {
            try {
                this.ctx.resume();
            } catch (e) {}
        }
    }

    saveAudioPrefs() {
        try {
            localStorage.setItem("shadow_jumper_audio_v1", JSON.stringify({
                sfxMuted: this.sfxMuted,
                musicMuted: this.musicMuted
            }));
        } catch (e) {
            // Ignore storage errors
        }
    }

    init() {
        if (!this.ctx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            if (AudioCtx) {
                this.ctx = new AudioCtx();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    toggleSfx() {
        this.sfxMuted = !this.sfxMuted;
        this.saveAudioPrefs();
        if (!this.sfxMuted) this.coin();
        return this.sfxMuted;
    }

    toggleMusic() {
        this.musicMuted = !this.musicMuted;
        this.saveAudioPrefs();
        if (this.musicMuted) {
            this.stopBGM();
        } else {
            this.init();
            this.startBGM(this.currentIsBoss);
        }
        return this.musicMuted;
    }

    toggleMute() {
        const bothMuted = !this.sfxMuted || !this.musicMuted;
        this.sfxMuted = bothMuted;
        this.musicMuted = bothMuted;
        this.saveAudioPrefs();
        if (this.musicMuted) {
            this.stopBGM();
        } else {
            this.startBGM(this.currentIsBoss);
        }
        return bothMuted;
    }

    playRawTone(freq, type, duration, vol = 0.15, slideTo = null) {
        if (document.hidden || this.adPlaying) return;
        this.init();
        if (!this.ctx || this.ctx.state !== 'running') return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);
        if (slideTo) {
            osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
        }

        gain.gain.setValueAtTime(vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration);
    }

    playTone(freq, type, duration, vol = 0.15, slideTo = null) {
        if (this.sfxMuted) return;
        this.playRawTone(freq, type, duration, vol, slideTo);
    }

    jump() {
        this.playTone(220, 'sine', 0.16, 0.16, 520);
    }

    doubleJump() {
        this.playTone(340, 'triangle', 0.18, 0.18, 760);
    }

    wallJump() {
        this.playTone(280, 'square', 0.14, 0.12, 600);
    }

    coin() {
        this.playTone(880, 'sine', 0.08, 0.14);
        setTimeout(() => this.playTone(1318.5, 'sine', 0.16, 0.14), 60);
    }

    emerald() {
        [587.33, 880, 1174.66, 1760].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'triangle', 0.14, 0.15), i * 55);
        });
    }

    checkpoint() {
        [440, 659.25, 880].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'triangle', 0.18, 0.18), i * 70);
        });
    }

    teleport() {
        this.playTone(300, 'sine', 0.25, 0.18, 1200);
        setTimeout(() => this.playTone(900, 'triangle', 0.18, 0.14, 420), 80);
    }

    crumble() {
        this.playTone(130, 'sawtooth', 0.14, 0.12, 65);
    }

    buy() {
        [523.25, 659.25, 1046.5].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'sine', 0.15, 0.2), i * 65);
        });
    }

    blockHit() {
        this.playTone(160, 'square', 0.1, 0.18, 90);
    }

    powerUpSpawn() {
        [330, 392, 659, 523, 587, 784].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'triangle', 0.09, 0.14), i * 45);
        });
    }

    powerUpCollect() {
        [440, 554, 659, 880, 1108, 1318].forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'sine', 0.12, 0.18), i * 50);
        });
    }

    fireball() {
        this.playTone(620, 'sawtooth', 0.14, 0.14, 140);
    }

    stomp() {
        this.playTone(300, 'triangle', 0.15, 0.2, 80);
        setTimeout(() => this.playTone(520, 'sine', 0.12, 0.15, 720), 50);
    }

    hurt() {
        this.playTone(190, 'sawtooth', 0.28, 0.22, 65);
    }

    bossHit() {
        this.playTone(140, 'sawtooth', 0.22, 0.25, 55);
        setTimeout(() => this.playTone(420, 'square', 0.12, 0.15, 180), 40);
    }

    bossRoar() {
        this.playTone(95, 'sawtooth', 0.65, 0.26, 38);
    }

    victory() {
        const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
        notes.forEach((f, i) => {
            setTimeout(() => this.playTone(f, 'triangle', 0.22, 0.2), i * 110);
        });
    }

    startBGM(isBoss = false) {
        this.currentIsBoss = isBoss;
        this.stopBGM();
        if (this.musicMuted) return;
        const normalScale = [110, 130.81, 164.81, 196.00, 220, 196.00, 164.81, 146.83];
        const bossScale = [98, 116.54, 146.83, 155.56, 196, 155.56, 146.83, 130.81];
        const scale = isBoss ? bossScale : normalScale;
        const tempo = isBoss ? 190 : 250;

        this.bgmInterval = setInterval(() => {
            if (this.musicMuted || !this.ctx || document.hidden) return;
            const note = scale[this.bgmStep % scale.length];
            this.playRawTone(note, 'triangle', 0.24, 0.045);
            if (this.bgmStep % 4 === 0) {
                this.playRawTone(note * 0.5, 'sine', 0.45, 0.06);
            }
            this.bgmStep++;
        }, tempo);
    }

    stopBGM() {
        if (this.bgmInterval) {
            clearInterval(this.bgmInterval);
            this.bgmInterval = null;
        }
    }
}

window.sfx = new SoundManager();

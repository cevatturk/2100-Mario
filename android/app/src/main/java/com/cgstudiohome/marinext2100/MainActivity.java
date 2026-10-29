package com.cgstudiohome.marinext2100;

import android.app.backup.BackupManager;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import androidx.core.content.FileProvider;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;
import com.google.android.gms.games.GamesSignInClient;
import com.google.android.gms.games.PlayGames;
import com.google.android.gms.games.PlayGamesSdk;
import com.google.android.gms.games.SnapshotsClient;
import com.google.android.gms.games.snapshot.Snapshot;
import com.google.android.gms.games.snapshot.SnapshotMetadataChange;
import org.json.JSONObject;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.nio.charset.StandardCharsets;

public class MainActivity extends BridgeActivity {
    private static final String PREFS_NAME = "Marinext2100CloudPrefs";
    private static final String KEY_SAVE_PAYLOAD = "save_payload_v3";
    private static final String KEY_SAVE_TIME = "save_timestamp";
    private static final String KEY_PG_NAME = "play_games_display_name";
    private static final String KEY_PG_ID = "play_games_player_id";
    private static final String SNAPSHOT_NAME = "marinext_2100_cloud_save_v1";
    private static final String LOCAL_FILE_NAME = "marinext2100_cloud_save.json";

    private volatile boolean isPlayGamesAuthenticated = false;
    private volatile boolean isPlayGamesInitialized = false;
    private volatile String cachedPlayerName = "";
    private volatile String cachedPlayerId = "";

    static {
        try {
            final Thread.UncaughtExceptionHandler defaultHandler = Thread.getDefaultUncaughtExceptionHandler();
            Thread.setDefaultUncaughtExceptionHandler((thread, throwable) -> {
                try {
                    String threadName = thread != null ? thread.getName() : "";
                    String msg = throwable != null && throwable.getMessage() != null ? throwable.getMessage() : "";
                    // Prevent background plugin / SDK threads (CapacitorPlugins, AdMob, PlayGames, GmsCore) from force-closing the game
                    if (!"main".equalsIgnoreCase(threadName)
                        || msg.contains("MobileAds")
                        || msg.contains("PlayGames")
                        || msg.contains("Games")) {
                        return;
                    }
                    if (defaultHandler != null) {
                        defaultHandler.uncaughtException(thread, throwable);
                    }
                } catch (Throwable ignored) {
                }
            });
        } catch (Throwable ignored) {
        }
    }

    private void ensurePlayGamesInitialized() {
        if (isPlayGamesInitialized) return;
        try {
            PlayGamesSdk.initialize(getApplicationContext());
            isPlayGamesInitialized = true;
        } catch (Throwable ignored) {
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        try {
            setTheme(R.style.AppTheme_NoActionBar);
        } catch (Throwable ignored) {
        }
        super.onCreate(savedInstanceState);
        enableImmersiveFullscreen();

        try {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            cachedPlayerName = prefs.getString(KEY_PG_NAME, "");
            cachedPlayerId = prefs.getString(KEY_PG_ID, "");
        } catch (Throwable ignored) {
        }

        try {
            if (getBridge() != null && getBridge().getWebView() != null) {
                WebView webView = getBridge().getWebView();
                webView.addJavascriptInterface(new MarinextCloudBridge(), "MarinextCloudBridge");
                webView.postDelayed(() -> {
                    ensurePlayGamesInitialized();
                    checkPlayGamesSilentAuth();
                }, 2500);
            }
        } catch (Throwable ignored) {
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            enableImmersiveFullscreen();
        }
    }

    private void enableImmersiveFullscreen() {
        try {
            Window window = getWindow();
            if (window == null) return;
            View decorView = window.getDecorView();
            WindowCompat.setDecorFitsSystemWindows(window, false);
            WindowInsetsControllerCompat controller = WindowCompat.getInsetsController(window, decorView);
            if (controller != null) {
                controller.hide(WindowInsetsCompat.Type.systemBars());
                controller.setSystemBarsBehavior(
                    WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                );
            }
        } catch (Throwable ignored) {
        }
    }

    private void checkPlayGamesSilentAuth() {
        try {
            ensurePlayGamesInitialized();
            GamesSignInClient signInClient = PlayGames.getGamesSignInClient(this);
            signInClient.isAuthenticated().addOnCompleteListener(task -> {
                boolean authed = task.isSuccessful() && task.getResult() != null && task.getResult().isAuthenticated();
                isPlayGamesAuthenticated = authed;
                if (authed) {
                    fetchPlayerProfileAndCloudSave();
                } else {
                    notifyJsAuthStatus(false, cachedPlayerName, cachedPlayerId, "Google Drive Auto-Backup Aktif");
                }
            });
        } catch (Throwable ignored) {
        }
    }

    private void fetchPlayerProfileAndCloudSave() {
        try {
            PlayGames.getPlayersClient(this).getCurrentPlayer().addOnCompleteListener(playerTask -> {
                if (playerTask.isSuccessful() && playerTask.getResult() != null) {
                    cachedPlayerName = playerTask.getResult().getDisplayName();
                    cachedPlayerId = playerTask.getResult().getPlayerId();
                    try {
                        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                        prefs.edit()
                            .putString(KEY_PG_NAME, cachedPlayerName)
                            .putString(KEY_PG_ID, cachedPlayerId)
                            .apply();
                    } catch (Throwable ignored) {
                    }
                    notifyJsAuthStatus(true, cachedPlayerName, cachedPlayerId, "Google Play Games & GDrive Bağlı");
                } else {
                    notifyJsAuthStatus(true, cachedPlayerName, cachedPlayerId, "Google Play Games Bağlı");
                }
                pullCloudSnapshotInternal();
            });
        } catch (Throwable ignored) {
        }
    }

    private void pullCloudSnapshotInternal() {
        try {
            SnapshotsClient snapshotsClient = PlayGames.getSnapshotsClient(this);
            snapshotsClient.open(SNAPSHOT_NAME, true, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        SnapshotsClient.DataOrConflict<Snapshot> dataOrConflict = task.getResult();
                        Snapshot snapshot = dataOrConflict.getData();
                        if (snapshot != null) {
                            try {
                                byte[] bytes = snapshot.getSnapshotContents().readFully();
                                snapshotsClient.discardAndClose(snapshot);
                                if (bytes != null && bytes.length > 2) {
                                    String cloudJson = new String(bytes, StandardCharsets.UTF_8);
                                    writeLocalBackupInternal(cloudJson);
                                    notifyJsCloudSnapshotLoaded(cloudJson, "Google Play Games (GDrive)");
                                }
                            } catch (Throwable ignored) {
                            }
                        }
                    }
                });
        } catch (Throwable ignored) {
        }
    }

    private void pushCloudSnapshotInternal(final String jsonPayload, final String desc) {
        if (!isPlayGamesAuthenticated || jsonPayload == null || jsonPayload.isEmpty()) {
            return;
        }
        try {
            SnapshotsClient snapshotsClient = PlayGames.getSnapshotsClient(this);
            snapshotsClient.open(SNAPSHOT_NAME, true, SnapshotsClient.RESOLUTION_POLICY_MOST_RECENTLY_MODIFIED)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        Snapshot snapshot = task.getResult().getData();
                        if (snapshot != null) {
                            try {
                                snapshot.getSnapshotContents().writeBytes(jsonPayload.getBytes(StandardCharsets.UTF_8));
                                SnapshotMetadataChange metadataChange = new SnapshotMetadataChange.Builder()
                                    .setDescription(desc != null ? desc : "Marinext 2100 Cloud Save")
                                    .build();
                                snapshotsClient.commitAndClose(snapshot, metadataChange);
                            } catch (Throwable ignored) {
                            }
                        }
                    }
                });
        } catch (Throwable ignored) {
        }
    }

    private void writeLocalBackupInternal(String jsonPayload) {
        if (jsonPayload == null || jsonPayload.isEmpty()) return;
        try {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            prefs.edit()
                .putString(KEY_SAVE_PAYLOAD, jsonPayload)
                .putLong(KEY_SAVE_TIME, System.currentTimeMillis())
                .apply();
        } catch (Throwable ignored) {
        }
        try {
            File file = new File(getFilesDir(), LOCAL_FILE_NAME);
            try (FileOutputStream fos = new FileOutputStream(file, false)) {
                fos.write(jsonPayload.getBytes(StandardCharsets.UTF_8));
                fos.flush();
            }
        } catch (Throwable ignored) {
        }
        try {
            BackupManager.dataChanged(getPackageName());
        } catch (Throwable ignored) {
        }
    }

    private String readLocalBackupInternal() {
        try {
            SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
            String saved = prefs.getString(KEY_SAVE_PAYLOAD, "");
            if (saved != null && saved.length() > 2) {
                return saved;
            }
        } catch (Throwable ignored) {
        }
        try {
            File file = new File(getFilesDir(), LOCAL_FILE_NAME);
            if (file.exists() && file.length() > 2) {
                try (FileInputStream fis = new FileInputStream(file);
                     ByteArrayOutputStream bos = new ByteArrayOutputStream()) {
                    byte[] buf = new byte[4096];
                    int read;
                    while ((read = fis.read(buf)) != -1) {
                        bos.write(buf, 0, read);
                    }
                    return new String(bos.toByteArray(), StandardCharsets.UTF_8);
                }
            }
        } catch (Throwable ignored) {
        }
        return "";
    }

    private void notifyJsAuthStatus(final boolean authed, final String playerName, final String playerId, final String statusMsg) {
        runOnUiThread(() -> {
            try {
                if (getBridge() != null && getBridge().getWebView() != null) {
                    String safeName = JSONObject.quote(playerName != null ? playerName : "");
                    String safeId = JSONObject.quote(playerId != null ? playerId : "");
                    String safeMsg = JSONObject.quote(statusMsg != null ? statusMsg : "");
                    String js = "if(window.onMarinextPlayGamesAuth){window.onMarinextPlayGamesAuth("
                        + authed + "," + safeName + "," + safeId + "," + safeMsg + ");}";
                    getBridge().getWebView().evaluateJavascript(js, null);
                }
            } catch (Throwable ignored) {
            }
        });
    }

    private void notifyJsCloudSnapshotLoaded(final String jsonPayload, final String sourceLabel) {
        runOnUiThread(() -> {
            try {
                if (getBridge() != null && getBridge().getWebView() != null) {
                    String safeJson = JSONObject.quote(jsonPayload != null ? jsonPayload : "");
                    String safeSource = JSONObject.quote(sourceLabel != null ? sourceLabel : "Cloud");
                    String js = "if(window.onMarinextCloudSnapshotLoaded){window.onMarinextCloudSnapshotLoaded("
                        + safeJson + "," + safeSource + ");}";
                    getBridge().getWebView().evaluateJavascript(js, null);
                }
            } catch (Throwable ignored) {
            }
        });
    }

    public class MarinextCloudBridge {
        @JavascriptInterface
        public void saveLocalBackup(String jsonPayload) {
            writeLocalBackupInternal(jsonPayload);
        }

        @JavascriptInterface
        public String loadLocalBackup() {
            return readLocalBackupInternal();
        }

        @JavascriptInterface
        public void clearLocalBackup() {
            try {
                SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                prefs.edit().remove(KEY_SAVE_PAYLOAD).remove(KEY_SAVE_TIME).apply();
            } catch (Throwable ignored) {
            }
            try {
                File file = new File(getFilesDir(), LOCAL_FILE_NAME);
                if (file.exists()) {
                    //noinspection ResultOfMethodCallIgnored
                    file.delete();
                }
            } catch (Throwable ignored) {
            }
            try {
                BackupManager.dataChanged(getPackageName());
            } catch (Throwable ignored) {
            }
        }

        @JavascriptInterface
        public void signInPlayGames(final boolean interactive) {
            runOnUiThread(() -> {
                try {
                    ensurePlayGamesInitialized();
                    GamesSignInClient signInClient = PlayGames.getGamesSignInClient(MainActivity.this);
                    if (interactive) {
                        signInClient.signIn().addOnCompleteListener(task -> {
                            boolean authed = task.isSuccessful() && task.getResult() != null && task.getResult().isAuthenticated();
                            isPlayGamesAuthenticated = authed;
                            if (authed) {
                                fetchPlayerProfileAndCloudSave();
                            } else {
                                notifyJsAuthStatus(false, cachedPlayerName, cachedPlayerId, "Google Drive Sistem Yedeği Aktif");
                            }
                        });
                    } else {
                        checkPlayGamesSilentAuth();
                    }
                } catch (Throwable t) {
                    notifyJsAuthStatus(false, cachedPlayerName, cachedPlayerId, "Google Drive Sistem Yedeği Aktif");
                }
            });
        }

        @JavascriptInterface
        public void saveCloudSnapshot(final String jsonPayload, final String description) {
            writeLocalBackupInternal(jsonPayload);
            runOnUiThread(() -> pushCloudSnapshotInternal(jsonPayload, description));
        }

        @JavascriptInterface
        public void loadCloudSnapshot() {
            runOnUiThread(() -> {
                String localBackup = readLocalBackupInternal();
                if (localBackup != null && localBackup.length() > 2) {
                    notifyJsCloudSnapshotLoaded(localBackup, "Android Google Drive Auto-Backup");
                }
                if (isPlayGamesAuthenticated) {
                    pullCloudSnapshotInternal();
                } else {
                    signInPlayGames(true);
                }
            });
        }

        @JavascriptInterface
        public void shareBackupToDrive(final String jsonPayload) {
            runOnUiThread(() -> {
                try {
                    File backupFile = new File(getCacheDir(), "Marinext-2100-GoogleDrive-Yedek.json");
                    try (FileOutputStream fos = new FileOutputStream(backupFile, false)) {
                        fos.write(jsonPayload.getBytes(StandardCharsets.UTF_8));
                        fos.flush();
                    }
                    Uri contentUri = FileProvider.getUriForFile(
                        MainActivity.this,
                        getPackageName() + ".fileprovider",
                        backupFile
                    );
                    Intent shareIntent = new Intent(Intent.ACTION_SEND);
                    shareIntent.setType("application/json");
                    shareIntent.putExtra(Intent.EXTRA_SUBJECT, "Marinext 2100 - Google Drive Bulut Yedeği");
                    shareIntent.putExtra(Intent.EXTRA_TEXT, "Marinext 2100 Oyun İlerleme Yedeği (Google Drive'a kaydedebilir veya başka bir cihazda 'Yedekten Geri Yükle' ile açabilirsiniz).");
                    shareIntent.putExtra(Intent.EXTRA_STREAM, contentUri);
                    shareIntent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
                    startActivity(Intent.createChooser(shareIntent, "Google Drive'a Kaydet / Yedeği Paylaş"));
                } catch (Throwable ignored) {
                }
            });
        }

        @JavascriptInterface
        public String getAuthStatusJson() {
            try {
                JSONObject obj = new JSONObject();
                obj.put("authenticated", isPlayGamesAuthenticated);
                obj.put("playerName", cachedPlayerName != null ? cachedPlayerName : "");
                obj.put("playerId", cachedPlayerId != null ? cachedPlayerId : "");
                SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                obj.put("lastBackupTime", prefs.getLong(KEY_SAVE_TIME, 0L));
                return obj.toString();
            } catch (Throwable t) {
                return "{\"authenticated\":false}";
            }
        }

        @JavascriptInterface
        public String getAppVersionInfo() {
            try {
                android.content.pm.PackageInfo pInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
                int vCode = android.os.Build.VERSION.SDK_INT >= 28 ? (int) pInfo.getLongVersionCode() : pInfo.versionCode;
                JSONObject obj = new JSONObject();
                obj.put("versionCode", vCode);
                obj.put("versionName", pInfo.versionName != null ? pInfo.versionName : "1.1.6");
                return obj.toString();
            } catch (Throwable t) {
                return "{\"versionCode\":10,\"versionName\":\"1.1.6\"}";
            }
        }

        @JavascriptInterface
        public void openPlayStoreUpdate() {
            runOnUiThread(() -> {
                try {
                    Intent marketIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + getPackageName()));
                    marketIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(marketIntent);
                } catch (Throwable e) {
                    try {
                        Intent webIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + getPackageName()));
                        webIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(webIntent);
                    } catch (Throwable ignored) {
                    }
                }
            });
        }

        @JavascriptInterface
        public void openPlayStoreFeedback(final String summaryText) {
            runOnUiThread(() -> {
                try {
                    if (summaryText != null && !summaryText.isEmpty()) {
                        android.content.ClipboardManager clipboard = (android.content.ClipboardManager) getSystemService(Context.CLIPBOARD_SERVICE);
                        if (clipboard != null) {
                            android.content.ClipData clip = android.content.ClipData.newPlainText("Marinext 2100 Geri Bildirim", summaryText);
                            clipboard.setPrimaryClip(clip);
                        }
                        android.widget.Toast.makeText(
                            MainActivity.this,
                            "Mesajınız panoya kopyalandı! Play Store geri bildirim alanına yapıştırabilirsiniz.",
                            android.widget.Toast.LENGTH_LONG
                        ).show();
                    }
                    Intent marketIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=" + getPackageName()));
                    marketIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(marketIntent);
                } catch (Throwable e) {
                    try {
                        Intent webIntent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://play.google.com/store/apps/details?id=" + getPackageName()));
                        webIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                        startActivity(webIntent);
                    } catch (Throwable ignored) {
                    }
                }
            });
        }

        @JavascriptInterface
        public void submitDirectFeedback(final String payloadJson) {
            runOnUiThread(() -> {
                try {
                    SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                    prefs.edit().putString("last_feedback_payload", payloadJson).apply();
                    JSONObject obj = new JSONObject(payloadJson);
                    String subject = "Marinext 2100 Geri Bildirim [" + obj.optString("category", "Genel") + "] - " + obj.optInt("rating", 5) + " Yıldız";
                    String body = "Kategori: " + obj.optString("category", "Genel")
                        + "\nPuan: " + obj.optInt("rating", 5) + "/5"
                        + "\nBölüm: " + obj.optInt("level", 1)
                        + "\nFPS Modu: " + obj.optInt("fpsMode", 120)
                        + "\nSürüm: " + obj.optString("version", "1.1.5")
                        + "\n\nMesaj:\n" + obj.optString("message", "");
                    Intent emailIntent = new Intent(Intent.ACTION_SENDTO);
                    emailIntent.setData(Uri.parse("mailto:cgstudiohome@gmail.com"));
                    emailIntent.putExtra(Intent.EXTRA_SUBJECT, subject);
                    emailIntent.putExtra(Intent.EXTRA_TEXT, body);
                    emailIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(Intent.createChooser(emailIntent, "Geliştiriciye Geri Bildirim Gönder"));
                } catch (Throwable ignored) {
                }
            });
        }

        @JavascriptInterface
        public void submitLeaderboardScores(final long totalScore, final int maxLevel, final int emeralds, final long bestSpeedMs) {
            runOnUiThread(() -> {
                try {
                    SharedPreferences prefs = getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
                    prefs.edit()
                        .putLong("lb_total_score", totalScore)
                        .putInt("lb_max_level", maxLevel)
                        .putInt("lb_emeralds", emeralds)
                        .putLong("lb_best_speed_ms", bestSpeedMs)
                        .apply();
                } catch (Throwable ignored) {
                }
            });
        }

        @JavascriptInterface
        public void showPlayGamesLeaderboards(final String category) {
            runOnUiThread(() -> {
                try {
                    ensurePlayGamesInitialized();
                    PlayGames.getLeaderboardsClient(MainActivity.this)
                        .getAllLeaderboardsIntent()
                        .addOnSuccessListener(intent -> {
                            try {
                                startActivityForResult(intent, 9004);
                            } catch (Throwable ignored) {
                            }
                        })
                        .addOnFailureListener(err -> {
                            try {
                                signInPlayGames(true);
                                android.widget.Toast.makeText(
                                    MainActivity.this,
                                    "Google Play Games bağlantısı güncelleniyor...",
                                    android.widget.Toast.LENGTH_SHORT
                                ).show();
                            } catch (Throwable ignored) {
                            }
                        });
                } catch (Throwable ignored) {
                }
            });
        }
    }
}

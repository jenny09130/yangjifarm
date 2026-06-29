# 養肌農場一鍵更新流程

## 第一次設定

### GitHub Pages

1. 到 GitHub repository：`jenny09130/yangjifarm`
2. 進入 `Settings` -> `Pages`
3. `Build and deployment` 的 `Source` 選 `GitHub Actions`
4. 儲存後，之後只要推送到 `main`，`.github/workflows/deploy-pages.yml` 會自動發布 `yangji-farm-app`

GitHub Pages 網址通常會是：

```text
https://jenny09130.github.io/yangjifarm/
```

### Netlify

1. 在 Netlify 選 `Add new site` -> `Import an existing project`
2. 連到 GitHub repository：`jenny09130/yangjifarm`
3. Build command 留空
4. Publish directory 使用 `yangji-farm-app`
5. 部署後，之後只要推送到 `main`，Netlify 會自動更新

本專案已加入 `netlify.toml`，Netlify 會自動讀取發布目錄與快取設定。

## 每次改版後

在 PowerShell 執行：

```powershell
cd "D:\Open ai codex\養肌農場"
.\scripts\publish-update.ps1 -Message "Update Yangji Farm app"
```

這個腳本會做四件事：

1. 更新 `service-worker.js` 的快取版本，避免手機 PWA 卡住舊版
2. 同步 `yangji-farm-app` 到 `deploy\yangji-farm-app`，保留手動部署備份
3. commit app 與部署設定
4. push 到 GitHub，觸發 GitHub Pages / Netlify 自動部署

如果只想先建立本機 commit，不要推送：

```powershell
.\scripts\publish-update.ps1 -Message "Update Yangji Farm app" -NoPush
```

## 手機端如何看到更新

已安裝到手機主畫面的 PWA 會在重新開啟時檢查新版。新版 service worker 接管後，app 會自動重新載入一次。

若手機仍看到舊版：

1. 關掉主畫面 app 後重新打開
2. 用手機瀏覽器直接開部署網址並重新整理
3. 若仍卡住，移除主畫面 app 後重新安裝

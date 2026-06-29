param(
  [string]$Message = "Update Yangji Farm app",
  [switch]$NoPush
)

$ErrorActionPreference = "Stop"
$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$AppDir = Join-Path $Root "yangji-farm-app"
$DeployDir = Join-Path $Root "deploy\yangji-farm-app"
$ServiceWorkerPath = Join-Path $AppDir "service-worker.js"
$Version = Get-Date -Format "yyyyMMddHHmmss"

if (-not (Test-Path $AppDir)) {
  throw "App directory not found: $AppDir"
}

$ServiceWorker = Get-Content -LiteralPath $ServiceWorkerPath -Raw -Encoding UTF8
$ServiceWorker = $ServiceWorker -replace 'const CACHE_NAME = "yangji-farm-v[^"]+";', "const CACHE_NAME = `"yangji-farm-v$Version`";"
Set-Content -LiteralPath $ServiceWorkerPath -Value $ServiceWorker -Encoding UTF8

if (Test-Path $DeployDir) {
  Get-ChildItem -LiteralPath $DeployDir -Force | Remove-Item -Recurse -Force
} else {
  New-Item -ItemType Directory -Path $DeployDir | Out-Null
}

$LocalOnlyFiles = @("server.err.log", "server.out.log", "server.pid")
Get-ChildItem -LiteralPath $AppDir -Force |
  Where-Object { $LocalOnlyFiles -notcontains $_.Name } |
  Copy-Item -Destination $DeployDir -Recurse -Force

git add .gitignore UPDATE_WORKFLOW.md index.html netlify.toml .github/workflows/deploy-pages.yml scripts/publish-update.ps1 yangji-farm-app deploy/yangji-farm-app

$Pending = git diff --cached --name-only
if (-not $Pending) {
  Write-Host "No app updates to commit."
  exit 0
}

git commit -m $Message

if ($NoPush) {
  Write-Host "Created a local commit. Skipped push because -NoPush was used."
} else {
  git push origin main
  Write-Host "Pushed to GitHub. GitHub Pages or Netlify auto-deploy can now update the live app."
}

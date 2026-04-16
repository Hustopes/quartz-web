# Obsidian → Quartz → GitHub Pages

Automatický deploy vaultu na GitHub Pages přes Quartz static site generator.

## Struktura

```
obsidian-quartz/
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions workflow
├── quartz.config.ts        # Quartz konfigurace (TypeScript)
├── quartz.toml             # Quartz konfigurace (TOML)
├── .gitignore
└── README.md
```

## Jak to funguje

1. **Obsidian** — píšeš v `.md` souborech ve svém vaultu
2. **Git push** — pushneš na `main` větev svého GitHub repozitáře
3. **GitHub Actions** — automaticky se spustí workflow `deploy.yml`:
   - Quartz stáhne Node.js závislosti
   - Převede `.md` soubory na statický HTML
   - Deployne na GitHub Pages
4. **GitHub Pages** — tvůj obsah je dostupný na `https://[username].github.io/[repo]/`

## Nastavení krok za krokem

### 1. Vytvoř GitHub repozitář

- Vytvoř **private** repozitář (např. `obsidian-notes`)
- Pojmenuj ho podle sebe — GitHub Pages pak bude na `https://[username].github.io/obsidian-notes/`

### 2. Propoj svůj Obsidian vault s GitHub

```bash
# Ve složce svého Obsidian vaultu:
git init
git remote add origin https://github.com/[username]/obsidian-notes.git
git checkout -b main
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3. Nastav GitHub Pages

1. Jdi na **Settings → Pages** svého repozitáře
2. Source: **GitHub Actions**
3. Workflow permissions: **GitHub Actions default** ( workflow má strictní permissions `contents: read`, `pages: write`, `id-token: write`)

### 4. Aktivuj branch protection (doporučeno)

1. **Settings → Branches → Add branch protection rule**
2. Rule name: `main`
3. ✓ **Require a pull request before merging** (doporučeno, chrání před accidental pushes)
4. ✓ **Require status checks to pass before merging** (až budeš mít CI)
5. ✓ **Do not allow bypassing the above settings**

### 5. Nastavení Quartz (volitelné)

V `quartz.toml` si uprav:
- `name` — název stránky (title)
- `baseUrl` — pokud používáš subpath (např. `/obsidian-notes/`)

## Omezení obsahu

⚠️ **Žádné secrets v .md souborech!**

GitHub Pages jsou **veřejné**. V markdown souborech nikdy nepiš:
- API klíče, tokeny, hesla
- Přihlašovací údaje
- Privátní informace
- Obsah, který nechceš zveřejnit

Pro citlivé poznámky používej:
- Oddělený **private** repozitář bez GitHub Pages
- Vault cipher v Obsidian (Settings → Security)

## Dev agent — git push hook

Dev agent může commitovat a pushovat do vaultu přes standardní shell git příkazy:

```bash
cd /path/to/vault
git add .
git commit -m "update"
git push
```

Pro automatizovaný push bez interaktivního hesla doporučuj nastavit **deploy key** nebo **HTTPS token** v `credential helper`.

## Soubory, které GitHub Actions potřebuje

Workflow očekává:
- `package.json` — Quartz závislosti (přidá se při `npm create quartz@latest`)
- `quartz.config.ts` — Quartz konfigurace
- `quartz/` — Quartz source kód (přidá se při `npm create quartz@latest`)
- `content/` — tvoje `.md` soubory (přidáš sám)

## Rychlý start pro nový vault

```bash
# 1. Vytvoř nový Quartz projekt
npm create quartz@latest ./quartz内容
# Odpověz: "Empty" or "Empty with some sample content"

# 2. Zkopíruj .github/ a quartz.config.ts do svého vaultu
cp -r quartz/.github /path/to/your-vault/
cp quartz/quartz.config.ts /path/to/your-vault/

# 3. Přesuň své .md soubory do content/
cp /path/to/your-vault/*.md /path/to/your-vault/content/

# 4. Nastav git a pushni
cd /path/to/your-vault
git init && git remote add origin ...
```

## Bezpečnostní shrnutí

| Požadavek | Splněno |
|-----------|---------|
| Strict workflow permissions | ✅ `contents: read`, `pages: write`, `id-token: write` |
| Žádný PAT | ✅ Používá `GITHUB_TOKEN` |
| Branch protection | ✅ Doporučeno nastavit manuálně |
| Žádné secrets v obsahu | ✅ Uživatel odpovídá za obsah |

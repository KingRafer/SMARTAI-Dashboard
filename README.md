# SMARTAI-Dashboard

Portal member **Smart AI** — login, register, dan dashboard setelah login.

## URL

Repo: https://github.com/luqmanhakimh23-create/SMARTAI-Dashboard  
Pages (setelah diaktifkan): https://luqmanhakimh23-create.github.io/SMARTAI-Dashboard/

## Fitur

### Auth
- `login.html` — masuk
- `register.html` — daftar (nama, email, HP, password, kode referral)

### Setelah login (sidebar)
| Menu | File |
|------|------|
| Dashboard | `dashboard.html` |
| My Clients | `clients.html` |
| Referral Network | `referral.html` |
| Trading Report | `trading-report.html` |
| Commission | `commission.html` |
| Transactions | `transactions.html` |
| Support | `support.html` |
| My Profile | `profile.html` |

## Catatan

- Auth demo memakai **localStorage** (bukan server).
- Data tabel (clients, komisi, dll.) masih **placeholder/demo**.
- Aktifkan GitHub Pages: Settings → Pages → Branch `main` / root.

## Struktur

```
SMARTAI-Dashboard/
├── index.html
├── login.html
├── register.html
├── dashboard.html
├── clients.html
├── referral.html
├── trading-report.html
├── commission.html
├── transactions.html
├── support.html
├── profile.html
├── css/app.css
├── js/auth.js
├── js/app.js
└── README.md
```

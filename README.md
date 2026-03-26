# ARKA — Portofolio Graphic Designer

Portofolio desainer grafis dengan dukungan **PWA (Progressive Web App)** — bisa diakses offline setelah dibuka sekali saat online.

---

## 🗂️ Struktur Folder

```
portfolio/
├── index.html              ← Halaman utama
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline support)
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   ├── img/
│   │   ├── instagramposmockt.jpg
│   │   ├── favicon.svg
│   │   ├── icon-192.svg
│   │   └── icon-512.svg
│   └── video/
│       └── 21-2_psu.mp4
└── README.md
```

---

## 🚀 Deploy ke GitHub Pages (Step by Step)

### 1. Buat Repository GitHub
1. Buka [github.com](https://github.com) → Login
2. Klik tombol **"New"** (repository baru)
3. Nama repository: `portofolio` (atau nama bebas)
4. Set **Public** ✅
5. Klik **"Create repository"**

### 2. Upload File
**Cara A — via Browser (tanpa install apapun):**
1. Di halaman repository, klik **"uploading an existing file"**
2. Drag & drop **semua file dan folder** dari folder `portfolio/` ini
3. Klik **"Commit changes"**

**Cara B — via Git (lebih cepat untuk update):**
```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/USERNAME/portofolio.git
git push -u origin main
```

### 3. Aktifkan GitHub Pages
1. Di repository → klik **Settings**
2. Sidebar kiri → klik **Pages**
3. Source: pilih **"Deploy from a branch"**
4. Branch: pilih **main** → folder **/ (root)**
5. Klik **Save**
6. Tunggu 1-2 menit → URL akan muncul:
   ```
   https://USERNAME.github.io/portofolio/
   ```

---

## 📱 Fitur PWA (Offline)

Setelah pengunjung membuka website sekali saat online:
- ✅ Semua halaman, gambar, dan video tersimpan di cache browser
- ✅ Bisa dibuka tanpa internet
- ✅ Di Android/Chrome: muncul prompt **"Install App"**
- ✅ Di iOS/Safari: bisa **"Add to Home Screen"**

---

## ✏️ Cara Update Konten

| Yang ingin diubah | Edit file |
|---|---|
| Nama, bio, kontak | `index.html` |
| Warna, font, layout | `assets/css/style.css` |
| Animasi, interaksi | `assets/js/main.js` |
| Ganti gambar | Ganti file di `assets/img/` |
| Ganti video | Ganti file di `assets/video/` |

Setelah update, cache akan otomatis refresh karena versi cache di `sw.js` berubah. Untuk memaksa refresh, ubah nilai `CACHE` di `sw.js`:
```js
const CACHE = 'arka-portfolio-v2'; // increment versi
```

---

## 🌐 Custom Domain (Opsional)

Ingin pakai domain sendiri seperti `arkapratama.com`?
1. Beli domain di Niagahoster / Domainesia
2. Di GitHub Pages Settings → masukkan custom domain
3. Di DNS provider → tambahkan CNAME record ke `USERNAME.github.io`

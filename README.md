# DemoFrontEnd

![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite 6](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![GSAP 3](https://img.shields.io/badge/GSAP-3-0AE448?style=for-the-badge&logo=greensock&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-Custom_Properties-663399?style=for-the-badge&logo=css&logoColor=white)
![Vitest 3](https://img.shields.io/badge/Vitest-3-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-16-E33332?style=for-the-badge&logo=testinglibrary&logoColor=white)
![Lisensi MIT](https://img.shields.io/badge/Lisensi-MIT-blue?style=for-the-badge)

DemoFrontEnd adalah demo teknik front-end berupa satu halaman web dengan sepuluh template. Setiap template mengubah warna, huruf, dan bentuk halaman, sekaligus cara halaman bergerak: kemunculan konten saat digulir, tampilan judul, dan pembukaan teks pop-up.

Seluruh teks di halaman merupakan konten contoh. Halaman ini tidak memuat klaim tentang produk, klien, atau metrik, dan semua tautan contoh memakai domain `.example`.

## Daftar isi

- [Fitur utama](#fitur-utama)
- [Tech stack](#tech-stack)
- [Memulai](#memulai)
- [Template](#template)
- [Arsitektur animasi](#arsitektur-animasi)
- [Aksesibilitas](#aksesibilitas)
- [Struktur proyek](#struktur-proyek)
- [Huruf dan lisensi](#huruf-dan-lisensi)

## Fitur utama

- Sepuluh template dengan palet, tipografi, dan karakter gerak masing-masing.
- Pergantian template tanpa memuat ulang halaman, lewat galeri atau tombol `[` dan `]`.
- Tautan per template melalui parameter `?style=`, misalnya `?style=brutal`. Pilihan terakhir tersimpan di browser.
- Animasi scroll: reveal, parallax, judul bergaya per template, dan kalimat yang menyala kata demi kata.
- Dukungan gerakan dikurangi, baik dari pengaturan sistem operasi maupun saklar di halaman.
- Huruf dibundel bersama aplikasi, tanpa permintaan ke layanan font pihak ketiga.

## Tech stack

| Kategori | Teknologi |
|---|---|
| UI | React 19 |
| Bahasa | TypeScript 5 (mode `strict`) |
| Build tool | Vite 6 |
| Animasi | GSAP 3 dengan ScrollTrigger, CSS keyframes, CSS scroll-driven animations, Intersection Observer |
| Styling | CSS murni dengan custom properties sebagai design token |
| Tipografi | `@fontsource-variable/*` |
| Pengujian | Vitest, Testing Library, jsdom |

## Memulai

Proyek diuji dengan Node.js 24. Aplikasi berjalan tanpa backend dan tanpa variabel lingkungan.

```bash
git clone https://github.com/IlhamFajrii/DemoFrontEnd.git
cd DemoFrontEnd
npm install
npm run dev
```

Server pengembangan tersedia di `http://localhost:5174`.

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server pengembangan di port 5174 |
| `npm test` | Menjalankan 14 test dengan Vitest dan Testing Library |
| `npm run build` | Memeriksa tipe dengan `tsc`, lalu membuat build produksi di `dist/` |
| `npm run preview` | Menyajikan build produksi di `http://localhost:5175` |

Build memakai path aset relatif, sehingga hasilnya juga berfungsi di sub-path seperti GitHub Pages.

## Template

Lumen adalah tampilan awal.

| Template | Mode | Huruf | Animasi scroll | Judul muncul | Teks pop-up |
|---|---|---|---|---|---|
| Lumen (awal) | terang | Inter | naik halus | naik dari garis | kartu mengambang |
| Midnight | gelap | Inter | naik perlahan | naik perlahan | lembar dari bawah |
| Obsidian Glass | gelap | Manrope | fokus dari buram | fokus dari buram | kaca terbuka |
| Editorial | terang | Playfair Display + Inter | tirai naik | tirai naik | lembar surat kabar |
| Neo Brutal | terang | Space Grotesk | menghentak | menghentak miring | stiker melompat |
| Soft Clay | terang | Nunito | memantul | memantul | gelembung kenyal |
| Aurora | gelap | Sora + Inter | melayang bercahaya | melayang bercahaya | kartu bercahaya |
| Swiss Grid | terang | Archivo | geser dari kiri | geser dari kiri | label presisi |
| Botanica | terang | Fraunces + Inter | tumbuh perlahan | tumbuh perlahan | daun terbuka |
| Sunset | terang | Outfit + Inter | terbit | terbit | cahaya hangat |

Neo Brutal dan Soft Clay memakai easing yang memantul sebagai bagian dari karakternya. Delapan template lain memakai kurva yang berhenti halus tanpa overshoot.

## Arsitektur animasi

Semua template berbagi komponen dan keyframe yang sama. Perbedaan gerak berasal dari dua sumber nilai: token di `src/styles/theme.css` dan profil scroll di `src/templates.ts`.

| Efek | Cara kerja |
|---|---|
| Scroll reveal | Blok konten tersembunyi sampai masuk layar, lalu memutar keyframe `rv-in` dengan token `--rv-*` milik template (jarak, blur, pemotongan, durasi, easing, jeda). |
| Judul section | GSAP ScrollTrigger memainkan gerak masuk khas template (`scroll.title`) saat judul tiba di layar. |
| Parallax | Lapisan hero bertanda `data-depth` dan latar halaman bergerak sesuai nilai `scroll.parallax`. Kartu contoh bergeser dengan kecepatan berbeda per kolom lewat CSS scroll-driven animations. |
| Kalimat menyala | Warna setiap kata berpindah dari `--muted` ke `--text` mengikuti posisi gulir. Teksnya tetap teks biasa. |
| Teks pop-up | Tersedia di panel catatan (arahkan kursor, fokus dengan keyboard, atau klik chip) dan di lembar detail contoh. Token `--pop-anim` menentukan cara bukanya, dan setiap baris muncul berurutan. |

Saat template diganti, bagian yang terlihat memutar ulang gerak template baru. Bagian di bawah layar memakai gaya baru ketika digulir ke sana.

## Aksesibilitas

- Jika sistem operasi meminta gerakan dikurangi, atau saklar "Kurangi gerakan" di bagian Template dinyalakan, animasi tidak dibuat. GSAP tidak dijalankan, kelas `motion` tidak dipasang, dan semua konten langsung berada di posisi akhir. Pada pemeriksaan di browser, tidak ada elemen yang tersembunyi dan seluruh kata pada kalimat besar tampil penuh.
- Palet setiap template mengacu pada WCAG AA: rasio kontras 4,5:1 untuk teks dan 3:1 untuk batas kontrol.
- Kalimat yang menyala saat digulir berpindah antara dua warna palet, bukan memudar lewat opasitas, agar tetap terbaca di setiap posisi gulir.
- Judul utama memakai `aria-label` berisi kalimat utuh, chip memakai `aria-pressed`, dan saklar gerakan memakai `role="switch"`.
- Lembar detail memakai elemen `<dialog>`, sehingga tombol Esc dan pengelolaan fokus ditangani browser.
- Tombol dan tautan navigasi memiliki target sentuh minimal 44 px.
- Seleksi teks, `accent-color`, dan scrollbar mengikuti palet template.

## Struktur proyek

```
src/
  App.tsx                   Susunan halaman
  content.ts                Konten contoh
  templates.ts              Sepuluh template: nama, huruf, profil gerak scroll
  types.ts                  Tipe bersama
  components/               Nav, Hero, Statement, Story, Notes, Examples, Templates
  hooks/useScrollMotion.ts  Animasi scroll (GSAP) per template
  hooks/useTheme.ts         Pergantian template, tautan ?style=, pemuat huruf
  hooks/useMotionPref.ts    Preferensi gerakan dikurangi
  lib/words.ts              Utilitas pemecah kata
  styles/theme.css          Palet dan token gerak sepuluh template
  styles/base.css           Tata letak dan komponen
  styles/templates.css      Keyframe gerak dan kulit per template
  test/                     Setup jsdom dan test
```

## Huruf dan lisensi

Kode dirilis di bawah [lisensi MIT](LICENSE).

Semua huruf yang dibundel berlisensi SIL Open Font License 1.1, yang mengizinkan pemakaian dan penyematan secara gratis, termasuk untuk keperluan komersial. Huruf dimuat lewat paket `@fontsource-variable/*`. Inter dimuat sejak awal, sedangkan huruf template lain baru dimuat saat templatenya dipilih. Tidak ada nama font berpemilik di CSS. Teks lisensi tiap huruf tersedia di `node_modules/@fontsource-variable/<nama>/LICENSE`.

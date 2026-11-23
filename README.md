# DemoFrontEnd

DemoFrontEnd adalah satu halaman web yang bisa tampil dalam sepuluh template. Saat template diganti, warna, huruf, dan bentuk ikut berubah, begitu pula cara halaman bergerak: bagaimana konten muncul saat digulir, bagaimana judul tampil, dan bagaimana teks pop-up terbuka. Proyek ini dibuat dengan React 19, TypeScript, Vite, dan GSAP untuk memperlihatkan kemampuan front-end.

Semua teks di halaman ini adalah contoh. Tidak ada klaim tentang produk, klien, atau metrik, dan semua tautan memakai domain `.example`.

Template pertama, Lumen, menjadi tampilan awal. Setiap template punya alamat sendiri lewat parameter `?style=`, misalnya `?style=brutal`, jadi bisa dibagikan satu per satu. Pilihan terakhir juga disimpan di browser.

## Sepuluh template

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

Neo Brutal dan Soft Clay sengaja memakai easing yang memantul karena itu bagian dari karakternya. Delapan template lain memakai kurva yang berhenti halus tanpa overshoot.

## Cara kerja animasi

Gerak tidak ditulis ulang untuk tiap template. Template hanya memberi nilai: token di `src/styles/theme.css` dan profil scroll di `src/templates.ts`. Komponen dan keyframe-nya sama untuk semua.

- Scroll reveal: blok konten tersembunyi sampai masuk layar, lalu memutar keyframe `rv-in` dengan token `--rv-*` milik template (jarak, blur, pemotongan, durasi, easing, jeda).
- Judul section: GSAP ScrollTrigger memainkan gerak masuk khas template begitu judul tiba di layar (`scroll.title`).
- Parallax: lapisan hero yang bertanda `data-depth` dan latar halaman bergerak sejauh nilai `scroll.parallax` template. Kartu contoh bergeser dengan kecepatan berbeda per kolom lewat CSS scroll-driven.
- Kalimat menyala: setiap kata berubah dari redup ke penuh mengikuti posisi gulir. Yang berubah hanya opasitas, jadi teksnya tetap teks biasa.
- Teks pop-up interaktif: ada di panel catatan (arahkan kursor, fokus dengan keyboard, atau klik sebuah chip) dan di lembar detail contoh. Cara bukanya ditentukan token `--pop-anim`, dan setiap baris muncul berurutan.

Jika template diganti di halaman yang sedang terbuka, bagian yang terlihat memutar ulang gerak template barunya tanpa memuat ulang halaman. Bagian yang masih di bawah layar memakai gaya baru ketika digulir ke sana.

## Menjalankan

```bash
npm install
npm run dev        # http://localhost:5174
npm test           # 14 test (Vitest + Testing Library)
npm run build      # tsc + vite build, hasil di dist/
npm run preview    # build produksi di http://localhost:5175
```

Proyek diuji dengan Node.js 24. Tidak ada variabel lingkungan dan tidak ada backend. Tombol `[` dan `]` berpindah ke template sebelum dan sesudahnya.

## Gerakan dikurangi

Jika sistem operasi meminta gerakan dikurangi, atau saklar "Kurangi gerakan" di bagian Template dinyalakan, tidak ada animasi yang dibuat. GSAP tidak dijalankan, kelas `motion` tidak dipasang, dan semua konten langsung berada di posisi akhirnya. Saya memeriksanya di browser: tidak ada elemen yang tersembunyi, dan seluruh kata pada kalimat besar tampil penuh.

## Aksesibilitas

- Warna setiap template dihitung dengan skrip terhadap WCAG AA: rasio 4,5:1 untuk teks dan 3:1 untuk batas kontrol.
- Judul utama memakai `aria-label` berisi kalimat utuh, chip memakai `aria-pressed`, saklar gerakan memakai `role="switch"`, dan lembar detail memakai `<dialog>` sehingga Esc dan pengelolaan fokus ditangani browser.
- Tombol dan tautan navigasi punya target sentuh minimal 44 px. Seleksi teks, `accent-color`, dan scrollbar mengikuti palet template.
- Teks yang menyala saat digulir berpindah antara dua warna palet (`--muted` ke `--text`), bukan memudar lewat opasitas, jadi kontrasnya tetap di atas 4,5:1 di setiap titik gulir.
- Hasil audit otomatis ada di bagian Pengujian: axe-core tidak menemukan pelanggaran di kesepuluh template.

## Huruf dan lisensi

Semua huruf berlisensi SIL Open Font License 1.1, yang mengizinkan pemakaian dan penyematan secara gratis, termasuk untuk keperluan komersial. Huruf dibundel lewat paket `@fontsource-variable/*`, jadi halaman tidak meminta apa pun ke layanan font pihak ketiga. Inter dimuat sejak awal. Huruf template lain baru dimuat saat template itu dipilih. Tidak ada nama font berpemilik di CSS. Teks lisensi tiap huruf ada di `node_modules/@fontsource-variable/<nama>/LICENSE`.

## Struktur

```
src/
  App.tsx                 Susunan halaman
  content.ts              Konten contoh (satu-satunya tempat teks)
  templates.ts            Sepuluh template: nama, huruf, profil gerak scroll
  components/             Nav, Hero, Statement, Story, Notes, Examples, Templates
  hooks/useScrollMotion.ts  Semua animasi scroll (GSAP) per template
  hooks/useTheme.ts       Pergantian template, tautan ?style=, pemuat huruf
  styles/theme.css        Palet dan token gerak sepuluh template
  styles/base.css         Tata letak dan komponen
  styles/templates.css    Keyframe gerak dan kulit per template
  test/                   Setup jsdom dan test
qa/                       Pengujian lintas browser (Playwright + axe-core)
media/                    Rekaman gerak per template
```

## Lisensi

Kode dirilis di bawah lisensi MIT. Teks lengkap dan nama pemegang hak ciptanya ada di berkas `LICENSE`. Huruf yang dibundel punya lisensi sendiri, yaitu SIL Open Font License 1.1 (lihat bagian Huruf dan lisensi di atas).

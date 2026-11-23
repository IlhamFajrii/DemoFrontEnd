// Semua teks di sini adalah CONTOH untuk demo. Ganti sesuai kebutuhan sebelum dipakai sungguhan.

export const BRAND = 'DemoFrontEnd';

export const headline = 'Antarmuka yang terasa hidup.';

export const subline =
  'Satu halaman, sepuluh template. Tiap template punya animasi scroll dan teks pop-up interaktif dengan karakternya sendiri.';

export const statement =
  'Gerak yang baik tidak terasa seperti animasi. Yang terasa adalah sentuhan: pelan, tepat, dan selalu punya alasan.';

export const steps = [
  {
    title: 'Mulai dari maksud',
    text: 'Setiap gerakan menjawab satu pertanyaan: apa yang berubah, dan ke mana mata harus pergi. Kalau tidak ada jawabannya, geraknya dibuang.'
  },
  {
    title: 'Satu karakter untuk semuanya',
    text: 'Kurva dan tempo yang sama di seluruh halaman membuatnya terasa utuh. Setiap template memilih karakternya sendiri, lalu konsisten dengannya.'
  },
  {
    title: 'Hormati pilihan pengguna',
    text: 'Bila pengguna meminta gerakan dikurangi, semua animasi dimatikan dan konten tetap tampil utuh di posisi akhirnya.'
  }
] as const;

export interface Note {
  id: string;
  label: string;
  title: string;
  lines: string[];
}

/** Interactive pop-up text: hover, focus or click a chip and its note opens in the template's own way. */
export const notes: Note[] = [
  { id: 'easing', label: 'Easing', title: 'Satu kurva untuk semuanya', lines: ['Mulai cepat, mendarat pelan. Kurva yang sama dipakai pada setiap elemen supaya gerak terasa satu keluarga.', 'Template yang bersifat main-main boleh memantul sedikit. Yang serius tidak pernah.'] },
  { id: 'stagger', label: 'Stagger', title: 'Jeda yang rapat', lines: ['Elemen dalam satu kelompok muncul berurutan dengan jeda puluhan milidetik, bukan sekaligus.', 'Total jeda dijaga di bawah setengah detik agar halaman tidak terasa lambat.'] },
  { id: 'parallax', label: 'Parallax', title: 'Kedalaman dari kecepatan', lines: ['Lapisan depan menempuh jarak lebih jauh daripada latar saat halaman digulir.', 'Jarak tempuhnya berbeda di tiap template: tenang di Swiss Grid, lebar di Aurora.'] },
  { id: 'scroll', label: 'Scroll', title: 'Gerak yang mengikuti jari', lines: ['Judul bagian masuk sekali ketika tiba di layar, dengan gaya yang ditentukan templatenya.', 'Kalimat besar menyala kata demi kata sesuai posisi gulir.'] },
  { id: 'popup', label: 'Pop-up', title: 'Teks yang terbuka', lines: ['Panel ini sendiri adalah contohnya. Pindah template lalu arahkan kursor ke chip lain untuk melihat cara bukanya berubah.', 'Setiap baris muncul berurutan, bukan sekaligus.'] },
  { id: 'reduced', label: 'Gerakan dikurangi', title: 'Semua berhenti, konten tetap utuh', lines: ['Bila sistem atau saklar di bawah meminta gerakan dikurangi, tidak ada animasi yang dibuat.', 'Setiap elemen langsung tampil di posisi akhirnya, tidak ada yang tertinggal tersembunyi.'] }
];

export const filters = ['Semua', 'Scroll', 'Interaksi', 'Teks'] as const;
export type Filter = (typeof filters)[number];
export type Topic = Exclude<Filter, 'Semua'>;

export interface Example {
  id: string;
  topic: Topic;
  title: string;
  summary: string;
  detail: string[];
}

export const examples: Example[] = [
  { id: 'parallax', topic: 'Scroll', title: 'Parallax berlapis', summary: 'Lapisan depan bergerak lebih cepat dari latar, sehingga halaman punya kedalaman.', detail: ['Tiap lapisan punya kedalaman sendiri. Saat halaman digulir, lapisan depan menempuh jarak lebih jauh daripada latar.', 'Gerakannya hanya memakai transform, jadi tetap ringan di perangkat biasa.'] },
  { id: 'fill', topic: 'Teks', title: 'Teks menyala saat scroll', summary: 'Kalimat besar menyala kata demi kata mengikuti posisi gulir.', detail: ['Tiap kata berubah dari redup ke warna utama seiring digulir, dengan jeda yang terhubung ke posisi gulir.', 'Tanpa gradien pada teks: yang berubah hanya opasitas, jadi tetap terbaca dan mudah diseleksi.'] },
  { id: 'segmented', topic: 'Interaksi', title: 'Segmented control', summary: 'Penanda geser mengikuti pilihan dengan kurva yang sama seperti elemen lain.', detail: ['Posisi dan lebar penanda dihitung dari tombol aktif, lalu dianimasikan dengan transisi CSS.', 'Tombol tetap berupa tombol biasa, jadi bisa dijangkau dengan keyboard.'] },
  { id: 'words', topic: 'Teks', title: 'Judul muncul per kata', summary: 'Setiap kata punya gerakan masuk sendiri, dan gayanya berubah di tiap template.', detail: ['Judul dipecah per kata. Gerak masuknya diatur oleh token template: naik, fokus, menghentak, atau memantul.', 'Pembaca layar tetap membaca judul utuh lewat label pada elemen judul.'] },
  { id: 'hover', topic: 'Interaksi', title: 'Kartu yang merespons', summary: 'Kartu terangkat saat disentuh pointer dan menekan saat diklik.', detail: ['Kedalaman terangkat dan bayangannya berasal dari token template, jadi tiap template menekan kartu dengan caranya sendiri.', 'Efek hanya aktif di perangkat yang punya hover dan mati saat gerakan dikurangi.'] },
  { id: 'sheet', topic: 'Scroll', title: 'Lembar detail', summary: 'Detail terbuka di atas halaman, lalu teksnya muncul berurutan.', detail: ['Lembar ini memakai elemen dialog bawaan browser, jadi fokus dan tombol Esc sudah ditangani.', 'Baris teks di dalamnya muncul berurutan, seperti yang Anda lihat sekarang.'] }
];

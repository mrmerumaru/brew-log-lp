// Two-language support for the landing page: English and Bahasa Indonesia.
//
// Deliberately not a library — this is a client-rendered SPA with no server
// rendering, so a module-level store plus useSyncExternalStore covers live
// switching in a few lines, where react-i18next would add a dependency, a
// provider, and a suspense story for no benefit.
//
// The copy lives here rather than beside each component so the two languages
// sit side by side and a missing translation is obvious. Keys are nested by
// section (nav.hero.features…) for the same reason.
//
// The choice persists in localStorage and is also readable from `?lang=id` —
// so the Indonesian version has a link worth posting to Instagram.

import { useSyncExternalStore } from 'react'

export const LANGS = ['en', 'id']
export const LANG_LABELS = { en: 'EN', id: 'ID' }
export const LANG_NAMES = { en: 'English', id: 'Bahasa Indonesia' }
export const DEFAULT_LANG = 'en'

const STORAGE_KEY = 'brew-log-lp:lang:v1'

export const COPY = {
  en: {
    meta: {
      title: 'Brew Log — A coffee consistency tracker.',
      description:
        'Log every variable of a brew, attach a photo of the cup, and look back at what produced your best results.',
    },
    nav: {
      features: 'Features',
      how: 'How it works',
      faq: 'FAQ',
      contact: 'Contact',
      open: 'Open the app →',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Language',
    },
    hero: {
      eyebrow: 'Welcome',
      title: 'A coffee consistency tracker.',
      body:
        'Log every variable of a brew, attach a photo of the cup, and look back at what produced your best results.',
      cta: 'Open the app →',
      secondary: 'How it works',
    },
    whatWhy: {
      label: 'What & why',
      p1:
        "A spreadsheet works until it doesn't. Every brew is another row to remember to fill in, and by the third cup of the day the details are already gone — what beans, what ratio, how it tasted. A sheet doesn't hold a photo, and a photo without the numbers next to it doesn't tell you anything either.",
      p2:
        'Brew Log asks for the same handful of fields every time — method, beans, parameters, taste — in under a minute, and keeps a photo of the cup attached to the row. Everything lands in one place you can scroll back through, filter, and compare.',
      points: [
        'Structured fields so nothing is forgotten.',
        'A photo of the cup, attached to the brew.',
        'Insights across your history — what produced the 4★+ cups.',
      ],
    },
    features: {
      label: 'Features',
      items: [
        {
          title: 'Structured log',
          description:
            'Method, equipment, beans, parameters and tasting notes in guided fields — not a blank row in a spreadsheet.',
        },
        {
          title: 'Photo attached',
          description:
            "Pick a photo of the finished cup while you're still at the counter. Resized and stored with the brew.",
        },
        {
          title: 'Brew history',
          description:
            'Every brew, newest first. Filter by method, bean or rating to compare.',
        },
        {
          title: 'Repeat a brew',
          description:
            'One button carries the setup forward — method, equipment, beans, parameters. New row, fresh tasting notes.',
        },
        {
          title: 'Insights',
          description:
            'What your 4★+ brews have in common: ranked methods, beans, grinders. Counts shown beside every figure.',
        },
        {
          title: 'Share cards',
          description:
            'Generate a post-ready image of a brew — Story or Post aspect — and send it to Instagram.',
        },
      ],
    },
    photoBand: {
      title: 'Same beans, same method, better every time.',
      body:
        'Brew Log keeps the variables where you can see them — so the next cup is a decision, not a guess.',
      cta: 'Start logging →',
    },
    how: {
      label: 'How it works',
      badge: 'New',
      steps: [
        {
          title: 'Sign in',
          description:
            'Google only. Your brews are scoped to your account from the first row.',
          alt: 'Brew Log sign-in screen with a Continue with Google button',
          image: '/images/screenshots/01-sign-in.png',
        },
        {
          title: 'Log a brew',
          description:
            "Fill the fields, hit Save. Under 60 seconds once you've done it twice.",
          alt: 'Brew Log form with drink and method fields, Latte selected',
          image: '/images/screenshots/02-log-a-brew.png',
        },
        {
          title: 'Attach a photo',
          description:
            'Pick the cup photo in the same flow. It rides along with the row.',
          alt: 'Brew Log tasting notes step with the photo button below the tasting fields',
          image: '/images/screenshots/03-attach-a-photo.png',
        },
        {
          title: 'Look back',
          description:
            'Every brew lands in History — filter by method, bean or rating to compare.',
          alt: 'Brew Log history list showing past brews with photos and ratings',
          image: '/images/screenshots/04-history.png',
        },
        {
          title: 'Share it',
          description: 'Generate the share card and post it to Instagram.',
          alt: 'Brew Log share sheet previewing a Hot Latte story card',
          image: '/images/screenshots/05-share.png',
        },
        {
          title: 'Switch language',
          description:
            'Tap EN / ID in the header to read the whole app in Bahasa Indonesia — before or after you sign in.',
          alt: 'Brew Log header with the EN / ID language toggle highlighted',
          image: '/images/screenshots/06-language.png',
        },
      ],
      note:
        'Setups carry forward. Tasting notes, ratings and photos don\'t — every cup is logged on its own terms.',
    },
    install: {
      label: 'Install',
      platforms: [
        {
          name: 'iOS',
          steps: [
            'Open brew-log-xi.vercel.app in Safari.',
            'Tap the Share icon.',
            'Tap "Add to Home Screen".',
          ],
        },
        {
          name: 'Android',
          steps: [
            'Open brew-log-xi.vercel.app in Chrome.',
            'Tap the ⋮ menu.',
            'Tap "Install app".',
          ],
        },
      ],
      note:
        'Installed, it opens in its own window, with its own icon, no browser chrome. The brew data still lives in your Supabase account — sign in once and the install is personal to you.',
    },
    faq: {
      label: 'FAQ',
      items: [
        {
          q: 'What is Brew Log?',
          a: 'A web app for logging brews: source, equipment, beans, parameters, tasting notes, photo, rating. History and Insights are built in.',
        },
        {
          q: 'Is it free?',
          a: "Yes. It's a personal project; there's nothing to pay for and no plan to change that.",
        },
        {
          q: 'Do I need an account?',
          a: 'Yes, to save brews. Sign-in is Google only — no password to manage, no email verification step. (Google\'s OAuth consent screen is in Testing mode, so the first sign-in shows an "unverified app" notice; that\'s expected.)',
        },
        {
          q: 'Where is my data?',
          a: "In your own Supabase project. Row-level security scopes each brew to the user that wrote it. You never see another user's data and they never see yours.",
        },
        {
          q: 'Can I export it?',
          a: "Not yet. The schema is plain Postgres, so a direct pg_dump from your project works, but there's no built-in export button.",
        },
        {
          q: 'Does it work offline?',
          a: 'Partially. The shell caches, so a flaky connection still opens the app — but every brew is written to Supabase live, so logging without a connection returns an error rather than queuing the row.',
        },
        {
          q: 'Why Google sign-in only?',
          a: "Magic-link email worked but Supabase's built-in sender rate-limits to a couple of messages an hour, which made sign-in unreliable for new users. Google is the only path that doesn't depend on email deliverability. Email OTP can be re-enabled if the rate limit becomes a real problem.",
        },
        {
          q: 'Will it stay free?',
          a: "No plan to charge. It's a personal project shared with friends; no roadmap to monetise.",
        },
      ],
    },
    cta: {
      eyebrow: 'Ready when you are',
      title: 'Brew better, cup after cup.',
      body: "Log your next brew in under a minute and see what's working.",
      cta: 'Open the app →',
    },
    footer: {
      tagline: 'A coffee consistency tracker.',
      linksLabel: 'Links',
      openApp: 'Open the app',
      repo: 'GitHub repo',
      bug: 'Report a bug',
      findLabel: 'Find me',
      bottom: 'Made with React, Vite and Supabase. Brew data is yours.',
    },
  },

  id: {
    meta: {
      title: 'Brew Log — Pelacak konsistensi kopi.',
      description:
        'Catat setiap variabel dari satu seduhan, lampirkan foto cangkirnya, lalu lihat kembali apa yang menghasilkan hasil terbaikmu.',
    },
    nav: {
      features: 'Fitur',
      how: 'Cara kerja',
      faq: 'FAQ',
      contact: 'Kontak',
      open: 'Buka aplikasi →',
      openMenu: 'Buka menu',
      closeMenu: 'Tutup menu',
      language: 'Bahasa',
    },
    hero: {
      eyebrow: 'Selamat datang',
      title: 'Pelacak konsistensi kopi.',
      body:
        'Catat setiap variabel dari satu seduhan, lampirkan foto cangkirnya, lalu lihat kembali apa yang menghasilkan hasil terbaikmu.',
      cta: 'Buka aplikasi →',
      secondary: 'Cara kerja',
    },
    whatWhy: {
      label: 'Apa & mengapa',
      p1:
        'Spreadsheet bekerja sampai tidak lagi. Setiap seduhan adalah baris baru yang harus diisi, dan sudah di cangkir ketiga hari itu detailnya hilang — biji apa, rasio berapa, rasanya bagaimana. Spreadsheet tidak menyimpan foto, dan foto tanpa angka di sebelahnya juga tidak menjelaskan apa pun.',
      p2:
        'Brew Log meminta kolom yang sama setiap kali — metode, biji, parameter, rasa — dalam waktu kurang dari satu menit, dan menyimpan foto cangkir menempel di barisnya. Semuanya terkumpul di satu tempat yang bisa kamu telusuri kembali, filter, dan bandingkan.',
      points: [
        'Kolom terstruktur supaya tidak ada yang terlewat.',
        'Foto cangkir, menempel pada setiap seduhan.',
        'Wawasan dari riwayatmu — apa yang menghasilkan cangkir 4★+.',
      ],
    },
    features: {
      label: 'Fitur',
      items: [
        {
          title: 'Log terstruktur',
          description:
            'Metode, alat, biji, parameter, dan catatan rasa dalam kolom terpandu — bukan baris kosong di spreadsheet.',
        },
        {
          title: 'Foto menempel',
          description:
            'Pilih foto cangkir jadi selagi masih di konter. Ukurannya diperkecil dan tersimpan bersama seduhannya.',
        },
        {
          title: 'Riwayat seduhan',
          description:
            'Semua seduhan, terbaru lebih dulu. Filter berdasarkan metode, biji, atau rating untuk membandingkan.',
        },
        {
          title: 'Ulangi seduhan',
          description:
            'Satu tombol membawa setup ke depan — metode, alat, biji, parameter. Baris baru, catatan rasa yang masih kosong.',
        },
        {
          title: 'Wawasan',
          description:
            'Apa yang sama-sama dimiliki seduhan 4★+ kamu: peringkat metode, biji, dan grinder. Jumlah selalu ditampilkan di samping setiap angka.',
        },
        {
          title: 'Kartu berbagi',
          description:
            'Buat gambar siap posting dari satu seduhan — format Story atau Post — lalu kirim ke Instagram.',
        },
      ],
    },
    photoBand: {
      title: 'Biji sama, metode sama, makin baik tiap kali.',
      body:
        'Brew Log menyimpan variabelnya di tempat yang bisa kamu lihat — jadi cangkir berikutnya adalah keputusan, bukan tebakan.',
      cta: 'Mulai mencatat →',
    },
    how: {
      label: 'Cara kerja',
      badge: 'Baru',
      steps: [
        {
          title: 'Masuk',
          description:
            'Google saja. Seduuhanmu terikat ke akunmu sejak baris pertama.',
          alt: 'Layar masuk Brew Log dengan tombol Continue with Google',
          image: '/images/screenshots/01-sign-in-id.png',
        },
        {
          title: 'Catat seduhan',
          description:
            'Isi kolomnya, tekan Simpan. Di bawah 60 detik setelah kamu lakukan dua kali.',
          alt: 'Formulir Brew Log dengan kolom drink dan method, Latte terpilih',
          image: '/images/screenshots/02-log-a-brew-id.png',
        },
        {
          title: 'Lampirkan foto',
          description:
            'Pilih foto cangkir di alur yang sama. Foto ikut tersimpan di barisnya.',
          alt: 'Langkah catatan rasa Brew Log dengan tombol foto di bawah kolom rasa',
          image: '/images/screenshots/03-attach-a-photo-id.png',
        },
        {
          title: 'Lihat kembali',
          description:
            'Setiap seduhan masuk ke Riwayat — filter berdasarkan metode, biji, atau rating untuk membandingkan.',
          alt: 'Daftar riwayat Brew Log berisi seduhan sebelumnya dengan foto dan rating',
          image: '/images/screenshots/04-history-id.png',
        },
        {
          title: 'Bagikan',
          description: 'Buat kartu berbagi lalu posting ke Instagram.',
          alt: 'Lembar bagikan Brew Log dengan pratinjau kartu story Hot Latte',
          image: '/images/screenshots/05-share-id.png',
        },
        {
          title: 'Ganti bahasa',
          description:
            'Ketuk EN / ID di bagian atas untuk membaca seluruh aplikasi dalam Bahasa Indonesia — sebelum maupun setelah masuk.',
          alt: 'Header Brew Log dengan tombol EN / ID ditandai',
          image: '/images/screenshots/06-language-id.png',
        },
      ],
      note:
        'Setup diteruskan ke seduhan berikutnya. Catatan rasa, rating, dan foto tidak — setiap cangkir dicatat apa adanya.',
    },
    install: {
      label: 'Pasang',
      platforms: [
        {
          name: 'iOS',
          steps: [
            'Buka brew-log-xi.vercel.app di Safari.',
            'Ketuk ikon Bagikan.',
            'Ketuk "Tambahkan ke Layar Beranda".',
          ],
        },
        {
          name: 'Android',
          steps: [
            'Buka brew-log-xi.vercel.app di Chrome.',
            'Ketuk menu ⋮.',
            'Ketuk "Pasang aplikasi".',
          ],
        },
      ],
      note:
        'Setelah dipasang, aplikasinya terbuka di jendela sendiri, dengan ikon sendiri, tanpa kolom browser. Data seduhan tetap tersimpan di akun Supabase-mu — cukup masuk sekali, dan setiap pemasangan jadi milikmu pribadi.',
    },
    faq: {
      label: 'FAQ',
      items: [
        {
          q: 'Apa itu Brew Log?',
          a: 'Aplikasi web untuk mencatat seduhan: sumber, alat, biji, parameter, catatan rasa, foto, rating. Riwayat dan Wawasan sudah tersedia.',
        },
        {
          q: 'Apakah gratis?',
          a: 'Ya. Ini proyek pribadi; tidak ada yang perlu dibayar dan tidak ada rencana mengubahnya.',
        },
        {
          q: 'Apakah perlu akun?',
          a: 'Ya, untuk menyimpan seduhan. Masuk hanya lewat Google — tidak ada kata sandi yang harus diingat, tidak ada langkah verifikasi email. (Layar persetujuan OAuth Google masih dalam mode Testing, jadi saat pertama kali masuk akan muncul peringatan "aplikasi belum diverifikasi"; itu wajar.)',
        },
        {
          q: 'Di mana dataku?',
          a: 'Di proyek Supabase milikmu sendiri. Keamanan tingkat baris membatasi setiap seduhan hanya untuk pengguna yang menulisnya. Kamu tidak pernah melihat data pengguna lain, dan mereka juga tidak melihat datamu.',
        },
        {
          q: 'Bisakah data saya diekspor?',
          a: 'Belum. Skemanya Postgres biasa, jadi pg_dump langsung dari proyekmu masih bisa, tapi belum ada tombol ekspor bawaan.',
        },
        {
          q: 'Apakah bisa dipakai offline?',
          a: 'Sebagian. Kerangka aplikasinya tersimpan di cache, jadi koneksi yang kecil saja masih bisa membuka aplikasi — tetapi setiap seduhan ditulis langsung ke Supabase, sehingga mencatat tanpa koneksi akan menampilkan error, bukan mengantrekan barisnya.',
        },
        {
          q: 'Kenapa hanya masuk dengan Google?',
          a: 'Tautan masuk lewat email sempat jalan, tapi pengirim bawaan Supabase membatasi laju menjadi beberapa pesan per jam, sehingga masuk jadi tidak andal untuk pengguna baru. Google adalah satu-satunya jalur yang tidak bergantung pada pengiriman email. Email OTP bisa diaktifkan lagi kalau pembatasan itu jadi masalah nyata.',
        },
        {
          q: 'Apakah akan tetap gratis?',
          a: 'Tidak ada rencana menarik biaya. Ini proyek pribadi yang dibagikan ke teman-teman; tidak ada rencana untuk mengomersialkan.',
        },
      ],
    },
    cta: {
      eyebrow: 'Siap kapan pun kamu siap',
      title: 'Seduh makin baik, cangkir demi cangkir.',
      body: 'Catat seduhan berikutnya dalam kurang dari satu menit dan lihat apa yang sedang bekerja.',
      cta: 'Buka aplikasi →',
    },
    footer: {
      tagline: 'Pelacak konsistensi kopi.',
      linksLabel: 'Tautan',
      openApp: 'Buka aplikasi',
      repo: 'Repo GitHub',
      bug: 'Laporkan bug',
      findLabel: 'Temukan saya',
      bottom: 'Dibuat dengan React, Vite, dan Supabase. Data seduhan milikmu.',
    },
  },
}

// --- Store ---------------------------------------------------------------

const listeners = new Set()

function readStored() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && LANGS.includes(stored)) return stored
  } catch {
    // Private mode or blocked storage — fall through to the default.
  }
  return null
}

function readFromUrl() {
  try {
    const param = new URLSearchParams(window.location.search).get('lang')
    if (param && LANGS.includes(param)) return param
  } catch {
    // No URL to read.
  }
  return null
}

// With no stored choice and no ?lang= in the URL, follow the browser — someone
// opening this from an Indonesian phone in Indonesia lands in Bahasa rather
// than having to find the toggle first. Mirrors the app's own behaviour.
function readBrowser() {
  try {
    const preferred = navigator.languages?.[0] ?? navigator.language
    if (typeof preferred === 'string' && preferred.toLowerCase().startsWith('id')) {
      return 'id'
    }
  } catch {
    // No navigator to read.
  }
  return null
}

// The URL wins over stored preference, so a shared ?lang=id link always
// lands in Indonesian regardless of what this browser last chose.
let current = readFromUrl() ?? readStored() ?? readBrowser() ?? DEFAULT_LANG

function emit() {
  for (const listener of listeners) listener()
}

export function setLang(code) {
  if (!LANGS.includes(code) || code === current) return
  current = code
  try {
    window.localStorage.setItem(STORAGE_KEY, code)
  } catch {
    // Storage blocked — the URL below still carries the choice.
  }
  // Keep the URL in sync so the Indonesian page has a link worth sharing.
  try {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', code)
    window.history.replaceState({}, '', url)
  } catch {
    // URL rewriting is a nicety, not a requirement.
  }
  emit()
}

function subscribe(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return current
}

export function useLang() {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

/**
 * The copy bundle for the active language. Components read from this rather
 * than from a `t(key)` lookup, so a missing key shows up as an undefined
 * property in devtools instead of a silently blank string.
 */
export function useCopy() {
  const lang = useLang()
  return COPY[lang] ?? COPY[DEFAULT_LANG]
}

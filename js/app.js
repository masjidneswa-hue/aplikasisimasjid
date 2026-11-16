/**
 * =========================================================================
 * SI-MASJID — High-Performance Reactive Client Engine (app.js)
 * =========================================================================
 * Mengikuti standar:
 * 1. gas-pro-api: Anti-CORS safe fetch (text/plain header untuk POST)
 * 2. gas-scale-turbo: Deduplikasi in-flight request, SWR caching, instant 0 ms switching
 * 3. gas-pwa-github: Service Worker lifecycle, offline resilient, installable PWA
 * =========================================================================
 */

// =========================================================================
// 1. DATA STATE & DEFAULT FALLBACK
// =========================================================================
const DEFAULT_STATE = {
  masjid: {
    nama: "MASJID JAMI' AL-HIKMAH",
    alamat: "JL. KH. HASYIM ASY'ARI, SUKAMAJU • JAKARTA PUSAT",
    telepon: "0812-3456-7890",
    arah_kiblat: "295° NW",
    logo_url: "https://lh3.googleusercontent.com/aida/ALJJyrDG8cfKLYBmc_ELoMflHzKEnNY86ReeldSlWLxB5nMSJ3ClDAHvW5_nHdgXajgVYirrHCBY0RXfBCw8PbnwhOvy_SugQYgq0moVEluvbZlhmIdSBE5J38RYkYXo4IigPVL6PT-ZwU3nbOr7xMsp5FnGK04ZwVEZIuG67LdOzt7DMUOZ8t6L8Rz9uJsXM8qcIT9IPRvpqMSNJrlsRERFoAtILs7Fznr2SSmKIHQElp4"
  },
  prayer_times: {
    subuh: "04:32",
    dzuhur: "11:54",
    ashar: "15:18",
    maghrib: "17:51",
    isya: "19:04"
  },
  next_friday: {
    id_jadwal: "JMT-2026-05-22",
    tanggal_jumat: "2026-05-22",
    id_khotib: "PTG-001",
    nama_khotib: "Ust. Faris Abdullah, M.Ag",
    id_imam: "PTG-002",
    nama_imam: "Ust. H. Rahmat Hidayat, Lc",
    id_bilal: "PTG-003",
    nama_bilal: "Ust. Ahmad Fauzi",
    tema_khutbah: "Adab Menuntut Ilmu & Menjaga Kerukunan Jamaah",
    status_konfirmasi_khotib: "Terkonfirmasi",
    status_konfirmasi_bilal: "Terkonfirmasi",
    token_konfirmasi: "tok_demo_2026_05_22"
  },
  schedules: [
    {
      id_jadwal: "JMT-2026-05-22",
      tanggal_jumat: "2026-05-22",
      nama_khotib: "Ust. Faris Abdullah, M.Ag",
      nama_imam: "Ust. H. Rahmat Hidayat, Lc",
      nama_bilal: "Ust. Ahmad Fauzi",
      tema_khutbah: "Adab Menuntut Ilmu & Menjaga Kerukunan Jamaah",
      status_konfirmasi_khotib: "Terkonfirmasi",
      status_konfirmasi_bilal: "Terkonfirmasi",
      token_konfirmasi: "tok_demo_2026_05_22"
    },
    {
      id_jadwal: "JMT-2026-05-29",
      tanggal_jumat: "2026-05-29",
      nama_khotib: "Ust. Dr. H. M. Ridwan, MA",
      nama_imam: "Ust. H. Rahmat Hidayat, Lc",
      nama_bilal: "Ust. Ahmad Fauzi",
      tema_khutbah: "Memakmurkan Masjid di Era Digital",
      status_konfirmasi_khotib: "Menunggu",
      status_konfirmasi_bilal: "Menunggu",
      token_konfirmasi: "tok_demo_2026_05_29"
    },
    {
      id_jadwal: "JMT-2026-06-05",
      tanggal_jumat: "2026-06-05",
      nama_khotib: "Prof. Dr. KH. Nasaruddin, MA",
      nama_imam: "Ust. H. Rahmat Hidayat, Lc",
      nama_bilal: "Ust. Ahmad Fauzi",
      tema_khutbah: "Membangun Generasi Rabbani",
      status_konfirmasi_khotib: "Terkonfirmasi",
      status_konfirmasi_bilal: "Terkonfirmasi",
      token_konfirmasi: "tok_demo_2026_06_05"
    }
  ],
  petugas: [
    { id_petugas: "PTG-001", nama_lengkap: "Ust. Faris Abdullah, M.Ag", spesialisasi: "Khotib & Imam", nomor_wa: "6281234567890", asal_lembaga: "MUI Kota / Ponpes Al-Falah", status_aktif: "TRUE" },
    { id_petugas: "PTG-002", nama_lengkap: "Ust. H. Rahmat Hidayat, Lc", spesialisasi: "Imam", nomor_wa: "6281234567891", asal_lembaga: "Dewan Syariah Masjid", status_aktif: "TRUE" },
    { id_petugas: "PTG-003", nama_lengkap: "Ust. Ahmad Fauzi", spesialisasi: "Bilal", nomor_wa: "6281234567892", asal_lembaga: "Remaja Islam Masjid", status_aktif: "TRUE" },
    { id_petugas: "PTG-004", nama_lengkap: "Ust. Dr. H. M. Ridwan, MA", spesialisasi: "Khotib", nomor_wa: "6281234567893", asal_lembaga: "UIN Syarif Hidayatullah", status_aktif: "TRUE" }
  ],
  announcements: [
    {
      id_pengumuman: "ANN-001",
      judul: "Khutbah Jumat Pekan Ini",
      isi_teks: "Khutbah Jumat 22 Mei oleh Ust. Faris Abdullah, M.Ag — Tema: Adab Menuntut Ilmu & Menjaga Kerukunan Jamaah."
    },
    {
      id_pengumuman: "ANN-002",
      judul: "Penyaluran Sembako Duafa",
      isi_teks: "Ahad, 24 Mei 2026 ba'da Ashar: Penyaluran santunan sembako duafa & anak yatim di Aula Serbaguna Masjid."
    }
  ]
};

// Global Memory State
let appState = JSON.parse(localStorage.getItem('si_masjid_cache') || JSON.stringify(DEFAULT_STATE));
let adminData = JSON.parse(localStorage.getItem('si_masjid_admin_data') || 'null');
let currentToken = localStorage.getItem('si_masjid_admin_token') || '';

// =========================================================================
// 2. NETWORK ENGINE: SWR & ANTI-CORS FETCH (gas-pro-api & gas-scale-turbo)
// =========================================================================
const _inflight = {};

async function callApi(action, data = {}, isGet = false) {
  if (!window.GAS_URL || window.GAS_URL.trim() === '') {
    // Mode Mandiri / Mock jika GAS_URL belum diisi
    return mockApiHandler(action, data);
  }

  const inFlightKey = action + JSON.stringify(data);
  if (_inflight[inFlightKey]) return _inflight[inFlightKey];

  const fetchPromise = (async () => {
    try {
      let res;
      if (isGet) {
        const params = new URLSearchParams({ action, ...data });
        res = await fetch(`${GAS_URL}?${params.toString()}`);
      } else {
        // ATURAN KRUSIAL GAS: Content-Type WAJIB text/plain;charset=utf-8
        res = await fetch(GAS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ action, data, token: currentToken })
        });
      }
      return await res.json();
    } catch (err) {
      console.warn('Network issue:', err);
      return { success: false, message: 'Gagal terhubung ke backend: ' + err.message };
    }
  })();

  _inflight[inFlightKey] = fetchPromise;
  fetchPromise.finally(() => { delete _inflight[inFlightKey]; });
  return fetchPromise;
}

// Simulasi Cerdas saat Offline / Preview Lokal
function mockApiHandler(action, data) {
  return new Promise(resolve => {
    setTimeout(() => {
      if (action === 'getPublicData') {
        resolve({ success: true, data: appState });
      } else if (action === 'loginAdmin') {
        if (data.pin === '123456' || data.pin === 'admin') {
          currentToken = 'mock_token_' + Date.now();
          localStorage.setItem('si_masjid_admin_token', currentToken);
          resolve({
            success: true,
            message: 'Login berhasil (Mode Demo)',
            data: { token: currentToken, nama: 'Pengurus DKM Demo', role: 'admin' }
          });
        } else {
          resolve({ success: false, message: 'PIN demo salah! Gunakan PIN: 123456' });
        }
      } else if (action === 'confirmPetugas') {
        resolve({ success: true, message: 'Alhamdulillah, konfirmasi kehadiran Anda telah tercatat!' });
      } else if (action === 'saveJadwal') {
        // Deteksi Bentrok di Demo
        const clash = appState.schedules.find(s => s.tanggal_jumat === data.tanggal_jumat && s.id_khotib === data.id_khotib && s.id_jadwal !== data.id_jadwal);
        if (clash) {
          resolve({ success: false, message: `Bentrok! Khotib ${data.nama_khotib} sudah terjadwal pada ${data.tanggal_jumat}.` });
        } else {
          resolve({ success: true, message: 'Jadwal berhasil disimpan bebas bentrok!' });
        }
      } else {
        resolve({ success: true, message: 'Operasi sukses (Mode Demo)' });
      }
    }, 150);
  });
}

// Refresh Data Publik Latar Belakang (SWR)
async function syncPublicData() {
  const res = await callApi('getPublicData', {}, true);
  if (res && res.success && res.data) {
    appState = res.data;
    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAllViews();
  }
}

// =========================================================================
// 3. ROUTING & INSTANT VIEW SWITCHER (0 ms Latency)
// =========================================================================
function switchView(viewId) {
  const validViews = ['tv', 'jamaah', 'petugas', 'admin'];
  if (!validViews.includes(viewId)) viewId = 'tv';

  // Toggle active section
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.classList.remove('active');
  });
  const target = document.getElementById(`view-${viewId}`);
  if (target) target.classList.add('active');

  // Toggle Navbar Active Pill
  document.querySelectorAll('[data-nav-target]').forEach(btn => {
    const targetId = btn.getAttribute('data-nav-target');
    if (targetId === viewId) {
      btn.className = "px-3.5 py-1.5 transition-colors bg-primary-container text-on-primary-container font-semibold rounded-lg shadow-sm text-sm";
    } else {
      btn.className = "px-3.5 py-1.5 rounded-lg text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors";
    }
  });

  // Khusus TV: Sembunyikan Navbar otomatis jika dikehendaki
  const navbar = document.getElementById('app-navbar');
  if (viewId === 'tv') {
    navbar.classList.add('opacity-40', 'hover:opacity-100', 'transition-opacity');
  } else {
    navbar.classList.remove('opacity-40');
  }

  // Jika masuk ke admin tapi belum login
  if (viewId === 'admin' && !currentToken) {
    openLoginModal();
  } else if (viewId === 'admin') {
    loadAdminDashboard();
  }

  window.location.hash = viewId;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// =========================================================================
// 4. TV DISPLAY ENGINE (Jam Digital, Countdown Salat & Marquee)
// =========================================================================
const ARABIC_PRAYER = {
  subuh: "الفجر",
  dzuhur: "الظهر",
  ashar: "العصر",
  maghrib: "المغرب",
  isya: "العشاء"
};

function startClockEngine() {
  function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const secs = String(now.getSeconds()).padStart(2, '0');

    // Jam Besar TV
    const clockHoursMins = document.getElementById('clock-hours-mins');
    const clockSeconds = document.getElementById('clock-seconds');
    if (clockHoursMins) clockHoursMins.textContent = `${hours}:${mins}`;
    if (clockSeconds) clockSeconds.textContent = `:${secs}`;

    // Tanggal Masehi
    const dateMasehi = document.getElementById('date-masehi');
    if (dateMasehi) {
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      dateMasehi.textContent = now.toLocaleDateString('id-ID', options);
    }

    // Hitung Mundur Salat Berikutnya
    calculateNextPrayerCountdown(now);
  }

  updateTime();
  setInterval(updateTime, 1000);
}

function calculateNextPrayerCountdown(now) {
  const pt = appState.prayer_times || DEFAULT_STATE.prayer_times;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const prayers = [
    { name: 'Subuh', time: pt.subuh, key: 'subuh' },
    { name: 'Dzuhur', time: pt.dzuhur, key: 'dzuhur' },
    { name: 'Ashar', time: pt.ashar, key: 'ashar' },
    { name: 'Maghrib', time: pt.maghrib, key: 'maghrib' },
    { name: 'Isya', time: pt.isya, key: 'isya' }
  ];

  let nextPrayer = null;
  let diffMinutes = 0;

  for (let p of prayers) {
    const [h, m] = p.time.split(':').map(Number);
    const pMinutes = h * 60 + m;
    if (pMinutes > currentMinutes) {
      nextPrayer = p;
      diffMinutes = pMinutes - currentMinutes;
      break;
    }
  }

  // Jika setelah Isya, salat berikutnya adalah Subuh besok
  if (!nextPrayer) {
    nextPrayer = prayers[0];
    const [h, m] = nextPrayer.time.split(':').map(Number);
    diffMinutes = (24 * 60 - currentMinutes) + (h * 60 + m);
  }

  // Render ke Hero Card Salat Berikutnya
  const elName = document.getElementById('tv-next-prayer-name');
  const elTime = document.getElementById('tv-next-prayer-time');
  const elDiff = document.getElementById('tv-next-prayer-diff');
  const elArabic = document.getElementById('tv-next-prayer-arabic');

  if (elName) elName.textContent = nextPrayer.name;
  if (elTime) elTime.textContent = nextPrayer.time;
  if (elArabic) elArabic.textContent = ARABIC_PRAYER[nextPrayer.key] || '';
  if (elDiff) {
    if (diffMinutes < 60) {
      elDiff.textContent = `Tersisa ${diffMinutes} menit lagi`;
    } else {
      const h = Math.floor(diffMinutes / 60);
      const m = diffMinutes % 60;
      elDiff.textContent = `Tersisa ${h} jam ${m} mnt lagi`;
    }
  }

  // Highlight active prayer card in bottom 5-prayer strip
  document.querySelectorAll('[data-prayer-card]').forEach(card => {
    const k = card.getAttribute('data-prayer-card');
    if (k === nextPrayer.key) {
      card.className = "flex-1 bg-surface-container-high border-2 border-primary-container p-3 rounded-xl shadow-lg relative overflow-hidden transition-all";
    } else {
      card.className = "flex-1 bg-surface-container/80 border border-[#1E4D3E] p-3 rounded-xl transition-all";
    }
  });
}

// Toggle Layar Penuh (Fullscreen)
function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
  }
}

// =========================================================================
// 5. RENDERING VIEWS: TV DISPLAY, PORTAL JAMAAH, & KONFIRMASI
// =========================================================================
function renderAllViews() {
  renderTvDisplay();
  renderPortalJamaah();
  renderPetugasConfirmation();
}

function renderTvDisplay() {
  const m = appState.masjid || DEFAULT_STATE.masjid;
  const announcements = appState.announcements || DEFAULT_STATE.announcements;

  // Nama & Alamat Masjid
  const tvMasjidNama = document.getElementById('tv-masjid-nama');
  const tvMasjidAlamat = document.getElementById('tv-masjid-alamat');
  if (tvMasjidNama) tvMasjidNama.textContent = m.nama;
  if (tvMasjidAlamat) tvMasjidAlamat.textContent = m.alamat;

  // Running Text Marquee
  const marqueeContainer = document.getElementById('tv-marquee-text');
  if (marqueeContainer) {
    const textList = announcements.map(a => a.isi_teks).join('   ✦   ');
    marqueeContainer.textContent = textList || "Selamat Datang di Masjid Jami' Al-Hikmah. Jagalah shaf dan ketertiban ibadah.";
  }
}

function renderPortalJamaah() {
  const nextFriday = appState.next_friday || (appState.schedules && appState.schedules[0]);
  if (!nextFriday) return;

  // Friday Hero Card
  const khotibName = document.getElementById('jm-khotib-name');
  const khutbahTheme = document.getElementById('jm-khutbah-theme');
  const imamName = document.getElementById('jm-imam-name');
  const bilalName = document.getElementById('jm-bilal-name');
  const fridayDate = document.getElementById('jm-friday-date');

  if (khotibName) khotibName.textContent = nextFriday.nama_khotib || 'Belum Ditentukan';
  if (khutbahTheme) khutbahTheme.textContent = `“${nextFriday.tema_khutbah || 'Tema Khutbah Menyusul'}”`;
  if (imamName) imamName.textContent = nextFriday.nama_imam || '-';
  if (bilalName) bilalName.textContent = nextFriday.nama_bilal || '-';
  if (fridayDate) {
    const d = new Date(nextFriday.tanggal_jumat);
    fridayDate.textContent = isNaN(d) ? nextFriday.tanggal_jumat : d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  }

  // Monthly Schedule List
  const scheduleContainer = document.getElementById('jm-schedule-list');
  if (scheduleContainer && appState.schedules) {
    scheduleContainer.innerHTML = appState.schedules.map(s => `
      <div class="bg-surface-container-high/40 border border-[#1E4D3E]/60 rounded-xl p-3.5 flex flex-col gap-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold uppercase text-primary tracking-wide">
            Jumat, ${formatTanggalIndo(s.tanggal_jumat)}
          </span>
          <span class="text-[11px] px-2 py-0.5 rounded-full ${getStatusBadgeClass(s.status_konfirmasi_khotib)}">
            ${s.status_konfirmasi_khotib || 'Menunggu'}
          </span>
        </div>
        <div class="font-bold text-on-surface text-base">${s.nama_khotib}</div>
        <div class="text-xs italic text-on-surface-variant line-clamp-1">“${s.tema_khutbah || '-'}”</div>
        <div class="flex items-center justify-between pt-1 text-xs text-outline border-t border-surface-container-highest">
          <span>Imam: <b class="text-on-surface">${s.nama_imam || '-'}</b></span>
          <span>Bilal: <b class="text-on-surface">${s.nama_bilal || '-'}</b></span>
        </div>
      </div>
    `).join('');
  }
}

function renderPetugasConfirmation() {
  const currentJadwal = appState.next_friday || (appState.schedules && appState.schedules[0]);
  if (!currentJadwal) return;

  const elUstadz = document.getElementById('conf-ustadz-name');
  const elDate = document.getElementById('conf-date');
  const elTheme = document.getElementById('conf-theme');
  const elImam = document.getElementById('conf-imam');
  const elBilal = document.getElementById('conf-bilal');

  if (elUstadz) elUstadz.textContent = currentJadwal.nama_khotib;
  if (elDate) elDate.textContent = formatTanggalIndo(currentJadwal.tanggal_jumat);
  if (elTheme) elTheme.textContent = `“${currentJadwal.tema_khutbah}”`;
  if (elImam) elImam.textContent = currentJadwal.nama_imam;
  if (elBilal) elBilal.textContent = currentJadwal.nama_bilal;
}

// =========================================================================
// 6. ACTION HANDLERS: KONFIRMASI PETUGAS
// =========================================================================
async function submitKonfirmasiPetugas(status) {
  const currentJadwal = appState.next_friday || (appState.schedules && appState.schedules[0]);
  const token = currentJadwal ? currentJadwal.token_konfirmasi : 'tok_demo';

  const res = await callApi('confirmPetugas', {
    token: token,
    status: status,
    peran: 'khotib'
  });

  if (res && res.success) {
    showToast(res.message, 'success');
    // Beralih ke state tanda terima digital
    document.getElementById('conf-form-card').classList.add('hidden');
    document.getElementById('conf-receipt-card').classList.remove('hidden');

    // Optimistic Update
    if (currentJadwal) currentJadwal.status_konfirmasi_khotib = status;
    renderAllViews();
  } else {
    showToast((res && res.message) || 'Gagal menyimpan konfirmasi', 'error');
  }
}

// =========================================================================
// 7. DASHBOARD PENGURUS DKM (Admin Portal)
// =========================================================================
async function loadAdminDashboard() {
  // Update KPI Counters
  const totalPetugas = appState.petugas ? appState.petugas.length : 0;
  const totalJadwal = appState.schedules ? appState.schedules.length : 0;
  const nextFriday = appState.next_friday || (appState.schedules && appState.schedules[0]);

  const elCountPetugas = document.getElementById('adm-count-petugas');
  const elCountJadwal = document.getElementById('adm-count-jadwal');
  const elStatusPekan = document.getElementById('adm-status-pekan');

  if (elCountPetugas) elCountPetugas.textContent = totalPetugas;
  if (elCountJadwal) elCountJadwal.textContent = totalJadwal;
  if (elStatusPekan && nextFriday) {
    elStatusPekan.textContent = nextFriday.status_konfirmasi_khotib || 'Menunggu';
  }

  // Render Table Jadwal
  renderAdminJadwalTable();
  // Render Table Petugas
  renderAdminPetugasTable();
}

function renderAdminJadwalTable() {
  const tbody = document.getElementById('adm-table-jadwal');
  if (!tbody) return;

  const list = appState.schedules || [];
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-outline">Belum ada data jadwal. Tambahkan jadwal baru.</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((j, idx) => `
    <tr class="border-b border-surface-container-highest hover:bg-surface-container-high/30 transition-colors">
      <td class="py-3 px-4 font-medium text-on-surface whitespace-nowrap">
        ${formatTanggalIndo(j.tanggal_jumat)}
      </td>
      <td class="py-3 px-4 font-semibold text-secondary-fixed">
        ${j.nama_khotib}
      </td>
      <td class="py-3 px-4 text-xs text-on-surface-variant max-w-[200px] truncate">
        ${j.tema_khutbah || '-'}
      </td>
      <td class="py-3 px-4 text-xs text-outline whitespace-nowrap">
        <div>Imam: ${j.nama_imam || '-'}</div>
        <div>Bilal: ${j.nama_bilal || '-'}</div>
      </td>
      <td class="py-3 px-4 whitespace-nowrap">
        <span class="text-xs px-2.5 py-1 rounded-full ${getStatusBadgeClass(j.status_konfirmasi_khotib)}">
          ${j.status_konfirmasi_khotib || 'Menunggu'}
        </span>
      </td>
      <td class="py-3 px-4 whitespace-nowrap text-right space-x-1">
        <button onclick="editJadwalModal('${j.id_jadwal}')" class="px-2 py-1 rounded bg-surface-container-highest text-primary hover:bg-surface-container hover:text-primary-fixed text-xs transition-colors">
          Edit
        </button>
        <button onclick="deleteJadwalItem('${j.id_jadwal}')" class="px-2 py-1 rounded bg-surface-container-highest text-error hover:bg-error-container hover:text-white text-xs transition-colors">
          Hapus
        </button>
      </td>
    </tr>
  `).join('');
}

function renderAdminPetugasTable() {
  const tbody = document.getElementById('adm-table-petugas');
  if (!tbody) return;

  const list = appState.petugas || [];
  tbody.innerHTML = list.map((p, idx) => `
    <tr class="border-b border-surface-container-highest hover:bg-surface-container-high/30 transition-colors">
      <td class="py-3 px-4 font-semibold text-on-surface">${p.nama_lengkap}</td>
      <td class="py-3 px-4 text-xs text-primary">${p.spesialisasi}</td>
      <td class="py-3 px-4 text-xs font-mono text-secondary">${p.nomor_wa || '-'}</td>
      <td class="py-3 px-4 text-xs text-on-surface-variant">${p.asal_lembaga || '-'}</td>
      <td class="py-3 px-4 text-right">
        <button onclick="deletePetugasItem('${p.id_petugas}')" class="px-2 py-1 rounded bg-surface-container-highest text-error hover:bg-error-container hover:text-white text-xs transition-colors">
          Hapus
        </button>
      </td>
    </tr>
  `).join('');
}

// =========================================================================
// 8. FORM JADWAL PINTAR & DETEKSI BENTROK REAL-TIME
// =========================================================================
function openModalJadwal(idJadwal = null) {
  const modal = document.getElementById('modal-jadwal');
  const form = document.getElementById('form-jadwal');
  const alertClash = document.getElementById('clash-warning-box');
  if (alertClash) alertClash.classList.add('hidden');

  // Isi dropdown petugas
  const selectKhotib = document.getElementById('inp-khotib');
  const selectImam = document.getElementById('inp-imam');
  const selectBilal = document.getElementById('inp-bilal');

  const optionsHtml = (appState.petugas || []).map(p => `<option value="${p.id_petugas}" data-nama="${p.nama_lengkap}">${p.nama_lengkap} (${p.spesialisasi})</option>`).join('');

  if (selectKhotib) selectKhotib.innerHTML = `<option value="">-- Pilih Khotib --</option>` + optionsHtml;
  if (selectImam) selectImam.innerHTML = `<option value="">-- Pilih Imam --</option>` + optionsHtml;
  if (selectBilal) selectBilal.innerHTML = `<option value="">-- Pilih Bilal --</option>` + optionsHtml;

  if (idJadwal) {
    const item = appState.schedules.find(s => s.id_jadwal === idJadwal);
    if (item) {
      document.getElementById('inp-id-jadwal').value = item.id_jadwal;
      document.getElementById('inp-tanggal').value = item.tanggal_jumat;
      document.getElementById('inp-tema').value = item.tema_khutbah || '';
      if (selectKhotib) selectKhotib.value = item.id_khotib;
      if (selectImam) selectImam.value = item.id_imam;
      if (selectBilal) selectBilal.value = item.id_bilal;
    }
  } else {
    form.reset();
    document.getElementById('inp-id-jadwal').value = '';
    // Otomatis set tanggal Jumat berikutnya
    document.getElementById('inp-tanggal').value = getNextFridayDateString();
  }

  modal.classList.remove('hidden');
}

function checkClashRealtime() {
  const tanggal = document.getElementById('inp-tanggal').value;
  const selectKhotib = document.getElementById('inp-khotib');
  const idKhotib = selectKhotib ? selectKhotib.value : '';
  const currentId = document.getElementById('inp-id-jadwal').value;
  const alertClash = document.getElementById('clash-warning-box');

  if (!tanggal || !idKhotib) {
    if (alertClash) alertClash.classList.add('hidden');
    return;
  }

  const clash = (appState.schedules || []).find(s =>
    s.tanggal_jumat === tanggal && s.id_khotib === idKhotib && s.id_jadwal !== currentId
  );

  if (clash) {
    if (alertClash) {
      alertClash.classList.remove('hidden');
      alertClash.innerHTML = `⚠️ <b>Peringatan Bentrok:</b> Khotib ini sudah terjadwal pada Jumat ${tanggal}!`;
    }
  } else {
    if (alertClash) alertClash.classList.add('hidden');
  }
}

async function handleSaveJadwalSubmit(e) {
  e.preventDefault();
  const selectKhotib = document.getElementById('inp-khotib');
  const selectImam = document.getElementById('inp-imam');
  const selectBilal = document.getElementById('inp-bilal');

  const payload = {
    id_jadwal: document.getElementById('inp-id-jadwal').value,
    tanggal_jumat: document.getElementById('inp-tanggal').value,
    id_khotib: selectKhotib.value,
    nama_khotib: selectKhotib.options[selectKhotib.selectedIndex]?.getAttribute('data-nama') || '',
    id_imam: selectImam.value,
    nama_imam: selectImam.options[selectImam.selectedIndex]?.getAttribute('data-nama') || '',
    id_bilal: selectBilal.value,
    nama_bilal: selectBilal.options[selectBilal.selectedIndex]?.getAttribute('data-nama') || '',
    tema_khutbah: document.getElementById('inp-tema').value
  };

  const btnSubmit = document.getElementById('btn-save-jadwal');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Menyimpan...';

  const res = await callApi('saveJadwal', payload);
  btnSubmit.disabled = false;
  btnSubmit.textContent = 'Simpan Jadwal Bebas Bentrok';

  if (res && res.success) {
    showToast(res.message, 'success');
    document.getElementById('modal-jadwal').classList.add('hidden');

    // Optimistic Update
    const existingIdx = appState.schedules.findIndex(s => s.id_jadwal === payload.id_jadwal);
    if (existingIdx > -1) {
      appState.schedules[existingIdx] = { ...appState.schedules[existingIdx], ...payload };
    } else {
      payload.id_jadwal = payload.id_jadwal || ('JMT-' + payload.tanggal_jumat);
      payload.status_konfirmasi_khotib = 'Menunggu';
      appState.schedules.unshift(payload);
    }
    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAllViews();
    loadAdminDashboard();
  } else {
    showToast((res && res.message) || 'Gagal menyimpan jadwal', 'error');
  }
}

async function deleteJadwalItem(idJadwal) {
  if (!confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) return;
  const res = await callApi('deleteJadwal', { id_jadwal: idJadwal });
  if (res && res.success) {
    showToast(res.message, 'success');
    appState.schedules = appState.schedules.filter(s => s.id_jadwal !== idJadwal);
    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAllViews();
    loadAdminDashboard();
  } else {
    showToast((res && res.message) || 'Gagal menghapus', 'error');
  }
}

// =========================================================================
// 9. DUAL EXPORT SYSTEM (Cetak A4 Mading & Salin Broadcast WA)
// =========================================================================

/**
 * 1. Generator Cetak A4 / PDF Mading
 */
function printA4Mading() {
  const m = appState.masjid || DEFAULT_STATE.masjid;
  const schedules = appState.schedules || [];

  const printArea = document.getElementById('print-area');
  if (!printArea) return;

  const rowsHtml = schedules.slice(0, 8).map((s, idx) => `
    <tr>
      <td style="text-align: center;">${idx + 1}</td>
      <td style="font-weight: bold;">Jumat, ${formatTanggalIndo(s.tanggal_jumat)}</td>
      <td style="font-weight: bold; color: #111827;">${s.nama_khotib}</td>
      <td style="font-style: italic;">${s.tema_khutbah || '-'}</td>
      <td>${s.nama_imam || '-'}</td>
      <td>${s.nama_bilal || '-'}</td>
    </tr>
  `).join('');

  printArea.innerHTML = `
    <div style="border-bottom: 3px double #111827; padding-bottom: 12px; margin-bottom: 16px; text-align: center;">
      <h2 style="margin: 0; font-size: 18pt; text-transform: uppercase; letter-spacing: 1px;">${m.nama}</h2>
      <p style="margin: 4px 0; font-size: 10pt; color: #4B5563;">${m.alamat} • Telp: ${m.telepon || '-'}</p>
      <h3 style="margin: 10px 0 0; font-size: 13pt; text-decoration: underline;">JADWAL PETUGAS SHOLAT JUMAT</h3>
    </div>

    <table class="print-table">
      <thead>
        <tr>
          <th style="width: 30px; text-align: center;">No</th>
          <th style="width: 140px;">Hari & Tanggal</th>
          <th>Khotib Jumat</th>
          <th>Tema Khutbah</th>
          <th style="width: 130px;">Imam</th>
          <th style="width: 120px;">Bilal / Azan</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div style="margin-top: 40px; display: flex; justify-content: space-between; font-size: 11pt;">
      <div style="text-align: center; width: 200px;">
        <p>Mengetahui,<br><b>Ketua DKM</b></p>
        <div style="height: 60px;"></div>
        <p style="border-top: 1px solid #111; padding-top: 4px;">( ................................ )</p>
      </div>
      <div style="text-align: center; width: 200px;">
        <p>Jakarta, ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}<br><b>Bidang Peribadatan</b></p>
        <div style="height: 60px;"></div>
        <p style="border-top: 1px solid #111; padding-top: 4px;">( ................................ )</p>
      </div>
    </div>
  `;

  window.print();
}

/**
 * 2. Generator Siaran WhatsApp Sekali-Klik
 */
function copyWhatsAppBroadcast() {
  const m = appState.masjid || DEFAULT_STATE.masjid;
  const nextFriday = appState.next_friday || (appState.schedules && appState.schedules[0]);
  if (!nextFriday) {
    showToast('Belum ada jadwal Jumat tersedia untuk disalin', 'warning');
    return;
  }

  const tglStr = formatTanggalIndo(nextFriday.tanggal_jumat);

  const waText =
`*JADWAL SHOLAT JUMAT — ${m.nama.toUpperCase()}*
_Alamat: ${m.alamat}_

📅 *Hari & Tanggal:* Jumat, ${tglStr}
⏰ *Waktu Masuk:* 11:30 WIB (Sholat Dzuhur ${appState.prayer_times?.dzuhur || '11:54'} WIB)

🎙️ *Khotib:* ${nextFriday.nama_khotib}
📖 *Tema:* _“${nextFriday.tema_khutbah || 'Adab Menuntut Ilmu'}”_
🕌 *Imam:* ${nextFriday.nama_imam || '-'}
📢 *Bilal & Azan:* ${nextFriday.nama_bilal || '-'}

_Mari hadir lebih awal, menjaga shaf tetap rapat, dan menonaktifkan suara ponsel demi kekhusyukan ibadah bersama._

Jazakumullahu khairan katsiran.
*Pengurus DKM / Takmir ${m.nama}*`;

  navigator.clipboard.writeText(waText).then(() => {
    showToast('Teks broadcast WhatsApp berhasil disalin ke clipboard! Siap ditempel.', 'success');
  }).catch(() => {
    // Fallback manual copy
    prompt('Salin teks broadcast WhatsApp di bawah ini:', waText);
  });
}

// =========================================================================
// 10. AUTHENTICATION & LOGIN DIALOG
// =========================================================================
function openLoginModal() {
  document.getElementById('modal-login').classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('modal-login').classList.add('hidden');
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const pinInput = document.getElementById('login-pin').value;
  const phoneInput = document.getElementById('login-phone').value;

  const btnSubmit = document.getElementById('btn-login-submit');
  btnSubmit.disabled = true;
  btnSubmit.textContent = 'Memverifikasi...';

  const res = await callApi('loginAdmin', { pin: pinInput, phone: phoneInput });
  btnSubmit.disabled = false;
  btnSubmit.textContent = 'Masuk ke Dashboard DKM';

  if (res && res.success && res.data) {
    currentToken = res.data.token;
    localStorage.setItem('si_masjid_admin_token', currentToken);
    showToast(res.message, 'success');
    closeLoginModal();
    switchView('admin');
  } else {
    showToast((res && res.message) || 'PIN atau data autentikasi salah', 'error');
  }
}

function handleLogout() {
  currentToken = '';
  localStorage.removeItem('si_masjid_admin_token');
  showToast('Anda telah keluar dari Dashboard DKM', 'info');
  switchView('jamaah');
}

// =========================================================================
// 11. UTILITY HELPERS & TOAST
// =========================================================================
function formatTanggalIndo(dateStr) {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  if (isNaN(d)) return dateStr;
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

function getStatusBadgeClass(status) {
  const s = String(status || '').toLowerCase();
  if (s === 'terkonfirmasi' || s === 'siap') {
    return 'bg-[#164E35] text-[#4ADE80] font-semibold';
  } else if (s === 'berhalangan') {
    return 'bg-[#4C1D1D] text-[#F87171] font-semibold';
  } else {
    return 'bg-[#4D3C08] text-[#FDE047] font-semibold';
  }
}

function getNextFridayDateString() {
  const d = new Date();
  const day = d.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toISOString().split('T')[0];
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  const typeColors = {
    success: 'bg-[#042017] text-[#4ADE80] border border-[#164E35]',
    error: 'bg-[#200407] text-[#F87171] border border-[#4C1D1D]',
    warning: 'bg-[#201704] text-[#FDE047] border border-[#4D3C08]',
    info: 'bg-[#08241B] text-[#CBE9DB] border border-[#1E4D3E]'
  };
  const iconNames = {
    success: 'check_circle',
    error: 'error',
    warning: 'warning',
    info: 'info'
  };

  toast.className = `toast-msg ${typeColors[type] || typeColors.info}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px]">${iconNames[type] || 'info'}</span>
    <span class="flex-1">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// =========================================================================
// 12. PWA SERVICE WORKER & INIT
// =========================================================================
window.addEventListener('load', () => {
  // Registrasi Service Worker PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => console.log('SI-MASJID PWA Registered:', reg.scope))
      .catch(err => console.log('SW registration note:', err.message));
  }

  // PWA Install Prompt Handler
  let deferredPrompt;
  const btnInstall = document.getElementById('btn-pwa-install');
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (btnInstall) btnInstall.style.display = 'inline-flex';
  });

  if (btnInstall) {
    btnInstall.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          btnInstall.style.display = 'none';
        }
        deferredPrompt = null;
      }
    });
  }

  // Init Engine
  renderAllViews();
  startClockEngine();

  // Route initial URL
  const hash = window.location.hash.replace('#', '') || 'tv';
  switchView(hash);

  // Background silent fetch
  syncPublicData();
});

/**
 * =========================================================================
 * SI-MASJID — High-Performance Reactive Client Engine (app.js)
 * =========================================================================
 * Mematuhi Standar:
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
    {
      id_jadwal: "JMT-2026-05-29",
      tanggal_jumat: "2026-05-29",
      id_khotib: "PTG-004",
      nama_khotib: "Ust. Dr. H. M. Ridwan, MA",
      id_imam: "PTG-002",
      nama_imam: "Ust. H. Rahmat Hidayat, Lc",
      id_bilal: "PTG-003",
      nama_bilal: "Ust. Ahmad Fauzi",
      tema_khutbah: "Memakmurkan Masjid di Era Digital",
      status_konfirmasi_khotib: "Menunggu",
      status_konfirmasi_bilal: "Menunggu",
      token_konfirmasi: "tok_demo_2026_05_29"
    },
    {
      id_jadwal: "JMT-2026-06-05",
      tanggal_jumat: "2026-06-05",
      id_khotib: "PTG-001",
      nama_khotib: "Ust. Faris Abdullah, M.Ag",
      id_imam: "PTG-002",
      nama_imam: "Ust. H. Rahmat Hidayat, Lc",
      id_bilal: "PTG-003",
      nama_bilal: "Ust. Ahmad Fauzi",
      tema_khutbah: "Membangun Generasi Rabbani",
      status_konfirmasi_khotib: "Menunggu",
      status_konfirmasi_bilal: "Menunggu",
      token_konfirmasi: "tok_demo_2026_06_05"
    }
  ],
  petugas: [
    { id_petugas: "PTG-001", nama_lengkap: "Ust. Faris Abdullah, M.Ag", spesialisasi: "Khotib & Imam", nomor_wa: "081234567890", asal_lembaga: "MUI Kota / Ponpes Al-Falah", status_aktif: "TRUE", catatan: "Khotib Tetap" },
    { id_petugas: "PTG-002", nama_lengkap: "Ust. H. Rahmat Hidayat, Lc", spesialisasi: "Imam", nomor_wa: "081234567891", asal_lembaga: "Dewan Syariah Masjid", status_aktif: "TRUE", catatan: "Imam Rawatib" },
    { id_petugas: "PTG-003", nama_lengkap: "Ust. Ahmad Fauzi", spesialisasi: "Bilal", nomor_wa: "081234567892", asal_lembaga: "Remaja Islam Masjid", status_aktif: "TRUE", catatan: "Muadzin & Bilal" },
    { id_petugas: "PTG-004", nama_lengkap: "Ust. Dr. H. M. Ridwan, MA", spesialisasi: "Khotib", nomor_wa: "081234567893", asal_lembaga: "UIN Syarif Hidayatullah", status_aktif: "TRUE", catatan: "Dosen Ushuluddin" }
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
  ],
  kas: {
    saldo: 28450000,
    infaq_jumat: 4620000,
    pengeluaran: 1850000,
    bank_nama: "Bank Syariah Indonesia (BSI)",
    nomor_rekening: "7123-4567-8901",
    atas_nama: "Masjid Jami' Al-Hikmah",
    qris_url: "https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=00020101021126590014ID.LINKAJA.WWW01189360091100212345670208123456780303UME5204581253033605802ID5919MASJID%20AL%20HIKMAH6013JAKARTA%20PUSAT61051011062070703A016304A1B2"
  }
};

// Global Memory State
let appState = JSON.parse(localStorage.getItem('si_masjid_cache') || JSON.stringify(DEFAULT_STATE));
if (!appState.kas) appState.kas = DEFAULT_STATE.kas;
let currentToken = localStorage.getItem('si_masjid_admin_token') || '';
let selectedJadwalKonfirmasiId = '';

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
            message: 'Login berhasil!',
            data: { token: currentToken, nama: 'Pengurus DKM', role: 'admin' }
          });
        } else {
          resolve({ success: false, message: 'PIN Keamanan salah! Silakan periksa kembali.' });
        }
      } else if (action === 'confirmPetugas') {
        const isHadir = (data.status === 'Terkonfirmasi' || data.status === 'siap' || data.status === 'hadir');
        const msg = isHadir
          ? 'Alhamdulillah, konfirmasi kesediaan hadir Anda telah tercatat!'
          : 'Pemberitahuan berhalangan hadir telah berhasil dicatat dan diteruskan ke DKM.';
        resolve({ success: true, message: msg });
      } else if (action === 'saveJadwal') {
        // Deteksi Bentrok
        const clash = (appState.schedules || []).find(s => 
          s.tanggal_jumat === data.tanggal_jumat && 
          s.id_khotib === data.id_khotib && 
          s.id_jadwal !== data.id_jadwal
        );
        if (clash) {
          resolve({ success: false, message: `Bentrok! Khotib ${data.nama_khotib} sudah terjadwal pada ${data.tanggal_jumat}.` });
        } else {
          resolve({ success: true, message: 'Jadwal berhasil disimpan bebas bentrok!' });
        }
      } else if (action === 'deleteJadwal') {
        resolve({ success: true, message: 'Jadwal berhasil dihapus.' });
      } else if (action === 'savePetugas') {
        resolve({ success: true, message: 'Data petugas berhasil disimpan!' });
      } else if (action === 'deletePetugas') {
        resolve({ success: true, message: 'Petugas berhasil dihapus.' });
      } else if (action === 'saveKas') {
        resolve({ success: true, message: 'Data kas & QRIS berhasil disimpan!' });
      } else {
        resolve({ success: true, message: 'Operasi berhasil disimpan!' });
      }
    }, 120);
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
  } else if (viewId === 'petugas') {
    renderPetugasConfirmation();
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

  // Deteksi waktu salat tepat & bunyikan bel pengingat adzan
  const currentHHMM = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  const matchedPrayer = prayers.find(p => p.time === currentHHMM);
  if (matchedPrayer && now.getSeconds() === 0) {
    if (lastChimedMinute !== currentHHMM + '-' + matchedPrayer.key) {
      lastChimedMinute = currentHHMM + '-' + matchedPrayer.key;
      playPrayerChime();
      showToast(`Waktu Sholat ${matchedPrayer.name} Telah Masuk!`, 'info');
    }
  }

  // Cek jendela mode khusyuk/blackout sholat berjamaah otomatis
  checkPrayerBlackout(now);
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
  renderKasWidget();
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

// =========================================================================
// 6. ACTION HANDLERS: KONFIRMASI PETUGAS DENGAN STATUS ADAPTIF
// =========================================================================
function renderPetugasConfirmation() {
  const schedules = appState.schedules || [];
  if (schedules.length === 0) return;

  // Populate Schedule Selector Dropdown
  const selector = document.getElementById('conf-jadwal-selector');
  if (selector) {
    selector.innerHTML = schedules.map(s => `
      <option value="${s.id_jadwal}" ${s.id_jadwal === selectedJadwalKonfirmasiId ? 'selected' : ''}>
        Jumat ${formatTanggalIndo(s.tanggal_jumat)} — ${s.nama_khotib}
      </option>
    `).join('');
  }

  // Tentukan jadwal yang sedang aktif dilihat
  let cur = schedules.find(s => s.id_jadwal === selectedJadwalKonfirmasiId);
  if (!cur) {
    cur = appState.next_friday || schedules[0];
    selectedJadwalKonfirmasiId = cur.id_jadwal;
    if (selector) selector.value = cur.id_jadwal;
  }

  const elUstadz = document.getElementById('conf-ustadz-name');
  const elDate = document.getElementById('conf-date');
  const elTheme = document.getElementById('conf-theme');
  const elImam = document.getElementById('conf-imam');
  const elBilal = document.getElementById('conf-bilal');
  const elStatusBadge = document.getElementById('conf-status-badge');
  const peranSelect = document.getElementById('conf-peran-input');
  const badgePeran = document.getElementById('conf-badge-peran');

  const peran = peranSelect ? peranSelect.value : 'khotib';
  const statusAktif = (peran === 'bilal') ? (cur.status_konfirmasi_bilal || 'Menunggu') : (cur.status_konfirmasi_khotib || 'Menunggu');

  if (elUstadz) elUstadz.textContent = (peran === 'bilal') ? cur.nama_bilal : cur.nama_khotib;
  if (elDate) elDate.textContent = formatTanggalIndo(cur.tanggal_jumat);
  if (elTheme) elTheme.textContent = `“${cur.tema_khutbah || 'Tema Khutbah'}”`;
  if (elImam) elImam.textContent = cur.nama_imam || '-';
  if (elBilal) elBilal.textContent = cur.nama_bilal || '-';
  if (badgePeran) badgePeran.textContent = (peran === 'bilal') ? 'Bilal' : 'Khotib';

  // Update Status Badge di Header
  if (elStatusBadge) {
    elStatusBadge.className = `px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap ${getStatusBadgeClass(statusAktif)}`;
    elStatusBadge.textContent = statusAktif;
  }

  // Jika status sudah Terkonfirmasi atau Berhalangan, tampilkan receipt yang sesuai
  const formCard = document.getElementById('conf-form-card');
  const receiptReady = document.getElementById('conf-receipt-ready');
  const receiptAbsent = document.getElementById('conf-receipt-absent');

  if (statusAktif === 'Terkonfirmasi') {
    formCard?.classList.add('hidden');
    receiptReady?.classList.remove('hidden');
    receiptAbsent?.classList.add('hidden');
  } else if (statusAktif === 'Berhalangan') {
    formCard?.classList.add('hidden');
    receiptReady?.classList.add('hidden');
    receiptAbsent?.classList.remove('hidden');
  } else {
    // Masih 'Menunggu' -> Tampilkan form
    formCard?.classList.remove('hidden');
    receiptReady?.classList.add('hidden');
    receiptAbsent?.classList.add('hidden');
  }
}

function onSelectJadwalKonfirmasi(idJadwal) {
  selectedJadwalKonfirmasiId = idJadwal;
  renderPetugasConfirmation();
}

function onConfPeranChange() {
  renderPetugasConfirmation();
}

function reopenConfForm() {
  document.getElementById('conf-receipt-ready')?.classList.add('hidden');
  document.getElementById('conf-receipt-absent')?.classList.add('hidden');
  document.getElementById('conf-form-card')?.classList.remove('hidden');
}

async function submitKonfirmasiPetugas(status) {
  const schedules = appState.schedules || [];
  const cur = schedules.find(s => s.id_jadwal === selectedJadwalKonfirmasiId) || appState.next_friday || schedules[0];
  if (!cur) return;

  const peranSelect = document.getElementById('conf-peran-input');
  const peran = peranSelect ? peranSelect.value : 'khotib';
  const catatan = document.getElementById('conf-catatan-input')?.value || '';

  const token = cur.token_konfirmasi || 'tok_demo';

  const res = await callApi('confirmPetugas', {
    token: token,
    status: status,
    peran: peran,
    catatan: catatan
  });

  if (res && res.success) {
    const isHadir = (status === 'Terkonfirmasi' || status === 'siap' || status === 'hadir');
    const toastType = isHadir ? 'success' : 'warning';
    const toastMsg = isHadir
      ? (res.message || 'Alhamdulillah, konfirmasi kesediaan hadir Anda telah tercatat!')
      : 'Pemberitahuan berhalangan hadir telah dicatat dan diteruskan ke DKM.';

    showToast(toastMsg, toastType);

    // Optimistic Update lokal
    if (peran === 'bilal') {
      cur.status_konfirmasi_bilal = status;
    } else {
      cur.status_konfirmasi_khotib = status;
    }
    if (catatan) cur.catatan = catatan;

    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));

    // Sembunyikan form
    document.getElementById('conf-form-card')?.classList.add('hidden');

    // Tampilkan receipt yang SESUAI DENGAN STATUS
    if (status === 'Terkonfirmasi') {
      document.getElementById('conf-receipt-ready')?.classList.remove('hidden');
      document.getElementById('conf-receipt-absent')?.classList.add('hidden');
    } else {
      document.getElementById('conf-receipt-ready')?.classList.add('hidden');
      document.getElementById('conf-receipt-absent')?.classList.remove('hidden');
      const noteBox = document.getElementById('conf-receipt-note-box');
      if (noteBox) {
        if (catatan) {
          noteBox.classList.remove('hidden');
          noteBox.innerHTML = `<b>Catatan Anda:</b> “${catatan}”`;
        } else {
          noteBox.classList.add('hidden');
        }
      }
    }

    renderAllViews();
    loadAdminDashboard();
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

  tbody.innerHTML = list.map((j) => `
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
        <button onclick="openWaReminderMenu('${j.id_jadwal}')" class="px-2.5 py-1 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-800 hover:text-white text-xs transition-colors font-medium cursor-pointer" title="Kirim Pengingat WhatsApp Petugas">
          📲 WA
        </button>
        <button onclick="editJadwalModal('${j.id_jadwal}')" class="px-2.5 py-1 rounded bg-surface-container-highest text-primary hover:bg-surface-container hover:text-primary-fixed text-xs transition-colors font-medium">
          Edit
        </button>
        <button onclick="deleteJadwalItem('${j.id_jadwal}')" class="px-2.5 py-1 rounded bg-surface-container-highest text-error hover:bg-error-container hover:text-white text-xs transition-colors font-medium">
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
  if (list.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-outline">Belum ada data petugas. Klik "Tambah Petugas Baru".</td></tr>`;
    return;
  }

  tbody.innerHTML = list.map((p) => `
    <tr class="border-b border-surface-container-highest hover:bg-surface-container-high/30 transition-colors">
      <td class="py-3 px-4 font-semibold text-on-surface whitespace-nowrap">${p.nama_lengkap}</td>
      <td class="py-3 px-4 text-xs text-primary whitespace-nowrap font-medium">${p.spesialisasi}</td>
      <td class="py-3 px-4 text-xs font-mono text-secondary whitespace-nowrap">${p.nomor_wa || '-'}</td>
      <td class="py-3 px-4 text-xs text-on-surface-variant">${p.asal_lembaga || '-'}</td>
      <td class="py-3 px-4 text-xs whitespace-nowrap">
        <span class="px-2 py-0.5 rounded-full ${p.status_aktif === 'FALSE' ? 'bg-red-950 text-red-400' : 'bg-emerald-950 text-emerald-400'} font-semibold">
          ${p.status_aktif === 'FALSE' ? 'Non-Aktif' : 'Aktif'}
        </span>
      </td>
      <td class="py-3 px-4 text-right whitespace-nowrap space-x-1">
        <button onclick="editPetugasModal('${p.id_petugas}')" class="px-2.5 py-1 rounded bg-surface-container-highest text-primary hover:bg-surface-container hover:text-primary-fixed text-xs transition-colors font-medium">
          Edit
        </button>
        <button onclick="deletePetugasItem('${p.id_petugas}')" class="px-2.5 py-1 rounded bg-surface-container-highest text-error hover:bg-error-container hover:text-white text-xs transition-colors font-medium">
          Hapus
        </button>
      </td>
    </tr>
  `).join('');
}

// =========================================================================
// 8. FORM JADWAL PINTAR & DETEKSI BENTROK REAL-TIME
// =========================================================================
function setQuickDate(weeksAhead = 0) {
  const d = new Date();
  const day = d.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff + (weeksAhead * 7));
  const dateStr = d.toISOString().split('T')[0];
  const inpTanggal = document.getElementById('inp-tanggal');
  if (inpTanggal) {
    inpTanggal.value = dateStr;
    checkClashRealtime();
  }
}

function openModalJadwal(idJadwal = null) {
  const modal = document.getElementById('modal-jadwal');
  const alertClash = document.getElementById('clash-warning-box');
  const title = document.getElementById('modal-jadwal-title');
  if (alertClash) alertClash.classList.add('hidden');

  // Isi dropdown petugas
  const selectKhotib = document.getElementById('inp-khotib');
  const selectImam = document.getElementById('inp-imam');
  const selectBilal = document.getElementById('inp-bilal');

  const activePetugas = (appState.petugas || []).filter(p => p.status_aktif !== 'FALSE');
  const optionsHtml = activePetugas.map(p => `
    <option value="${p.id_petugas}" data-nama="${p.nama_lengkap}">${p.nama_lengkap} (${p.spesialisasi})</option>
  `).join('');

  if (selectKhotib) selectKhotib.innerHTML = `<option value="">-- Pilih Khotib --</option>` + optionsHtml;
  if (selectImam) selectImam.innerHTML = `<option value="">-- Pilih Imam --</option>` + optionsHtml;
  if (selectBilal) selectBilal.innerHTML = `<option value="">-- Pilih Bilal --</option>` + optionsHtml;

  if (idJadwal) {
    // Mode EDIT
    if (title) title.innerHTML = `<span class="material-symbols-outlined text-primary">edit</span><span>Edit Jadwal Petugas Jumat</span>`;
    const item = (appState.schedules || []).find(s => s.id_jadwal === idJadwal);
    if (item) {
      document.getElementById('inp-id-jadwal').value = item.id_jadwal;
      document.getElementById('inp-tanggal').value = item.tanggal_jumat;
      document.getElementById('inp-tema').value = item.tema_khutbah || '';
      if (selectKhotib) selectKhotib.value = item.id_khotib;
      if (selectImam) selectImam.value = item.id_imam;
      if (selectBilal) selectBilal.value = item.id_bilal;
      if (document.getElementById('inp-status-khotib')) {
        document.getElementById('inp-status-khotib').value = item.status_konfirmasi_khotib || 'Menunggu';
      }
      if (document.getElementById('inp-status-bilal')) {
        document.getElementById('inp-status-bilal').value = item.status_konfirmasi_bilal || 'Menunggu';
      }
    }
  } else {
    // Mode TAMBAH BARU
    if (title) title.innerHTML = `<span class="material-symbols-outlined text-primary">add_circle</span><span>Tambah Jadwal Petugas Jumat</span>`;
    document.getElementById('inp-id-jadwal').value = '';
    document.getElementById('inp-tema').value = '';
    if (selectKhotib) selectKhotib.value = '';
    if (selectImam) selectImam.value = '';
    if (selectBilal) selectBilal.value = '';
    if (document.getElementById('inp-status-khotib')) document.getElementById('inp-status-khotib').value = 'Menunggu';
    if (document.getElementById('inp-status-bilal')) document.getElementById('inp-status-bilal').value = 'Menunggu';

    // Set tanggal default ke Jumat terdekat
    setQuickDate(0);
  }

  modal?.classList.remove('hidden');
}

// Alias untuk tombol Edit di tabel
function editJadwalModal(idJadwal) {
  openModalJadwal(idJadwal);
}

function checkClashRealtime() {
  const tanggal = document.getElementById('inp-tanggal')?.value;
  const selectKhotib = document.getElementById('inp-khotib');
  const idKhotib = selectKhotib ? selectKhotib.value : '';
  const currentId = document.getElementById('inp-id-jadwal')?.value;
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
      alertClash.innerHTML = `⚠️ <b>Peringatan Bentrok:</b> Khotib ini sudah dijadwalkan pada Jumat ${formatTanggalIndo(tanggal)}!`;
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

  const idJadwalInput = document.getElementById('inp-id-jadwal')?.value;
  const tanggal = document.getElementById('inp-tanggal')?.value;

  if (!tanggal || !selectKhotib.value) {
    showToast('Tanggal Jumat dan Khotib wajib dipilih!', 'warning');
    return;
  }

  const payload = {
    id_jadwal: idJadwalInput || ('JMT-' + tanggal),
    tanggal_jumat: tanggal,
    id_khotib: selectKhotib.value,
    nama_khotib: selectKhotib.options[selectKhotib.selectedIndex]?.getAttribute('data-nama') || selectKhotib.value,
    id_imam: selectImam.value,
    nama_imam: selectImam.options[selectImam.selectedIndex]?.getAttribute('data-nama') || '',
    id_bilal: selectBilal.value,
    nama_bilal: selectBilal.options[selectBilal.selectedIndex]?.getAttribute('data-nama') || '',
    tema_khutbah: document.getElementById('inp-tema')?.value || '',
    status_konfirmasi_khotib: document.getElementById('inp-status-khotib')?.value || 'Menunggu',
    status_konfirmasi_bilal: document.getElementById('inp-status-bilal')?.value || 'Menunggu',
    token_konfirmasi: 'tok_' + tanggal.replace(/-/g, '_')
  };

  const btnSubmit = document.getElementById('btn-save-jadwal');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Menyimpan...';
  }

  const res = await callApi('saveJadwal', payload);
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Simpan Jadwal Bebas Bentrok';
  }

  if (res && res.success) {
    showToast(res.message, 'success');
    document.getElementById('modal-jadwal')?.classList.add('hidden');

    // Optimistic Update Lokal
    if (!appState.schedules) appState.schedules = [];
    const existingIdx = appState.schedules.findIndex(s => s.id_jadwal === payload.id_jadwal);
    if (existingIdx > -1) {
      appState.schedules[existingIdx] = { ...appState.schedules[existingIdx], ...payload };
    } else {
      appState.schedules.push(payload);
    }

    // Urutkan jadwal berdasarkan tanggal
    appState.schedules.sort((a, b) => String(a.tanggal_jumat).localeCompare(String(b.tanggal_jumat)));

    // Update jadwal terdekat
    const today = new Date().toISOString().split('T')[0];
    const upcoming = appState.schedules.filter(s => s.tanggal_jumat >= today);
    appState.next_friday = upcoming.length > 0 ? upcoming[0] : appState.schedules[0];

    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAllViews();
    loadAdminDashboard();
  } else {
    showToast((res && res.message) || 'Gagal menyimpan jadwal', 'error');
  }
}

async function deleteJadwalItem(idJadwal) {
  if (!confirm('Apakah Anda yakin ingin menghapus jadwal Jumat ini?')) return;
  const res = await callApi('deleteJadwal', { id_jadwal: idJadwal });
  if (res && res.success) {
    showToast(res.message || 'Jadwal berhasil dihapus.', 'success');
    appState.schedules = (appState.schedules || []).filter(s => s.id_jadwal !== idJadwal);
    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAllViews();
    loadAdminDashboard();
  } else {
    showToast((res && res.message) || 'Gagal menghapus', 'error');
  }
}

// =========================================================================
// 8.B. CRUD MASTER DATA PETUGAS (Khotib & Bilal)
// =========================================================================
function openModalPetugas(idPetugas = null) {
  const modal = document.getElementById('modal-petugas');
  const title = document.getElementById('modal-petugas-title');
  const form = document.getElementById('form-petugas');

  if (idPetugas) {
    // Mode EDIT
    if (title) title.innerHTML = `<span class="material-symbols-outlined text-primary">edit</span><span>Edit Data Petugas</span>`;
    const p = (appState.petugas || []).find(x => x.id_petugas === idPetugas);
    if (p) {
      document.getElementById('petugas-id').value = p.id_petugas;
      document.getElementById('petugas-nama').value = p.nama_lengkap || '';
      document.getElementById('petugas-peran').value = p.spesialisasi || 'Khotib';
      document.getElementById('petugas-wa').value = p.nomor_wa || '';
      document.getElementById('petugas-asal').value = p.asal_lembaga || '';
      document.getElementById('petugas-status').value = p.status_aktif || 'TRUE';
      document.getElementById('petugas-catatan').value = p.catatan || '';
    }
  } else {
    // Mode TAMBAH BARU
    if (title) title.innerHTML = `<span class="material-symbols-outlined text-primary">person_add</span><span>Tambah Petugas Baru</span>`;
    form?.reset();
    document.getElementById('petugas-id').value = '';
    document.getElementById('petugas-status').value = 'TRUE';
  }

  modal?.classList.remove('hidden');
}

function editPetugasModal(idPetugas) {
  openModalPetugas(idPetugas);
}

async function handleSavePetugasSubmit(e) {
  e.preventDefault();
  const idPetugas = document.getElementById('petugas-id')?.value;
  const nama = document.getElementById('petugas-nama')?.value.trim();
  const peran = document.getElementById('petugas-peran')?.value;
  const wa = document.getElementById('petugas-wa')?.value.trim();
  const asal = document.getElementById('petugas-asal')?.value.trim();
  const status = document.getElementById('petugas-status')?.value;
  const catatan = document.getElementById('petugas-catatan')?.value.trim();

  if (!nama || !wa) {
    showToast('Nama lengkap dan nomor WhatsApp wajib diisi!', 'warning');
    return;
  }

  const payload = {
    id_petugas: idPetugas || ('PTG-' + Date.now().toString(36).toUpperCase()),
    nama_lengkap: nama,
    spesialisasi: peran,
    nomor_wa: wa,
    asal_lembaga: asal,
    status_aktif: status,
    catatan: catatan
  };

  const btnSubmit = document.getElementById('btn-save-petugas');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Menyimpan...';
  }

  const res = await callApi('savePetugas', payload);
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Simpan Data Petugas';
  }

  if (res && res.success) {
    showToast(res.message || 'Data petugas berhasil disimpan!', 'success');
    document.getElementById('modal-petugas')?.classList.add('hidden');

    // Optimistic Update Lokal
    if (!appState.petugas) appState.petugas = [];
    const idx = appState.petugas.findIndex(p => p.id_petugas === payload.id_petugas);
    if (idx > -1) {
      appState.petugas[idx] = { ...appState.petugas[idx], ...payload };
    } else {
      appState.petugas.push(payload);
    }

    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAdminPetugasTable();
    loadAdminDashboard();
  } else {
    showToast((res && res.message) || 'Gagal menyimpan petugas', 'error');
  }
}

async function deletePetugasItem(idPetugas) {
  const p = (appState.petugas || []).find(x => x.id_petugas === idPetugas);
  const nama = p ? p.nama_lengkap : 'petugas ini';

  if (!confirm(`Apakah Anda yakin ingin menghapus ${nama} dari daftar petugas?`)) return;

  const res = await callApi('deletePetugas', { id_petugas: idPetugas });
  if (res && res.success) {
    showToast(res.message || 'Petugas berhasil dihapus.', 'success');
    appState.petugas = (appState.petugas || []).filter(x => x.id_petugas !== idPetugas);
    localStorage.setItem('si_masjid_cache', JSON.stringify(appState));
    renderAdminPetugasTable();
    loadAdminDashboard();
  } else {
    showToast((res && res.message) || 'Gagal menghapus petugas', 'error');
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
    prompt('Salin teks broadcast WhatsApp di bawah ini:', waText);
  });
}

// =========================================================================
// 10. AUTHENTICATION & LOGIN DIALOG
// =========================================================================
function openLoginModal() {
  document.getElementById('modal-login')?.classList.remove('hidden');
}

function closeLoginModal() {
  document.getElementById('modal-login')?.classList.add('hidden');
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const pinInput = document.getElementById('login-pin')?.value;
  const phoneInput = document.getElementById('login-phone')?.value;

  const btnSubmit = document.getElementById('btn-login-submit');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Memverifikasi...';
  }

  const res = await callApi('loginAdmin', { pin: pinInput, phone: phoneInput });
  if (btnSubmit) {
    btnSubmit.disabled = false;
    btnSubmit.textContent = 'Masuk ke Dashboard DKM';
  }

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
  if (s === 'terkonfirmasi' || s === 'siap' || s === 'hadir') {
    return 'bg-[#164E35] text-[#4ADE80] font-semibold';
  } else if (s === 'berhalangan') {
    return 'bg-[#4C1D1D] text-[#F87171] font-semibold';
  } else {
    return 'bg-[#4D3C08] text-[#FDE047] font-semibold';
  }
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
// 10.B. AUDIO ENGINE: WEB AUDIO API (Bel Pengingat Adzan & Iqomah)
// =========================================================================
let audioCtx = null;
let isSoundEnabled = localStorage.getItem('si_masjid_sound') !== 'false';
let lastChimedMinute = '';

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function updateSoundUI() {
  const iconSound = document.getElementById('icon-sound');
  const textSound = document.getElementById('text-sound');
  const btnSound = document.getElementById('btn-sound-toggle');

  if (iconSound) {
    iconSound.textContent = isSoundEnabled ? 'volume_up' : 'volume_off';
    iconSound.className = isSoundEnabled
      ? 'material-symbols-outlined text-primary text-[18px]'
      : 'material-symbols-outlined text-outline text-[18px]';
  }
  if (textSound) {
    textSound.textContent = isSoundEnabled ? 'Suara Aktif' : 'Suara Mute';
  }
  if (btnSound) {
    if (isSoundEnabled) {
      btnSound.classList.remove('opacity-60');
      btnSound.classList.add('border-primary');
    } else {
      btnSound.classList.add('opacity-60');
      btnSound.classList.remove('border-primary');
    }
  }
}

function toggleSound() {
  isSoundEnabled = !isSoundEnabled;
  localStorage.setItem('si_masjid_sound', isSoundEnabled ? 'true' : 'false');
  updateSoundUI();

  if (isSoundEnabled) {
    getAudioContext();
    // Bunyikan nada pembuka lembut sebagai konfirmasi aktif
    playTone(523.25, 0.4, 'sine', 0.15);
    showToast('Suara Pengingat Masuk Waktu Salat Diaktifkan', 'success');
  } else {
    showToast('Suara Pengingat Masuk Waktu Salat Dinonaktifkan (Mute)', 'info');
  }
}

// Sintesis nada tunggal dengan ADSR Envelope halus
function playTone(freq, duration = 0.5, type = 'sine', gainLevel = 0.2, startTimeOffset = 0) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + startTimeOffset;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    // Natural bell/chime decay curve
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(gainLevel, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.05);
  } catch (err) {
    console.warn('Audio playTone note:', err);
  }
}

// Melodic Multi-Tone Prayer Chime (Harmonic Bell sequence)
function playPrayerChime() {
  if (!isSoundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Harmonic chime sequence: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.50) + resonance
    const notes = [
      { freq: 523.25, offset: 0.0, dur: 1.2 },
      { freq: 659.25, offset: 0.4, dur: 1.2 },
      { freq: 783.99, offset: 0.8, dur: 1.4 },
      { freq: 1046.50, offset: 1.2, dur: 2.5 }
    ];

    notes.forEach(n => {
      playTone(n.freq, n.dur, 'sine', 0.25, n.offset);
      // Soft overtone untuk nuansa genta perunggu hangat
      playTone(n.freq * 2, n.dur * 0.7, 'triangle', 0.08, n.offset);
    });
  } catch (err) {
    console.warn('Prayer chime note:', err);
  }
}

// Short beep untuk hitung mundur Iqomah
function playIqomahBeep() {
  if (!isSoundEnabled) return;
  playTone(880, 0.15, 'square', 0.1);
}

// =========================================================================
// 10.C. MODE KHUSYUK / BLACKOUT SAAT SHOLAT
// =========================================================================
let isManualBlackoutDismissed = false;

function toggleBlackout(show) {
  const el = document.getElementById('tv-blackout-screen');
  if (!el) return;
  if (show) {
    el.classList.remove('hidden');
    isManualBlackoutDismissed = false;
  } else {
    el.classList.add('hidden');
    isManualBlackoutDismissed = true;
  }
}

function checkPrayerBlackout(now) {
  if (isManualBlackoutDismissed) return;
  const pt = appState.prayer_times || DEFAULT_STATE.prayer_times;
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const prayerKeys = ['subuh', 'dzuhur', 'ashar', 'maghrib', 'isya'];

  let activeSholat = null;
  let elapsedMinutes = 0;

  for (let k of prayerKeys) {
    if (!pt[k]) continue;
    const [h, m] = pt[k].split(':').map(Number);
    const pMinutes = h * 60 + m;
    // Jendela 15 menit salat berjamaah
    if (currentMinutes >= pMinutes && currentMinutes < pMinutes + 15) {
      activeSholat = k;
      elapsedMinutes = currentMinutes - pMinutes;
      break;
    }
  }

  const blackoutScreen = document.getElementById('tv-blackout-screen');
  const blackoutTimer = document.getElementById('tv-blackout-timer');

  if (activeSholat) {
    const remaining = 15 - elapsedMinutes;
    if (blackoutScreen) blackoutScreen.classList.remove('hidden');
    if (blackoutTimer) {
      blackoutTimer.textContent = `Sholat ${activeSholat.toUpperCase()} Sedang Berlangsung (± ${remaining} mnt lagi)`;
    }
  } else {
    if (!isManualBlackoutDismissed && blackoutScreen && !blackoutScreen.classList.contains('hidden')) {
      blackoutScreen.classList.add('hidden');
    }
  }
}

// =========================================================================
// 10.D. TRANSPARANSI KAS & QRIS INFAQ
// =========================================================================
function renderKasWidget() {
  const kas = appState.kas || DEFAULT_STATE.kas;

  const elSaldo = document.getElementById('jm-saldo-kas');
  const elInfaq = document.getElementById('jm-infaq-jumat');
  const elPengeluaran = document.getElementById('jm-pengeluaran');

  if (elSaldo) elSaldo.textContent = formatRupiah(kas.saldo);
  if (elInfaq) elInfaq.textContent = formatRupiah(kas.infaq_jumat);
  if (elPengeluaran) elPengeluaran.textContent = formatRupiah(kas.pengeluaran);
}

function formatRupiah(num) {
  if (num === undefined || num === null) return 'Rp 0';
  const val = Number(num);
  if (val >= 1000000) {
    const jt = (val / 1000000).toLocaleString('id-ID', { maximumFractionDigits: 1 });
    return `Rp ${jt} jt`;
  }
  return 'Rp ' + val.toLocaleString('id-ID');
}

function openQrisModal() {
  const kas = appState.kas || DEFAULT_STATE.kas;
  const m = appState.masjid || DEFAULT_STATE.masjid;

  const modal = document.getElementById('modal-qris');
  if (!modal) return;

  const qrisImg = document.getElementById('qris-image-src');
  const qrisBank = document.getElementById('qris-bank-nama');
  const qrisNorek = document.getElementById('qris-norek');
  const qrisAtasNama = document.getElementById('qris-atas-nama');
  const btnWa = document.getElementById('btn-wa-konfirmasi-donasi');

  if (qrisImg && kas.qris_url) qrisImg.src = kas.qris_url;
  if (qrisBank) qrisBank.textContent = kas.bank_nama || 'Bank Syariah Indonesia (BSI)';
  if (qrisNorek) qrisNorek.textContent = kas.nomor_rekening || '7123-4567-8901';
  if (qrisAtasNama) qrisAtasNama.textContent = 'a.n. ' + (kas.atas_nama || m.nama);

  if (btnWa) {
    const waPhone = (m.telepon || '0812-3456-7890').replace(/[^0-9]/g, '');
    const cleanPhone = waPhone.startsWith('0') ? '62' + waPhone.slice(1) : waPhone;
    const msg = encodeURIComponent(`Assalamualaikum Pengurus ${m.nama}, alhamdulillah saya telah menyalurkan infaq/sedekah melalui transfer/QRIS.`);
    btnWa.href = `https://wa.me/${cleanPhone}?text=${msg}`;
  }

  modal.classList.remove('hidden');
}

function closeQrisModal() {
  const modal = document.getElementById('modal-qris');
  if (modal) modal.classList.add('hidden');
}

function copyAccountNumber() {
  const kas = appState.kas || DEFAULT_STATE.kas;
  const norekClean = (kas.nomor_rekening || '712345678901').replace(/[^0-9]/g, '');
  navigator.clipboard.writeText(norekClean).then(() => {
    showToast('Nomor rekening berhasil disalin ke clipboard!', 'success');
  }).catch(() => {
    showToast('Gagal menyalin nomor rekening.', 'warning');
  });
}

function openModalKas() {
  const kas = appState.kas || DEFAULT_STATE.kas;
  document.getElementById('input-kas-saldo').value = kas.saldo || '';
  document.getElementById('input-kas-infaq').value = kas.infaq_jumat || '';
  document.getElementById('input-kas-pengeluaran').value = kas.pengeluaran || '';
  document.getElementById('input-bank-nama').value = kas.bank_nama || '';
  document.getElementById('input-bank-rekening').value = kas.nomor_rekening || '';
  document.getElementById('input-bank-atasnama').value = kas.atas_nama || '';
  document.getElementById('input-qris-url').value = kas.qris_url || '';

  document.getElementById('modal-kas').classList.remove('hidden');
}

async function handleSaveKasSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-save-kas');
  if (btn) btn.disabled = true;

  const newKas = {
    saldo: Number(document.getElementById('input-kas-saldo').value) || 0,
    infaq_jumat: Number(document.getElementById('input-kas-infaq').value) || 0,
    pengeluaran: Number(document.getElementById('input-kas-pengeluaran').value) || 0,
    bank_nama: document.getElementById('input-bank-nama').value.trim(),
    nomor_rekening: document.getElementById('input-bank-rekening').value.trim(),
    atas_nama: document.getElementById('input-bank-atasnama').value.trim(),
    qris_url: document.getElementById('input-qris-url').value.trim()
  };

  appState.kas = newKas;
  localStorage.setItem('si_masjid_cache', JSON.stringify(appState));

  renderKasWidget();
  document.getElementById('modal-kas').classList.add('hidden');
  showToast('Data Kas & Infaq Masjid berhasil diperbarui!', 'success');

  // Silent sync ke backend
  await callApi('saveKas', newKas);
  if (btn) btn.disabled = false;
}

// =========================================================================
// 10.E. WHATSAPP AUTOMATION & REMINDER ENGINE
// =========================================================================
let currentRemindJadwal = null;

function openWaReminderMenu(idJadwal) {
  const j = (appState.schedules || []).find(s => s.id_jadwal === idJadwal);
  if (!j) return;

  currentRemindJadwal = j;
  document.getElementById('wa-remind-jadwal-id').value = j.id_jadwal;
  document.getElementById('wa-remind-date').textContent = formatTanggalIndo(j.tanggal_jumat);
  document.getElementById('wa-remind-khotib').textContent = j.nama_khotib;
  document.getElementById('wa-remind-bilal').textContent = j.nama_bilal || '-';

  generateWaReminderPreview();
  document.getElementById('modal-wa-reminder').classList.remove('hidden');
}

function generateWaReminderPreview() {
  if (!currentRemindJadwal) return;
  const m = appState.masjid || DEFAULT_STATE.masjid;
  const j = currentRemindJadwal;
  const target = document.getElementById('wa-remind-target').value;
  const template = document.getElementById('wa-remind-template').value;

  const namaPetugas = (target === 'khotib') ? j.nama_khotib : (j.nama_bilal || 'Ustadz');
  const peran = (target === 'khotib') ? 'Khotib & Imam Sholat Jumat' : 'Bilal & Muadzin Jumat';
  const tglIndo = formatTanggalIndo(j.tanggal_jumat);
  const konfirmasiUrl = `${window.location.origin}${window.location.pathname}#petugas?id=${j.id_jadwal}`;

  let pesan = '';

  if (template === 'h-7') {
    pesan = `*PENGINGAT JADWAL JUMAT (H-7)*\n` +
      `Kepada Yth. *${namaPetugas}*\n\n` +
      `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\n` +
      `Semoga Ustadz sekeluarga senantiasa dalam limpahan rahmat dan kesehatan dari Allah SWT.\n\n` +
      `Kami dari Pengurus *${m.nama}* mengingatkan amanah jadwal ibadah Sholat Jumat pekan depan:\n` +
      `📅 *Hari/Tanggal:* ${tglIndo}\n` +
      `👤 *Amanah:* ${peran}\n` +
      (j.tema_khutbah ? `📖 *Tema Khutbah:* "${j.tema_khutbah}"\n` : '') +
      `🕌 *Tempat:* ${m.nama}\n\n` +
      `Mohon perkenan Ustadz untuk mengonfirmasi kehadiran lebih awal melalui tautan berikut:\n` +
      `🔗 ${konfirmasiUrl}\n\n` +
      `Atas perhatian dan kesediaan Ustadz, kami haturkan jazakumullah khairan katsiran.\n\n` +
      `_Wassalamu'alaikum Warahmatullahi Wabarakatuh_\n` +
      `*Pengurus DKM ${m.nama}*`;
  } else if (template === 'h-3') {
    pesan = `*PENGINGAT KESIAPAN JADWAL JUMAT (H-3)*\n` +
      `Kepada Yth. *${namaPetugas}*\n\n` +
      `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\n` +
      `Mengingatkan kembali amanah ibadah Sholat Jumat 3 hari lagi di *${m.nama}*:\n` +
      `📅 *Tanggal:* ${tglIndo}\n` +
      `👤 *Tugas:* ${peran}\n` +
      (j.tema_khutbah ? `📖 *Tema:* "${j.tema_khutbah}"\n` : '') +
      `\nMohon kesediaan Ustadz memastikan kesiapan kehadiran melalui sistem SI-MASJID:\n` +
      `🔗 ${konfirmasiUrl}\n\n` +
      `Apabila ada udzur syar'i, mohon dapat mengabari kami sesegera mungkin agar dapat disiapkan badal.\n\n` +
      `*DKM ${m.nama}*`;
  } else if (template === 'h-1') {
    pesan = `*PENGINGAT KEHADIRAN SHOLAT JUMAT (ESOK HARI)*\n` +
      `Kepada Yth. *${namaPetugas}*\n\n` +
      `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\n` +
      `Insya Allah esok hari Jumat, ${tglIndo}, Ustadz bertugas sebagai *${peran}* di *${m.nama}*.\n\n` +
      `Waktu adzan Dzuhur Jumat diperkirakan pukul ${appState.prayer_times?.dzuhur || '11:54'} WIB. Mohon berkenan hadir di ruang transit Masjid paling lambat 20-30 menit sebelum adzan berkumandang.\n\n` +
      `Tautan Jadwal & Konfirmasi:\n🔗 ${konfirmasiUrl}\n\n` +
      `Jazakumullah khairan. Sampai bertemu esok hari, Ustadz. Barakallahu fikum.\n\n` +
      `*DKM ${m.nama}*`;
  } else if (template === 'badal') {
    pesan = `*PERMOHONAN AMANAH PETUGAS BADAL JUMAT*\n` +
      `Kepada Yth. *${namaPetugas}*\n\n` +
      `Assalamu'alaikum Warahmatullahi Wabarakatuh.\n\n` +
      `Sehubungan dengan adanya udzur syar'i dari petugas utama pada Sholat Jumat tanggal *${tglIndo}*, kami dari Pengurus *${m.nama}* dengan penuh hormat memohon kesediaan Ustadz untuk berkenan menjadi *Petugas Badal (${peran})*.\n\n` +
      `Mohon konfirmasi kesediaan Ustadz melalui tautan:\n🔗 ${konfirmasiUrl}\n` +
      `Atau langsung membalas pesan WhatsApp ini.\n\n` +
      `Jazakumullah khairan atas kesediaan dan keikhlasan Ustadz memakmurkan rumah Allah.\n\n` +
      `*DKM ${m.nama}*`;
  }

  const previewEl = document.getElementById('wa-remind-preview');
  if (previewEl) previewEl.value = pesan;
}

function dispatchWaReminder() {
  if (!currentRemindJadwal) return;
  const target = document.getElementById('wa-remind-target').value;
  const targetId = (target === 'khotib') ? currentRemindJadwal.id_khotib : currentRemindJadwal.id_bilal;

  let phone = '';
  const petugas = (appState.petugas || []).find(p => p.id_petugas === targetId || p.nama_lengkap === (target === 'khotib' ? currentRemindJadwal.nama_khotib : currentRemindJadwal.nama_bilal));
  if (petugas && petugas.nomor_wa) {
    phone = petugas.nomor_wa.replace(/[^0-9]/g, '');
    if (phone.startsWith('0')) phone = '62' + phone.slice(1);
  }

  const pesan = document.getElementById('wa-remind-preview').value;
  const encodedText = encodeURIComponent(pesan);
  const waUrl = phone
    ? `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`
    : `https://api.whatsapp.com/send?text=${encodedText}`;

  window.open(waUrl, '_blank');
  document.getElementById('modal-wa-reminder').classList.add('hidden');
  showToast('Pengingat WhatsApp berhasil dibuka di tab baru!', 'success');
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

  // Inisialisasi UI & Engine
  updateSoundUI();
  renderAllViews();
  startClockEngine();

  // Route initial URL
  const hash = window.location.hash.replace('#', '') || 'tv';
  switchView(hash);

  // Background silent fetch
  syncPublicData();
});

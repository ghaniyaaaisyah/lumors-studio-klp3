// =========================================================
// LUMORA Studio - script.js (Software Engineer)
// Rumus: harga paket x durasi jam - diskon kode promo
// =========================================================

const KODE_PROMO = "ABISDIG3";
const PERSEN_DISKON = 20;
const JAM_MAKSIMAL = 24;

const pilihPaket = document.getElementById("paket");
const inputDurasi = document.getElementById("durasi");
const inputPromo = document.getElementById("promo");
const tombolHitung = document.getElementById("btn-hitung");
const tombolKurang = document.getElementById("kurang");
const tombolTambah = document.getElementById("tambah");
const kotakHasil = document.getElementById("hasil");

// Mengubah angka menjadi format Rupiah, contoh: 150000 -> Rp150.000
function formatRupiah(angka) {
  return "Rp" + angka.toLocaleString("id-ID");
}

function tampilkanPesan(pesan) {
  kotakHasil.innerHTML = '<p class="result-note">' + pesan + "</p>";
}

// Fungsi utama: menghitung dan menampilkan hasil
function hitungHarga() {
  const hargaPerJam = Number(pilihPaket.value);
  const durasi = Number(inputDurasi.value);
  const kode = inputPromo.value.trim().toUpperCase();

  // Validasi durasi
  if (!Number.isInteger(durasi) || durasi < 1) {
    tampilkanPesan("Durasi sewa minimal 1 jam. Isi dengan angka bulat.");
    return;
  }
  if (durasi > JAM_MAKSIMAL) {
    tampilkanPesan("Durasi sewa maksimal " + JAM_MAKSIMAL + " jam per pemesanan.");
    return;
  }

  // Harga awal = harga paket x durasi
  const hargaAwal = hargaPerJam * durasi;

  // Cek kode promo (if dan else)
  let diskon = 0;
  let catatan = "";

  if (kode === "") {
    catatan = "Belum memakai kode promo.";
  } else if (kode === KODE_PROMO) {
    diskon = hargaAwal * (PERSEN_DISKON / 100);
    catatan = "Kode promo " + KODE_PROMO + " berhasil dipakai. Diskon " + PERSEN_DISKON + "%.";
  } else {
    catatan = "Kode promo tidak valid, jadi diskon tidak diberikan.";
  }

  // Total akhir
  const totalBayar = hargaAwal - diskon;

  kotakHasil.innerHTML =
    '<div class="result-row"><span>Harga awal</span><span>' + formatRupiah(hargaAwal) + "</span></div>" +
    '<div class="result-row"><span>Diskon</span><span>- ' + formatRupiah(diskon) + "</span></div>" +
    '<div class="result-row result-total"><span>Total bayar</span><span>' + formatRupiah(totalBayar) + "</span></div>" +
    '<p class="result-note">' + catatan + "</p>";
}

// Tombol - dan + pada durasi
tombolKurang.addEventListener("click", function () {
  const sekarang = Number(inputDurasi.value) || 1;
  inputDurasi.value = Math.max(1, sekarang - 1);
});

tombolTambah.addEventListener("click", function () {
  const sekarang = Number(inputDurasi.value) || 0;
  inputDurasi.value = Math.min(JAM_MAKSIMAL, sekarang + 1);
});

// Tombol Hitung Harga dan tombol Enter
tombolHitung.addEventListener("click", hitungHarga);
inputPromo.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    hitungHarga();
  }
});
inputDurasi.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    hitungHarga();
  }
});

// Tombol "Sewa Paket Ini" di katalog otomatis memilih paket di kalkulator
document.querySelectorAll("[data-paket]").forEach(function (tombol) {
  tombol.addEventListener("click", function () {
    pilihPaket.value = tombol.getAttribute("data-paket");
  });
});

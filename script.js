let namaPengguna = "";
// === GANTI NOMOR WHATSAPP KAMU ===
const NOMOR_WA = "6289508350068";
// =================================

// Tampilkan halaman tertentu
function tampilHalaman(id) {
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
}

// Ambil semua isian & kirim ke WA
function kirimKeWA() {
    const nama = document.getElementById('namaLengkap').value.trim();
    const tgl = document.getElementById('tanggalLahir').value.trim();
    const j1 = document.getElementById('jawab1').value.trim();
    const j2 = document.getElementById('jawab2').value.trim();
    const j3 = document.getElementById('jawab3').value.trim();
    const j4 = document.getElementById('jawab4').value.trim();
    const j5 = document.getElementById('jawab5').value.trim();

    // Cek semua terisi
    if (!j1 || !j2 || !j3 || !j4 || !j5) {
        alert("Ada pertanyaan yang belum diisi ya 💗");
        return false;
    }

    const teks = `Jawaban dari ${nama}

1. Apa hal yang paling sering kamu senyum-senyum sendiri saat mengingatkannya?
${j1}

2. Kalau bisa ke mana saja besok, ke mana ajak aku?
${j2}

3. Apa harapanmu ke depannya?
${j3}

4. Apa yang terlintas saat dengar namaku?
${j4}

5. Bagaimana cara aku menemani & mendukungmu?
${j5}

—— Dikirim dari halaman istimewa  ——`;

    window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(teks)}`, '_blank');
    document.getElementById('namaSelesai').innerText = nama;
    tampilHalaman('selesai');
    return true;
}

// Jalankan setelah halaman siap
document.addEventListener('DOMContentLoaded', function() {
    // Tombol Masuk
    document.getElementById('btnMasuk').addEventListener('click', function() {
        const nama = document.getElementById('namaLengkap').value.trim();
        const tgl = document.getElementById('tanggalLahir').value.trim();
        
        if (!nama || !tgl) {
            alert("Isi nama dan tanggal lahir dulu ya 💗");
            return;
        }
        
        namaPengguna = nama;
        for (let i = 1; i <= 5; i++) {
            const el = document.getElementById(`nama${i}`);
            if (el) el.innerText = `Halo, ${nama} 💐`;
        }
        
        tampilHalaman('page1');
    });

    // Navigasi antar halaman
    document.getElementById('btnKe2').addEventListener('click', () => tampilHalaman('page2'));
    document.getElementById('btnKe3').addEventListener('click', () => tampilHalaman('page3'));
    document.getElementById('btnKe4').addEventListener('click', () => tampilHalaman('page4'));
    document.getElementById('btnKe5').addEventListener('click', () => tampilHalaman('page5'));
    
    document.getElementById('btnKeDari2Ke1').addEventListener('click', () => tampilHalaman('page1'));
    document.getElementById('btnKeDari3Ke2').addEventListener('click', () => tampilHalaman('page2'));
    document.getElementById('btnKeDari4Ke3').addEventListener('click', () => tampilHalaman('page3'));
    document.getElementById('btnKeDari5Ke4').addEventListener('click', () => tampilHalaman('page4'));
    
    // Tombol Kirim
    document.getElementById('btnKirim').addEventListener('click', kirimKeWA);
});

let namaPengguna = "";
// === GANTI NOMOR WHATSAPP KAMU ===
const NOMOR_WA = "6289508350068";
// =================================

function gantiHalaman(idTujuan) {
    // Sembunyikan SEMUA halaman
    document.querySelectorAll('.container').forEach(c => {
        c.classList.remove('active');
        c.classList.add('hidden');
    });
    // Tampilkan halaman tujuan
    const halaman = document.getElementById(idTujuan);
    halaman.classList.remove('hidden');
    halaman.classList.add('active');
}

function kirimKeWA() {
    const nama = document.getElementById('namaLengkap').value.trim();
    const tgl = document.getElementById('tanggalLahir').value.trim();
    const j1 = document.getElementById('jawab1').value.trim();
    const j2 = document.getElementById('jawab2').value.trim();
    const j3 = document.getElementById('jawab3').value.trim();
    const j4 = document.getElementById('jawab4').value.trim();
    const j5 = document.getElementById('jawab5').value.trim();

    if (!j1 || !j2 || !j3 || !j4 || !j5) {
        alert("Ada pertanyaan yang belum diisi ya 💗");
        return;
    }

    const pesan = `Jawaban dari ${nama}

1. Apa hal yang paling sering senyum-senyum sendiri?
${j1}

2. Ke mana ingin ajak aku pergi?
${j2}

3. Apa harapanmu ke depannya?
${j3}

4. Apa yang terlintas dengar namaku?
${j4}

5. Bagaimana cara menemani & mendukungmu?
${j5}

—— Dikirim dari halaman istimewa  ——`;

    window.open(`https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`, '_blank');
    document.getElementById('namaSelesai').innerText = nama;
    gantiHalaman('selesai');
}

document.addEventListener('DOMContentLoaded', function() {
    // Halaman awal
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('loginPage').classList.add('active');

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
        gantiHalaman('page1');
    });

    // Navigasi maju
    document.getElementById('btnKe2').addEventListener('click', () => gantiHalaman('page2'));
    document.getElementById('btnKe3').addEventListener('click', () => gantiHalaman('page3'));
    document.getElementById('btnKe4').addEventListener('click', () => gantiHalaman('page4'));
    document.getElementById('btnKe5').addEventListener('click', () => gantiHalaman('page5'));

    // Navigasi kembali
    document.getElementById('btnDari2Ke1').addEventListener('click', () => gantiHalaman('page1'));
    document.getElementById('btnDari3Ke2').addEventListener('click', () => gantiHalaman('page2'));
    document.getElementById('btnDari4Ke3').addEventListener('click', () => gantiHalaman('page3'));
    document.getElementById('btnDari5Ke4').addEventListener('click', () => gantiHalaman('page4'));

    // Kirim
    document.getElementById('btnKirim').addEventListener('click', kirimKeWA);
});

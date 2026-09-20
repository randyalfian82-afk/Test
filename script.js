let namaPengguna = "";

// === GANTI NOMOR WHATSAPP DI BAWAH INI ===
// Contoh: 6281234567890 (pakai 62 di depan, tanpa tanda +)
const NOMOR_WA = "6289508350068";
// =========================================

function masuk() {
    const nama = document.getElementById('namaLengkap').value.trim();
    const tgl = document.getElementById('tanggalLahir').value.trim();

    if (nama === "" || tgl === "") {
        alert("Silakan isi nama dan tanggal lahir terlebih dahulu ya 💗");
        return;
    }

    namaPengguna = nama;
    for (let i = 1; i <= 5; i++) {
        document.getElementById(`nama${i}`).innerText = `Halo, ${nama} 💐`;
    }

    keHalaman(1);
}

function keHalaman(nomor) {
    document.querySelectorAll('.container').forEach(el => {
        el.classList.remove('active');
    });

    if (nomor === 'login') {
        document.getElementById('loginPage').classList.add('active');
    } else if (nomor === 'selesai') {
        document.getElementById('namaSelesai').innerText = namaPengguna;
        document.getElementById('terimaKasih').classList.add('active');
    } else {
        document.getElementById(`page${nomor}`).classList.add('active');
    }
}

function kirimSemua() {
    // Cek semua pertanyaan sudah diisi
    for (let i = 1; i <= 5; i++) {
        if (document.getElementById(`jawab${i}`).value.trim() === "") {
            alert(`Pertanyaan ke-${i} belum diisi ya 💗`);
            keHalaman(i);
            return;
        }
    }

    // Ambil semua jawaban
    const jwb1 = document.getElementById('jawab1').value.trim();
    const jwb2 = document.getElementById('jawab2').value.trim();
    const jwb3 = document.getElementById('jawab3').value.trim();
    const jwb4 = document.getElementById('jawab4').value.trim();
    const jwb5 = document.getElementById('jawab5').value.trim();
    const tglLahir = document.getElementById('tanggalLahir').value.trim();

    // Susun pesan yang akan dikirim ke WhatsApp
    const pesan = `💌 Ada Jawaban Baru dari ${namaPengguna}

📅 Tanggal Lahir: ${tglLahir}

━━━━━━━━━━━━━━━━
1. Apa hal yang paling sering kamu senyum-senyum sendiri saat mengingatkannya?
${jwb1}

2. Kalau kita bisa pergi ke mana saja besok, ke mana kamu ingin ajak aku?
${jwb2}

3. Apa harapanmu ke depannya?
${jwb3}

4. Apa hal pertama yang terlintas di pikiranmu saat mendengar namaku?
${jwb4}

5. Bagaimana cara terbaik aku bisa menemani dan mendukungmu?
${jwb5}
━━━━━━━━━━━━━━━━

Dikirim dari halaman istimewa 💖`;

    // Encode pesan untuk URL WhatsApp
    const pesanEncoded = encodeURIComponent(pesan);

    // Buka WhatsApp
    window.open(`https://wa.me/${NOMOR_WA}?text=${pesanEncoded}`, '_blank');

    // Tampilkan halaman terima kasih
    keHalaman('selesai');
}

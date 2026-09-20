/* =========================================
DATA PENGGUNA
========================================= */

let namaPengguna = "";

/* =========================================
NOMOR WHATSAPP TUJUAN
Ganti dengan nomor WhatsApp kamu.

Format:
628xxxxxxxxxx

Jangan gunakan:
+62
08
spasi
tanda -
========================================= */

const NOMOR_WA = "6289508350068";

/* =========================================
FUNGSI MASUK
========================================= */

function masuk() {

```
const namaInput = document
    .getElementById("namaLengkap");

const tanggalInput = document
    .getElementById("tanggalLahir");

const nama = namaInput.value.trim();
const tanggalLahir = tanggalInput.value.trim();


/* Cek input kosong */

if (nama === "") {

    alert("Nama kamu belum diisi ya 💗");

    namaInput.focus();

    return;
}


if (tanggalLahir === "") {

    alert("Tanggal lahir kamu belum diisi ya 💗");

    tanggalInput.focus();

    return;
}


/* Simpan nama */

namaPengguna = nama;


/* Masukkan nama ke semua halaman */

for (let i = 1; i <= 5; i++) {

    const namaElement =
        document.getElementById(`nama${i}`);

    if (namaElement) {

        namaElement.innerText =
            `Halo, ${namaPengguna} 💐`;
    }
}


/* Masuk ke halaman pertama */

keHalaman(1);
```

}

/* =========================================
PINDAH HALAMAN
========================================= */

function keHalaman(nomor) {

```
/* Sembunyikan semua container */

const semuaContainer =
    document.querySelectorAll(".container");

semuaContainer.forEach(function (element) {

    element.classList.remove("active");

});


/* Jika halaman selesai */

if (nomor === "selesai") {

    document
        .getElementById("namaSelesai")
        .innerText = namaPengguna;

    document
        .getElementById("terimaKasih")
        .classList.add("active");

    return;
}


/* Tampilkan halaman yang dipilih */

const halaman =
    document.getElementById(`page${nomor}`);

if (halaman) {

    halaman.classList.add("active");
}
```

}

/* =========================================
CEK JAWABAN
========================================= */

function cekJawaban(nomor) {

```
const textarea =
    document.getElementById(`jawab${nomor}`);

if (!textarea) {
    return false;
}

const jawaban =
    textarea.value.trim();


if (jawaban === "") {

    alert(
        `Pertanyaan ke-${nomor} belum diisi ya 💗`
    );

    textarea.focus();

    return false;
}

return true;
```

}

/* =========================================
KIRIM SEMUA JAWABAN
========================================= */

function kirimSemua() {

```
/* Cek semua pertanyaan */

for (let i = 1; i <= 5; i++) {

    if (!cekJawaban(i)) {

        keHalaman(i);

        return;
    }
}


/* Ambil tanggal lahir */

const tanggalLahir =
    document
        .getElementById("tanggalLahir")
        .value
        .trim();


/* Ambil semua jawaban */

const jwb1 =
    document
        .getElementById("jawab1")
        .value
        .trim();

const jwb2 =
    document
        .getElementById("jawab2")
        .value
        .trim();

const jwb3 =
    document
        .getElementById("jawab3")
        .value
        .trim();

const jwb4 =
    document
        .getElementById("jawab4")
        .value
        .trim();

const jwb5 =
    document
        .getElementById("jawab5")
        .value
        .trim();


/* =========================================
   PESAN WHATSAPP
========================================= */

const pesan = `JAWABAN BARU
```

👤 Nama: ${namaPengguna}

━━━━━━━━━━━━━━━━━━

 PERTANYAAN 1

Apa hal yang paling sering membuat kamu senyum-senyum sendiri saat mengingatnya?

${jwb1}

━━━━━━━━━━━━━━━━━━

 PERTANYAAN 2

Kalau kita bisa pergi ke mana saja besok, ke mana kamu ingin ajak aku?

${jwb2}

━━━━━━━━━━━━━━━━━━

 PERTANYAAN 3

Apa harapanmu ke depannya?

${jwb3}

━━━━━━━━━━━━━━━━━━

 PERTANYAAN 4

Apa hal pertama yang terlintas di pikiranmu saat mendengar namaku?

${jwb4}

━━━━━━━━━━━━━━━━━━

 PERTANYAAN 5

Bagaimana cara terbaik aku bisa menemani dan mendukungmu?

${jwb5}

━━━━━━━━━━━━━━━━━━

 Dikirim dari halaman istimewa `;

```
/* =========================================
   BUKA WHATSAPP
========================================= */

const linkWhatsApp =
    `https://wa.me/${NOMOR_WA}?text=${encodeURIComponent(pesan)}`;


window.open(linkWhatsApp, "_blank");


/* =========================================
   TAMPILKAN HALAMAN TERIMA KASIH
========================================= */

keHalaman("selesai");
```

}

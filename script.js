/* ==================================================
   PENGATURAN WHATSAPP
================================================== */

/*
    GANTI NOMOR DI BAWAH INI.

    Contoh nomor:
    081234567890

    Ditulis menjadi:
    6281234567890

    Jangan gunakan:
    +62
    spasi
    tanda -
*/

const nomorWhatsApp = "6289508350068";


/* ==================================================
   PERTANYAAN
================================================== */

const questions = [

    "Apa hal yang paling sering kamu senyum-senyum sendiri saat mengingatnya?",

    "Kalau kita bisa pergi ke mana saja besok, ke mana kamu ingin ajak aku?",

    "Apa harapanmu ke depannya?",

    "Apa hal pertama yang terlintas di pikiranmu saat mendengar namaku?",

    "Bagaimana cara terbaik aku bisa menemani dan mendukungmu?"

];


/* ==================================================
   VARIABLE
================================================== */

let currentQuestion = 0;

let userName = "";

let userBirthday = "";

let answers = [];


/* ==================================================
   ELEMENT
================================================== */

const loginPage =
    document.getElementById("loginPage");

const questionPage =
    document.getElementById("questionPage");

const finishPage =
    document.getElementById("finishPage");

const namaInput =
    document.getElementById("nama");

const birthdayInput =
    document.getElementById("tanggalLahir");

const questionText =
    document.getElementById("questionText");

const questionNumber =
    document.getElementById("questionNumber");

const progress =
    document.getElementById("progress");

const answerInput =
    document.getElementById("answer");

const nextButton =
    document.getElementById("nextButton");

const finalName =
    document.getElementById("finalName");

const loginButton =
    document.getElementById("loginButton");

const whatsappButton =
    document.getElementById("whatsappButton");


/* ==================================================
   LOGIN
================================================== */

function masuk() {

    const nama =
        namaInput
        .value
        .trim();

    const tanggal =
        birthdayInput
        .value
        .trim();


    /*
        Tidak ada pengecekan
        tanggal lahir benar/salah.

        Yang penting kedua kolom
        tidak kosong.
    */

    if (
        nama === "" ||
        tanggal === ""
    ) {

        alert(
            "Isi nama dan tanggal lahir dulu ya ❤️"
        );

        return;

    }


    userName = nama;

    userBirthday = tanggal;


    loginPage
        .classList
        .add("hidden");


    questionPage
        .classList
        .remove("hidden");


    tampilkanPertanyaan();

}


/* ==================================================
   TAMPILKAN PERTANYAAN
================================================== */

function tampilkanPertanyaan() {

    /*
        Restart animasi.
    */

    questionPage
        .classList
        .remove("question-page");

    void questionPage.offsetWidth;

    questionPage
        .classList
        .add("question-page");


    /*
        Tampilkan pertanyaan.
    */

    questionText
        .textContent =
        questions[currentQuestion];


    /*
        Nomor pertanyaan.
    */

    questionNumber
        .textContent =
        `PERTANYAAN ${currentQuestion + 1} DARI ${questions.length}`;


    /*
        Progress bar.
    */

    const percentage =
        (
            (currentQuestion + 1)
            /
            questions.length
        ) * 100;


    progress.style.width =
        percentage + "%";


    /*
        Kosongkan jawaban.
    */

    answerInput.value = "";


    /*
        Tombol pertanyaan terakhir.
    */

    if (
        currentQuestion ===
        questions.length - 1
    ) {

        nextButton.textContent =
            "Selesai ❤️";

    } else {

        nextButton.textContent =
            "Lanjut ❤️";

    }

}


/* ==================================================
   NEXT QUESTION
================================================== */

function nextQuestion() {

    const answer =
        answerInput
        .value
        .trim();


    /*
        Jawaban tidak boleh kosong.
    */

    if (answer === "") {

        alert(
            "Jawab dulu ya ❤️"
        );

        answerInput.focus();

        return;

    }


    /*
        Simpan jawaban.
    */

    answers.push(answer);


    /*
        Pindah pertanyaan.
    */

    currentQuestion++;


    /*
        Masih ada pertanyaan?
    */

    if (
        currentQuestion <
        questions.length
    ) {

        tampilkanPertanyaan();

    } else {

        tampilkanSelesai();

    }

}


/* ==================================================
   SELESAI
================================================== */

function tampilkanSelesai() {

    questionPage
        .classList
        .add("hidden");


    finishPage
        .classList
        .remove("hidden");


    finalName
        .textContent =
        userName;

}


/* ==================================================
   KIRIM WHATSAPP
================================================== */

function kirimWhatsApp() {

    /*
        Membuat pesan awal.
    */

    let pesan =

`💌 *ADA YANG MAU AKU CERITAKAN...*

Halo ❤️

👤 Nama:
*${userName}*

🎂 Tanggal Lahir:
*${userBirthday}*

━━━━━━━━━━━━━━━━━━
`;


    /*
        Masukkan semua pertanyaan
        dan jawaban.
    */

    questions.forEach(
        (question, index) => {

            pesan +=

`

❤️ *PERTANYAAN ${index + 1}*

${question}

💭 *Jawaban:*
${answers[index]}

━━━━━━━━━━━━━━━━━━`;

        }
    );


    /*
        Penutup pesan.
    */

    pesan +=

`

✨ Terima kasih sudah menjawab semuanya.

— sent with love ❤️`;


    /*
        Encode pesan.
    */

    const encodedMessage =
        encodeURIComponent(pesan);


    /*
        Buat link WhatsApp.
    */

    const whatsappURL =
        `https://wa.me/${nomorWhatsApp}?text=${encodedMessage}`;


    /*
        Buka WhatsApp.
    */

    window.open(
        whatsappURL,
        "_blank"
    );

}


/* ==================================================
   EVENT LISTENER
================================================== */

loginButton.addEventListener(
    "click",
    masuk
);


nextButton.addEventListener(
    "click",
    nextQuestion
);


whatsappButton.addEventListener(
    "click",
    kirimWhatsApp
);


/* ==================================================
   ENTER UNTUK LOGIN
================================================== */

namaInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            birthdayInput.focus();

        }

    }
);


birthdayInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter"
        ) {

            masuk();

        }

    }
);


/* ==================================================
   CTRL + ENTER UNTUK JAWABAN
================================================== */

answerInput.addEventListener(
    "keydown",
    function(event) {

        if (
            event.ctrlKey &&
            event.key === "Enter"
        ) {

            nextQuestion();

        }

    }
);
```

// Pertanyaan yang sudah kamu berikan
const questions = [
    "Apa hal yang paling sering kamu senyum-senyum sendiri saat mengingatkannya?",
    "Kalau kita bisa pergi ke mana saja besok, ke mana kamu ingin ajak aku?",
    "Apa harapanmu ke depannya?",
    "Apa hal pertama yang terlintas di pikiranmu saat mendengar namaku?",
    "Bagaimana cara terbaik aku bisa menemani dan mendukungmu?"
];

// State
let currentQ = 0;
let answers = [];
let userName = "";
let userDob = "";
let photos = [];

// Elemen halaman
const pages = {
    login: document.getElementById('loginPage'),
    quiz: document.getElementById('quizPage'),
    camera: document.getElementById('cameraPage'),
    result: document.getElementById('resultPage')
};

// Pindah halaman
function showPage(name) {
    Object.values(pages).forEach(p => p.classList.remove('active'));
    pages[name].classList.add('active');
}

// 1. Halaman masuk
document.getElementById('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    userName = document.getElementById('nama').value.trim();
    userDob = document.getElementById('tglLahir').value.trim();
    
    if (!userName || !userDob) return;
    
    document.getElementById('displayNama').textContent = userName;
    document.getElementById('resultName').textContent = `Untuk: ${userName}`;
    
    currentQ = 0;
    answers = [];
    loadQuestion();
    showPage('quiz');
});

// Muat pertanyaan
function loadQuestion() {
    document.getElementById('questionNumber').textContent = `PERTANYAAN ${currentQ + 1} / ${questions.length}`;
    document.getElementById('questionText').textContent = questions[currentQ];
    document.getElementById('answer').value = '';
}

// 2. Jawab pertanyaan
document.getElementById('quizForm').addEventListener('submit', e => {
    e.preventDefault();
    const jawab = document.getElementById('answer').value.trim();
    if (!jawab) return;
    
    answers.push(jawab);
    currentQ++;
    
    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        // Selesai tanya → ke kamera
        startCamera();
        showPage('camera');
    }
});

// 3. Kamera
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let stream;

async function startCamera() {
    photos = [];
    document.getElementById('photoCounter').textContent = `0 / 6 FOTO`;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'user', width: 1280, height: 720 } 
        });
        video.srcObject = stream;
    } catch (err) {
        document.getElementById('cameraError').textContent = "Izinkan akses kamera ya ♡";
    }
}

document.getElementById('snapButton').addEventListener('click', async () => {
    for (let i = 0; i < 6; i++) {
        await countdown(3);
        capturePhoto();
        document.getElementById('photoCounter').textContent = `${photos.length} / 6 FOTO`;
        if (photos.length === 6) break;
    }
    if (stream) stream.getTracks().forEach(t => t.stop());
    showResults();
    showPage('result');
});

function countdown(sec) {
    return new Promise(res => {
        const el = document.getElementById('countdown');
        let s = sec;
        el.textContent = s;
        el.style.display = 'block';
        const timer = setInterval(() => {
            s--;
            el.textContent = s || "📸";
            if (s <= 0) {
                clearInterval(timer);
                el.style.display = 'none';
                setTimeout(res, 300);
            }
        }, 1000);
    });
}

function capturePhoto() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    const imgData = canvas.toDataURL('image/jpeg', 0.9);
    photos.push(imgData);
    document.getElementById(`result${photos.length - 1}`).src = imgData;
}

// 4. Tampilkan hasil
function showResults() {
    // Tampilkan jawaban
    const container = document.getElementById('allAnswers');
    container.innerHTML = '';
    questions.forEach((q, i) => {
        const div = document.createElement('div');
        div.className = 'answer-item';
        div.innerHTML = `<p><strong>${q}</strong></p><p>${answers[i]}</p>`;
        container.appendChild(div);
    });
    
    // Tanggal
    const now = new Date();
    const tgl = now.toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
    document.getElementById('date1').textContent = tgl;
    document.getElementById('date2').textContent = tgl;
}

// Unduh & Ulangi
document.getElementById('restartButton').addEventListener('click', () => {
    photos = [];
    answers = [];
    showPage('login');
});

document.getElementById('downloadButton').addEventListener('click', () => {
    alert('Fitur unduh siap! 💌');
});

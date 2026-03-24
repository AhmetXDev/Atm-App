// 🔐 Basit hash (simülasyon)
function hash(str) {
    return btoa(str); // base64 (gerçek hash değil ama simülasyon)
}

// 👤 Kullanıcılar (DB yerine object)
const users = [
    {
        name: "John Cena",
        account: "123456",
        password: hash("1234"),
        balance: 5000,
        debt: 2000
    },
    {
        name: "Mehmet Yıldırım",
        account: "654321",
        password: hash("4321"),
        balance: 8000,
        debt: 1000
    }
];

let currentUser = null;

// 🔑 Login
function login() {
    const acc = document.getElementById("accountNumber").value.trim();
    const pass = hash(document.getElementById("password").value.trim());

    const user = users.find(u => u.account === acc && u.password === pass);

    if (!user) {
        document.getElementById("loginError").textContent = "Hatalı giriş!";
        return;
    }

    currentUser = user;

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    updateUI();
}

// 🔄 UI güncelle
function updateUI() {
    document.getElementById("welcome").textContent = `Hoş geldin, ${currentUser.name}`;
    document.getElementById("balance").textContent = currentUser.balance;
    document.getElementById("debt").textContent = currentUser.debt;
}

// 💰 Para yatır
function deposit() {
    let amount = parseFloat(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) return alert("Geçersiz tutar!");

    currentUser.balance += amount;
    updateUI();
}

// 💸 Para çek
function withdraw() {
    let amount = parseFloat(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) return alert("Geçersiz tutar!");
    if (amount > currentUser.balance) return alert("Yetersiz bakiye!");

    currentUser.balance -= amount;
    updateUI();
}

// 💳 Borç ödeme
function payDebt() {
    let amount = parseFloat(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) return alert("Geçersiz tutar!");
    if (amount > currentUser.balance) return alert("Bakiye yetersiz!");

    if (amount > currentUser.debt) amount = currentUser.debt;

    currentUser.balance -= amount;
    currentUser.debt -= amount;

    updateUI();
}

// 🚪 Çıkış
function logout() {
    currentUser = null;

    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}
const jenisKonversi = document.getElementById('jenis-konversi');
const inputSuhu = document.getElementById('input-suhu');
const outputSuhu = document.getElementById('output-suhu');
const kalkulasi = document.getElementById('kalkulasi');
const descRumus = document.getElementById('descRumus');
const rumus = document.getElementById('rumus');
const textarea = document.getElementById('input-suhu');

textarea.addEventListener('keydown', function(event) {
  // Mendapatkan kode tombol yang ditekan
  const keyCode = event.keyCode || event.which;

  // Mengecek apakah pengguna menekan tombol Ctrl bersamaan dengan tombol C atau V
  if ((event.ctrlKey || event.metaKey) && (keyCode === 67 || keyCode === 86 || keyCode === 83 || keyCode === 90)) {
    // Memperbolehkan tindakan Ctrl+C (copy) dan Ctrl+V (paste)
    return;
  }

  if(keyCode === 13) { // ketika enter, maka tampilkan hasilnya
    event.preventDefault();
    hitungKonversi();   
    tampilkanCalc();
    tampilkanRumus();
    tampilkanJudulCaraKonversi();
  }

  // Cek jika tombol yang ditekan adalah spasi]
  if (keyCode !== 32 &&
      !(keyCode >= 48 && keyCode <= 57) &&  // cek untuk angka di atas keyboard
      !(keyCode >= 96 && keyCode <= 105) && // cek untuk angka di keypad
      !(keyCode === 190) && // cek titik sebagai koma
      keyCode !== 8 &&  // backspace
      keyCode !== 37 && // panah kiri
      keyCode !== 39 && // panah kanan
      keyCode !== 46 && // delete
      keyCode !== 9     // tab
      ) {
    // Mencegah tindakan selain memasukkan angka
    event.preventDefault();
  }
});

document.body.addEventListener('keydown', function(event) { // ketika tidak di textarea
  const keyCode = event.keyCode || event.which; 

  if(keyCode === 13) { // ketika enter, maka tampilkan hasilnya
    event.preventDefault();
    hitungKonversi();   
    tampilkanCalc();
    tampilkanRumus();
    tampilkanJudulCaraKonversi();
  }
});

function konversi() {
  hitungKonversi();
  tampilkanCalc();
  tampilkanRumus();
  tampilkanJudulCaraKonversi();
}

// Fungsi untuk membalikkan jenis konversi
function reverseKonversi() {
  const selectedOption = jenisKonversi.value;
  let reversedOption;

  switch(selectedOption) {
    case 'celsius-to-fahrenheit':
      reversedOption = 'fahrenheit-to-celsius';
      break;
    case 'fahrenheit-to-celsius':
      reversedOption = 'celsius-to-fahrenheit';
      break;
  }

  jenisKonversi.value = reversedOption;
  hitungKonversi();
  tampilkanCalc();
  tampilkanRumus();
  tampilkanJudulCaraKonversi();
}

function hitungKonversi() {
    const selectedOption = jenisKonversi.value;
    const suhu = parseFloat(inputSuhu.value);

    let hasil;
    switch(selectedOption) {
      case 'celsius-to-fahrenheit':
        hasil = suhu * 9/5 + 32;
        break;
      case 'fahrenheit-to-celsius':
        hasil = (suhu - 32) * 5/9;
        break;
    }

    if (isNaN(hasil)) {
      outputSuhu.value = "Input angka tidak terdeteksi";
    } else {
      outputSuhu.value = hasil.toFixed(2);
    }
  }

function tampilkanCalc() {
  const selectedOption = jenisKonversi.value;
  const suhu = inputSuhu.value;
  let calcText;

  switch(selectedOption) {
    case 'celsius-to-fahrenheit':
      calcText = suhu +"°C * (9/5) + 32 = " + outputSuhu.value+"°F";
      break;
    case 'fahrenheit-to-celsius':
      calcText = "("+ suhu +"°F - 32) * (5/9) = " + outputSuhu.value+"°C";
      break;
  }

  if (outputSuhu.value === "Input angka tidak terdeteksi") {
    kalkulasi.value = "Tidak ada kalkulasi yang terjadi";
  } else {
    kalkulasi.value = calcText;
  }
  
}

function tampilkanRumus() {
  const selectedOption = jenisKonversi.value;
  let desc, rumusText;

  switch(selectedOption) {
    case 'celsius-to-fahrenheit':
      desc = "\\text{Suhu } S \\text{ dalam derajat Fahrenheit (\\degree F) sama dengan suhu }  S \\text{ dalam derajat } \\\\ \\text{Celcius (\\degree C) kali } \\frac{9}{5} \\text{ ditambah } 32";
      rumusText = "\\Large S_{(\\degree F)} = (S_{(\\degree C)} \\times \\frac{9}{5}) + 32 \\\\ \\text{ } \\\\ \\text{atau} \\\\ \\text{ } \\\\ S_{(\\degree F)} = (S_{(\\degree C)} \\times 1.8) + 32";
      break;
    case 'fahrenheit-to-celsius':
      desc = "\\text{Suhu } S \\text{ dalam derajat Celcius (\\degree C) sama dengan suhu }  S \\text{ dalam derajat } \\\\ \\text{Fahrenheit (\\degree F) dikurangi } 32 \\text{ kemudian kali } \\frac{5}{9}";
      rumusText = "\\Large S_{(\\degree C)} = (S_{(\\degree F)} - 32 ) \\times \\frac{5}{9}";
      break;
  }

  katex.render(desc, descRumus);  // untuk merender LaTeX agar tampil pada html
  katex.render(rumusText, rumus);
}

function tampilkanJudulCaraKonversi() {
  const selectedOption = jenisKonversi.value;
  let judul;

  switch(selectedOption) {
    case 'celsius-to-fahrenheit':
      judul = "\\text{Cara Konversi dari Celcius (\\degree C) ke Fahrenheit (\\degree F)}";
      break;
    case 'fahrenheit-to-celsius':
      judul = "\\text{Cara Konversi dari Fahrenheit (\\degree F) ke Celcius (\\degree C)}";
      break;
  }

  katex.render(judul, judulCaraKonversi);  // untuk merender LaTeX agar tampil pada html
}

function Reset() {
  document.getElementById("input-suhu").value = "";
  document.getElementById("kalkulasi").value = "";
  document.getElementById("output-suhu").value = "";
  document.getElementById("judulCaraKonversi").value = "Cara Konversi";
}

// init script
hitungKonversi();
tampilkanCalc();
tampilkanRumus();
tampilkanJudulCaraKonversi();
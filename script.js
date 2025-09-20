const upload = document.getElementById('upload');
const quality = document.getElementById('quality');
const qualityValue = document.getElementById('qualityValue');
const canvas = document.getElementById('canvas');
const compressBtn = document.getElementById('compressBtn');
const downloadLink = document.getElementById('downloadLink');

quality.addEventListener('input', () => {
  qualityValue.textContent = quality.value + '%';
});

compressBtn.addEventListener('click', () => {
  const file = upload.files[0];
  if (!file) return alert('لطفاً یک عکس انتخاب کنید.');

  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const compressedData = canvas.toDataURL('image/jpeg', quality.value / 100);
      downloadLink.href = compressedData;
      downloadLink.download = 'compressed.jpg';
      downloadLink.textContent = 'دانلود عکس فشرده‌شده';
      downloadLink.style.display = 'inline-block';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
});
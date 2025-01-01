const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const textInput = document.getElementById('text-input');
const colorPicker = document.getElementById('color-picker');
const fontSelector = document.getElementById('font-selector');

let img = new Image();
let imageX = 50, imageY = 50;  // 画像の初期位置
let dragging = false;

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    
    // 画像のクリック位置を判定してドラッグ開始
    if (mouseX >= imageX && mouseX <= imageX + img.width &&
        mouseY >= imageY && mouseY <= imageY + img.height) {
        dragging = true;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        // 画像の位置を更新
        imageX = mouseX - img.width / 2;
        imageY = mouseY - img.height / 2;
        drawCanvas();
    }
});

canvas.addEventListener('mouseup', () => {
    dragging = false;
});

// 画像をアップロードしてキャンバスに表示
imageUpload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = function(event) {
        img.src = event.target.result;
        img.onload = function() {
            imageX = 50; // 画像の初期位置
            imageY = 50;
            drawCanvas();
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});

// テキストと色を適用する関数
function drawCanvas() {
    // 背景色を塗りつぶす
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 画像を描画
    if (img.src) {
        ctx.drawImage(img, imageX, imageY);
    }

    // テキストを描画
    ctx.font = `30px ${fontSelector.value}`;
    ctx.fillStyle = 'black';
    ctx.fillText(textInput.value, 20, 350);
}

// 「デザインを適用」ボタンをクリックしたときに描画を更新
document.getElementById('apply-design').addEventListener('click', () => {
    drawCanvas();
});

// 最初にキャンバスを描画（背景色）
drawCanvas();

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const textInput = document.getElementById('text-input');
const colorPicker = document.getElementById('color-picker');
const fontSelector = document.getElementById('font-selector');

let tshirtImage = new Image();
let uploadedImage = new Image(); // ユーザーがアップロードする画像
let imageX = 50, imageY = 50;  // 画像の初期位置
let dragging = false;
let dragStartX, dragStartY;

// Tシャツ画像（背景）を読み込んで描画
tshirtImage.src = 'https://illustimage.com/photo/dl/4307.png?20171029'; // Tシャツ画像URL

tshirtImage.onload = () => {
    drawCanvas(); // 最初にTシャツ画像を描画
};

// 画像をアップロードしてキャンバスに表示
imageUpload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = function(event) {
        uploadedImage.src = event.target.result;
        uploadedImage.onload = function() {
            imageX = 100; // 画像の初期位置
            imageY = 100;
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

    // Tシャツ画像（背景）を描画
    if (tshirtImage.src) {
        ctx.drawImage(tshirtImage, 0, 0, canvas.width, canvas.height);
    }

    // アップロードした画像を描画
    if (uploadedImage.src) {
        ctx.drawImage(uploadedImage, imageX, imageY);
    }

    // テキストを描画
    ctx.font = `30px ${fontSelector.value}`;
    ctx.fillStyle = 'black';
    ctx.fillText(textInput.value, 20, 350);
}

// ドラッグ開始時に画像位置を計算
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    
    // 画像のクリック位置を判定してドラッグ開始
    if (mouseX >= imageX && mouseX <= imageX + uploadedImage.width &&
        mouseY >= imageY && mouseY <= imageY + uploadedImage.height) {
        dragging = true;
        dragStartX = mouseX - imageX;
        dragStartY = mouseY - imageY;
    }
});

// 画像をドラッグして移動
canvas.addEventListener('mousemove', (e) => {
    if (dragging) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        imageX = mouseX - dragStartX;
        imageY = mouseY - dragStartY;
        drawCanvas();
    }
});

// ドラッグ終了
canvas.addEventListener('mouseup', () => {
    dragging = false;
});

// 「デザインを適用」ボタンをクリックしたときに描画を更新
document.getElementById('apply-design').addEventListener('click', () => {
    drawCanvas();
});

// 最初にキャンバスを描画（背景色とTシャツ画像）
drawCanvas();

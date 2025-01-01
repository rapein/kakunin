const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('image-upload');
const textInput = document.getElementById('text-input');
const colorPicker = document.getElementById('color-picker');
const fontSelector = document.getElementById('font-selector');
const textSizeInput = document.getElementById('text-size');

let tshirtImage = new Image(); // Tシャツの画像
let uploadedImage = new Image(); // ユーザーがアップロードする画像
let imageX = 50, imageY = 50, imageWidth = 100, imageHeight = 100;  // 画像の初期位置とサイズ
let textX = 20, textY = 350, textSize = 30; // テキストの初期位置とサイズ
let draggingImage = false, draggingText = false;
let dragStartX, dragStartY;

// 初期のTシャツ画像
tshirtImage.src = 'https://illustimage.com/photo/dl/4307.png?20171029'; // Tシャツ画像URL

tshirtImage.onload = () => {
    drawCanvas(); // 最初にTシャツ画像を描画
};

// Tシャツの色を変更
colorPicker.addEventListener('input', () => {
    drawCanvas(); // 色が選ばれたら再描画
});

// 画像をアップロードしてキャンバスに表示
imageUpload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = function(event) {
        uploadedImage.src = event.target.result;
        uploadedImage.onload = function() {
            imageX = 100; // 画像の初期位置
            imageY = 100;
            imageWidth = uploadedImage.width; // 画像のサイズを初期化
            imageHeight = uploadedImage.height;
            drawCanvas();
        };
    };
    reader.readAsDataURL(e.target.files[0]);
});

// テキストのサイズ変更
textSizeInput.addEventListener('input', (e) => {
    textSize = parseInt(e.target.value);
    drawCanvas();
});

// 描画関数
function drawCanvas() {
    // 背景色を塗りつぶす（Tシャツの色を変更）
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tシャツ画像（背景）を描画
    if (tshirtImage.src) {
        ctx.drawImage(tshirtImage, 0, 0, canvas.width, canvas.height);
    }

    // アップロードした画像を描画
    if (uploadedImage.src) {
        ctx.drawImage(uploadedImage, imageX, imageY, imageWidth, imageHeight);
    }

    // テキストを描画
    ctx.font = `${textSize}px ${fontSelector.value}`;
    ctx.fillStyle = 'black';
    ctx.fillText(textInput.value, textX, textY);
}

// 画像のドラッグ開始
canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX;
    const mouseY = e.offsetY;

    // 画像のクリック位置を判定してドラッグ開始
    if (mouseX >= imageX && mouseX <= imageX + imageWidth &&
        mouseY >= imageY && mouseY <= imageY + imageHeight) {
        draggingImage = true;
        dragStartX = mouseX - imageX;
        dragStartY = mouseY - imageY;
    }
    // テキストのクリック位置を判定してドラッグ開始
    else if (mouseX >= textX && mouseX <= textX + ctx.measureText(textInput.value).width &&
             mouseY >= textY - textSize && mouseY <= textY) {
        draggingText = true;
        dragStartX = mouseX - textX;
        dragStartY = mouseY - textY;
    }
});

// 画像またはテキストをドラッグして移動
canvas.addEventListener('mousemove', (e) => {
    if (draggingImage) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        imageX = mouseX - dragStartX;
        imageY = mouseY - dragStartY;
        drawCanvas();
    } else if (draggingText) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        textX = mouseX - dragStartX;
        textY = mouseY - dragStartY;
        drawCanvas();
    }
});

// ドラッグ終了
canvas.addEventListener('mouseup', () => {
    draggingImage = false;
    draggingText = false;
});

// 「デザインを適用」ボタンをクリックしたときに描画を更新
document.getElementById('apply-design').addEventListener('click', () => {
    drawCanvas();
});

// 最初にキャンバスを描画（背景色とTシャツ画像）
drawCanvas();

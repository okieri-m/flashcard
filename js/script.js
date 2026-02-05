// 1〜9.jpg までを配列に
const IMAGES = Array.from({ length: 9 }, (_, i) => `images/${i + 1}.jpg`);

const imgEl = document.getElementById('cardImg');
const placeholder = document.getElementById('placeholder');
const shuffleBtn = document.getElementById('shuffleBtn');

// ランダムシャッフル用のキュー
let queue = [];
let indexInQueue = 0;

// 配列をシャッフルする（Fisher–Yates）
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// キューを作り直す
function resetQueue() {
  queue = shuffleArray(IMAGES);
  indexInQueue = 0;
}

// 画像を表示する（引数は画像のパス）
function showImage(src) {
  if (!src) {
    imgEl.classList.remove('show');
    imgEl.src = '';
    placeholder.style.display = 'block';
    return;
  }

  // プレースホルダー非表示
  placeholder.style.display = 'none';

  // プリロードしてからフェード表示
  const pre = new Image();
  pre.onload = () => {
    imgEl.src = src;
    requestAnimationFrame(() => {
      imgEl.classList.add('show');
    });
  };
  pre.onerror = () => {
    // 読み込み失敗時はプレースホルダーを戻す
    placeholder.textContent = '画像を読み込めませんでした';
    placeholder.style.display = 'block';
    imgEl.classList.remove('show');
  };
  pre.src = src;
}

// 「次の1枚」を表示（9枚見終わったらまた新しくシャッフル）
function nextImage() {
  if (!IMAGES || IMAGES.length === 0) {
    placeholder.textContent = 'images フォルダに画像を入れてください';
    placeholder.style.display = 'block';
    return;
  }

  // キューが空、またはすべて表示し終わったら作り直す
  if (!queue.length || indexInQueue >= queue.length) {
    resetQueue();
  }

  const next = queue[indexInQueue];
  indexInQueue++;

  imgEl.classList.remove('show');
  setTimeout(() => showImage(next), 140);
}

// イベント
shuffleBtn.addEventListener('click', nextImage);

// スペースキーで次へ
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    nextImage();
  }
});

// 初期状態ではプレースホルダーのみ表示
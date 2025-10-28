 // ここに表示したい画像ファイル名を配列で入れてください。
    // 例: ['apple.jpg','banana.jpg'] として images/ に配置
    const IMAGES = Array.from({length: 9}, (_, i) => `images/${i+1}.jpg`);
    const imgEl = document.getElementById('cardImg');
    const placeholder = document.getElementById('placeholder');
    const shuffleBtn = document.getElementById('shuffleBtn');

    // ランダムな要素を返す
    function randomFrom(arr){
      return arr[Math.floor(Math.random()*arr.length)];
    }

    // 画像を表示する（引数は画像のパス）
    function showImage(src){
      if(!src){
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
        // 少し遅延して class を付けてフェードを発動
        requestAnimationFrame(()=>{
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

    // シャッフル動作: IMAGES 配列からランダムに表示
    function shuffle(){
      if(!IMAGES || IMAGES.length === 0){
        placeholder.textContent = 'images フォルダに画像を入れてください';
        placeholder.style.display = 'block';
        return;
      }
      // 同じ画像が連続しないように工夫
      let next = randomFrom(IMAGES);
      const current = imgEl.src.split('/').slice(-1)[0];
      // 現在のファイル名と同じなら最大5回リトライ
      let attempts = 0;
      while(next.split('/').slice(-1)[0] === current && attempts < 5){
        next = randomFrom(IMAGES);
        attempts++;
      }

      // 一度クラスを外してから次を読み込む（スムーズな遷移）
      imgEl.classList.remove('show');
      // 小さなタイミング調整
      setTimeout(()=> showImage(next), 140);
    }

    // イベント
    shuffleBtn.addEventListener('click', shuffle);

    // スペースキーでシャッフル
    window.addEventListener('keydown', (e)=>{
      if(e.code === 'Space'){
        e.preventDefault();
        shuffle();
      }
    });

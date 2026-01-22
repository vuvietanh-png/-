/**
 * ゲームの基本設定変数
 */
let money = 1000;         // 所持金
let ramdom1 = 0;         // サイコロ1の目
let ramdom2 = 0;         // サイコロ2の目
let beAmout = 0;         // 賭け金（初期値）
let isGameOver = false;  // ゲームオーバーフラグ

// サイコロ画像のパス配列
let diceImages = [
    "asset/images/dice.png",
    "asset/images/dice2.png",
    "asset/images/dice3.png",
    "asset/images/dice4.png",
    "asset/images/dice5.png",
    "asset/images/dice6.png"
];

/**
 * ゲーム開始処理
 * @param {string} choice - プレイヤーの選択 ('CHO' または 'HAN')
 */
function playGame(choice) {
    if(checkBet() === false){
        return;
    }
    try {
        // ボタンを無効化し、選択されたボタンを強調
        toggleButtons(true, choice);
        
        let count = 0;
        let maxRolls = 15; // シャッフル回数

        // サイコロ要素にアニメーション（揺れ）を追加
        const dice1Element = document.querySelector(".dice1");
        const dice2Element = document.querySelector(".dice2");
        dice1Element.classList.add("shaking");
        dice2Element.classList.add("shaking");

        // シャッフルアニメーションの開始
        let timer = setInterval(function () {
            // ランダムに目を選択 (1-6)
            ramdom1 = Math.floor(Math.random() * 6) + 1;
            ramdom2 = Math.floor(Math.random() * 6) + 1;
            
            // 画像の更新
            dice1Element.innerHTML = `<img src="${diceImages[ramdom1 - 1]}" width="100%">`;
            dice2Element.innerHTML = `<img src="${diceImages[ramdom2 - 1]}" width="100%">`;

            count++;

            // 指定回数シャッフルしたら停止
            if (count >= maxRolls) {
                clearInterval(timer);
                dice1Element.classList.remove("shaking");
                dice2Element.classList.remove("shaking");

                // 結果判定へ
                showFinalResult(choice);
            }
        }, 80);
    } catch (error) {
        console.error("エラーが発生しました:", error);
    }
}

/**
 * 結果判定と画面更新
 * @param {string} choice - プレイヤーの選択
 */
function showFinalResult(choice) {
    try {
        let total = ramdom1 + ramdom2;
        let result = (total % 2 == 0) ? "CHO" : "HAN"; // 偶数なら丁(CHO)、奇数なら半(HAN)

        const notification = document.querySelector(".notification");
        const display = document.querySelector(".display-chou-han");

        // 丁半の文字表示
        if (result === "CHO") {
            display.innerText = "丁";
        } else {
            display.innerText = "半";
        }

        // 勝敗ロジック
        if (choice === result) {
            money = money + beAmout;
            notification.innerText = "あなたの勝ちです";
            notification.style.color = "#e3e39a";
        } else {
            money = money - beAmout;
            notification.innerText = "あなたの負けです";
            notification.style.color = "red";
        }

        // ボタンの再有効化とUI更新
        toggleButtons(false);
        document.querySelector(".money").innerText = money;
        
    } catch (error) {
        console.error("結果表示エラー:", error);
    }
}

/**
 * ゲーム画面のリセット
 */
function resetGame() {
    try {
        const japnFlag = '<img class="japan-flag" src="asset/images/quocki.png">';
        document.querySelector(".dice1").innerHTML = japnFlag;
        document.querySelector(".dice2").innerHTML = japnFlag;
        document.querySelector(".display-chou-han").innerHTML = "未実行";
        document.querySelector(".notification").innerText = "";
        document.querySelector("#bet").value = 10; // デフォルト値
    } catch (error) {
        console.error("リセットエラー:", error);
    }
}

/**
 * 終了確認と遷移
 */
function endGame() {
    try {
        let v_confirm = confirm("ゲームを終了して戻りますか？");
        if (v_confirm) {
            window.location.href = "arigatou.html";
        }
    } catch (error) {
        alert("ページの移動に失敗しました。arigatou.html を確認してください。");
        console.error(error);
    }
}

/**
 * ページ遷移（ホームへ）
 */
function startGame() {
    try {
        window.location.href = "index.html";
    } catch (error) {
        console.error(error);
    }
}

/**
 * ボタンの有効化/無効化制御
 * @param {boolean} status - trueなら無効化、falseなら有効化
 * @param {string} choice - プレイヤーの選択
 */
function toggleButtons(status, choice) {
    try {
        const buttons = document.querySelectorAll("button");
        buttons.forEach(btn => {
            if (status === true) {
                // シャッフル中はボタンを無効化
                // 選択した方のボタンにはスタイルを適用（CSSクラス）
                if (btn.innerText.includes(choice === "CHO" ? "丁" : "半")) {
                    btn.disabled = false;
                    btn.classList.add("active-choice");
                } else {
                    btn.disabled = true;
                }
            } else {
                // ゲーム終了後に全てのボタンを再度有効化
                btn.disabled = false;
                btn.classList.remove("active-choice");
            }
        });
    } catch (error) {
        console.error("UI制御エラー:", error);
    }
}
function checkBet(){
    let inputBet = document.querySelector("#bet");
    let notification = document.querySelector(".notification")
    const errorMessages = {
        OVER_BALANCE: "賭け金の上限を超えています",    
        MIN_VALUE: "賭け金は1以上で入力してください",    
        INVALID_NUM: "金額を再入力してください"          
    };

    // 入力値のクリーンアップ：先頭の0を削除し数値に変換
    beAmout = +inputBet.value;
    inputBet.value = beAmout; 

    // バリデーション：所持金チェック
    if (beAmout > money) {
        inputBet.value = 10;
        notification.innerText = errorMessages.OVER_BALANCE;
        notification.style.color = "red";
        toggleButtons(false);
        return false;
    }

    // バリデーション：最小値チェック
    if (beAmout <= 0) {
        inputBet.value = 10;
        notification.innerText = errorMessages.MIN_VALUE;
        notification.style.color = "red";
        toggleButtons(false);
        return false;
    }

    // バリデーション：数値形式チェック
    if (isNaN(beAmout)) {
        inputBet.value = 10;
        notification.innerText = errorMessages.INVALID_NUM;
        notification.style.color = "red";
        toggleButtons(false);
        return false;
    }
    return true;
}
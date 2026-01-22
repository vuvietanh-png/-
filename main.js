let money = 1000;
let ramdom1 = 0;
let ramdom2 = 0;
let diceImages = ["asset/images/dice.png", "asset/images/dice2.png", "asset/images/dice3.png", "asset/images/dice4.png", "asset/images/dice5.png", "asset/images/dice6.png"]


let isGameOver = false;


function playGame(choice) {
    toggleButtons(true,choice)
    let count = 0;

    let maxRolls = 15;

    // Thêm class rung vào 2 ô xúc xắc
    const dice1Element = document.querySelector(".dice1");
    const dice2Element = document.querySelector(".dice2");
    dice1Element.classList.add("shaking");
    dice2Element.classList.add("shaking");


    let timer = setInterval(function () {

        ramdom1 = Math.floor(Math.random() * 6) + 1;
        ramdom2 = Math.floor(Math.random() * 6) + 1;
        console.log(ramdom1, ramdom2)
        dice1Element.innerHTML = `<img src="${diceImages[ramdom1 - 1]}" width="100%">`;
        dice2Element.innerHTML = `<img src="${diceImages[ramdom2 - 1]}" width="100%">`;

        count++;

        // Khi đã lắc đủ số lần (maxRolls)
        if (count >= maxRolls) {
            clearInterval(timer); // Dừng lắc
            dice1Element.classList.remove("shaking"); // Bỏ hiệu ứng rung
            dice2Element.classList.remove("shaking");

            // 3. Tính toán kết quả THẬT và hiển thị
            showFinalResult(choice);
        }

    }, 80);

}

function showFinalResult(choice) {
    let beAmout = parseInt(document.querySelector("#bet").value);

    if (beAmout > money) {
        document.querySelector(".bet").innerText = "You don't have money";
        document.querySelector(".bet").style.color = "red";
        return;
    }
    let total = ramdom1 + ramdom2;

    let result = (total % 2 == 0) ? "CHO" : "HAN"


    if (result === "CHO") {
        document.querySelector(".display-chou-han").innerText = "丁";
        if (choice === result) {
            money = money + beAmout;
            document.querySelector(".notification").innerText = "あなたの勝ちです"
        }else{
            money = money - beAmout;
            document.querySelector(".notification").innerText = "あなたの負けです"
        }
    } else {
        document.querySelector(".display-chou-han").innerText = "半";
        if (choice === result) {
            money = money + beAmout;
            document.querySelector(".notification").innerText = "あなたの勝ちです"
        }else{
            money = money - beAmout;
            document.querySelector(".notification").innerText = "あなたの負けです"
        }
    }
    toggleButtons(false)
    document.querySelector(".money").innerText = money;
}

function resetGame() {
    let defaultMoney = 0;

    const japnFlag = '<img class="japan-flag" src="asset/images/quocki.png">';
    document.querySelector(".dice1").innerHTML = japnFlag;
    document.querySelector(".dice2").innerHTML = japnFlag;
    document.querySelector(".display-chou-han").innerHTML = "未実行"
    document.querySelector("#bet").value = defaultMoney;
}
function endGame() {
    window.location.href = "arigatou.html"
}

function startGame() {
    window.location.href = "index.html"
    document.querySelector(".money").innerText = money
}

function toggleButtons(status,choice) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        if(status === true){
            if(btn.innerText.includes(choice === "CHO" ? "丁" :"半" )){
                btn.disabled = false
                btn.classList.add = ("active-choice:hover")
            }else{
                btn.disabled = true;
               
            }

        }else{
            btn.disabled = false
        }
    });
}


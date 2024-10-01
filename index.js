//setTimeout
//setInterval
//axis
//익명함수 (화살표 함수)

const game = document.querySelector(".game");
const icon = document.querySelector(".game img");
const title = document.querySelector(".game h1");
const content = document.querySelector(".game p");
const recordlist = document.querySelector(".record");

let start = 0;
let step = 0;
let end = 0;
let waitTimeout;
let records = [];
recordRenewal();

game.addEventListener("click",()=>{
    switch(step){
        case 0:
            prepare();
            break;
        case 1:
            fail();
            break;
        case 2:
            success();
            break;
        case 3:
            prepare();
            break;
}
});



function prepare(){
    step=1;
    game.classList.add("red");
    icon.src = "/image/dots.png";
    title.innerText = "기다리세요";
    content.classList.add("hidden");
    waitTimeout = setTimeout(wait, Math.random()%4000+2000);
}

function wait(){
    step = 2;
    game.classList.add("green");
    game.classList.remove("red");
    title.innerText = "클릭";
    const now = new Date();
    start = now.getTime();
}

function success(){
    step = 3;
    const now = new Date();
    end = now.getTime();
    game.classList.remove("green");
    icon.src = "/image/three-o-clock-clock.png";
    title.innerText = `${end-start}ms`;
    content.classList.remove("hidden");
    content.innerText="클릭하면 다시";

    records.push(end-start);
    records.sort((a,b)=>{return a-b});
    if(records.length > 5){
        records.pop();
    }
    window.localStorage.setItem("record",JSON.stringify(records));
    recordRenewal();
}


function fail(){
    clearTimeout(waitTimeout);
    step = 3;
    game.classList.remove("green");
    game.classList.remove("red");
    icon.src = "/image/느낌표.png";
    content.classList.remove("hidden");
    content.innerText="클릭하면 다시";
    title.innerText="초록색이 되면 클릭하세요";

}

function recordRenewal(){
    const data = window.localStorage.getItem("record");

    if(data){
        records = JSON.parse(data);
        console.log(records);
    }
    recordlist.innerHTML = "";
    
    for(let i=0;i<records.length;i++){
        const li = document.createElement("li");
        li.innerText = records[i] + "ms";
        recordlist.appendChild(li);
    }
}
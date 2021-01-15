let score = 0;
let skipped = 0;
// let time = 10;
let running = true;

let button = document.querySelector("#start-game");
button.addEventListener('click', StartGame);

let moles = document.querySelectorAll(".mole");
moles.forEach(mole => mole.addEventListener('click', RemoveMoleIfClicked));

function GetRandomInt(min, max)
{
    return Math.floor(Math.random()*(max+1-min) + min); //expected min..max
}

function SpawnRandomMole()
{
    let index = GetRandomInt(1,8);
    let element = document.querySelector(".mole" + index);
    element.setAttribute("style", "display:block");

    // Set timeout so mole disappear after some time
    setTimeout(RemoveMoleAfterSomeTime, 1000, index);
    return index;
}

// I think there might be bug here
// What if we spawn our mole, this function gets tineouted, 
// then we spawn mole again here and BAM, this fuinction get called form previous spawn 
// and our mole almost instantly pops away
// not pleasant, but i have no time and desire to fix this
function RemoveMoleAfterSomeTime(index)
{
    let element = document.querySelector(".mole" + index);
    if(element.getAttribute("style", "display:block"))
    {
        element.setAttribute("style","display:none");
    }
    if(running) skipped++;
    UpdateSkipped();
}

function RemoveMole(index)
{
    let element = document.querySelector(".mole" + index);
    element.setAttribute("style", "display:none");
}

function RunGame()
{
    running = true;
    let game_time_in_ms = 10000;
    let game_time_in_s = game_time_in_ms / 1000;
    let mole_spawn_time_in_ms = 400;

    let spawn_timer_id = setInterval(SpawnRandomMole, mole_spawn_time_in_ms);
    // let time_timer_id  = setInterval(UpdateTimer, 1000); // every second
    let game_timer_id  = setTimeout(StopGame, game_time_in_ms, spawn_timer_id);
    
    console.log("Start");
}


function StopGame(spawn_timer_id)
{
    running = false;
    // time = 0;
    // UpdateTimer();
    // clearInterval(time_timer_id);
    clearInterval(spawn_timer_id);
    console.log("End");
    button.addEventListener("click", StartGame);
    button.innerHTML = "Start game";
}

function InitGame()
{
    score = 0;
    skipped = 0;
    /*
    time = 10;
    time++; // a little hack
    UpdateTimer();
    */
    UpdateScore();
    UpdateSkipped();

    button.removeEventListener("click", StartGame);
    button.innerHTML = "Wait till the end of the game";
}

function RemoveMoleIfClicked()
{
    if(this.getAttribute("style", "display:block"))
    {
        this.setAttribute("style", "display:none");
        if(running) score++;
    }
    UpdateScore();
}

/*
function UpdateTimer()
{
    if(time != 0) time--;
    let element = document.querySelector("#timer");
    timer.innerHTML = "Time left: " + time;
}
*/

function UpdateScore()
{
    let element = document.querySelector("#score");
    element.innerHTML = "Score: " + score;
}

function UpdateSkipped()
{
    let element = document.querySelector("#skipped");
    element.innerHTML = "Skipped: " + skipped;
}

function StartGame()
{
    InitGame();
    RunGame();
}


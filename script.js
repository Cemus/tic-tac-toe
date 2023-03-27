
let firstLine = ["[]", "[]", "[]"];
let secondLine = ["[]", "[]", "[]"];
let thirdLine = ["[]", "[]", "[]"];
let casesLibres = [0, 1, 2, 3, 4, 5, 6, 7, 8]
let turn = "human";

const text = document.getElementById("text");
const caze = [];
for (let i = 0; i < 9; i++) {
    caze[i] = document.getElementById(i);
}

Listener();
againListener()

function Reset(again){
    firstLine = ["[]", "[]", "[]"];
    secondLine = ["[]", "[]", "[]"];
    thirdLine = ["[]", "[]", "[]"];
    casesLibres = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    changementTour();
    for (let i = 0; i < 9; i++) {
        caze[i] = document.getElementById(i);
        caze[i].style.backgroundImage = "";
    }  
    again.style.visibility = "hidden";
}


function againListener(){
    const again = document.getElementById("again");
    again.addEventListener("click", () => {
        Reset(again);
    });
}

function changementTour(){
    switch (turn){
        case "human":
            turn = "computer";
            text.innerHTML = "Computer turn"
            setTimeout(() => {
                computerTurn();              
            }, 1000);
            break;

        case "computer":
            turn = "human";
            text.innerHTML = "Your turn"
            break;
    }

}

function testCase(array, ident){
    condition = false;
    for (let i = 0; i < array.length; i++) {
        if (array[i] == ident){
            condition = true;
        }     
    }
    return condition;
}

function finDuJeu(){
    condition = false;
    const again = document.getElementById("again");
    const humanScore = document.getElementsByClassName("human-score");
    const computerScore = document.getElementsByClassName("computer-score");
    if (determineWinner(turn)){
        switch (turn){
            case "human":
                text.innerHTML = "You win!"
                humanScore[0].innerHTML = parseInt(humanScore[0].innerHTML) + 1;
                break;

            case "computer":
                text.innerHTML = "You lose..."
                computerScore[0].innerHTML = parseInt(computerScore[0].innerHTML) + 1;
                break;
        }
        condition = true;
    }
    else if (coupsPossibles(casesLibres).length == 0){
        text.innerHTML = "It's a tie."
        condition = true;
    }
    if (condition == true){
        again.style.visibility = "visible";
    }
    return condition;
}

function Listener(){
        caze.forEach(caz => {
            caz.addEventListener("click", () => {
                if (turn == "human"){
                    let coup = caz.id;
                    array = coupsPossibles(casesLibres);
                    if (finDuJeu() == false){
                        if (testCase(array, coup)){
                            placementCoup(coup)
                            caz.style.backgroundImage = "url(img/x.svg)";
                            if (determineWinner(turn)) {
                                finDuJeu();
                                return;
                            }
                            else{
                                changementTour(); 
                                return;                                  
                            }
                        }
                    }
                }
            });
        });                
}

function placementCoup(coup){
    if (coup < 3){
        firstLine[coup] = turn;
    }
    else if (coup > 2 && coup < 6){   
        secondLine[coup - 3] = turn;
    }
    else if (coup > 5 && coup < 9){
        thirdLine[coup - 6] = turn;
    }
}

function computerTurn(){
    console.log(finDuJeu());
    if (finDuJeu() == false){
        let array = coupsPossibles(casesLibres);
        let coup = array[0];

        placementCoup(coup);

        console.log(caze[coup]);
        caze[coup].style.backgroundImage = "url(img/o.svg)";

        if (determineWinner(turn)) {
            finDuJeu();
            return;
        }
        else{
            changementTour();
        }
    }
}

function determineWinner(player){
    if (firstLine[0] == firstLine[1] && firstLine[1] == firstLine[2] && firstLine[0] == player || //lignes
        secondLine[0] == secondLine[1] && secondLine[1] == secondLine[2] && secondLine[0] == player ||
        thirdLine[0] == thirdLine[1] && thirdLine[1] == thirdLine[2] && thirdLine[0] == player ||
        firstLine[0] == secondLine[0] && secondLine[0] == thirdLine[0] && firstLine[0] == player|| //colonnes
        firstLine[1] == secondLine[1] && secondLine[1] == thirdLine[1] && firstLine[1] ==  player||
        firstLine[2] == secondLine[2] && secondLine[2] == thirdLine[2] && firstLine[2] == player||
        firstLine[0] == secondLine[1] && secondLine[1] == thirdLine[2] && firstLine[0] == player|| //diagonales
        firstLine[2] == secondLine[1] && secondLine[1] == thirdLine[0] && firstLine[2] == player){
        return true;
    }
    else{
        return false;
    }
}

function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
}

function coupsPossibles(array){
    arr = [...array];
    for (let i = 0; i < 9; i++) {
        if (i < 3){
            if (firstLine[i] != "[]"){
                arr.splice(arr.indexOf(i), 1)
            }
        }
        if (i > 2 && i < 6){
            if (secondLine[i-3] != "[]"){
                arr.splice(arr.indexOf(i), 1)
            }
        }
        if (i > 5 && i < 9){
            if (thirdLine[i-6] != "[]"){
                arr.splice(arr.indexOf(i), 1)
            }
        }
    }
    shuffleArray(arr)
    return arr;
}

function tourRandomisé(player){
    let adversaire = player == "x" ? "o" : "x";
    //check empty space
    let array = coupsPossibles(casesLibres);
    if (array.length == 0){
        console.log("Tie");
        return;
    }
    let coup = array[0];

    if (coup < 3){
        firstLine[coup] = `[${player}]`;
    }
    else if (coup > 2 && coup < 6){   
        secondLine[coup - 3] = `[${player}]`;
    }
    else if (coup > 5 && coup < 9){
        thirdLine[coup - 6] = `[${player}]`;
    }
    Gamboard();
    console.log(`${player} played ${coup}`)
    setTimeout(() => {
        if (determineWinner(player)) {
            console.log(`The winner is ${player}`); 
            return;  
        }
        else{
            tourRandomisé(adversaire); 
        }
    }, 1000);
}






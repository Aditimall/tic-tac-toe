const boxes=document.getElementsByClassName("game-cell");
const board=[];
var ptr=0;
for(let i=0;i<3;i++){
    board.push([]);
    for(let j=0;j<3;j++){
        board[i].push(boxes[i+j*3]);
    }
}

function evaluate(){
    for(let row=0;row<3;row++){
        if(board[row][0].innerHTML===board[row][1].innerHTML&&
            board[row][1].innerHTML===board[row][2].innerHTML){
                if(board[row][0].innerHTML==='X') return -10;
                if(board[row][0].innerHTML==='O') return 10;
            }
    }

    for(let col=0;col<3;col++){
        if(board[0][col].innerHTML===board[1][col].innerHTML&&
            board[1][col].innerHTML===board[2][col].innerHTML){
                if(board[0][col].innerHTML==='X') return -10;
                if(board[0][col].innerHTML==='O') return 10;
            }
    }

    if(board[0][0].innerHTML===board[1][1].innerHTML&&
        board[1][1].innerHTML===board[2][2].innerHTML){
            if(board[1][1].innerHTML==='X') return -10;
            if(board[1][1].innerHTML==='O') return 10;
        }

    if(board[0][2].innerHTML===board[1][1].innerHTML&&
        board[1][1].innerHTML===board[2][0].innerHTML){
            if(board[1][1].innerHTML==='X') return -10;
            if(board[1][1].innerHTML==='O') return 10;
        }
    
    return 0;
}

function isOver(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j].innerHTML==='-') return false;
        }
    }
    return true;
}

function minimax(isMax){
    const score = evaluate();
    if(score===10) return 10;
    if(score===-10) return -10;
    if(isOver()) return 0;

    if(isMax){
        let best=-1000;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j].innerHTML==='-'){
                    board[i][j].innerHTML='O';
                    best=Math.max(best,minimax(!isMax));
                    board[i][j].innerHTML='-';
                }
            }
        }
        return best;
    }
    else{
        let best=1000;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j].innerHTML==='-'){
                    board[i][j].innerHTML='X';
                    best=Math.min(best,minimax(!isMax));
                    board[i][j].innerHTML='-';
                }
            }
        }
        return best;
    }
}

for(let i=0;i<boxes.length;i++){
    const box=boxes[i];
    box.addEventListener("click",(e)=>{
        if(box.innerHTML!=='-') return;
        box.innerHTML='X';
        let minScore=-1001,move_row=-1,move_col=-1;
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                if(board[i][j].innerHTML==='-'){
                    board[i][j].innerHTML='O';
                    let temp=minimax(false);
                    if(temp>minScore){
                        move_row=i;
                        move_col=j;
                        minScore=temp;
                    }
                    board[i][j].innerHTML='-';
                }
            }
        }
        if(move_row!==-1)
            board[move_row][move_col].innerHTML='O';
        let sc=evaluate();
        if(sc!=0||isOver()){
            console.log("GAME OVER!!!");
            alert("COMPLETED!!!");
        }
    });
}
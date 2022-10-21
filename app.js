const board = document.querySelector('#board');
const restart = document.querySelector('#restart');
let j = 0;

const play = function(e) {
    if(e.target.nodeName == 'TD'){
        if(j%2 == 0)
            e.target.innerText = 'X';
        else
            e.target.innerText = 'O';
        j++;
        e.target.classList.add('filled');
    }
    
    if(checkWin()){
        board.removeEventListener('click', play);
        document.body.classList.add('win');
    }
    if (j>=9) {
        board.removeEventListener('click', play);
        document.body.classList.add('draw');
    }
}

board.addEventListener('click', play);

restart.addEventListener('click', () => {
    j = 0;
    document.querySelectorAll('td').forEach(td => {
        td.innerText = ' ';
        td.classList.remove('filled');
    });
    board.addEventListener('click', play);
    document.body.classList.remove('win');
    document.body.classList.remove('draw');
})

function checkWin(){
    const tds = document.querySelectorAll('td');
    const matrix = [[tds[0].innerText,tds[1].innerText,tds[2].innerText],
    [tds[3].innerText, tds[4].innerText, tds[5].innerText],
    [tds[6].innerText, tds[7].innerText, tds[8].innerText]];
    for (let i = 0; i < 3; i++) {
        if(( matrix[i][0] === matrix[i][1]) && (matrix[i][1] === matrix[i][2]) && matrix[i][0].length > 0){
            return true;
        }
    }
    for (let i = 0; i < 3; i++) {
        if(( matrix[0][i] === matrix[1][i] ) && ( matrix[1][i] === matrix[2][i] ) && matrix[0][i].length > 0){
            return true;
        }
    }
    if(( matrix[0][0] === matrix[1][1] ) && ( matrix[1][1] === matrix[2][2] ) && matrix[0][0].length > 0){
        return true;
    }
    if(( matrix[0][2] === matrix[1][1] ) && ( matrix[1][1] === matrix[2][0] ) && matrix[0][2].length > 0){
        return true;
    }
    return false;
}
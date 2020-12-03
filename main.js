const canvas = document.getElementById('board')

const ctx = canvas.getContext('2d')
ctx.canvas.width = COLS * BLOCK_SIZE;
ctx.canvas.height = ROWS * BLOCK_SIZE;
ctx.scale(BLOCK_SIZE, BLOCK_SIZE);

const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

ctxNext.canvas.width = 4 * BLOCK_SIZE;
ctxNext.canvas.height = 4 * BLOCK_SIZE;
ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);

const board = new Board(ctx);

const time = {start: 0, elapsed: 0, level: 1000};

let requestId;

const moves = {
    [KEY.LEFT]: p => ({...p, x: p.x - 1}),
    [KEY.RIGHT]: p => ({...p, x: p.x + 1}),
    [KEY.DOWN]: p => ({...p, y: p.y + 1}),
    [KEY.SPACE]: p => ({...p, y: p.y + 1}),
    [KEY.UP]: (p) => board.rotate(p),
}

let accountValues = {
    score: 0,
    lines: 0,
    level: 0,
}

function play() {
    resetGame();
    animate();
}



document.addEventListener('keydown', event => {
    if (moves[event.keyCode]) {
        event.preventDefault();

        let p = moves[event.keyCode](board.piece)

        if (event.keyCode === KEY.SPACE) {
            while (board.valid(p)) {
                account.score += POINTS.HARD_DROP;
                board.piece.move(p)
                p = moves[KEY.DOWN](board.piece);
            }
        } else if (board.valid(p)) {
            board.piece.move(p);
            if (event.keyCode === KEY.DOWN) {
                account.score += POINTS.SOFT_DROP
            }
        }
    }
})

function gameOver () {
    cancelAnimationFrame(requestId);
    ctx.fillStyle = 'black';
    ctx.fillRect(1,3,8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'red';
    ctx.fillText('GAME OVER', 1.8, 4)
}

function animate(now = 0) {
    time.elapsed = now - time.start;

    if(time.elapsed > time.level) {
        time.start = now;
        if (!board.drop()) {
            gameOver();
            return;
        }
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    board.draw();
    requestId = requestAnimationFrame(animate);
}

function updateAccount(key, value) {
    let element = document.getElementById(key);
    if (element) {
        element.textContent = value;
    }
}

let account = new Proxy(accountValues, {
    set: (target, key, value) => {
        target[key] = value;
        updateAccount(key, value);
        return true
    }
})

function resetGame() {
    account.score = 0;
    account.lines = 0;
    account.level = 0;

    board.reset();

    board.piece = new Piece(ctx);
    board.piece.setStartPosition()
}

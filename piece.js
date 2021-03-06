class Piece {
    constructor(ctx) {
        this.ctx = ctx;
        this.spawn();
    }

    spawn() {
        this.typeId = this.randomizeTetrominoType(COLORS.length);
        this.shape = SHAPES[this.typeId];
        this.color = COLORS[this.typeId];

        this.x = 0;
        this.y = 0;
    }

    setStartPosition() {
        this.x = this.typeId === 4 ? 4 : 3;
    }

    draw() {
        this.ctx.fillStyle = this.color;
        this.shape.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value > 0) {
                   this.ctx.fillRect(this.x + x, this.y + y, 1, 1)
                }
            })
        })
    }

    move(p) {
        this.x = p.x;
        this.y = p.y;
        this.shape = p.shape;
    }

    randomizeTetrominoType(noOfTypes) {
        return Math.floor(Math.random() * noOfTypes);
    }
}

export class Square {
    constructor(x, y, colorX, colorY, level, width, height) {
        this.x = x;
        this.y = y;
        this.colorX = colorX;
        this.colorY = colorY;
        this.level = level;
        this.width = width;
        this.height = height;
    }

    update() {
        // Empty update method
    }

    render(ctx, colors, drawTriangleFilled) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        drawTriangleFilled(ctx, this.x, this.y, this.x + this.width, this.y, this.x + this.width, this.y + this.height, colors[this.colorX].colorCode);
        drawTriangleFilled(ctx, this.x, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height, colors[this.colorY].colorCode);
    }
} 
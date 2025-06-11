export class Square {
    constructor(x, y, colorX, colorY, level, width, height) {
        this.x = x;
        this.y = y;
        this.colorX = colorX;
        this.colorY = colorY;
        this.level = level;
        this.width = width;
        this.height = height;
        this.cost = Math.max(1, Math.pow(10, colorX) * Math.pow(10, colorY-4));
    }

    update() {
        // Empty update method
    }

    render(ctx, colors, drawTriangleFilled) {
        // Check if we can afford this square
        const canAfford = colors[this.colorX].balance >= this.cost || colors[this.colorY].balance >= this.cost;
        
        // Draw the square background
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);

        if (canAfford) {
            // Highlight affordable unbought squares
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 3;
        } else {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
        }
        ctx.stroke();

        // Draw the triangles with appropriate opacity
        const opacity = this.level === 0 ? '70' : 'ff';
        const colorXCode = colors[this.colorX].colorCode + opacity;
        const colorYCode = colors[this.colorY].colorCode + opacity;

        drawTriangleFilled(ctx, this.x, this.y, this.x + this.width, this.y, this.x + this.width, this.y + this.height, colorXCode);
        drawTriangleFilled(ctx, this.x, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height, colorYCode);

        // Draw cost
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.level === 0 ? '#666666' : '#000000';
        ctx.fillText(
            this.cost.toString(),
            this.x + this.width/2,
            this.y + this.height/2
        );
    }
} 
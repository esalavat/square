export class Square {
    constructor(x, y, colorX, colorY, level, width, height) {
        this.x = x;
        this.y = y;
        this.colorX = colorX;
        this.colorY = colorY;
        this.level = level;
        this.width = width;
        this.height = height;
        this.baseCost = Math.max(1, Math.pow(10, colorX) * Math.pow(10, colorY-4));
    }

    get cost() {
        return this.baseCost * (this.level + 1);
    }

    update() {
        // Empty update method
    }

    isAdjacentToActive(squares) {
        // Get grid position
        const gridX = this.colorX;
        const gridY = this.colorY - 4; // Adjust for the offset in colorY

        // Check all adjacent squares
        const adjacentPositions = [
            {x: gridX - 1, y: gridY}, // left
            {x: gridX + 1, y: gridY}, // right
            {x: gridX, y: gridY - 1}, // up
            {x: gridX, y: gridY + 1}  // down
        ];

        for (let pos of adjacentPositions) {
            // Skip if out of bounds
            if (pos.x < 0 || pos.x >= 4 || pos.y < 0 || pos.y >= 4) continue;

            // Find the adjacent square
            const adjacentSquare = squares.find(s => 
                s.colorX === pos.x && s.colorY === pos.y + 4
            );

            if (adjacentSquare && adjacentSquare.level > 0) {
                return true;
            }
        }

        return false;
    }

    shouldShow(squares) {
        return this.level > 0 || this.isAdjacentToActive(squares);
    }

    render(ctx, colors, drawTriangleFilled, squares) {
        if (!this.shouldShow(squares)) {
            return; // Don't render if not active or adjacent to active
        }

        // Check if we can afford this square
        const canAfford = colors[this.colorX].balance >= this.cost || colors[this.colorY].balance >= this.cost;
        
        // Draw the square background
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);

        if (canAfford) {
            // Highlight affordable unbought squares
            ctx.strokeStyle = '#00ff00';
            ctx.lineWidth = 4;
        } else {
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 1;
        }
        ctx.stroke();

        // Draw the triangles with appropriate opacity
        const opacity = this.level === 0 ? '50' : 'ff';
        const colorXCode = colors[this.colorX].colorCode + opacity;
        const colorYCode = colors[this.colorY].colorCode + opacity;

        drawTriangleFilled(ctx, this.x, this.y, this.x + this.width, this.y, this.x + this.width, this.y + this.height, colorXCode);
        drawTriangleFilled(ctx, this.x, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height, colorYCode);

        // Draw cost
        ctx.font = '25px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this.level === 0 ? '#666666' : '#000000';
        ctx.fillText(
            this.cost.toString(),
            this.x + this.width/2,
            this.y + this.height/2
        );

        // Draw level in bottom right
        if (this.level > 0) {
            ctx.font = '20px Arial';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = '#000000';
            ctx.fillText(
                '+' + this.level.toString(),
                this.x + this.width - 5,
                this.y + this.height - 5
            );
        }
    }
} 
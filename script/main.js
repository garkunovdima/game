const OBJECTS = [];
const WALL_THIСKNESS = 10;
const BALL_RAIUS = 5;
const BRICK_COL = 5;
const BRICK_ROW = 3;
const BALL_X = Math.floor(Math.random(document.documentElement.clientWidth - 2 * WALL_THIСKNESS)) + WALL_THIСKNESS;
const BALL_Y = Math.floor(Math.random(document.documentElement.clientHeight / 2 - 2 * WALL_THIСKNESS) + document.documentElement.clientHeight / 2);

window.onload = () => {

    OBJECTS.push(new Ball({
        x: BALL_X,
        y: BALL_Y,
        width: BALL_RAIUS * 2,
        height: BALL_RAIUS * 2,
    }));

    OBJECTS.push(new Wall({ // top
        x: 0,
        y: 0,
        width: document.documentElement.clientWidth - WALL_THIСKNESS,
        height: WALL_THIСKNESS,
        pos: 'top',
    }));

    OBJECTS.push(new Wall({ // bot
        x: 0,
        y: document.documentElement.clientHeight - WALL_THIСKNESS,
        width: document.documentElement.clientWidth - WALL_THIСKNESS,
        height: WALL_THIСKNESS,
        pos: 'bot',
    }));

    OBJECTS.push(new Wall({ // left
        x: 0,
        y: 0,
        width: WALL_THIСKNESS,
        height: document.documentElement.clientHeight,
        pos: 'left',
    }));

    OBJECTS.push(new Wall({ // right
        x: document.documentElement.clientWidth - WALL_THIСKNESS,
        y: 0,
        width: WALL_THIСKNESS,
        height: document.documentElement.clientHeight,
        pos: 'right',
    }));

    createRacket();
    createBricks();

    console.log(OBJECTS);
    console.log('gabarit x y', OBJECTS[0].gabarit_x, OBJECTS[0].gabarit_y, );
    console.log('x y', OBJECTS[0].x, OBJECTS[0].y, );
    console.log('w h', OBJECTS[0].width, OBJECTS[0].height, );

    setInterval(() => {
        for (let i = 0; i < OBJECTS.length; i++) {
            OBJECTS[i].move();
            for (let j = 1; j < OBJECTS.length; j++) {
                checkCollision(OBJECTS[i], OBJECTS[j]);
            }
        }
        //   console.log('ball', OBJECTS[0].x, OBJECTS[0].y, );

    }, 30);

}

function createRacket() {
    let r = new Wall({
        x: 0,
        y: Math.floor(document.documentElement.clientHeight - document.documentElement.clientHeight / 8),
        width: 100,
        height: WALL_THIСKNESS,

        move: () => {
            this.renderSet();
            this.renderChange();
        },

        renderSet: () => {
            this.x = this.x + this.direction_x;
            this.y = this.y + this.direction_y;

            this.gabarit_x = this.x + this.width;
            this.gabarit_y = this.y + this.height;
        },

        renderChange: () => {
            this._block.style.left = `${this.x}px`;
            this._block.style.top = `${this.y}px`;
        },
    })

    // OBJECTS.push(r);
}

function Wall(args) {
    this.x = args.x;
    this.y = args.y;
    this.width = args.width;
    this.height = args.height;
    this.pos = args.pos;

    this.gabarit_x = this.x + WALL_THIСKNESS;
    this.gabarit_y = this.y + WALL_THIСKNESS;

    this.createElement = () => {
        let block = document.createElement('div');
        block.style.cssText = `
            display: inline-block;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.width}px;
            height: ${this.height}px;
            background: black;
            `;

        document.body.append(block);
        return block;
    }

    this._block = this.createElement();

    this.move = args.move ? args.move : () => {
        this.gabarit_x = this.x + this.width;
        this.gabarit_y = this.y + this.height;
    }
}

function Ball(args) {

    this.id = 'ball';

    this.x = args.x;
    this.y = args.y;
    this.width = args.width;
    this.height = args.height;

    this.gabarit_x = this.x + this.width;
    this.gabarit_y = this.y + this.height;

    this.direction_x = 1;
    this.direction_y = 1;

    this.createElement = () => {
        let block = document.createElement('div');
        block.style.cssText = `
            display: inline-block;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.width}px;
            height: ${this.height}px;
            background: red;
            border-radius: 50%;
            `;

        document.body.append(block);
        return block;
    }

    this._block = this.createElement();

    this.move = () => {
        this.renderSet();
        this.renderChange();
    }

    this.renderSet = () => {
        this.x = this.x + this.direction_x;
        this.y = this.y + this.direction_y;

        this.gabarit_x = this.x + this.width;
        this.gabarit_y = this.y + this.height;
    }

    this.renderChange = () => {
        this._block.style.left = `${this.x}px`;
        this._block.style.top = `${this.y}px`;
    }
}

function Brick(args) {

    this.x = args.x;
    this.y = args.y;
    this.width = args.width;
    this.height = args.height;

    this.id = args.id;

    this.gabarit_x = this.x + this.width;
    this.gabarit_y = this.y + this.height;

    this.createElement = () => {

        let block = document.createElement('div');

        block.style.cssText = `
            display: inline-block;
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.width}px;
            height: ${this.height}px;
            background: brown;
            `;

        document.body.append(block);
        return block;
    }

    this._block = this.createElement();

    this.move = () => {
        this.gabarit_x = this.x + this.width;
        this.gabarit_y = this.y + this.height;
    }

}

function createBricks() {

    let part_x = document.documentElement.clientWidth - WALL_THIСKNESS;
    part_x = part_x / (BRICK_COL * 2 + 1);
    part_x = Math.floor(part_x);
    console.log(part_x);

    brick_width = Math.floor((document.documentElement.clientWidth / BRICK_COL) / 2); // ширина кирпича
    brick_height = Math.floor((document.documentElement.clientHeight / BRICK_COL) / 4); // высота кирпича

    let step_x = brick_width //Math.floor((step_x / BRICK_COL) / 10);
    let step_y = brick_height // Math.floor((step_y / BRICK_COL) / 10);

    //let brick_extreme = Math.floor(brick_width / 2); //крайние отступы группы кирпичей

    let margin_x = part_x + WALL_THIСKNESS;
    let margin_y = Math.floor(step_y / 4) + WALL_THIСKNESS;

    let id_for_brick = 0;

    for (let j = 0; j < BRICK_ROW; j++) {
        for (let i = 0; i < BRICK_COL; i++) {
            OBJECTS.push(new Brick({
                x: margin_x,
                y: margin_y,
                width: part_x,
                height: brick_height,
                id: id_for_brick,
            }))
            margin_x = margin_x + 2 * part_x;
            id_for_brick++;
        }
        margin_x = part_x + WALL_THIСKNESS;
        margin_y = margin_y + Math.floor(step_y / 4) + WALL_THIСKNESS;

    }

    console.log(OBJECTS);
}

function checkCollision(obj_a, obj_b) {

    let ball = null;
    let wall = null;
    let brick = null;

    if (obj_a instanceof Ball) {
        ball = obj_a;
    } else if (obj_a instanceof Wall) {
        wall = obj_a;
    } else if (obj_a instanceof Brick) {
        brick = obj_a;
    }

    if (obj_b instanceof Ball) {
        ball = obj_b;
    } else if (obj_b instanceof Wall) {
        wall = obj_b;
    } else if (obj_b instanceof Brick) {
        brick = obj_b;
    }

    if (ball && wall) {
        if (wall.y === ball.y || wall.y === ball.gabarit_y || wall.gabarit_y === ball.y) { //
            ball.direction_y = ball.direction_y * -1;
        }
        if (wall.x === ball.x || wall.x === ball.gabarit_x || wall.gabarit_x === ball.x) { //
            ball.direction_x = ball.direction_x * -1;
        }
    }

    if (ball && brick) {
        if ((ball.gabarit_y === brick.y || ball.y === brick.gabarit_y) && ball.gabarit_x >= brick.x && ball.x <= brick.gabarit_x) { //
            ball.direction_y = ball.direction_y * -1;
        } else if ((ball.gabarit_x === brick.x || ball.x === brick.gabarit_x) && ball.gabarit_y >= brick.y && ball.y <= brick.gabarit_y) { //
            ball.direction_x = ball.direction_x * -1;
        }
    }


}
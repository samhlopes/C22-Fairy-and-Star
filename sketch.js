var starImg, bgImg;
var star, starBody;
//criar variável para sprite de fada e imgFada
var fada, imgFada, vozFada
var estaEmCooldown = false;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload() {
    starImg = loadImage("images/starImage.png");
    bgImg = loadImage("images/starNight.png");
    //carregar animação de fada 
    imgFada = loadAnimation("images/fairyImage1.png", "images/fairyImage2.png");
    vozFada = loadSound("sound/JoyMusic.mp3");
}

function setup() {
    createCanvas(800, 750);


    //escrever código para tocar o som vozFada
    vozFada.play();

    //criar sprite de fada e adicionar animação para fada
    fada = createSprite(400, 530)
    fada.addAnimation("fadaVoando", imgFada);
    fada.scale = 0.3;

    star = createSprite(650, 30);
    star.addImage(starImg);
    star.scale = 0.05;

    engine = Engine.create();
    world = engine.world;

    starBody = Bodies.circle(650, 30, 5, { restitution: 0.5, isStatic: true});
    World.add(world, starBody);

    Engine.run(engine);
}

function draw() {
    background(bgImg);

    if (keyDown("LEFT_ARROW")) {
        fada.x += -6;

        if(keyDown("SHIFT") && !estaEmCooldown) {
            fada.x += -200;
            estaEmCooldown = true;
            setInterval(() => {
                estaEmCooldown = false
            }, 2000);
        }
    }

    if (keyDown("RIGHT_ARROW")) {
        fada.x += 5;

        if(keyDown("SHIFT") && !estaEmCooldown ) {
            fada.x += 200;
            estaEmCooldown = true;
        }

        if (keyDown ("C")) {
            fada.x -= 4;
        }
    }

    star.y = starBody.position.y

    if(fada.x === 500) {
            Matter.Body.setStatic(starBody,false);
    }

    if (star.y > 470 && starBody.position.y > 490) {
        Matter.Body.setStatic(starBody,true);
    }

    drawSprites()
}
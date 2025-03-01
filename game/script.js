class Plant {
    constructor(image,x,y,width,height){
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.healt = 300
    }    

    draw(ctx){
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height)
    }
}

class Flower extends Plant {
    constructor(image,x,y,width,height, healt){
        super(image,x,y,width,height, healt)
        this.sunConsum = 50
    }
}

class Pea extends Plant {
    constructor(image,x,y,width,height, healt){
        super(image,x,y,width,height, healt)
        this.sunConsum = 100
    }
}

class Ice extends Plant {
    constructor(image,x,y,width,height, healt){
        super(image,x,y,width,height, healt)
        this.sunConsum = 175
    }
}

class Wall extends Plant {
    constructor(image,x,y,width,height){
        super(image,x,y,width,height)
        this.sunConsum = 50
        this.healt = 2800
    }
}

class Machine extends Plant {
    constructor(id,image,x,y,width,height){
        super(image,x,y,width,height)
        this.id = id
    }
}

class Sun {
    constructor(image,x,y,width,height){
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.velocity = 3
    }

    randomPlace(boardWidth){
        let random = Math.random() * boardWidth - this.width
        this.x = random
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }

}

class Seed {
    constructor(id,image,x,y,width,height){
        this.id = id
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    
    draw(ctx){
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height)
    }
}

class SeedFlower extends Seed {
    constructor(id,image,x,y,width,height){
        super(id,image,x,y,width,height)
    }
}

class SeedPea extends Seed {
    constructor(id,image,x,y,width,height){
        super(id,image,x,y,width,height)
    }
}

class SeedIce extends Seed {
    constructor(id,image,x,y,width,height){
        super(id,image,x,y,width,height)
    }
}


class SeedWall extends Seed {
    constructor(id,image,x,y,width,height){
        super(id,image,x,y,width,height)
    }
}


class Pointer {
    constructor(x,y,width,height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.detect = false
    }

    defaultDetect(){
        this.detect = false
    }
    
    draw(ctx){
        ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

class Dart {
    constructor(id,image,x,y,width,height){
        this.id = id
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    draw(ctx){
        ctx.drawImage(this.image,this.x,this.y ,this.width,this.height)
    }

    setId(id){
        this.id = id
    }
}

class Zombie {
    constructor(image, x,y,width,height){
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.speed = 0.3
        this.healt = 6
    }

    randomPlace(){
        let random = Math.random()

        if(random > 0.8){
            this.y = 200 
        } else if(random > 0.6){
            this.y = 335 
        } else if(random > 0.4){
            this.y = 470 
        } else if (random > 0.2){
            this.y = 610 
        } else {
            this.y = 745 
        }
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y,this.width,this.height)
    }
}

class Shooter {
    constructor(image,x,y,width,height){
        this.image = image
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.access = true
    }

    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y,this.width,this.height)
    }
}

class PeaShooter extends Shooter {
    constructor(image,x,y,width,height,access){
        super(image,x,y,width,height,access)
        this.damage = 1
    }
}


class IceShooter extends Shooter {
    constructor(image,x,y,width,height,access){
        super(image,x,y,width,height,access)
        this.damage = 1
        this.slow = 0.1
        this.duration = 1.5 * 1000  
    }
}

class SunFactory extends Shooter {
    constructor(image,x,y,width,height){
        super(image,x,y,width,height)
        this.duration = 8 * 1000
    }


    placeSunFactory(){
        let random = Math.random()
        if(random > 0.7){
            this.x = this.x - 20
            this.y = this.y + 10
        } else if(random > 0.4){
            this.x = this.x + 80
            this.y = this.y + 20
        } else {
            this.x = this.x - 10
            this.y = this.y + 30
        }
    }
}


class Gameboard {
    constructor(board,boardHeight,boardWidth,ctx,pea, ice, wall, flower, sun, sunTotal,peaArray,iceArray,wallArray,flowerArray,sunArray, zombie, zombieArray, pointer,seedFlower,seedIce,seedPea,seedWall, select, shovel,dart, dartArray, pointArray, machine, machineArray, peaGun, peaGunArray, iceGun, iceGunArray, sunFactory, sunFactoryArray, dashboardHtml, instructionHtml, usernameInput, boardHtml,score,time){
        this.board = board
        this.boardHeight = boardHeight
        this.boardWidth = boardWidth
        this.ctx = ctx
        this.pea = pea
        this.ice = ice
        this.wall = wall
        this.flower = flower 
        this.sun = sun
        this.sunTotal = sunTotal
        this.peaArray = peaArray
        this.iceArray = iceArray
        this.wallArray = wallArray
        this.flowerArray = flowerArray
        this.sunArray = sunArray
        this.zombie = zombie
        this.zombieArray = zombieArray
        this.pointer = pointer
        this.seedFlower = seedFlower
        this.seedIce = seedIce
        this.seedPea = seedPea
        this.seedWall = seedWall
        this.select = select
        this.shovel = shovel
        this.dart = dart
        this.dartArray = dartArray
        this.pointArray = pointArray
        this.machine = machine
        this.machineArray = machineArray
        this.peaGun = peaGun
        this.peaGunArray = peaGunArray
        this.iceGun = iceGun
        this.iceGunArray = iceGunArray
        this.sunFactory = sunFactory
        this.sunFactoryArray = sunFactoryArray
        this.dashboardHtml = dashboardHtml
        this.instructionHtml = instructionHtml
        this.usernameInput = usernameInput
        this.boardHtml = boardHtml
        this.score = score
        this.time = time
    }
    
    initialize(){
        requestAnimationFrame(this.update.bind(this))
        setInterval(this.setSun.bind(this), 10000)
        setInterval(this.setZombie.bind(this), 10000) 
        setInterval(this.defaultSigma.bind(this), 50)
        setInterval(this.setPeaShooter.bind(this), 1500)
        setInterval(this.setIceShooter.bind(this), 1500)
        setInterval(this.setSunFactory.bind(this), this.sunFactory.duration)
        this.setDart()
        this.setMachine()
        this.listener()
    }


    listener(){
        document.addEventListener("mousemove", (e) => this.movePointer(e))
        document.addEventListener("click", () => this.mouseClick())
    }   

    defaultSigma (){
        this.pointer.defaultDetect()
    }
    mouseClick(){
        this.pointer.detect = true
    }

    movePointer(e){
        let rect = this.board.getBoundingClientRect()
        this.pointer.x = e.clientX - rect.left - this.pointer.width / 2
        this.pointer.y = e.clientY - rect.top - this.pointer.height /2
    }

    setSun(){
        let sun = new Sun(this.sun.image,this.sun.x,this.sun.y,this.sun.width,this.sun.height)
        sun.randomPlace(this.boardWidth)
        this.sunArray.push(sun)
    }

    setZombie(){
        let zombie = new Zombie(this.zombie.image, this.zombie.x, this.zombie.y, this.zombie.width, this.zombie.height)
        zombie.randomPlace()
        this.zombieArray.push(zombie)
    }

    setDart(){
        for(let k = 0; k < 8; k++){
            for(let l = 0;l < 5;l++){
                let dart = new Dart(this.dartArray.length + 1, this.dart.image , 147 + 126 * k,190 + 135 * l, this.dart.width, this.dart.height)
                this.dartArray.push(dart)
            }
        }
    }
    
    setMachine(){
        for(let g = 0; g < 5 ; g++){
            let machine = new Machine(g + 1, this.machine.image, this.machine.x, this.machine.y + 135 * g, this.machine.width, this.machine.height)
            this.machineArray.push(machine)
        }
    }

    setPlant(){
        if(this.pointer.detect == true && this.select != undefined){
            let point = this.pointArray
            this.detectPlant(point)
            this.pointer.detect = false
            this.select = undefined
        }
    }

    setPeaShooter(){
        if(this.peaArray.length !== 0){
            for(let g = 0; g < this.peaArray.length; g++){
                let pea = this.peaArray[g]
                let peaShooter = new PeaShooter(this.peaGun.image, pea.x + 80,pea.y + 10,this.peaGun.width,this.peaGun.height)
                this.peaGunArray.push(peaShooter)
            }
        }
    }

    setIceShooter(){
        if(this.iceArray.length !== 0){
            for(let g = 0; g < this.iceArray.length; g++){
                let ice = this.iceArray[g]
                let iceShooter = new IceShooter(this.iceGun.image, ice.x + 80,ice.y + 10,this.iceGun.width,this.iceGun.height)
                this.iceGunArray.push(iceShooter)
            }
        }
    }

    setSunFactory(){
        if(this.flowerArray.length !== 0){
            for(let g = 0; g < this.flowerArray.length; g++){
                let flower = this.flowerArray[g]
                let sunFactory = new SunFactory(this.sun.image,flower.x,flower.y,this.sunFactory.width,this.sunFactory.height)
                sunFactory.placeSunFactory()
                this.sunFactoryArray.push(sunFactory)
            }
        }
    }

    update(){
        requestAnimationFrame(this.update.bind(this))
        this.ctx.clearRect(0,0,this.boardWidth,this.boardHeight)

        this.loopDart()

        this.ctx.fillStyle = "black"
        this.ctx.font = "30px arial"
        this.ctx.fillText(this.sunTotal, 210,135)
        
        this.seedFlower.draw(this.ctx)
        this.seedPea.draw(this.ctx)
        this.seedIce.draw(this.ctx)
        this.seedWall.draw(this.ctx)
        
        this.detectSeed()
        this.placePlant()
        
        this.loopPeaShooter()
        this.loopIceShooter()
        this.loopZombie()
        this.loopMachine()
        this.loopSun()
        this.loopSunFactory()

        this.ctx.fillStyle = "white"
        this.ctx.font = "25px arial"
        this.ctx.fillText(this.usernameInput, 690,55)
        this.ctx.fillText(`Score : ${this.score}`, 690,90)
        this.ctx.fillText(`Time : ${this.time}`, 690,125)
        
        console.log(this.usernameInput)
        this.shovel.draw(this.ctx)
        this.pointer.draw(this.ctx)
    }

    loopDart(){
        for (let m = 0; m < this.dartArray.length; m++) {
            let dart = this.dartArray[m];
            dart.draw(this.ctx);
        
            if (this.detectElement(this.pointer,dart) && this.pointer.detect == true){
                this.pointArray = [dart.x, dart.y]
            }
        }
    }

    loopPeaShooter(){
        for(let d = 0; d < this.peaGunArray.length; d++){
            let peaGun = this.peaGunArray[d]
            peaGun.x += 5
            peaGun.draw(this.ctx)

            for(let h = 0; h <  this.zombieArray.length; h++){
                let zombie = this.zombieArray[h]
                if(zombie.healt == 0){
                    this.zombieArray.splice(h, 1)
                    h--
                }
                if(this.detectElement(peaGun, zombie) && peaGun.access == true){
                    zombie.healt -= peaGun.damage
                    this.peaGunArray.splice(d, 1)
                    d--
                    peaGun.access = false
                } 
            }
        }
    }

    loopIceShooter(){
        for(let d = 0; d < this.iceGunArray.length; d++){
            let iceGun = this.iceGunArray[d]
            iceGun.x += 5
            iceGun.draw(this.ctx)
        
            for(let h = 0; h <  this.zombieArray.length; h++){
                let zombie = this.zombieArray[h]
                if(zombie.healt == 0){
                    this.zombieArray.splice(h, 1)
                    h--
                }
                if(this.detectElement(iceGun, zombie) && iceGun.access == true){
                    zombie.healt -= iceGun.damage
                    this.iceGunArray.splice(d, 1)
                    zombie.speed = iceGun.slow
                    setTimeout(() => this.moveZombie(zombie), iceGun.duration)
                    d--
                    iceGun.access = false
                } 
            }
        }
    }

    loopZombie(){
        for(let j = 0; j < this.zombieArray.length; j++){
            let zombie = this.zombieArray[j]
            zombie.draw(this.ctx)
            zombie.x -= zombie.speed
        }
    }

    loopSun(){
        for(let i = 0;  i < this.sunArray.length; i++){
            let sun = this.sunArray[i]            
            sun.draw(this.ctx)
            sun.y += sun.velocity
            
            if(this.detectElement(sun,this.pointer) && this.pointer.detect == true){
                this.sunTotal += 25
                this.sunArray.splice(i,1)
                i--
                this.pointer.defaultDetect()
            }
        }
    }

    loopSunFactory(){
        for(let i = 0;  i < this.sunFactoryArray.length; i++){
            let sun = this.sunFactoryArray[i]            
            sun.draw(this.ctx)
            
            if(this.detectElement(sun,this.pointer) && this.pointer.detect == true){
                this.sunTotal += 20
                this.sunFactoryArray.splice(i,1)
                i--
                this.pointer.defaultDetect()
            }
        }
    }

    loopMachine(){
            for(let a = 0; a < this.machineArray.length ; a++){
            let machine = this.machineArray[a]
            machine.draw(this.ctx)
            for(let zo = 0 ; zo< this.zombieArray.length; zo++){
                let zombie = this.zombieArray[zo]
                if(this.detectElement(machine, zombie)){
                    this.zombieArray.splice(zo,1)
                    zo--
                    setInterval(() => this.moveMachine(machine), 10)
                }
            }
        }
    }

    moveZombie(zombie){
        zombie.speed = 0.3
    }
    moveMachine(machine){
        machine.x += 2 
    }

    moveZombieLoop(){
        for(let z = 0; z < this.zombieArray.length; z++){
            this.zombieArray[z].speed = 0.3
        }
    }
    
    placePlant(){
        for(let z = 0;z < this.flowerArray.length; z++){
            let flower = this.flowerArray[z]

            if(flower !== null || flower !== undefined){
                if(flower !== undefined){
                    flower.draw(this.ctx)
                }
            }

            for(let b = 0 ; b < this.zombieArray.length;  b++){
                let zombie = this.zombieArray[b]
                if(flower.healt == 0){
                    this.moveZombieLoop()
                    this.flowerArray.splice(z, 1)
                    z--
                }
                if(this.detectElement(flower, zombie)){
                    flower.healt -= 1
                    zombie.speed = 0
                }
            }
        }
        for(let x = 0;x < this.peaArray.length; x++){
            let pea = this.peaArray[x]

            if(pea !== null || pea !== undefined){
                if(pea !== undefined){
                    pea.draw(this.ctx)
                }
            }

            for(let b = 0 ; b < this.zombieArray.length;  b++){
                let zombie = this.zombieArray[b]
                if(pea.healt == 0){
                    this.moveZombieLoop()
                    this.peaArray.splice(x, 1)
                    x--
                }
                if(this.detectElement(pea, zombie)){
                    pea.healt -= 1
                    zombie.speed = 0
                }
            }

        }
        for(let c = 0;c < this.iceArray.length; c++){
            let ice = this.iceArray[c]

            if(ice !== null || ice !== undefined){
                if(ice !== undefined){
                    ice.draw(this.ctx)
                }
            }

            for(let b = 0 ; b < this.zombieArray.length;  b++){
                let zombie = this.zombieArray[b]
                if(ice.healt == 0){
                    this.moveZombieLoop()
                    this.iceArray.splice(c, 1)
                    c--
                }
                if(this.detectElement(ice, zombie)){
                    ice.healt -= 1
                    zombie.speed = 0
                }
            }
        }
        for(let v = 0;v < this.wallArray.length; v++){
            let wall = this.wallArray[v]

            if(wall !== null || wall !== undefined){
                if(wall !== undefined){
                    wall.draw(this.ctx)
                }
            }

            for(let b = 0 ; b < this.zombieArray.length;  b++){
                let zombie = this.zombieArray[b]
                if(wall.healt == 0){
                    this.moveZombieLoop()
                    this.wallArray.splice(v, 1)
                    v--
                }
                if(this.detectElement(wall, zombie)){
                    wall.healt -= 1
                    zombie.speed = 0
                }
            }
        }
    }


    

    detectSeed(){
        if(this.detectElement(this.seedFlower, this.pointer) && this.pointer.detect == true){
            this.select = this.seedFlower.id
            this.pointer.defaultDetect()
        }
        if(this.detectElement(this.seedPea, this.pointer) && this.pointer.detect == true){
            this.select = this.seedPea.id
            this.pointer.defaultDetect()
        }
        if(this.detectElement(this.seedIce, this.pointer) && this.pointer.detect == true){
            this.select = this.seedIce.id
            this.pointer.defaultDetect()
        }
        if(this.detectElement(this.seedWall, this.pointer) && this.pointer.detect == true){
            this.select = this.seedWall.id
            this.pointer.defaultDetect()
        }
        this.setPlant()
    }

    detectPlant(point){
        if(this.select === 1 && this.sunTotal >= this.flower.sunConsum){
            let flower = new Flower(this.flower.image,point[0],point[1],this.flower.width, this.flower.height)
            this.flowerArray.push(flower) 
            this.sunTotal -= this.flower.sunConsum
        }
        if(this.select === 3 && this.sunTotal >= this.pea.sunConsum){
            let pea = new Pea(this.pea.image,point[0],point[1],this.flower.width, this.flower.height)
            this.peaArray.push(pea)
            this.sunTotal -= this.pea.sunConsum
        }
        if(this.select === 2 && this.sunTotal >= this.ice.sunConsum){
            let ice = new Ice(this.ice.image,point[0],point[1],this.flower.width, this.flower.height)
            this.iceArray.push(ice)
            this.sunTotal -= this.ice.sunConsum
        }
        if(this.select === 4 && this.sunTotal >= this.wall.sunConsum){
            let wall = new Wall(this.wall.image,point[0],point[1],this.flower.width, this.flower.height)
            this.wallArray.push(wall)
            this.sunTotal -= this.wall.sunConsum
        }   
    }


    detectElement(a,b){
        return a.x < b.x + b.width &&
               a.x + a.width > b.x &&
               a.y < b.y + b.height &&
               a.y + a.height > b.y 
    }










    // Html JS
    dashboardFunc(){
        this.dashboardHtml.style.display = "none"
    }

    instructionFunc(){
        this.instructionHtml.style.display = "flex"
    }

    closeInstructionFunc(){
        this.instructionHtml.style.display = "none"
    }


    startGame(){
        this.boardHtml.style.display = "flex"
        this.dashboardHtml.style.display = "none"
        this.usernameInput = document.getElementById("username-input").value
        gameboard.initialize()
    }

}


let boardHeight = 924
let boardWidth = 1240
let board = document.getElementById("board")
let ctx = board.getContext("2d")
board.height = boardHeight
board.width = boardWidth


// HTML Element
let dashboardHtml  = document.getElementById("background")
let boardHtml  = document.getElementById("board-leaderboard")
let instructionHtml = document.getElementById("instruction")

let usernameInput;
// OG 
let peaImage = new Image()
peaImage.src = "assets/PeaShooter/frame_05_delay-0.12s.gif"

let iceImage = new Image()
iceImage.src = "assets/IcePea/frame_05_delay-0.12s.gif"

let wallImage = new Image()
wallImage.src = "assets/WallNut/frame_02_delay-0.12s.gif"

let flowerImage = new Image()
flowerImage.src = "assets/SunFlower/frame_09_delay-0.06s.gif"

let sunImage = new Image()
sunImage.src = "assets/General/Sun.png" 

let zombieImage = new Image()
zombieImage.src = "assets/Zombie/frame_04_delay-0.05s.gif"

let shovelImage = new Image()
shovelImage.src = "assets/General/Shovel.png"

let dartImage = new Image()
dartImage.src = "assets/General/Grass.bmp"  

let machineImage = new Image()
machineImage.src = "assets/General/lawnmowerIdle.gif"

// Seed
let peaSeedsImage = new Image()
peaSeedsImage.src = "assets/Seeds/PeaShooterSeed.png"

let iceSeedsImage = new Image()
iceSeedsImage.src = "assets/Seeds/IcePeaSeed.png"

let sunSeedsImage = new Image()
sunSeedsImage.src = "assets/Seeds/SunFlowerSeed.png"

let wallSeedsImage = new Image()
wallSeedsImage.src = "assets/Seeds/WallNutSeed.png"

// Shooter

let peaGunImage = new Image()
peaGunImage.src =  "assets/General/Pea.png"

let iceGunImage = new Image()
iceGunImage.src =  "assets/General/IcePea.png"



let plantWidth = 127
let plantHeight = 135
let plantX = boardWidth
let plantY = 0

let peaArray = []
let iceArray = []
let wallArray = []
let flowerArray = []
let sunArray = []
let zombieArray = []
let dartArray = []
let pointArray  = []
let machineArray = []
let peaGunArray = []
let iceGunArray = []
let sunFactoryArray = []



let select;
let sunTotal =  50
let score = 0
let time = 0

let pea = new Pea(peaImage,plantX,plantY,plantWidth,plantHeight)
let ice = new Ice(iceImage,plantX,plantY,plantWidth,plantHeight)
let wall = new Wall(wallImage,plantX,plantY,plantWidth,plantHeight)
let flower = new Flower(flowerImage,plantX,plantY,plantWidth,plantHeight)
let sun = new Sun(sunImage,plantX,plantY,80,80)
let zombie = new Zombie(zombieImage,plantX,plantY + 100,plantWidth - 20 ,plantHeight - 20)
let shovel = new Zombie(shovelImage, boardWidth - 260,15,100,100)
let dart = new Dart(0,dartImage, 147,190,127,135)
let machine = new Machine(0 ,machineImage, 5,190,130,130)

let seedFlower = new SeedFlower(1,sunSeedsImage,295,27,80,100)
let seedIce = new SeedIce(2,iceSeedsImage,385,27,80,100)
let seedPea = new SeedPea(3,peaSeedsImage,475,27,80,100)
let seedWall = new SeedWall(4,wallSeedsImage,565,27,80,100)

let pointer = new Pointer(0,0,1,1)
let peaGun = new PeaShooter(peaGunImage, 0, 0, 40,40)
let iceGun = new IceShooter(iceGunImage, 0, 0, 40,40)
let sunFactory = new SunFactory(sunImage, 0,0,50,50)


let gameboard = new Gameboard(board,boardHeight, boardWidth, ctx, pea, ice, wall, flower, sun, sunTotal,peaArray,iceArray,wallArray,flowerArray,sunArray, zombie, zombieArray, pointer, seedFlower,seedIce,seedPea,seedWall, select, shovel,dart, dartArray, pointArray, machine, machineArray, peaGun, peaGunArray,iceGun, iceGunArray, sunFactory, sunFactoryArray, dashboardHtml, instructionHtml,usernameInput, boardHtml, score, time)
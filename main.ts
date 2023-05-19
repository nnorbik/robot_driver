function servo4 () {
    if (pomvalue <= 4 && pomvalue >= 0) {
        pom = Math.round(servo_4 + pomvalue * 20)
        count = (pom - angle4) / Math.abs(pom - angle4)
        while (pom != angle4) {
            angle4 += count
            PCA9685.setServoPosition(PCA9685.ServoNum.Servo13, angle4, 64)
            basic.pause(10)
        }
    } else {
        chyba()
    }
}
function rameno () {
    pomstring = convertToText(pomvalue)
    pom_delka = parseFloat(pomstring.substr(0, 2)) - 10
    pom_vyska = parseFloat(pomstring.substr(2, 2)) - 10
    if (pom_delka <= 16 && pom_delka >= 7 && (pom_vyska <= 10 && pom_vyska >= 0)) {
        pom_delka = pom_delka - 1
        pom_vyska = pom_vyska - 1
        delta = Math.atan2(pom_vyska, pom_delka)
        delta = delta / pi * 180
        pom_delka = Math.sqrt(pom_vyska * pom_vyska + pom_delka * pom_delka)
        alfa = Math.acos(pom_delka * pom_delka / (20 * pom_delka))
        beta = pi - alfa * 2
        alfa = alfa / pi * 180
        beta = beta / pi * 180
        pom = Math.round(alfa + delta)
        pom = Math.round(180 - (180 - serv2A) / 90 * (180 - pom))
        pom = servo_2 + (90 - pom)
        if (pom - angle2 == 0) {
            count = 0
        } else {
            count = (pom - angle2) / Math.abs(pom - angle2)
        }
        pomvalue = Math.round(beta + (alfa + delta))
        pomvalue = Math.round(180 - (180 - serv3A) / 90 * (180 - pomvalue))
        pomvalue = pomvalue + (servo_3 - 180)
        if (pomvalue - angle3 == 0) {
            count2 = 0
        } else {
            count2 = (pomvalue - angle3) / Math.abs(pomvalue - angle3)
        }
        while (pom != angle2 || pomvalue != angle3) {
            if (pom != angle2) {
                angle2 += count
                PCA9685.setServoPosition(PCA9685.ServoNum.Servo5, angle2, 64)
            }
            if (pomvalue != angle3) {
                angle3 += count2
                PCA9685.setServoPosition(PCA9685.ServoNum.Servo9, angle3, 64)
            }
            basic.pause(10)
        }
    } else {
        chyba()
    }
}
function servo1 () {
    if (pomvalue <= 60 && pomvalue >= -60) {
        pom = Math.round(servo_1 + pomvalue / 7 * 9)
        if (pom - angle1 == 0) {
            count = 0
        } else {
            count = (pom - angle1) / Math.abs(pom - angle1)
        }
        while (pom != angle1) {
            angle1 += count
            PCA9685.setServoPosition(PCA9685.ServoNum.Servo1, angle1, 64)
            basic.pause(10)
        }
    } else {
        chyba()
    }
}
input.onButtonPressed(Button.A, function () {
    basic.showString("" + (radio_kanal))
})
function chyba () {
    radio.sendNumber(-1)
    while (!(input.logoIsPressed())) {
        basic.showString("Error " + checksum)
    }
    inicializace()
}
function inicializace () {
    checksum = 0
    angle1 = servo_1
    angle2 = servo_2
    angle3 = servo_3
    angle4 = servo_4
    PCA9685.setServoPosition(PCA9685.ServoNum.Servo1, angle1, 64)
    PCA9685.setServoPosition(PCA9685.ServoNum.Servo5, angle2, 64)
    PCA9685.setServoPosition(PCA9685.ServoNum.Servo9, angle3, 64)
    PCA9685.setServoPosition(PCA9685.ServoNum.Servo13, angle4, 64)
    basic.showString("" + (radio_kanal))
}
input.onButtonPressed(Button.B, function () {
    basic.showString("" + (checksum))
})
radio.onReceivedValue(function (name, value) {
    pomvalue = value
    basic.showString("W")
    if (name == "init") {
        if (pomvalue == 0) {
            basic.showString("I")
            inicializace()
            checksum += 1
        } else {
            chyba()
        }
    } else if (name == "end") {
        ending()
        checksum += 1
    } else if (name == "uhel") {
        basic.showString("U")
        servo1()
        checksum += 1
    } else if (name == "gripper") {
        basic.showString("G")
        servo4()
        checksum += 1
    } else if (name == "rameno") {
        basic.showString("R")
        rameno()
        checksum += 1
    } else {
        chyba()
    }
})
function ending () {
    basic.clearScreen()
    basic.pause(500)
    basic.showString("Hotovo")
    basic.showLeds(`
        . . . . .
        . # # # .
        # . # . #
        . # # # .
        . . . . .
        `)
    while (!(input.logoIsPressed())) {
    	
    }
    inicializace()
}
let checksum = 0
let angle1 = 0
let count2 = 0
let angle3 = 0
let angle2 = 0
let beta = 0
let alfa = 0
let delta = 0
let pom_vyska = 0
let pom_delka = 0
let pomstring = ""
let angle4 = 0
let count = 0
let pom = 0
let pomvalue = 0
let serv3A = 0
let serv2A = 0
let servo_4 = 0
let servo_3 = 0
let servo_2 = 0
let servo_1 = 0
let radio_kanal = 0
radio_kanal = 0
servo_1 = 90
servo_2 = 90
servo_3 = 180
servo_4 = 10
serv2A = 180
serv3A = 90
let servolimit1 = 5
let servolimit2 = 25
let servolimit3 = 15
let pi = Math.PI
radio.setGroup(radio_kanal)
PCA9685.setServoLimits(
PCA9685.ServoNum.Servo1,
servolimit1,
servolimit2,
servolimit3,
64
)
PCA9685.setServoLimits(
PCA9685.ServoNum.Servo5,
servolimit1,
servolimit2,
servolimit3,
64
)
PCA9685.setServoLimits(
PCA9685.ServoNum.Servo9,
servolimit1,
servolimit2,
servolimit3,
64
)
PCA9685.setServoLimits(
PCA9685.ServoNum.Servo13,
servolimit1,
servolimit2,
servolimit3,
64
)
serv2A = 180 - serv2A + servo_2
serv3A = 180 - servo_3 + serv3A
inicializace()
basic.forever(function () {
    radio.sendNumber(checksum)
})

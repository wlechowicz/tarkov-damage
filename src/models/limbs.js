import { Round2 } from '../utils/round';

const Limb = {
    HP: 1,
    id: 'Limb',
    dmgMulti: 1,
    fatalIfBlacked: false,
    isBlacked() { 
        return this.HP === 0;
    },
    applyDamage(amount) {
        // returns non-zero if dmg overflows

        // it's already black, full overflow with multi
        if (this.isBlacked()) {
            return Round2(amount * this.dmgMulti);
            // return Math.round(amount * this.dmgMulti);
        }

        // just apply dmg, won't black it
        if (amount < this.HP) {
            this.HP = Round2(this.HP - amount);
            return 0; // no overflow
        }

        // this dmg blacked this limb, some overflow
        console.log('\t', this.id, 'got blacked out');
        const overflow = Round2(amount - this.HP);
        this.HP = 0;
        return overflow;
    }
}

const Arm = {
    ...Limb,
    HP: 60,
    maxHP: 60,
    dmgMulti: 0.7
}

const Leg = {
    ...Limb,
    HP: 65,
    maxHP: 65,
    dmgMulti: 1
}

const Stomach = {
    ...Limb,
    id: 'Stomach',
    HP: 70,
    maxHP: 70,
    dmgMulti: 1.5
}

const Thorax = {
    ...Limb,
    id: 'Thorax',
    HP: 85,
    maxHP: 85,
    fatalIfBlacked: true
}

const Head = {
    ...Limb,
    id: 'Head',
    HP: 35,
    maxHP: 35,
    fatalIfBlacked: true
}

const leftArm = { ...Arm, id: 'Left Arm' };
const rightArm = { ...Arm, id: 'Right Arm' };

const leftLeg = { ...Leg, id: 'Left Leg' };
const rightLeg = { ...Leg, id: 'Right Leg' };

export const limbs = [ leftLeg, rightLeg, leftArm, rightArm, Stomach, Thorax, Head];

export function getCurrentHP(showDecimals) {
    const currentHP = limbs.reduce((total, limb) => total + limb.HP, 0);
    return showDecimals ? currentHP : Math.round(currentHP);
}

export function getMaxHP() {
    return limbs.reduce((total, limb) => total + limb.maxHP, 0);
}

export function getMaxHPNotBlacked() {
    return limbs.filter(limb => !limb.isBlacked()).reduce((total, limb) => total + limb.maxHP, 0);
}

export function isAlive() {
    return getCurrentHP() > 0 && !limbs.some(limb => limb.fatalIfBlacked && limb.HP === 0);
}

export function calcState() {
    return limbs.reduce((acc, limb) => { acc[limb.id] = limb.HP; return acc; }, {});
}

import { useState } from 'react';
import styled from 'styled-components';

import LimbUI from './LimbUI.js';
import { calcState, limbs, isAlive, getMaxHPNotBlacked, getCurrentHP, getMaxHP } from '../models/limbs.js';
import positions from './positions';
import { Round2 } from '../utils/round';

const Container = styled.div`
    position: relative;
    width: 600px;
    height: 500px;
    color: #898e8e;
`;

const HpNumber = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translate(-50%);
`;

const HpCurrent = styled.span`
    font-size: 32px;
    color: #9ad323;
`;


export function Body({ damage, showDecimals }) {

    const [limbsHP, setLimbsHP] = useState(calcState());

    const doDamage = (limbID, amount) => {
        // apply dmg to the limb that took it
        const overflow = limbs.find(limb => limb.id === limbID).applyDamage(amount);

        console.log('applied', amount, 'dmg to', limbID, 'with overflow', overflow);
        
        // if that limb overflowed (was zeroed already or just got zerod by this damage), distribute the dmg
        if (overflow > 0 && isAlive()) {
            distributeDamage(overflow, 1);
        }

        // update UI
        setLimbsHP(calcState());
    }

    const distributeDamage = (amount, steps) => {
        console.log('loop', steps, 'distributing', amount, 'remaining damage that overflowed');
        
        // killswitch if something went wrong and dmg left didn't attenuate properly
        if (steps > 10) {
            console.log('\taborting, too many steps');
            return;
        }

        // dmg is distributed to all non-black limbs, proportionally to limb's max HP to remaining body ratio
        const nonBlackLimbs = limbs.filter(limb => !limb.isBlacked());
        const maxHPofNonBlackLimbs = getMaxHPNotBlacked();

        // *** logging only
        let sumOfProportionalDamages = 0;
        let sumOfLimbOverflows = 0;
        // ***

        // apply dmg limb by limb and accumulate total overflow dmg from all blacked limbs
        const overflow = nonBlackLimbs.reduce((overflow, limb) => {

            const proportionalLimbDamage = Round2(amount * limb.maxHP / maxHPofNonBlackLimbs);
            //const proportionalLimbDamage = Math.round(amount * limb.maxHP / maxHPofNonBlackLimbs);
            const limbOverflow = limb.applyDamage(proportionalLimbDamage);

            // *** logging only
            console.log('\tadding', proportionalLimbDamage, 'damage to', limb.id, 'that has', limb.HP, 'hp');
            sumOfProportionalDamages += proportionalLimbDamage;
            sumOfLimbOverflows += limbOverflow;
            if (limbOverflow > 0) {
                console.log('\t', limb.id, 'overflowed', limbOverflow, 'damage');
            }
            // ***

            return overflow + limbOverflow;
        }, 0);

        // *** logging only
        if (sumOfProportionalDamages !== amount) {
            console.log('\t(error of', sumOfProportionalDamages - amount, 'damage due to rounding)');
        }
        if (sumOfLimbOverflows > 0) {
            console.log('\tnewly blacked limbs overflowed a total of', sumOfLimbOverflows, 'damage');
        }
        // ***

        // recursion - still some dmg to spread and still alive, keep going
        if (overflow > 0 && isAlive()) {
            distributeDamage(overflow, steps + 1);
        }
    }

    const reset = () => {
        limbs.forEach(limb => limb.HP = limb.maxHP);
        setLimbsHP(calcState());
    }

    return (
        <>
        <Container>
            {limbs.map(limb => 
                <LimbUI 
                    key={`${limb.id.toLowerCase().replaceAll(' ', '_')}${limb.HP}`} 
                    name={limb.id} 
                    hp={limbsHP[limb.id]}
                    hpMax={limb.maxHP}
                    onDoDamage={() => doDamage(limb.id, +damage)}
                    position={positions.find(p => p.id === limb.id)}
                    showDecimals={showDecimals}
                />)}
            <HpNumber>
                <HpCurrent>{ getCurrentHP(showDecimals) }</HpCurrent>/{ getMaxHP() }
            </HpNumber>
        </Container>
        <p><button onClick={reset}>Reset</button></p>
        </>
    )
}

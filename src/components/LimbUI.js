import styled from 'styled-components';
import LimbNameBg from './limb_ui_bg.png';

const ActiveArea = styled.button`
    position: absolute;
    left: ${(props) => props.position.left};
    top: ${(props) => props.position.top};
    transform: translate(-50%, -50%);
    border: none;
    background: transparent;
    padding: none;
    margin: none;
    width: 160px;
    cursor: pointer;
`;

const LimbName = styled.div`
    background: url("${LimbNameBg}") left top no-repeat;
    background-size: cover;
    text-transform: uppercase;
    text-align: left;
    font-size: 14px;
    color: #ddd;
    padding: 2px;
    padding-left: 6px;
    text-shadow: #000 0px 0px 2px;
`;

const HpAmount = styled.div`
    position: relative;
    border: 2px solid #000;
    color: #fff;
    font-size: 12px;
    height: 16px;
    padding: 0;
`;

const thresholds = [[0, 'darkred'], [25, 'orange'], [50, 'yellow'], [75, 'lime'], [95, '#009002']];

const HpBar = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    background-color: ${(props) => thresholds.reduce((result, th) => props.percent > th[0] ? th[1] : result, thresholds[thresholds.length-1])};
    padding: 0;
    width: ${(props) => props.percent}%;
`;

const HpNumber = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6));
    text-shadow: #000 0px 0px 2px;
    font-family: Consolas;
    font-size: 1.1em;
`;

export default function LimbUI({name, hp, hpMax, onDoDamage, position, showDecimals = false}) {
    return (
    <ActiveArea onClick={onDoDamage} position={position}>
        <LimbName>{name}</LimbName>
        <HpAmount>
            <HpBar percent={Math.ceil((hp / hpMax) * 100)} />
            <HpNumber>{showDecimals ? hp : Math.round(hp)}/{hpMax}</HpNumber>
        </HpAmount>
    </ActiveArea>
    );
}

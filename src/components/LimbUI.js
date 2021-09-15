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
`;

const HpBar = styled.div`
    border: 2px solid #000;
    color: #fff;
    font-size: 12px;
    background: linear-gradient(to bottom, #009002, #004501);
    padding: 0;
`;


export default function LimbUI({name, hp, hpMax, onDoDamage, position}) {
    return (
    <ActiveArea onClick={onDoDamage} position={position}>
        <LimbName>{name}</LimbName>
        <HpBar>{hp}/{hpMax}</HpBar>
    </ActiveArea>
    );
}

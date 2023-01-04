import styled from "styled-components";

export const TitlePage = styled.h1`
color: white;
margin-bottom: 50px;
font-size: 1.4rem;
`
export const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 34px;
    column-gap: 24px;
`

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    padding: 25px;
    background-color: var(--hover-second-color);
    width: 350px;
    height: 450px;
    border-radius: 6px;
`
export const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 40px;
    justify-content: center;
`
export const TextPrice = styled.span`
    color: white;
    font-size: 20px;
    font-weight: 700;
`
export const TextPeriod = styled.span`
color: #496d77;
font-size: 20px;
font-weight: 700;
`
export const SlashText = styled.span`
color: #496d77;
font-weight: 700;
font-size: 20px;
padding: 0 10px;
`

export const FeaturesContainer = styled.div`
    flex-direction: column;
    justify-content: center;
    margin: 0 20px;
    align-items: center;
`

export const Feature = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    margin-bottom: 10px;
    i{
        color: var(--btn-discord-hover);
    }
    span{
        color: white;
        font-weight: 600;
    }
`

export const ButtonContainer = styled.div`
    margin-top: 198px;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ButtonSubscribe = styled.button`
border: 0;
padding: 10px;
border-radius: 5px;
width: 280px;
cursor: pointer;
background: var(--btn-discord-color);
color: white;
font-size: 15px;
font-weight: 600;
transition: all .2s var( --transition);
&:hover{
    background: var(--btn-discord-hover);

}
&:active{
    background: var(--btn-discord-color);
}
`
export const BackgroundContent = styled.div`
    background-color: var(--second-theme-color);
    width: 90%;
    border: solid 2px var(--hover-second-color);
    padding: 25px;
    padding-bottom: 100px;
    padding-top: 100px;
    border-radius: 25px;
`
export const MostPopularContainer = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;

span{
    background-color: var( --btn-discord-color);
    position: absolute;
    color: white;
    padding: 5px;
    border-radius: 50px;
    margin-bottom: 70px;
    font-weight: 600;
}
`


export const PopUp = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #0d0d0f8e;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
    transition: all .2s ease-out;
`
export const PopUpInner = styled.div`
        position: relative;
    padding: 32px;
    width: 100%;
    max-width: 716px;
    background-color: var(--second-theme-color);
    animation:  fadeIn2 .3s ease-out;
    animation-fill-mode: forwards;
    transform: scale(0.8);
    animation-timing-function: ease-out;
    border-radius: 20px;
    i{
        position: absolute;
    top: 16px;
    right: 16px;
    font-size: 26px;
    color: white;
    cursor: pointer;
    }
`
export const PriceInfo = styled.div`
        display: flex;
    justify-content: center;
    font-size: 13px;
    height: 138px;
    color: white;
    font-weight: 700;
    font-size: 30px;
`
export const PayBtnContainer = styled.div`
        display: flex;
    justify-content: center;
    align-items: center;
`
export const PayBtn = styled.button`
        display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 40px;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: #2e4770;
    direction: lrt;
    font-weight: 600;
    color: white;
    font-size: 20px;
    transition: all .2s ease;
    &:hover{
        background-color: #293f63;
    }
`
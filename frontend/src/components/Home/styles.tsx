import styled from "styled-components";
import i18next from "i18next";
import { Link } from "react-router-dom";
export const Content = styled.div`
    margin: auto;
    max-width: 1240px;
    width: 100%;
`
export const FirstSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    display: flex;
    margin-top: 100px;
    flex-direction: column;
    grid-gap: 40px;
    h1{
        /* background: linear-gradient(to right, #3068d0 0%, #4dd40f 100%);
	    -webkit-background-clip: text;
	    -webkit-text-fill-color: transparent; */
        color: white;
        font-size: 4rem;
        font-weight: 700;
        @media screen and (max-width: 1024px) {
            font-size: 3rem;
        }
    }
`

export const ButtonsHome = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 24px;
    grid-gap: 24px;
    justify-content: center;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`

export const InviteButton = styled.button`
background-color: var(--btn-discord-color);
color: white;
padding: 0.7rem 1rem;
display: flex;
align-items: center;
justify-content: center;
gap: 10px;
border-radius: 8px;
border: none;
cursor: pointer;
transition: background-color .2s var(--transition);
font-weight: 600;
font-size: 16px;
&:hover{
    background-color: var(--btn-discord-hover);
}
`
export const LoaderContainer = styled.div`
 
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
`
export const DashboardButton = styled.button`
    padding: 0.9rem 2rem;
    color: white;
    font-weight: 600;
    font-size: 16px;
    border: none;
    border-radius: 8px;
    background-color: var(--btn-color);
    transition: background-color .2s var(--transition);
    cursor: pointer;
    text-decoration: none;
    &:hover{
        background-color: var(--btn-color-hover);
    }
`

export const SecondSection = styled.div`
margin-top: 200px;
max-width: 100%;
width: 100%;
margin-bottom: 100px;
`

export const Review = styled.div`
display: flex;
flex-direction: row-reverse;
align-items: center;
width: 100%;
gap: 5rem;
justify-content: center;
margin-top: 1.7rem;
@media screen and (max-width: 1024px) {
    flex-direction: column;
}
`
export const ReviewText = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
grid-gap: 16px;
width: 18rem;
span{
    color: white;
    font-weight: 600;
    font-size: 22px;
}
p{
    color: #606d77;
    line-height: 28px;
    letter-spacing: -.02em;
    margin: 0;
    font-weight: 400;
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: break-word;
}
`
export const Circle = styled.span`
height: 8px;
  width: 8px;
  border: solid 2px var(--btn-color);
  border-radius: 50%;
  display: flex;
  align-self: center;

`
export const Line = styled.div`
 border-left: 1px dotted var(--btn-color);
  height: 400px;
margin-left: -1px;
margin-top: 25.4rem;
position: absolute;
`
export const LineDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
align-self: center;
@media screen and (max-width: 1024px) {
    display: none;
}
`
export const ImgReview = styled.img`
width: 26rem;
@media screen and (max-width: 1024px) {
    margin-bottom: 110px;
    width: 20rem;
}
`

export const IconContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
background: var(--btn-color);
padding: 9px;
border-radius: 8px;
max-width: 25px;
i{
    color: #7358f9;
    font-size: 22px;
}
`

export const ThirdSection = styled.div`
background-color: var(--btn-color);
padding: 20px;
display: flex;
justify-content: center;
align-items: center;

`
export const StatsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1024px) {
        flex-direction: column;
    }
`
export const Stats = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    span{
        color: #606d77;
        font-size: 15px;
        letter-spacing: .1em;
        text-transform: uppercase;
    }
    p{
        color: white;
        font-size: 60px;
        font-weight: bold;
    }
    margin: 0 20px;
    @media screen and (max-width: 1024px) {
        margin-bottom: 20px;
    }
`
export const VerticalLine = styled.hr`
    opacity: 0.6;
    height: 100px;
    border-width: 0px 0px 0px 2px;
    border-image: initial;
    border-color: #747474;
    margin: 0 12px;
    border-style: solid;
    @media screen and (max-width: 1024px) {
        height: 0;
        border-width: 0;
        width: 200px;
        border: solid 2px #747474;
    }
`
import styled from "styled-components";

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
    flex-direction: column;
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
    flex-wrap: wrap;
    align-items: center;
    gap: 24px;
    grid-gap: 24px;
    justify-content: center;
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
    &:hover{
        background-color: var(--btn-color-hover);
    }
`
import styled from "styled-components";
export const BackgroundContent = styled.div`
    padding: 25px;
    padding-bottom: 70px;
    background-color: var(--second-theme-color);
    width: 90%;
    border: solid 2px var(--hover-second-color);
    border-radius: 10px;
    @media screen and (max-width: 339px) {
        width: 85%;
    }
`
export const TextInputContainer = styled.div`
display: flex;
gap: 6px;
margin-bottom: 25px;
flex-direction: column;
width: 100%;
max-width: 500px;
span{
    color: #929292;
    font-size: 17px;
    font-weight: 400;
}
`
export const TextInput = styled.input`
background: var(--textinput-bg-color);
outline: none;
border: none;
border-radius: 10px;
font-size: 16px;
padding: 10px;
color: white;
transition:all .2s var(--transition) ;
border: solid 3px var(--textinput-border-color);
&:focus{
    border: solid 3px var(--textinput-border-hover-color);
}
`
export const TextArea = styled.textarea`
background: var(--textinput-bg-color);
outline: none;
border: none;
border-radius: 10px;
font-size: 16px;
min-height: 140px;
resize: vertical;
padding: 15px;
color: white;
transition:all .2s var(--transition) ;
border: solid 3px var(--textinput-border-color);
&:focus{
    border: solid 3px var(--textinput-border-hover-color);
}
`
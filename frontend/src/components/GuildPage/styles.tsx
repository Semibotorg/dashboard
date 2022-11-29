import styled from "styled-components";
import { Link } from "react-router-dom";
export const Content = styled.div`
  margin: auto;
  max-width: 1240px;
  width: 100%;
`;

export const TextInfo = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  font-weight: 600;
`;

export const GuildsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  justify-content: center;
  width: 100%;
  margin-top: 100px;
  grid-gap: 24px;
  height: 10vh;
`;

export const Guild = styled.div`
  background-color: var(--second-theme-color);
  padding: 20px;
  width: 90%;
  display: flex;
  max-width: 300px;
  justify-content: center;
  border-radius: 7px;
  border: solid 2px var(--hover-second-color);
  flex-direction: column;
`;
export const FirstSectionGuild = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 50px;
  gap: 20px;
  direction: ltr;
  span {
    color: white;
    font-weight: 600;
    font-size: 20px;
    max-width: 200px;
    max-height: 45px;
    text-overflow: ellipsis;
    overflow: auto;
  }
`;
export const SpanSkeltonGuild = styled.p`
  @keyframes skeleton-loading {
    0% {
      color: transparent;
      background-color: var(--btn-color);
    }
    100% {
      background-color: var(--hover-guild-btn-color);
      color: transparent;
    }
  }

  animation: skeleton-loading 1s linear infinite alternate;
  height: 20px;
  width: 200px;
  color: transparent;
  overflow: hidden;
`;

export const ImgGuild = styled.img`
  width: 45px;
  border-radius: 50px;
`;
export const DashboardGuildsButton = styled(Link)`
  border: none;
  background: var(--btn-color);
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  padding: 10px;
  transition: 75ms all var(--transition);
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: var(--hover-guild-btn-color);
  }
  &:active {
    background: var(--btn-color);
  }
`;
export const BtnLoading = styled.button`
  @keyframes skeleton-loading {
    0% {
      color: transparent;
      background-color: var(--btn-color);
    }
    100% {
      background-color: var(--hover-guild-btn-color);
      color: transparent;
    }
  }
  border: none;
  animation: skeleton-loading 1s linear infinite alternate;
  color: transparent;
  border-radius: 6px;
  padding: 10px;
`;
export const InviteGuildsButton = styled.button`
  border: none;
  background: var(--btn-color);
  color: white;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border-radius: 6px;
  padding: 10px;
  transition: 75ms all var(--transition);
  &:hover {
    background: var(--hover-guild-btn-color);
  }
  &:active {
    background: var(--btn-color);
  }
`;
export const CircleImg = styled.div`
  background-color: var(--img-circle-guild);
  border-radius: 50px;
  width: 45px;
  height: 45px;
  max-width: 45px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImgLoading = styled.div`
  @keyframes skeleton-loading {
    0% {
      color: transparent;
      background-color: var(--btn-color);
    }
    100% {
      background-color: var(--hover-guild-btn-color);
      color: transparent;
    }
  }
  animation: skeleton-loading 1s linear infinite alternate;
  border-radius: 50px;
  width: 45px;
  height: 45px;
  max-width: 45px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  color: transparent;
  align-items: center;
`
import React from "react";
import { ButtonsHome, Content,DashboardButton,FirstSection, InviteButton } from "./styles";
import { useTranslation } from 'react-i18next'
export function Homepage(){
    const { t } = useTranslation()
    return(
        <div>
            <Content>
                <FirstSection>
                    <h1>{t('home-t1')}</h1>
                    <ButtonsHome>
                    <InviteButton><i className="fa-brands fa-discord"></i>{t('add-discord')}</InviteButton>
                    <DashboardButton>{t('dashboard')}</DashboardButton>
                    </ButtonsHome>
                </FirstSection>
            </Content>
        </div>
    )
}
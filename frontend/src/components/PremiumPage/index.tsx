import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getGuild, getUser } from "../../utils";
import {
  addDashboard,
  addLoadingDashboard,
  addUser,
} from "../../store/user/user";
import { useNavigate, useParams } from "react-router-dom";
import { APIGuild } from "discord-api-types/v10";
import { dashboardPageSetup } from "../../utils/functions";
import {BackgroundContent, ButtonContainer, ButtonSubscribe, Card, Container, Feature, FeaturesContainer, MostPopularContainer, PayBtn, PayBtnContainer, PopUp, PopUpInner, PriceInfo, SlashText, TextContainer, TextPeriod, TextPrice, TitlePage} from './styles'
import { t } from "i18next";

export function PremiumPage() {
  const [popup, setPopUp] = useState({
    price: 0,
    active: false,
    period: "",
    periodByMonth: 0,
    name: "",
    lifetime: false,
    priceInfo: ''
  })
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userRedux = useSelector((state: RootState) => state.user);
  const guildRedux = useSelector(
    (state: RootState) =>
      state.dashboard.guilds.filter((el) => el.id == params.id)[0]
  );
  const [loading, setLoading] = useState<boolean>(true);
  const reduxSelector = useSelector((state: RootState) => state);
  useEffect(() => {
    setLoading(true);
    dashboardPageSetup(reduxSelector, dispatch, params, navigate, location);
    setLoading(false);
  }, []);
  const cards = [
    {
      price:'3.99',
      period:t('monthly'),
      periodByMonth: 1,
      popular: false,
      lifetime: false,
      priceInfo: `3.99$ / ${t('monthly')}`,
      features:[
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
      ]
    },
    {
      price:'99.99',
      period:t('lifetime'),
      popular: true,
      periodByMonth: 12,
      priceInfo: `99.99$ / ${t('lifetime')}`,
      lifetime: true,
      features:[
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
      ]
    },
    {
      price:'47.99',
      period:t('yearly'),
      periodByMonth: 12,
      popular: false,
      lifetime: false,
      priceInfo: `47.99$ / ${t('yearly')}`,
      features:[
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
        {
          text:'feature test'
        },
      ]
    },
  ]

  return guildRedux && (
    <div>

      {
        popup.active && (
          <PopUp>
        <PopUpInner>
        <i onClick={() => setPopUp({...popup, active: false})} className="fa-solid fa-xmark"></i>
        <PriceInfo>
          {popup.priceInfo}
        </PriceInfo>
        <PayBtnContainer>
          <PayBtn>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="18" height="18"
viewBox="0 0 50 50"
style={document.dir == "rtl" ? { fill:"#ffffff", marginLeft:'10px'} : { fill:"#ffffff", marginRight:'10px'}}><path d="M 11.40625 2 C 10.40625 2 9.511719 2.6875 9.3125 3.6875 C 9.3125 3.6875 3.414063 30.695313 2.3125 36.09375 C 2.113281 37.195313 2.386719 37.789063 2.6875 38.1875 C 3.085938 38.6875 3.699219 39 4.5 39 L 12 39 L 17.90625 11.8125 C 18.105469 10.8125 19.011719 9 21.8125 9 L 38 9 C 36.601563 4.398438 32.105469 2 27.90625 2 Z M 22 11.09375 L 20.40625 11.40625 C 20.105469 11.605469 19.914063 12.011719 19.8125 12.3125 L 17.40625 23.5 C 18.105469 23.199219 18.792969 23.09375 19.59375 23.09375 L 26.8125 23.09375 C 33.210938 23.09375 36.800781 20.507813 38 14.90625 C 38.199219 13.90625 38.3125 13.113281 38.3125 12.3125 L 38.1875 11.1875 L 38.1875 11.09375 Z M 40.09375 11.3125 L 40.1875 12 C 40.289063 13 40.105469 13.894531 39.90625 15.09375 C 38.507813 21.59375 33.988281 24.90625 26.6875 24.90625 L 19.5 24.90625 C 17.898438 24.90625 16.800781 25.605469 16.5 26.90625 C 16.101563 28.707031 12.601563 45.199219 12.5 45.5 C 12.398438 46 12.507813 46.6875 12.90625 47.1875 C 13.207031 47.585938 13.6875 48 14.6875 48 L 22.6875 48 C 23.6875 48 24.613281 47.289063 24.8125 46.1875 C 25.710938 42.386719 26.898438 36.613281 27 36.3125 C 27 36.210938 27.09375 36 27.09375 36 L 32.40625 36 C 40.207031 36 46.101563 31.3125 47.5 23.8125 C 48.5 19.210938 47.207031 16.289063 45.90625 14.6875 C 44.105469 12.386719 40.792969 11.3125 40.09375 11.3125 Z"></path></svg>
            {t('pay-paypal')}</PayBtn>
        </PayBtnContainer>
        </PopUpInner>
      </PopUp>
        )
      }

     <TitlePage>{t('premium-title')}</TitlePage>
      <BackgroundContent>
      <div>
        <div>
         <Container>
          {
            cards.map((elm) => (
              <Card style={elm.popular ? {border: 'solid 3px var(--btn-discord-color)'} : {}}>
               {
                elm.popular &&  <MostPopularContainer>
                <span>{t('most-popular')}</span>
              </MostPopularContainer>
               }
              <TextContainer>
                <TextPrice>{elm.price}$</TextPrice>
                <SlashText>/</SlashText>
                <TextPeriod>{elm.period}</TextPeriod>
              </TextContainer>
              <FeaturesContainer>
                {
                  elm.features.map(fe => (
                    <>
                    <Feature>
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{fe.text}</span>
                </Feature>
               
                    </>
                  ))
                }
              </FeaturesContainer>
              <ButtonContainer>
                <ButtonSubscribe onClick={() => setPopUp({
                  active: true,
                  name: 'Semibot Premium',
                  period: elm.period,
                  lifetime: elm.lifetime,
                  periodByMonth: elm.periodByMonth,
                  price: Number(elm.price),
                  priceInfo: elm.priceInfo
                })}>{t('subscribe')}</ButtonSubscribe>
              </ButtonContainer>
            </Card>
            ))
          }
          
         </Container>
        </div>
      </div>
      </BackgroundContent>
    </div>
  );
}

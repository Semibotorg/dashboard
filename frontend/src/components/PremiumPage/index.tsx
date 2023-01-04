import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getGuild, getPremiumStatus, getUser, PremiumStatus } from "../../utils";
import {
  addDashboard,
  addLoadingDashboard,
  addUser,
} from "../../store/user/user";
import { useNavigate, useParams } from "react-router-dom";
import { APIGuild } from "discord-api-types/v10";
import { Server } from "../../utils";
import { dashboardPageSetup } from "../../utils/functions";
import {
  BackgroundContent,
  ButtonContainer,
  ButtonSubscribe,
  Card,
  Container,
  ContainerTable,
  Feature,
  FeaturesContainer,
  MostPopularContainer,
  PayBtn,
  PayBtnContainer,
  PopUp,
  PopUpInner,
  PriceInfo,
  ServerTable,
  SlashText,
  TableBodyContainer,
  TableContainer,
  TableContent,
  TableContentContainer,
  TableHead,
  TableHeadContent,
  TableHeadContentContainer,
  TextContainer,
  TextPeriod,
  TextPrice,
  TitlePage,
} from "./styles";
import { t } from "i18next";
import {Oval as Loader} from "react-loader-spinner";
import axios from "axios";
import { CircleImg } from "../GuildPage/styles";

export function PremiumPage() {
  const [popup, setPopUp] = useState({
    price: 0,
    active: false,
    period: "",
    periodByMonth: 0,
    name: "",
    lifetime: false,
    priceInfo: "",
  });
  const [loadingPay, setLoadingPay] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userRedux = useSelector((state: RootState) => state.user);
  const premiumRedux = useSelector((state: RootState) => state.premium.guilds.filter((el) => el.GuildId == params.id)[0]);
  const [paymentAccepted, setPaymentAccepted] = useState(false)
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
  /*
GuildId = req.body.guild_id;
    nameItem = req.body.product_name;
    periodTime = req.body.period
    lifetime = req.body.lifetime
 */
  function payPaypal() {
    setLoadingPay(true)
    setError(false)
    axios
      .post(`${Server.Url}/premium/subscribe`, {
        guild_id: guildRedux.id,
        product_name: popup.name,
        period: popup.periodByMonth,
        lifetime: popup.lifetime,
      },{
        headers: {
          authorization:localStorage.token
        }
      })
      .then((res) => {
        setLoadingPay(true)
        setError(false)
        if (res.data.status == "ok") {
          
          var windowPaypal = window.open(
            res.data.link,
            "_blank",
            `toolbar=no, location=no, directories=no,
                  status=no, menubar=no, scrollbars=no, resizable=no,
                  copyhistory=no, width=800, height=1200,
                  top=${window.screen.height / 2 - 600 / 2}, left=${
              window.screen.width / 2 - 450 / 2
            }`
          );
          
          var IntervalPaypal = setInterval((e: TimerHandler) => {
            if (windowPaypal?.closed == true) {
              clearInterval(IntervalPaypal);
              console.log("window closed");
              setError(true);
              setLoadingPay(false);
            }
          }, 100);
        } else {
          setError(true);
          setLoadingPay(false);
        }
      })
      .catch((err) => {
        setError(true);
        setLoadingPay(false);
        console.log(err);
      });

    let msg = false;
    window.addEventListener("message", async (message) => {
      if (message.data == "closed") {
        msg = true;
        dashboardPageSetup(reduxSelector, dispatch, params, navigate, location, {premium: true});
        console.log("paid!");
        setTimeout(async () => {
          
          setError(false);
          setLoadingPay(false);
          setPaymentAccepted(true)
          
        }, 50);
        setError(false);
      } else if (message.data == "error") {
        msg = true;
        setError(true);
        setLoadingPay(false);
      }
    });
  }

  const cards = [
    {
      price: "3.99",
      period: t("monthly"),
      periodByMonth: 1,
      popular: false,
      lifetime: false,
      priceInfo: `3.99$ / ${t("monthly")}`,
      features: [
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
      ],
    },
    {
      price: "99.99",
      period: t("lifetime"),
      popular: true,
      periodByMonth: 12,
      priceInfo: `99.99$ / ${t("lifetime")}`,
      lifetime: true,
      features: [
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
      ],
    },
    {
      price: "47.99",
      period: t("yearly"),
      periodByMonth: 12,
      popular: false,
      lifetime: false,
      priceInfo: `47.99$ / ${t("yearly")}`,
      features: [
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
        {
          text: "feature test",
        },
      ],
    },
  ];

  return (
    guildRedux &&(
      <div>
        {popup.active && (
          <PopUp>
            <PopUpInner>
              <i
                onClick={() => {
                  setLoadingPay(false)
                  setError(false)
                  setPaymentAccepted(false)
                  setPopUp({ ...popup, active: false })
              }}
                className="fa-solid fa-xmark"
              ></i>
              <PriceInfo> 
                {
                  error == true ? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', columnGap:'34px', gap:'34px'}}>
                    <img  src="https://img.icons8.com/external-sbts2018-flat-sbts2018/58/666666/external-declined-payment-payment-1-sbts2018-flat-sbts2018.png"/>
                     <h5>{t('payment-declined')}</h5>
                     
                   </div>)
                   
                   : paymentAccepted ? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', columnGap:'34px', gap:'34px'}}>
                  <img src="https://img.icons8.com/pastel-glyph/64/FFBB7E/card-accepted.png"/>
                     <h5>{t('payment-accepted')}</h5>
                  </div>
                   ) : popup.priceInfo
                } </PriceInfo>
              <PayBtnContainer>
                {loadingPay ? (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      color:'white',
                      fontSize:'20px'
                    }}
                  >
                    <h2>
                      {document.dir == "rtl"
                        ? "الرجاء الإنتظار..."
                        : "Please Wait..."}
                    </h2>
                    <Loader
                      color="#4e27fd"
                      height={33}
                      width={33}
                    />
                  </div>
                ) : !error && !paymentAccepted && (                  <PayBtn onClick={payPaypal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="18"
                    height="18"
                    viewBox="0 0 50 50"
                    style={
                      document.dir == "rtl"
                        ? { fill: "#ffffff", marginLeft: "10px" }
                        : { fill: "#ffffff", marginRight: "10px" }
                    }
                  >
                    <path d="M 11.40625 2 C 10.40625 2 9.511719 2.6875 9.3125 3.6875 C 9.3125 3.6875 3.414063 30.695313 2.3125 36.09375 C 2.113281 37.195313 2.386719 37.789063 2.6875 38.1875 C 3.085938 38.6875 3.699219 39 4.5 39 L 12 39 L 17.90625 11.8125 C 18.105469 10.8125 19.011719 9 21.8125 9 L 38 9 C 36.601563 4.398438 32.105469 2 27.90625 2 Z M 22 11.09375 L 20.40625 11.40625 C 20.105469 11.605469 19.914063 12.011719 19.8125 12.3125 L 17.40625 23.5 C 18.105469 23.199219 18.792969 23.09375 19.59375 23.09375 L 26.8125 23.09375 C 33.210938 23.09375 36.800781 20.507813 38 14.90625 C 38.199219 13.90625 38.3125 13.113281 38.3125 12.3125 L 38.1875 11.1875 L 38.1875 11.09375 Z M 40.09375 11.3125 L 40.1875 12 C 40.289063 13 40.105469 13.894531 39.90625 15.09375 C 38.507813 21.59375 33.988281 24.90625 26.6875 24.90625 L 19.5 24.90625 C 17.898438 24.90625 16.800781 25.605469 16.5 26.90625 C 16.101563 28.707031 12.601563 45.199219 12.5 45.5 C 12.398438 46 12.507813 46.6875 12.90625 47.1875 C 13.207031 47.585938 13.6875 48 14.6875 48 L 22.6875 48 C 23.6875 48 24.613281 47.289063 24.8125 46.1875 C 25.710938 42.386719 26.898438 36.613281 27 36.3125 C 27 36.210938 27.09375 36 27.09375 36 L 32.40625 36 C 40.207031 36 46.101563 31.3125 47.5 23.8125 C 48.5 19.210938 47.207031 16.289063 45.90625 14.6875 C 44.105469 12.386719 40.792969 11.3125 40.09375 11.3125 Z"></path>
                  </svg>
                  {t("pay-paypal")}
                </PayBtn>)
                }
              </PayBtnContainer>
            </PopUpInner>
          </PopUp>
        )}

        <TitlePage>{t("premium-title")}</TitlePage>
        <div className="vertical-line" />
        <BackgroundContent>
          <div>
            <div>
              {
                premiumRedux?.active ? (
                  <ContainerTable>
                    <TableContainer>
                    <TableHead>
                      <TableHeadContentContainer>
                        <TableHeadContent>{t('server')}:</TableHeadContent>
                        <TableHeadContent>{t('expires-in')}:</TableHeadContent>
                        <TableHeadContent>{t('payment-id')}:</TableHeadContent>
                      </TableHeadContentContainer>
                    </TableHead>
                    <TableBodyContainer>
                      <TableContentContainer>
                        <TableContent>
                         <ServerTable>
                          {
                            guildRedux.icon ? (<img src={`https://cdn.discordapp.com/icons/${guildRedux.id}/${guildRedux.icon}.png`}/>) : (
                              <CircleImg>
                              <span>{guildRedux.name.substring(0, 2)}</span>
                            </CircleImg>
                            )
                          }
                         
                          {guildRedux.name}
                         </ServerTable>
                          </TableContent>
                        <TableContent>{premiumRedux.lifeTime ? t('lifetime') : `${premiumRedux.daysLeft} ${t('days')}`}</TableContent>
                        <TableContent>{premiumRedux._id}</TableContent>
                      </TableContentContainer>
                    </TableBodyContainer>
                  </TableContainer>
                  </ContainerTable>
                ) : (
                  <Container>
                {cards.map((elm) => (
                  <Card
                    style={
                      elm.popular
                        ? { border: "solid 3px var(--btn-discord-color)" }
                        : {}
                    }
                  >
                    {elm.popular && (
                      <MostPopularContainer>
                        <span>{t("most-popular")}</span>
                      </MostPopularContainer>
                    )}
                    <TextContainer>
                      <TextPrice>{elm.price}$</TextPrice>
                      <SlashText>/</SlashText>
                      <TextPeriod>{elm.period}</TextPeriod>
                    </TextContainer>
                    <FeaturesContainer>
                      {elm.features.map((fe) => (
                        <>
                          <Feature>
                            <i className="fa-solid fa-circle-check"></i>
                            <span>{fe.text}</span>
                          </Feature>
                        </>
                      ))}
                    </FeaturesContainer>
                    <ButtonContainer>
                      <ButtonSubscribe
                        onClick={() =>
                          setPopUp({
                            active: true,
                            name: "Semibot Premium",
                            period: elm.period,
                            lifetime: elm.lifetime,
                            periodByMonth: elm.periodByMonth,
                            price: Number(elm.price),
                            priceInfo: elm.priceInfo,
                          })
                        }
                      >
                        {t("subscribe")}
                      </ButtonSubscribe>
                    </ButtonContainer>
                  </Card>
                ))}
              </Container>
                )
              }
            </div>
          </div>
        </BackgroundContent>
      </div>
    )
  );
}

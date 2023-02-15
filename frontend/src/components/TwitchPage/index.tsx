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

import { dashboardPageSetup } from "../../utils/functions";
import { BackgroundContent, TextArea, TextInput, TextInputContainer } from "./styles";
import Select from 'react-select'
export function TwitchPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch()
  const userRedux = useSelector((state: RootState) => state.user);
  const guildRedux = useSelector((state: RootState) => state.dashboard.guilds.filter(el => el.id == params.id))[0];
  const [loading, setLoading] = useState<boolean>(true)
  const reduxSelector = useSelector((state: RootState) => state);

  useEffect(() => {
    setLoading(true)
    dashboardPageSetup(reduxSelector, dispatch, params, navigate, location)
    setLoading(false)
  },[])

  return(
    <div>

        <div>
          <BackgroundContent>
            <TextInputContainer>
              <span>username</span>
              <TextInput placeholder="Twitch username"/>
            </TextInputContainer>
            <TextInputContainer>
              <span>Send to channel</span>
              <Select
              theme={(theme) => ({
                ...theme,
                borderRadius:10,

              })}
              styles={{
                 control:(baseStyles, state) => ({
                  ...baseStyles,
                  background:'var(--textinput-bg-color)',
                  cursor:'pointer',
                  border:state.isFocused || state.menuIsOpen? 'solid 3px var(--textinput-border-hover-color) !important' : 'solid 3px var(--textinput-border-color) !important',
                  borderRadius:'10px',
                  borderColor:'red',
                  padding:'5px',
                  outline:'none !important',
                  transition:'all .2s var(--transition)',
                  boxShadow:'none'
                }),
                singleValue:(baseStyles, state) => ({
                  ...baseStyles,
                  color:'white'
                }),
              }}
              options={[
                {
                  value:'hello',
                  label:'hello'
                },
                {
                  value:'hello',
                  label:'hello'
                },
                {
                  value:'hello',
                  label:'hello'
                },
              ]}
              className="react-select"
              classNamePrefix="react-select"
               />
            </TextInputContainer>
            <TextInputContainer>
              <span>Message</span>
              <TextArea placeholder="Message"/>
            </TextInputContainer>
          </BackgroundContent>
          
        </div>
      
    </div>
  );
}

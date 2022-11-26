import { Server } from "./";
import axios from 'axios'
export function LoginDiscord() {
    window.open(
      `${Server.Url}/api/auth/login`,
      "_blank",
      `toolbar=no, location=no, directories=no,
      status=no, menubar=no, scrollbars=no, resizable=no,
      copyhistory=no, width=800, height=1200,
      top=${window.screen.height / 2 - 600 / 2}, left=${
        window.screen.width / 2 - 450 / 2
      }`
    );
    window.addEventListener('message', (message: any) => {
      if(typeof message.data == 'object') return
      if(message.data.split(" ")[1] !== "login") return
      localStorage.token = message.data.split(" ")[0];
      axios.defaults.headers.common.Authorization = localStorage.token;
    })
  }
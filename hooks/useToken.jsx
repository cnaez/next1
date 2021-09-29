import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useCookie from "./useCookie";
export default function UseToken() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const tokenExists = await AsyncStorage.getItem("token");
      if (!tokenExists) {
        // there should be a machanism to request for a new token but for future refrence, this should navigate to login route
        axios
          .post(process.env.BASE_URL_API + "auth/token")
          .then(({ data }) => {
            // only remove the token
            useCookie().then(() => {
              console.log(
                "++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"
              );
              console.log(data.token);
              console.log(
                "??????????????????????????????????????????????????????????"
              );

              setToken(data.token);
            });
          })
          .catch((e) => {
            console.log(process.env.BASE_URL_API + "auth/token");
            console.log(e);
          });
      } else {
        setToken(tokenExists);
      }
    }
    fetchData();
  }, []);

  return token;
}

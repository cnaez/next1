import { useCookie } from "next-cookie";
import http from "../utils/http";

export default function useHttp() {
  const cookie = useCookie();
  const token = cookie.get("token");
  return http(token);
}

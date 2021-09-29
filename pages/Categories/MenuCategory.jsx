import useSWR from 'swr'
import http from "../../utils/http";
import * as axios from "axios";

export default function Cards() {
  const api = http();
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(api.getAll, fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>


  return (
    <>
      <div>hello {data.title}!</div>
    </>
  );
}
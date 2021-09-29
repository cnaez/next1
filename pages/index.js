import Head from "next/head";
import Image from "next/image";
import MainLayout from "../components/Layouts/MainLayout";
import MainCarousel from "../components/Carousel/MainCarousel";
import Cards from "../components/Cards";
import { Space } from "antd";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import useSWR from "swr";
import http from "../utils/http";
import * as axios from "axios";

export default function Home() {
  const api = http();
  const fetcher = (url) =>
    axios.get(url).then((res) => {
      return res.data;
    });
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos/",
    fetcher
  );

  if (!data) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;

  return (
    <MainLayout>
      <MainCarousel style={{ margin: 50 }}></MainCarousel>
      <Space direction="vertical" />
      <Row>
        <Col>
          {data.map((item) => (
            <Cards
              completed={item.completed}
              id={item.id}
              title={item.title}
              userId={item.userId}
            />
          ))}
        </Col>
      </Row>
      <Space direction="vertical" />
    </MainLayout>
  );
}

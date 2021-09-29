import { Card } from "antd";

const { Meta } = Card;

export default function Cards({ completed, id, title, userId }) {
  return (
    <>
      <Card hoverable style={{ width: 240 }}>
        <p>
          id :{id} <br /> user_id : {userId}
          <br /> completed :{`${completed}`.toUpperCase()} <br />
        </p>
        <Meta title={title} description="www.instagram.com" />
      </Card>
    </>
  );
}

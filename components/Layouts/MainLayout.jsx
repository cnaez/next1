import { Layout, Menu, Breadcrumb } from "antd";
import Image from "next/image";
import Link from "next/link"
import styles from './MainLayout.module.css'

const { Header, Content, Footer } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout className="layout">
      <Header style={{ position: 'fixed', zIndex: 99999, width: '100%' }}>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"><Link href="/"><a>Home</a></Link></Menu.Item>
          <Menu.Item key="2"><Link href="/Categories/MenuCategory"><a>Categories</a></Link></Menu.Item>
          <Menu.Item key="3"><Link href="/Books/Books"><a>Products</a></Link></Menu.Item>
          <Menu.Item key="4"><Link href="/Auth/Login"><a>Join Us</a></Link></Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.container}>
        <div className={styles.siteLayoutContent}>{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        All rights reserved by NextShop
      </Footer>
    </Layout>
  );
}

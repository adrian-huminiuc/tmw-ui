import React, {useEffect, useState} from 'react';
import {Breadcrumb, Col, Layout, Menu, Row} from 'antd';
import {useMatches, useNavigate} from "react-router-dom";
import './MainLayout.scss'
import backgroundImage from "../assets/background.jpg";
import {menuRoutes} from "../menu-routes.ts";

const {Header, Content} = Layout;

const MainLayout = (props: { children: React.ReactNode }) => {
    const matches = useMatches();
    const navigate = useNavigate();
    const [activeRoute, setActiveRoute] = useState('');

    useEffect(() => {
        setActiveRoute(matches[matches.length - 1]?.id ?? '0-0')
    }, [matches]);

    return (
        <Layout style={{
            height: '100%',
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "initial",
            backgroundSize: 'cover'
        }}>
            <Header
                style={{position: 'sticky', top: 0, zIndex: 1, width: '100%', background: "inherit"}}>
                <Row>
                    <Col xs={0} sm={10}></Col>
                    <Col sm={10} xs={24} style={{marginLeft: -20}}>
                        <Menu
                            mode="horizontal"
                            style={{
                                background: 'transparent',
                                borderBottom: 'none',
                                display: 'flex',
                                marginBottom: 25,
                                fontSize: 20
                            }}
                            defaultSelectedKeys={[activeRoute]}
                            selectedKeys={[activeRoute]}
                            items={menuRoutes.map((it) => (
                                {
                                    key: it.routeId,
                                    label: it.label,
                                    onClick: () => navigate(it.route),
                                }))}
                        />
                    </Col>
                </Row>
            </Header>
            <Content className="site-layout">
                <Breadcrumb style={{margin: '16px 0'}}></Breadcrumb>
                <div className="site-layout__direct-container">
                    {props.children}
                </div>
            </Content>
        </Layout>
    );
};

export default MainLayout;

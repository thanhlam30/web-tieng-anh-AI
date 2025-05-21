import {
    AppstoreOutlined,
    CarryOutOutlined,
    FileSearchOutlined,
    FormOutlined,
    HomeOutlined,
    LoginOutlined,
    ScheduleOutlined,
    PlayCircleOutlined,
    UserOutlined,
    RobotFilled,
} from '@ant-design/icons';
import { faBlog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useWindowUnloadEffect from 'utils/useWindowUnloadEffect';
import { Menu, message } from 'antd';
import { setLogin } from 'app/globalSlice';
import { fetchCategoriesVideo } from 'features/Video/videoSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import auth from 'utils/auth';
import logo from 'images/logo/logo.png';
import './style.scss';

const { SubMenu } = Menu;

function Header(props) {
    const { isLogin } = useSelector((state) => state.global);
    const { categories } = useSelector((state) => state.video);
    const dispatch = useDispatch();
    const [keyMenu, setKeyMenu] = useState(1);

    useEffect(() => {
        let key = localStorage.getItem('menuSelected');
        if (key !== undefined || key == null) {
            setKeyMenu(key);
        }
    }, []);

    useEffect(() => {
        dispatch(fetchCategoriesVideo());
    }, []);

    const handleOnClick = (e) => {
        setKeyMenu(e.key);
    };

    useWindowUnloadEffect(() => {
        localStorage.setItem('menuSelected', keyMenu);
    }, true);

    const headerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px 0',
        // boxShadow: " 0 4px 4px -2px #c4c4c4"
    };

    return (
        <div className="header">
            <Menu
                mode="horizontal"
                style={headerStyle}
                onClick={handleOnClick}
                selectedKeys={keyMenu}
            >
                <Menu.Item key={1} icon={<HomeOutlined />}>
                    <Link to="/">Trang chủ</Link>
                </Menu.Item>

                <Menu.Item key={2} icon={<FileSearchOutlined />}>
                    <Link to="/translate">Tra từ</Link>
                </Menu.Item>

                <Menu.Item key={3} icon={<AppstoreOutlined />}>
                    <Link to="/courses">Khóa học từ vựng</Link>
                </Menu.Item>

                {isLogin && (
                    <Menu.Item key={4} icon={<FormOutlined />}>
                        <Link to="/wordnotes">Wordnote</Link>
                    </Menu.Item>
                )}

                {isLogin && (
                    <Menu.Item key={5} icon={<RobotFilled />}>
                        <Link to="/chat">ChatWithAI</Link>
                    </Menu.Item>
                )}

                <SubMenu
                    key="SubMenu"
                    icon={<PlayCircleOutlined />}
                    title="Video"
                >
                    <div className="adjust-video">
                        <Menu.ItemGroup title="Explore by topics">
                            {categories &&
                                categories.map((category, index) => (
                                    <Menu.Item key={category.name}>
                                        <Link to={'/videos/' + category.slug}>
                                            {category.name}
                                        </Link>
                                    </Menu.Item>
                                ))}
                        </Menu.ItemGroup>
                    </div>
                </SubMenu>


                <Menu.Item key={6} icon={<CarryOutOutlined />}>
                    <Link to="/exams">Luyện thi toeic</Link>
                </Menu.Item>

                <SubMenu
                    key={7}
                    icon={<ScheduleOutlined />}
                    title="Làm theo part"
                >
                    <Menu.ItemGroup title="Luyện nghe">
                        <Menu.Item key="100_1">
                            <Link to="/parts/1">Part 1</Link>
                        </Menu.Item>

                        <Menu.Item key="100_2">
                            <Link to="/parts/2">Part 2</Link>
                        </Menu.Item>

                        <Menu.Item key="100_3">
                            <Link to="/parts/3">Part 3</Link>
                        </Menu.Item>

                        <Menu.Item key="100_4">
                            <Link to="/parts/4">Part 4</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>

                    <Menu.ItemGroup title="Luyện đọc">
                        <Menu.Item key="100_5">
                            <Link to="/parts/5">Part 5</Link>
                        </Menu.Item>

                        <Menu.Item key="100_6">
                            <Link to="/parts/6">Part 6</Link>
                        </Menu.Item>

                        <Menu.Item key="100_7">
                            <Link to="/parts/7">Part 7</Link>
                        </Menu.Item>
                    </Menu.ItemGroup>
                </SubMenu>

                {isLogin ? (
                    <SubMenu key="10_1" icon={<UserOutlined />} title={localStorage.getItem("username") || "Cá nhân"}>
                        <Menu.Item key="10_1_2">
                            <Link
                                to="/login/manage"
                                onClick={() =>
                                    auth.logout(() => {
                                        message.success('Bạn đã đăng xuất');
                                        dispatch(setLogin(false));
                                    })
                                }
                            >
                                Đăng xuất
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                ) : (
                    <>
                        <Menu.Item
                            key="11_1"
                            icon={<LoginOutlined />}
                            title="Đăng nhập">
                            <Link to="/login/manage">Đăng nhập</Link>
                        </Menu.Item>
                        <Menu.Item
                            key="11_2"
                            icon={<LoginOutlined />}
                            title="Đăng ký">
                            <Link to="/signUp">Đăng ký</Link>
                        </Menu.Item>
                    </>

                )}
            </Menu>
        </div>
    );
}

export default Header;

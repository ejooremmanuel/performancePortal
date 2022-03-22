import React, { useState } from 'react';
import styles from './styles.module.css'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { FaThLarge, FaUserCircle, FaRegChartBar, FaVoteYea, FaSortAlphaDown, FaWalking, FaRegClock, FaUsers, FaSignOutAlt, FaSwimmer } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { Tooltip } from '..';
import { logout } from '../../redux/actions/userActions';

const Navigation = () => {
    const [toggle, setToggle] = useState(false)
    const dispatch = useDispatch()

    const logoutUser = () => {
        dispatch(logout())
    }


    return <div className={styles.hra__navigation}>
        <div className={styles.hra__logo}>
            <img src={logo} alt="Logo" />
        </div>
        <div className={styles.hra__links}>
            <ul>
                <Tooltip text="Dashboard">
                    <li><Link to="/dashboard"><FaThLarge /></Link></li>
                </Tooltip>
                <Tooltip text="Profile">
                    <li><Link to="/dashboard"><FaUserCircle /></Link></li>
                </Tooltip>
                {toggle ? (
                    <Tooltip text="Appraisal">
                        <li className={styles.open} onClick={() => setToggle(false)}>
                            <span>
                                <FaRegChartBar />

                            </span>
                        </li>
                    </Tooltip>

                ) : (
                    <Tooltip text="Appraisal">
                        <li className={styles.open} onClick={() => setToggle(true)}>
                            <span>
                                <FaRegChartBar />

                            </span>
                        </li>
                    </Tooltip>

                )}
                <div className={toggle ? styles.hra__showGuest : styles.hra__hideGuest}>
                    <ul>
                        <Tooltip text="Start Appraisal">
                            <li>
                                <Link to="/frontdesk/guest">
                                    <FaVoteYea />
                                </Link>
                            </li>
                        </Tooltip>
                        <Tooltip text="Initiatives">
                            <li>
                                <Link to="/frontdesk/returning/guest">
                                    <FaSortAlphaDown />
                                </Link>
                            </li>
                        </Tooltip>

                    </ul>
                </div>


                <Tooltip text="Leave request">
                    <li>
                        <Link to="/frontdesk/admin">
                            <FaSwimmer />
                        </Link>
                    </li>
                </Tooltip>
                <Tooltip text="Clockin">
                    <li>
                        <Link to="/frontdesk/department">
                            <FaRegClock />
                        </Link>
                    </li>
                </Tooltip>
                <Tooltip text="Staffs">
                    <li>
                        <Link to="/frontdesk/prebook">
                            <FaUsers />
                        </Link>
                    </li>
                </Tooltip>
                <Tooltip text="Exit Interview">
                    <li>
                        <Link to="/frontdesk/logs">
                            <FaWalking />
                        </Link>
                    </li>
                </Tooltip>
                <Tooltip text="Logout">
                    <li>
                        <Link to="/#logout" onClick={logoutUser}>
                            <FaSignOutAlt />
                        </Link>
                    </li>
                </Tooltip>
            </ul>
        </div>
    </div >;
};

export default Navigation;

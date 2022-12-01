import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button from '~/component/Button';
import Loading from '~/component/Loading';
import * as Services from '~/Services/Services';
import styles from './AccountRegister.module.scss';

const cx = classNames.bind(styles);

const REGEX_USER = /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/;

function FormLogin() {
    const [isLoading, setIsLoading] = useState(false);

    const [errLogin, setErrLogin] = useState(false);

    const [userName, setUserName] = useState('');
    const [errUserName, setErrUserName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [errPwd, setErrPwd] = useState(false);

    const [hiddenPwd, setHiddenPwd] = useState(true);
    const [isOke, setIsOke] = useState(false);

    const userNameRef = useRef();

    useEffect(() => {
        userNameRef.current.focus();
        setErrUserName(false);
        setIsOke(false);
        setErrUserName(false);
        setErrLogin(false);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (errPwd || errUserName) {
            setIsOke(true);
        } else {
            setIsOke(false);
        }
    }, [errPwd, errUserName, isOke]);

    const handleUserName = (e) => {
        let value = e.target.value;
        if (!value.startsWith(' ') || REGEX_USER.test(userName)) {
            setErrUserName(false);
            setUserName(value);
        } else {
            setErrUserName(true);
            setErrUserName('');
        }
    };
    const handlePwd = (e) => {
        let value = e.target.value;
        if (!value.startsWith(' ')) {
            setErrPwd(false);
            setPwd(value);
        } else {
            setErrPwd(true);
            setPwd('');
        }
    };
    const handleSubmit = (e) => {
        setIsLoading(true);
        e.preventDefault();
        Services.login({ email: userName, password: pwd })
            .then((data) => {
                if (data) {
                    console.log(data);
                    setIsLoading(false);
                    localStorage.setItem('USER_LOGIN', JSON.stringify(data.data));
                    localStorage.setItem('TOKEN', data.meta.token);
                    window.location.reload();
                } else {
                    setIsLoading(false);
                    setErrLogin(true);
                    setPwd('');
                }
            })
            .catch(() => {
                setErrLogin(true);
                setIsLoading(false);
            });
    };

    return (
        <div>
            {isLoading && (
                <>
                    <div className={cx('loading')}>
                        <Loading />
                        <h2> Logged in.....</h2>
                    </div>
                    <div className={cx('overlay')}> </div>
                </>
            )}

            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-control')}>
                        <input
                            type="text"
                            ref={userNameRef}
                            autoComplete="username"
                            placeholder="Username"
                            onChange={handleUserName}
                            value={userName}
                            onFocus={() => {
                                setErrLogin(false);
                                setErrUserName(false);
                            }}
                            onBlur={(e) => {
                                if (!REGEX_USER.test(userName)) {
                                    setErrUserName(true);
                                }
                            }}
                        />
                        <span></span>
                        {errUserName && <small>User name invalid</small>}
                    </div>
                    <div className={cx('form-control')}>
                        <input
                            type={hiddenPwd ? 'password' : 'text'}
                            name="password"
                            placeholder="Password"
                            value={pwd}
                            onChange={handlePwd}
                            autoComplete="current-password"
                            onFocus={() => {
                                setErrLogin(false);
                                setErrPwd(false);
                            }}
                            // onBlur={(e) => {
                            //     if (pwd.length < 8) {
                            //         setErrPwd(true);
                            //     }
                            // }}
                        />

                        <span></span>
                        {errPwd && <small>Invalid, password must be more than 8 characters </small>}
                        {hiddenPwd ? (
                            <div className={cx('hidden')} onClick={() => setHiddenPwd((e) => !e)}>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </div>
                        ) : (
                            <div className={cx('hidden')} onClick={() => setHiddenPwd((e) => !e)}>
                                <FontAwesomeIcon icon={faEye} />
                            </div>
                        )}
                        {errLogin && <small>Invalid user name or password, please try again</small>}
                    </div>
                    <Button primary large disable={isOke} className={cx('btn')}>
                        <p>Sign up</p>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default FormLogin;

import styles from './AccountRegister.module.scss';
import classNames from 'classnames/bind';
import Button from '~/component/Button';
import * as Services from '~/Services/Services';

import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import Loading from '~/component/Loading';
const cx = classNames.bind(styles);

const REGEX_USER = /^[a-zA-Z](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){4,18}[a-zA-Z0-9]$/;

function FormSignUp() {
    const [userName, setUserName] = useState('');
    const [errUserName, setErrUserName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [errPwd, setErrPwd] = useState(false);

    const [confirmPwd, setConfirmPwd] = useState('');
    const [ErrCfPwd, setErrCfPwd] = useState(false);

    const [hiddenPwd, setHiddenPwd] = useState(true);
    const [hiddenCfPwd, setHiddenCfPwd] = useState(true);

    const [isOke, setIsOke] = useState(false);

    const userNameRef = useRef();

    useEffect(() => {
        userNameRef.current.focus();
        setErrUserName(false);
    }, []);

    useEffect(() => {
        if (errPwd || ErrCfPwd || errUserName) {
            setIsOke(true);
        } else {
            setIsOke(false);
        }
    }, [errPwd, ErrCfPwd, errUserName, isOke]);
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
    const handleConfirm = (e) => {
        let value = e.target.value;
        setConfirmPwd(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Services.register({ email: userName, password: pwd })
            .then((data) => {
                if (data) {
                    // setUserName('');
                    // setPwd('');
                    // setConfirmPwd('');
                    console.log(data);
                    alert('Successfully registered, please log in');
                }
            })
            .then(() => {
                Services.login({ email: userName, password: pwd }).then((data) => {
                    if (data) {
                        console.log(data);
                        console.log(data.data);
                        console.log(data.meta.token);
                        localStorage.setItem('USER', JSON.stringify(data.data));
                        localStorage.setItem('TOKEN', JSON.stringify(data.meta.token));
                        // window.location.reload();
                    }
                });
            })
            .catch((error) => console.log(error));
    };

    console.log(confirmPwd);
    return (
        <div>
            <div className={cx('loading')}>
                <Loading />
                <div className={cx('overlay')}></div>
            </div>
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
                        {userName.length === 0 && (
                            <p className={cx('guide')}>
                                Must begin with string, no space, and length must be more than 6 characters
                            </p>
                        )}
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
                                setErrPwd(false);
                            }}
                            onBlur={(e) => {
                                if (pwd.length < 8) {
                                    setErrPwd(true);
                                }
                            }}
                        />

                        <span></span>
                        {errPwd && <small>Invalid, length of password must be more than 8 characters </small>}
                        {hiddenPwd ? (
                            <div className={cx('hidden')} onClick={() => setHiddenPwd((e) => !e)}>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </div>
                        ) : (
                            <div className={cx('hidden')} onClick={() => setHiddenPwd((e) => !e)}>
                                <FontAwesomeIcon icon={faEye} />
                            </div>
                        )}
                    </div>
                    <div className={cx('form-control')}>
                        <input
                            type={hiddenCfPwd ? 'password' : 'text'}
                            name="password"
                            placeholder="Confirm password"
                            value={confirmPwd}
                            autoComplete="new-password"
                            onChange={handleConfirm}
                            onFocus={() => {
                                setErrCfPwd(false);
                            }}
                            onBlur={() => {
                                if (confirmPwd === pwd) {
                                    setErrCfPwd(false);
                                } else {
                                    setErrCfPwd(true);
                                }
                            }}
                        />
                        <span></span>
                        {ErrCfPwd && <small>Password not match</small>}
                        {hiddenCfPwd ? (
                            <div className={cx('hidden')} onClick={() => setHiddenCfPwd((e) => !e)}>
                                <FontAwesomeIcon icon={faEyeSlash} />
                            </div>
                        ) : (
                            <div className={cx('hidden')} onClick={() => setHiddenCfPwd((e) => !e)}>
                                <FontAwesomeIcon icon={faEye} />
                            </div>
                        )}
                    </div>
                    <Button outline large disable={isOke} className={cx('btn')}>
                        <p>Sign up</p>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default FormSignUp;

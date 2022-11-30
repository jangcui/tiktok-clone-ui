import styles from './AccountRegister.module.scss';
import classNames from 'classnames/bind';
import Button from '~/component/Button';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

function FormSignUp() {
    const [userName, setUserName] = useState('');
    const [errUserName, setErrUserName] = useState(false);

    const [pwd, setPwd] = useState('');
    const [errPwd, setErrPwd] = useState(false);

    const [confrmPwd, setConfirmPwd] = useState('');
    const [ErrCfPwd, setErrCfPwd] = useState(false);

    const userNameRef = useRef();

    useEffect(() => {
        userNameRef.current.focus();
    }, []);

    const handleUserName = (e) => {
        const value = e.target.value;
        if (!value.startsWith(' ')) {
            setUserName(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    console.log(userName);
    return (
        <div>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-control')}>
                        <input
                            type="text"
                            ref={userNameRef}
                            id="username"
                            placeholder="Username"
                            onChange={handleUserName}
                            value={userName}
                        />
                        <span></span>
                        <small>dfsdfd</small>
                    </div>
                    <div className={cx('form-control')}>
                        <input type="current-password" id="password" placeholder="Password" />
                        <span></span>
                        <small></small>
                    </div>
                    <div className={cx('form-control')}>
                        <input type="new-password" id="password2" placeholder="Confirm password" />
                        <span></span>
                        <small></small>
                    </div>
                    <Button outline large className={cx('btn')}>
                        <p>Sign up</p>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default FormSignUp;

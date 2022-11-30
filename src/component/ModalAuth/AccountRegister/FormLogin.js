import classNames from 'classnames/bind';
import Button from '~/component/Button';
import styles from './AccountRegister.module.scss';
const cx = classNames.bind(styles);

function FormLogin() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div>
            <div className={cx('container')}>
                <form onSubmit={handleSubmit}>
                    <div className={cx('form-control')}>
                        <input type="text" placeholder="Username" />
                        <span></span>
                        <small></small>
                    </div>
                    <div className={cx('form-control')}>
                        <input type="password" id="password" placeholder="Password" />
                        <span></span>
                        <small></small>
                    </div>
                    <Button outline large className={cx('btn')}>
                        <p>Log in</p>
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default FormLogin;

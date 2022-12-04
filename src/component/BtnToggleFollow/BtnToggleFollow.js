import Tippy from '@tippyjs/react';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import Button from '../Button';
import ModalAuth from '../ModalAuth';
import styles from './BtnToggleFollow.module.scss';
import * as Services from '~/Services/Services';
import UserContext from '../UserContext';
const cx = classNames.bind(styles);

function BtnToggleFollow({ dataUser }) {
    const user = UserContext();
    const [isFollow, setIsFollow] = useState(dataUser.is_followed ? true : false);
    const [openModal, setOpenModal] = useState(false);

    const handleFollow = () => {
        !!user ? setOpenModal(false) : setOpenModal(true);
        if (dataUser && !!user) {
            Services.followUser(dataUser.id)
                .then((data) => {
                    if (data) {
                        setIsFollow(true);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    const handleUnFollow = () => {
        if (dataUser) {
            Services.unFollowUser(dataUser.id)
                .then((data) => {
                    if (data) {
                        setIsFollow(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ModalAuth isOpen={openModal} onClose={() => setOpenModal(false)} />
            {isFollow ? (
                <Tippy offset={[0, 15]} placement="left" content="Un follow" allowHTML=" false" delay={[500, 200]}>
                    <span onClick={handleUnFollow}>
                        <Button text outline className={cx('btn')}>
                            <b> Following</b>
                        </Button>
                    </span>
                </Tippy>
            ) : (
                <span onClick={handleFollow}>
                    <Button primary className={cx('btn')}>
                        <b>Follow</b>
                    </Button>
                </span>
            )}
        </div>
    );
}

export default BtnToggleFollow;

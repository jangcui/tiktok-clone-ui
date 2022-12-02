import classNames from 'classnames/bind';
import styles from './FooterSidebar.module.scss';

const cx = classNames.bind(styles);

const FooterSidebar = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <span> Giới thiệu</span>
                <span> TikTok Browse</span>
                <span> Bảng tin</span>
                <span> Liên hệ</span>
                <span> Sự nghiệp</span>
                <span> ByteDance</span>
                <span> TikTok for Good</span>
                <span> Quảng cáo</span>
                <span> Developers</span>
                <span> Transparency</span>
                <span> TikTok Rewards</span>
                <span> Trợ giúp</span>
                <span> An toàn</span>
                <span> Điều khoản</span>
                <span> Quyền riêng tư</span>
                <span> Creator Portal</span>
                <span> Hướng dẫn cộng dồng</span>
            </div>

            <p> Thêm </p>
            <p> © 2022 TikTok </p>
        </div>
    );
};

export default FooterSidebar;

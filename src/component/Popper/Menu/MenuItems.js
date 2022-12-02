import PropTypes from 'prop-types';
import Button from '~/component/Button';
import className from 'classnames/bind';
import styles from './Menu.module.scss';
const cx = className.bind(styles);
function MenuItems({ data, onClick }) {
    const classes = cx('menu-items', {
        separate: data.separate,
        shareArrow: data.shareArrow,
    });
    return (
        <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
            {data.shareArrow}
        </Button>
    );
}
MenuItems.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};
export default MenuItems;

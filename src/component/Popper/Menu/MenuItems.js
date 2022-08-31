import Button from '~/component/Button';
import className from 'classnames/bind';
import styles from './Menu.module.scss';

const cx = className.bind(styles);

function MenuItems({ data, onClick }) {
  const classes = cx('menu-items', {
    separate: data.separate,
  });
  return (
    <Button className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
      {data.title}
    </Button>
  );
}

export default MenuItems;

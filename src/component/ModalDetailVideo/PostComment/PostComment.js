import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import Button from '~/component/Button';
import styles from './PostComment.module.scss';
import * as Services from '~/Services/Services';

const cx = classNames.bind(styles);

function PostComment({ idVideo, onPost }) {
    const [valueCmt, setValueCmt] = useState('');
    const inputRef = useRef();
    const handleValueCmt = (e) => {
        setValueCmt(e.target.value);
    };
    const handlePostCmt = () => {
        Services.postCreateComment(idVideo, valueCmt)
            .then((data) => {
                console.log(data);
                setValueCmt(' ');
                inputRef.current.focus();
                onPost();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <>
            <div className={cx('wrap-input')}>
                <input
                    name="comment"
                    ref={inputRef}
                    type="text"
                    value={valueCmt}
                    placeholder="Add comment..."
                    onChange={handleValueCmt}
                />
            </div>
            <Button normal disable={valueCmt === ''} className={cx('btn-post')} onClick={handlePostCmt}>
                Post
            </Button>
        </>
    );
}

export default PostComment;

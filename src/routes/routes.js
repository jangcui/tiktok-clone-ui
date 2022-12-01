import config from '~/config';

import { HeaderOnly } from '~/layouts';
import Following from '../pages/Following';
import Home from '../pages/Home/Home';
import Live from '../pages/Live';
import Profile from '../pages/Profile';
import Upload from '../pages/Upload';

const publicRouter = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
];

const privateRouter = [];

export { publicRouter, privateRouter };

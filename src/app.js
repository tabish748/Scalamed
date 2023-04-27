import Router from './routes/router.js';
import { loadAboutView,} from './views/about/about.js';
import { loadWelcomeView,} from './views/welcome/welcome.js';
import { loginLayout,} from './views/login/login.js';
import { getRxView,} from './views/get-rx/get-rx.js';
import { otpCodeView } from './views/otp-code/otp-code.js';

const routes = 
[
    { path: '/', template: loadWelcomeView },
    { path: '/about', template: loadAboutView},
    { path: '/login', template: loginLayout},
    { path: '/getrx', template: getRxView},
    { path: '/otpcode', template: otpCodeView},
];

const router = Router.getInstance(routes);

document.body.addEventListener('click', (e) => 
  {
    if (e.target.matches('[data-link]')) {
      e.preventDefault();
      if(e.target.href)
        router.navigateTo(e.target.href);
      else
      router.navigateTo(`${window.location.origin}/${e.target.getAttribute('redirect-to')}`);
    }
  });

window.addEventListener('popstate', () => {
    router.loadRoute(window.location.pathname.split('/').slice(1));
});

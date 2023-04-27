import Utils from '../../libs/utils.js';
import CustomButton from '../../components/button/button.js';
import LazyImage from '../../components/lazy-image/lazy-image.js';
// import { Localization } from '../../libs/localization.js';

export async function loadHomeView() {
  // Import files
  const template = await Utils.fetchTemplate('home/home.tpl');
  const loginCss = await Utils.loadCSS('../../compiled-css/pages/login.css');
  const btnCss = await Utils.loadCSS('../../compiled-css/components/atoms/button.css');
  

  // SEO
  Utils.setPageTitle('Home Screen');

  // After Render will call when html renders in DOM
  const afterRender = async () => {
   
    main();

    async function main() {
      Utils.setIdShortcuts(document, window);
      // const localization = new Localization();

      // await import('../../libs/localization.js');
      handleDynamicElements();
    }

    function handleDynamicElements() 
    {
     
      const image = Utils.createElement('lazy-image', {
        'data-src': './assets/images/bg5.jpg',
        className: 'test_img_class',
        alt: 'alternate image',
      }, []);
      image_wrapper.appendChild(image);
      test_btn.addEventListener('click', handleBtn);
    }

  };

  // Define event functions
  const handleBtn = () => {
    alert('Yahuuu its working');
  };

  // teardown will exectue when view will leave the DOM 
  const teardown = () => {
    test_btn.removeEventListener('click', handleBtn);
  };

  // HTML
  return {
    html: template,
    css: [loginCss, btnCss],
    afterRender,
    teardown,
  };
}

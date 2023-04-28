import Utils from '../../libs/utils.js';

export async function rxDownloadingView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('rx-downloading/rx-downloading.tpl');
    const css = await Utils.loadCSS('../../compiled-css/pages/login.css');

    //SEO
    Utils.setPageTitle('sample title');
    Utils.setMetaTag('description','sample description');

    // After Render will automatically call when HTML will insert into DOM
    // Write all the logics in afterRender
    const afterRender = () => 
    {
        Utils.setIdShortcuts(document, window);
       
    }

     // teardown will exectue when view will leave the DOM 
  const teardown = () => {
    test_btn.removeEventListener('click', handleBtn);
  };

    return {
        html: template,
        css: [css],
        afterRender,
        teardown,
    }
}
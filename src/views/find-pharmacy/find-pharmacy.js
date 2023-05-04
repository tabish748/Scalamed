import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
export async function findPharmacyView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('find-pharmacy/find-pharmacy.tpl');
    const css = await Utils.loadCSS('../../compiled-css/pages/find-pharmacy.css');

    //SEO
    Utils.setPageTitle('Find Pharmacy - Scalamed');

    // After Render will automatically call when HTML will insert into DOM
    // Write all the logics in afterRender
    const afterRender = () => 
    {
        main();
        function main()
        {
            Utils.setIdShortcuts(document, window);
            prescription_tab.addEventListener('click', ()=>{
                prescription_detail.parentElement.classList.toggle('open');                
                
            })
        }
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
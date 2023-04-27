import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
import ButtonAction from '../../components/button/button.js';
import Router from '../../routes/router.js';

// import { requestRxDownloadToken } from "../../services/rx/rx-service.js";
import FormHandler from "../../libs/form-handling/form-handling.js";
export async function getRxView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('get-rx/get-rx.tpl');
    const css = await Utils.loadCSS('../../compiled-css/pages/get-rx.css');

    //SEO
    Utils.setPageTitle('Get your Rx - Scalamed');

    // After Render will automatically call when HTML will insert into DOM
    // Write all the logics in afterRender
    const afterRender = () => 
    {
      
        main();
    
        function main()
        {
              const requestRxDownloadToken =
              {
                Send: function ()
                {
                  return {
                    'success': true
                  };
                }
              };
            Utils.setIdShortcuts(document, window);
            new FormHandler({ formId: "dob_form" });
            dob_form.addEventListener("formSubmit", async () => {
                try {
                  const payload = {
                    "telecom": "+923413639160",
                    "dob": 19920202,
                    "rxRedemptionStatus": "PENDING",
                    "appLaunchUrl": "https://app.scalamed.com/rx-dl"
                  };
                  const response = await requestRxDownloadToken.Send();
                  if(response.success === true)
                  {
                    const router = Router.getInstance();
                    router.navigateTo(`${window.location.origin}/otpcode`);
                  }
                  
                  const formSubmitCompleteEvent = new CustomEvent('formSubmitComplete');
                  dob_form.dispatchEvent(formSubmitCompleteEvent);
                } catch (error) {
                  console.error("Error:", error);
                }
              });
        }

    }


     // teardown will exectue when view will leave the DOM 
  const teardown = () => {
    
  };

    return {
        html: template,
        css: [css],
        afterRender,
        teardown,
    }
}
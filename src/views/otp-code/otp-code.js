import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
export async function otpCodeView()
{
    //Here you can import files
    const template = await Utils.fetchTemplate('otp-code/otp-code.tpl');
    const css = await Utils.loadCSS('../../compiled-css/pages/otp-code.css');

    //SEO
    Utils.setPageTitle('Verification - Scalamed');

    const afterRender = () => 
    {
        Utils.setIdShortcuts(document, window);
       
        main();
        function main()
        {
            const otpInputs = document.querySelectorAll('.otpcode__form__input');

            otpInputs.forEach((input, index) => {
                input.addEventListener('input', () => {
                    if (input.value.length === 1) {
                        if (index === otpInputs.length - 1) {
                            document.getElementById('otp_form').submit();
                        } else {
                            otpInputs[index + 1].focus();
                        }
                    }
                });
            });
            remaining_seconds.innerText = '120'
        }
    }

  const teardown = () => {
    
  };

    return {
        html: template,
        css: [css],
        afterRender,
        teardown,
    }
}
import Utils from '../../libs/utils.js';
import RxLayout from '../../components/rx-layout/rx-layout.js';
import Router from '../../routes/router.js';
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
            // console.log('otpcode_form',otpcode_form)
            const otp_form = document.getElementById('otpcode_form')
            otpInputs.forEach((input, index) => {
                input.addEventListener('input', () => {
                    if (input.value.length === 1) {
                        if (index === otpInputs.length - 1) 
                        {
                            const otpValues = Array.from(otpInputs).map(input => input.value);
                            const combinedOtpValue = otpValues.join('');
                            if(combinedOtpValue == '123456')
                            {
                                const router = Router.getInstance();
                                router.navigateTo(`${window.location.origin}/rxDownloading`);
                            }
                            else
                            {
                                otp_form.classList.add('error')
                                const error = Utils.createElement('span', {class: 'error__message'}, ['Incorrect code. please try again or resend']);
                                otp_form.appendChild(error);
                            }
                        } else 
                        {
                            
                            otpInputs[index + 1].focus();
                        }
                    }
                });
            });
            
            let count = 20;
            const timer = setInterval(function() {
            if (count <= 0) {
                clearInterval(timer);
                remaining_seconds.textContent = "Resend it";

            } else {
                remaining_seconds.textContent = count + " Seconds";
                count--;
            }
            }, 1000);

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
<rx-layout>
    <div class="rx__section">
        <span class="icon__bg">
            <i class="icon-calendar-brief"></i>
        </span>
        <h1 class="mt-1">Enter your date of birth</h1>
    <p>To download your prescription, confirm your date of birth. You will receive a unique code via text to enter.</p>
    <form method="post" id="dob_form" data-validate>
        <div class="calendar__box" id="calendar_box">
            <input type="date" name="calendar_comp"  data-error="required" id="calendar_comp">
            <!-- <i class="icon-calendar"></i> -->
        </div>
        <button-action label-txt="Confirm" id="btn" type="submit" className="mt-1" w-100 primary ></button-action>
        
    </form>
    
    <a href="" data-link class="text__link text__center mt-2 d__block">Need help?</a>
    </div>
</rx-layout>

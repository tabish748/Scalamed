<rx-layout>
    <div class="pharmacy__section">
        <div class="container">
            <div class="pharmacy__prescription__section">
            <div class="pharmacy__prescription__container" id="prescription_tab">
                <h2>BENZONATATE</h2>
                <p>Nasonex 50 mcg/act nasal</p>
            </div>
            <div class="pharmacy__prescription__detail" id="prescription_detail">
              <div class="prescription__detail__wrapper">
                <div>
                    <b>How to use</b>
                    <p>Take one teaspoonful by mouth three times daily until gone.</p>
                    </div>
                    <div>
                        <div class="prescription__date__wrapper">
                            12/02/20222
                        </div>
                    </div>
                    <div>
                        <b>Label information</b>
                        <table cellpadding="5">
                            <tr>
                                <td>Quality</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <td>Route</td>
                                <td>Nasaf</td>
                            </tr>
                            <tr>
                                <td>Dispose after</td>
                                <td>Sep 30, 2020</td>
                            </tr>
                        </table>
                    </div>
              </div>


            </div>  
            </div>

            <div class="pharmacy__find__section">
                <div class="heading__and__icons__wrapper">
                    <h2>Find Pharmacy</h2>
                    <div class="icons__list__wrapper">
                        <ul>
                            <li> <i class="icon-mapview"></i></li>
                            <li> <i class="icon-mappointer"></i></li>
                            <li> <i class="icon-filter"></i></li>
                        </ul>
                    </div>
                </div>

                <div class="pharmacy__search__section">
                    <input type="text" placeholder="Search pharmacy by zip code, address or name" id="search_input">
                    <div class="spinner" id="search_spinner"></div>
                <div class="pharmacy__suggestions__wrapper" id="suggestions_container" hidden="true">
                    <ul id="suggestions"></ul>
                </div>
                </div>
            </div>

            <div class="list__wrapper" id="list_wrapper">
              
            </div>
        </div>
    </div>
</rx-layout>
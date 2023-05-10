<rx-layout>
  <div class="pharmacy__section">
    <div class="heading__buddy">
      <span class="icon__bg">
        <i class="icon-location"></i>
    </span>
    <h1 class="mt-1" id="searchforPharmaciesHeading"></h1>
    <p id="searchforPharmaciesText"></p>
    </div>
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
              <div class="prescription__date__wrapper">12/02/20222</div>
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
              <li alt-txt="Map view">
                <i class="icon-mapview"></i>
                <p class="hide__mob">Map view</p>
              </li>
              <li id="nearby_pharmacies" class="active">
                <i class="icon-mappointer"></i>
                <p class="hide__mob">Current location</p>
              </li>
              <li id="filter_btn" class="active">
                <i class="icon-filter"></i>
                <p class="hide__mob">Sort & filters</p>
              </li>
              
            </ul>

            <div
              class="filter__dropdown__container"
              id="filter_container"
              hidden="true"
            >
              <h2>Sort by</h2>

              <div class="filter__sorting__wrapper">
                <label class="custom__radio">
                  <input type="radio" id="low_to_high" name="sorting" />
                  <span class="radio__mark"></span>
                  Price (low - high)
                </label>
                <label class="custom__radio">
                  <input type="radio" id="high_to_low" name="sorting" />
                  <span class="radio__mark"></span>
                  Price (high - low)
                </label>
                <label class="custom__radio">
                  <input type="radio" id="distance" name="sorting" />
                  <span class="radio__mark"></span>
                  Distance
                </label>
              </div>

              <h2>Pharmacy type</h2>
              <div class="filter__type__wrapper">
                <div>
                  <input
                    type="checkbox"
                    name="retail"
                    id="retail_type"
                    value="retailType"
                  />
                  <span>
                    <label for="retail_type">Retail</label>
                    <p>Primarily Pickup. CVS, walgreens etc</p>
                  </span>
                </div>
                <div>
                  <input
                    type="checkbox"
                    name="mailOrder"
                    id="mail_order"
                    value="mailOrder"
                  />
                  <span>
                    <label for="mail_order">Mail Order</label>
                    <p>Delivery only pharmacy - Pillpack, Caremark</p>
                  </span>
                </div>
              </div>

           <div class="filter__cta__wrapper">
            <button-action
            label-txt="Apply"
            primary
            medium
            classname="mt-3"
            id="filter_apply_btn"
          ></button-action>
           </div>
            </div>
          </div>
        </div>

        <div class="pharmacy__search__section">
          <input
            type="text"
            placeholder="Search pharmacy by zip code, address or name"
            id="search_input"
          />
          <div class="spinner" id="search_spinner"></div>
          <div
            class="pharmacy__suggestions__wrapper"
            id="suggestions_container"
            hidden="true"
          >
            <ul id="suggestions"></ul>
          </div>
        </div>
      </div>

      <div class="list__wrapper" id="list_wrapper"></div>
    </div>
  </div>
</rx-layout>

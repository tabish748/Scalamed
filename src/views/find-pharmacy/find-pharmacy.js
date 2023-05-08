import Utils from "../../libs/utils.js";
import RxLayout from "../../components/rx-layout/rx-layout.js";
import ButtonAction from '../../components/button/button.js';
import { findSearchTermSuggestions, findDrugPricesByZip, findDrugPricesByGeo } from "../../services/pharmacy/pharmacy-service.js";
export async function findPharmacyView() {
  //Here you can import files
  const template = await Utils.fetchTemplate("find-pharmacy/find-pharmacy.tpl");
  const css = await Utils.loadCSS("../../compiled-css/pages/find-pharmacy.css");

  //SEO
  Utils.setPageTitle("Find Pharmacy - Scalamed");

  // After Render will automatically call when HTML will insert into DOM
  // Write all the logics in afterRender
  const afterRender = () => {
    main();
    function main() {
      Utils.setIdShortcuts(document, window);
      prescription_tab.addEventListener("click", () => {
        prescription_detail.parentElement.classList.toggle("open");
      });
      handleSearch();
      nearby_pharmacies.addEventListener('click', handleUserLocationPharmacy);
      
    }
  };

  const searchAPI = async (query) => {
    if (!query) {
      suggestions.innerHTML = "";
      return;
    }
    try {
      const response = await findSearchTermSuggestions(query);
      const data = await response.result.locations;
      displaySuggestions(data);
    } catch (error) {
      console.log("Error fetching search results:", error);
    }
  }

  const displaySuggestions = (data) => {
    suggestions_container.hidden = false;
    data?.map((item) => {
      const zipCode = Utils.extractNumericWord(item);

      const li = Utils.createElement("li", {}, [item]);
      suggestions.append(li);
      li.zipCode = zipCode;
      li.addEventListener("click", async (event) => {
        console.log(event.target.zipCode);
        suggestions_container.hidden = true;
        try {
          const response = await findDrugPricesByZip(event.target.zipCode);
          const pharmacies = await response.result;
          displayPharmacies(pharmacies);
        } catch (error) {
          console.log("Error fetching search results:", error);
        }
      });
    });
  }

  const displayPharmacies = (data) =>
  {
    list_wrapper.innerHTML = '';
    data?.map(item => {
      const listCard = createCard(item);
      list_wrapper.append(listCard)
    })
  }

  const showSpinner = () => {
    search_spinner.style.display = "inline-block";
  }

  const debounce = (func, wait, onStart) => {
    let timeout;
    return function (...args) {
      const context = this;
      if (onStart) onStart();
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), wait);
    };
  }

  const handleSearch = () => {
    search_input.addEventListener(
      "input",
      debounce(
        (e) => {
          searchAPI(e.target.value);
          search_spinner.style.display = "none";
        },
        500,
        showSpinner
      )
    ); // Debounce time set to 2 seconds
    document.addEventListener("click", (e) => {
      if (
        !search_input.contains(e.target) &&
        !suggestions.contains(e.target)
      ) {
        suggestions_container.hidden = true;
      }
    });
  }

  const createCard = (data) =>
    {
      console.log(data)
      const open  = data?.isOpenNow ? 'open' : 'closed' ;
      const listCard = Utils.createElement('div', { class: 'list__card' }, [
        Utils.createElement('div', { class: 'list__card__name' }, [
          Utils.createElement('h3', {}, [data?.name]),
          Utils.createElement('p', { class: 'pharmacy__address' }, [data.addressLine1]),
        ]),
        Utils.createElement('div', { class: 'list__card__price' }, [
         
          Utils.createElement('p', {}, [
            Utils.createElement('b', {}, ['34']),
            'Coupon'
          ]),
        ]),
        Utils.createElement('div', { class: 'list__card__schedule' }, [
         
           Utils.createElement('span', { class: open == 'open' ? 'open' : 'closed' }, [open]),
          Utils.createElement('p', {}, ['9:00am - 10:00pm']),
          Utils.createElement('p', {}, [data.distanceDisplayValue]),
        ]),
        Utils.createElement('div', { class: 'list__card__cta' }, [
          Utils.createElement('button-action', {
            'label-txt': 'Select',
            primary: '',
            'w-100': '',
            small: '',
            className: 'mt-4',
            'redirect-link': 'identityVerification',
          }),
        ]),
      ]);
    
      return listCard;
    }

    const handleUserLocationPharmacy = () => {
      let coordinates;
      Utils.getCurrentLocation().then((coords) => {
        coordinates = coords.latitude.toFixed(4) + "°, " + coords.longitude.toFixed(4) + "°";
      }).then(async () => {
        console.log('coordinates', coordinates);
        search_input.value = coordinates;
        try {
          const response  = await findDrugPricesByGeo();
          displayPharmacies(response.result)
        } catch (error) {
          console.log('error',error)
        }
      });
     
    }

  // teardown will exectue when view will leave the DOM
  const teardown = () => {
    
  };

  return {
    html: template,
    css: [css],
    afterRender,
    teardown,
  };
}

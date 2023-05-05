import Utils from "../../libs/utils.js";
import RxLayout from "../../components/rx-layout/rx-layout.js";
import { findSearchTermSuggestions } from "../../services/pharmacy/pharmacy-service.js";
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
    }

    function debounce(func, wait, onStart) {
      let timeout;
      return function (...args) {
        const context = this;
        if (onStart) onStart();
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
      };
    }
    function showSpinner() {
      search_spinner.style.display = "inline-block";
    }

    function handleSearch() {
      search_input.addEventListener(
        "input",
        debounce(
          (e) => {
            searchAPI(e.target.value);
            search_spinner.style.display = "none";
          },
          2000,
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

    async function searchAPI(query) {
      if (!query) {
        suggestions.innerHTML = "";
        return;
      }
      try {
        const response = await findSearchTermSuggestions(query);
        const data = await response.result.locations;
        displaySuggestions(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }

    function displaySuggestions(data) {
      suggestions_container.hidden = false;
      data?.map((item) => {
        const zipCode = Utils.extractNumericWord(item);

        const li = Utils.createElement("li", {}, [item]);
        suggestions.append(li);
        li.zipCode = zipCode;
        li.addEventListener("click", (event) => {
          console.log(event.target.zipCode);
        });
      });
    }
  };

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

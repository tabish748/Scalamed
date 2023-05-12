import Utils from "../../libs/utils.js";

class ListingBuddy extends HTMLElement
{
  static tname = "listing-buddy";
  
  constructor()
  {
    super();

    this.action = null;
    Utils.Bind(this, "On_");
  }

  connectedCallback()
  {
    this.Render();
  }
  

  set value(data)
  {
    this._displayPharmacies(data);
  }

   _displayPharmacies(data)
   {
    map_view_btn.classList.add('active');
    this.list_wrapper.innerHTML = "";
    data?.map((item) => {
      const listCard = this._createCard(item);
      this.list_wrapper.append(listCard);
    });
  };
  

  _createCard(data)
  {
    const open = data?.isOpenNow ? "open" : "closed";
    const listCard = Utils.createElement("div", { class: "list__card" }, [
      Utils.createElement("div", { class: "list__card__name" }, [
        Utils.createElement("h3", {}, [data?.name]),
        Utils.createElement("p", { class: "pharmacy__address" }, [
          data.addressLine1,
        ]),
      ]),
      Utils.createElement("div", { class: "list__card__price" }, [
        Utils.createElement("p", {}, [
          Utils.createElement("b", {}, ["34"]),
          "Coupon",
        ]),
      ]),
      Utils.createElement("div", { class: "list__card__schedule" }, [
        Utils.createElement(
          "span",
          { class: open == "open" ? "open" : "closed" },
          [open]
        ),
        Utils.createElement("p", {}, ["opens 9:00am"]),
        Utils.createElement("p", {}, [data.distanceDisplayValue]),
      ]),
      Utils.createElement("div", { class: "list__card__cta" }, [
        Utils.createElement("button-action", {
          "label-txt": "Select",
          primary: "",
          "w-100": "",
          small: "",
        }),
      ]),
    ]);
    return listCard;
  };



  Render()
  {
    const html = `
    <div class="list__wrapper" id="list_wrapper"></div>
    `;

    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);

  }
}

Utils.Register_Element(ListingBuddy);

export default ListingBuddy;

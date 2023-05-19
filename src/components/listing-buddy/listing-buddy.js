import Utils from "../../libs/utils.js";

class ListingBuddy extends HTMLElement {
  static tname = "listing-buddy";

  constructor() {
    super();
    this.markers = [];
    this.action = null;
    this.selectedCard = null;
    this.infoWindow = null;
    Utils.Bind(this, "On_");
  }

  connectedCallback() {
    this.Render();
    Utils.loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAooY8V107rnpI6sj_bVr9jPoPW09x5Ncg"
    );
  }

  disconnectedCallback() {
    Utils.removeScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAooY8V107rnpI6sj_bVr9jPoPW09x5Ncg"
    );
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
  }

  set value(data) {
    this._displayPharmacies(data);
  }

  set view(mode) {
    if (mode == "map") {
      this._handleMapView();
    }
  }

  _handleMapView() {
    if (!this.list__view__mode.classList.contains("map__view")) {
      this.list__view__mode.classList.add("map__view");
      map_view_btn
        .querySelector("i")
        .classList.replace("icon-mapview", "icon-listview");
      map_view_btn.querySelector("p").innerText = "List view";
      setTimeout(() => {
        this.initMap(this.locations);
      }, 500);
    } else {
      map_wrapper.remove();
      this.list__view__mode.classList.remove("map__view");
      map_view_btn
        .querySelector("i")
        .classList.replace("icon-listview", "icon-mapview");
      map_view_btn.querySelector("p").innerText = "Map view";
    }
  }

  initMap(locations) {
    let mapWrapper = Utils.createElement(
      "div",
      { class: "map__wrapper", id: "map_wrapper" },
      []
    );
    this.list__view__mode.appendChild(mapWrapper);
    let latSum = 0;
    let lngSum = 0;
    locations.forEach((location) => {
      latSum += location.lat;
      lngSum += location.lng;
    });
    const averageLat = latSum / locations.length;
    const averageLng = lngSum / locations.length;
    const map = new google.maps.Map(document.getElementById("map_wrapper"), {
      center: { lat: averageLat, lng: averageLng },
      zoom: 13,
    });

    // Save the map for later
    this.map = map;
    // Clear old markers
    this.markers.forEach((marker) => marker.setMap(null));
    this.markers = [];
    const icon = {
      url: "../../assets/images/icons/mapPointer.svg", // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    };
    // Add new markers
    locations.forEach((location, index) => {
      const marker = new google.maps.Marker({
        position: location,
        icon: icon,
      });
      marker.setMap(map);
      google.maps.event.addListener(marker, "click", () => {
        const position = marker.getPosition();
        const card = this.querySelectorAll(".list__card")[index];
        if (this.selectedCard) {
          this.selectedCard.classList.remove("active");
        }
        if (card) {
          card.scrollIntoView({ behavior: "smooth" });
          card.classList.add("active");
          this.selectedCard = card;
        }

        // info window on google map
        if (this.infoWindow) {
          this.infoWindow.close();
        }

        const infoWindow = new google.maps.InfoWindow({
          content: this._createInfoWindowContent(card),
        });

        infoWindow.open(map, marker);
        this.infoWindow = infoWindow;
      });

      this.markers.push(marker);
    });
  }

  _createInfoWindowContent(card) {
    const name = card.querySelector(".list__card__name h3").innerText;
    const address = card.querySelector(".pharmacy__address").innerText;
    const scheduleStatus = card.querySelector(".list__card__schedule span").innerText;
    const scheduleInfo = card.querySelector(".list__card__schedule p").innerText;
    const distanceValue = card.querySelector(".list__card__schedule .pharmacy__distance").innerText;
    const price = card.querySelector(".list__card__price p b").innerText;

    const content = `<div class="map__tooltip">
      <div class="tooltip__title__container"> 
        <h3>${name}</h3>
        <b>$${price}</b> 
      </div>
        <p> <span class='${scheduleStatus == 'open' ? 'open__label': 'close__label'}'> ${scheduleStatus}</span> <span>${scheduleInfo} </span> | ${distanceValue}</p>
      </div>`;

    return content;
  }

  _displayPharmacies(data, mark) {
    if (mark) console.log("mark", mark);
    map_view_btn.classList.add("active");
    this.list_wrapper.innerHTML = "";
    data?.map((item) => {
      const listCard = this._createCard(item);
      this.list_wrapper.append(listCard);
    });

    this.locations = data.map((item) => ({
      lat: item.latitude,
      lng: item.longitude,
    }));
  }

  _createCard(data) {
    console.log("data", data);
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
        Utils.createElement("p", { class: "pharmacy__distance"}, [data.distanceDisplayValue]),
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
    listCard.lat = data.latitude;
    listCard.lng = data.longitude;
    return listCard;
  }

  Render() {
    const html = `
      <div id="list__view__mode">
        <div class="list__wrapper" id="list_wrapper"></div>
      </div>
      `;
    const doc = Utils.toDocument(html);
    this.replaceChildren(doc);
    Utils.setIdShortcuts(this, this);
  }
}

Utils.Register_Element(ListingBuddy);

export default ListingBuddy;

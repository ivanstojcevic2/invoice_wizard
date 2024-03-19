var ukupnaCijena = 0;
var servicesContainer = document.getElementById("services-container");
var docTypeDisplay = document.getElementById("document-type-display");
var docType = docTypeDisplay.innerHTML;
var userDocType;

function addSubject() {
  var subjectName = document.getElementById("subject-name").value;
  var subjectNameContainer = document.getElementById("subject-name-container");
  subjectNameContainer.innerText = subjectName;

  var subjectID = document.getElementById("subject-id").value;
  var subjectIDContainer = document.getElementById("subject-id-container");
  subjectIDContainer.innerText = subjectID;

  var subjectAddress = document.getElementById("subject-address").value;
  var subjectAddressContainer = document.getElementById(
    "subject-address-container"
  );
  subjectAddressContainer.innerText = subjectAddress;
}

function setDocTypePonuda() {
  docTypeDisplay.innerHTML = "Vaša ponuda:";
}

function setDocTypeRacun() {
  docTypeDisplay.innerHTML = "Vaš račun:";
}

function checkDocType() {
  if (docType === "Vaša ponuda:") {
    userDocType = "ponude:";
  } else if (docType === "Vaš račun:") {
    userDocType = "računa:";
  } else {
    userDocType = "dokumenta:";
  }
}

checkDocType();

function emptyInvoiceCheck() {
  var warningMessage = document.getElementById("invoice-status");

  if (servicesContainer.children.length <= 1) {
    warningMessage.innerText = "Vaš dokument je prazan";
  } else {
    warningMessage.innerText = `Stavke ${userDocType}`;
  }
}

emptyInvoiceCheck();

function addProduct() {
  var serviceValue = document.querySelector("#SelectService").value;
  var serviceLabel = document.querySelector(
    'option[value="' + serviceValue + '"]'
  ).label;
  var servicePrice = parseFloat(document.getElementById("price-field").value);

  ukupnaCijena += servicePrice;

  var ukupnaCijenaContainer = document.getElementById("total-price");
  ukupnaCijenaContainer.innerHTML = `${ukupnaCijena.toFixed(2)} EUR`;

  var serviceLabelContainer = document.createElement("span");
  serviceLabelContainer.innerHTML = serviceLabel;
  serviceLabelContainer.className = "service-name";

  var servicePriceContainer = document.createElement("span");
  servicePriceContainer.innerHTML = `${servicePrice.toFixed(2)} EUR`;
  servicePriceContainer.className = "service-price";

  var servicePDVContainer = document.createElement("span");
  servicePDVContainer.innerHTML = `${(servicePrice / 1.25).toFixed(2)} EUR`;
  servicePDVContainer.className = "service-price";

  var deleteServiceButton = document.createElement("button");
  deleteServiceButton.className = "delete-service-button";
  deleteServiceButton.innerHTML = "X";

  var service = document.createElement("div");
  service.className = "service";
  service.appendChild(serviceLabelContainer);
  service.appendChild(servicePriceContainer);
  service.appendChild(servicePDVContainer);
  service.appendChild(deleteServiceButton);

  var ukupnoPDVContainer = document.getElementById("total-pdv");
  var ukupnoPDV = ukupnaCijena / 1.25;

  ukupnoPDVContainer.innerHTML = ukupnoPDV.toFixed(2) + " EUR";

  var servicesContainer = document.getElementById("services-container");
  servicesContainer.appendChild(service);

  deleteServiceButton.onclick = function () {
    ukupnaCijena -= servicePrice;
    var ukupnaCijenaContainer = document.getElementById("total-price");
    ukupnaCijenaContainer.innerHTML = `${ukupnaCijena.toFixed(2)} EUR`;
    var ukupnoPDVContainer = document.getElementById("total-pdv");
    var ukupnoPDV = ukupnaCijena / 1.25;

    ukupnoPDVContainer.innerHTML = ukupnoPDV.toFixed(2) + " EUR";

    var servicesContainer = document.getElementById("services-container");
    servicesContainer.appendChild(service);
    this.parentNode.remove();
    emptyInvoiceCheck();
  };

  emptyInvoiceCheck();
}

function saveDocument() {
  function checkEmpty() {
    var subjectNameContainer = document.getElementById(
      "subject-name-container"
    );
    var subjectIdContainer = document.getElementById("subject-id-container");
    var subjectAddressContainer = document.getElementById(
      "subject-address-container"
    );
    var dateContainer = document.getElementById("invoice-expiration-date");

    if (servicesContainer.children.length <= 1) {
      alert("Prazan obrazac! Dodajte usluge.");
    } else if (subjectNameContainer.innerHTML.length === 0) {
      alert("Neispravan naziv klijenta!");
    } else if (subjectIdContainer.innerHTML.length != 8) {
      alert("Neispravan OIB klijenta!");
      return;
    } else if (subjectAddressContainer.innerHTML.length === 0) {
      alert("Neispravna adresa klijenta!");
    } else if (dateContainer.value === "") {
      alert("Unesite do kada je ponuda važeća!");
    } else if (docTypeDisplay.innerHTML === "Vrsta dokumenta nije odabrana!") {
      alert("Odaberite vrstu dokumenta!");
    } else {
      window.print();
    }
  }

  checkEmpty();
}

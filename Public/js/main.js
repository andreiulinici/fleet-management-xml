var drivers = initializeDriversToLocalStorage();
var vehicles = initializeVehiclesToLocalStorage();

function parseObjFromXml() {
    
    xml = loadXMLDoc("fleet_management.xml");

    var obj = XML2jsobj(xml.documentElement);
	
    return obj;
}

function XML2jsobj(node) {

	var	data = {};

	// append a value
	function Add(name, value) {
		if (data[name]) {
			if (data[name].constructor != Array) {
				data[name] = [data[name]];
			}
			data[name][data[name].length] = value;
		}
		else {
			data[name] = value;
		}
	};
	
	// element attributes
	var c, cn;
	for (c = 0; cn = node.attributes[c]; c++) {
		Add(cn.name, cn.value);
	}
	
	// child elements
	for (c = 0; cn = node.childNodes[c]; c++) {
		if (cn.nodeType == 1) {
			if (cn.childNodes.length == 1 && cn.firstChild.nodeType == 3) {
				// text value
				Add(cn.nodeName, cn.firstChild.nodeValue);
			}
			else {
				// sub-object
				Add(cn.nodeName, XML2jsobj(cn));
			}
		}
	}

	return data;
}

function loadXMLDoc(filename) {
    
    if (window.ActiveXObject) {
        xhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } else {
        xhttp = new XMLHttpRequest();
    }
    
    xhttp.open("GET", filename, false);
    
    try {
        xhttp.responseType = "msxml-document"
    } catch (err) {} // Helping IE11
    
    xhttp.send("");
    
    return xhttp.responseXML;
}

function displayXmlTables() {
    xml = loadXMLDoc("fleet_management.xml");
    xsl = loadXMLDoc("fleet_management.xsl");
    
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document") {
        ex = xml.transformNode(xsl);
        document.getElementById("xmlTables").innerHTML = ex;
    }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument) {
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xsl);
        resultDocument = xsltProcessor.transformToFragment(xml, document);
        document.getElementById("xmlTables").appendChild(resultDocument);
    }
}

function initializeDriversToLocalStorage() {
    
    if (localStorage.getItem('localStorageDrivers') === null || localStorage.getItem('localStorageDrivers') === '[]') {
        // When table empties, localStorageDrivers is '[]'; here it repopulates
        var obj = parseObjFromXml();
        
        // Put the object into local storage
        localStorage.setItem('localStorageDrivers', JSON.stringify(obj.drivers.driver));
    }
    // Retrieve the object from storage
    var retrievedObject = JSON.parse(localStorage.getItem('localStorageDrivers'));

    return retrievedObject;
}

function initializeVehiclesToLocalStorage() {
    
    if (localStorage.getItem('localStorageVehicles') === null ||
        localStorage.getItem('localStorageVehicles') === '[]') {
        // When table empties, localStorageVehicles is '[]'; here it repopulates
        var obj = parseObjFromXml();

        // Put the object into local storage
        localStorage.setItem('localStorageVehicles', JSON.stringify(obj.vehicles.vehicle));
    }
    // Retrieve the object from storage
    var retrievedObject = JSON.parse(localStorage.getItem('localStorageVehicles'));

    return retrievedObject;
}

$(document).ready(function () {
    $("#homePage").show();
    $("#driversPage").hide();
    $("#addDriverPage").hide();
    $("#vehiclesPage").hide();
    $("#addVehiclePage").hide();
    $("#viewVehicleTripsPage").hide();
    $("#reportsPage").hide();
    $('.menu-list ul li').removeClass("active");
    $('.sub-menu li').removeClass("active");
    $('#homePageHeader').addClass("active");

    displayXmlTables();
    $("#xmlDrivers").hide();
    $("#xmlVehicles").hide();

    initializeDriversPage();
    initializeVehiclesPage();
    initializeReportsPage();

    $("#homePageHeader").click(function () {
        $("#homePage").show();
        $("#driversPage").hide();
        $("#addDriverPage").hide();
        $("#vehiclesPage").hide();
        $("#addVehiclePage").hide();
        $("#viewVehicleTripsPage").hide();
        $("#reportsPage").hide();
        $('.menu-list ul li').removeClass("active");
        $('.sub-menu li').removeClass("active");
        $(this).addClass("active");
        $("#xmlDrivers").hide();
        $("#xmlVehicles").hide();
    });

    $("#driversPageHeader").click(function () {
        $("#homePage").hide();
        $("#driversPage").hide();
        $("#addDriverPage").hide();
        $("#vehiclesPage").hide();
        $("#addVehiclePage").hide();
        $("#viewVehicleTripsPage").hide();
        $("#reportsPage").hide();
        $('.menu-list ul li').removeClass("active");
        $('.sub-menu li').removeClass("active");
        $(this).addClass("active");
        $("#xmlDrivers").show();
        $("#xmlVehicles").hide();
    });

    $("#addDriverHeader").click(function () {
        $("#homePage").hide();
        $("#driversPage").hide();
        $("#addDriverPage").show();
        $("#vehiclesPage").hide();
        $("#addVehiclePage").hide();
        $("#viewVehicleTripsPage").hide();
        $("#reportsPage").hide();
        $('.menu-list ul li').removeClass("active");
        $('.sub-menu li').removeClass("active");
        $(this).addClass("active");
        $("#xmlDrivers").hide();
        $("#xmlVehicles").hide();
    });

    $("#vehiclesPageHeader").click(function () {
        $("#homePage").hide();
        $("#driversPage").hide();
        $("#addDriverPage").hide();
        $("#vehiclesPage").hide();
        $("#addVehiclePage").hide();
        $("#viewVehicleTripsPage").hide();
        $("#reportsPage").hide();
        $('.menu-list ul li').removeClass("active");
        $('.sub-menu li').removeClass("active");
        $(this).addClass("active");
        $("#xmlDrivers").hide();
        $("#xmlVehicles").show();
    });

    $("#addVehicleHeader").click(function () {
        $("#homePage").hide();
        $("#driversPage").hide();
        $("#addDriverPage").hide();
        $("#vehiclesPage").hide();
        $("#addVehiclePage").show();
        $("#viewVehicleTripsPage").hide();
        $("#reportsPage").hide();
        $('.menu-list ul li').removeClass("active");
        $('.sub-menu li').removeClass("active");
        $(this).addClass("active");
        $("#xmlDrivers").hide();
        $("#xmlVehicles").hide();
    });

    $("#reportsPageHeader").click(function () {
        $("#homePage").hide();
        $("#driversPage").hide();
        $("#addDriverPage").hide();
        $("#vehiclesPage").hide();
        $("#addVehiclePage").hide();
        $("#viewVehicleTripsPage").hide();
        $("#reportsPage").show();
        $('.menu-list ul li').removeClass("active");
        $('.sub-menu li').removeClass("active");
        $(this).addClass("active");
        $("#xmlDrivers").hide();
        $("#xmlVehicles").hide();

        reportsViewVehicleDistanceTraveled();
        reportsViewDriverDistanceTraveled();
    });
});

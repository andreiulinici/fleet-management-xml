function initializeReportsPage() {
    // Vehicle distance traveled
    for (var i = 0; i < vehicles.length; i++) {
        var option = $('<option>').text(vehicles[i].details.registrationPlate);
        $('#reportsVehicleRegistrationPlate').append($('<optgroup>').attr('label', vehicles[i].details.manufacturer + ' ' + vehicles[i].details.model).append(option));
    }

    $(".reports-vehicle-registration-plate").select2({
        placeholder: 'Select an option'
    });

    $('#reportsVehicleStartDate').addClass('reports-date-time').datetimepicker();
    $('#reportsVehicleStopDate').addClass('reports-date-time').datetimepicker();
    $('#reportsVehicleStopDate').addClass('reports-date-time').datetimepicker({
        useCurrent: false
    });

    $('#reportsVehicleDistanceTraveled').text('0');

    // Driver distance traveled
    for (var i = 0; i < drivers.length; i++) {
        $('#reportsDriverName').append($('<option>').text(drivers[i].firstName + ' ' + drivers[i].lastName));
    }

    $(".reports-driver-name").select2({
        placeholder: 'Select an option'
    });

    $('#reportsDriverStartDate').addClass('reports-date-time').datetimepicker();
    $('#reportsDriverStopDate').addClass('reports-date-time').datetimepicker();
    $('#reportsDriverStopDate').addClass('reports-date-time').datetimepicker({
        useCurrent: false
    });

    $('#reportsDriverDistanceTraveled').text('0');
}

function reportsViewVehicleDistanceTraveled() {
    var startDate;
    var stopDate;

    $("#reportsVehicleStartDate").on("dp.change", function (e) {
        $('#reportsVehicleStopDate').data("DateTimePicker").minDate(e.date);

        startDate = moment(e.date._d).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        calculateVehicleDistanceTraveled(startDate, stopDate);
    });
    $("#reportsVehicleStopDate").on("dp.change", function (e) {
        $('#reportsVehicleStartDate').data("DateTimePicker").maxDate(e.date);

        stopDate = moment(e.date._d).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        calculateVehicleDistanceTraveled(startDate, stopDate);
    });

    $("#reportsVehicleRegistrationPlate").on("change", function (e) {
        calculateVehicleDistanceTraveled(startDate, stopDate);
    })
}

function reportsViewDriverDistanceTraveled() {
    var startDate;
    var stopDate;

    $("#reportsDriverStartDate").on("dp.change", function (e) {
        $('#reportsDriverStopDate').data("DateTimePicker").minDate(e.date);

        startDate = moment(e.date._d).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        calculateDriverDistanceTraveled(startDate, stopDate);
    });
    $("#reportsDriverStopDate").on("dp.change", function (e) {
        $('#reportsDriverStartDate').data("DateTimePicker").maxDate(e.date);

        stopDate = moment(e.date._d).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
        calculateDriverDistanceTraveled(startDate, stopDate);
    });

    $("#reportsDriverName").on("change", function (e) {
        calculateDriverDistanceTraveled(startDate, stopDate);
    })
}

function selectedVehicleRegistrationPlateIndex() {
    for (var i = 0; i < vehicles.length; i++) {
        if (vehicles[i].details.registrationPlate === $('#reportsVehicleRegistrationPlate').val())
            return i;
    }
}

function selectedDriverID() {
    var driverName;
    
    for (var i = 0; i < drivers.length; i++) {
        driverName = drivers[i].firstName + " " + drivers[i].lastName;
        
        if (driverName === $('#reportsDriverName').val()) {
            return drivers[i].id;
        }
    }
}

function calculateVehicleDistanceTraveled(startDate, stopDate) {
    var index = selectedVehicleRegistrationPlateIndex();
    var distanceTraveled = 0;

    for (var i = 0; i < vehicles[index].trips.trip.length; i++) {
        if (startDate <= vehicles[index].trips.trip[i].startDate && stopDate >= vehicles[index].trips.trip[i].stopDate) {
            distanceTraveled += vehicles[index].trips.trip[i].distance;
        }
    }

    $('#reportsVehicleDistanceTraveled').text(Number(distanceTraveled));
}

function calculateDriverDistanceTraveled(startDate, stopDate) {
    var distanceTraveled = 0;
    var driverID = selectedDriverID();

    for (var i = 0; i < vehicles.length; i++) {
        for (var j = 0; j < vehicles[i].trips.trip.length; j++) {
            
            if (vehicles[i].trips.trip[j].tripDriver.driverId === driverID) {                
                if (startDate <= vehicles[i].trips.trip[j].startDate && stopDate >= vehicles[i].trips.trip[j].stopDate) {
                    distanceTraveled += vehicles[i].trips.trip[j].distance;
                }
            }
        }
    }

    $('#reportsDriverDistanceTraveled').text(Number(distanceTraveled));
}

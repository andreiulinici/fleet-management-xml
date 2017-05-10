<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">

		<div id="xmlDrivers">
			<h2>Drivers</h2>
			<table class="table table-responsive" border="1" style="font-family: Verdana; background-color: #EEEEEE" id="driversTable">
				<thead>
					<tr bgcolor="#9acd32">
						<th>First name</th>
						<th>Last name</th>
						<th>ID</th>
						<th>Address</th>
						<th>Email</th>
						<th>Phone number</th>
						<th>Distance traveled</th>
						<th>Edit driver</th>
						<th>Delete driver</th>
					</tr>
				</thead>
				<tbody>
					<xsl:for-each select="fleet_management/drivers/driver">
						<tr>
							<td data-label="First name">
								<xsl:value-of select="firstName" />
							</td>
							<td data-label="Last name">
								<xsl:value-of select="lastName" />
							</td>
							<td data-label="ID">
								<xsl:value-of select="id" />
							</td>
							<td data-label="Address">
								<xsl:value-of select="address" />
							</td>
							<td data-label="Email">
								<xsl:value-of select="email" />
							</td>
							<td data-label="Phone number">
								<xsl:value-of select="phoneNumber" />
							</td>
							<td data-label="Distance traveled">
								<xsl:value-of select="distanceTraveled" />
							</td>
							<td data-label="Edit driver">
							</td>
							<td data-label="Delete driver">
							</td>
						</tr>
					</xsl:for-each>
				</tbody>
			</table>
		</div>

		<div id="xmlVehicles">
			<h2>Vehicles</h2>
			<table class="table table-responsive" border="1" style="font-family: Verdana; background-color: #EEEEEE" id="vehiclesTable">
				<thead>
					<tr bgcolor="#9acd32">
						<th>Manufacturer</th>
						<th>Model</th>
						<th>Registration plate</th>
						<th>VIN</th>
						<th>Engine capacity</th>
						<th>Fuel type</th>
						<th>Horsepower</th>
						<th>Fuel consumption</th>
						<th>Kilometrage</th>
						<th>Edit vehicle</th>
						<th>Delete vehicle</th>
					</tr>
				</thead>
				<tbody>
					<xsl:for-each select="fleet_management/vehicles/vehicle/details">
						<tr>
							<td data-label="Manufacturer">
								<xsl:value-of select="manufacturer" />
							</td>
							<td data-label="Model">
								<xsl:value-of select="model" />
							</td>
							<td data-label="Registration plate">
								<xsl:value-of select="registrationPlate" />
							</td>
							<td data-label="VIN">
								<xsl:value-of select="vin" />
							</td>
							<td  data-label="Engine capacity">
								<xsl:value-of select="engineCapacity" />
							</td>
							<td data-label="Fuel type">
								<xsl:value-of select="fuelType" />
							</td>
							<td data-label="Horsepower">
								<xsl:value-of select="horsepower" />
							</td>
							<td  data-label="Fuel consumption">
								<xsl:value-of select="fuelConsumption" />
							</td>
							<td data-label="Kilometrage">
								<xsl:value-of select="kilometrage" />
							</td>
							<td data-label="Edit vehicle">
							</td>
							<td data-label="Delete vehicle">
							</td>
						</tr>
					</xsl:for-each>
				</tbody>
			</table>
		</div>

		<div id="xmlTrips">
			<h2>Trips</h2>
			<table class="table table-responsive" border="1" style="font-family: Verdana; background-color: #EEEEEE" id="tripsTable">
				<thead>
					<tr bgcolor="#9acd32">
						<th>Driver</th>
						<th>Start date</th>
						<th>Start location</th>
						<th>Stop date</th>
						<th>Stop location</th>
						<th>Distance</th>
						<th>View trip</th>
					</tr>
				</thead>
				<tbody>
					<xsl:for-each select="fleet_management/vehicles/vehicle/trips/trip">
						
							<tr>
								<td data-label="Driver">
									<xsl:value-of select="tripDriver/driverFirstName" />&#160;<xsl:value-of select="tripDriver/driverLastName" />
								</td>
								<td data-label="Start date">
									<xsl:value-of select="startDate" />
								</td>
								<td data-label="Start location">
									<xsl:value-of select="startLocation/startLat" />,
									<xsl:value-of select="startLocation/startLong" />
								</td>
								<td data-label="Stop date">
									<xsl:value-of select="stopDate" />
								</td>
								<td data-label="Stop location">
									<xsl:value-of select="stopLocation/stopLat" />,
									<xsl:value-of select="stopLocation/stopLong" />
								</td>
								<td  data-label="Distance">
									<xsl:value-of select="distance" />
								</td> 
								<td data-label="View trip">
								</td>
							</tr>
						
					</xsl:for-each>
				</tbody>
			</table>
		</div>
	</xsl:template>
</xsl:stylesheet>

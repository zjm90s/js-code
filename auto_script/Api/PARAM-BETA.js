/** data */
var common = {
	"platformKey": "zjm_632fdbfce4b0d253f63e2ea0",
	"customerKey": "54acc7f245ce698844badabf",
	"method": "api",
	"timestamp": "2015-01",
	"checkinDate": new Date().addDays(1).format("yyyy-MM-dd"),
	"checkoutDate": new Date().addDays(3).format("yyyy-MM-dd")
};

var md5CodeVal = {
	"customerKey": common.platformKey,
	"method": common.method,
	"timestamp": common.timestamp
};

var staticDataVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"cityCodes": "CN021"
};

var hotelSearchVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"cityCode": "CN021",
	"checkinDate": common.checkinDate,
	"checkoutDate": common.checkoutDate,
	"roomNumber": 1,
	"offset": 1,
	"limit": 2
};

var hotelDetailVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"hotelId": "54d9963145ce13f56d38d6b6",
	"checkinDate": common.checkinDate,
	"checkoutDate": common.checkoutDate,
	"roomNumber": 1
};

var productCheckVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"hotelId": "54d9963145ce13f56d38d6b6",
	"roomCatId": "54d9972945ce13f56d38d6c4",
	"bookingClassId": "54d9975145ce13f56d38d6c7",
	"totalPrice": "602",
	"checkinDate": common.checkinDate,
	"checkoutDate": common.checkoutDate,
	"roomNumber": 1
};

var hotHotelVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": ""
};

var orderListVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"startDate": "2015-01-01",
	"endDate": "2015-01-15",
	"offset": 1,
	"limit": 5
};

var orderDetailVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"orderId": "150107151948674"
};

var createOrderVal = {
	"platformKey": common.platformKey,
	"customerKey": common.customerKey,
	"method": common.method,
	"timestamp": common.timestamp,
	"signature": "",
	"distributorOrderId": "1111",
	"hotelId": "549d1aea45ce96dfbfe6bc17",
	"roomCatId": "549d1b6945ce96dfbfe6bc21",
	"bookingClassId": "549d1b8445ce96dfbfe6bc24",
	"totalPrice": "515",
	"checkinDate": common.checkinDate,
	"checkoutDate": common.checkoutDate,
	"roomNumber": 1,
	"guestName": "zzz",
	"contractName": "zjm",
	"contractMobilePhone": "18200000000",
	"contractTelephone": "654321",
	"contractEmail": "zjm@tz.com"
};


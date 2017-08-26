app.controller('RealEstateController', ['EstateService', function (EstateService) {
    console.log('RealEstateController loaded');
    var self = this;

    EstateService.getEstateData();
    console.log('EstateService listings: ', EstateService.listings);
    self.listings = EstateService.listings;
    self.rentals = EstateService.rentals;

    
}]);
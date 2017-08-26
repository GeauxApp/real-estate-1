app.controller('RealEstateController', ['EstateService', function (EstateService) {
    //console.log('RealEstateController loaded');
    var self = this;
    self.editListingVisible = EstateService.editListingVisible;

    EstateService.getEstateData();
    //console.log('EstateService listings: ', EstateService.listings);
    self.listings = EstateService.listings;
    self.rentals = EstateService.rentals;

    self.editListing = function(listing){
        EstateService.editListing(listing);
    };
    
    self.updateListing = function(listing){
        EstateService.updateListing(listing);
    };
    
}]);
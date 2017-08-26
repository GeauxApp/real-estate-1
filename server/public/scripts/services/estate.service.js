app.service('EstateService', ['$http', function ($http) {
    console.log('Estate service loaded.');
    var self = this;
    self.listings = { list: [] };
    self.rentals = { list: [] };
    self.newListing = {};
    self.newRental = {};
    ////https://stackoverflow.com/questions/35517899/update-table-row-data-in-angular

    self.getEstateData = function () {
        $http({
            method: 'GET',
            url: '/realEstate'
        }).then(function (response) {
            console.log('response from get: ', response);
            
            self.listings.list = response.data.listings;
            self.rentals.list = response.data.rentals;
            console.log('rentals ', self.rentals);
        });
    }

    self.addListing = function () {
        console.log('addListing called client.js, newListing: ');
        console.log(self.newListing);
        
        $http.post('/realEstate/listing', self.newListing).then(function (response) {
            console.log(' post response: ', response);
            self.getEstateData();
        });
    };

    self.addRental = function () {
        //console.log('addListing called client.js');
        $http.post('/realEstate/rental', self.newRental).then(function (response) {
            console.log(' post response: ', response);
            self.getEstateData();
        });
    };

}]);
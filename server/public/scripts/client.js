//https://stackoverflow.com/questions/35517899/update-table-row-data-in-angular


var app = angular.module('RealEstateApp', []);

app.controller('RealEstateController', ['$http', function ($http) {
    var self = this;
    self.listings;
    self.rentals;

    self.getEstateData = function () {
        $http({
            method: 'GET',
            url: '/realEstate'
        }).then(function (response) {
            console.log('response from get: ', response);
            
            self.listings = response.data.listings;
            self.rentals = response.data.rentals;
            console.log('rentals ', self.rentals);
        });
    }

    self.getEstateData();
}]);
app.service('EstateService', ['$http', function ($http) {
    //console.log('Estate service loaded.');
    var self = this;
    self.listings = { list: [] };
    self.rentals = { list: [] };
    self.newListing = {};
    self.newRental = {};
    self.editListingVisible = {};
    self.editRentalVisible = {};

    ////https://stackoverflow.com/questions/35517899/update-table-row-data-in-angular

    self.getEstateData = function () {
        $http({
            method: 'GET',
            url: '/realEstate'
        }).then(function (response) {
            console.log('response from get: ', response);

            self.listings.list = response.data.listings;
            self.rentals.list = response.data.rentals;
            //console.log('rentals ', self.rentals);
            //make mirror table to store id:true/false where true = visible.  
            //This is used to show / hide the input boxes when edit button is clicked for listings and rentals
            for (var i = 0; i < self.listings.length; i++) {
                self.editListingVisible[self.listings[i].id] = false;
            }
        });
    }

    self.addListing = function () {
        // console.log('addListing called client.js, newListing: ');
        // console.log(self.newListing);

        $http.post('/realEstate/listing', self.newListing).then(function (response) {
            //console.log(' post response: ', response);
            self.getEstateData();
        });
    };

    self.addRental = function () {
        //console.log('addListing called client.js');
        $http.post('/realEstate/rental', self.newRental).then(function (response) {
            //console.log(' post response: ', response);
            self.getEstateData();
        });
    };



    //modified from https://stackoverflow.com/questions/26459525/how-to-modify-and-update-data-table-row-in-angular-js
    self.editListing = function (listing) {
        self.editListingVisible[listing._id] = true;
        console.log('editListingVisible: ', self.editListingVisible);
    };


    self.updateListing = function (listing) {
        self.editListingVisible[listing._id] = false;
        $http.put('/realEstate/listing/' + listing._id, listing).then(function (response) {
            console.log('service update response:', response);
            self.getEstateData();
        });
    };

    self.editRental = function (rental) {
        self.editRentalVisible[rental._id] = true;
    };

    self.updateRental = function (rental) {
        self.editRentalVisible[rental._id] = false;
        $http.put('/realEstate/rental/' + rental._id, rental).then(function (response) {
            self.getEstateData();
        });
    };

    self.deleteListing = function (listing) {
        console.log('service to delete id: ', listing._id);
        $http.delete('/realEstate/listing/' + listing._id).then(function (response) {
            console.log('service delete response:', response);
            self.getEstateData();
        });
    }

    self.deleteRental = function (rental) {
        console.log('service to delete id: ', rental._id);
        $http.delete('/realEstate/rental/' + rental._id).then(function (response) {
            console.log('service delete response:', response);
            self.getEstateData();
        });
    }

}]);
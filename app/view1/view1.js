'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope','$odataresource', function($scope, $odataresource) {

    function getData(){
            $odataresource("http://services.odata.org/V4/Northwind/Northwind.svc/Customers")
                .odata()
                .expand('Orders')
                .query(function(data) {
                    //console.log('success');
                    //console.log(data);

                    $scope.gridOptions = {
                        dataSource:
                        {
                            store: {
                                type: "array",
                                data: data
                                //$scope.results
                            }
                        }
                        ,
                        columns: [{
                            dataField: "CustomerID",
                            caption: "Customer ID"
                        },
                             {
                                dataField: "CompanyName",
                                 caption: "Company Name"
                            },
                            {
                                dataField: "ContactName",
                                caption: "Contact Name"
                            }
                        ],
                        masterDetail: {
                            enabled: true,
                            template: "detail"
                        }
                    };

                    angular.forEach(data, function(value, key) {
                        //console.log(value['Category'].CategoryName);
                    });
                }, function(err) {
                    console.log('There was an error: ', err);
                });
    }

        getData();
}]);
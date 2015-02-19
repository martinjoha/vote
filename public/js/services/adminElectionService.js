angular.module('voteApp').service('adminElectionService', ['$http', '$routeParams',
function($http, $routeParams) {

    this.createElection = function(election) {
        return $http.post('/api/election/', election);
    };

    this.addAlternative = function(alternative) {
        return $http.post('/api/election/' + $routeParams.param + '/alternatives', alternative);
    };

    this.activateElection = function() {
        return $http.post('/api/election/' + $routeParams.param + '/activate');
    };

    this.deactivateElection = function() {
        return $http.post('/api/election/' + $routeParams.param + '/deactivate');
    };

    this.countVotes = function() {
        return $http.get('/api/election/' + $routeParams.param + '/votes');
    };

}]);
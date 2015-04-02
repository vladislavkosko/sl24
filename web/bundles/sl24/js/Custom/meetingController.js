Sl24.controller('MeetingController', ['$scope', '$http',
    function($scope, $http) {
        $scope.meeting = null;
        $scope.meetings = null;
        $scope.meetingsInfo = null;
        $scope.meetingForAdd = {
            'date': new Date(),
            'credentials': null,
            'assistant': null,
            'status': null,
            'employmentType': null
        };

        $scope.urlGetMeetings = URLS.getMeetings;
        $scope.urlGetMeeting = URLS.getMeeting;
        $scope.urlGetMeetingsInfo = URLS.getMeetingsInfo;
        $scope.urlAddNewMeeting = URLS.addNewMeeting;

        $scope.templateMeetingsAddNew = TEMPLATES.meetingsAddNew;

        $scope.getMeetings = function (user_id) {
            var meetingsUrl = $scope.urlGetMeetings.replace('user_id', user_id);
            $http.get(meetingsUrl)
                .success(function (response) {
                    $scope.meetings = response;
                }
            );
        };

        $scope.getMeeting = function (meeting_id) {
            var meetingUrl = $scope.urlGetMeeting.replace('meeting_id', meeting_id);
            $http.get(meetingUrl)
                .success(function (response) {
                    $scope.meeting = response;
                }
            );
        };
        
        $scope.getMeetingsInfo = function () {
            $http.get($scope.urlGetMeetingsInfo)
                .success(function (response) {
                    $scope.meetingsInfo = response;

                    if ($scope.meetingsInfo.statuses.length > 0) {
                        $scope.meetingForAdd.status = $scope.meetingsInfo.statuses[0].id;
                    }
                    if ($scope.meetingsInfo.assistants.length > 0) {
                        $scope.meetingForAdd.assistants = $scope.meetingsInfo.assistants[0].id;
                    }
                    if ($scope.meetingsInfo.employmentTypes.length > 0) {
                        $scope.meetingForAdd.employmentType = $scope.meetingsInfo.employmentTypes[0].id;
                    }
                }
            );
        };

        $scope.addNewMeeting = function (meeting) {
            $('#add_new_meeting').modal('hide');
            $http.post($scope.urlAddNewMeeting, { 'meeting': meeting })
                .success(function (response) {
                    if (response == 'success') {
                        $scope.getMeetings($scope.userID);
                    }
                }
            );
        };
    }
]);
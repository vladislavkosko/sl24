Sl24.controller('ArticleController', ['$scope', '$http', '$sce',
    function ($scope, $http, $sce) {
        $scope.urlGetArticle = URLS.urlGetArticle;
        $scope.urlAddArticle = URLS.urlAddArticle;
        $scope.Articles = [];
        $scope.user = [];
        $scope.img = null;
        $scope.asset = URLS.asset;

        $scope.GetArticle = function () {
            $http.get($scope.urlGetArticle)
                .success(function (response) {
                    $scope.user =  response.user;
                    $scope.Articles = response.articles;
                        for(var i=0; i< $scope.Articles.length; i++ )
                        {
                            $scope.Articles[i].articleText = $sce.trustAsHtml($scope.Articles[i].articleText);
                        }

                });
        };

        console.log('ArticleController was loaded!!!')

    }]);
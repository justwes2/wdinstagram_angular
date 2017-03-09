"use strict";
// let dummyData = [
//   {photo_url: "http://4.bp.blogspot.com/-qk2ugPSCipQ/Uw9aZae5kgI/AAAAAAAASbg/vLIkhdTyyEs/s1600/soleil+eruption+11+fevrier+2014.2.jpg", author: "Astronaut", body: "Solar flare across specturm"},
//   {photo_url: "http://icon2.filejo.com/w/13921395_0048.jpg", author: "Jane Goodall", body: "Red panda"},
//   {photo_url: "http://img.dlyakota.ru/uploads/posts/2015-03/dlyakota.ru_fotopodborki_sibirskie-haski-gulyayut-po-ozeru_2.jpeg", author: "Jane Goodall", body: "Husky walking on water"},
//   {photo_url: "https://s-media-cache-ak0.pinimg.com/236x/2b/98/5a/2b985ace415dae4db9c44ca5bcda14e3.jpg", author: "Red", body: "Build a pokeball"}
// ]
// (function(){
  angular
  .module("Gram", [
    "ui.router",
    "ngResource"
  ])
  .config([
    "$stateProvider",
    Router
  ])
  .factory( "GramFactory", [
    "$resource",
    GramFactoryFunction
  ])
  .controller("GramIndexController", [
    "GramFactory",
    GramIndexControllerFunction
  ])
  .controller("GramNewController", [
    "GramFactory",
    "$state",
    GramNewControllerFunction
  ])
  .controller("GramShowController", [
    "GramFactory",
    "$stateParams",
    GramShowControllerFunction
  ])
  .controller("GramEditController", [
    "GramFactory",
    "$stateParams",
    "$state",
    GramEditControllerFunction
  ])

function Router($stateProvider){
  $stateProvider
  .state("gramIndex", {
    url: "/grams",
    templateUrl: "js/ng-views/index.html",
    controller: "GramIndexController",
    controllerAs: "vm"
  })
  .state("gramNew", {
    url: "/grams/new",
    templateUrl: "js/ng-views/new.html",
    controller: "GramNewController",
    controllerAs: "vm"
  })
  .state("gramShow", {
    url: "/grams/:id",
    controller: "GramShowController",
    controllerAs: "vm",
    templateUrl: "js/ng-views/show.html"
  })
  .state("gramEdit", {
    url: "/grams/:id/edit",
    templateUrl: "js/ng-views/edit.html",
    controller: "GramEditController",
    controllerAs: "vm"
  })
}
function GramFactoryFunction($resource){
  return $resource("http://localhost:3000/entries/:id", {}, {
    update: { method: "PUT" }
  });
}

function GramIndexControllerFunction(GramFactory){
  this.grams = GramFactory.query();

  // {
    // let gram ={
    // photo_url: this.newGramPhotoUrl,
    // author: this.newGramAuthor,
    // body: this.newGramBody};
    // this.grams.push(gram)
  // }
}

function GramNewControllerFunction(GramFactory, $state) {
  this.gram = new GramFactory()
  this.create = function() {
    this.gram.$save(function(gram) {
      $state.go("gramShow", {id: gram.id})
    })
  }
}

function GramShowControllerFunction(GramFactory, $stateParams) {
  this.gram = GramFactory.get({id: $stateParams.id});
  // console.log(this.gram)
}

function GramEditControllerFunction(GramFactory, $stateParams, $state) {
  this.gram = GramFactory.get({id: $stateParams.id})
  console.log(this.gram)
  this.update = function() {
    this.gram.$update({id: $stateParams.id}, function(gram) {
      $state.go("gramShow", {id: gram.id})
    })
  }
}





















// })();

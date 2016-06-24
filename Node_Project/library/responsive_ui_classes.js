
var app = angular.module('myapp', []);

app.controller('MainCtrl', function($scope) {
 	
});



//////////////////////////////// Tab directive ///////////////////////////
app.directive('tab',function(){
  return {
      
      restrict: 'E',
      transclude:true,
      template: "<div role='tabpanel' ng-transclude ></div>",
      require: '^tabset',
      scope:{heading: '@',ahref: '@'},
      link:function(scope,elemt,attr,tabCtrl){
      	scope.active = false
      	tabCtrl.addTab(scope)
      	tabCtrl.addchild(attr.id);
        /////////////////////////////////////
        scope.clickedMe= function () {
            alert(attr.id);
        }
      }
  }
});

app.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
	    var self = this;
	    self.tabs = [];
	    
	    self.JSONObj = {};
	    self.JSONObj.child_ids = [];

    self.addTab = function addTab(tab) {
		  self.tabs.push(tab)
		  if(self.tabs.length === 1) {
		    tab.active = true
		  }
		}
		self.addchild = function addchild(child) {
		  self.JSONObj.child_ids.push(child);	  
		}
    },
    link:function(scope,elm,attr,tabserCtrl){
    	tabserCtrl.JSONObj.parent_ID=attr.id;
      alert(JSON.stringify(tabserCtrl.JSONObj));
      ui_data_Submission(tabserCtrl.JSONObj);
      
    }
  }
})

/////////////////////////////////   menu  directive  //////////////////////////////////////////////////////////////////

app.directive('menuitem',function(){
  return{
      restrict: 'E',
      transclude: true,    
      scope:{heading: '@' , ahref: '@'},
      template:"<a href='{{ahref}}' class='list-group-item' ng-click='clickedMe()'> {{heading}} </a>",
      require: '^menu',
      link:function(scope,elm,attr,menuitemCtrl){    
        scope.clickedMe= function () {
            alert(attr.id);
        }
        menuitemCtrl.addchild(attr.id);
      }
  }; 
});

app.directive('menu', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope:{heading: '@' },
      template : "<ul  class='list-group' ng-transclude ></ul>",
      bindToController: true,
      controllerAs: 'menu', 

      controller:function(){
        var self = this;
        
        self.JSONObj = {};
        self.JSONObj.child_ids = [];

        self.addchild = function addchild(child) {
          self.JSONObj.child_ids.push(child); 
        }
      },

      link:function(scope,elm,attr,MenuCtrl){
        MenuCtrl.JSONObj.parent_ID=attr.id;
        //alert(JSON.stringify(MenuCtrl.JSONObj));
        ui_data_Submission(MenuCtrl.JSONObj);
      }
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////

function ui_data_Submission(data){
    $.ajax({
        type: "GET",
        url:"/ui_submission",
        data:data,
        /*
        success: function(response) {
          alert("success");      
                                  
        },
                  
        error: function(textstatus, errorThrown) {
          alert('text status ' + textstatus + ', err ' + errorThrown);
        }
        */
    });

    return false;

}









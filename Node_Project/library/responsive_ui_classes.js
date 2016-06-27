var variable1=['tea','cok'];


var app = angular.module('myapp', []);

// app.controller('MainCtrl', function($scope) {
//  	$scope.nam='fucker';

// });
app.controller('MainCtrl', ['$scope', '$window', function($scope, $window) {
  $scope.variable1 = $window.variable1;
  alert(variable1[0]);
}]);

app.value('user',{fname:'opp',lname:'ppp'});


//////////////////////////////// Tab directive ///////////////////////////
app.directive('tab',function(){
  return {
      
      restrict: 'E',
      transclude:true,
      template: "<div role='tabpanel' ng-transclude ></div>",
      require: '^tabset',
      scope:{heading: '@',ahref: '@',id:'@'},

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
      //alert(JSON.stringify(tabserCtrl.JSONObj));
      ui_data_Submission(tabserCtrl.JSONObj);
      
      //alert(JSON.stringify(tabserCtrl.tabs[0].scope));
      var tab_ids=['tab2','tab1','tab4','tab3','tab5'];
      
      if(tab_ids.length!=0){
        var temp=change_element_precedence(tab_ids,tabserCtrl.tabs);
        tabserCtrl.tabs=[];
        tabserCtrl.tabs=temp.concat();
      }
      alert(variable1[1]);

      /*
      var el=tab_ids.indexOf('tab12');

      alert(tabserCtrl.tabs[0].id);
      var t1=tabserCtrl.tabs[0]
      var t2=tabserCtrl.tabs[1];
      tabserCtrl.tabs[0]=t2;
      tabserCtrl.tabs[1]=t1;
      alert(tabserCtrl.tabs[0].id);
      */

      // var svg = angular.element('<div><p>heelllll</p></div>');
      // elm.append(svg);
      
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


function change_element_precedence(changed_id_list,standered_id_list){
  if(changed_id_list.length!=0){
    
    for(i=0;i<changed_id_list.length;i++){
      var inde=changed_id_list.indexOf(standered_id_list[i].id);
      changed_id_list[inde]=standered_id_list[i];

      
    }

    return changed_id_list;
    
    //alert(dynamic_list.length);
  }
  
}





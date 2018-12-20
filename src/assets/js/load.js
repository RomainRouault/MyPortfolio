$(document).ready(function(){  

	$('header').focus();

	//more projects 
    $('#more-projects-button').click(function(event){

	    $.ajax({url: 'includes/more-projects.html',
	        method: 'GET',
	        dataType: 'html',
	        success: function(content) {
	            $(".cards-wrapper").append(content);
	        }
	    });
	 //hide button
	$('#more-projects').hide();
	//modify some css because of the higher height of the section after loading more content 
	$('#portfolio').addClass('more-content'); 

    event.preventDefault();
	});

	//modal in full width (project)
	$('#portfolio').on('click', '.project-details', function(){
		var $modal = $('#project-details'),

		//get name of the file to load from id of the element
		$contentIdName = this.id,
		$splitContentName = $contentIdName.split("-"),
		$contentName = $splitContentName[0];

		$.ajax({url : 'project/'+$contentName+'.html',
			method: 'GET',
	        dataType: 'html',
	        success : function(resp) {
			    $modal.html(resp);
			},
			complete : function() { 
				$modal.trigger('resizeme.zf.reveal');
				setTimeout(function() {
					$('.orbit').css("visibility", "visible");
				}, 500);
			}
		});


		  

	});

	//modal in full width (mentions_legales)
	$('.mentions-link').click(function(event){
		var $modal = $('#project-details'),
		//get name of the file to load from id of the element
		$contentIdName = this.id,
		$splitContentName = $contentIdName.split("-"),
		$contentName = $splitContentName[0];

		$.ajax($contentName+'.html')
		  .done(function(resp){
		    $modal.html(resp).foundation('open');
		});

		event.preventDefault();
	});

});


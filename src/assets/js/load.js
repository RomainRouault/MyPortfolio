$(document).ready(function(){  

	//more projects 
    $('#more-projects-button').click(function(event){

	    $.ajax({url: 'includes/more-projects.html',
	        method: 'GET',
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
	$('.project-details').click(function(event){
		var $modal = $('#project-details'),
		//get name of the file to load from id of the element
		$contentIdName = this.id,
		$splitContentName = $contentIdName.split("-"),
		$contentName = $splitContentName[0];

		$.ajax('project/'+$contentName+'.html')
		  .done(function(resp){
		    $modal.html(resp).foundation('open');
		});

		event.preventDefault();
	});

});


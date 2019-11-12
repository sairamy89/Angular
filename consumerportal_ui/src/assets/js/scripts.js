$(document).ready(function() {
    	$('select').formSelect();
});

$(document).ready(function(){
  $('.tabs').tabs({
  swipeable:true,
  duration:100,
  });
});

/* Same height for My Connections Box*/
$(document).ready(function() {
    equalheight = function(container){
      var currentTallest = 0,
             currentRowStart = 0,
             rowDivs = new Array(),
             $el,
             topPosition = 0;
          $(container).each(function() {
        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;
              if (currentRowStart != topPostion) {
              for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
              rowDivs[currentDiv].height(currentTallest);
            }
          rowDivs.length = 0; // empty the array
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
              for(currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
               rowDivs[currentDiv].height(currentTallest);
             }
         });
    }
    $(window).load(function() {
      equalheight('.my_connections_box_otr .my_connections_box_img');
      equalheight('.my_connections_box_otr .my_connections_box_text');
    });
    $(window).resize(function(){
      equalheight('.my_connections_box_otr .my_connections_box_img');
      equalheight('.my_connections_box_otr .my_connections_box_text');
    });
});

$(document).ready(function() {
    $(window).on('resize load', function(event) {
        var $same_height = $('.my_connections_box_img').height();
        $('.my_connections_box_img').css('line-height', $same_height + 'px');
    });
});

/* Pay Bill Page Bar */
$('.progress-fill span').each(function(){
  var percent = $(this).html();
  var pTop = 100 - ( percent.slice(0, percent.length - 1) ) + "%";
  $(this).parent().css({
    'height' : percent,
    'top' : pTop
  });
});

/*var bar_ctx = document.getElementById('bar-chart').getContext('2d');

	var purple_orange_gradient = bar_ctx.createLinearGradient(0, 0, 0, 300);
	purple_orange_gradient.addColorStop(0, '#75FF83');
	purple_orange_gradient.addColorStop(1, '#2CAC39');

	var bar_chart = new Chart(bar_ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb" , "Mar", "Apr", "May", "Jun"],
	        datasets: [{
		            label: '# of Votes',
		            data: [12, 10, 25, 20, 15, 23, 17, 35, 30, 22],
					backgroundColor: purple_orange_gradient,
					hoverBackgroundColor: purple_orange_gradient,
		        }]
		    },
		    options: {
		    	legend: {
	            	display: false,
	        	},
				tooltips: {
					callbacks: {
						label: function(tooltipItem) {
							return "$" + Number(tooltipItem.yLabel) + " and so worth it !";
						}
					}
				},
		        scales: {
					xAxes: [{
		           		barPercentage: 0.5,
			            barThickness: 6,
			            maxBarThickness: 8,
			            minBarLength: 2,
			            gridLines:{
				          display: false
				        },
		                ticks: {
		                    fontColor: "rgba(255,255,255,0.5)",
		                    fontSize:22,
		                    stepSize:0,
		                    beginAtZero: true
		                }
		       		}],
		            yAxes:[{
		           		ticks: {
		           			fontSize:0,
		                    beginAtZero: true
		                },
		                stacked: true,
				        gridLines: {
				          display: false
				        },
		       		}],
		        }
		    }
});*/

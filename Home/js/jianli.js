$(function(){
			$(".work-wrap2, .skills").css({
				display: "table"
			});
			$(".introduce").css({
				display: "block"
			});
			$('#fullpage').fullpage({
				continuousVertical: true,
				anchors:['page1','page2','page3','page4','page5'],
				navigation: true,
				navigationPosition: 'left',
				navigationTooltips:['index','works','skills','introduce'],
				navigationColor:'red',
				afterRender:function(){
					$('.item').each(function(idx,ele){
						$(ele).on('click',function() {
							if($(ele).data('animated')){
								return ;
							}
							$(ele).data('animated',true);
							if(!$(ele).attr('showed')){
								$(ele).find('.detail-wrap').show().animate({width:350},700,function(){
										$('.detail-wrap a').on('click',function(e){
												e.stopPropagation();	
										});
								});
								$(ele).attr('showed',true);
								$(ele).siblings().removeAttr('showed');
								$(ele).siblings().find('.detail-wrap').animate({width:0},700,function(){
										$(this).hide();
										$(ele).data('animated',false);
									});								
							}else{
								$(ele).find('.detail-wrap').animate({width:0},700,function(){
										$(this).hide();
										$(ele).removeAttr('showed');
										$(ele).data('animated',false);
									});
							}
						});
					});
					
					$('.skills .skilltip').on('click',function(){
						var $this = $(this),
							idx = $this.index();
							// console.log($this.parents('li'))
						$this.parents('li').siblings().find('.skilltip').removeClass('active');
						$this.addClass('active');
						$this.parents('li').siblings().find('.content.active').fadeOut(1000,function(){
							   //console.log(1);
								$(this).removeClass('active');
								$this.parents('li').find('.content').addClass('active').fadeIn(1000);
							});
					});

					// autoPlay();

					// function autoPlay(){
					// 	var curInd = 0;
					// 	// console.log($('.skills').find('li').eq(0));
					// 	var $posit = $('.skills .skilltip');
					// 	var leng = $posit.parents('li').length;
					// 	setInterval(function(){
					// 		curInd = (curInd + 1)%leng;//获取活动的位置
					// 		// console.log($posit.parents('li').eq(curInd));
					// 		// $posit.parents('li').find('.skilltip').removeClass('active');
							
					// 		$posit.parents('li').find('.active').fadeOut(1000,function(){
					// 			   //console.log(1);
					// 				$(this).fadeIn().removeClass('active');
					// 				$posit.parents('li').eq(curInd).find('.content ,.skilltip').addClass('active').fadeIn(1000);
					// 				// $posit.parents('li').eq(curInd).find('.skilltip').addClass('active').fadeIn(1000);//当前活动位置效果
					// 			});

					// 	},1500)
					// }
				}
			});

		});
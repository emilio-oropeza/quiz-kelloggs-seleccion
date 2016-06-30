(function($){
	$.fn.quizk = function(){
		return this.each(function() {
			var element = $(this);						
			if (element.data('quizk')) return;
			var myplugin = new Quizk(this);
			element.data('quizk', myplugin);
			element.data('quizk').methods.init();			
		});
	};
	
	var Quizk = function(target){
		var componentObj = {
			active: false,
			height: 0,
			res: [0,0,0,0],
			jugadores: ["México","Chile","Brasil","Argentina"],
			methods:{
				init:function(){					
					$("#portada-btn").click(function(){
						$("#portada").animate({
							"margin-top": (-1*componentObj.height)
						}, 1000);
						componentObj.methods.resize();
					});
					componentObj.methods.displayPreguntas();
					$(window).resize(componentObj.methods.resize);
				},
				displayPreguntas: function(){
					for (var i = 0; i < preguntas.length; i++) {
						componentObj.methods.renderPreguntas(i, preguntas[i]);
					}
					componentObj.methods.resize();
				},
				getRes: function(){
					$("#preguntas").animate({
						"margin-top": (-1*componentObj.height)
					}, 1000);
					var mayor = 0;
					var valor = -1;
					for (var i = 0; i < componentObj.res.length; i++) {
						if(valor < componentObj.res[i]){
							valor = componentObj.res[i];
							mayor = i;
						}
					}
					$(".res-nombre").attr("src", urlIndepth+"images/Resultados/Nombres/"+mayor+".png");
					$(".res-desc").text(resultados[mayor]);
					$(".res-img").attr("src", urlIndepth+"images/Resultados/Monitos/"+mayor+".png");

					var text = 'Me salio '+componentObj.jugadores[mayor]+' descubre que selección eres tú';
					var urlFacebook = 'https://www.facebook.com/sharer.php?s=100&p[url]=http://juanfutbol.com/indepth/que-seleccion-eres';
					var ulrTwitter = 'https://twitter.com/share?via=juanfutbol&text='+text+'&hashtags=KelloggsSueñaFútbol,PringlesViveFútbol,JFKelloggs&url=http://juanfutbol.com/indepth/que-seleccion-eres';
					var share = "javascript:sharePopUp('fb', '')";
					$("#twitter").attr("href", "javascript:sharePopUp('tw', '"+encodeURIComponent(ulrTwitter)+"')");
					$("#face").attr("href", "javascript:sharePopUp('fb', '"+encodeURIComponent(urlFacebook)+"')");
				},
				next: function(i, val){					var pos = i + 1;
					componentObj.res[val]++;
					if(pos < preguntas.length){
						$("#preguntas-scroll").animate({
							"top": (-1*(componentObj.height*pos))
						}, 1000);
					}else{
						componentObj.methods.getRes();						
					}					
				},
				renderPreguntas: function(i, preguntaObj){
					var preguntasCont = $('<div class="preguntas-container container"></div>').appendTo($("#preguntas-scroll"));
					var pregunta = $('<div class="pregunta abs-center"></div>').appendTo($(preguntasCont));
					var img = $('<img class="img-responsive img-center" src="'+urlIndepth+'images/Preguntas/pregunta'+(i+1)+'.png">').appendTo($(pregunta));
					var preguntaCont = $('<div class="pregunta-cont"></div>').appendTo($(pregunta));
					$('<div class="row"><div class="col-xs-12">'+preguntaObj.pregunta+'</div></div>').appendTo($(preguntaCont));
					var resRow1 = $('<div class="row"></div>').appendTo($(preguntaCont));
					var resTxt = '<div class="col-sm-6"><div class="media">';
					resTxt += '<div class="media-left media-middle"><span></span>';
					resTxt += '</div><div class="media-body media-middle"></div></div></div>';
					var resi = $(resTxt).appendTo(resRow1);
					$(resi).find('.media-body').text(preguntaObj.respuestas[0].texto);
					$(resi).find('.media-left > span').text('A');
					$(resi).attr("data-val",preguntaObj.respuestas[0].valor);
					resi = $(resTxt).appendTo(resRow1);
					$(resi).find('.media-body').text(preguntaObj.respuestas[1].texto);
					$(resi).find('.media-left > span').text('B');
					$(resi).attr("data-val",preguntaObj.respuestas[1].valor);
					var resRow2 = $('<div class="row"></div>').appendTo(preguntaCont);
					var resi = $(resTxt).appendTo(resRow2);
					$(resi).find('.media-body').text(preguntaObj.respuestas[2].texto);
					$(resi).find('.media-left > span').text('C');
					$(resi).attr("data-val",preguntaObj.respuestas[2].valor);
					resi = $(resTxt).appendTo(resRow2);
					$(resi).find('.media-body').text(preguntaObj.respuestas[3].texto);
					$(resi).find('.media-left > span').text('D');
					$(resi).attr("data-val",preguntaObj.respuestas[3].valor);
					$(preguntaCont).find(".col-sm-6").click(function(){
						componentObj.methods.next(i, $(this).data("val"));
					});
				},
				resize: function(){
					componentObj.height = ($(window).height()-60);
					$("#preguntas").height(componentObj.height);
					$("#preguntas-scroll").height(componentObj.height*4);
					$(".preguntas-container").height(componentObj.height);
					$(".pregunta").each(function(i, val){
						var height = $(this).find(".pregunta-cont").height();
						if($(window).width() > 768){
							height += $(this).find("img").height() + 60;
						}
						$(this).height(height);
					});
					if( $("#portada").css("margin-top") != "0px" ){
						$("#portada").css({"margin-top": (-1*componentObj.height)});
					}
					if( $("#preguntas").css("margin-top") != "0px" ){
						$("#preguntas").css({"margin-top": (-1*componentObj.height)});
					}
				}
			}
		};
		return componentObj;
	};	
})(jQuery);

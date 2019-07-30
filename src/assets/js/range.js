	var apprange = function () {
			function initAndSetupTheSliders(rangeValue, disabled = false,limitValue, screenName = 'home') {
				var inputs = [].slice.call(document.querySelectorAll('.range-slider input'));
				inputs.forEach(function (input) {return input.setAttribute('value', rangeValue);});
				inputs.forEach(function (input) {return apprange.updateSlider(input,limitValue, disabled, screenName);});
				// Cross-browser support where value changes instantly as you drag the handle, therefore two event types.
				if(!disabled){
					inputs.forEach(function (input) {return input.addEventListener('input', function (element) {return apprange.updateSlider(input,limitValue, disabled, screenName);});});
					inputs.forEach(function (input) {return input.addEventListener('change', function (element) {return apprange.updateSlider(input,limitValue, disabled, screenName);});});
				}
				
			}
			function updateSlider(element, limitValue, disabled,screenName) {
				
			  if (element) {
				  
					var parent = element.parentElement,
					lastValue = parent.getAttribute('data-slider-value');

					if (lastValue === element.value) {
						return; // No value change, no need to update then
					}
					var bubbleMe = parent.querySelector('#me');
					parent.setAttribute('data-slider-value', element.value);
					var $thumb = parent.querySelector('.range-slider__thumb'),
					$bar = parent.querySelector('.range-slider__bar'),
					$thumbLine = parent.querySelector('.range-slider__line'),
					$lineRight = parent.querySelector('.line-right'),
					$lineTop = parent.querySelector('.line-top'),
					pct = element.value * ((parent.clientHeight - $thumb.clientHeight) / parent.clientHeight);
					pctLimitLine = limitValue * ((parent.clientHeight - $thumb.clientHeight) / parent.clientHeight);
					$thumb.style.bottom = pct + '%';
					
					if (typeof($lineRight) != 'undefined' && $lineRight != null)
					{
						$lineRight.style.bottom = 2 + pct + '%';
						$lineTop.style.bottom = 2 + pct + '%';	
						$lineTop.style.height = (pctLimitLine - pct) + 7.05 + '%';
					}
					if (typeof(bubbleMe) != 'undefined' && bubbleMe != null)
					{
						bubbleMe.style.top = (100-pct-7) + '%';
						bubbleMe.style.left = '80%';
					}
					$thumbLine.style.bottom = pctLimitLine + 7 + '%';
					
					$thumb.textContent = element.value + '';
					if(screenName == 'home'){
						document.getElementById('range').value = element.value;
						$bar.style.height = '100%';
					}else if(screenName == 'screen2b' || screenName == 'screen2'){
						$bar.style.height = pctLimitLine + 6.25 + '%';
						if(element.value > 0 && element.value <= 97 && screen.height >= 900){
                            $thumb.style.marginBottom = "50%";
						}else if(element.value > 0 && element.value <= 97 && screen.height < 900){
							$thumb.style.marginBottom = "15%";}
						else{
							$thumb.style.marginBottom = "0%";
						}
						
					}else{
						$bar.style.height = pctLimitLine + 7.15 + '%';
					}
					/* Show Emoticons Logic */
					if(disabled){
						console.log('screen = ' + screenName);
						if(screenName == 'screen2' || screenName == 'screen2b'){
							apprange.HighlightSmiley(limitValue, element.value, pct);
						}
						if(screenName == 'screen3'){
							apprange.showSmiley(limitValue, element.value, pct);
						}
					}
			  }
			}
			function showSmiley(limitValue, selectedValue, bottom){
				var smiley = document.getElementsByClassName('icon_max_smily');
				if(selectedValue >= limitValue){
					//smiley = document.getElementById('icon_max_smily');
				}else{
					var limitMultiplier = limitValue/3;
					if(selectedValue >= 2*limitMultiplier && selectedValue < limitValue){
						smiley = document.getElementsByClassName('icon_high_smily');
					}else if(selectedValue >= limitMultiplier && selectedValue < 2*limitMultiplier){
						smiley = document.getElementsByClassName('icon_medium_smily');
					}else if(selectedValue >= 0 && selectedValue < limitMultiplier){
						smiley = document.getElementsByClassName('icon_low_smily');
					}
				}
				console.dir(smiley, bottom);
				smiley[0].querySelector('img').setAttribute("style", "position: absolute; display: block; bottom: "+bottom+"%");
				smiley[1].querySelector('img').setAttribute("style", "position: absolute; display: block; bottom: "+bottom+"%");
			}
			function HighlightSmiley(limitValue, selectedValue, pct){
				var upperHeight = 100 - limitValue;
				var lowerHeight = (100 - upperHeight)/3;
				limitValue = Number(limitValue);
				selectedValue = Number(selectedValue);
				if(selectedValue >= limitValue){
					document.getElementsByClassName('icon_max_smily')[0].querySelector('img').setAttribute("width", "70px");
					//document.getElementsByClassName('icon_max_smily')[0].querySelector('img').setAttribute("style", "top: " + pct + "%");
				}else{
					var limitMultiplier = limitValue/3;
					if(selectedValue >= 2*limitMultiplier && selectedValue < limitValue){
						document.getElementsByClassName('icon_high_smily')[0].querySelector('img').setAttribute("width", "70px");
					}else if(selectedValue >= limitMultiplier && selectedValue < 2*limitMultiplier){
						document.getElementsByClassName('icon_medium_smily')[0].querySelector('img').setAttribute("width", "70px");
					}else if(selectedValue >= 0 && selectedValue < limitMultiplier){
						document.getElementsByClassName('icon_low_smily')[0].querySelector('img').setAttribute("width", "70px");
					}
				}
				document.getElementsByClassName('icon_max_smily')[0].setAttribute("style", "height:"+upperHeight+"% ; display: flex; align-items: center");
				document.getElementsByClassName('icon_high_smily')[0].setAttribute("style", "height:"+lowerHeight+"% ; display: flex; align-items: center");
				document.getElementsByClassName('icon_medium_smily')[0].setAttribute("style", "height:"+lowerHeight+"% ; display: flex; align-items: center");
				document.getElementsByClassName('icon_low_smily')[0].setAttribute("style", "height:"+lowerHeight+"% ; display: flex; align-items: center");
			}
			return {
					initAndSetupTheSliders: initAndSetupTheSliders,
					updateSlider: updateSlider,
					HighlightSmiley: HighlightSmiley,
					showSmiley: showSmiley
				};
	}();
	
	
	
	
	
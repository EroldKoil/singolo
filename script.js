let selectedNav;
let header;
let nav;
let home;
let activeSlide = 1;
let slides;
let slide1;
let slide2;
let verticalScreenOn = true;
let horizontalScreenOn = true;
let sortButtons;
let selectedSortButton;
let selectedImage = null;
let portfolioImages;
let headerMobileButton;
let isMenuNavVisible = false;
let burger;
let sliderActive = true;

window.onload = function (){


	selectedNav = 'navHome';
	nav = document.getElementById('navigation');
	sortButtons = document.getElementById('sort-buttons');
	selectedSortButton = document.getElementById('sort-buttonsAll');
	portfolioImages = document.getElementById('portfolio__images');
	header = document.getElementById('header');
	home =  document.getElementById('home');

	headerMobileButton = document.getElementById('header__mobile-button');
	burger = document.getElementById('burger');
	headerMobileButton.addEventListener('click', visibleMenu);
	document.getElementById('header__mobile-button_2').addEventListener('click', visibleMenu);



	/*Header*/
	nav.addEventListener('click', navigation);
	burger.addEventListener('click', navigation);

	/*Portfolio. Переключение табов*/
	sortButtons.addEventListener('click', function (event) {
		let target = event.target;
		if(target.tagName == "DIV" && target != selectedSortButton){
			selectedSortButton.classList.remove("sort-buttons__selected");
			target.classList.add("sort-buttons__selected");
			selectedSortButton = target;
		}
		let portfolioImages = document.getElementById('portfolio__images');
		portfolioImages.appendChild(portfolioImages.firstChild);
		portfolioImages.appendChild(portfolioImages.firstChild);
	});


/*Portfolio. Взаимодействие с картинками*/
	portfolioImages.addEventListener('click', function (event) {
		let target = event.target;
		if(target.tagName == "IMG" ){
			if(target != selectedImage) {
				if (selectedImage != undefined) {
					selectedImage.classList.remove("portfolio__images_selected");
				}
				target.classList.add("portfolio__images_selected");
				selectedImage = target;
			}
			else{
				target.classList.remove("portfolio__images_selected");
			}
		}
	});


	/*Slider. Переключение слайдов*/
	slides = document.getElementById('slides');
	slide1 = document.getElementById('slide1');
	slide2 = document.createElement("img");
	slide2.classList.add('slider__content2');
	slide2.src = 'assets/img/singolo3/slide2.png';



	let sliderGoTo = async function(way){
		if(sliderActive){
			sliderActive = false;
			let width = header.offsetWidth;
			let i = 1;
			if(activeSlide == 1){
				if (way == 'left'){
					slides.appendChild(slide2);
				}
				else{
					slides.prepend(slide2);
					slides.style.right = width + 'px';
					document.getElementById('slider__bottomLine').style.margin = '-3px 0 0 0';
				}
				activeSlide = 2;
			}
			else{
				if (way == 'left'){
					slides.appendChild(slide1);

				}
				else{
					slides.prepend(slide1);
					slides.style.right = width + 'px';
					document.getElementById('slider__bottomLine').style.margin = '0 0 0 0';
				}
				activeSlide = 1;
			}

			let promise = new Promise((resolve)=>{
				if(way == 'left'){
					let move = setInterval(async () =>{
						slides.style.right = width * i / 100 + 'px';
						i++;
						if(i > 100){
							clearInterval(move);
							if(activeSlide == 2) {
								document.getElementById('slider__bottomLine').style.margin = '-3px 0 0 0';
							}else{
								document.getElementById('slider__bottomLine').style.margin = '0 0 0 0';
							}
							resolve();
						}
					},3);

				}
				else{
					let move = setInterval(async () =>{
						slides.style.right = width - (width * i / 100)  + 'px';
						i++;
						if(i > 100){
							clearInterval(move);
							resolve();
						}
					},3);
				}

			});
			let waitSliderMoving = await promise;

			slides.innerHTML = '';
			slides.style.right = '0px';

			if(activeSlide == 1){
				slides.appendChild(slide1);
			}
			else{
				slides.appendChild(slide2);
			}

			sliderActive = true;
		}

	};


	document.getElementById('sliderLeft').addEventListener('click',function () {
		sliderGoTo('left');
	});

		document.getElementById('sliderRight').addEventListener('click',function () {
			sliderGoTo('right');
		});

		/*Slider. Активация экранов телефонов*/
		document.getElementById('vertical__phone_button').addEventListener('click',function () {
			let vScreen = document.getElementById('vertical__phone_screen');
			if(verticalScreenOn == true){
				vScreen.style.visibility = 'hidden';
			}
			else{
				vScreen.style.visibility = 'visible';
			}
			verticalScreenOn = !verticalScreenOn;
		});
		document.getElementById('horizontal__phone_button').addEventListener('click',function () {
			let vScreen = document.getElementById('horizontal__phone_screen');
			if(horizontalScreenOn == true){
				vScreen.style.visibility = 'hidden';
			}
			else{
				vScreen.style.visibility = 'visible';
			}
			horizontalScreenOn = !horizontalScreenOn;
		});


		/*Get a quote*/
		document.getElementById("form-button").addEventListener("click", function (event) {
			event.preventDefault();
			let name = document.getElementById("form-name").value;
			let subject = document.getElementById("form-subject").value;
			name = name == ''?'Без темы':'Тема: ' + name;
			subject = subject == ''?'Без описания':'Описание: ' + subject;

			document.getElementById("messageForm__topic").innerText = name;
			document.getElementById("messageForm__subject").innerText = subject;
			document.getElementById("messageFormBG").style.display = 'flex';
		});

		document.getElementById("messageForm__button").addEventListener("click", function (event) {
			document.getElementById("messageFormBG").style.display = 'none';

	});

}

function sliderNormalPos() {
	if(activeSlide == 1){
		slides.innerHTML = '';
		slides.appendChild(slide1);
	}
	else{
		slides.innerHTML = '';
		slides.appendChild(slide2);
	}
	slides.className='slides';
}

function visibleMenu(){
	isMenuNavVisible = !isMenuNavVisible;
	if(isMenuNavVisible){
		burger.style.display = 'block'
	}
	else{
		burger.style.display = 'none'
	}
}

function navigation(event) {
	let target = event.target.parentNode;
	if(target.tagName == "A"){
		let selectedNavArray = [document.getElementById(selectedNav), document.getElementById(selectedNav + 'Mobile')];
		selectedNavArray[0].classList.remove("selectedNav");
		selectedNavArray[1].classList.remove("selectedNav");

		let targetId = target.id.replace('Mobile', '');

		let targetsArray =[document.getElementById(targetId), document.getElementById(targetId + 'Mobile')];

		targetsArray[0].classList.add("selectedNav");
		targetsArray[1].classList.add("selectedNav");
		selectedNav = targetId;
		if(targetId == "navHome"){
			event.preventDefault();
			window.scrollTo(0,0);
		}
		if(target.id.includes('Mobile')){
			isMenuNavVisible = !isMenuNavVisible;
			burger.style.display = 'none';
		}
	}
}
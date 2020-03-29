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

window.onload = function (){


	selectedNav = document.getElementById('navHome');
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
	nav.addEventListener('click', function (event) {
		let target = event.target.parentNode;
	        if(target.tagName == "A"){
	        	selectedNav.classList.remove("selectedNav");
	        	target.classList.add("selectedNav");
	        	selectedNav = target;
	        	if(target.id == "navHome"){
	        		event.preventDefault();
	        		window.scrollTo(0,0);
	        	}
	        }
	    });

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
	slide2 = document.createElement("div");
	slide2.innerHTML = '<div class="slider__content2"></div>';

	slides.ontransitionend = ()=> {
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



	document.getElementById('sliderLeft').addEventListener('click',function () {
		if(activeSlide == 1){
			slides.innerHTML = '';
			slides.appendChild(slide1);
			slides.appendChild(slide2);
			activeSlide = 2;
		}
		else{
			slides.innerHTML = '';
			slides.appendChild(slide2);
			slides.appendChild(slide1);
			activeSlide = 1;
		}
		slides.className='slides__leftPosition';
	});

		document.getElementById('sliderRight').addEventListener('click',function () {
			slides.className = 'slides__rightPosition';
			if(activeSlide == 1){
				slides.innerHTML = '';
				slides.appendChild(slide2);
				slides.appendChild(slide1);
				activeSlide = 2;
			}
			else{
				slides.innerHTML = '';
				slides.appendChild(slide1);
				slides.appendChild(slide2);
				activeSlide = 1;
			}

			sliderNormalPos();
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

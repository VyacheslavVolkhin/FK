document.addEventListener("DOMContentLoaded", function() {

	//fancybox
	Fancybox.bind("[data-fancybox]", {
		//settings
	});



	//lk form edit
	const editButtons = document.querySelectorAll('.js-form-edit');
	editButtons.forEach(button => {
		button.addEventListener('click', function(e) {
			e.preventDefault(); 
			const section = this.closest('.frm-row-section');
			const input = section.querySelector('.form-input');
			this.classList.toggle('active');
			const isNowActive = input.hasAttribute('disabled');
			if (isNowActive) {
				input.removeAttribute('disabled');
				input.focus();
				input.select();
			} else {
				input.setAttribute('disabled', 'disabled');
			}
		});
	});


	

	// item-tile-catalog height
	function setCatalogTileHeights() {
		document.querySelectorAll('.item-tile-catalog').forEach(function(el) {
			el.style.height = '';
			const h = el.offsetHeight;
			el.style.height = h + 'px';
			el.classList.add('cat-active');
		});
	}
	setCatalogTileHeights();
	let resizeTimer;
	window.addEventListener('resize', function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(setCatalogTileHeights, 150);
	});


	//select toggle content visibility
	const inputs = document.querySelectorAll(
	  "input[data-content], input[data-content-check], input[data-content-uncheck]"
	);
  
	inputs.forEach(function (input) {
	  toggleContent(input);
	  });
  
	inputs.forEach((input) => {
	  input.addEventListener("click", function () {
		document.querySelectorAll(".frm-content").forEach((content) => {
		  content.classList.remove("active");
			  });
  
		inputs.forEach(toggleContent);
		  });
	  });
  
	document.querySelectorAll(".btn[data-content]").forEach((button) => {
	  button.addEventListener("click", function () {
		let dataContent = this.getAttribute("data-content");
		this.disabled = true;
		document
		  .querySelectorAll('.frm-content[data-content="' + dataContent + '"]')
		  .forEach((content) => {
			content.classList.add("active");
			  });
		return false;
		  });
	  });
  
	function toggleContent(input) {
	  let selectContent;
	  if (input.checked) {
		selectContent =
		  input.getAttribute("data-content-check") ||
		  input.getAttribute("data-content");
		  } else {
		selectContent = input.getAttribute("data-content-uncheck");
		  }
	  document
		.querySelectorAll('.frm-content[data-content="' + selectContent + '"]')
		.forEach((content) => {
		  content.classList.add("active");
		  });
	  }

	

	//field-password
	const passwordToggle = document.querySelectorAll(".js-password-toggle");
	for (let i = 0; i < passwordToggle.length; i++) {
	  passwordToggle[i
		].addEventListener("click", function (e) {
		if (this.classList.contains("active")) {
		  this.classList.remove("active");
		  const input = this.closest(".frm-field-password").querySelector(
			".form-input"
		  );
		  input.type = "password";
			} else {
		  this.classList.add("active");
		  const input = this.closest(".frm-field-password").querySelector(
			".form-input"
		  );
		  input.type = "text";
			}
		e.preventDefault();
		})
	}


	//mobile menu
	const menuButton = document.querySelectorAll('.header-nav-panel .btn-menu');
	for (i = 0;i < menuButton.length;i++) {
		menuButton[i].addEventListener('click', function(e) {
			if (innerWidth < 768) {
				if (this.nextElementSibling && this.nextElementSibling.tagName === 'UL') {
					this.parentElement.classList.toggle('open')
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			}
		})
	}

	// js-counter
	document.querySelectorAll('.js-counter').forEach(function(counter) {
		const input    = counter.querySelector('.js-input-counter');
		const btnPlus  = counter.querySelector('.js-button-counter-plus');
		const btnMinus = counter.querySelector('.js-button-counter-minus');

		const step = parseFloat(input.dataset.step) || 1;
		const min  = parseFloat(input.dataset.min)  ?? 0;
		const max  = parseFloat(input.dataset.max)  ?? Infinity;

		function updateButtons(val) {
			btnMinus.classList.toggle('button-disabled', val <= min);
			btnPlus.classList.toggle('button-disabled', val >= max);
		}

		if (!input.value) input.value = min;
		updateButtons(parseFloat(input.value));

		btnPlus.addEventListener('click', function(e) {
			e.preventDefault();
			let val = parseFloat(input.value) || 0;
			if (val + step <= max) {
				input.value = val + step;
				updateButtons(parseFloat(input.value));
			}
		});

		btnMinus.addEventListener('click', function(e) {
			e.preventDefault();
			let val = parseFloat(input.value) || 0;
			if (val - step >= min) {
				input.value = val - step;
				updateButtons(parseFloat(input.value));
			}
		});

		input.addEventListener('change', function() {
			let val = parseFloat(this.value);
			if (isNaN(val) || val < min) this.value = min;
			if (val > max) this.value = max;
			updateButtons(parseFloat(this.value));
		});
	});

	//mobile catalog
	const catalogButton = document.querySelectorAll('.header-main-panel .btn-catalog');
	for (i = 0;i < catalogButton.length;i++) {
		catalogButton[i].addEventListener('click', function(e) {
			if (innerWidth < 1024) {
				this.parentElement.classList.toggle('open')
				e.preventDefault()
				return false
			}
		})
	}
	const catalogButtonSide = document.querySelectorAll('.side-wrap .btn-catalog');
	for (i = 0;i < catalogButtonSide.length;i++) {
		catalogButtonSide[i].addEventListener('click', function(e) {
			this.parentElement.classList.toggle('open')
			e.preventDefault()
			return false
		})
	}


	//catalog tiles-rows toggle
	const catalogContainers = document.querySelectorAll('[data-catalog]');
	const catalogMap = new Map();
	
	catalogContainers.forEach(element => {
		const catalogId = element.getAttribute('data-catalog');
		if (!catalogMap.has(catalogId)) {
			catalogMap.set(catalogId, {
				tilesBtn: null,
				rowsBtn: null,
				tilesBox: null
			});
		}
		
		const catalogData = catalogMap.get(catalogId);
		if (element.classList.contains('tiles-box')) {
			catalogData.tilesBox = element;
		} else if (element.classList.contains('js-catalog-tiles')) {
			catalogData.tilesBtn = element;
		} else if (element.classList.contains('js-catalog-rows')) {
			catalogData.rowsBtn = element;
		}
	});

	catalogMap.forEach((data, catalogId) => {
		if (!data.tilesBtn || !data.rowsBtn || !data.tilesBox) return;
		
		function setActiveView(viewType) {
			if (viewType === 'tiles') {
				data.tilesBox.classList.add('view-tiles');
				data.tilesBox.classList.remove('view-rows');
				data.tilesBtn.classList.add('active');
				data.rowsBtn.classList.remove('active');
			} else {
				data.tilesBox.classList.add('view-rows');
				data.tilesBox.classList.remove('view-tiles');
				data.rowsBtn.classList.add('active');
				data.tilesBtn.classList.remove('active');
			}
		}
		
		if (data.tilesBtn.classList.contains('active')) {
			setActiveView('tiles');
		} else if (data.rowsBtn.classList.contains('active')) {
			setActiveView('rows');
		} else {
			setActiveView('tiles');
		}
		
		data.tilesBtn.addEventListener('click', function(e) {
			e.preventDefault();
			setActiveView('tiles');
		});
		
		data.rowsBtn.addEventListener('click', function(e) {
			e.preventDefault();
			setActiveView('rows');
		});
	});


	//btn tgl and add
	let tglButtons = document.querySelectorAll('.js-btn-tgl')
	let addButtons = document.querySelectorAll('.js-btn-add')
	let buttonsTglOne = document.querySelectorAll('.js-btn-tgl-one');
	for (i = 0;i < tglButtons.length;i++) {
		tglButtons[i].addEventListener('click', function(e) {
			this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
			e.preventDefault()
			return false
		})
	}
	for (i = 0;i < addButtons.length;i++) {
		addButtons[i].addEventListener('click', function(e) {
			if (!this.classList.contains('active')) {
				this.classList.add('active');
				e.preventDefault()
				return false
			}
		})
	}
	buttonsTglOne.forEach(function(button) {
		button.addEventListener('click', function(e) {
			e.preventDefault();
			let toggleButtonsWrap = this.closest('.js-toggle-buttons');
	
			if (this.classList.contains('active')) {
				this.classList.remove('active');
			} else {
				toggleButtonsWrap.querySelectorAll('.js-btn-tgl-one').forEach(function(btn) {
					btn.classList.remove('active');
				});
				this.classList.add('active');
			}
			return false;
		});
	});

	//mask phone
	let telInputs = document.querySelectorAll('input[type="tel"]');
	if (telInputs.length > 0) {
		let im = new Inputmask("+7 (999) 999-99-99");
		im.mask(telInputs);
	}
    const phoneInput = document.querySelector('input[type="tel"]');
	const emailInput = document.querySelector('input[type="email"]');
    if (phoneInput) {
        const phoneContainer = phoneInput.closest('.frm-field-input');

        phoneInput.addEventListener('input', function() {
            const digits = this.value.replace(/\D/g, '');
            const isValid = digits.length === 11;
            updateValidationClass(phoneContainer, isValid);
        });
    }
    if (emailInput) {
        const emailContainer = emailInput.closest('.frm-field-input');
        
        emailInput.addEventListener('input', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
        
        emailInput.addEventListener('blur', function() {
            const email = this.value.trim();
            const isValid = validateEmail(email);
            
            updateValidationClass(emailContainer, isValid);
        });
    }
	function updateValidationClass(container, isValid) {
		const input = container.querySelector('input');
		const hasValue = input.value.trim().length > 0;
		const isAutofilled = input.matches(':-webkit-autofill');
		const shouldBeVerified = isValid || isAutofilled;
		if (shouldBeVerified) {
			container.classList.add('inp-verify');
			container.classList.remove('inp-error');
			if (isAutofilled) {
				container.classList.add('inp-autofilled');
			} else {
				container.classList.remove('inp-autofilled');
			}
		} else {
			container.classList.remove('inp-verify', 'inp-autofilled');
			
			if (hasValue) {
				container.classList.add('inp-error');
			} else {
				container.classList.remove('inp-error');
			}
		}
	}
    function validateEmail(email) {
        if (!email) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

	

	//js popup wrap
	const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
	const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
	const popupElements = document.querySelectorAll('.js-popup-wrap')

	function popupElementsClear() {
		document.body.classList.remove('menu-show')
		document.body.classList.remove('filter-show')
		document.body.classList.remove('search-show')
		popupElements.forEach(element => element.classList.remove('popup-right'))
	}
	function popupElementsClose() {
		togglePopupButtons.forEach(element => {
			if (window.innerWidth < 1024) {
				if (!element.closest('.no-close-mobile') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}

			} else if  (window.innerWidth > 1023) {
				if (!element.closest('.no-close-desktop') && !element.closest('.no-close')) {
					element.classList.remove('active')
				}
			} else {
				if (!element.closest('.no-close')) {
					element.classList.remove('active')
				}
			}
			
		})
	}
	function popupElementsContentPositionClass() {
		const wrapEl = document.querySelector('.wrap')
		const wrapWidth = wrapEl ? wrapEl.offsetWidth : 0
		popupElements.forEach(element => {
			let pLeft = element.offsetLeft
			let pWidth = element.querySelector('.js-popup-block').offsetWidth
			let pMax = pLeft + pWidth;
			if (pMax > wrapWidth) {
				element.classList.add('popup-right')
			} else {
				element.classList.remove('popup-right')
			}
		})
	}
	for (let i = 0; i < togglePopupButtons.length; i++) {
		togglePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			if (this.classList.contains('active')) {
				this.classList.remove('active')
			} else {
				popupElementsClose()
				this.classList.add('active')
				if (this.closest('.popup-menu-wrap')) {
					document.body.classList.add('menu-show')
				}
				if (this.closest('.popup-search-wrap')) {
					document.body.classList.add('search-show')
				}
				if (this.closest('.popup-filter-wrap')) {
					document.body.classList.add('filter-show')
				}
				popupElementsContentPositionClass()
			}
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (let i = 0; i < closePopupButtons.length; i++) {
		closePopupButtons[i].addEventListener('click', function (e) {
			popupElementsClear()
			popupElementsClose()
			e.preventDefault()
			e.stopPropagation()
			return false;
		})
	}
	document.onclick = function (event) {
		if (!event.target.closest('.js-popup-block')) {
			popupElementsClear()
			popupElementsClose()
		}
	}
	popupElements.forEach(element => {
		if (element.classList.contains('js-popup-select')) {
			let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
			if (element.querySelector('.js-popup-block .active')) {
				element.classList.add('select-active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
			} else {
				element.classList.remove('select-active')
			}
			for (let i = 0; i < popupElementSelectItem.length; i++) {
				popupElementSelectItem[i].addEventListener('click', function (e) {
					this.closest('.js-popup-wrap').classList.add('select-active')
					if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
						this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
					}
					this.classList.add('active')
					let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
					let popupElementButton = element.querySelector('.js-btn-popup-toggle')
					popupElementButton.innerHTML = ''
					popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
					popupElementsClear()
					popupElementsClose()
					if (!this.closest('.js-tabs-nav')) {
						e.preventDefault()
						e.stopPropagation()
						return false
					}
				})
			}
		}
	})


	//js tabs
	const tabsNav = document.querySelectorAll('.js-tabs-nav')
	const tabsBlocks = document.querySelectorAll('.js-tab-block')
	const tabsButtonTitle = document.querySelectorAll('.js-tab-title')
	const tabsButtonContent = document.querySelectorAll('.js-tab-content')
	function tabsActiveStart() {
		for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
			if (tabsBlocks[iTab].classList.contains('active')) {
				tabsBlocks[iTab].classList.remove('active')
			}
		}
		for (i = 0; i < tabsNav.length; i++) {
			let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
			for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
				if (tabsNavElements[iElements].classList.contains('active')) {
					let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
					for (j = 0; j < tabsBlocks.length; j++) {
						if (tabsBlocks[j].dataset.tab.toString().split(' ').indexOf(tabsNavElementActive) > -1) {
							tabsBlocks[j].classList.add('active')
						}
					}
				}
			}
		}
		
	}
	for (i = 0; i < tabsButtonTitle.length; i++) {
		tabsButtonTitle[i].addEventListener('click', function (e) {
			this.classList.toggle('active')
			e.preventDefault()
			e.stopPropagation()
			return false
		})
	}
	for (i = 0; i < tabsNav.length; i++) {
		tabsNav[i].addEventListener('click', function (e) {
			if (e.target.closest('[data-tab]')) {
				let tabsNavElements = this.querySelector('[data-tab].active')
				tabsNavElements ? tabsNavElements.classList.remove('active') : false
				e.target.closest('[data-tab]').classList.add('active')
				tabsActiveStart()
				e.preventDefault()
				e.stopPropagation()
				return false
			}
		})
	}
	tabsActiveStart()



	// Popups
	let popupCurrent;
	let popupsList = document.querySelectorAll('.popup-outer-box');
	let popupTimer = null;

	document.querySelectorAll(".js-popup-open").forEach(function (element) {
		element.addEventListener("click", function (e) {
			document.querySelector(".popup-outer-box")?.classList.remove("active");
			document.body.classList.add("popup-open");
			if (popupTimer) {
			clearTimeout(popupTimer);
			popupTimer = null;
			}
			
			for (let i = 0; i < popupsList.length; i++) {
			popupsList[i].classList.remove("active");
			}

			popupCurrent = this.getAttribute("data-popup");
			const popupElement = document.querySelector(`.popup-outer-box[id="${popupCurrent}"]`);
			popupElement.classList.add("active");

			const timerValue = this.getAttribute("data-popup-timer");
			if (timerValue) {
			const timerMs = parseInt(timerValue);
			if (!isNaN(timerMs) && timerMs > 0) {
				popupTimer = setTimeout(function() {
				document.body.classList.remove("popup-open");
				document.body.classList.remove("popup-open-scroll");
				popupElement.classList.remove("active");
				popupTimer = null;
				}, timerMs);
			}
			}

			e.preventDefault();
			e.stopPropagation();
			return false;
		});
	});

	document.querySelectorAll(".js-popup-close").forEach(function (element) {
		element.addEventListener("click", function (event) {
			if (popupTimer) {
			clearTimeout(popupTimer);
			popupTimer = null;
			}
			
			document.body.classList.remove("popup-open");
			for (let i = 0; i < popupsList.length; i++) {
			popupsList[i].classList.remove("active");
			}
			event.preventDefault();
			event.stopPropagation();
		});
	});

	// document.querySelectorAll(".popup-outer-box").forEach(function (element) {
	// 	element.addEventListener("click", function (event) {
	// 		if (!event.target.closest(".popup-box")) {
	// 		if (popupTimer) {
	// 			clearTimeout(popupTimer);
	// 			popupTimer = null;
	// 		}
			
	// 		document.body.classList.remove("popup-open");
	// 		document.body.classList.remove("popup-open-scroll");
	// 		document.querySelectorAll(".popup-outer-box").forEach(function (e) {
	// 			e.classList.remove("active");
	// 		});
	// 		return false;
	// 		}
	// 	});
	// });


	//slider main action
	const slidersmainaction = document.querySelectorAll(".slider-mainaction");
	
	slidersmainaction.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-mainaction-pagination");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: {
				delay: 4000,
				disableOnInteraction: false,
			},
			navigation: false,
		});
	});


	//slider catalog menu
	const sliderscatalog = document.querySelectorAll(".slider-catalog");
	
	sliderscatalog.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-catalog-pagination");
		const nextEl = container.querySelector(".button-slider-catalog-next");
		const prevEl = container.querySelector(".button-slider-catalog-prev");
	
		if (!swiperEl) return;
	
		new Swiper(swiperEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			centeredSlides: true,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider tiles
	const sliderstiles = document.querySelectorAll(".slider-tiles");
	
	sliderstiles.forEach((container) => {
		const swiperEl = container.querySelector(".swiper");
		const paginationEl = container.querySelector(".slider-tiles-pagination");
		const nextEl = container.querySelector(".button-slider-tiles-next");
		const prevEl = container.querySelector(".button-slider-tiles-prev");
	
		if (!swiperEl) return;
		const hasAutoHeight = container.dataset.height === "auto";
		const hasLoop = container.dataset.loop === "true";
	
		new Swiper(swiperEl, {
			loop: hasLoop,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			autoHeight: hasAutoHeight,
			speed: 400,
			pagination: {
				el: paginationEl,
				clickable: true,
			},
			autoplay: false,
			navigation: {
				nextEl: nextEl,
				prevEl: prevEl,
			},
		});
	});


	//slider photos thumbs preview
	document.querySelectorAll('.tiles-thumbs-slider-box').forEach(function(container) {
		const thumbsEl = container.querySelector('.slider-photos-thumbs .swiper');
		const mainEl = container.querySelector('.slider-photos-main .swiper');
		const nextTBtn = container.querySelector('.button-slider-photos-thumbs-next');
		const prevTBtn = container.querySelector('.button-slider-photos-thumbs-prev');
		const nextBtn = container.querySelector('.button-slider-photos-main-next');
		const prevBtn = container.querySelector('.button-slider-photos-main-prev');
		const mainPag = container.querySelector('.slider-photos-main-pagination');
	
		const swiperPhotosPreview = new Swiper(thumbsEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 'auto',
			spaceBetween: 0,
			threshold: 5,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			freeMode: false,
			navigation: false,
			breakpoints: {
				768: {
					direction: 'vertical',
				},
				1024: {
					direction: 'horizontal',
				},
			},
		});
		const swiperPhotosMain = new Swiper(mainEl, {
			loop: false,
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: false,
			speed: 400,
			threshold: 5,
			freeMode: false,
			watchSlidesProgress: true,
			navigation: {
				nextEl: nextBtn,
				prevEl: prevBtn,
			},
			pagination: {
				el: mainPag,
				clickable: true,
			},
			thumbs: {
				swiper: swiperPhotosPreview,
			},
		});
	});

})

//reg tab click
function handleRegistration() {
	document.querySelector('[data-tab="form02"]').click();
	event.preventDefault();
}



//cart checkboxes selected
document.addEventListener('DOMContentLoaded', function() {
    const cartCheckboxes = document.querySelectorAll('input[type="checkbox"][id^="cart"]');
    const selectAllCheckbox = document.querySelector('input[type="checkbox"][id="cart"]');
    
    function updateSelectAllCheckbox() {
        if (!selectAllCheckbox) return;
        
        const visibleCheckboxes = Array.from(cartCheckboxes).filter(cb => {
            return cb.id !== 'cart' && cb.closest('.item-wrap') && 
                   window.getComputedStyle(cb.closest('.item-wrap')).display !== 'none';
        });
        
        if (visibleCheckboxes.length === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
            return;
        }
        const checkedCount = visibleCheckboxes.filter(cb => cb.checked).length;
        
        if (checkedCount === 0) {
            selectAllCheckbox.checked = false;
            selectAllCheckbox.indeterminate = false;
        } else if (checkedCount === visibleCheckboxes.length) {
            selectAllCheckbox.checked = true;
            selectAllCheckbox.indeterminate = false;
        } else {
            selectAllCheckbox.indeterminate = true;
        }
    }
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function(e) {
            const visibleCheckboxes = Array.from(cartCheckboxes).filter(cb => {
                return cb.id !== 'cart' && cb.closest('.item-wrap') && 
                       window.getComputedStyle(cb.closest('.item-wrap')).display !== 'none';
            });
            
            visibleCheckboxes.forEach(checkbox => {
                checkbox.checked = e.target.checked;
                checkbox.dispatchEvent(new Event('change', { bubbles: true }));
            });
        });
    }
    cartCheckboxes.forEach(checkbox => {
        if (checkbox.id !== 'cart') {
            checkbox.addEventListener('change', function() {
                updateSelectAllCheckbox();
            });
        }
    });
    updateSelectAllCheckbox();
});

//header fixed
(function() {
    function isDesktop() {
        return window.innerWidth >= 768;
    }

    function checkScroll() {
        if (!isDesktop()) return;
        
        const headerTopPanel = document.querySelector('.header-top-panel');
        if (!headerTopPanel) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = headerTopPanel.offsetHeight;
        
        if (scrollTop >= targetPosition) {
            document.body.classList.add('header-fixed');
        } else {
            document.body.classList.remove('header-fixed');
        }
    }

    function handleResize() {
        if (!isDesktop()) {
            document.body.classList.remove('header-fixed');
        } else {
            checkScroll();
        }
    }

    window.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', handleResize);
    
    document.addEventListener('DOMContentLoaded', checkScroll);
    setTimeout(checkScroll, 100);
})();
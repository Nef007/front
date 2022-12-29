(function ($) {
	$(document).ready(function () {
		'use strict';
		$('html').removeClass('no-js');

		//--------------------------- ANCHOR LINK ---------------------------//
		$('a.anchor-trigger').bind("click", function(e){
			let anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top-0
			}, 1000);
			e.preventDefault();
		});

		//--------------------------- SCROLL TO TOP ---------------------------//
		let scrollToTopBtn = document.getElementById("scrollToTopBtn");
		let rootElement = document.documentElement;

		function handleScroll() {
			let scrollTotal = rootElement.scrollHeight - rootElement.clientHeight;
			if((rootElement.scrollTop / scrollTotal) > 0.30) {
				scrollToTopBtn.classList.add("showBtn")
			} else {
				scrollToTopBtn.classList.remove("showBtn")
			}
		}

		function scrollToTop() {
			rootElement.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		}

		scrollToTopBtn.addEventListener("click", scrollToTop);
		document.addEventListener('scroll', handleScroll);


		//--------------------------- ACCORDION MENU ---------------------------//
		$(".main-nav__link-container").on("click", function(e) {
			e.preventDefault();
			let $this = $(this);

			if (!$this.hasClass("main-nav__link-container_active")) {
				$(".accordion__content").slideUp(400);
				$(".accordion__title").removeClass("main-nav__link-container_active");
			//	$('.accordion__arrow').removeClass('accordion__rotate');
			}

			$this.toggleClass("main-nav__link-container_active");
			$this.find($(".main-nav__dropdown")).slideToggle();
			//$('.accordion__arrow',this).toggleClass('accordion__rotate');
		});


		//--------------------------- BOOTSTRAP MODAL SETTINGS ---------------------------//
		const myModalEl = document.getElementById('contactsEditModal')
		const myModalInput = document.getElementById('recipient-name')
		myModalEl.addEventListener('shown.bs.modal', event => {
			console.log('modal is displayed');
			myModalInput.focus();

			// скрипт подгрузки данных для изменения
		})


		//--------------------------- QUOS EGO! ---------------------------//
		console.log('quos ego!');
	})
})(jQuery);



//--------------------------- TAGIFY SETTINGS ---------------------------//
// The DOM element you wish to replace with Tagify
let input = document.querySelector('input[name=basic]');

// initialize Tagify on the above input node reference
new Tagify(input)

let inputs = document.getElementsByClassName('tags'), tagify = []

for(let i = 0; i < inputs.length; i++) {
	tagify[i] = new Tagify(inputs[i], {
		pattern             : /^.{0,20}$/,  // Validate typed tag(s) by Regex. Here maximum chars length is defined as "20"
		delimiters          : ",| ",        // add new tags when a comma or a space character is entered
		keepInvalidTags     : false,         // do not remove invalid tags (but keep them marked as invalid)
		// createInvalidTags: false,
		editTags            : {
			clicks: 2,              // single click to edit a tag
			keepInvalid: false      // if after editing, tag is invalid, auto-revert
		},
		maxTags             : 10,
		blacklist           : ["foo", "bar", "baz"],
		whitelist           : ["temple","stun","detective","sign","passion","routine","deck","discriminate","relaxation","fraud","attractive","soft","forecast","point","thank","stage","eliminate","effective","flood","passive","skilled","separation","contact","compromise","reality","district","nationalist","leg","porter","conviction","worker","vegetable","commerce","conception","particle","honor","stick","tail","pumpkin","core","mouse","egg","population","unique","behavior","onion","disaster","cute","pipe","sock","dialect","horse","swear","owner","cope","global","improvement","artist","shed","constant","bond","brink","shower","spot","inject","bowel","homosexual","trust","exclude","tough","sickness","prevalence","sister","resolution","cattle","cultural","innocent","burial","bundle","thaw","respectable","thirsty","exposure","team","creed","facade","calendar","filter","utter","dominate","predator","discover","theorist","hospitality","damage","woman","rub","crop","unpleasant","halt","inch","birthday","lack","throne","maximum","pause","digress","fossil","policy","instrument","trunk","frame","measure","hall","support","convenience","house","partnership","inspector","looting","ranch","asset","rally","explicit","leak","monarch","ethics","applied","aviation","dentist","great","ethnic","sodium","truth","constellation","lease","guide","break","conclusion","button","recording","horizon","council","paradox","bride","weigh","like","noble","transition","accumulation","arrow","stitch","academy","glimpse","case","researcher","constitutional","notion","bathroom","revolutionary","soldier","vehicle","betray","gear","pan","quarter","embarrassment","golf","shark","constitution","club","college","duty","eaux","know","collection","burst","fun","animal","expectation","persist","insure","tick","account","initiative","tourist","member","example","plant","river","ratio","view","coast","latest","invite","help","falsify","allocation","degree","feel","resort","means","excuse","injury","pupil","shaft","allow","ton","tube","dress","speaker","double","theater","opposed","holiday","screw","cutting","picture","laborer","conservation","kneel","miracle","brand","nomination","characteristic","referral","carbon","valley","hot","climb","wrestle","motorist","update","loot","mosquito","delivery","eagle","guideline","hurt","feedback","finish","traffic","competence","serve","archive","feeling","hope","seal","ear","oven","vote","ballot","study","negative","declaration","particular","pattern","suburb","intervention","brake","frequency","drink","affair","contemporary","prince","dry","mole","lazy","undermine","radio","legislation","circumstance","bear","left","pony","industry","mastermind","criticism","sheep","failure","chain","depressed","launch","script","green","weave","please","surprise","doctor","revive","banquet","belong","correction","door","image","integrity","intermediate","sense","formal","cane","gloom","toast","pension","exception","prey","random","nose","predict","needle","satisfaction","establish","fit","vigorous","urgency","X-ray","equinox","variety","proclaim","conceive","bulb","vegetarian","available","stake","publicity","strikebreaker","portrait","sink","frog","ruin","studio","match","electron","captain","channel","navy","set","recommend","appoint","liberal","missile","sample","result","poor","efflux","glance","timetable","advertise","personality","aunt","dog"],
		transformTag        : transformTag,
		backspace           : "edit",
		placeholder         : "Type something",
		dropdown : {
			enabled: 1,            // show suggestion after 1 typed character
			fuzzySearch: false,    // match only suggestions that starts with the typed characters
			position: 'text',      // position suggestions list next to typed text
			caseSensitive: true,   // allow adding duplicate items if their case is different
		},
		templates: {
			dropdownItemNoMatch: function(data) {
				return `<div class='${this.settings.classNames.dropdownItem}' value="noMatch" tabindex="0" role="option">
				No suggestion found for: <strong>${data.value}</strong>
			</div>`
			}
		}
	})

	// generate a random color (in HSL format, which I like to use)
	function getRandomColor(){
		function rand(min, max) {
			return min + Math.random() * (max - min);
		}

		var h = rand(1, 360)|0,
			s = rand(40, 70)|0,
			l = rand(65, 72)|0;

		return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	}

	function transformTag( tagData ){
		tagData.color = getRandomColor();
		tagData.style = "--tag-bg:" + tagData.color;

		if( tagData.value.toLowerCase() == 'shit' )
			tagData.value = 's✲✲t'
	}
}

tagify[i].on('add', function(e){
	console.log(e.detail)
})

tagify[i].on('invalid', function(e){
	console.log(e, e.detail);
})
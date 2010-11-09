/*
 * 2010/10/25
 * buzzzzble.ui.js
 * 
 * note:
 * just for the basic ui components including:
 * button, textbox, dropdownlist, radiobutton, checkbox
 */
$.fn.extend( {
	button : function(opt) {
		$(this).addClass('bbtn btn-bg').wrap(
				'<span class="sp-sp"><span class="sp"></span></span>');

		$(this).mousedown(function() {
			$(this).toggleClass('btn-bg');
			return false;
		}).mouseup(function() {
			$(this).toggleClass('btn-bg');
			return false;
		});
	},
	dropdownlist : function(opt) {
		
	},
	textbox : function(opt) {
		$(this).addClass('tb-b').wrap('<span class="tb-c"></span>');
	},
	radio : function(opt) {

	},
	checkbox : function(opt) {

	}
});
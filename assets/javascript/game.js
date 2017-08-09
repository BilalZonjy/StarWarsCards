	
$(document).ready(function(){


$('#Anakin_Skywalker').data('pk','1');
$('#obi_wan_kenobi').data('pk','2');
$('#Darth_Tyranus').data('pk','3');
$('#darth_sidious').data('pk','4');


function copy_character_from_character(copy_character,character){
		copy_character['name'] = character['name'];
		copy_character['health'] = character['health'];
		copy_character['attack'] = character['attack'];
		copy_character['count_attack'] =character['count_attack'];
		copy_character['image'] =character['image'];
		};

function fill_thumbnail_info(thumbnail_ID,character){
		$('#' + thumbnail_ID + '_ch_name').text(character['name']);
		$('#' + thumbnail_ID + '_ch_img').attr("src", character['image']);
		$('#' + thumbnail_ID + '_ch_health').text(character['health']);
		};

function remove_from_list(array,item){
		var index = array.indexOf(item);
		array.splice(index, 1);
		return array
		};


function re_arragne_enemies_availalble_to_attack(enemies_availalble_to_attack_list){
		$('.enemies_available').css('visibility', 'hidden');
		for (i in enemies_availalble_to_attack_list){
			var pk = enemies_availalble_to_attack_list[i];
			var enemy_in_the_list = character_dic[pk];
			var c = parseInt(i) +1;
			var thumbnail_ID = 'enemies_available_'+c;
			fill_thumbnail_info(thumbnail_ID,enemy_in_the_list);
			$('#'+thumbnail_ID).css('visibility', 'visible');
			$('#'+thumbnail_ID).data('pk',pk);
			};
		};

function manage_health_bar(thumbnail_ID,new_health,default_health){
hearth_percentage = (new_health/default_health)*100;
$('#'+thumbnail_ID+'_ch_health_bar').css('width',hearth_percentage+'%');

};


function make_Vader(){
		  var audioElement = document.createElement('audio');
		  audioElement.setAttribute('src', 'assets/sound/Darth_Vader_Breathing.wav');
		  audioElement.play();
		  audioElement.remove();
		  game_code['vader_mode'] = 1;
		  character_dic['2']['image'] = game_code['obi_wan_kenobi_img_2'];
		  re_arragne_enemies_availalble_to_attack(enemies_availalble_to_attack_list);
		  $('#your_character_ch_img').attr("src", game_code['vader_img']);
		  $('#your_character_ch_name').text("Darth Vader");

		  
		};

var character_dic = {
			'1' : {
			'name':'Anakin Skywalker',
			'health': 120,
			'attack': 8,
			'count_attack':7,
			'image':"assets/images/Anakin_Skywalker.jpg"},

			'2' : {
			'name':'Obi Wan Kenobi',
			'health': 150,
			'attack': 10,
			'count_attack':5,
			'image':"assets/images/obi_wan_kenobi.jpg"},

			'3' : {
			'name':'Darth Tyranus',
			'health': 100,
			'attack': 15,
			'count_attack':10,
			'image':"assets/images/Darth_Tyranus.jpg"},

			'4' : {
			'name':'Darth Sidious',
			'health': 300,
			'attack': 20,
			'count_attack':15,
			'image':"assets/images/darth_sidious.jpg"},
			};


var my_hero = {
			'name':'',
			'health': '',
			'attack': '',
			'count_attack':'',
			'image':""
			};


var my_enemy = {
			'name':'',
			'health': '',
			'attack': '',
			'count_attack':'',
			'image':""
			};

var enemies_availalble_to_attack_list = ['1','2','3','4']

var game_code = {

'choose_enemy_to_fight_code' : 0,
'choose_your_hero': 1,
'my_hero_base_attack':0,
'my_hero_default_health': 0,
'my_enemy_default_health':0,
'vader_mode':0,
'vader_img':"assets/images/Darth_Vader.jpg",
'obi_wan_kenobi_img_1' : "assets/images/obi_wan_kenobi.jpg",
'obi_wan_kenobi_img_2':"assets/images/obi_wan_kenobi_old.jpg",
};


$(".pri_game").on("click", function() {
		var pk = $(this).data('pk');
		var chosen_character = character_dic[pk];
		copy_character_from_character(my_hero,chosen_character);
		fill_thumbnail_info('your_character',my_hero);
		$('#your_character').css('visibility', 'visible');
		$('.pri_game').css('visibility', 'hidden');
		enemies_availalble_to_attack_list = remove_from_list(enemies_availalble_to_attack_list,pk);
		re_arragne_enemies_availalble_to_attack(enemies_availalble_to_attack_list);
		game_code['choose_enemy_to_fight_code'] = 1;
		game_code['choose_your_hero'] = 0;
		game_code['my_hero_base_attack'] = my_hero['attack'];
		game_code['my_hero_default_health'] = my_hero['health'];
		manage_health_bar('your_character',my_hero['health'],game_code['my_hero_default_health']);
		});





$(".enemies_available").on("click", function() {
		if (game_code['choose_enemy_to_fight_code'] == 1){
			var pk = $(this).data('pk');
			var chosen_character = character_dic[pk];
			copy_character_from_character(my_enemy,chosen_character);
			fill_thumbnail_info('defender',my_enemy);
			$('#defender').css('visibility', 'visible');
			$('#attack_btn').css('visibility', 'visible');
			$('#Damage_report').css('visibility', 'visible');		
			enemies_availalble_to_attack_list = remove_from_list(enemies_availalble_to_attack_list,pk);
			re_arragne_enemies_availalble_to_attack(enemies_availalble_to_attack_list);
			game_code['choose_enemy_to_fight_code'] = 0;
			game_code['my_enemy_default_health'] = my_enemy['health'];
			manage_health_bar('defender',my_enemy['health'],game_code['my_enemy_default_health']);

			};

		});


$("#attack_btn").on("click", function() {
	my_hero['health'] = my_hero['health']- my_enemy['count_attack'];
	my_enemy['health'] = my_enemy['health'] - my_hero['attack'];
	var report_text = 'you attacked '+my_enemy['name']+' for '+my_hero['attack']+' damage\n'+my_enemy['name']+' attacked you for ' +my_enemy['count_attack'] +' damage';
	$('#Damage_report').text(report_text);
	$('#defender_ch_health').text(my_enemy['health']);
	$('#your_character_ch_health').text(my_hero['health']);
	my_hero['attack'] = my_hero['attack'] + game_code['my_hero_base_attack'] ;
	manage_health_bar('your_character',my_hero['health'],game_code['my_hero_default_health']);
	manage_health_bar('defender',my_enemy['health'],game_code['my_enemy_default_health']);
	if (my_enemy['health'] <=0){
			$('#defender').css('visibility', 'hidden');
			$('#attack_btn').css('visibility', 'hidden');		
			if (enemies_availalble_to_attack_list.length > 0){
					game_code['choose_enemy_to_fight_code'] = 1;
					$('#Damage_report').text('Choose another enemy');	
			}else{
					$('#Damage_report').text('\tyou won');
					game_code['choose_enemy_to_fight_code'] = 0;
					$('#Restart_btn').css('visibility', 'visible');
					};
		};
	if (my_hero['health'] <=0){
		$('#attack_btn').css('visibility', 'hidden');
		$('#your_character_ch_health').text('0');	
		$('#Damage_report').text('\tyou lost');
		game_code['choose_enemy_to_fight_code'] = 0;
		$('#Restart_btn').css('visibility', 'visible');
		};

	if ( my_enemy['name'] =='Darth Tyranus' && my_hero['name']  =='Anakin Skywalker' && enemies_availalble_to_attack_list.length == 2  &&  my_enemy['health'] <=0){
		alert('Darth Vader');
		make_Vader();
		};
	if ( my_hero['name']  =='Anakin Skywalker' && enemies_availalble_to_attack_list.length == 0  &&  my_enemy['health'] <=0 && my_hero['health'] <=0 && my_enemy['name'] =='Darth Sidious'){
		var ending = "I'll not leave you here, I've got to save you.\nYou already have, Luke."		
		$('#Damage_report').text(ending);
		};
	});

$("#Restart_btn").on("click", function() {
			enemies_availalble_to_attack_list = ['1','2','3','4']
			$(".pri_game").css('visibility', 'visible');
			$(".during_game").css('visibility', 'hidden');
			game_code['choose_enemy_to_fight_code'] = 0;
			game_code['choose_your_hero'] = 1;
			$('#Damage_report').text('');
			character_dic['2']['image'] = game_code['obi_wan_kenobi_img_1'];
			game_code['vader_mode'] = 0;
		});


});
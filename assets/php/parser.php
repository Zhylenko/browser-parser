<?php 
	require_once 'autoClass.php';

	use Classes\Parser;

	//Check if field is empty
	if(strlen($_POST['search']) < 4){
		exit();
	}

	//Parse
	$url = 'https://drivemusic.club/?do=search&subaction=search&story=' . $_POST['search'];
	$parser = new Parser($url);
	$result = $parser->getPage();

	//Find Matches
	$pattern = "#<div class=[\"\']btn_player[\"\'].*?>[\s\S]*?<a data-url=[\"\'](.*?)[\"\'].*?>[\s\S.]*?</a>[\s\S]*?</div><div class=[\"\']popular-play-name[\"\'].*?>[\s\S]?<a href=[\"\'](.*?)[\"\'] class=[\"\']popular-play-author[\"\']>([\s\S.]*?)</a>[\s\S]*?<div class=[\"\']popular-play-composition[\"\']>([\s\S.]*?)</div>[\s\S]?</div>#uis";
	preg_match_all($pattern, $result, $matches);
	
	//Prepare matches
	unset($matches[0]);
	$result = [];
	foreach ($matches as $key => $arrays) {
		foreach ($arrays as $num => $array) {
			$result[$num][] = stripcslashes($array);
		}
	}
	
	//Print result
	header('Content-Type: application/json');
	exit(json_encode($result, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
?>
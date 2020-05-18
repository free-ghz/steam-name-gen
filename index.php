<!-- a markov chain, obviously. -->
<!-- mail me at @cat_abyss -->
<?php
	// markov player
	// jag tog nyss motsvarande kanske 3-4 shots
	// hehe ska skriva export java->json
	// sen import här json->whatever this is
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);
?><?php
	// thank you stack overflow
	function wchoice(array $weightedValues) {
		$rand = mt_rand(1, (int) array_sum($weightedValues));

		foreach ($weightedValues as $key => $value) {
			$rand -= $value;
			if ($rand <= 0) {
				return $key;
			}
		}
	}
?><?php
	/*
	
		GENERATE CS GO NAEMS!!!!!!!!!!!!!!!

	*/
	$MEMORY = 3;

	$ruleset = file_get_contents("csgo.json");
	$rules = json_decode($ruleset, true);
	//var_dump($rules);
	//var_dump($rules->{"_empty_"}->{"a"});
	$resuls = array();

	for ($i = 0; $i < 100; $i++) {
		$key = "";
		$value = "";
		$total = "";
		while ($value !== 'end') {
			$total .= $value;
			$key .= $value;

			if (strlen($key) > $MEMORY) {
				$key = substr($key, strlen($key)-$MEMORY);
			}
			$future = $rules[$key];
			
			$value = wchoice($future);
			
		}
		$resuls[] = $total;
	}
?><?php
	/*
	
		GENERATE DESCRIPTIONS
		
	*/
	$MEMORY = 8;

	$ruleset = file_get_contents("blobs-output.json");
	$rules = json_decode($ruleset, true);
	
	$key = "";
	$value = "";
	$total = "";
	while ($value !== 'end') {
		$total .= $value;
		$key .= $value;

		if (strlen($key) > $MEMORY) {
			$key = substr($key, strlen($key)-$MEMORY);
		}
		$future = $rules[$key];
		
		$value = wchoice($future);
		
	}
	$descript = $total;
	if ($descript[0] == "$") {
		$descript = substr($descript, 1);
	}
	$descript = str_replace("$", "<br />", $descript);
?>
<?php
	$c_wall = "254441";

	$c_border = "ff6f59";
	$c_header_text = "ff0";

	$c_a = "ef3054";
	$c_b = "43aa8b";

	$c_text = "fff";
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>name for steam</title>
		<style type="text/css">
			body {
				background-color:#<?php echo $c_wall;?>;
				background-image: url("moan.png");
				background-attachment: fixed;
				color:#00ffff;
				font-family: arial, helvetica, monospace;
				font-size:15px;
				font-weight: bold;
				text-align:center;
			}
			.header {
				color:#<?php echo $c_header_text;?> !important;
				background-color:#<?php echo $c_wall;?>;
				padding:20px;
				width:600px !important;
			}
			.wew {
				color:#<?php echo $c_text;?>;
				border-color:#<?php echo $c_border;?>;
				border-style: ridge;
				border-width: 4px;
				width:640px;
				margin:14px auto;
			}
			.names {
				font-weight:bold;
				width:600px;
				padding:20px;
				margin:0 auto;
			}
			.names:nth-child(even) {
				background-color:#<?php echo $c_b;?>;
			}
			.names:nth-child(odd) {
				background-color:#<?php echo $c_a;?>;
			}
			a:link, a:visited, a:active {
				color:#000000;
				background-color:#cc6ffe;
			}
			a:hover {
				color:#cc6ffe;
				background-color:#000000;
			}
		</style>
	</head>
	<body>
		<div class="wew header" >
			<?php echo $descript; ?>
		</div>
		<div class="wew">
			<?php
				foreach($resuls as $ka_moan) {
					echo('<div class="names">' . htmlentities($ka_moan) . "</div>\n");
				}
			?>
		</div>
		<div class="wew" style="border-color:#00ffff;">
			<p>nice thanks</p>
			<p><a href="https://paypal.me/laanemae/420">donate to the writer</a></p>
		</div>
	</body>
</html>
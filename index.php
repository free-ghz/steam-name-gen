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

	for ($i = 0; $i < 14; $i++) {
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
	$c_wall = "CED0CE";
	$header_wall = "F15025";
	$header_contrast ="FFFFFF";

	$c_border = "191919";
	$c_header_text = "191919";

	$c_a = "FFFFFF";
	$c_b = "E6E8E6";

	$c_text = "191919";
?>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>name for steam</title>
		<style type="text/css">
			html, body {
				margin: 0;
				margin: none;
				padding: 0;
				padding: none;
			}

			body {
				background-color:#<?php echo $c_wall;?>;
				background-attachment: fixed;
				color:#191919;
				font-family: arial, helvetica, monospace;
				font-size:15px;
				font-weight: bold;
				text-align:center;
			}

			.left {
				float:left;
			}
			.right {
				float:right;
			}
			.left, .right {
				width:50%;
			}

			.orange {
				background-color:#<?php echo $header_wall; ?>;
				color:#<?php echo $header_contrast; ?>;
			}
			.wew {
				border-style: ridge;
				border-width: 4px;
				margin:10px;
				padding:20px;
			}

			.presentation {
				color:#<?php echo $c_text;?>;
				border-color:#<?php echo $c_border;?>;
			}
			.suggestion {
				background-color:#<?php echo $c_border; ?>;
				color:#<?php echo $c_wall;?>;
				border-color:#<?php echo $c_wall;?>;
			}
			.names {
				font-weight:bold;
				padding:20px;
				margin:0 auto;
			}
			.names:nth-child(even) {
				background-color:#<?php echo $c_b;?>;
			}
			.names:nth-child(odd) {
				background-color:#<?php echo $c_a;?>;
			}

			td {
				padding: 8px;
			}

			textarea {
				width: 100%;
				min-height:200px;
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
		<div class="wew orange" >
			<?php echo $descript; ?>
		</div>

		<div class="right">

			<img src="moan.png" class="logo" alt="old vertigo was better" />

			<div class="wew">
				<form action="complaints.php" method="post" accept-charset="UTF-8">
					<table>
						<tr>
							<td class="orange">Do you have names to donate to the cause?</td>
							<td>You can add them here, free of charge, one name per line. As a security measure, please type the name of the blue hedgehog in the other box.</td>
						</tr>
						<tr>
							<td colspan="2">
								<textarea name="area" placeholder="olofmeister
fatal1ty
idiot_shrek"></textarea>
							</td>
						</tr>
						<tr>
							<td>Other box:</td>
							<td><input type="text" name="idiot" /></td>
						</tr>
						<tr>
							<td colspan="2">
								~
							</td>
						</tr>
						<tr>
							<td></td>
							<td><input type="submit" />
						</tr>
					</table>
				</form>
			</div>

			<div class="wew presentation">
				<p>nice thanks</p>
				<p><a href="https://paypal.me/laanemae/420">donate to the writer</a></p>
			</div>

		</div>

		<div class="left">
			<div class="wew">
				<?php
					foreach($resuls as $ka_moan) {
						echo('<div class="names">' . htmlentities($ka_moan) . "</div>\n");
					}
				?>
			</div>
		</div>

	</body>
</html>
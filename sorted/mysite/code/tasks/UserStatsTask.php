<?php 

class UserStatsTask extends BuildTask
{

	public function run($request)
  {
  	echo "User Stats Task Starting ------ ".PHP_EOL;

  	$sql_active_users = "SELECT count(*)
			FROM Member
			WHERE LastVisited > NOW() - INTERVAL 140 DAY
			order by LastVisited;";


		$activeUsers = $this->queryCount($sql_active_users);

		echo "Active users in the last 140days: ".$activeUsers.PHP_EOL;

		 $sql_active_users_calc = "SELECT count(*)
			FROM Member 
			INNER JOIN (
			SELECT
				x.MemberID,
				count(x.MemberID) as Total
			FROM
				(
					SELECT DISTINCT
						c.MemberID,
						c.CalcID
					FROM
						CalcData c
				) x
			GROUP BY x.MemberID
			HAVING Total > 2
			) y ON y.MemberID = Member.ID
			WHERE LastVisited > NOW() - INTERVAL 140 DAY
			ORDER BY Member.LastVisited DESC";

		
		$activeUsersCalc  = $this->queryCount($sql_active_users_calc);

		echo "Active users in the last 140days with 3+ calcs: ".$activeUsersCalc.PHP_EOL;

		echo "User Stats Task Finished ------ ".PHP_EOL;


    $email = new Email();

		//lorraine.guerin@saatchi.co.nz
		//glenn.martin@cffc.org.nz
		//ashlyn.pedersen@saatchi.co.nz

    $email->setTo('glenn.martin@cffc.org.nz', 'Glenn');
		$email->setTo('lorraine.guerin@saatchi.co.nz', 'Lorraine');
		$email->setTo('ashlyn.pedersen@saatchi.co.nz', 'Ashlyn');
		$email->setCC('paul.headington@saatchi.co.nz', 'Paul');
    $email->setFrom('Sorted.org.nz <no-reply@sorted.org.nz>');
    $email->setSubject("Active user report");

    $messageBody = "
        <p><strong>Date:</strong> ".date('Y-m-d')."</p>
        <p><strong>Active users in the last 140days:</strong> ".$activeUsers."</p>
        <p><strong>Active users in the last 140days with 3+ calcs:</strong> ".$activeUsersCalc."</p>
    ";
    $email->setBody($messageBody);
    $email->send();
  }

  private function queryCount($sql){
  	$result = DB::query($sql)->value();
  	return $result;
  }


}

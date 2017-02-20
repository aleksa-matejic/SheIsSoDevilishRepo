<?php
/**
 * Created by PhpStorm.
 * User: Aleksa
 * Date: 21-Sep-15
 * Time: 12:36 AM
 */

// <summary>
// Connection to database.
// </summary>
// <param>
// No param.
// </param>
// <returns>
// Return database connection.
// </returns>
function connect_to()
{
    if(!@$db = mysqli_connect("localhost", "root", "", "zavrsni_rad"))
    {
        echo 'Database connection error!';
        exit (1);
    }
    mysqli_set_charset($db, "UTF-8");
    return $db;
}

// <summary>
// Check that username and password match with some in database.
// </summary>
// <param>
// username and password.
// </param>
// <returns>
// Return true if exist and false if user does not exist.
// </returns>
function user_validation($username, $password)
{
    $username = strip_tags(addslashes($username));
    $password = strip_tags(addslashes($password));

    $db = connect_to();
    $sql = "SELECT * FROM users WHERE username = '{$username}' AND password = '{$password}'";
    $result = mysqli_query($db, $sql);
    if(mysqli_num_rows($result) > 0)
    {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['username'] = $row['username'];
        mysqli_close($db);
        return true;
    }
    mysqli_close($db);
    return false;
}

// <summary>
// Register user.
// </summary>
// <param>
// Text params firstName, lastName, email, username, password
// </param>
// <returns>
// Return true if registration passed and false if registration fails.
// </returns>
function user_registration($firstName, $lastName, $email, $username, $password)
{
    $firstName = strip_tags(addslashes($firstName));
    $lastName = strip_tags(addslashes($lastName));
    $email = strip_tags(addslashes($email));
    $username = strip_tags(addslashes($username));
    $password = strip_tags(addslashes($password));

    $db = connect_to();
    $sql = "INSERT INTO users (firstName, lastName, email, username, password) VALUES( '{$firstName}', '{$lastName}', '{$email}', '{$username}', '{$password}' )";
    if(mysqli_query($db, $sql))
    {
        $_SESSION['username'] = $username;
        mysqli_close($db);
        return true;
    }
    mysqli_close($db);
    return false;
}

// <summary>
// Set all users information in session.
// </summary>
// <param>
// Text param username
// </param>
// <returns>
// Return true if session is set, otherwise false.
// </returns>
function setUserFullSession($username)
{
    $username = strip_tags(addslashes($username));

    $db = connect_to();
    $sql = "SELECT * FROM users WHERE username = '{$username}'";
    $result = mysqli_query($db, $sql);
    if(mysqli_num_rows($result) > 0)
    {
        $row = mysqli_fetch_assoc($result);
        $_SESSION['firstName'] = $row['firstName'];
        $_SESSION['lastName'] = $row['lastName'];
        $_SESSION['email'] = $row['email'];
        $_SESSION['username'] = $row['username'];
        mysqli_close($db);
        return true;
    }
    mysqli_close($db);
    return false;
}

function showStatistics()
{
    $db = connect_to();
    $sql = "SELECT * FROM statistics ORDER BY score";
    $result = mysqli_query($db, $sql);
    $numRows = 0;
    while($row = mysqli_fetch_assoc($result))
    {
        echo "<tr>";

        echo "<td>";
        echo $row['player'];
        echo "</td>";

        echo "<td>";
        echo $row['avoidedWhiteClouds'];
        echo "</td>";

        echo "<td>";
        echo $row['avoidedBlackClouds'];
        echo "</td>";

        echo "<td>";
        echo $row['avoidedArrows'];
        echo "</td>";

        echo "<td>";
        echo $row['distance'];
        echo "</td>";

        echo "<td style='background-color: indianred'>";
        echo $row['score'];
        echo "</td>";

        echo "</tr>";
        $numRows++;
        if($numRows == 10){
            break;
        }
    }
}

function updateStatistics($player, $avoidedWhiteClouds, $avoidedBlackClouds, $avoidedArrows, $distance, $score)
{
    $db = connect_to();
    strip_tags(addslashes($player));
    strip_tags(addslashes($avoidedWhiteClouds));
    strip_tags(addslashes($avoidedBlackClouds));
    strip_tags(addslashes($avoidedArrows));
    strip_tags(addslashes($distance));
    strip_tags(addslashes($score));
    $sql = "INSERT INTO statistics (player, avoidedWhiteClouds, avoidedBlackClouds, avoidedArrows, distance, score) VALUES ( '{$player}', '{$avoidedWhiteClouds}', '{$avoidedBlackClouds}', '{$avoidedArrows}', '{$distance}', '{$score}' )";
    $result = mysqli_query($db, $sql);
    if($result > 0)
    {
        mysqli_close($db);
        return true;
    }
    mysqli_close($db);
    return false;
}
?>
<?php

class UserManager {

    private $bdd;

    public function __construct(MyPDO $bdd = null) {
        if ($bdd) {
            $this->bdd = $bdd;
        } else {
            $this->bdd = new MyPDO();
        }
    }


    public function get_user($id_user) {
        $query = "SELECT * 
                FROM " . MyPDO::DB_FLAG . "user
                WHERE id_user=? ";
        $ret = $this->bdd->query($query, $id_user);     
        return new User($ret[0]);
    }

    public function find_user($email,$pass){
        $query = "SELECT *
                FROM " . MyPDO::DB_FLAG . "user
                WHERE email=? and pass=? ";
        $ret = $this->bdd->query($query, $email,$pass);
        if($ret && isset($ret[0])){
            $query = "UPDATE " . MyPDO::DB_FLAG . "user set lastco=now() where id_user=?";
            $this->bdd->query($query, $ret[0]->id_user);
            return new User($ret[0]);
        }
        return false;
    }

    public function get_all_user($limit = null) {
        $query = "SELECT *
                FROM " . MyPDO::DB_FLAG . "user
                ";
        if (is_int($limit)) {
            $query.=" LIMIT 0, $limit";
        }
        $ret = $this->bdd->query($query);

        $ret_obj = array();
        for ($i = 0; $i < count($ret); $i++) {
            $user = new User($ret[$i]);
            array_push($ret_obj, $user);
        }
        return $ret_obj;
    }

    public function set_user(User $c) {
        $query = "INSERT INTO " . MyPDO::DB_FLAG . "user (pseudo, pass, email, valide,creato, lastco)
                VALUES(?,?,?,?,?,?)";
        $this->bdd->query($query, $c->get_pseudo(), $c->get_pass(), $c->get_email(), $c->get_valide(), $c->get_creato(), $c->get_lastco());
        return $this->bdd->lastInsertId();
    }

    public function set_sprites($id_user, $ids_sprite) {
        if (!is_array($ids_sprite))
            return false;
        $query = "INSERT INTO " . MyPDO::DB_FLAG . "sprite (id_orientation, id_user)
                 VALUES(?,?)";
        foreach ($ids_sprite as $id_sprite) {
            $this->bdd->query($query, $id_sprite, $id_user);
        }
    }

    public function get_sprites($id_user) {
        $query = "SELECT id_sprite, repertoire, nom_sprite, creato
            FROM " . MyPDO::DB_FLAG . "sprite
            WHERE id_user=?";
        return $this->bdd->query($query, $id_user);
    }


}

?>
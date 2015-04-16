<?php

class SpriteManager {

    private $bdd;

    public function __construct(MyPDO $bdd = null) {
        if ($bdd) {
            $this->bdd = $bdd;
        } else {
            $this->bdd = new MyPDO();
        }
    }

    public function get_sprite($id_sprite) {
        $query = "SELECT * 
                FROM " . MyPDO::DB_FLAG . "sprite
                WHERE id_sprite=? ";
        $ret = $this->bdd->query($query, $id_sprite);     
        return new Sprite($ret[0]);
    }

    public function get_all_sprite($limit = null) {
        global $USER;
        $query = "SELECT *
                FROM " . MyPDO::DB_FLAG . "sprite
                WHERE id_user = ?
                ";
        if (is_int($limit)) {
            $query.=" LIMIT 0, $limit";
        }
        $ret = $this->bdd->query($query,$USER->get_id_user());

        $ret_obj = array();
        for ($i = 0; $i < count($ret); $i++) {
            $sprite = new Sprite($ret[$i]);
            array_push($ret_obj, $sprite);
        }
        return $ret_obj;
    }

    public function set_sprite(Sprite $c) {
        $query = "INSERT INTO " . MyPDO::DB_FLAG . "sprite (nom, creato, id_user)
                VALUES(?,?,?)";
        $this->bdd->query($query, $c->get_nom(), $c->get_creato(), $c->get_id_user());
        return $this->bdd->lastInsertId();
    }

    public function list_configsprite(){
        $query = "SELECT *
                FROM " . MyPDO::DB_FLAG . "configsprite";
        $ret = $this->bdd->query($query);
        return $ret;
    }

    public function set_sprite_configsprite($id_sprite,$id_configsprite, $num_case, $width, $height, $posX, $posY){

        $query = "INSERT INTO " . MyPDO::DB_FLAG . "sprite_configsprite (id_sprite,id_configsprite, num_case,  width, height, posX, posY) VALUES(?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE width=?, height=?, posX=?, posY=?";
        $ret = $this->bdd->query($query,$id_sprite,$id_configsprite, $num_case, $width, $height, $posX, $posY, $width, $height, $posX, $posY);
        return $this->bdd->lastInsertId();
    }

}

?>
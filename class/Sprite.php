<?php

class Sprite {

    private $id_sprite;
    private $nom;
    private $id_user;
    private $creato;
    private $user;
    private $manager;

    

    public function __construct($o = null) {
        if ($o) {
            $this->hydrate($o);
        }
        $this->manager = new SpriteManager();

    }

    private function hydrate($o) {
        $this->set_id_sprite($o->id_sprite);
        $this->set_nom($o->nom);
        $this->set_creato($o->creato);
        $this->set_user($o->id_user);
    }
    
    public function set_creato($creato){
        $this->creato = $creato;
    }
    
    public function get_creato(){
        return $this->creato;
    }


    public function set_nom($nom){
        $this->nom = $nom;
    }
    
    public function get_nom(){
        return $this->nom;
    }

    public function get_pass() {
        return $this->pass;
    }

    public function set_pass($pass) {
        $this->pass = $pass;
    }

    public function get_id_sprite() {
        return $this->id_sprite;
    }

    public function set_id_sprite($id_sprite) {
        $this->id_sprite = $id_sprite;
    }

    public function get_user() {
        return $this->user;
    }
    public function get_id_user() {
        return $this->id_user;
    }
    public function set_user($id_user) {
        $this->id_user= $id_user;
        $userM = new UserManager();
        $this->user = $userM->get_user($id_user);
    }


    public function save(){
        return $this->manager->set_sprite($this);
    }

}

?>
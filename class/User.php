<?php

class User {

    private $id_user;
    private $pseudo;
    private $email;
    private $pass;
    private $valide;
    private $creato;
    private $lastco;
    private $manager;
    private $crypt;
    

    public function __construct($o = null) {
        $this->crypt = new Crypt();
        if ($o) {
            $this->hydrate($o);
        }
        $this->manager = new UserManager();

    }

    private function hydrate($o) {
        $this->set_id_user($o->id_user);
        $this->set_pseudo($o->pseudo);
        $this->set_email($o->email);
        $this->set_pass($o->pass);
        $this->set_valide($o->valide);
        $this->set_creato($o->creato);
        $this->set_lastco($o->lastco);
    }
    
    public function set_creato($creato){
        $this->creato = $creato;
    }
    
    public function get_creato(){
        return $this->creato;
    }

    public function set_lastco($lastco){
        $this->creato = $lastco;
    }

    public function get_lastco(){
        return $this->lastco;
    }

    public function set_valide($valide){
        $this->valide = $valide;
    }
    
    public function get_valide(){
        return $this->valide;
    }

    public function get_pass() {
        return $this->pass;
    }

    public function set_pass($pass) {
        $this->pass = $pass;
    }

    public function get_id_user() {
        return $this->id_user;
    }

    public function set_id_user($id_user) {
        $this->id_user = $id_user;
    }

    public function get_pseudo() {
        return $this->pseudo;
    }

    public function set_pseudo($pseudo) {
        $this->pseudo = $pseudo;
    }

    public function get_email() {
        return $this->email;
    }

    public function set_email($email) {
        $this->email = $email;
    }

    public function get_sprites() {
        return $this->manager->get_sprites($this->id_user);
    }

    public function save(){
        return $this->manager->set_user($this);
    }

}

?>
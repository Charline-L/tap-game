# Rendu Exercice MEAN - ECV Digital


> Code réalisé à partir du boilerplate de Julien Noyer


##### notes

Concernant le boilerplate je l'ai modifié.
J'ai eu du mal à me l'approrié et j'ai donc préféré organiser mon code comme je suis plus à l'aise. 
Je suis donc parti sur une structure orientée micro service et j'ai séparé le serveur du front. 

- Pour ajuster la commande npm j'ai utilisé le mode concurrently pour pouvoir en lancer plusieurs en même temps et que cela soit clair dans la console.
- J'ai aussi enlever l'étape de mail vuque cette dernière n'était pas demandé, j'ai juste fait une vérificationde mail avec le package email-validator.
- Et vu que j'ai changé la strucutre j'ai donc configuré les CORS. 


##### pour lancer le projet


1. Renseigner son ip dans le package.json dans la command angular

2. Renseigner le fichier env rappels des valeurs attendues : 
    - CLIENT : adresse ip + port sur laquelle l'app angular va tourner
    - PORT : serveur 
    - MONGO_URL
    - COOKIE_NAME
    - COOKIE_SECRET
    - JWT_SECRET
    - CRYPTO_KEY
    - MAILER_HOST
    - MAILER_USER
    - MAILER_PASS
    - MAILER_SENDER
    - MAILER_SUBJECT
    - MAILER_LINK

3. Lancer script

```
npm start
```


##### todo vrac


- [x] Intégration du design (non-noté)
- [x] Création du serveur
- [x] Création des routes API connectées MongoDB
- [x] Login
- [x] Register
- [x] Vérifier que le mail est valide
- [x] Profil
- [x] Enregistrer un jeu
- [x] Tous les scores
- [x] Trier les scores
- [x] Populate des scores
- [x] Création du client Angular et connexion avec les routes API
- [x] Login Success
- [x] Login Error
- [x] Register Success
- [x] Retour vers login 
- [x] Reset du form register
- [x] Register Error
- [x] Me
- [x] Scores
- [x] Header change nav en fonction de la page présente
- [x] Lougout supprimer le token d'accès - route api ? 
- [x] Ajouter le nom dans la page me
- [x] Erreur compilation Link Model ? 
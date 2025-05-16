# Cahier des charges

## Contexte

Dans le cadre des formations Simplon, les apprenants travaillent en groupe. La constitution de ces groupes est une tâche complexe et ingrate. Si les premiers groupes sont assez faciles à former, il devient rapidement difficile de se rappeler qui a déjà été avec qui, afin d’éviter la création de groupes identiques ou trop disparates.

Pour pallier ce problème, Simplon commande une application de création de groupes. Cette application devra prendre en compte plusieurs paramètres et surtout conserver un historique des groupes déjà formés, afin d’éviter de reproduire les mêmes compositions.

Le présent cahier des charges détaille les fonctionnalités attendues pour une première version dynamique, animée en JavaScript. Certaines fonctionnalités, comme la connexion, seront simulées.

---

## 1. Accès à l’application

- Le site disposera d’une page vitrine présentant ses fonctionnalités aux utilisateurs anonymes.
- Il comportera également les pages légales obligatoires.
- Dans l’en-tête (header), deux boutons seront présents :  
  - Un pour s’inscrire,  
  - Un autre pour se connecter.
- Le site sera conçu selon une approche **mobile first**.
- La mise en forme s’adaptera aux mobiles, tablettes et ordinateurs, avec des présentations éventuellement différentes, à condition que les informations restent facilement accessibles.

---

## 2. Fonctionnalités

### A) Inscription / connexion

- L’accès aux fonctionnalités est conditionné à la connexion.
- Pour se connecter, l’utilisateur doit posséder un compte.
- Dans cette version de démonstration, l’inscription n’est pas implémentée.
- La connexion sera simulée en JavaScript :  
  Les identifiants seront stockés dans un fichier JSON. Les données saisies par l’utilisateur seront comparées à celles du JSON.  
  (Cette méthode est uniquement démonstrative et ne respecte pas les bonnes pratiques de sécurité.)
- Après connexion, l’utilisateur pourra accéder à toutes les fonctionnalités du site, à savoir :  
  - Retrouver, créer, modifier et supprimer des listes de personnes,  
  - Dans chaque liste, retrouver, ajouter, modifier, supprimer des personnes,  
  - Pour chaque liste, retrouver et créer des groupes.

### B) Listes

- Chaque liste doit avoir un nom unique par utilisateur.  
  (Deux utilisateurs peuvent avoir une liste nommée « CDA », mais un même utilisateur ne peut pas avoir deux listes avec le même nom.)
- La page d’affichage des listes affichera, pour chaque liste :  
  - Son nom,  
  - Le nombre de personnes qu’elle contient,  
  - Le nombre de tirages (créations de groupes) réalisés avec cette liste.

### C) Personnes

Chaque personne dans une liste sera caractérisée par les champs suivants :

| Champ               | Type          | Contraintes                      |
|---------------------|---------------|---------------------------------|
| Nom                 | Chaîne (String) | Obligatoire, longueur entre 3 et 50 caractères |
| Genre               | Chaîne (String) | Obligatoire, sélection parmi : masculin, féminin, ne se prononce pas |
| Aisance en Français  | Entier (Integer) | Obligatoire, valeur entre 1 et 4 |
| Ancien DWWM         | Booléen        | Obligatoire                      |
| Niveau technique    | Entier (Integer) | Obligatoire, valeur entre 1 et 4 |
| Profil              | Chaîne (String) | Obligatoire, sélection parmi : timide, réservé, à l’aise |
| Âge                 | Entier (Integer) |                                 |

### D) Groupes

- Lors de la création aléatoire de groupes, l’utilisateur définira le nombre de groupes souhaités (entier entre 1 et 100).
- L’utilisateur devra nommer chaque groupe avant de poursuivre.
- L’utilisateur pourra cocher un ou plusieurs critères pour mixer les groupes de manière équilibrée, par exemple :  
  - Mixer les anciens DWWM,  
  - Mixer les âges,  
  - Etc.
- La création aléatoire devra prendre en compte l’historique des groupes pour éviter de reproduire les mêmes compositions.
- Il sera possible de relancer la génération aléatoire si le résultat n’est pas satisfaisant.
- L’utilisateur pourra modifier manuellement les groupes par glisser-déposer des personnes d’un groupe à un autre.
- Une fois validé, le tirage est enregistré et ne peut plus être modifié ou supprimé.

### E) Compte utilisateur

- L’utilisateur pourra modifier ou supprimer son compte.
- Tous les 13 mois, l’utilisateur sera invité à réaccepter les conditions générales d’utilisation et la politique de cookies (si applicable).

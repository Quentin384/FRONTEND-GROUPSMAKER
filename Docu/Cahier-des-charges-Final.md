V0 - Designez et intégrez le visuel d'une application de création de groupes 

Votre client souhaite que vous lui réalisiez une application, en fonction du cahier des 
charges qu'il vous donne. Cette application permet de créer des groupes à partir d'une 
liste de personnes et de critères définis pour chacune d'entre elles. Les tirages au sort 
pour concevoir les groupes seront influencés par les critères choisis et l'historique des 
groupes déjà créés. Lors de ce premier travail ensemble, votre client vous demande 
juste de faire une première maquette ordinateur uniquement, et de l'intégrer en HTML 
CSS. Il a besoin de voir à quoi pourrait ressembler l'application avant de se lancer plus 
en avant avec vous. 

Modalités pédagogiques 
Travail en groupes de 3 ou 4. 
7 demies-journées du 03/04 au 11/04. 

1. Maquettage 

Vous devrez : 
• Concevoir la charte graphique, ainsi que regrouper tous les assets pour l'identité 
visuelle 
• Créer avec figma des composants réutilisables 
• Réaliser le maquettage uniquement ordinateur 
• Prototyper votre maquette 

2. Intégration 

Vous devrez : 
• Préparer votre ordinateur 
• Créer un dépôt git et le cloner 
• Paramétrer un .editorconfig 
• Intégration HTML + CSS 
• Architecture propre (dossiers, nommage, …) 
• Hover + animations 

3. Travail en équipe 

Vous devrez : 
• Travailler avec git 
• Gérer des tickets 
• Rédiger un readme 
• Documenter le travail réalisé, le cadre, la demande, les contraintes, … 
• Déploiement en continu de votre travail avec gitlab pages 

EN OPTION : 
• Faites la version Mobile 
• Faites une version Tablette 
• Si vous voulez aller plus loin, vous pouvez bien sûr ajouter du JS pour animer des 
popup, des éléments des pages, ... 

Livrables 
Git avec : - Maquette - Lien du site en prod - readme - tableau des tâches à jour - gitflow 
riche et judicieux 

V1 - Rendre l'application Création de Groupes fonctionnelle en JS 

Votre client a apprécié travailler avec vous, et vous demande de rendre fonctionnel le 
site que vous avez déjà conçu. Il n'a pas besoin pour l'instant de stocker les infos en 
base de données, et ne veut pas suivre les utilisateurs, pour respecter la RGPD. Vous 
ferez donc un site entièrement animé en JS, construit en POO, qui permettra de 
retrouver les fonctionnalités principales du projet. Tout est détaillé dans le cahier des 
charges associé au brief. Vous êtes invités à reprendre, à vous appuyer ou vous inspirer 
du travail précédent (V0), et poursuivre à partir de ce qui a été fait, même si les groupes 
ne sont pas identiques. 

Modalités pédagogiques 
Travail en groupes de 3 ou 4. 
9 demies-journées du 28/04 au 20/05. 

1. Maquettage 

Vous devrez : 
• Maquettes responsive (ajouter mobile et tablette) 
• Reprendre et compléter la maquette en fonction du nouveau cahier des charges 
• Prototypage obligatoire 

2. Intégration 

Vous devrez : 
• Préparer votre ordinateur 
• Créer un dépôt git et le cloner 
• Paramétrer un .editorconfig 
• Intégration HTML + CSS 
• Architecture propre (dossiers, nommage, …) 
• Utiliser TypeScript et le compiler 
• Créer des composants en POO 
• Penser mobile first 

3. Tester 

Vous devrez : 
• Installer Vitest/Jest 
• Créer des tests unitaires 

4. Composants métiers 

Vous devrez : 
• Génération aléatoire des groupes 
• Prise en compte des critères choisis 
• Modification des groupes à la main après tirage en glissé-déposé 

5. Travail en équipe 

Vous devrez : 
• Documenter le déploiement, le passage des tests, le travail sur les branches, … 
• Intégration et Déploiement en continu de votre travail avec gitlab pages, 
exécutions des tests automatisés 
• Travailler avec Git, penser plusieurs branches 
• Gérer des tickets 
• Rédiger un readme 

Livrables 
Git avec : - Maquette - Lien du site en prod - readme - tableau des tâches à jour - gitflow 
riche et judicieux Présentation orale (10 min) 
V2 - Application Création de Groupes en MVC 

Votre client a été très satisfait de votre collaboration commune, et vu les résultats de 
votre V1, il vous commande enfin l'application complète, bravo ! Il vous a fourni un 
cahier des charges complété, avec des éléments en plus. Vous devrez mettre en place 
un site complet, en ajoutant un backend et une gestion des données en base 
relationnelle. 

Modalités pédagogiques 
Travail en SOLO. 
10 demies-journées du 02/06 au 11/06. 

1. Maquettage 

Vous devrez : 
• Reprendre les Maquettes responsive (complétées avec les nouveautés 
demandées par le client 
• Prototyper entièrement la maquette 

2. Intégration 

Vous devrez : 
• Intégrer le front en pensant SPA (single page application). Utilisation de Fetch 
pour appeler l'API back 
• Créer des composants JS en POO 
• Prévoir des toasts pour toutes les actions (succès, échec, info, ...) 

3. Composants métiers 

Vous devrez : 
• Authentification sécurisée 
• Différents CRUD gérés 
• Logique métier écrite en Services 
• Envoi de mails 

4. Base de données 

Vous devrez : 
• Créer une BDD MySQL 
• Concevoir le MCD & MLD 
• Éditer le script SQL 
• Créer les repositories et la classe Database pour se connecter à la BDD 

5. Tests 

Vous devrez : 
• Tester en unitaire en back comme en front (vitest, phpunit, Junit) 
• Automatiser les tests 

6. Travail en équipe 

Vous devrez : 
• Documenter le déploiement, le passage des tests, le travail sur les branches, la 
mise en place de la BDD … 
• Intégration et Déploiement en continu avec passages de tests, et conformité des 
standards de code (linter, grumphp, …) 
• Travailler avec Git, penser plusieurs branches 
• Gérer des tickets 
• Rédiger un readme 
• Rédiger un Wiki pour toutes les fonctions très utilisées, les choix techniques… 

Livrables 
Git avec : - Maquette - MCD - Lien du site en prod - readme - wiki - tableau des tâches à 
jour - gitflow riche et judicieux Présentation orale (20min) 

V3 - Hackaton sur l'application de Création de Groupes 

Votre client a trouvé votre travail super, et pour voit qu'il y a de l'avenir pour ce site. Il a 
envie de le faire grossir, et souhaite vous faire rencontrer une autre équipe de dev avec 
qui il a aussi l'habitude de travailler pour conjuguer vos forces, et sortir ensemble une 
application digne des géants du web !! Pour ce faire, il vous fournit un nouveau cahier 
des charges, complété. Vous sentez que votre version précédente, même si elle 
fonctionne parfaitement, ne supportera pas un changement d'échelle en terme 
d'utilisation. De plus, l'autre équipe n'a pas la même stack technique que vous. Vous 
choisissez donc de repartir de zéro en utilisant des frameworks pour accélérer le 
développement et rendre le projet plus facilement maintenable et modulable. 

Modalités pédagogiques 
Travail en groupes de 6 (3 de chaque promo). 
15 demies-journées du 23/06 au 04/07. 

1. Maquettage 

Vous devrez : 
• Vous reprenez une maquette réalisée par le passé, et la mettrez au goût du jour, 
sans tout refaire. 

2. Intégration 

Vous devrez : 
• Réaliser le front-end avec le framework de votre choix 
• Prévoir des toasts pour toutes les actions (succès, échec, info, ...) 

3. Composants métiers 

Vous devrez : 
• Réaliser le back-end avec le framework de votre choix 
• Différents CRUD gérés 
• Logique métier écrite en Services 
• Envoi de mails 
• Sécurisation des routes et API 
• Gestion des rôles 

4. Base de données 

Vous devrez : 
• Créer deux BDD, une qui contiendra les informations de connexion (NOSQL) et 
une autre qui contiendra les données de l'application (SQL) 
• Concevoir le MCD & MLD 
• Créer les repositories et la classe Database pour se connecter aux BDD 

5. Tests 

Vous devrez : 
• Tester en unitaire en back comme en front (vitest, phpunit, Junit) 
• Automatiser les tests 
• Tester également en E2E au moins une fonctionnalité phare 

6. Travail en équipe 

Vous devrez : 
• Documenter le déploiement, le passage des tests, le travail sur les branches, la 
mise en place de la BDD … 
• Travailler avec Git, penser plusieurs branches 
• Gérer des tickets 
• Rédiger un readme 
• Rédiger un Wiki pour toutes les fonctions très utilisées, les choix techniques… 

7. Déploiement 

Vous devrez : 
• Intégrer et Déployer en continu avec passages de tests, et conformité des 
standards de code (linter, grumphp, …) 
• Avoir deux instances en ligne, une de tests et l'autre de prod. 
• Le déploiement de l'instance de test à celle de prod sera déclenché 
manuellement. 
• Le déploiement en prod ne devra pas perdre les données de production. 

Livrables 
Git avec : - Maquette - MCD - Lien du site en prod - readme - wiki - tableau des tâches à 
jour - gitflow riche et judicieux Présentation orale (30 minutes)
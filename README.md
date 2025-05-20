# 🎯 Application de Création de Groupes – Projet Fullstack Angular + Spring Boot

Bienvenue dans ce projet de création dynamique de groupes d’apprenants Simplon, développé dans le cadre de ma formation en développement Fullstack.  
Cette application vise à constituer des groupes équilibrés selon des critères personnalisés, tout en assurant une bonne expérience utilisateur sur tous les supports.

---

## 🚀 Découvrez et testez l’application en ligne !

L’application est déployée et accessible immédiatement.  
Cliquez simplement sur le lien ci-dessous pour la tester en conditions réelles :  

👉 [Tester l’application maintenant](https://mon-generateur-groupes.netlify.app)  

N’hésitez pas à explorer ses fonctionnalités et à me faire part de vos retours.

---

## 🚀 Présentation

Cette application web permet de créer intelligemment des groupes d’apprenants tout en évitant la répétition des compositions précédentes.  
Elle prend en compte plusieurs critères tels que :

- Âge  
- Ancienneté  
- Genre  
- Profil  
- Niveau  

Pensée **mobile-first**, elle s’adapte aux smartphones, tablettes et ordinateurs pour une utilisation fluide dans un contexte pédagogique.

---

## 📱 Responsive Design

L’interface est conçue en **mobile-first** : elle s’adapte automatiquement aux différentes tailles d’écran (smartphone, tablette, desktop), assurant accessibilité et lisibilité à tout moment.

---

## 🧩 Fonctionnalités

- 🎨 UI responsive desktop/tablette/mobile (mobile-first)  
- 📋 Gestion dynamique d’une liste d’apprenants avec critères personnalisés  
- 🧠 Génération aléatoire de groupes équilibrés selon critères et historique  
- 🔁 Historique des groupes pour éviter répétitions  
- ✋ Réorganisation manuelle des groupes via drag & drop Angular CDK  
- 🔐 Authentification sécurisée (V2+) avec Spring Security  
- 🧰 CRUD complet (apprenants, groupes, utilisateurs) via API REST  
- ✉️ Notifications par mail (V2+)  
- 🛡️ Sécurisation des routes Angular et API backend avec gestion des rôles  
- 🧪 Tests unitaires (Vitest / Jest) et tests backend (JUnit, Mockito)  
- 🚀 Déploiement continu manuel via Netlify (branche **main**)

---

## 🛠️ Stack technique

| Frontend                | Backend                          | Base de données        | Tests                             | Outils                       |
|------------------------|---------------------------------|------------------------|----------------------------------|-----------------------------|
| Angular 19 + TypeScript | Java 17+ Spring Boot 3 (REST API) | PostgreSQL              | Vitest / Jest (unitaires front)<br>JUnit, Mockito (backend) | Git / GitHub<br>Netlify (déploiement)<br>Angular CLI<br>Linter, Prettier |

---

## 🚀 Déploiement

L’application est déployée sur Netlify via un lien public.  
Le déploiement est réalisé manuellement depuis la branche **main** du dépôt GitHub, synchronisée avec Netlify.  

Une automatisation via CI/CD (GitHub Actions) pourra être envisagée ultérieurement.

---

## 📌 Auteur

👨‍💻 **Quentin** – Étudiant développeur Fullstack Java / Angular  
🎓 Projet réalisé en solo dans le cadre de la formation Simplon  
🎯 Rôle principal : développement complet du projet, incluant  
- la logique métier (génération de groupes, critères)  
- l’architecture frontend et backend  
- l’intégration responsive avec Angular 19  

📆 Projet solo – Mai 2025

---

## 📸 Captures d'écran

Voici quelques aperçus de l’application en fonctionnement :

![Capture écran 1](./Docu/Capture/Capture%20d'écran%202025-05-20%20102802.png)  
*Vue générale de la création de groupes*

![Capture écran 2](./Docu/Capture/Capture%20d'écran%202025-05-20%20144658.png)  
*Interface responsive sur tablette*

![Capture écran 3](./Docu/Capture/Capture%20d'écran%202025-05-20%20102811.png)  
*Gestion des critères personnalisés*



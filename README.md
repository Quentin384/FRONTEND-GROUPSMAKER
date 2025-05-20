# 🎯 Application de Création de Groupes – Projet Fullstack Angular + Spring Boot

Bienvenue dans ce projet de création dynamique de groupes d’apprenants Simplon, développé dans le cadre de ma formation en développement Fullstack.  
Cette application vise à constituer des groupes équilibrés selon des critères personnalisés, tout en assurant une bonne expérience utilisateur sur tous les supports.

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

## 📚 Objectif pédagogique

Projet structuré en 4 versions évolutives, avec montée en compétences sur la conception UI, l’intégration Angular, le développement métier en POO, la communication avec une API backend, la gestion de base de données, les tests et le déploiement continu.

| Version | Description                                         |
|---------|---------------------------------------------------|
| **V0**  | Maquette Figma desktop + intégration HTML/CSS statique (15 mai)        |
| **V1**  | Application dynamique Angular (POO, TypeScript), front seul (16-20 mai) |
| **V2**  | Application Angular avec backend Java Spring Boot, base de données PostgreSQL (21-30 mai) |
| **V3**  | Fullstack évolutif et scalable avec architecture robuste et tests avancés (1-10 juin) |

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
- 🚀 Déploiement continu avec GitHub Actions CI/CD  

---

## 🛠️ Stack technique

| Frontend                | Backend                          | Base de données        | Tests                             | Outils                       |
|------------------------|---------------------------------|------------------------|----------------------------------|-----------------------------|
| Angular 19 + TypeScript | Java 17+ Spring Boot 3 (REST API) | PostgreSQL              | Vitest / Jest (unitaires front)<br>JUnit, Mockito (backend) | Git / GitHub<br>CI/CD (GitHub Actions)<br>Angular CLI<br>Linter, Prettier |

---

## 📐 Architecture technique

- **Architecture REST API** avec backend Spring Boot  
- Programmation orientée objet (POO) dans Angular et Java  
- Communication via appels HTTP (Angular HttpClient) vers API REST sécurisée  
- Services Angular pour la logique métier côté client  
- Utilisation Angular CDK pour drag & drop  
- Maquettes et styles responsive, animations CSS, toasts Angular Material  
- Séparation claire des responsabilités (composants, services, modèles, routes)  

---

## 🚀 Déploiement

- Intégration continue et déploiement continu (CI/CD) avec GitHub Actions  
- Environnements séparés : **test** et **production**  
- Déploiement manuel du test vers la production  
- Persistance des données garantie via PostgreSQL  

---

## 📆 Organisation du projet

| Version | Dates           | Modalité                  |
|---------|-----------------|---------------------------|
| V0      | 15 mai          | Solo                      |
| V1      | 16 – 20 mai     | Solo, Angular front seul  |
| V2      | 21 – 30 mai     | Solo, Angular + Spring Boot backend, PostgreSQL |
| V3      | 1 – 10 juin     | Solo, fullstack évolutif et scalable |

---

## ✅ Livrables attendus

- Maquettes Figma responsives et prototypées  
- Code source Angular (frontend) et Java Spring Boot (backend)  
- README détaillé et technique  
- Wiki fonctionnel (V2+)  
- MCD, MLD, scripts SQL PostgreSQL  
- Tests unitaires et automatisés front & backend  
- Application déployée en ligne (test + prod)  
- Présentation orale selon versions (10 à 30 minutes)  

---

## 📌 Méthodologie & Outils

- Git structuré avec **Gitflow**  
- Gestion des tâches avec **GitHub issues**  
- Intégration continue avec exécution automatique des tests  
- Documentation via README + Wiki  
- Conventions strictes et outils de qualité (linter, formatter)  
- Architecture modulaire, maintenable et sécurisée  

---

## 📈 Perspectives d’évolution

- Mise en place d’une authentification OAuth2 / JWT avec Spring Security  
- WebSocket pour collaboration en temps réel sur les groupes  
- Gestion fine des droits utilisateurs (ACL)  
- Dashboard statistique et rapports  

---

## 📌 Auteur

👨‍💻 Quentin – Étudiant développeur Fullstack Java / Angular  
🎓 Projet réalisé dans le cadre de la formation Simplon  
📆 Projet en solo – Mai 2025  
🎯 Rôle principal : logique métier (génération de groupes, critères), POO, intégration responsive avec Angular 19

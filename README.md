# 🎯 Application de Création de Groupes – Projet Fullstack Angular

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

| Version | Description |
|---------|-------------|
| **V0**  | Maquette Figma desktop + intégration HTML/CSS statique |
| **V1**  | Application dynamique Angular (POO, TypeScript), front seul |
| **V2**  | Application Angular avec backend Node.js (API REST), base de données MySQL |
| **V3**  | Refonte fullstack Angular + backend moderne, évolutivité et scalabilité |

---

## 🧩 Fonctionnalités

- 🎨 UI responsive desktop/tablette/mobile (mobile-first)
- 📋 Gestion dynamique d’une liste d’apprenants avec critères personnalisés
- 🧠 Génération aléatoire de groupes équilibrés selon critères et historique
- 🔁 Historique des groupes pour éviter répétitions
- ✋ Réorganisation manuelle des groupes via drag & drop Angular CDK
- 🔐 Authentification sécurisée (V2+)
- 🧰 CRUD complet (apprenants, groupes, utilisateurs)
- ✉️ Notifications par mail (V2+)
- 🛡️ Sécurisation des routes Angular et API backend avec gestion des rôles
- ⚙️ Backend Node.js / Express, API REST, base MySQL
- 🧪 Tests unitaires (Vitest / Jest) et tests E2E (Cypress / Playwright)
- 🚀 Déploiement continu avec GitLab CI/CD

---

## 🛠️ Stack technique

| Frontend                | Backend                       | Base de données      | Tests                      | Outils                   |
|------------------------|------------------------------|----------------------|----------------------------|--------------------------|
| Angular 19 + TypeScript | Node.js + Express (TypeScript) | MySQL (relationnelle) | Vitest / Jest (unitaires)<br>Cypress / Playwright (E2E) | Git / GitLab<br>CI/CD<br>EditorConfig<br>Angular CLI<br>Linter / GrumJS |

---

## 📐 Architecture technique

- **Architecture MVC** avec Angular côté client (SPA)
- Programmation orientée objet (POO) dans tout le projet
- Communication via appels HTTP (fetch / Angular HttpClient) vers API REST Node.js
- Services Angular pour la logique métier
- Utilisation de Angular CDK pour le drag & drop
- Maquettes et styles responsive, animations CSS, toasts Angular Material
- Séparation claire des responsabilités (composants, services, modèles, routes)

---

## 🚀 Déploiement

- Intégration continue et déploiement continu (CI/CD) avec GitLab
- Environnements séparés : **test** et **production**
- Déploiement manuel du test vers la production
- Persistance des données garantie entre les déploiements

---

## 📆 Organisation du projet

| Version | Dates         | Modalité          |
|---------|---------------|-------------------|
| V0      | 03/04 – 11/04 | Solo              |
| V1      | 28/04 – 20/05 | Solo, Angular front uniquement |
| V2      | 02/06 – 11/06 | Solo, Angular + Node.js backend |
| V3      | 23/06 – 04/07 | Solo, fullstack Angular + backend, scalabilité |

---

## ✅ Livrables attendus

- Maquettes Figma responsives et prototypées
- Code source Angular (frontend) et Node.js (backend)
- README détaillé et technique
- Wiki fonctionnel (V2+)
- MCD, MLD, script SQL de la base
- Tests unitaires et E2E automatisés
- Application déployée en ligne (test + prod)
- Présentation orale selon versions (10 à 30 minutes)

---

## 📌 Méthodologie & Outils

- Git structuré avec **Gitflow**
- Gestion des tâches avec **GitLab issues**
- Intégration continue avec exécution automatique des tests
- Documentation via README + Wiki
- Conventions strictes et outils de qualité (linter, grumjs)
- Architecture modulaire et maintenable

---

## 📈 Perspectives d’évolution

- Mise en place d’une authentification OAuth2 / JWT
- WebSocket pour collaboration en temps réel sur les groupes
- Gestion fine des droits utilisateurs (ACL)
- Dashboard de statistiques sur les groupes formés

---

## 👨‍💻 Auteur

**Quentin**  
Développeur Fullstack Angular / Node.js  
Projet solo réalisé entre avril et juillet 2025 dans le cadre de la formation Simplon.  
Compétences clés : Angular 19, TypeScript, Node.js, MySQL, tests automatisés, CI/CD

---

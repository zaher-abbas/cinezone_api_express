```markdown
# CineZone API

Une API REST pour la gestion d'une base de données de films, développée avec Node.js, Express et MySQL.

## 🚀 Fonctionnalités

- Récupération de tous les films avec filtrage par note minimale et limitation
- Récupération d'un film par son ID
- Récupération des films par catégorie
- Ajout de nouveaux films
- Modification de films existants
- Suppression de films
- Tri automatique par titre ou note
- Creation des comptes d'utilisateurs.
- Connexion des utilisateurs.
- Affichage du profil de l'utilisateur connecté

## 📋 Prérequis

Avant d'installer ce projet, assurez-vous d'avoir :

- **Node.js** (version 18 ou supérieure)
- **npm** (gestionnaire de paquets Node.js, c'est inclus avec Node)
- **MySQL** (serveur base de données MySQL en fonctionnement)

## 🛠️ Installation

### 1. Cloner le projet
```

bash
git clone <url-du-repo>
cd express-mysql

```
### 2. Installer les dépendances
```

bash
npm install

```
### 3. Configuration de l'environnement

Créez un fichier `.env` à la racine du projet en vous basant sur `.env.example` :
```

env
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_NAME=cinezone_db
PORT=3000
JWT_SECRET=votre_code_secret_jwt

```
### 4. Créer la base de données

Créez une base de données MySQL avec les tables: `movie`, 'category', et 'user' :

```sql
CREATE DATABASE cinezone_db;

USE cinezone_db;

CREATE TABLE movie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    director VARCHAR(255) NOT NULL,
    release_year INT,
    rating DECIMAL(3,1),
    category_id INT
);

-- Exemple de données
INSERT INTO movie (title, director, release_year, rating, category_id) VALUES
('The Matrix', 'Lana Wachowski', 1999, 8.7, 1),
('Inception', 'Christopher Nolan', 2010, 8.8, 1),
('The Godfather', 'Francis Ford Coppola', 1972, 9.2, 2);
```

```


### 5. Lancer l'application

```shell script
npm start
```

L'API sera accessible sur `http://localhost:3000`

## 📚 Endpoints de l'API

### 🏠 Accueil

```
GET /
```

Retourne un message de bienvenue.

### 🎬 Endpoints Films

#### Récupérer tous les films

```
GET /movies
```

**Paramètres de requête optionnels :**

- `limit` : Limite le nombre de films retournés
- `min_rating` : Filtre les films avec une note supérieure ou égale

**Exemples :**

- `GET /movies` - Tous les films (triés par titre)
- `GET /movies?limit=5` - Les 5 premiers films (triés par titre)
- `GET /movies?min_rating=8.0` - Films avec une note ≥ 8.0 (triés par note décroissante)
- `GET /movies?limit=3&min_rating=7.5` - Les 3 meilleurs films avec une note ≥ 7.5

**Réponse :** `200 OK` avec la liste des films ou `404 Not Found`

#### Récupérer un film par ID

```
GET /movies/:id
```

**Réponse :** `200 OK` avec les détails du film ou `404 Not Found`

#### Récupérer les films par catégorie

```
GET /categories/:id/movies
```

**Réponse :** `200 OK` avec la liste des films de la catégorie ou `404 Not Found`

#### Ajouter un nouveau film

```
POST /movies
```

- **Description** : Créer un nouveau film
- **Authentification** : Requise (JWT)
- **Body** : Données du film (validées par movieValidator)
  **Corps de la requête :**

```json
{
  "title": "Titre du film",
  "director": "Nom du réalisateur",
  "release_year": 2023,
  "rating": 8.5,
  "category_id": 1
}
```

**Réponse :** `201 Created` ou `500 Internal Server Error`

#### Modifier un film existant

```
PUT /movies/:id
```

**Description** : Modifier un film existant

- **Paramètres** :
    - `id` : ID du film à modifier
- **Authentification** : Requise (JWT)
- **Body** : Données modifiées du film
  **Corps de la requête :**

```json
{
  "title": "Nouveau titre",
  "director": "Nouveau réalisateur",
  "release_year": 2024,
  "rating": 9.0,
  "category_id": 1
}
```

**Réponse :**

- `200 OK` - Film modifié avec succès
- `404 Not Found` - Film introuvable
- `500 Internal Server Error` - Erreur serveur

#### Supprimer un film

```
DELETE /movies/:id
```

**Réponse :**

- `204 No Content` - Film supprimé avec succès
- `404 Not Found` - Film introuvable
- `500 Internal Server Error` - Erreur serveur

---

### 👤 Endpoints Utilisateurs

#### POST `/users`

- **Description** : Créer un compte utilisateur
- **Body** :
  ```json
  {
    "name": "string (max 100 caractères)",
    "email": "string (format email valide, max 255 caractères)",
    "password": "string (min 8 caractères, max 255 caractères)"
  }
  ```
- **Authentification** : Non requise
- **Validation** : Email unique, format email valide

#### POST `/login`

- **Description** : Connexion utilisateur
- **Body** :
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Authentification** : Non requise
- **Réponse** : Cookie JWT (valide 24h)

#### GET `/profile`

- **Description** : Récupérer le profil de l'utilisateur connecté
- **Authentification** : Requise (JWT)
- **Réponse** :
  ```json
  {
    "name": "string",
    "email": "string"
  }
  ```

## 🔧 Scripts disponibles

- `npm start` : Démarre le serveur avec nodemon (redémarrage automatique)
- `npm test` : Lance les tests (non configuré actuellement)

## 📦 Technologies utilisées

- **Node.js 22.18.0** : Environnement d'exécution JavaScript
- **Express.js 5.1.0** : Framework web minimaliste
- **MySQL2 3.14.3** : Client MySQL pour Node.js
- **dotenv 17.2.1** : Gestion des variables d'environnement
- **nodemon 3.1.10** : Redémarrage automatique du serveur (développement)
- **jsonwebtoken** (v9.0.2) - Authentification par JWT
- **cookie-parser** (v1.4.7) - Parsing des cookies
- **express-validator** (v7.2.1) - Validation des données d'entrée
- **bcrypt** (v6.0.0) - Hashage des mots de passe

## 🔑 Authentification

L'API utilise JWT (JSON Web Tokens) pour l'authentification :

- **Connexion** : Endpoint `/login` retourne un cookie JWT
- **Durée** : Token valide pendant 24 heures
- **Storage** : Cookie HTTP-only
- **Protection** : Middleware `requireAuth` pour les endpoints protégés
- **Admin** : Middleware `requireAdminRole` pour les actions administrateur

## 🔐 Sécurité

- **Hashage des mots de passe** : bcrypt
- **Cookies sécurisés** : HTTP-only
- **Validation des entrées** : express-validator
- **Authentification** : JWT avec secret

## 🏗️ Structure du projet

```
express-mysql/
├── index.js              # Point d'entrée de l'application
├── MovieController.js    # Contrôleurs pour les films
├── database.js           # Configuration de la base de données
├── package.json          # Dépendances et scripts
├── .env                  # Variables d'environnement (à créer)
├── .env.example          # Exemple de configuration
├── .gitignore           # Fichiers ignorés par Git
└── README.md            # Documentation
```

## 🤝 Contribution

1. Forkez le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence ISC.

## ⚠️ Notes importantes

- Assurez-vous que votre serveur MySQL est démarré avant de lancer l'application
- Ne committez jamais le fichier `.env` dans votre repository
- Les erreurs 500 indiquent généralement un problème de connexion à la base de données

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le repository du projet.

```
Ce README.md fournit une documentation complète et professionnelle pour votre projet CineZone API, incluant l'installation, la configuration, tous les endpoints avec des exemples, et les informations techniques nécessaires pour les développeurs.
```

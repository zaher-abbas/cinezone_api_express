```markdown
# API Movies Express MySQL

Une API RESTful simple pour gérer une collection de films, construite avec Express.js et MySQL.

## 🚀 Technologies utilisées

- **Node.js** - Runtime JavaScript v22.18.0
- **Express.js 5.1.0** - Framework web
- **MySQL2 3.14.3** - Client MySQL pour Node.js
- **dotenv 17.2.1** - Gestion des variables d'environnement
- **nodemon 3.1.10** - Rechargement automatique en développement

## 📋 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MySQL](https://www.mysql.com/) ou [MariaDB](https://mariadb.org/)
- [npm](https://www.npmjs.com/) (généralement installé avec Node.js)

## ⚙️ Installation

### 1. Cloner le projet

```bash
git clone <url-du-repository>
cd express-mysql
```
```


### 2. Installer les dépendances

```shell script
npm install
```


### 3. Configuration de la base de données

#### Créer la base de données et les tables

```sql
-- Créer la base de données
CREATE DATABASE movies_db;
USE movies_db;

-- Créer la table des catégories
CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

-- Créer la table des films
CREATE TABLE movie (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    rating DECIMAL(3,1),
    category_id INT,
    release_year INT,
    FOREIGN KEY (category_id) REFERENCES category(id)
);

-- Insérer quelques données d'exemple
INSERT INTO category (name) VALUES 
('Action'), 
('Drama'), 
('Comedy'), 
('Horror');

INSERT INTO movie (title, rating, category_id, release_year) VALUES
('The Dark Knight', 9.0, 1, 2008),
('Pulp Fiction', 8.9, 2, 1994),
('The Hangover', 7.7, 3, 2009),
('The Exorcist', 8.0, 4, 1973);
```


### 4. Configuration des variables d'environnement

Créez un fichier `.env` à la racine du projet en copiant `.env.example` :

```shell script
cp .env.example .env
```


Remplissez le fichier `.env` avec vos informations de base de données :

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=votre_utilisateur_mysql
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=movies_db
```


## 🏃‍♂️ Démarrage

### Mode développement (avec rechargement automatique)

```shell script
npm start
```


Le serveur sera accessible sur `http://localhost:3001`

## 📚 Endpoints de l'API

### 🎬 Films

#### GET /movies
Récupère tous les films avec filtres optionnels.

**Paramètres de requête :**
- `limit` (optionnel) : Limite le nombre de résultats
- `min_rating` (optionnel) : Note minimum des films

**Exemples :**
```shell script
# Tous les films
GET http://localhost:3001/movies

# Les 5 premiers films
GET http://localhost:3001/movies?limit=5

# Films avec une note >= 8.0
GET http://localhost:3001/movies?min_rating=8.0

# Les 3 meilleurs films (note >= 8.5)
GET http://localhost:3001/movies?limit=3&min_rating=8.5
```


**Réponse :**
```json
[
  {
    "id": 1,
    "title": "The Dark Knight",
    "rating": 9.0,
    "category_id": 1,
    "release_year": 2008
  }
]
```


#### GET /movies/:id
Récupère un film spécifique par son ID.

**Exemple :**
```shell script
GET http://localhost:3001/movies/1
```


**Réponse :**
```json
{
  "id": 1,
  "title": "The Dark Knight",
  "rating": 9.0,
  "category_id": 1,
  "release_year": 2008
}
```


**Codes de statut :**
- `200` : Film trouvé
- `404` : Film non trouvé

### 🏷️ Catégories

#### GET /categories/:id/movies
Récupère tous les films d'une catégorie spécifique.

**Exemple :**
```shell script
# Tous les films d'action (category_id = 1)
GET http://localhost:3001/categories/1/movies
```


**Réponse :**
```json
[
  {
    "id": 1,
    "title": "The Dark Knight",
    "rating": 9.0,
    "category_id": 1,
    "release_year": 2008
  }
]
```


**Codes de statut :**
- `200` : Films trouvés
- `404` : Aucun film dans cette catégorie

## 🛠️ Structure du projet

```
express-mysql/
├── index.js              # Point d'entrée de l'application
├── MovieController.js    # Contrôleurs pour les endpoints des films
├── database.js           # Configuration de la base de données
├── package.json          # Dépendances et scripts
├── .env.example          # Exemple de variables d'environnement
├── .env                  # Variables d'environnement (à créer)
└── README.md             # Documentation
```


## 🔧 Développement

### Scripts disponibles

```shell script
# Démarrer le serveur en mode développement
npm start

# (Tests non configurés actuellement)
npm test
```


### Ajout de nouvelles fonctionnalités

Les endpoints commentés dans `index.js` peuvent être implémentés :
- `POST /movies` - Créer un nouveau film
- `PUT /movies/:id` - Mettre à jour un film
- `DELETE /movies/:id` - Supprimer un film

## ❗ Dépannage

### Erreur de connexion à la base de données
- Vérifiez que MySQL/MariaDB est démarré
- Contrôlez vos variables d'environnement dans `.env`
- Assurez-vous que l'utilisateur MySQL a les bonnes permissions

### Port déjà utilisé
Si le port 3001 est occupé, modifiez `listeningPort` dans `index.js`

### Module non trouvé
Vérifiez que toutes les dépendances sont installées avec `npm install`

## 📝 Licence

ISC
```
Ce README.md couvre tous les aspects importants de votre projet avec un guide d'installation complet et une documentation claire des endpoints disponibles.
```

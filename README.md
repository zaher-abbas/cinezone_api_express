Voici un README.md complet pour votre projet CineZone API :

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

## 📋 Prérequis

Avant d'installer ce projet, assurez-vous d'avoir :

- **Node.js** (version 18 ou supérieure)
- **npm** (gestionnaire de paquets Node.js, c'est inclus avec Node)
- **MySQL** (base de données)
- Un serveur MySQL en fonctionnement

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

```
### 4. Créer la base de données

Créez une base de données MySQL avec une table `movie` :

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

### 🎬 Films

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

**Corps de la requête :**

```json
{
  "title": "Titre du film",
  "director": "Nom du réalisateur",
  "release_year": 2023,
  "rating": 8.5
}
```

**Réponse :** `201 Created` ou `500 Internal Server Error`

#### Modifier un film existant

```
PUT /movies/:id
```

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

## 🔧 Scripts disponibles

- `npm start` : Démarre le serveur avec nodemon (redémarrage automatique)
- `npm test` : Lance les tests (non configuré actuellement)

## 📦 Technologies utilisées

- **Node.js 22.18.0** : Environnement d'exécution JavaScript
- **Express.js 5.1.0** : Framework web minimaliste
- **MySQL2 3.14.3** : Client MySQL pour Node.js
- **dotenv 17.2.1** : Gestion des variables d'environnement
- **nodemon 3.1.10** : Redémarrage automatique du serveur (développement)

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

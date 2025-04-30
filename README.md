# Site Web du Restaurant Le Porc Marly

Ce projet est un site web multipage pour le restaurant "Le Porc Marly", un bouchon lyonnais et bar à vin situé au Port-Marly, en France.

## Caractéristiques du site

- Design moderne et élégant avec typographie soignée
- Site entièrement responsive, compatible avec tous les appareils
- Animation et interactions utilisateur fluides
- Formulaires de contact et de réservation
- Présentation complète du menu et de la carte des vins
- Galerie d'images
- Intégration de Google Maps

## Structure du projet

```
.
├── index.html               # Page d'accueil
├── menu.html                # Page de menu
├── cave.html                # Page de la cave à vin
├── gallerie.html            # Galerie de photos
├── contact.html             # Page de contact
├── reservation.html         # Page de réservation
├── about.html               # Page à propos
├── css/
│   └── style.css            # Feuille de style principale
├── js/
│   └── main.js              # Scripts JavaScript
├── images/                  # Dossier contenant les images du site
└── README.md                # Ce fichier
```

## Technologies utilisées

- HTML5
- CSS3 (avec variables CSS et Flexbox/Grid)
- JavaScript (ES6+)
- Font Awesome pour les icônes
- Google Fonts pour la typographie
- Google Maps pour la carte

## Polices utilisées

- Playfair Display pour les titres
- Poppins pour le texte

## Palette de couleurs

- Couleur primaire: #8B4513 (Marron)
- Couleur secondaire: #A52A2A (Rouge bordeaux)
- Accent: #FFD700 (Or/jaune)
- Fond clair: #F8F5F0 (Beige clair)
- Fond moyen: #E6DFD5 (Beige moyen)
- Fond foncé: #2C2418 (Marron foncé)

## Installation et utilisation

1. Clonez ce dépôt sur votre machine locale:
   ```
   git clone https://github.com/votre-utilisateur/le-porc-marly.git
   ```

2. Ouvrez le fichier `index.html` dans votre navigateur pour visualiser le site.

3. Pour le développement, vous pouvez utiliser un serveur local comme Live Server de VSCode ou tout autre serveur HTTP local.

## Téléchargement des images

Un script Python `download_images.py` est inclus pour télécharger des images pour le site. Pour l'utiliser:

1. Assurez-vous d'avoir Python installé sur votre machine
2. Installez les dépendances nécessaires:
   ```
   pip install requests beautifulsoup4
   ```
3. Exécutez le script:
   ```
   python download_images.py
   ```

Les images seront téléchargées dans le dossier `images/`.

## Déploiement

Le site peut être déployé sur n'importe quel hébergement web statique (GitHub Pages, Netlify, Vercel, etc.).

## Auteur

Ce site a été créé pour Le Porc Marly par [Votre Nom/Agence].

## Licence

Tous droits réservés © 2025 Le Porc Marly 
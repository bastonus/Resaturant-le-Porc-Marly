import os
import requests
import time
import random
from urllib.parse import urlparse

# Configuration
IMAGES_DIR = "images"
os.makedirs(IMAGES_DIR, exist_ok=True)

# Utilisation de l'API gratuite de Lorem Picsum (pas besoin de clé API)
USE_ALTERNATIVE = True

# Liste des termes de recherche pour les images (utilisée uniquement avec Pixabay)
search_terms = [
    "restaurant french",
    "wine bar",
    "french cuisine",
    "traditional food",
    "french restaurant interior",
    "french wine",
    "french bistro",
    "wine glasses",
    "french dishes",
    "french dessert",
    "restaurant table"
]

# Noms de fichiers spécifiques pour notre site
image_filenames = [
    "restaurant_front.jpg",
    "restaurant_interior.jpg",
    "wine_bar.jpg",
    "tablier_de_sapeur.jpg",
    "andouillette.jpg",
    "fraise_de_veau.jpg",
    "creme_brulee.jpg",
    "wine_cellar.jpg",
    "sommelier.jpg",
    "plat_lyonnais.jpg",
    "restaurant_table.jpg"
]

def download_image(url, filename):
    """Télécharge une image depuis l'URL et la sauvegarde sous le nom spécifié"""
    try:
        print(f"Téléchargement de {url} vers {filename}...")
        
        # Plusieurs tentatives en cas d'échec
        max_retries = 3
        for attempt in range(max_retries):
            try:
                # En-têtes variés pour éviter d'être bloqué
                headers = {
                    'User-Agent': random.choice([
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15',
                        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:90.0) Gecko/20100101 Firefox/90.0'
                    ]),
                    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
                    'Accept-Language': 'fr,fr-FR;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
                    'Referer': 'https://www.google.com/'
                }
                
                response = requests.get(url, headers=headers, stream=True, timeout=10)
                response.raise_for_status()
                
                # Vérifier que c'est bien une image
                content_type = response.headers.get('Content-Type', '')
                if not content_type.startswith('image'):
                    print(f"Pas une image: {url} (type: {content_type})")
                    if attempt < max_retries - 1:
                        print(f"Nouvelle tentative ({attempt+1}/{max_retries})...")
                        time.sleep(1)
                        continue
                    return False
                
                # Enregistrer l'image
                file_path = os.path.join(IMAGES_DIR, filename)
                with open(file_path, 'wb') as f:
                    for chunk in response.iter_content(8192):
                        f.write(chunk)
                
                print(f"✓ Image téléchargée avec succès: {filename}")
                return True
                
            except Exception as e:
                print(f"Erreur (tentative {attempt+1}/{max_retries}): {e}")
                if attempt < max_retries - 1:
                    time.sleep(2)  # Attendre un peu avant de réessayer
                else:
                    print(f"Échec après {max_retries} tentatives pour {url}")
                    return False
    
    except Exception as e:
        print(f"Erreur globale de téléchargement {url}: {e}")
        return False

def get_alternative_images():
    """Utilise Lorem Picsum pour obtenir des images aléatoires"""
    print("Utilisation de Lorem Picsum pour télécharger des images aléatoires...")
    
    downloaded = 0
    # Télécharger autant d'images qu'il y a de noms de fichiers
    for i, filename in enumerate(image_filenames):
        # Lorem Picsum fournit des images aléatoires de haute qualité
        width = random.randint(800, 1200)
        height = random.randint(600, 800)
        img_url = f"https://picsum.photos/{width}/{height}"
        
        success = download_image(img_url, filename)
        if success:
            downloaded += 1
        
        # Pause pour éviter d'être bloqué
        time.sleep(1)
    
    return downloaded

def main():
    """Fonction principale"""
    print("\n" + "="*50)
    print(" TÉLÉCHARGEMENT D'IMAGES POUR LE PORC MARLY ")
    print("="*50 + "\n")
    
    total_downloaded = 0
    
    # Utilisation de Lorem Picsum (méthode alternative sans clé API)
    print("Téléchargement d'images via Lorem Picsum...")
    total_downloaded = get_alternative_images()
    
    print(f"\n{'='*50}")
    print(f" TERMINÉ: {total_downloaded} images téléchargées dans '{IMAGES_DIR}' ")
    print(f"{'='*50}\n")

if __name__ == "__main__":
    main() 
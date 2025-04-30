import os
import requests
from urllib.parse import urlparse
import time
from bs4 import BeautifulSoup

# Création du dossier pour sauvegarder les images
IMAGES_DIR = "images"
os.makedirs(IMAGES_DIR, exist_ok=True)

# Liste des termes de recherche
search_terms = [
    "Le Porc Marly restaurant",
    "bouchon lyonnais intérieur",
    "cuisine lyonnaise traditionnelle",
    "tablier de sapeur plat",
    "andouillette Bobosse",
    "fraise de veau cuisine",
    "bar à vin décoration",
    "restaurant vue Seine",
    "vins de Bourgogne bouteilles",
    "chartreuse liqueur",
    "crème brûlée dessert"
]

def download_image(url, filename):
    """Télécharge une image depuis l'URL et la sauvegarde sous le nom spécifié"""
    try:
        response = requests.get(url, stream=True, timeout=5)
        response.raise_for_status()
        
        # Vérifier que c'est bien une image
        content_type = response.headers.get('Content-Type', '')
        if not content_type.startswith('image'):
            print(f"Pas une image: {url} (type: {content_type})")
            return False
        
        # Enregistrer l'image
        file_path = os.path.join(IMAGES_DIR, filename)
        with open(file_path, 'wb') as f:
            for chunk in response.iter_content(8192):
                f.write(chunk)
        
        print(f"Image téléchargée: {filename}")
        return True
    
    except Exception as e:
        print(f"Erreur de téléchargement {url}: {e}")
        return False

def search_images_on_unsplash(query, count=3):
    """Recherche des images sur Unsplash"""
    formatted_query = query.replace(' ', '+')
    url = f"https://unsplash.com/s/photos/{formatted_query}"
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img', {'class': 'YVj9w'})
        
        downloaded = 0
        for img in img_tags:
            if downloaded >= count:
                break
                
            img_url = img.get('src')
            if img_url and 'https://' in img_url:
                # Obtenez un nom de fichier unique basé sur l'URL
                filename = f"{query.replace(' ', '_')}_{downloaded + 1}.jpg"
                success = download_image(img_url, filename)
                if success:
                    downloaded += 1
        
        return downloaded
    except Exception as e:
        print(f"Erreur lors de la recherche pour '{query}': {e}")
        return 0

def search_images_on_pexels(query, count=3):
    """Recherche des images sur Pexels"""
    formatted_query = query.replace(' ', '%20')
    url = f"https://www.pexels.com/search/{formatted_query}/"
    
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        img_tags = soup.find_all('img', {'data-image-width': True})
        
        downloaded = 0
        for img in img_tags:
            if downloaded >= count:
                break
                
            img_url = img.get('src') or img.get('data-large-src')
            if img_url and 'https://' in img_url:
                # Obtenez un nom de fichier unique basé sur l'URL
                filename = f"{query.replace(' ', '_')}_{downloaded + 1}_pexels.jpg"
                success = download_image(img_url, filename)
                if success:
                    downloaded += 1
        
        return downloaded
    except Exception as e:
        print(f"Erreur lors de la recherche Pexels pour '{query}': {e}")
        return 0

def main():
    """Fonction principale"""
    print("Début du téléchargement des images...")
    total_downloaded = 0
    
    for term in search_terms:
        print(f"\nRecherche d'images pour: {term}")
        
        # Recherche sur Unsplash
        count_unsplash = search_images_on_unsplash(term, count=2)
        total_downloaded += count_unsplash
        
        # Recherche sur Pexels
        count_pexels = search_images_on_pexels(term, count=2)
        total_downloaded += count_pexels
        
        # Pause pour éviter d'être bloqué par les sites
        time.sleep(2)
    
    print(f"\nTerminé! {total_downloaded} images téléchargées dans le dossier '{IMAGES_DIR}'")

if __name__ == "__main__":
    main() 
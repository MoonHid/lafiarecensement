# 🔧 Gestion Garage - Inventaire Véhicules

Application web simple et intuitive pour gérer l'inventaire de véhicules de ton garage.

## ✨ Fonctionnalités

### ➕ Ajouter des véhicules
- **P. Immatriculation** : Numéro de plaque
- **Marque/Couleur** : Informations du véhicule (ex: Peugeot 207 Noir)
- **Situation** : État actuel du véhicule
  - Diagnostique
  - En attente pièce
  - En attente planif
  - Recherche pièce
- **Observation** : Notes supplémentaires
- **Planning** : À Planifier / Déjà planifié

### 🗑️ Supprimer des véhicules
Clic sur le bouton "Supprimer" pour retirer un véhicule de la liste

### 📥 Export PDF
- Exporte le tableau complet en PDF
- Format prêt à imprimer
- Nom du fichier avec la date

### 📤 Import/Export JSON
- **Exporter** : Sauvegarde complète en JSON (exécuter dans la console: `exportJSON()`)
- **Importer** : Restaure les données d'une sauvegarde JSON

### 💾 Sauvegarde Automatique
- Données sauvegardées dans le localStorage du navigateur
- Persiste même après fermeture du navigateur
- Données conservées lors du redémarrage

### 📊 Statistiques
- Nombre total de véhicules
- Nombre en diagnostic
- Nombre en attente

## 🚀 Comment utiliser

1. **Ouvrir** : Double-clic sur `index.html` ou ouvrir dans un navigateur web
2. **Ajouter** : Cliquez sur "➕ Ajouter un Véhicule"
3. **Remplir** : Complétez le formulaire
4. **Enregistrer** : Cliquez sur "Ajouter le véhicule"
5. **Exporter** : Cliquez sur "📥 Exporter en PDF" pour le format des images

## 💡 Astuces

- Les données se sauvegardent **automatiquement**
- Vous pouvez ajouter/supprimer autant de véhicules que vous voulez
- Le PDF peut être imprimé directement depuis l'application
- Pour exporter en JSON: ouvrez la console (F12) et tapez: `exportJSON()`

## 🌐 Déployer sur GitHub Pages

Pour mettre en ligne avec GitHub Pages:

1. Créez un repo GitHub nommé `garage` (ou similaire)
2. Poussez les fichiers (`index.html` et `script.js`) vers le repo
3. Allez dans Settings → Pages
4. Sélectionnez "Deploy from a branch" avec `main` ou `master`
5. Votre site sera accessible à: `https://votre-username.github.io/garage/`

## 📝 Notes

- Les données sont stockées localement dans le navigateur
- Chaque appareil/navigateur a son propre stockage
- Pour synchroniser entre appareils, utilisez l'export/import JSON
- Peut être facilement étendu (photos, historique, etc.)

---

**Version 1.0** - Créé pour simplifier la gestion d'inventaire garage 🚗

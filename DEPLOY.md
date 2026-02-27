# 🚀 Guide de Déploiement sur GitHub Pages

## Étapes pour déployer ton app sur GitHub Pages

### 1️⃣ Créer un repository GitHub

- Va sur [github.com](https://github.com)
- Clique sur "New Repository" 
- Nomme le repo: `garage` (ou un autre nom)
- **Passe-le en PUBLIC** (important pour Pages)
- Coche "Add a README file"
- Clique "Create repository"

### 2️⃣ Cloner le repo sur ton ordi

```bash
git clone https://github.com/votre-username/garage.git
cd garage
```

### 3️⃣ Copier tes fichiers

Copie dan le dossier `garage`:
- `index.html`
- `script.js`
- `README.md`

### 4️⃣ Pousser vers GitHub

```bash
git add .
git commit -m "Initial commit - Garage Inventory App"
git push origin main
```

### 5️⃣ Activer GitHub Pages

- Va sur ton repo GitHub
- Clique sur **Settings**
- Va dans **Pages** (menu de gauche)
- Sous "Source", sélectionne: **Deploy from a branch**
- Sélectionne la branche: **main** (ou master)
- Clique **Save**

### 6️⃣ Attendre quelques secondes

GitHub va compiler et deployer ton site !

Tu verras un message: "Your site is live at: `https://votre-username.github.io/garage/`"

### 7️⃣ Accéder à ton app

Ouvre dans ton navigateur:
```
https://votre-username.github.io/garage/
```

---

## 🔄 Mettre à jour le site

Après avoir fait des changements:

```bash
git add .
git commit -m "Description des changements"
git push origin main
```

Et c'est tout ! GitHub Pages met à jour automatiquement en quelques secondes.

---

## 💡 Alternative rapide (sans git)

Si tu veux une solution super rapide sans command line:

1. Sur GitHub, crée un nouveau repo
2. Clique sur "Upload files"
3. Drag & drop tes fichiers HTML et JS
4. Active GitHub Pages comme décrit plus haut

**C'est tout !** 🎉

---

## 📝 Notes importantes

- Le site doit rester **PUBLIC** pour fonctionner
- Les données stockées localement (localStorage) ne se synchronisent PAS entre appareils
- Si tu veux partager l'inventaire entre appareils, utilise l'export/import JSON

Besoin d'aide ? Regarde la [doc officielle GitHub Pages](https://pages.github.com/)

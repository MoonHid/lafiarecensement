// Clé pour localStorage
const STORAGE_KEY = 'garage_vehicles';

// Charger les véhicules au démarrage
document.addEventListener('DOMContentLoaded', function() {
    loadVehicles();
});

// Ajouter ou modifier un véhicule
function addVehicle() {
    const vehicleId = document.getElementById('vehicle-id').value;
    const categorie = document.getElementById('categorie-select').value;
    const immat = document.getElementById('immat').value.trim();
    const marque = document.getElementById('marque').value.trim();
    const situation = document.querySelector('input[name="situation"]:checked')?.value;
    const observation = document.getElementById('observation').value.trim();
    const planning = document.querySelector('input[name="planning"]:checked')?.value;

    // Validation
    if (!immat || !marque || !situation || !planning || !categorie) {
        alert('Veuillez remplir tous les champs obligatoires (*)');
        return;
    }

    const vehicles = getVehicles();

    // Cas de modification
    if (vehicleId) {
        const vehicleIndex = vehicles.findIndex(v => v.id === parseInt(vehicleId));
        if (vehicleIndex !== -1) {
            vehicles[vehicleIndex] = {
                ...vehicles[vehicleIndex],
                categorie,
                immat,
                marque,
                situation,
                observation,
                planning
            };
            saveVehicles(vehicles);
            alert('Véhicule modifié avec succès !');
            cancelEdit();
            renderVehicles();
            scrollToVehicles();
        }
        return;
    }

    // Cas d'ajout
    if (vehicles.some(v => v.immat.toUpperCase() === immat.toUpperCase())) {
        alert('Ce véhicule existe déjà!');
        return;
    }

    // Créer le nouvel objet véhicule
    const vehicle = {
        id: Date.now(),
        categorie,
        immat,
        marque,
        situation,
        observation,
        planning
    };

    // Ajouter à la liste
    vehicles.push(vehicle);
    saveVehicles(vehicles);

    // Réinitialiser le formulaire
    resetForm();

    // Recharger le tableau
    renderVehicles();

    // Afficher un message de succès
    scrollToVehicles();
}

// Éditer un véhicule
function editVehicle(id) {
    const vehicles = getVehicles();
    const vehicle = vehicles.find(v => v.id === id);

    if (!vehicle) return;

    // Remplir le formulaire avec les données du véhicule
    document.getElementById('vehicle-id').value = vehicle.id;
    document.getElementById('categorie-select').value = vehicle.categorie || 'Ligne 1';
    document.getElementById('immat').value = vehicle.immat;
    document.getElementById('marque').value = vehicle.marque;
    document.getElementById('observation').value = vehicle.observation;

    // Cocher les radio buttons appropriés
    document.querySelectorAll('input[name="situation"]').forEach(input => {
        input.checked = input.value === vehicle.situation;
    });
    document.querySelectorAll('input[name="planning"]').forEach(input => {
        input.checked = input.value === vehicle.planning;
    });

    // Changer le titre et les boutons
    document.getElementById('form-title').textContent = '✏️ Modifier un véhicule';
    document.getElementById('submit-btn').textContent = 'Enregistrer les modifications';
    document.getElementById('cancel-btn').style.display = 'block';

    // Scroll vers le formulaire
    scrollToForm();
}

// Annuler la modification
function cancelEdit() {
    document.getElementById('vehicle-id').value = '';
    resetForm();
    document.getElementById('form-title').textContent = 'Ajouter un véhicule';
    document.getElementById('submit-btn').textContent = 'Ajouter le véhicule';
    document.getElementById('cancel-btn').style.display = 'none';
}

// Supprimer un véhicule
function deleteVehicle(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
        let vehicles = getVehicles();
        vehicles = vehicles.filter(v => v.id !== id);
        saveVehicles(vehicles);
        renderVehicles();
    }
}

// Réinitialiser le formulaire
function resetForm() {
    document.getElementById('vehicle-id').value = '';
    document.getElementById('categorie-select').value = 'Ligne 1';
    document.getElementById('immat').value = '';
    document.getElementById('marque').value = '';
    document.getElementById('observation').value = '';
    document.querySelectorAll('input[name="situation"]').forEach(input => input.checked = false);
    document.querySelectorAll('input[name="planning"]').forEach(input => input.checked = false);
    document.getElementById('immat').focus();
}

// Récupérer les véhicules du localStorage
function getVehicles() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

// Sauvegarder les véhicules
function saveVehicles(vehicles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
    updateStats();
}

// Charger et afficher les véhicules
function loadVehicles() {
    renderVehicles();
}

// Afficher les véhicules dans le tableau
function renderVehicles() {
    const vehicles = getVehicles();
    const tableBody = document.getElementById('table-body');

    if (vehicles.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <p>Aucun véhicule actuellement. Ajoutez votre premier véhicule !</p>
                </td>
            </tr>
        `;
        updateStats();
        return;
    }

    // Grouper les véhicules par catégorie
    const categories = ['Ligne 1', 'Ligne 2', 'Ligne 3', 'Ligne 4', 'Ligne 5'];
    let html = '';
    categories.forEach((cat, idx) => {
        // Ajoute un espace avant chaque catégorie sauf la première
        if (idx > 0) {
            html += `<tr><td colspan="6" style="height:18px;background:transparent;"></td></tr>`;
        }
        const catVehicles = vehicles.filter(v => (v.categorie || 'Ligne 1') === cat);
        html += `<tr><td colspan="6" style="background:#e0e7ff;font-weight:bold;font-size:15px;">${cat}</td></tr>`;
        if (catVehicles.length > 0) {
            html += catVehicles.map(vehicle => `
                <tr>
                    <td><strong>${vehicle.immat}</strong></td>
                    <td>${vehicle.marque}</td>
                    <td><span class="situation ${getSituationClass(vehicle.situation)}">${vehicle.situation}</span></td>
                    <td>${vehicle.observation || '-'}</td>
                    <td><span class="planning ${getPlanningClass(vehicle.planning)}">${vehicle.planning}</span></td>
                    <td>
                        <button class="btn btn-primary btn-small" onclick="editVehicle(${vehicle.id})">Modifier</button>
                        <button class="btn btn-danger btn-small" onclick="deleteVehicle(${vehicle.id})">Supprimer</button>
                    </td>
                </tr>
            `).join('');
        } else {
            html += `<tr><td colspan="6" style="text-align:center;color:#888;font-style:italic;">Aucun véhicule dans cette catégorie</td></tr>`;
        }
    });
    tableBody.innerHTML = html;
    updateStats();
}

// Déterminer la classe CSS pour la situation
function getSituationClass(situation) {
    const classMap = {
        'Diagnostique': 'diagnostique',
        'En attente pièce': 'attente-piece',
        'En attente planif': 'attente-planif',
        'Recherche pièce': 'recherche-piece'
    };
    return classMap[situation] || '';
}

// Déterminer la classe CSS pour le planning
function getPlanningClass(planning) {
    return planning === 'Déjà planifié' ? 'planifie' : 'planifier';
}

// Exporter en PDF
function exportToPDF() {
    const vehicles = getVehicles();
    const categories = ['Ligne 1', 'Ligne 2', 'Ligne 3', 'Ligne 4', 'Ligne 5'];
    const opt = {
        margin: 10,
        filename: `Garage_Inventaire_${new Date().toLocaleDateString('fr-FR')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    // Créer un conteneur temporaire
    const tempDiv = document.createElement('div');
    tempDiv.style.padding = '20px';
    tempDiv.innerHTML = '<h1 style="text-align: center; margin-bottom: 20px;">Inventaire Garage - ' + new Date().toLocaleDateString('fr-FR') + '</h1>';

    categories.forEach(cat => {
        const catVehicles = vehicles.filter(v => (v.categorie || 'Ligne 1') === cat);
        if (catVehicles.length > 0) {
            // Titre de catégorie
            const catTitle = document.createElement('h2');
            catTitle.textContent = cat;
            catTitle.style.background = '#e0e7ff';
            catTitle.style.padding = '8px 0 8px 10px';
            catTitle.style.fontSize = '18px';
            catTitle.style.margin = '20px 0 5px 0';
            tempDiv.appendChild(catTitle);

            // Tableau pour la catégorie
            const table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            table.innerHTML = `
                <thead style="background:#667eea;color:white;">
                    <tr>
                        <th>P. Immat</th>
                        <th>Marque/Couleur</th>
                        <th>Situation</th>
                        <th>Observation</th>
                        <th>Planning</th>
                    </tr>
                </thead>
                <tbody>
                    ${catVehicles.map(vehicle => `
                        <tr>
                            <td><strong>${vehicle.immat}</strong></td>
                            <td>${vehicle.marque}</td>
                            <td>${vehicle.situation}</td>
                            <td>${vehicle.observation || '-'}</td>
                            <td>${vehicle.planning}</td>
                        </tr>
                    `).join('')}
                </tbody>
            `;
            tempDiv.appendChild(table);
        }
    });

    html2pdf().set(opt).from(tempDiv).save();
}

// Exporter les données en JSON (caché sous le PDF)
function exportToJSON() {
    const vehicles = getVehicles();
    const dataStr = JSON.stringify(vehicles, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Garage_Sauvegarde_${new Date().toLocaleDateString('fr-FR')}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

// Importer depuis JSON
function importFromJSON(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = e.target.result;
            let data;

            // Essayer de parser comme JSON d'abord
            try {
                data = JSON.parse(content);
                if (Array.isArray(data)) {
                    if (confirm('Cela ajoutera ' + data.length + ' véhicule(s). Continuer ?')) {
                        let vehicles = getVehicles();
                        vehicles = vehicles.concat(data);
                        saveVehicles(vehicles);
                        renderVehicles();
                        alert('Données importées avec succès !');
                    }
                    event.target.value = '';
                    return;
                }
            } catch (e) {
                // N'est pas du JSON valide
            }

                alert('Format non supporté. Veuillez utiliser un fichier JSON exporté depuis l\'application.');
        } catch (error) {
            console.error('Erreur lors de l\'import:', error);
            alert('Erreur lors de l\'import du fichier');
        }
    };

    reader.readAsText(file);
}

// Effacer toutes les données
function clearAllData() {
    if (confirm('Êtes-vous absolument sûr ? Cette action ne peut pas être annulée !')) {
        if (confirm('Dernière confirmation : supprimer TOUS les véhicules ?')) {
            localStorage.removeItem(STORAGE_KEY);
            renderVehicles();
            alert('Toutes les données ont été supprimées');
        }
    }
}

// Mettre à jour les statistiques
function updateStats() {
    const vehicles = getVehicles();
    
    document.getElementById('total-vehicles').textContent = vehicles.length;
    
    const diagnostique = vehicles.filter(v => v.situation === 'Diagnostique').length;
    document.getElementById('total-diagnostique').textContent = diagnostique;
    
    const attente = vehicles.filter(v => 
        v.situation === 'En attente pièce' || v.situation === 'En attente planif'
    ).length;
    document.getElementById('total-attente').textContent = attente;
}

// Scroll vers le formulaire
function scrollToForm() {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('immat').focus();
}

// Scroll vers les véhicules
function scrollToVehicles() {
    document.getElementById('vehicles-table').scrollIntoView({ behavior: 'smooth' });
}

// Bonus: Permet d'ajouter un véhicule avec Entrée
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('planning-planifier').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addVehicle();
        }
    });
});

// Changer le lien d'import pour JSON au lieu de PDF
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('pdf-import');
    fileInput.accept = '.json';
    
    // Créer un bouton d'export JSON caché
    const exportJSON = function() {
        exportToJSON();
    };
    
    // Rendre accessible via console pour avancés
    window.exportJSON = exportJSON;
});
